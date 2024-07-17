import ModalCreateUser from "./ModalCreateUser"

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
                    <ModalCreateUser />
                </div>
            </div>
        </div>
    )
}

export default ManageUser
