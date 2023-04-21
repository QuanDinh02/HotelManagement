import React from 'react';
import Modal from 'react-bootstrap/Modal';
import './AccessManagement.scss';

const AccessManagement = (props) => {

    const { show, setShow } = props;

    return (
        <>
            <Modal
                show={show}
                size='xl'
                onHide={() => setShow(false)}
                backdrop="static"
                keyboard={false}
                className='access-management'
            >
                <Modal.Header closeButton>
                    <Modal.Title className='title'>Quyền Truy Cập</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='main'>
                        <fieldset className='staff-category border rounded-2 p-3'>
                            <legend className='reset legend-text'>Loại nhân viên</legend>
                            <div className='form-group'>
                                <label className='form-label'>Tên loại nhân viên:</label>
                                <select className="form-select">
                                    <option defaultValue={'1'}>Quản lý nhân viên</option>
                                    <option value="2">Nhân viên</option>
                                    <option value="3">Lễ Tân</option>
                                </select>
                            </div>
                            <div className='mt-4 d-flex flex-column col-12'>
                                <button className='btn btn-warning col-12'>Sửa tên quyền</button>
                                <button className='btn btn-success col-12 mt-3'>Thêm quyền</button>
                                <button className='btn btn-outline-danger col-12 mt-3'>Xóa quyền</button>
                            </div>
                        </fieldset>
                        <div className='access-list d-flex gap-3'>
                            <fieldset className='access-table border rounded-2 p-3'>
                                <legend className='reset legend-text'>Quyền được cấp hiện tại</legend>
                                <table className="table table-bordered">
                                    <tbody>
                                        <tr className='access'>
                                            <td>Đặt phòng</td>
                                        </tr>
                                        <tr className='access'>
                                            <td>Nhận phòng</td>
                                        </tr>
                                        <tr className='access'>
                                            <td>Thống kê và doanh thu</td>
                                        </tr>
                                        <tr className='access'>
                                            <td>Sử dụng dịch vụ và thanh toán</td>
                                        </tr>
                                        <tr className='access'>
                                            <td>Quản lý phòng</td>
                                        </tr>
                                        <tr className='access'>
                                            <td>Quản lý nhân viên</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </fieldset>
                            <fieldset className='not-access-table border rounded-2 p-3'>
                                <legend className='reset legend-text'>Quyền chưa được cấp</legend>
                                <table className="table table-bordered">
                                    <tbody>
                                        <tr>
                                            <td>Quy định</td>
                                        </tr>
                                        <tr>
                                            <td>Quản lý khách hàng</td>
                                        </tr>
                                        <tr>
                                            <td>Quản lý khách hàng</td>
                                        </tr>
                                        <tr>
                                            <td>Quản lý hóa đơn</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </fieldset>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default AccessManagement;