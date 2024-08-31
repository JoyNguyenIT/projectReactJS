import { useEffect, useState } from "react";
import Select from "react-select"
import { getAllQuizForAdmin, getAllTableUsers, postAssignQuiz } from "../../../../services/apiService";
import { toast } from "react-toastify";



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
                label: `${ques.id}-${ques.name}`
            }))
            setListQuiz(listQuizClone)
        }

    }

    const fetchListUser = async () => {
        let res = await getAllTableUsers()
        if (res && res.EC === 0) {
            let listUserClone = res.DT.map((user) => ({
                value: `${user.id}`,
                label: `${user.id}-${user.email}`
            }))
            setListUser(listUserClone)
        }

    }

    const handleAssign = async () => {
        let res = await postAssignQuiz(selectQuiz.value, selectUser.value)
        if (res && res.EC === 0) {
            toast.success(res.EM)
            setSelectQuiz({})
            setSelectUser({})
        }

        else {
            toast.error(res.EM)
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
                <label className="mb-2">Select User:</label>
                <Select
                    value={selectUser}
                    onChange={setSelectUser}
                    options={listUser}
                />

            </div>
            <div className="mt-3">
                <button className="btn btn-warning"
                    onClick={() => handleAssign()}
                >
                    Assign
                </button>
            </div>
        </div>
    )

}

export default AssignQuiz