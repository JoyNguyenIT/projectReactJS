import ModalCreateUser from "./ModalCreateUser"
import "./ManageUser.scss"
import { FcPlus } from "react-icons/fc";
import { useState, useEffect } from "react";
import TableUser from "./TableUser"
import { getAllTableUsers } from "../../../services/apiService";
import ModalUpdateUser from "./ModalUpdateUser";

const ManageUser = (props) => {
    const [showModal, setShowModal] = useState(false)
    const [listUser, setListUser] = useState([]);
    const [showModalUpdate, setShowModalUpdate] = useState(false)
    const [dataUpdate, setDataUpdate] = useState({});

    useEffect(() => {
        fetchListUser()
    }, [])

    const fetchListUser = async () => {
        let data = await getAllTableUsers()
        if (data.EC === 0) {
            setListUser(data.DT)
        }
    }

    const handleClickBtnUpdate = (user) => {
        setShowModalUpdate(true);
        setDataUpdate(user)
    }

    return (
        <div className="manage-user-contaniner">
            <div className="title">
                Manage Users
            </div>
            <div className="user-content">
                <div className="btn-add-new">
                    <button className="btn btn-primary"
                        onClick={() => setShowModal(true)}

                    >
                        <FcPlus />Add new user</button>
                </div>
                <div className="table-users-container">
                    <TableUser listUser={listUser}
                        handleClickBtnUpdate={handleClickBtnUpdate}
                    />
                </div>
                <ModalCreateUser
                    show={showModal}
                    setShow={setShowModal}
                    fetchListUser={fetchListUser}
                />
                <ModalUpdateUser
                    show={showModalUpdate}
                    setShow={setShowModalUpdate}
                    dataUpdate={dataUpdate}
                />

            </div>
        </div >
    )
}

export default ManageUser
