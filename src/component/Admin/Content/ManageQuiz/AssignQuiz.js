import { useEffect, useState } from "react";
import Select from "react-select"
import { getAllQuizForAdmin, getAllTableUsers } from "../../../../services/apiService";


const AssignQuiz = () => {
    const [selectQuiz, setSelectQuiz] = useState(null)
    const [listQuiz, setListQuiz] = useState([])
    const [selectUser, setSelectUser] = useState(null)
    const [listUser, setListUser] = useState([])

    useEffect(() => {
        fetchListQuiz()
        fetchListUser()
    }, [])

    const fetchListQuiz = async () => {
        let res = await getAllQuizForAdmin()
        if (res && res.EC === 0) {
            let listQuizClone = res.DT.map((ques) => ({
                value: `${ques.id}`,
                label: `${ques.id}-${ques.description}`
            }))
            setListQuiz(listQuizClone)
        }

    }

    const fetchListUser = async () => {
        let res = await getAllTableUsers()
        console.log(res)
        if (res && res.EC === 0) {
            let listUserClone = res.DT.map((user) => ({
                value: `${user.id}`,
                label: `${user.id}-${user.email}`
            }))
            setListUser(listUserClone)
        }

    }

    return (
        <div className="assign-user-container row">
            <div className="col-6 form-group">
                <label className="mb-2">Select Quiz:</label>
                <Select
                    value={selectQuiz}
                    onChange={setSelectQuiz}
                    options={listQuiz}
                />

            </div>
            <div className="col-6 form-group">
                <label className="mb-2">Select Quiz:</label>
                <Select
                    value={selectUser}
                    onChange={setSelectUser}
                    options={listUser}
                />

            </div>
        </div>
    )

}

export default AssignQuiz