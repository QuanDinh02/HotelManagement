import { useHistory } from 'react-router-dom';
import './CustomerManagement.scss';
import { TfiClose } from 'react-icons/tfi';
import { HiOutlineSearch } from 'react-icons/hi';
import React from 'react';
import CustomerHistory from '../Modal/CustomerHistory/CustomerHistory';

const CustomerManagement = () => {

    const history = useHistory();
    const [showCustomerHistory, setShowCustomerHistory] = React.useState(false);

    return (
        <>
            <div className='customer-management-container'>
                <div className='header py-2 ps-5 pe-3 d-flex justify-content-between align-items-center'>
                    <span className='title'>Quản Lý Khách Hàng</span>
                    <span className='icon' onClick={() => history.push('/')}><TfiClose className='exit-icon' /></span>
                </div>
                <div className='main px-3 d-flex gap-3 mt-2 mb-2'>
                    <div className='left-content d-flex flex-column gap-3'>
                        <fieldset className='top border rounded-2 pt-2 pb-3'>
                            <legend className='reset legend-text'>Tìm kiếm khách hàng</legend>
                            <div className="input-group px-4">
                                <input type="text" className="form-control" placeholder="Tên/ số điện thoại của khách hàng" />
                                <span className="input-group-text search-btn" title='Tìm kiếm'><HiOutlineSearch /></span>
                            </div>
                        </fieldset>
                        <fieldset className='middle border rounded-2 pb-3'>
                            <legend className='reset legend-text'>Thông tin khách hàng</legend>
                            <div className='row align-items-center px-4'>
                                <div className='form-group col-6'>
                                    <label className='form-label'>Họ và Tên:</label>
                                    <input type='text' className='form-control' />
                                </div>
                                <div className='form-group col-6'>
                                    <label className='form-label'>Ngày sinh:</label>
                                    <input type='text' className='form-control' />
                                </div>
                            </div>
                            <div className='row mt-1 px-4'>
                                <div className='form-group col-6'>
                                    <label className='form-label'>Thẻ căn cước/ CMND:</label>
                                    <input type='text' className='form-control' />
                                </div>
                                <div className='form-group col-6'>
                                    <label className='form-label'>Số điện thoại:</label>
                                    <input type='text' className='form-control' />
                                </div>
                            </div>
                            <div className='row mt-1 px-4'>
                                <div className='form-group col-6'>
                                    <label className='form-label'>Loại khách hàng:</label>
                                    <select className="form-select">
                                        <option defaultValue={'1'}>Khách du lịch</option>
                                        <option value="2">Khách nội địa</option>
                                        <option value="3">Khách cũ</option>
                                    </select>
                                </div>
                                <div className='form-group col-6'>
                                    <label className='form-label'>Địa chỉ:</label>
                                    <input type='text' className='form-control' />
                                </div>
                            </div>
                            <div className='row mt-1 px-4'>
                                <div className='form-group col-6'>
                                    <label className='form-label'>Giới tính:</label>
                                    <select className="form-select">
                                        <option defaultValue={'1'}>Nam</option>
                                        <option value="2">Nữ</option>
                                        <option value="3">Khác</option>
                                    </select>
                                </div>
                                <div className='form-group col-6'>
                                    <label className='form-label'>Quốc tịch:</label>
                                    <select className="form-select">
                                        <option defaultValue={'1'}>Việt Nam</option>
                                        <option value="2">Khác</option>
                                    </select>
                                </div>
                            </div>
                        </fieldset>
                        <fieldset className='border rounded-2 p-2'>
                            <legend className='reset legend-text'>Chức năng</legend>
                            <div className='row mb-3 px-4'>
                                <div className='form-group col-6'>
                                    <button className='btn btn-outline-danger col-12'>Xóa khách hàng</button>
                                </div>
                                <div className='form-group col-6'>
                                    <button className='btn btn-warning col-12'>Chỉnh sửa</button>
                                </div>
                            </div>
                            <div className='row mb-3 px-4'>
                                <div className='form-group col-6'>
                                    <button className='btn btn-secondary col-12' onClick={() => setShowCustomerHistory(true)}>Lịch sử Khách hàng</button>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                    <fieldset className='right-content border rounded-2 p-2' onScroll={(event) => { event.preventDefault() }}>
                        <legend className='reset legend-text'>Danh sách Khách hàng</legend>
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">STT</th>
                                    <th scope="col">Họ và Tên</th>
                                    <th scope="col">CCCD/ CMND</th>
                                    <th scope="col">Loại</th>
                                    <th scope="col">Số điện thoại</th>
                                    <th scope="col">Địa chỉ</th>
                                    <th scope="col">Quốc tịch</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    [...Array(15)].map((item, index) => {
                                        return (
                                            <tr>
                                                <td>{index + 1}</td>
                                                <td>Nguyen Le Thi Dung</td>
                                                <td>543534535345</td>
                                                <td>Khách du lịch</td>
                                                <td>090123654</td>
                                                <td>12/434 Lê Quang Diệu, Q.12, TPHCM</td>
                                                <td>Việt Nam</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </fieldset>
                </div>
            </div>
            <CustomerHistory
                show={showCustomerHistory}
                setShow={setShowCustomerHistory}
            />
        </>

    )
}

export default CustomerManagement;