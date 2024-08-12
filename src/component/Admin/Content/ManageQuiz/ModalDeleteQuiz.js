import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { deleteQuiz } from '../../../../services/apiService';

const ModalDeleteQuiz = (props) => {
    const { show, setShow, dataQuizDelete } = props;

    const handleClose = () => setShow(false);

    const handleConformDeleteQuiz = async () => {
        let data = await deleteQuiz(dataQuizDelete.id)

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
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Conform delete this quiz</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure to delete this quiz, <b>Name: {`${dataQuizDelete.name}`}</b></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleConformDeleteQuiz}>
                        Conform
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteQuiz;