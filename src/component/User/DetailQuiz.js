import { useEffect, useState } from "react"
import { useParams, useLocation, NavLink } from "react-router-dom"
import { getDetailQuestionId, postFinishQuiz } from "../../services/apiService"
import _, { chain, values } from "lodash"
import Question from "./Question"
import ModalResultQuiz from "./ModalResultQuiz"
import RightContent from "./Content/RightContent"
import { Breadcrumb, BreadcrumbItem } from "react-bootstrap"

const DetailQuiz = (props) => {
    const params = useParams()
    const quizId = params.id
    const location = useLocation()
    const [currentQues, setCurrentQues] = useState([])
    const [quesIndex, setQuesIndex] = useState(0)
    const [showAnswer, setShowAnswer] = useState(false)
    const [dataResult, setDataResult] = useState({})
    const [isShowCorrectAnswer, setIsShowCorrectAnswer] = useState(false)

    useEffect(() => {
        fetchDetailQuestion()
    }, [quizId])

    const fetchDetailQuestion = async () => {
        let res = await getDetailQuestionId(quizId)
        let data = _.chain(res.DT)
            // Group the elements of Array based on `color` property
            .groupBy("id")
            // `key` is group's name (color), `value` is the array of objects
            .map((detail, questionId) => {
                let answers = [];
                let questionDescription, image = null
                detail.forEach((item, index) => {
                    if (index === 0) {
                        questionDescription = item.description
                        image = item.image

                    }
                    item.answers.isSelected = false
                    answers.push(item.answers);

                })
                answers = _.orderBy(answers, ['id'], ['asc'])
                return { id: questionId, detail, questionDescription, image, answers }
            })
            .value()
        setCurrentQues(data)
    }

    const handleCheckAnswer = (aId, qId) => {
        let currentQuesClone = _.cloneDeep(currentQues)
        let question = currentQuesClone.find(item => item.id === qId)
        if (question && question.answers) {
            let answerSelected = question.answers.map(item => {
                if (+item.id === +aId) {
                    item.isSelected = !item.isSelected
                }
                return item
            })
            question.answers = answerSelected
        }
        let index = currentQuesClone.findIndex(item => item.id === qId)
        if (index > -1) {
            currentQuesClone[index] = question
            setCurrentQues([...currentQuesClone])
        }

    }

    const handleFinishQuiz = async () => {
        let dataFinish = {
            quizId: quizId,
            answers: []
        }

        if (currentQues && currentQues.length > 0) {
            let answer = []
            currentQues.forEach(ques => {
                let questionId = +ques.id
                let userAnswerId = []

                ques.answers.forEach(a => {
                    if (a.isSelected === true) {
                        userAnswerId.push(a.id)
                    }
                })

                answer.push({
                    questionId: +questionId,
                    userAnswerId: userAnswerId
                })
            })
            dataFinish.answers = answer
        }
        let res = await postFinishQuiz(dataFinish)
        if (res && res.EC === 0) {
            setDataResult({
                countCorrect: res.DT.countCorrect,
                countTotal: res.DT.countTotal,
                quizData: res.DT.quizData
            })
            setShowAnswer(true)

            //Show correct answer 
            if (res.DT && res.DT.quizData) {
                const currentQuesClone = _.cloneDeep(currentQues)
                let answerArray = res.DT.quizData
                for (let question of answerArray) {

                    for (let i = 0; i < currentQuesClone.length; i++) {
                        if (+currentQuesClone[i].id === +question.questionId) {
                            for (let j = 0; j < currentQuesClone[i].answers.length; j++) {
                                //if user answer correct

                                let s = question.systemAnswers.find(item => +item.id === +currentQuesClone[i].answers[j].id)
                                if (+currentQuesClone[i].answers[j].id === +question.systemAnswers[0].id) {
                                    currentQuesClone[i].answers[j].isCorrect = true
                                }
                                else {
                                    currentQuesClone[i].answers[j].isCorrect = false
                                }


                            }

                        }
                    }
                }
                setCurrentQues(currentQuesClone)
            }
        }
    }

    return (
        <>
            <Breadcrumb className="detail-quiz-header">
                <NavLink to={"/"} className="breadcrumb-item">
                    Home
                </NavLink>
                <NavLink to={"/users"} className="breadcrumb-item">
                    User
                </NavLink>
                <Breadcrumb.Item active>Quiz</Breadcrumb.Item>
            </Breadcrumb>
            <div className="detail-quiz-container">
                <div className="left-content">
                    <div className="title-quiz">
                        Quiz {quizId}:{location?.state?.quizTitle}
                        <hr />
                    </div>

                    <div className="content-quiz">
                        {currentQues.length > 0 && (
                            <Question
                                handleCheckAnswer={handleCheckAnswer}
                                currentQues={currentQues && currentQues.length > 0
                                    ? currentQues[quesIndex]
                                    : []}
                                quesIndex={quesIndex}
                                dataResult={dataResult}
                            />
                        )}
                    </div>

                    <div className="footer-quiz">
                        <button className="btn btn-primary"
                            disabled={quesIndex === 0}
                            onClick={() => setQuesIndex(quesIndex - 1)}
                        >Back</button>
                        <button className="btn btn-success"
                            disabled={quesIndex >= currentQues.length - 1}
                            onClick={() => setQuesIndex(quesIndex + 1)}
                        >Next </button>
                        <button className="btn btn-warning"
                            onClick={() => handleFinishQuiz()}
                        >Finish </button>
                    </div>

                </div>

                <div className="right-content">
                    <RightContent
                        dataQuiz={currentQues}
                        handleFinishQuiz={handleFinishQuiz}
                        setQuesIndex={setQuesIndex}
                    />
                </div>
                <ModalResultQuiz
                    show={showAnswer}
                    setShow={setShowAnswer}
                    dataResult={dataResult}
                    setIsShowCorrectAnswer={setIsShowCorrectAnswer}
                />
            </div>
        </>
    )
}

export default DetailQuiz