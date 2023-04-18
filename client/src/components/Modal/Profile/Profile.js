import React from 'react';
import Modal from 'react-bootstrap/Modal';
import './Profile.scss';
import Customer from '../../../assets/images/customer.png';

const Profile = (props) => {
    const { show, setShow } = props;

    return (
        <>
            <Modal
                show={show}
                size='xl'
                onHide={() => setShow(false)}
                backdrop="static"
                keyboard={false}
                className='profile-modal'
            >
                <Modal.Header closeButton>
                    <Modal.Title className='title'>Thông Tin Cá Nhân</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='content'>
                        <div className='top-content'>
                            <div className='profile-image d-flex flex-column align-items-center pt-3'>
                                <div className='image'>
                                    <img src={Customer} alt='' />
                                </div>
                                <div className='username mt-2'>
                                    <span>tdc123</span>
                                </div>
                                <div className='profile-name mt-2'>
                                    <span>Nguyễn Tiến A</span>
                                </div>
                            </div>
                            <fieldset className='account-info border rounded-2 p-3'>
                                <legend className='reset legend-text'>Thông tin tài khoản</legend>
                                <div className='form-group'>
                                    <label className='form-label'>Loại tài khoản:</label>
                                    <input type='text' className='form-control' />
                                </div>
                                <div className='form-group mt-2'>
                                    <label className='form-label'>Tên đăng nhập:</label>
                                    <input type='text' className='form-control' />
                                </div>
                                <div className='form-group mt-2'>
                                    <label className='form-label'>Tên hiển thị:</label>
                                    <input type='text' className='form-control' />
                                </div>
                                <div className='edit-button mt-4'>
                                    <button className='btn'>Lưu thay đổi</button>
                                </div>
                            </fieldset>
                            <fieldset className='set-password border rounded-2 p-3'>
                                <legend className='reset legend-text'>Thay đổi mật khẩu</legend>
                                <div className='form-group'>
                                    <label className='form-label'>Mật khẩu:</label>
                                    <input type='text' className='form-control' />
                                </div>
                                <div className='form-group mt-2'>
                                    <label className='form-label'>Mật khẩu mới:</label>
                                    <input type='text' className='form-control' />
                                </div>
                                <div className='form-group mt-2'>
                                    <label className='form-label'>Xác nhận mật khẩu:</label>
                                    <input type='text' className='form-control' />
                                </div>
                                <div className='edit-button mt-4'>
                                    <button className='btn'>Lưu thay đổi</button>
                                </div>
                            </fieldset>
                        </div>
                        <fieldset className='bottom-content mt-2 border rounded-2 p-3'>
                            <legend className='reset legend-text'>Thông tin cơ bản</legend>
                            <div className='row'>
                                <div className='form-group col-4'>
                                    <label className='form-label'>Thẻ căn cước / CMND:</label>
                                    <input type='text' className='form-control' />
                                </div>
                                <div className='form-group col-4'>
                                    <label className='form-label'>Số điện thoại:</label>
                                    <input type='text' className='form-control' />
                                </div>
                                <div className='col-4'>
                                    <label className='form-label'>Giới tính:</label>
                                    <select className="form-select">
                                        <option defaultValue={'1'}>Nam</option>
                                        <option value="2">Nữ</option>
                                        <option value="3">Khác</option>
                                    </select>
                                </div>
                            </div>
                            <div className='row mt-2'>
                                <div className='form-group col-4'>
                                    <label className='form-label'>Địa chỉ:</label>
                                    <input type='text' className='form-control' />
                                </div>
                                <div className='form-group col-4'>
                                    <label className='form-label'>Ngày sinh:</label>
                                    <input type='text' className='form-control' />
                                </div>
                                <div className='form-group col-4'>
                                    <label className='form-label'>Ngày vào làm:</label>
                                    <input type='text' className='form-control' />
                                </div>

                            </div>
                            <div className='edit-button float-end col-3 mt-4'>
                                <button className='btn'>Lưu thay đổi</button>
                            </div>

                        </fieldset>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default Profile;