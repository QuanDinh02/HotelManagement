import { useHistory } from 'react-router-dom';
import './ReceiveRoom.scss';
import { TfiClose } from 'react-icons/tfi';
import { HiOutlineSearch } from 'react-icons/hi';
import { FaKey } from 'react-icons/fa';
import React from 'react';

const ReceiveRoom = () => {

    const history = useHistory();

    return (
        <>
            <div className='receive-room-container'>
                <div className='header py-2 ps-5 pe-3 d-flex justify-content-between align-items-center'>
                    <span className='title'>Nhận Phòng <span><FaKey /></span></span>
                    <span className='icon' onClick={() => history.push('/')}><TfiClose className='exit-icon' /></span>
                </div>
                <div className='main px-3 d-flex gap-3 mt-2 mb-2'>
                    <div className='left-content d-flex flex-column'>
                        <fieldset className='top border rounded-2 pt-2 pb-3'>
                            <legend className='reset legend-text'>Tìm kiếm khách hàng</legend>
                            <div className="input-group px-4">
                                <input type="text" className="form-control" placeholder="Tên/ số điện thoại của khách hàng" />
                                <span className="input-group-text search-btn" title='Tìm kiếm'><HiOutlineSearch /></span>
                            </div>
                        </fieldset>
                        <fieldset className='middle border rounded-2 pb-3'>
                            <legend className='reset legend-text'>Thông tin nhận phòng</legend>
                            <div className='row align-items-center px-4'>
                                <div className='form-group col-6'>
                                    <label className='form-label'>Họ và Tên:</label>
                                    <input type='text' className='form-control' />
                                </div>
                                <div className='form-group col-6'>
                                    <label className='form-label'>Ngày nhận:</label>
                                    <input type='text' className='form-control' />
                                </div>
                            </div>
                            <div className='row mt-1 px-4'>
                                <div className='form-group col-6'>
                                    <label className='form-label'>Thẻ căn cước/ CMND:</label>
                                    <input type='text' className='form-control' />
                                </div>
                                <div className='form-group col-6'>
                                    <label className='form-label'>Ngày trả:</label>
                                    <input type='text' className='form-control' />
                                </div>
                            </div>
                            <div className='row mt-1 px-4'>
                                <div className='form-group col-6'>
                                    <label className='form-label'>Số phòng:</label>
                                    <input type='text' className='form-control' />
                                </div>
                                <div className='form-group col-6'>
                                    <label className='form-label'>Số lượng người tối đa:</label>
                                    <input type='text' className='form-control' />
                                </div>
                            </div>
                            <div className='row mt-1 px-4'>
                                <div className='form-group col-6'>
                                    <label className='form-label'>Loại phòng:</label>
                                    <input type='text' className='form-control' />
                                </div>
                                <div className='form-group col-6'>
                                    <label className='form-label'>Giá phòng:</label>
                                    <input type='text' className='form-control' />
                                </div>
                            </div>
                        </fieldset>
                        <fieldset className='border rounded-2 p-2'>
                            <legend className='reset legend-text'>Chức năng</legend>
                            <div className='row mb-3 px-4'>
                                <div className='form-group col-6'>
                                    <button className='btn btn-outline-danger col-12'>Hủy đặt phòng</button>

                                </div>
                                <div className='form-group col-6'>
                                    <button className='btn receive-btn col-12'>Nhận phòng</button>
                                </div>
                            </div>
                            <div className='row px-4'>
                                <div className='form-group col-6'>
                                    <button className='btn btn-primary col-12'>Đổi phòng</button>
                                </div>
                                <div className='form-group col-6'>
                                    <button className='btn btn-warning col-12'>Thay đổi</button>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                    <fieldset className='right-content border rounded-2 p-2' onScroll={(event) => { event.preventDefault() }}>
                        <legend className='reset legend-text'>Danh sách nhận phòng trong ngày</legend>
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">Số phòng nhận</th>
                                    <th scope="col">Họ và Tên</th>
                                    <th scope="col">Số điện thoại</th>
                                    <th scope="col">Loại phòng</th>
                                    <th scope="col">Ngày nhận</th>
                                    <th scope="col">Ngày trả</th>
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
                                                <td>VIP</td>
                                                <td>12/03/2020</td>
                                                <td>14/03/2020</td>
                                            </tr>
                                        )
                                    })
                                }
                                <tr className='already-book'>
                                    <td>21</td>
                                    <td>Tran Cao Van</td>
                                    <td>543534535345</td>
                                    <td>VIP</td>
                                    <td>12/03/2020</td>
                                    <td>14/03/2020</td>
                                </tr>
                            </tbody>
                        </table>
                    </fieldset>
                </div>
            </div>
        </>

    )
}

export default ReceiveRoom;