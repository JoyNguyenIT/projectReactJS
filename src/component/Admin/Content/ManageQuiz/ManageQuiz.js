import { useState } from "react";
import "./ManageQuiz.scss"
import Select from "react-select"
import { FcPlus } from "react-icons/fc";

const options = [
    { value: 'EASY', label: 'EASY' },
    { value: 'MEDIUM', label: 'MEDIUM' },
    { value: 'HARD', label: 'HARD' }
];



const ManageQuiz = (props) => {
    const [previewImage, setPreviewImage] = useState()


    const handleUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
        }
        else {

        }
        console.log(">>>check: ", event.target.files)
    }

    return (
        <div className="manage-quiz-container">
            <div className="title">
                Manage Quiz
            </div>
            <hr />
            <form action="/action_page.php">
                <fieldset className="border rounded-3 p-3">
                    <legend className="float-none w-auto px-3">Add new Quiz:</legend>
                    <div className="add-new-quiz">
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" placeholder="Name Quiz" />
                            <label for="floatingInput">Name</label>
                        </div>
                        <div className="form-floating">
                            <input type="text" className="form-control" placeholder="Description..." />
                            <label for="floatingPassword">Descirption</label>
                        </div>
                        <div className="form-floating my-3">
                            <Select
                                // value={selectedOption}
                                // onChange={this.handleChange}
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

                </fieldset>
            </form>


        </div>
    )
}

export default ManageQuiz