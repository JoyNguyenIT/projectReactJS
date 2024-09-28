import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


function ModalResultQuiz(props) {
    const { show, setShow, dataResult, setIsShowAnswer } = props;



    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleShowAnswer = () => {
        setIsShowAnswer(true)
    }



    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Your Result: </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div> Total Question:{dataResult.countTotal} </div>
                    <div>Total Correct:{dataResult.countCorrect}</div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleShowAnswer}>
                        Show Answer
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalResultQuiz;