import { useState } from "react";
import "./ManageQuiz.scss"
import Select from "react-select"
import { FcPlus } from "react-icons/fc";
import { postAddNewQuiz } from "../../../../services/apiService";
import { toast } from "react-toastify";

const options = [
    { value: 'EASY', label: 'EASY' },
    { value: 'MEDIUM', label: 'MEDIUM' },
    { value: 'HARD', label: 'HARD' },
];

const ManageQuiz = (props) => {
    const [previewImage, setPreviewImage] = useState(null)
    const [name, setName] = useState('')
    const [descirption, setDescription] = useState('')
    const [image, setImage] = useState(null)
    const [type, setType] = useState(options[0])


    const handleUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            setImage(event.target.files[0])
        }
    }

    const handleAddQuizSubmit = async (event) => {
        event.preventDefault()
        let res = await postAddNewQuiz(descirption, name, type.value, image)
        if (res && res.EC === 0) {
            toast.success(res.EM)
        }
        else {
            toast.error(res.EM)
        }
    }

    return (
        <div className="manage-quiz-container">
            <div className="title">
                Manage Quiz
            </div>
            <hr />
            <form>
                <fieldset className="border rounded-3 p-3">
                    <legend className="float-none w-auto px-3">Add new Quiz:</legend>
                    <div className="add-new-quiz">
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Name Quiz"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                            />
                            <label htmlFor="floatingInput">Name</label>
                        </div>
                        <div className="form-floating">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Description..."
                                value={descirption}
                                onChange={(event) => setDescription(event.target.value)}
                            />
                            <label htmlFor="floatingPassword">Descirption</label>
                        </div>
                        <div className="form-floating my-3">
                            <Select
                                defaultValue={type}
                                value={type}
                                onChange={setType}
                                options={options}
                                placeholder="Quiz mode..."
                            />
                        </div>
                        <div className='col-md-12 mb-3'>
                            <label className="form-label label-upload" htmlFor='uploadImage'>
                                < FcPlus />Upload File Image
                            </label>
                            <input
                                type="file"
                                hidden
                                id='uploadImage'
                                onChange={handleUploadImage}

                            />
                        </div>
                        <div className='col-md-12 img-preview'>
                            {previewImage ?
                                <img src={previewImage} alt='logo' />
                                :
                                < span >Preview Image</span>
                            }
                        </div>
                    </div>
                    <div className="mt-3">
                        <button
                            className="btn btn-success"
                            onClick={handleAddQuizSubmit}
                        >Save</button>
                    </div>
                </fieldset>
            </form>


        </div>
    )
}

export default ManageQuiz