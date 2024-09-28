import { useState } from "react"
import { Button } from "react-bootstrap"
import { postChangePassUser } from "../../../services/apiService"
import { toast } from "react-toastify"


const ChangePass = () => {
    const [currentPass, setCurrentPass] = useState("")
    const [newPass, setNewPass] = useState("")
    const [confirmNewPass, setConfirmNewPass] = useState("")

    const handleSubmitUpdatePassword = async () => {

        if (newPass !== confirmNewPass) {
            toast.error("New Password was not same!!")
        }

        let data = await postChangePassUser(currentPass, confirmNewPass)



        if (data && data.EC === 0) {
            toast.success(data.EM)
        }

        if (data && data.EC !== 0) {
            toast.error(data.EM)
        }
    }

    return (
        <div className="change-pass-container">
            <form className="row g-3">
                <div className="col-md-6">
                    <label className="form-label">Current Password</label>
                    <input type="password"
                        className="form-control"
                        value={currentPass}
                        onChange={(event) => setCurrentPass(event.target.value)}
                    />
                </div>
                <div className="col-md-6">
                    <label className="form-label">New Password</label>
                    <input type="password"
                        className="form-control"
                        value={newPass}
                        onChange={(event) => setNewPass(event.target.value)}
                    />
                </div>
                <div className="col-md-6">
                    <label className="form-label">Confirm New Password</label>
                    <input type="password"
                        className="form-control"
                        value={confirmNewPass}
                        onChange={(event) => setConfirmNewPass(event.target.value)}
                    />
                </div>
            </form>
            <Button variant="primary"
                onClick={() => handleSubmitUpdatePassword()}
                className='mt-3'
            >
                Update
            </Button>
        </div>
    )
}

export default ChangePass