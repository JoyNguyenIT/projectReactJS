import CountDown from "./CountDown"
import { useRef } from "react"

const RightContent = (props) => {
    const { dataQuiz } = props
    const refDiv = useRef([])

    const onTimeUp = () => {
        props.handleFinishQuiz()
    }

    const getClassQuestion = (ques) => {

        if (ques && ques.answers.length > 0) {
            const isSelected = ques.answers.find(a => a.isSelected === true)
            if (isSelected) {
                return 'Question selected'
            }
        }
        return 'Question'
    }

    const handleClickQuestion = (ques, index) => {
        props.setQuesIndex(index)
        if (refDiv.current && refDiv.current.length > 0) {
            refDiv.current.forEach((item) => {
                if (item && item.className === "Question clicked")
                    item.className = "Question"
            })
            if (ques && ques.answers.length > 0) {
                const isSelected = ques.answers.find(a => a.isSelected === true)
                if (isSelected) {
                    return
                }
            }

            refDiv.current[index].className = 'Question clicked'
        }


    }
    return (
        <>
            <div className="main-timer">
                <CountDown
                    onTimeUp={onTimeUp}
                />
            </div>
            <div className="question-items">
                {dataQuiz && dataQuiz.length > 0
                    && dataQuiz.map((ques, index) => {
                        return (
                            <div key={`question-${index + 1}`}
                                className={getClassQuestion(ques)}
                                onClick={() => handleClickQuestion(ques, index)}
                                ref={element => refDiv.current[index] = element}
                            >{index + 1}</div>
                        )
                    })
                }

            </div>
        </>
    )
}

export default RightContent