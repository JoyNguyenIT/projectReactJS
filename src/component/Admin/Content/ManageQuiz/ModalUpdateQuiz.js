import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FcPlus } from "react-icons/fc";
import { toast } from 'react-toastify';
import { putUpdateQuiz } from '../../../../services/apiService';
import _ from 'lodash';
import Select from 'react-select';


const ModalUpdateQuiz = (props) => {
    const { show, setShow, dataQuizEdit, options } = props;

    const [quizId, setQuizId] = useState('')
    const [quizName, setQuizName] = useState('')
    const [quizDescription, setQuizDescription] = useState('')
    const [quizDifficulty, setQuizDifficulty] = useState({
        value: '',
        label: ''
    })
    const [quizImage, setQuizImage] = useState(null)
    const [previewImage, setPreviewImage] = useState(null)

    const handleClose = () => {
        setShow(false)
        setQuizId('')
        setQuizName('')
        setQuizDescription('')
        setQuizDifficulty({})
        setQuizImage(null)
        setPreviewImage(null)
        props.resetQuizUpdate()
    }



    useEffect(() => {
        if (!_.isEmpty(dataQuizEdit)) {
            setQuizId(dataQuizEdit.id)
            setQuizName(dataQuizEdit.name)
            setQuizDescription(dataQuizEdit.description)
            setQuizDifficulty({ value: dataQuizEdit.difficulty, label: dataQuizEdit.difficulty })
            setQuizImage(dataQuizEdit.image)
            const base64Image = `data:image/png;base64,${dataQuizEdit.image}`
            setPreviewImage(base64Image)
        }

    }, [dataQuizEdit])


    const handleUploadEditImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            setQuizImage(event.target.files[0])
        }
    }


    const handleSubmitEditQuiz = async () => {
        let data = await putUpdateQuiz(quizId, quizDescription, quizName, quizDifficulty.value, quizImage)

        if (data && data.EC === 0) {
            toast.success(data.EM)
            handleClose()
            await props.fetchListQuiz()
        }

        if (data && data.EC !== 0) {
            toast.error(data.EM)
        }
    }

    return (
        <>
            {/* <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button> */}

            <Modal
                show={show}
                onHide={handleClose}
                size="xl"
                backdrop="static"
                className='modal-add-user'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit Quiz</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Quiz Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={quizName}
                                onChange={(event) => setQuizName(event.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Descirption</label>
                            <input type="text"
                                className="form-control"
                                value={quizDescription}
                                onChange={(event) => setQuizDescription(event.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <Select
                                value={quizDifficulty}
                                onChange={setQuizDifficulty}
                                options={options}
                                placeholder="Quiz mode..."
                            />
                        </div>
                        <div className='col-md-12'>
                            <label className="form-label label-upload" htmlFor='uploadEditImage'>
                                < FcPlus />Upload File Image
                            </label>
                            <input
                                type="file"
                                hidden
                                id='uploadEditImage'
                                onChange={handleUploadEditImage} />
                        </div>
                        <div className='col-md-12 img-preview'>
                            {previewImage ?
                                <img src={previewImage}
                                    alt='Preview'
                                />
                                :
                                < span >Preview Image</span>
                            }
                        </div>


                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmitEditQuiz()
                    }>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal >

        </>
    );
}

export default ModalUpdateQuiz