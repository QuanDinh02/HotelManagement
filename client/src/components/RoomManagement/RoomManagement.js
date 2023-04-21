import { useHistory } from 'react-router-dom';
import './RoomManagement.scss';
import { TfiClose } from 'react-icons/tfi';
import { HiOutlineSearch } from 'react-icons/hi';
import { MdBedroomParent } from 'react-icons/md';
import React from 'react';
import { CurrencyFormat } from '../Format/FormatNumber';
import RoomCategory from '../Modal/RoomCategory/RoomCategory';

const RoomManagement = () => {

    const history = useHistory();
    const [showRoomCategory, setShowRoomCategory] = React.useState(false);

    return (
        <>
            <div className='room-management-container'>
                <div className='header py-2 ps-5 pe-3 d-flex justify-content-between align-items-center'>
                    <span className='title'>Quản Lý Phòng <span><MdBedroomParent /></span></span>
                    <span className='icon' onClick={() => history.push('/')}><TfiClose className='exit-icon' /></span>
                </div>
                <div className='main px-3 d-flex gap-3 mt-2 mb-2'>
                    <div className='left-content d-flex flex-column gap-3'>
                        <fieldset className='top border rounded-2 pt-2 pb-3'>
                            <legend className='reset legend-text'>Tìm kiếm phòng</legend>
                            <div className="input-group px-4">
                                <input type="text" className="form-control" placeholder="Tên/ loại phòng" />
                                <span className="input-group-text search-btn" title='Tìm kiếm'><HiOutlineSearch /></span>
                            </div>
                        </fieldset>
                        <fieldset className='middle border rounded-2 pb-3'>
                            <legend className='reset legend-text'>Thông tin phòng</legend>
                            <div className='row align-items-center px-4'>
                                <div className='form-group col-6'>
                                    <label className='form-label'>Số phòng:</label>
                                    <input type='text' className='form-control' />
                                </div>
                                <div className='form-group col-6'>
                                    <label className='form-label'>Loại phòng:</label>
                                    <select className="form-select">
                                        <option defaultValue={'1'}>Phòng 1 người</option>
                                        <option value="2">Phòng 2 người</option>
                                        <option value="3">Phòng 4 người</option>
                                    </select>
                                </div>
                            </div>
                            <div className='row mt-1 px-4'>
                                <div className='form-group col-6'>
                                    <label className='form-label'>Giá phòng:</label>
                                    <input type='text' className='form-control' />
                                </div>
                                <div className='form-group col-6'>
                                    <label className='form-label'>Trạng thái:</label>
                                    <input type='text' className='form-control' />
                                </div>
                            </div>
                            <div className='row mt-1 px-4'>
                                <div className='form-group col-6'>
                                    <label className='form-label'>Số lượng người tối đa:</label>
                                    <input type='text' className='form-control' />
                                </div>
                            </div>
                        </fieldset>
                        <fieldset className='border rounded-2 p-2'>
                            <legend className='reset legend-text'>Chức năng</legend>
                            <div className='row mb-3 px-4'>
                                <div className='form-group col-6'>
                                    <button className='btn btn-outline-danger col-12'>Hủy phòng</button>

                                </div>
                                <div className='form-group col-6'>
                                    <button className='btn btn-success col-12'>Thêm phòng</button>
                                </div>
                            </div>
                            <div className='row px-4'>
                                <div className='form-group col-6'>
                                    <button className='btn btn-warning col-12'>Cập nhật phòng</button>
                                </div>
                                <div className='form-group col-6'>
                                    <button className='btn btn-primary col-12' onClick={() => setShowRoomCategory(true)}>Quản lý Loại phòng</button>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                    <fieldset className='right-content border rounded-2 p-2' onScroll={(event) => { event.preventDefault() }}>
                        <legend className='reset legend-text'>Danh sách tất cả các phòng</legend>
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">Số phòng</th>
                                    <th scope="col">Loại phòng</th>
                                    <th scope="col">Giá</th>
                                    <th scope="col">Số người tối đa</th>
                                    <th scope="col">Trạng thái</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    [...Array(4)].map((item, index) => {
                                        return (
                                            <tr>
                                                <td>{index + 1}</td>
                                                <td>Phòng 1 người</td>
                                                <td>{CurrencyFormat(7000000)}</td>
                                                <td>1</td>
                                                <td>Có người</td>
                                            </tr>
                                        )
                                    })
                                }
                                {
                                    [...Array(16)].map((item, index) => {
                                        return (
                                            <tr>
                                                <td>{index + 5}</td>
                                                <td>Phòng 2 người</td>
                                                <td>{CurrencyFormat(10000000)}</td>
                                                <td>2</td>
                                                <td>Trống</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </fieldset>
                </div>
            </div>
            <RoomCategory
                show={showRoomCategory}
                setShow={setShowRoomCategory}
            />
        </>

    )
}

export default RoomManagement;