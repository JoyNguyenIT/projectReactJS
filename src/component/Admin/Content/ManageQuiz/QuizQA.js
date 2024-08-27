import { useState, useEffect } from "react";
import "./QuizQA.scss"
import Select from "react-select"
import { RiImageAddFill } from "react-icons/ri";
import { IoIosAddCircle } from "react-icons/io";
import { AiFillMinusCircle } from "react-icons/ai";
import { BsPatchMinusFill, BsPatchPlusFill } from "react-icons/bs";
import { v4 as uuidv4 } from 'uuid';
import Lightbox from "react-awesome-lightbox";
import _ from "lodash";
import { getAllQuizForAdmin, postAddNewQuestion, postAddNewAnswer } from "../../../../services/apiService";
import { toast } from "react-toastify";


const QuizQA = (props) => {
    const initQuestion = [
        {
            id: uuidv4(),
            description: '',
            imageName: '',
            imageFile: '',
            answers: [
                {
                    id: uuidv4(),
                    description: '',
                    isCorrect: false
                }
            ]


        }
    ]
    const [listQuiz, setListQuiz] = useState([])
    const [selectQuiz, setSelectQuiz] = useState(null)
    const [showPreviewImage, setShowPreviewImage] = useState(false)

    const [questions, setQuestions] = useState(initQuestion)

    const [dataPreviewImage, setDataPreviewImage] = useState({
        url: '',
        title: ''
    })

    useEffect(() => {
        fetchListQuiz()
    }, [])

    const fetchListQuiz = async () => {
        let res = await getAllQuizForAdmin();
        if (res && res.EC === 0) {
            let listQuizSelect = res.DT.map((ques) => ({
                value: `${ques.id}`,
                label: `${ques.id}-${ques.description}`
            }));
            setListQuiz(listQuizSelect);
        }
    }

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
                        description: '',
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
                description: '',
                isCorrect: false
            }
            let index = questionClone.findIndex(item => item.id === idQues)
            if (index > -1) {
                questionClone[index].answers.push(newAnswer)
                setQuestions(questionClone)
            }

        }

        if (type === 'REMOVE') {
            let index = questionClone.findIndex(item => item.id === idQues)
            if (index > -1) {
                questionClone[index].answers = questionClone[index].answers.filter(item => item.id !== idAnswer)
                setQuestions(questionClone)
            }

        }
    }

    const handleOnChangeQuestion = (type, quesId, value) => {
        let questionClone = _.cloneDeep(questions)
        if (type === 'QUESTION') {
            let index = questionClone.findIndex(item => item.id === quesId)
            if (index > -1) {
                questionClone[index].description = value
                setQuestions(questionClone)
            }

        }
    }

    const handleUploadImage = (event, quesId) => {
        let questionClone = _.cloneDeep(questions)
        let index = questionClone.findIndex(item => item.id === quesId)
        if (index > -1 && event.target.files.length > 0) {
            questionClone[index].imageFile = event.target.files[0]
            questionClone[index].imageName = event.target.files[0].name
            setQuestions(questionClone)
        }
    }

    const handleChangeAnswer = (type, quesId, answerId, value) => {
        let questionClone = _.cloneDeep(questions)
        let index = questionClone.findIndex(item => item.id === quesId)
        if (index > -1) {
            questionClone[index].answers = questionClone[index].answers.map(ans => {
                if (answerId === ans.id) {
                    if (type === 'CHECKBOX') ans.isCorrect = value
                    if (type === 'INPUT') ans.description = value
                }
                return ans
            })
            setQuestions(questionClone)
        }
    }

    const handleSaveQuestion = async () => {
        if (!selectQuiz) {
            toast.error("Please choose a Quiz!");
            return;  // Early exit if no quiz is selected
        }

        if (selectQuiz && selectQuiz.value) {
            let isValid = true;

            // Validation loop
            for (let [indexQ, ques] of questions.entries()) {
                if (!ques.description) {
                    toast.error(`Question ${indexQ + 1} is empty!`);
                    isValid = false;
                    break;  // Exit early if a question description is 
                }

                for (let [indexA, ans] of ques.answers.entries()) {
                    if (!ans.description) {
                        toast.error(`Answer ${indexA + 1} in Question ${indexQ + 1} is empty!`);
                        isValid = false;
                        break;  // Exit early if an answer description is empty
                    }
                }

                if (!isValid) break;  // Exit outer loop if an inner validation failed
            }

            if (!isValid) return;  // Stop execution if validation failed

            // If validation passes, save questions and answers
            for (let ques of questions) {
                let resQues = await postAddNewQuestion(selectQuiz.value, ques.description, ques.imageFile);

                if (resQues && resQues.EC === 0 && resQues.DT) {
                    for (let ans of ques.answers) {
                        await postAddNewAnswer(ans.description, ans.isCorrect, resQues.DT.id);
                    }
                }
            }

            toast.success("Created new questions & answers successfully!");
            setQuestions(initQuestion);  // Reset to initial state after successful save
        }
    };

    const handleShowPreviewImage = (quesId) => {
        let questionClone = _.cloneDeep(questions)
        let index = questionClone.findIndex(item => item.id === quesId)
        if (index > -1) {
            setDataPreviewImage({
                url: URL.createObjectURL(questionClone[index].imageFile),
                title: questionClone[index].imageName
            })
            setShowPreviewImage(true)
        }
    }

    return (
        <div className="question-container">
            <div className="title">
                Manage Questions
            </div>
            <div className="select-ques mt-3">
                Select Quiz
                <Select
                    value={selectQuiz}
                    onChange={setSelectQuiz}
                    options={listQuiz}
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
                                            onChange={(event) => handleOnChangeQuestion('QUESTION', ques.id, event.target.value)}
                                        />
                                        <label htmlFor="floatingInput">Question {`${index + 1}`} 's description</label>
                                    </div>

                                    <div className="items-group">
                                        <div className="input-upload">
                                            <label className="icon-upload" htmlFor={`image-upload-${ques.id}`}>
                                                <RiImageAddFill className="add-image-icon" />
                                            </label>
                                            <input type="file"
                                                hidden
                                                id={`image-upload-${ques.id}`}
                                                onChange={(event) => handleUploadImage(event, ques.id)}
                                            />
                                            < span > {
                                                ques.imageName ?
                                                    (<span
                                                        onClick={() => handleShowPreviewImage(ques.id)}>
                                                        {ques.imageName}
                                                    </span>)
                                                    :
                                                    ('0 file is upload ')
                                            }
                                            </span>
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
                                        <div key={ans.id} className="answers-content mb-3">
                                            <div className="isCorrect">
                                                <input className="form-check-input"
                                                    type="checkbox"
                                                    checked={ans.isCorrect}
                                                    onChange={(event) => handleChangeAnswer('CHECKBOX', ques.id, ans.id, event.target.checked)}
                                                />
                                            </div>
                                            <div className="form-floating form-answers">
                                                <input type="text"
                                                    className="form-control"
                                                    placeholder=""
                                                    value={ans.description}
                                                    onChange={(event) => handleChangeAnswer('INPUT', ques.id, ans.id, event.target.value)}
                                                />
                                                <label htmlFor="floatingInput">{`Answer ${index + 1}`}</label>
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

            <div className="mt-3">
                <button className="btn btn-warning"
                    onClick={() => handleSaveQuestion()}
                >Save Questions</button>
            </div>

            {
                showPreviewImage &&
                (<Lightbox image={dataPreviewImage.url}
                    title={dataPreviewImage.title}
                    onClose={() => setShowPreviewImage(false)}
                />
                )
            }
        </div >

    )
}

export default QuizQA