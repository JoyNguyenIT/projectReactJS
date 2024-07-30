import { useEffect, useState } from "react"
import { getQuizByUser } from "../../services/apiService"
import "./ListQuiz.scss"

const ListQuiz = (props) => {
    const [arrQuiz, setArrQuiz] = useState([])

    useEffect(() => {
        getQuizData()
    }, [])

    const getQuizData = async () => {
        let res = await getQuizByUser()
        console.log("check res", res)

        if (res && res.EC === 0) {
            setArrQuiz(res.DT)
        }
    }

    return (

        <div className="list-quiz-container container">
            {arrQuiz && arrQuiz.length > 0 &&
                arrQuiz.map((quiz, index) => {
                    return (
                        < div key={`${index}-quiz`} className="card-quiz" style={{ width: "18rem", border: "1px solid #ccc" }} >
                            <img src={`data:image/png;base64,${quiz.image}`} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">{`Question ${index + 1}`}</h5>
                                <p className="card-text">{quiz.description}</p>
                                <button className="btn btn-primary">Start now</button>
                            </div>
                        </div>
                    )
                })
            }

            {arrQuiz && arrQuiz.length === 0 &&
                <div className="container">
                    You don't have any Quiz now...
                </div>
            }

        </div>
    )
}

export default ListQuiz