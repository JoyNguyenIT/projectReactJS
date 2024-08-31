import { useEffect, useState } from "react";
import "./ManageQuiz.scss"
import Select from "react-select"
import { FcPlus } from "react-icons/fc";
import { postAddNewQuiz } from "../../../../services/apiService";
import { toast } from "react-toastify";
import TableQuiz from "./TableQuiz";
import { Accordion } from "react-bootstrap";
import ModalUpdateQuiz from "./ModalUpdateQuiz";
import { getAllQuizForAdmin } from "../../../../services/apiService";
import ModalDeleteQuiz from "./ModalDeleteQuiz";
import QuizQA from "./QuizQA";
import AssignQuiz from "./AssignQuiz";



const ManageQuiz = (props) => {

    const options = [
        { value: 'EASY', label: 'EASY' },
        { value: 'MEDIUM', label: 'MEDIUM' },
        { value: 'HARD', label: 'HARD' }
    ];

    const [previewImage, setPreviewImage] = useState(null)
    const [name, setName] = useState('')
    const [descirption, setDescription] = useState('')
    const [image, setImage] = useState(null)
    const [type, setType] = useState([])
    const [listQuiz, setListQuiz] = useState([])
    const [showModalEdit, setShowModalEdit] = useState(false)
    const [dataQuizEdit, setDataQuizEdit] = useState({})
    const [showModalDelete, setShowModalDelete] = useState(false)
    const [dataQuizDelete, setDataQuizDelete] = useState({})
    const [selectQuiz, setSelectQuiz] = useState(null)


    useEffect(() => {
        fetchListQuiz()
    }, [])

    const fetchListQuiz = async () => {
        let res = await getAllQuizForAdmin()
        if (res && res.EC === 0) {
            setListQuiz(res.DT)
        }

    }

    const handleUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            setImage(event.target.files[0])
        }
    }

    const handleAddQuizSubmit = async (event) => {
        event.preventDefault()
        let res = await postAddNewQuiz(descirption, name, type.value, image)
        if (!name || !descirption) {
            toast.error("Name/Description is required!")
            return;
        }

        if (res && res.EC === 0) {
            toast.success(res.EM)
            setDescription("")
            setName("")
            setImage("")
            setPreviewImage("")
            fetchListQuiz()
        }
        else {
            toast.error(res.EM)
        }
    }

    const handleBtnEditQuiz = (quiz) => {
        setShowModalEdit(true)
        setDataQuizEdit(quiz)
    }

    const resetQuizUpdate = () => {
        setDataQuizEdit({})
    }

    const handleBtnDeletetQuiz = (quiz) => {
        setShowModalDelete(true)
        setDataQuizDelete(quiz)
    }

    return (
        <div className="manage-quiz-container">
            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Manage Quizzes</Accordion.Header>
                    <Accordion.Body>
                        <form>
                            <fieldset className="border rounded-3 p-3">
                                <legend className="float-none w-auto px-3">Add new Quiz:</legend>
                                <div className="add-new-quiz">
                                    <div className="form-floating mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Name Quiz"
                                            value={name}
                                            onChange={(event) => setName(event.target.value)}
                                        />
                                        <label htmlFor="floatingInput">Name</label>
                                    </div>
                                    <div className="form-floating">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Description..."
                                            value={descirption}
                                            onChange={(event) => setDescription(event.target.value)}
                                        />
                                        <label htmlFor="floatingPassword">Descirption</label>
                                    </div>
                                    <div className="form-floating my-3">
                                        <Select
                                            defaultValue={type}
                                            value={type}
                                            onChange={setType}
                                            options={options}
                                            placeholder="Quiz mode..."
                                        />
                                    </div>
                                    <div className='col-md-12 mb-3'>
                                        <label className="form-label label-upload" htmlFor='uploadImage'>
                                            < FcPlus />Upload File Image
                                        </label>
                                        <input
                                            type="file"
                                            hidden
                                            id='uploadImage'
                                            onChange={handleUploadImage}

                                        />
                                    </div>
                                    <div className='col-md-12 img-preview'>
                                        {previewImage ?
                                            <img src={previewImage} alt='logo' />
                                            :
                                            < span >Preview Image</span>
                                        }
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <button
                                        className="btn btn-success"
                                        onClick={handleAddQuizSubmit}
                                    >Save</button>
                                </div>
                                <div className="table-list-quiz">
                                    <TableQuiz
                                        listQuiz={listQuiz}
                                        setListQuiz={setListQuiz}
                                        handleBtnEditQuiz={handleBtnEditQuiz}
                                        handleBtnDeletetQuiz={handleBtnDeletetQuiz}
                                    />
                                </div>
                            </fieldset>
                        </form>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>

            <Accordion defaultActiveKey="1">
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Update Q/A Quizzes</Accordion.Header>
                    <Accordion.Body>
                        <QuizQA />
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>

            <Accordion defaultActiveKey="2">
                <Accordion.Item eventKey="2">
                    <Accordion.Header>Assign Users</Accordion.Header>
                    <Accordion.Body>

                        <AssignQuiz />

                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>


            <ModalUpdateQuiz
                show={showModalEdit}
                setShow={setShowModalEdit}
                dataQuizEdit={dataQuizEdit}
                fetchListQuiz={fetchListQuiz}
                options={options}
                resetQuizUpdate={resetQuizUpdate}
            />
            <ModalDeleteQuiz
                show={showModalDelete}
                setShow={setShowModalDelete}
                dataQuizDelete={dataQuizDelete}
                fetchListQuiz={fetchListQuiz}
            />


        </div>
    )
}

export default ManageQuiz