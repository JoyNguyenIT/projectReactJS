

const TableQuiz = (props) => {

    const { listQuiz } = props

    return (
        <div className="table-quiz-container mt-3">
            <span>List Quizzes: </span>
            <table className="table table-hover table-bordered mt-2">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th >Name</th>
                        <th >Descirption</th>
                        <th >Difficulty</th>
                        <th >Actions</th>
                    </tr>
                </thead>
                <tbody>

                    {listQuiz.length > 0
                        ? (listQuiz.map((quiz, index) => {
                            return (

                                < tr key={`quiz-${index + 1}`
                                }>
                                    <th scope="row">{quiz.id}</th>
                                    <td>{quiz.name}</td>
                                    <td>{quiz.description}</td>
                                    <td>{quiz.difficulty}</td>
                                    <td>
                                        <button className="btn btn-warning me-3"
                                            onClick={() => props.handleBtnEditQuiz(quiz)}
                                        >Edit</button>
                                        <button className="btn btn-primary"
                                            onClick={() => props.handleBtnDeletetQuiz(quiz)}
                                        >Delete</button>
                                    </td>
                                </tr>
                            )
                        }))
                        : (<tr>
                            <td colSpan="4">No quizzes found</td>
                        </tr>
                        )}
                </tbody>
            </table>
        </div >
    )
}

export default TableQuiz