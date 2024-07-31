import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { getDetailQuestionId } from "../../services/apiService"
import _, { chain, values } from "lodash"

const DetailQuiz = (props) => {
    const params = useParams()
    const quizId = params.id

    useEffect(() => {
        fetchDetailQuestion()
    }, [quizId])

    const fetchDetailQuestion = async () => {
        let res = await getDetailQuestionId(quizId)
        console.log("check res: ", res)


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

                    answers.push(item.answers)
                    console.log("check item answer: ", item, " index: ", index)
                }
                )
                console.log("Check value: ", detail, "check key: ", questionId)
                return { id: questionId, detail, questionDescription, image }
            })
            .value()
        console.log("check data: ", data)
    }



    return (
        <div className="detail-quiz-container">
            Detail Quiz
        </div>
    )
}

export default DetailQuiz