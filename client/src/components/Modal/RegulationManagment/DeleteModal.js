import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { GoAlert } from 'react-icons/go';
import './Modal.scss';

const DeleteRegulationModal = (props) => {

    const { show, setShow, handleDelete } = props;

    const handleDeleteFunc = () => {
        handleDelete();
        setShow(false);
    }

    return (
        <>
            <Modal
                className='room-delete-modal'
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
                    Bạn muốn xóa quy định này ?
                </Modal.Body>
                <Modal.Footer className='modal-footer'>
                    <Button variant="outline-danger" onClick={handleDeleteFunc}>Xóa</Button>
                    <Button variant="light" onClick={() => setShow(false)}>Hủy</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default DeleteRegulationModal;