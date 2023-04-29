import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const DeleteModal = (props) => {

    const { show, setShow, handleDeleteStaff } = props;

    const handleDelete = () => {
        handleDeleteStaff();
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
                    <span>Bạn muốn xóa nhân viên này ?</span>
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