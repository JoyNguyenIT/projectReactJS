import { useState } from "react";
import "./ManageQuestion.scss"
import Select from "react-select"
import { RiImageAddFill } from "react-icons/ri";
import { IoIosAddCircle } from "react-icons/io";
import { AiFillMinusCircle } from "react-icons/ai";

const ManageQuestion = (props) => {
    const [selectQuiz, setSelectQuiz] = useState({})

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ];

    return (
        <div className="question-container">
            <div className="title">
                Manage Questions
            </div>
            <div className="select-ques mt-3">
                Select Question
                <Select
                    value={selectQuiz}
                    onChange={setSelectQuiz}
                    options={options}
                />
            </div>
            <div className="question-content">
                <div className="mt-3">Add Questions:</div>
                <div className="add-question-content">

                    <div className="form-floating mb-3 description">
                        <input type="text" className="form-control" placeholder="" />
                        <label htmlFor="floatingInput">Description</label>
                    </div>

                    <div className="items-upload">
                        <div className="input-upload">
                            <label className="label-text">Upload Image</label>
                            <input type="file"
                                hidden
                            />
                            <span>0 file is upload</span>
                        </div>

                        <div className="click-upload">
                            <span className="icon-upload">
                                <RiImageAddFill className="add-icon" />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="answers-content">
                <div className="isCorrect">
                    <input className="form-check-input"
                        type="checkbox"
                    />
                </div>
                <div className="form-floating form-answers">
                    <input type="text" className="form-control" placeholder="" />
                    <label htmlFor="floatingInput">Answers 1</label>
                </div>
                <div className="group-answer">
                    <span className="icon-add-answer">
                        <IoIosAddCircle />
                    </span>
                    <span className="icon-remove-answer">
                        <AiFillMinusCircle />
                    </span>
                </div>
            </div>
        </div>
    )
}

export default ManageQuestion