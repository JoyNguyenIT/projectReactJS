import ModalCreateUser from "./ModalCreateUser"
import "./ManageUser.scss"
const ManageUser = (props) => {
    return (
        <div className="manage-user-contaniner">
            <div className="title">
                Manage Users
            </div>
            <div className="user-content">
                <div>
                    <button>Add new user</button>
                </div>
                <div>
                    Table user

                </div>
                <ModalCreateUser />
            </div>
        </div>
    )
}

export default ManageUser
