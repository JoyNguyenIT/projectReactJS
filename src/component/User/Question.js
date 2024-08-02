const Question = (props) => {
    const { currentQues, quesIndex } = props

    return (
        <>
            <div className="body-quiz">
                {currentQues.image
                    ? <img src={`data:image/png;base64, ${currentQues.image}`} />
                    : null
                }
            </div>
            <div className="question">
                Question {currentQues.id}: {currentQues.questionDescription}
            </div>
            <div className="answers">
                {currentQues?.answers.map((answer, index) => {
                    return (
                        <div className="a-child" key={`a-${index + 1}`}>
                            <div className="form-check">
                                <input className="form-check-input"
                                    type="checkbox" value="" />
                                <label className="form-check-label" >
                                    {answer.description}
                                </label>
                            </div>
                        </div>
                    )
                })}
            </div>

        </>
    )
}

export default Question