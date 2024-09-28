import { useEffect, useState } from "react";
import { FcPlus } from "react-icons/fc";
import { useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { postUpdateProfileUser } from "../../../services/apiService";
import { ToastContainer, toast } from 'react-toastify';
import '../../Admin/Content/ManageUser.scss'
import _ from "lodash";

const UserInfor = (props) => {
    const { setShow } = props
    const account = useSelector((state) => state.user.account);
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [role, setRole] = useState("")
    const [previewImage, setPreviewImage] = useState("")
    const [image, setImage] = useState("")

    const handleClose = () => {
        setShow(false)
    }



    useEffect(() => {
        if (!_.isEmpty(account)) {
            setEmail(account.email)
            setUsername(account.username)
            setRole(account.role)
            if (account.image) {
                setPreviewImage(`data:image/jpeg;base64,${account.image}`)
            }
        }

    }, [account])

    const handleSubmitUpdateUser = async () => {


        let data = await postUpdateProfileUser(username, image)

        if (data && data.EC === 0) {
            toast.success(data.EM)
        }

        if (data && data.EC !== 0) {
            toast.error(data.EM)
        }
    }

    const handleUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]))
            setImage(event.target.files[0])
        } else {
            // setPreviewImage("")
        }
    }



    return (
        <div className="modal-add-user">
            <form className="row g-3">
                <div className="col-md-4">
                    <label className="form-label">Username</label>
                    <input type="text"
                        className="form-control"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </div>
                <div className="col-md-4">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        disabled
                    />
                </div>

                <div className="col-md-4">
                    <label className="form-label">Role</label>
                    <select
                        className="form-select"
                        value={role}
                        disabled
                    >
                        <option value="USER">USER</option>
                        <option value="ADMIN">ADMIN</option>
                    </select>
                </div>
                <div className='col-md-12'>
                    <label className="form-label label-upload" htmlFor='uploadImage'>
                        < FcPlus />Upload File Image
                    </label>
                    <input
                        type="file"
                        hidden
                        id='uploadImage'
                        onChange={handleUploadImage} />
                </div>
                <div className='col-md-12 img-preview'>
                    {previewImage ?
                        <img src={previewImage} />
                        :
                        < span >Preview Image</span>
                    }
                </div>


            </form>
            <div className="btn-items-update">
                <Button variant="primary"
                    onClick={() => handleSubmitUpdateUser()}
                    className='mt-3'
                >
                    Update
                </Button>

                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
            </div>
        </div >
    )
}

export default UserInfor