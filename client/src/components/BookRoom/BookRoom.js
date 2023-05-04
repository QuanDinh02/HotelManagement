import { useHistory } from 'react-router-dom';
import './BookRoom.scss';
import { TfiClose } from 'react-icons/tfi';
import { HiOutlineSearch } from 'react-icons/hi';
import { IoMdRefresh } from 'react-icons/io';
import { MdHotel } from 'react-icons/md';
import React from 'react';
import BookRoomDetail from '../Modal/BookRoomDetail/BookRoomDetail';
import { GET_ALL_HOTEL_ROOM_USE } from '../Query/HotelRoomUseQuery';
import { useLazyQuery } from '@apollo/client';
import { useImmer } from "use-immer";
import _ from 'lodash';

const BookRoom = () => {

    const history = useHistory();
    const [showDetailModal, setShowDetailModal] = React.useState(false);
    const [newCustomer, setNewCustomer] = React.useState(true);
    const [hotelRoomUseList, setHotelRoomUseList] = useImmer([]);

    const [getHotelRoomUseList, { refetch }] = useLazyQuery(GET_ALL_HOTEL_ROOM_USE);

    const fetchHotelRoomUseList = async () => {
        let { data: hotel_room_use } = await getHotelRoomUseList();

        let _hotelRoomUse = hotel_room_use?.hotel_room_use_list.map(item => {
            return {
                ...item, isSelected: false
            }
        });
        setHotelRoomUseList(_hotelRoomUse);
    }

    React.useEffect(() => {
        fetchHotelRoomUseList();
    }, []);

    return (
        <>
            <div className='book-room-container'>
                <div className='header py-2 ps-5 pe-3 d-flex justify-content-between align-items-center'>
                    <span className='title'>Đặt Phòng <span><MdHotel /></span></span>
                    <span className='icon' onClick={() => history.push('/')}><TfiClose className='exit-icon' /></span>
                </div>
                <div className='main px-3 d-flex gap-3 mt-2 mb-2'>
                    <div className='left-content d-flex flex-column gap-3'>
                        <fieldset className='first-form border rounded-2 pt-2 px-4'>
                            <legend className='reset legend-text'>Tìm kiếm khách hàng</legend>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" placeholder="Tên/ số điện thoại khách hàng" />
                                <span className="input-group-text search-btn" title='Tìm kiếm'><HiOutlineSearch /></span>
                            </div>
                        </fieldset>
                        <fieldset className='second-form border rounded-2 px-4'>
                            <legend className='reset legend-text'>Thông tin phòng đăng ký</legend>
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
                                    <label className='form-label'>Số phòng:</label>
                                    <select className="form-select">
                                        <option defaultValue={'1'}>Phòng 101</option>
                                        <option value="2">Phòng 102</option>
                                        <option value="3">Phòng 103</option>
                                    </select>
                                </div>
                            </div>
                            <div className='row my-2'>
                                <div className='form-group col-6'>
                                    <label className='form-label'>Số người tối đa:</label>
                                    <input type='text' className='form-control' disabled />
                                </div>
                                <div className='form-group col-6'>
                                    <label className='form-label'>Giá:</label>
                                    <input type='text' className='form-control' disabled />
                                </div>
                            </div>
                            <div className='row mb-4'>
                                <div className='form-group col-6'>
                                    <label className='form-label'>Ngày nhận phòng:</label>
                                    <input type='text' className='form-control' />
                                </div>
                                <div className='form-group col-6'>
                                    <label className='form-label'>Ngày trả phòng:</label>
                                    <input type='text' className='form-control' />
                                </div>
                            </div>
                        </fieldset>
                        <fieldset className='third-form border rounded-2 py-3 px-4'>
                            <legend className='reset legend-text'>
                                {newCustomer ? <span>Thông tin khách hàng mới</span> : <span>Thông tin khách hàng cũ</span>}

                            </legend>
                            <div className='d-flex justify-content-end gap-2 mb-4'>
                                <span className='badge text-bg-success btn' onClick={() => setNewCustomer(true)}>New Customer</span>
                                <span className='badge text-bg-warning btn' onClick={() => setNewCustomer(false)}>Old Customer</span>
                            </div>
                            {
                                newCustomer ?
                                    <>
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
                                    </>

                                    :
                                    <>
                                        <div className='row mb-2'>
                                            <div className='form-group col-6'>
                                                <label className='form-label'>Họ và Tên:</label>
                                                <input type='text' className='form-control' />
                                            </div>
                                            <div className='form-group col-6'>
                                                <label className='form-label'>Số điện thoại:</label>
                                                <input type='text' className='form-control' />
                                            </div>
                                        </div>
                                    </>
                            }
                        </fieldset>
                        <fieldset className='last-confirm-form border rounded-2 p-2'>
                            <legend className='reset legend-text'>Xác nhận đặt phòng</legend>
                            <div className='checkbox-form mt-4 px-4'>
                                <input className="form-check-input me-2" type="checkbox" />
                                <label className="form-check-label">Chuyển đến nhận phòng</label>
                            </div>
                            <div className='d-flex'>
                                <div className='mt-4 ps-4 pe-3 col-6'>
                                    <button className='btn btn-primary cancel-btn'>
                                        <span className='refresh-btn'><IoMdRefresh className='refresh-icon' /> Làm mới</span>
                                    </button>
                                </div>
                                <div className='mt-4 pe-4 ps-3 col-6'>
                                    <button className='btn book-btn'>Đặt phòng</button>
                                </div>
                            </div>


                        </fieldset>
                    </div>
                    <fieldset className='right-content border rounded-2 p-2' onScroll={(event) => { event.preventDefault() }}>
                        <legend className='reset legend-text'>Lịch sử đặt phòng</legend>
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">Số phòng đặt</th>
                                    <th scope="col">Họ và Tên</th>
                                    <th scope="col">Số điện thoại</th>
                                    <th scope="col">Loại phòng</th>
                                    <th scope="col">Ngày nhận</th>
                                    <th scope="col">Ngày trả</th>
                                    <th scope="col">Trạng thái</th>
                                </tr>
                            </thead>
                            <tbody>
                                {hotelRoomUseList && hotelRoomUseList.length > 0 &&
                                    hotelRoomUseList.map((item, index) => {
                                        return (
                                            <tr
                                                key={`hotel-room-use-${item.id}`}
                                                className={item.isSelected ? 'selected-row' : ''}
                                                onClick={() => setShowDetailModal(true)}
                                            // onClick={() => handleSelectingService(item)}
                                            >
                                                <td>{item.room?.id}</td>
                                                <td>{item.customer?.name}</td>
                                                <td>{item.customer?.phone}</td>
                                                <td>{item.room?.category}</td>
                                                <td>{item.receive_date}</td>
                                                <td>{item.checkOut_date}</td>
                                                <td>{item.status}</td>
                                            </tr>
                                        )
                                    })
                                }
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