import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { GoAlert } from 'react-icons/go';
import './DeleteBookRoomModal.scss';

const DeleteModal = (props) => {

    const { show, setShow, handleDelete } = props;

    const handleDeleteFunc = () => {
        handleDelete();
        setShow(false);
    }

    return (
        <>
            <Modal
                className='book-room-delete-modal'
                show={show}
                onHide={() => setShow(false)}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Header className='modal-header' closeButton>
                    <GoAlert className='alert-icon'/>
                </Modal.Header>
                <Modal.Body className='modal-body'>
                    Bạn muốn xóa <span className='notice'>đặt phòng</span> này ? 
                </Modal.Body>
                <Modal.Footer className='modal-footer'>
                    <Button variant="outline-danger" onClick={handleDeleteFunc}>Xóa</Button>
                    <Button variant="light" onClick={() => setShow(false)}>Hủy</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default DeleteModal;