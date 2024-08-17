import { useState } from "react";
import "./ManageQuestion.scss"
import Select from "react-select"
import { RiImageAddFill } from "react-icons/ri";
import { IoIosAddCircle } from "react-icons/io";
import { AiFillMinusCircle } from "react-icons/ai";
import { BsPatchMinusFill, BsPatchPlusFill } from "react-icons/bs";
import { v4 as uuidv4 } from 'uuid';
import _ from "lodash";



const ManageQuestion = (props) => {
    const [selectQuiz, setSelectQuiz] = useState({})

    const [questions, setQuestions] = useState(
        [
            {
                id: uuidv4(),
                description: '',
                imageName: '',
                imageFile: '',
                answers: [
                    {
                        id: uuidv4(),
                        description: 'Who is this?',
                        isCorrect: false
                    }
                ]


            }
        ]
    )

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ];

    const handleAddRemoveQuestion = (type, idQues) => {
        if (type === 'ADD') {
            const newQues = {
                id: uuidv4(),
                description: '',
                imageName: '',
                imageFile: '',
                answers: [
                    {
                        id: uuidv4(),
                        description: 'Who is this?',
                        isCorrect: false
                    }
                ]


            }

            setQuestions([...questions, newQues])
        }

        if (type === 'REMOVE') {
            let cloneQues = _.cloneDeep(questions)
            cloneQues = cloneQues.filter((item) => item.id !== idQues)
            setQuestions(cloneQues)
        }
    }

    const handleAddRemoveAnswer = (type, idQues, idAnswer) => {
        let questionClone = _.cloneDeep(questions)
        if (type === 'ADD') {
            const newAnswer =
            {
                id: uuidv4(),
                description: 'Who is this?',
                isCorrect: false
            }
            let index = questionClone.findIndex(item => item.id === idQues)
            questionClone[index].answers.push(newAnswer)
            setQuestions(questionClone)
        }

        if (type === 'REMOVE') {
            let index = questionClone.findIndex(item => item.id === idQues)
            questionClone[index].answers = questionClone[index].answers.filter(item => item.id !== idAnswer)
            setQuestions(questionClone)
        }
    }

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
            <div className="mt-3">Add Questions:</div>
            {questions && questions.length > 0
                && questions.map((ques, index) => {
                    return (
                        < div key={ques.id} className="qs-main mb-4" >
                            <div className="question-content">
                                <div className="add-question-content">
                                    <div className="form-floating mb-3 description">
                                        <input type="text"
                                            className="form-control"
                                            placeholder=""
                                            value={ques.description}
                                        />
                                        <label htmlFor="floatingInput">Question {`${index + 1}`} 's description</label>
                                    </div>

                                    <div className="items-group">
                                        <div className="input-upload">
                                            <span className="icon-upload">
                                                <RiImageAddFill className="add-image-icon" />
                                            </span>
                                            <input type="file"
                                                hidden
                                            />
                                            <span>0 file is upload</span>
                                        </div>
                                        <div className="add-question-btn">
                                            <span className="icon-add-question">
                                                <BsPatchPlusFill
                                                    onClick={() => handleAddRemoveQuestion('ADD')}
                                                />
                                            </span>
                                            {questions.length > 1
                                                &&
                                                <span className="icon-remove-question">
                                                    <BsPatchMinusFill
                                                        onClick={() => handleAddRemoveQuestion('REMOVE', ques.id)}
                                                    />
                                                </span>
                                            }
                                        </div>


                                    </div>
                                </div>
                            </div>
                            {ques.answers && ques.answers.length > 0
                                && ques.answers.map((ans, index) => {
                                    return (
                                        <div key={ans.id} className="answers-content">
                                            <div className="isCorrect">
                                                <input className="form-check-input"
                                                    type="checkbox"
                                                />
                                            </div>
                                            <div className="form-floating form-answers">
                                                <input type="text"
                                                    className="form-control"
                                                    placeholder=""
                                                    value={''}
                                                />
                                                <label htmlFor="floatingInput">{`${ans.description}`}</label>
                                            </div>
                                            <div className="group-answer">
                                                <span className="icon-add-answer">
                                                    <IoIosAddCircle
                                                        onClick={() => handleAddRemoveAnswer('ADD', ques.id)}
                                                    />
                                                </span>
                                                {ques.answers.length > 1
                                                    &&
                                                    <span className="icon-remove-answer">
                                                        <AiFillMinusCircle
                                                            onClick={() => handleAddRemoveAnswer('REMOVE', ques.id, ans.id)}
                                                        />
                                                    </span>
                                                }

                                            </div>
                                        </div>
                                    )
                                })
                            }

                        </div>
                    )
                })
            }

        </div >
    )
}

export default ManageQuestion