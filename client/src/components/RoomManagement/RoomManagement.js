import { useHistory } from 'react-router-dom';
import './RoomManagement.scss';
import { TfiClose } from 'react-icons/tfi';
import { HiOutlineSearch } from 'react-icons/hi';
import { MdBedroomParent } from 'react-icons/md';
import React from 'react';
import { CurrencyFormat } from '../Format/FormatNumber';
import RoomCategory from '../Modal/RoomCategory/RoomCategory';
import { GET_ALL_HOTEL_ROOMS } from '../Query/HotelRoomQuery';
import { useLazyQuery, useMutation } from '@apollo/client';
import { useImmer } from "use-immer";
import _ from 'lodash';

const RoomManagement = () => {

    const history = useHistory();
    const [showRoomCategory, setShowRoomCategory] = React.useState(false);

    const [hotelRooms, setHotelRooms] = useImmer([]);
    const [editRoom, setEditRoom] = useImmer({});
    const [editAllowance, setEditAllowance] = React.useState(false);
    const [roomCategories, setRoomCategories] = React.useState([]);

    const [getRoomList, { refetch }] = useLazyQuery(GET_ALL_HOTEL_ROOMS);

    const handleEditRoom = (attribute, value) => {
        if (attribute === 'room_category') {
            let category = _.find(roomCategories, item => item.id === value);
            setEditRoom(draft => {
                draft[attribute] = category;
            });
        } else {
            setEditRoom(draft => {
                draft[attribute] = value;
            });
        }
    }

    const handleSelectingRoom = (selected_room) => {
        let _editRoom = _.cloneDeep(selected_room);
        delete _editRoom.__typename;
        delete _editRoom.isSelected;

        setEditRoom(_editRoom);

        setHotelRooms(draft => {
            draft = draft.map(item => {
                if (item.id === selected_room.id) {
                    item.isSelected = true;
                    return item;
                } else {
                    item.isSelected = false;
                    return item;
                }
            })
        })
    }

    const handleUpdateRoomInfo = async () => {
        if (editAllowance) {
            setEditRoom({});
            setEditAllowance(false);
        } else {
            setEditAllowance(true);
        }
    }

    const fetchRoomList = async () => {
        let { data: hotel_rooms_management } = await getRoomList();

        let _hotelRooms = hotel_rooms_management?.hotel_rooms.map(item => {
            return {
                ...item, isSelected: false
            }
        });
        setHotelRooms(_hotelRooms);
        setRoomCategories(hotel_rooms_management?.hotel_room_categories);
    }

    React.useEffect(() => {
        setEditAllowance(false);
    }, [editRoom?.id]);

    React.useEffect(() => {
        fetchRoomList();
    }, []);

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
                                    <input type='text' className='form-control' disabled={!editAllowance} value={editRoom?.name ? editRoom.name : ''}
                                        onChange={(event) => handleEditRoom('name', event.target.value)}
                                    />
                                </div>
                                <div className='form-group col-6'>
                                    <label className='form-label'>Loại phòng:</label>
                                    <select className="form-select" disabled={!editAllowance} value={editRoom?.room_category ? editRoom.room_category.id : ''}
                                        onChange={(event) => handleEditRoom('room_category', event.target.value)}
                                    >
                                        <option key={`room-type-default`} value="0">Chọn loại phòng...</option>
                                        {roomCategories && roomCategories.length > 0 &&
                                            roomCategories.map(item => {
                                                return (
                                                    <option key={`room-type-${item.id}`} value={item.id}>{item.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className='row mt-1 px-4'>
                                <div className='form-group col-6'>
                                    <label className='form-label'>Giá phòng:</label>
                                    <input type='text' className='form-control' disabled value={editRoom?.room_category ? editRoom.room_category.price : ''} />
                                </div>
                                <div className='form-group col-6'>
                                    <label className='form-label'>Trạng thái:</label>
                                    <input type='text' className='form-control' disabled={!editAllowance} value={editRoom?.status ? editRoom.status : ''}
                                        onChange={(event) => handleEditRoom('status', event.target.value)}
                                    />
                                </div>
                            </div>
                            <div className='row mt-1 px-4'>
                                <div className='form-group col-6'>
                                    <label className='form-label'>Số lượng người tối đa:</label>
                                    <input type='text' className='form-control' disabled value={editRoom?.room_category ? editRoom.room_category.people_maximum : ''} />
                                </div>
                            </div>
                        </fieldset>
                        <fieldset className='border rounded-2 p-2'>
                            <legend className='reset legend-text'>Chức năng</legend>
                            <div className='row mb-3 px-4'>
                                <div className='form-group col-6'>
                                    <button className='btn btn-success col-12'>Thêm phòng</button>
                                </div>
                                <div className='form-group col-6'>
                                    <button className='btn btn-outline-danger col-12' disabled={_.isEmpty(editRoom) ? true : false}>Xóa phòng</button>
                                </div>
                            </div>
                            <div className='row px-4'>
                                <div className='form-group col-6'>
                                    <button className='btn btn-primary col-12' onClick={() => setShowRoomCategory(true)}>Quản lý Loại phòng</button>
                                </div>
                                <div className='form-group col-6'>
                                    <button className='btn btn-warning col-12' onClick={handleUpdateRoomInfo} disabled={_.isEmpty(editRoom) ? true : false}>
                                        {editAllowance === false ? <span>Chỉnh sửa</span> : <span>Lưu chỉnh sửa</span>}
                                    </button>
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
                                {hotelRooms && hotelRooms.length > 0 &&
                                    hotelRooms.map((item, index) => {
                                        return (
                                            <tr
                                                key={`hotel-rooms-${item.id}`}
                                                className={item.isSelected ? 'selected-row' : ''}
                                                onClick={() => handleSelectingRoom(item)}
                                            >
                                                <td>{item.name}</td>
                                                <td>{item.room_category?.name}</td>
                                                <td>{CurrencyFormat(item.room_category?.price)} / 1 đêm</td>
                                                <td>{item.room_category?.people_maximum}</td>
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
            <RoomCategory
                show={showRoomCategory}
                setShow={setShowRoomCategory}
            />
        </>

    )
}

export default RoomManagement;