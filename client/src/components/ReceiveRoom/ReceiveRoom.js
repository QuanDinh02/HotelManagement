import { useHistory } from 'react-router-dom';
import './ReceiveRoom.scss';
import { TfiClose } from 'react-icons/tfi';
import { HiOutlineSearch } from 'react-icons/hi';
import { FaKey } from 'react-icons/fa';
import React from 'react';
import { GET_RECEIVE_ROOM_LIST, GET_HOTEL_RECEIVE_ROOM_BY_CUSTOMER } from '../Query/HotelRoomUseQuery';
import { useLazyQuery, useMutation } from '@apollo/client';
import { useImmer } from "use-immer";
import _ from 'lodash';

const ReceiveRoom = () => {

    const history = useHistory();
    const [hotelRoomUseList, setHotelRoomUseList] = useImmer([]);
    const [editAllowance, setEditAllowance] = React.useState(false);
    const [selectRoomCategory, setSelectRoomCategory] = React.useState({});
    const [hotelRoomsByCategories, setHotelRoomsByCategories] = React.useState([]);
    const [roomsByCategory, setRoomsByCategory] = React.useState([]);
    const [bookRoomInfo, setBookRoomInfo] = useImmer({
        id: '',
        receive_date: '',
        checkOut_date: '',
        night_stay: 0,
        status: '',
        room: {
            id: '',
            name: '',
            category: {
                id: '',
                name: '',
                price: 0,
                people_maximum: 0
            }
        }
    });
    const [customerInfo, setCustomerInfo] = React.useState({});
    const [search, setSearch] = React.useState('');

    const [getReceiveRoomList, { refetch }] = useLazyQuery(GET_RECEIVE_ROOM_LIST);
    const [getReceiveRoomSearchByCustomer] = useLazyQuery(GET_HOTEL_RECEIVE_ROOM_BY_CUSTOMER);

    const handleBookRoomSearch = async () => {
        let { data: { receive_room_search_by_customer } } = await getReceiveRoomSearchByCustomer({
            variables: {
                value: search
            }
        });
        setHotelRoomUseList(receive_room_search_by_customer);
    }

    const handleUpdateReceiveRoom = () => {
        if (editAllowance) {
            setEditAllowance(false);
        } else {
            setEditAllowance(true);
        }
    }

    const handleSelectReceiveRoom = (item) => {
        console.log(item);
        setCustomerInfo(item.customer);
        setBookRoomInfo(draft => {
            let _price = 0;
            let _people_maximum = 0;

            if (hotelRoomsByCategories && hotelRoomsByCategories.length > 0) {
                let editBookRoom = hotelRoomsByCategories.filter(e => e.id === item.room.category.id)[0];

                _price = editBookRoom?.price;
                _people_maximum = editBookRoom?.people_maximum;
            }

            draft.id = item.id;
            draft.receive_date = item.receive_date;
            draft.checkOut_date = item.checkOut_date;
            draft.night_stay = item.night_stay;
            draft.status = item.status;
            draft.room = {
                ...item.room, price: _price, people_maximum: _people_maximum
            }
        })
    }

    const fetchHotelRoomUseList = async () => {
        let { data: hotel_room_use } = await getReceiveRoomList();

        let _receive_rooms = hotel_room_use?.received_hotel_room_use_list.map(item => {
            let _item = _.cloneDeep(item);
            delete _item.__typename;
            delete _item.room.__typename;
            delete _item.room.category.__typename;
            delete _item.customer.__typename;

            return {
                ..._item, isSelected: false
            }
        });

        setHotelRoomUseList(_receive_rooms);
        setHotelRoomsByCategories(hotel_room_use?.hotel_rooms_by_categories);
    }

    React.useEffect(() => {
        fetchHotelRoomUseList();
    }, []);

    return (
        <>
            <div className='receive-room-container'>
                <div className='header py-2 ps-5 pe-3 d-flex justify-content-between align-items-center'>
                    <span className='title'>Nhận Phòng <span><FaKey /></span></span>
                    <span className='icon' onClick={() => history.push('/')}><TfiClose className='exit-icon' /></span>
                </div>
                <div className='main px-3 d-flex gap-3 mt-2 mb-2'>
                    <div className='left-content d-flex flex-column gap-3'>
                        <fieldset className='top border rounded-2 pt-2 pb-3'>
                            <legend className='reset legend-text'>Tìm kiếm khách hàng</legend>
                            <div className="input-group px-4">
                                <input type="text" className="form-control" placeholder="Tên/ số điện thoại của khách hàng" value={search} onChange={(event) => setSearch(event.target.value)} />
                                <span className="input-group-text search-btn" title='Tìm kiếm' onClick={handleBookRoomSearch}><HiOutlineSearch /></span>
                            </div>
                        </fieldset>
                        <fieldset className='middle border rounded-2 pb-3'>
                            <legend className='reset legend-text'>Thông tin nhận phòng</legend>
                            <div className='row align-items-center px-4'>
                                <div className='form-group col-6'>
                                    <label className='form-label'>Họ và Tên:</label>
                                    <input type='text' className='form-control' disabled value={customerInfo?.name ? customerInfo.name : ''} />
                                </div>
                                <div className='form-group col-6'>
                                    <label className='form-label'>Số điện thoại:</label>
                                    <input type='text' className='form-control' disabled value={customerInfo?.phone ? customerInfo.phone : ''} />
                                </div>
                            </div>
                            <div className='row mt-1 px-4'>
                                <div className='form-group col-6'>
                                    <label className='form-label'>Thẻ căn cước/ CMND:</label>
                                    <input type='text' className='form-control' disabled value={customerInfo?.citizen_id ? customerInfo.citizen_id : ''} />
                                </div>
                            </div>
                            <div className='row mt-1 px-4'>
                                <div className='form-group col-6'>
                                    <label className='form-label'>Số phòng nhận:</label>
                                    <input type='text' className='form-control' disabled={!editAllowance} value={bookRoomInfo?.room?.name ? bookRoomInfo.room.name : ''} />
                                </div>
                                <div className='form-group col-6'>
                                    <label className='form-label'>Loại phòng:</label>
                                    <input type='text' className='form-control' disabled={!editAllowance} />
                                </div>
                            </div>
                            <div className='row mt-1 px-4'>
                                <div className='form-group col-6'>
                                    <label className='form-label'>Ngày nhận:</label>
                                    <input type='text' className='form-control' disabled={!editAllowance} value={bookRoomInfo?.receive_date ? bookRoomInfo.receive_date : ''} />
                                </div>
                                <div className='form-group col-6'>
                                    <label className='form-label'>Ngày trả:</label>
                                    <input type='text' className='form-control' disabled={!editAllowance} value={bookRoomInfo?.checkOut_date ? bookRoomInfo.checkOut_date : ''} />
                                </div>
                            </div>
                            <div className='row mt-1 px-4'>
                                <div className='form-group col-6'>
                                    <label className='form-label'>Số đêm lưu trú:</label>
                                    <input type='text' className='form-control' disabled={!editAllowance} value={bookRoomInfo?.night_stay ? bookRoomInfo.night_stay : ''} />
                                </div>
                                <div className='form-group col-6'>
                                    <label className='form-label'>Số lượng người tối đa:</label>
                                    <input type='text' className='form-control' disabled value={bookRoomInfo?.room.people_maximum ? bookRoomInfo.room.people_maximum : ''} />
                                </div>
                            </div>
                            <div className='row mt-1 px-4'>
                                <div className='form-group col-6'>
                                    <label className='form-label'>Giá phòng:</label>
                                    <input type='text' className='form-control' disabled value={bookRoomInfo?.room.price ? bookRoomInfo.room.price : ''} />
                                </div>
                            </div>

                        </fieldset>
                        <fieldset className='border rounded-2 p-2'>
                            <legend className='reset legend-text'>Chức năng</legend>
                            <div className='row mb-3 px-4'>
                                <div className='form-group col-6'>
                                    <button className='btn btn-warning col-12' onClick={handleUpdateReceiveRoom} disabled={!bookRoomInfo.id ? true : (bookRoomInfo.status === 'Chờ nhận phòng' ? false : true)}>
                                        {editAllowance === false ? <span>Chỉnh sửa</span> : <span>Lưu chỉnh sửa</span>}
                                    </button>
                                </div>
                                <div className='form-group col-6'>
                                    <button className='btn receive-btn col-12' disabled={!bookRoomInfo.id ? true : (bookRoomInfo.status === 'Chờ nhận phòng' ? false : true)}>Nhận phòng</button>
                                </div>
                            </div>
                            <div className='row px-4'>
                                <div className='form-group col-6'>
                                    <button className='btn btn-primary col-12' disabled={!bookRoomInfo.id ? true : (bookRoomInfo.status === 'Đã nhận phòng' ? false : true)}>Đổi phòng</button>
                                </div>
                                <div className='form-group col-6'>
                                    <button className='btn btn-danger col-12' disabled={!bookRoomInfo.id ? true : (bookRoomInfo.status === 'Đã nhận phòng' ? false : true)}>Hủy nhận phòng</button>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                    <fieldset className='right-content border rounded-2 p-2' onScroll={(event) => { event.preventDefault() }}>
                        <legend className='reset legend-text'>Danh sách nhận phòng trong ngày</legend>
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
                                                key={`received-room-use-${item.id}`}
                                                className={(item.status === 'Đã nhận phòng') ? 'already-received' : ''}
                                                onClick={() => handleSelectReceiveRoom(item)}
                                            >
                                                <td>{item.room?.name}</td>
                                                <td>{item.customer?.name}</td>
                                                <td>{item.customer?.phone}</td>
                                                <td>{item.room?.category?.name}</td>
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
        </>

    )
}

export default ReceiveRoom;