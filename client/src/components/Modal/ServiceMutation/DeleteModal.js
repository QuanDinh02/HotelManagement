import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const DeleteModal = (props) => {

    const { show, setShow, handleDeleteService } = props;

    const handleDelete = () => {
        handleDeleteService();
        setShow(false);
    }

    return (
        <>
            <Modal
                show={show}
                onHide={() => setShow(false)}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <span>Bạn muốn xóa dịch vụ này ?</span>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-danger" onClick={handleDelete}>Xóa</Button>
                    <Button variant="light" onClick={() => setShow(false)}>Hủy</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default DeleteModal;