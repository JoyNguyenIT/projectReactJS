import ModalCreateUser from "./ModalCreateUser"
import "./ManageUser.scss"
import { FcPlus } from "react-icons/fc";
import { useState, useEffect } from "react";
import TableUser from "./TableUser"
import { getAllTableUsers, getUserPaginate } from "../../../services/apiService";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalViewUser from "./ModalViewUser";
import ModalDeleteUser from "./ModalDeleteUser";
import TableUserPaginate from "./TableUserPaginate";


const ManageUser = (props) => {
    const LIMIT_PAGINATE = 6

    const [pageCount, setPageCount] = useState(0);
    const [showModal, setShowModal] = useState(false)
    const [listUser, setListUser] = useState([]);
    const [showModalUpdate, setShowModalUpdate] = useState(false)
    const [dataUpdate, setDataUpdate] = useState({});
    const [showModalView, setShowModalView] = useState(false)
    const [dataView, setDataView] = useState({})
    const [showModalDelete, setShowModalDelete] = useState(false)
    const [dataDelete, setDataDelete] = useState({})
    const [page, setPage] = useState(1)

    useEffect(() => {
        // fetchListUser()
        fetchListUserPaginate(1)
    }, [])

    const fetchListUser = async () => {
        let data = await getAllTableUsers()
        if (data.EC === 0) {
            setListUser(data.DT)
        }
    }

    const fetchListUserPaginate = async (pageNumber) => {
        let data = await getUserPaginate(pageNumber, LIMIT_PAGINATE)
        if (data.EC === 0) {
            setListUser(data.DT.users)
            setPageCount(data.DT.totalPages)
        }
    }

    const handleClickBtnUpdate = (user) => {
        setShowModalUpdate(true);
        setDataUpdate(user)
    }

    const handleClickBtnView = (user) => {
        setShowModalView(true);
        setDataView(user)
    }

    const handleClickBtnDelete = (user) => {
        setShowModalDelete(true);
        setDataDelete(user)
    }


    const resetUpdateData = () => {
        setDataUpdate({})
    }

    const resetViewData = () => {
        setDataView({})
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
                    {/* <TableUser listUser={listUser}
                        handleClickBtnUpdate={handleClickBtnUpdate}
                        handleClickBtnView={handleClickBtnView}
                        handleClickBtnDelete={handleClickBtnDelete}
                    /> */}
                    <TableUserPaginate listUser={listUser}
                        handleClickBtnUpdate={handleClickBtnUpdate}
                        handleClickBtnView={handleClickBtnView}
                        handleClickBtnDelete={handleClickBtnDelete}
                        fetchListUserPaginate={fetchListUserPaginate}
                        pageCount={pageCount}
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
                    fetchListUser={fetchListUser}
                    resetUpdateData={resetUpdateData}
                />
                <ModalViewUser
                    show={showModalView}
                    setShow={setShowModalView}
                    resetViewData={resetViewData}
                    dataView={dataView}
                    fetchListUser={fetchListUser}
                />
                <ModalDeleteUser
                    show={showModalDelete}
                    setShow={setShowModalDelete}
                    dataDelete={dataDelete}
                    fetchListUser={fetchListUser}
                />

            </div>
        </div >
    )
}

export default ManageUser
