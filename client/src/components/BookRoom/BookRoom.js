import { useHistory } from 'react-router-dom';
import './BookRoom.scss';
import { TfiClose } from 'react-icons/tfi';
import { HiOutlineSearch } from 'react-icons/hi';
import { MdHotel } from 'react-icons/md';
import React from 'react';
import BookRoomDetail from '../Modal/BookRoomDetail/BookRoomDetail';

const BookRoom = () => {

    const history = useHistory();
    const [showDetailModal, setShowDetailModal] = React.useState(false);

    return (
        <>
            <div className='book-room-container'>
                <div className='header py-2 px-3 d-flex justify-content-between align-items-center'>
                    <span className='title'>Đặt Phòng <span><MdHotel /></span></span>
                    <span className='icon' onClick={() => history.push('/')}><TfiClose className='exit-icon' /></span>
                </div>
                <div className='main px-3 d-flex gap-3 mt-2 mb-2'>
                    <div className='left-content d-flex flex-column justify-content-between'>
                        <div className='top d-flex justify-content-between gap-3 '>
                            <div className='left d-flex flex-column justify-content-between gap-3'>
                                <fieldset className='top-left border rounded-2 p-2'>
                                    <legend className='reset legend-text'>Thông tin đăng ký</legend>
                                    <div className='row align-items-center'>
                                        <div className='form-group col-6'>
                                            <label className='form-label'>Loại phòng:</label>
                                            <select className="form-select">
                                                <option defaultValue={'1'}>Phòng 1 người</option>
                                                <option value="2">Phòng 2 người</option>
                                                <option value="3">Phòng 4 người</option>
                                            </select>
                                        </div>
                                        <div className='form-group col-6'>
                                            <label className='form-label'>Ngày nhận:</label>
                                            <input type='text' className='form-control' />
                                        </div>
                                    </div>
                                    <div className='row mt-1'>
                                        <div className='form-group col-6'>
                                            <label className='form-label'>Số đêm:</label>
                                            <input type='text' className='form-control' />
                                        </div>
                                        <div className='form-group col-6'>
                                            <label className='form-label'>Ngày trả:</label>
                                            <input type='text' className='form-control' />
                                        </div>
                                    </div>
                                </fieldset>
                                <fieldset className='bottom-left border rounded-2 p-2'>
                                    <legend className='reset legend-text'>Tìm kiếm khách hàng</legend>
                                    <div className="input-group">
                                        <input type="text" className="form-control" placeholder="Thẻ căn cước/ CMND" />
                                        <span className="input-group-text search-btn" title='Tìm kiếm'><HiOutlineSearch /></span>
                                    </div>
                                </fieldset>
                            </div>
                            <fieldset className='right border rounded-2 p-2'>
                                <legend className='reset legend-text'>Thông tin loại phòng</legend>
                                <div className='form-group px-4'>
                                    <label className='form-label'>Số phòng:</label>
                                    <input type='text' className='form-control' />
                                </div>
                                <div className='form-group px-4'>
                                    <label className='form-label'>Tên loại phòng:</label>
                                    <input type='text' className='form-control' />
                                </div>
                                <div className='form-group px-4'>
                                    <label className='form-label'>Số lượng người tối đa:</label>
                                    <input type='text' className='form-control' />
                                </div>
                                <div className='form-group px-4'>
                                    <label className='form-label'>Giá:</label>
                                    <input type='text' className='form-control' />
                                </div>
                            </fieldset>
                        </div>
                        <div className='bottom d-flex justify-content-between mt-2 gap-3'>
                            <fieldset className='left border rounded-2 p-2'>
                                <legend className='reset legend-text'>Thông tin khách hàng</legend>
                                <div className='row mb-2'>
                                    <div className='form-group col-6'>
                                        <label className='form-label'>Họ và Tên:</label>
                                        <input type='text' className='form-control' />
                                    </div>
                                    <div className='form-group col-6'>
                                        <label className='form-label'>Ngày sinh:</label>
                                        <input type='text' className='form-control' />
                                    </div>
                                </div>
                                <div className='row mb-2'>
                                    <div className='form-group col-6'>
                                        <label className='form-label'>Thẻ căn cước/ CMND:</label>
                                        <input type='text' className='form-control' />
                                    </div>
                                    <div className='form-group col-6'>
                                        <label className='form-label'>Địa chỉ:</label>
                                        <input type='text' className='form-control' />
                                    </div>
                                </div>
                                <div className='row mb-2'>
                                    <div className='form-group col-6'>
                                        <label className='form-label'>Loại khách hàng:</label>
                                        <select className="form-select">
                                            <option defaultValue={'1'}>Khách du lịch</option>
                                            <option value="2">Khách nội địa</option>
                                            <option value="3">Khác</option>
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
                                <div className='row mb-2'>
                                    <div className='form-group col-6'>
                                        <label className='form-label'>Số điện thoại:</label>
                                        <input type='text' className='form-control' />
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
                            <fieldset className='right border rounded-2 p-2'>
                                <legend className='reset legend-text'>Xác nhận đặt phòng</legend>
                                <div className='checkbox-form mt-4 px-4'>
                                    <input className="form-check-input me-2" type="checkbox" />
                                    <label className="form-check-label">Chuyển đến nhận phòng</label>
                                </div>
                                <div className='mt-4 px-4'>
                                    <button className='btn book-btn'>Đặt Phòng</button>
                                </div>
                                <div className='mt-4 px-4'>
                                    <button className='btn btn-outline-danger cancel-btn'>Hủy</button>
                                </div>
                            </fieldset>
                        </div>
                    </div>
                    <fieldset className='right-content border rounded-2 p-2' onScroll={(event) => {event.preventDefault()}}>
                        <legend className='reset legend-text'>Danh sách đặt phòng trong ngày</legend>
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">Mã đặt phòng</th>
                                    <th scope="col">Họ và Tên</th>
                                    <th scope="col">CMND</th>
                                    <th scope="col">Loại phòng</th>
                                    <th scope="col">Ngày nhận</th>
                                    <th scope="col">Ngày trả</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    [...Array(20)].map((item, index) => {
                                        return (
                                            <tr onClick={() => setShowDetailModal(true)}>
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
            <BookRoomDetail
                show={showDetailModal}
                setShow={setShowDetailModal}
            />
        </>

    )
}

export default BookRoom;