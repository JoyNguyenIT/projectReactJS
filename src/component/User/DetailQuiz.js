import { useEffect, useState } from "react"
import { useParams, useLocation } from "react-router-dom"
import { getDetailQuestionId } from "../../services/apiService"
import _, { chain, values } from "lodash"
import Question from "./Question"

const DetailQuiz = (props) => {
    const params = useParams()
    const quizId = params.id
    const location = useLocation()
    const [currentQues, setCurrentQues] = useState([])
    const [quesIndex, setQuesIndex] = useState(0)

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
                return { id: questionId, detail, questionDescription, image, answers }
            })
            .value()
        console.log("check data: ", data)
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
        console.log(">>>>>>>>>>check index: ", index)
        if (index > -1) {
            currentQuesClone[index] = question
            setCurrentQues([...currentQuesClone])
        }

        console.log(">>>>cehck : ", currentQuesClone)
    }

    return (
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
                        onClick={() => setQuesIndex(quesIndex + 1)}
                    >Finish </button>
                </div>

            </div>

            <div className="right-content">
                <div className="time-countdown">800000</div>
            </div>
        </div>
    )
}

export default DetailQuiz