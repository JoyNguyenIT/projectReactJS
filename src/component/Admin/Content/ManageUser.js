import ModalCreateUser from "./ModalCreateUser"
import "./ManageUser.scss"
import { FcPlus } from "react-icons/fc";
import { useState } from "react";
import TableUser from "./TableUser"

const ManageUser = (props) => {
    const [showModal, setShowModal] = useState(false)

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
                    <TableUser />
                </div>
                <ModalCreateUser
                    show={showModal}
                    setShow={setShowModal}
                />

            </div>
        </div >
    )
}

export default ManageUser
