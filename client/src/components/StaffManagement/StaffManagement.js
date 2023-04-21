import { useHistory } from 'react-router-dom';
import './StaffManagement.scss';
import { TfiClose } from 'react-icons/tfi';
import { HiOutlineSearch } from 'react-icons/hi';
import { FaUserTie } from 'react-icons/fa';
import React from 'react';
import AccessManagement from '../Modal/AccessManagement/AccessManagement';

const StaffManagement = () => {

    const history = useHistory();
    const [showAccessControl, setShowAccessControl] = React.useState(false);

    return (
        <>
            <div className='staff-management-container'>
                <div className='header py-2 ps-5 pe-3 d-flex justify-content-between align-items-center'>
                    <span className='title'>Quản Lý Nhân Viên<span className='ms-2'><FaUserTie /></span></span>
                    <span className='icon' onClick={() => history.push('/')}><TfiClose className='exit-icon' /></span>
                </div>
                <div className='main px-3 d-flex gap-3 mt-2 mb-2'>
                    <div className='left-content d-flex flex-column gap-2'>
                        <div className='top-left d-flex gap-3'>
                            <div className='left d-flex flex-column gap-2'>
                                <fieldset className='top border rounded-2 pt-2 pb-3'>
                                    <legend className='reset legend-text'>Tìm kiếm nhân viên</legend>
                                    <div className="input-group px-4">
                                        <input type="text" className="form-control" placeholder="Tài khoản/ Tên/ CMND/ SĐT" />
                                        <span className="input-group-text search-btn" title='Tìm kiếm'><HiOutlineSearch /></span>
                                    </div>
                                </fieldset>
                                <fieldset className='bottom border rounded-2 pb-3'>
                                    <legend className='reset legend-text'>Tài khoản nhân viên</legend>
                                    <div className='form-group col-12 px-4 mt-2'>
                                        <label className='form-label'>Tên đăng nhập:</label>
                                        <input type='text' className='form-control' />
                                    </div>
                                    <div className='form-group col-12 px-4 mt-2'>
                                        <label className='form-label'>Loại nhân viên:</label>
                                        <select className="form-select">
                                            <option defaultValue={'1'}>Quản lí Nhân viên</option>
                                            <option value="2">Lễ Tân</option>
                                            <option value="3">Bellman</option>
                                        </select>
                                    </div>
                                    <div className='form-group col-12 px-4 mt-2'>
                                        <label className='form-label'>Ngày vào làm:</label>
                                        <input type='text' className='form-control' />
                                    </div>
                                </fieldset>
                            </div>
                            <fieldset className='right border rounded-2 pb-3'>
                                <legend className='reset legend-text'>Thông tin nhân viên</legend>
                                <div className='form-group col-12 px-4 mt-2'>
                                    <label className='form-label'>Tên:</label>
                                    <input type='text' className='form-control' />
                                </div>
                                <div className='form-group col-12 px-4 mt-2'>
                                    <label className='form-label'>Số CCCD/ CMND:</label>
                                    <input type='text' className='form-control' />
                                </div>
                                <div className='form-group col-12 px-4 mt-2'>
                                    <label className='form-label'>Giới tính:</label>
                                    <select className="form-select">
                                        <option defaultValue={'1'}>Nam</option>
                                        <option value="2">Nữ</option>
                                        <option value="3">Khác</option>
                                    </select>
                                </div>
                                <div className='form-group col-12 px-4 mt-2'>
                                    <label className='form-label'>Ngày sinh:</label>
                                    <input type='text' className='form-control' />
                                </div>
                                <div className='form-group col-12 px-4 mt-2'>
                                    <label className='form-label'>Số điện thoại:</label>
                                    <input type='text' className='form-control' />
                                </div>
                                <div className='form-group col-12 px-4 mt-2'>
                                    <label className='form-label'>Địa chỉ:</label>
                                    <input type='text' className='form-control' />
                                </div>
                            </fieldset>
                        </div>
                        <fieldset className='bottom-left border rounded-2 p-2'>
                            <legend className='reset legend-text'>Chức năng</legend>
                            <div className='row mb-3 px-4'>
                                <div className='form-group col-6'>
                                    <button className='btn btn-outline-danger col-12'>Xóa nhân viên</button>
                                </div>
                                <div className='form-group col-6'>
                                    <button className='btn btn-success col-12'>Thêm nhân viên</button>
                                </div>
                            </div>
                            <div className='row px-4'>
                                <div className='form-group col-6'>
                                    <button className='btn btn-warning col-12'>Cập nhật nhân viên</button>
                                </div>
                                <div className='form-group col-6'>
                                    <button className='btn btn-primary col-12' onClick={() => setShowAccessControl(true)}>Quyền truy cập</button>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                    <fieldset className='right-content border rounded-2 p-2' onScroll={(event) => { event.preventDefault() }}>
                        <legend className='reset legend-text'>Danh sách nhân viên</legend>
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">Tên đăng nhập</th>
                                    <th scope="col">Tên</th>
                                    <th scope="col">Loại</th>
                                    <th scope="col">CMND</th>
                                    <th scope="col">SĐT</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    [...Array(3)].map(item => {
                                        return (
                                            <tr>
                                                <td>staff123</td>
                                                <td>Ngô Hữu Toàn</td>
                                                <td>Quản lí Nhân Viên</td>
                                                <td>123456879</td>
                                                <td>090882741</td>
                                            </tr>
                                        )
                                    })
                                }
                                {
                                    [...Array(12)].map(item => {
                                        return (
                                            <tr>
                                                <td>staff111</td>
                                                <td>Nguyễn Văn Lượng</td>
                                                <td>Lễ Tân</td>
                                                <td>123456879</td>
                                                <td>090882741</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </fieldset>
                </div>
            </div>
            <AccessManagement
                show={showAccessControl}
                setShow={setShowAccessControl}
            />
            {/* <RoomCategory
                show={showRoomCategory}
                setShow={setShowRoomCategory}
            /> */}
        </>

    )
}

export default StaffManagement;