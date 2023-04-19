import React from 'react';
import Modal from 'react-bootstrap/Modal';
import './BookRoomDetail.scss';

const BookRoomDetail = (props) => {

    const { show, setShow } = props;

    return (
        <>
            <Modal
                show={show}
                size='xl'
                onHide={() => setShow(false)}
                backdrop="static"
                keyboard={false}
                className='book-room-detail-modal'
            >
                <Modal.Header closeButton>
                    <Modal.Title className='title'>Chi tiết đặt phòng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='detail-content'>
                        <fieldset className='book-info border rounded-2 p-3'>
                            <legend className='reset legend-text'>Thông tin đặt phòng</legend>
                            <div className='form-group'>
                                <label className='form-label'>Số phòng:</label>
                                <input type='text' className='form-control' />
                            </div>
                            <div className='form-group mt-2'>
                                <label className='form-label'>Tên loại phòng:</label>
                                <select className="form-select">
                                    <option defaultValue={'1'}>Phòng 1 người</option>
                                    <option value="2">Phòng 2 người</option>
                                    <option value="3">Phòng 4 người</option>
                                </select>
                            </div>
                            <div className='form-group mt-2'>
                                <label className='form-label'>Ngày nhận:</label>
                                <input type='text' className='form-control' />
                            </div>
                            <div className='form-group mt-2'>
                                <label className='form-label'>Ngày trả:</label>
                                <input type='text' className='form-control' />
                            </div>
                            <div className='form-group mt-2'>
                                <label className='form-label'>Số đêm:</label>
                                <input type='text' className='form-control' />
                            </div>
                        </fieldset>
                        <fieldset className='customer-info border rounded-2 p-3'>
                            <legend className='reset legend-text'>Thông tin khách hàng</legend>
                            <div className='row mb-3'>
                                <div className='form-group col-6'>
                                    <label className='form-label'>Họ và Tên:</label>
                                    <input type='text' className='form-control' />
                                </div>
                                <div className='form-group col-6'>
                                    <label className='form-label'>Ngày sinh:</label>
                                    <input type='text' className='form-control' />
                                </div>
                            </div>
                            <div className='row mb-3'>
                                <div className='form-group col-6'>
                                    <label className='form-label'>Thẻ căn cước/ CMND:</label>
                                    <input type='text' className='form-control' />
                                </div>
                                <div className='form-group col-6'>
                                    <label className='form-label'>Địa chỉ:</label>
                                    <input type='text' className='form-control' />
                                </div>
                            </div>
                            <div className='row mb-3'>
                                <div className='form-group col-6'>
                                    <label className='form-label'>Loại khách hàng:</label>
                                    <select className="form-select">
                                        <option defaultValue={'1'}>Khách du lịch</option>
                                        <option value="2">Khách nội địa</option>
                                        <option value="3">Khách mới</option>
                                    </select>
                                </div>
                                <div className='form-group col-6'>
                                    <label className='form-label'>Giới tính:</label>
                                    <select className="form-select">
                                        <option defaultValue={'1'}>Nam</option>
                                        <option value="2">Nữ</option>
                                        <option value="3">Khác</option>
                                    </select>
                                </div>
                            </div>
                            <div className='row mb-3'>
                                <div className='form-group col-6'>
                                    <label className='form-label'>Số điện thoại:</label>
                                    <input type='text' className='form-control' />
                                </div>
                                <div className='form-group col-6'>
                                    <label className='form-label'>Quốc tịch:</label>
                                    <select className="form-select">
                                        <option defaultValue={'1'}>Việt Nam</option>
                                        <option value="2">Khác</option>
                                        <option value="3">Khác</option>
                                    </select>
                                </div>
                            </div>

                        </fieldset>
                    </div>
                    <div className='actions d-flex mt-4 gap-3 justify-content-end'>
                        <div className='edit-button'>
                            <button className='btn'>Lưu thay đổi</button>
                        </div>
                        <div>
                            <button className='btn btn-outline-danger'>Hủy đặt phòng</button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default BookRoomDetail;