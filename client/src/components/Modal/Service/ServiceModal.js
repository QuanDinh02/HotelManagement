import React from 'react';
import Modal from 'react-bootstrap/Modal';
import './ServiceModal.scss';

const ServiceModal = (props) => {

    const { show, setShow } = props;

    return (
        <>
            <Modal
                show={show}
                onHide={() => setShow(false)}
                backdrop="static"
                keyboard={false}
                className='service-modal'
            >
                <Modal.Header closeButton>
                    <Modal.Title className='title'>Thêm mới Dịch Vụ</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='main'>
                        <fieldset className='service-category-info border rounded-2 p-3'>
                            <legend className='reset legend-text'>Thông tin dịch vụ</legend>
                            <div className='d-flex justify-content-between'>
                                <div className='form-group col-6'>
                                    <label className='form-label'>Tên dịch vụ:</label>
                                    <input type='text' className='form-control' />
                                </div>
                                <div className='form-group col-5'>
                                    <label className='form-label'>Loại dịch vụ:</label>
                                    <select className="form-select">
                                        <option defaultValue={'1'}>Ăn uống</option>
                                        <option value="2">Giải trí</option>
                                        <option value="3">Tiện ích</option>
                                    </select>
                                </div>
                            </div>
                            <div className='form-group mt-2'>
                                <label className='form-label'>Giá dịch vụ:</label>
                                <input type='text' className='form-control' />
                            </div>
                            <div className='form-group mt-4'>
                                <button className='btn btn-success w-100'>Thêm mới</button>
                            </div>
                            <div className='form-group mt-4'>
                                <button className='btn btn-outline-danger w-100' onClick={() => setShow(false)}>Hủy</button>
                            </div>

                        </fieldset>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ServiceModal;