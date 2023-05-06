import React from 'react';
import Modal from 'react-bootstrap/Modal';
import './BookRoomDetail.scss';
import _ from 'lodash';
import { GET_HOTEL_ROOM_USE_BY_ID } from '../../Query/HotelRoomUseQuery';
import { UPDATE_BOOK_ROOM, DELETE_BOOK_ROOM } from '../../Mutation/HotelRoomMutation';
import { useLazyQuery, useMutation } from '@apollo/client';
import { useImmer } from "use-immer";
import DeleteModal from './DeleteBookRoomModal';
const BookRoomDetail = (props) => {

    const { show, setShow, data, hotelRoomsByCategories, fetchRoomUseList } = props;
    const [bookRoomInfo, setBookRoomInfo] = useImmer({});
    const [customerInfo, setCustomerInfo] = React.useState({});
    const [editAllowance, setEditAllowance] = React.useState(false);
    const [roomsByCategory, setRoomsByCategory] = React.useState([]);
    const [showDeleteModal, setShowDeleteModal] = React.useState(false);

    const [getRoomUseById, { refetch }] = useLazyQuery(GET_HOTEL_ROOM_USE_BY_ID);

    const [updateBookRoom] = useMutation(UPDATE_BOOK_ROOM);
    const [deleteBookRoom] = useMutation(DELETE_BOOK_ROOM);

    const handleOnChange = (attribute, value) => {
        if (attribute === 'room_id') {
            setBookRoomInfo(draft => {
                draft.room.id = value;
            })
        }

        else if (attribute === 'room_category') {
            setBookRoomInfo(draft => {
                draft.room.category.id = value;
            })

            if (hotelRoomsByCategories && hotelRoomsByCategories.length > 0) {
                let rooms_by_category = hotelRoomsByCategories.filter(item => item.id === value)[0];
                setRoomsByCategory(rooms_by_category.rooms);
                let rooms = rooms_by_category.rooms;
                setBookRoomInfo(draft => {
                    draft.room.id = rooms[0].id;
                })
            }
        }

        else {
            setBookRoomInfo(draft => {
                draft[attribute] = value;
            })
        }
    }

    const handleUpdateBookRoom = async () => {
        if (editAllowance) {
            // dataValidation();
            let result = await updateBookRoom({
                variables: {
                    input: {
                        id: bookRoomInfo.id,
                        receive_date: bookRoomInfo.receive_date,
                        checkOut_date: bookRoomInfo.checkOut_date,
                        night_stay: +bookRoomInfo.night_stay,
                        room_id: +bookRoomInfo.room.id
                    }
                }
            });
            let { data: { hotel_room_use_by_id } } = await refetch({
                variables: {
                    hotelRoomUseById: +data
                }
            });

            setCustomerInfo(hotel_room_use_by_id.customer);
            let _bookRoomInfo = _.cloneDeep(hotel_room_use_by_id);
            delete _bookRoomInfo.customer;
            setBookRoomInfo(_bookRoomInfo);

            if (hotelRoomsByCategories && hotelRoomsByCategories.length > 0) {
                let rooms_by_category = hotelRoomsByCategories.filter(item => item.id === _bookRoomInfo?.room?.category?.id)[0];
                setRoomsByCategory(rooms_by_category.rooms);
            }

            fetchRoomUseList();
            setEditAllowance(false);
        } else {
            setEditAllowance(true);
        }
    }

    const handleDeleteBookRoom = async () => {
        let result = await deleteBookRoom({
            variables: {
                deleteBookRoomId: data
            }
        });
        fetchRoomUseList();
        handleCloseModal();
    }

    const fetchBookRoomInfo = async (room_use_id) => {
        let { data: { hotel_room_use_by_id } } = await getRoomUseById({
            variables: {
                hotelRoomUseById: +room_use_id
            }
        });

        setCustomerInfo(hotel_room_use_by_id.customer);
        let bookRoomInfo = _.cloneDeep(hotel_room_use_by_id);
        delete bookRoomInfo.customer;
        setBookRoomInfo(bookRoomInfo);

        if (hotelRoomsByCategories && hotelRoomsByCategories.length > 0) {
            let rooms_by_category = hotelRoomsByCategories.filter(item => item.id === bookRoomInfo?.room?.category?.id)[0];
            setRoomsByCategory(rooms_by_category.rooms);
        }
    }

    const handleCloseModal = () => {
        setEditAllowance(false);
        setShow(false);
    }
    React.useEffect(() => {
        if (data !== "") {
            fetchBookRoomInfo(data);
        }
    }, [data]);

    return (
        <>
            <Modal
                show={show}
                size='xl'
                onHide={handleCloseModal}
                backdrop="static"
                keyboard={false}
                className='book-room-detail-modal'
            >
                <Modal.Header closeButton>
                    <Modal.Title className='title'>Chi tiết đặt phòng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='detail-content'>
                        <fieldset className='book-info border rounded-2 p-3'>
                            <legend className='reset legend-text'>Thông tin đặt phòng</legend>
                            <div className='form-group'>
                                <label className='form-label'>Số phòng:</label>
                                <select className="form-select"
                                    value={bookRoomInfo?.room?.id ? bookRoomInfo.room.id : ''}
                                    disabled={!editAllowance}
                                    onChange={(event) => handleOnChange('room_id', event.target.value)}
                                >
                                    {roomsByCategory && roomsByCategory.length > 0 &&
                                        roomsByCategory.map(item => {
                                            return (
                                                <option key={`room-number-${item.id}`} value={item.id}>{item.name}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className='form-group mt-2'>
                                <label className='form-label'>Tên loại phòng:</label>
                                <select className="form-select"
                                    value={bookRoomInfo?.room?.category?.id ? bookRoomInfo.room?.category.id : ''}
                                    disabled={!editAllowance}
                                    onChange={(event) => handleOnChange('room_category', event.target.value)}
                                >
                                    {hotelRoomsByCategories && hotelRoomsByCategories.length > 0 &&
                                        hotelRoomsByCategories.map(item => {
                                            return (
                                                <option key={`room-category-type-${item.id}`} value={item.id}>{item.name}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className='form-group mt-2'>
                                <label className='form-label'>Ngày nhận:</label>
                                <input type='text' className='form-control' value={bookRoomInfo?.receive_date ? bookRoomInfo.receive_date : ''} disabled={!editAllowance}
                                    onChange={(event) => handleOnChange('receive_date', event.target.value)}
                                />
                            </div>
                            <div className='form-group mt-2'>
                                <label className='form-label'>Ngày trả:</label>
                                <input type='text' className='form-control' value={bookRoomInfo?.checkOut_date ? bookRoomInfo.checkOut_date : ''} disabled={!editAllowance}
                                    onChange={(event) => handleOnChange('checkOut_date', event.target.value)}
                                />
                            </div>
                            <div className='form-group mt-2'>
                                <label className='form-label'>Số đêm:</label>
                                <input type='text' className='form-control' value={bookRoomInfo?.night_stay ? bookRoomInfo.night_stay : ''} disabled={!editAllowance}
                                    onChange={(event) => handleOnChange('night_stay', +event.target.value)}
                                />
                            </div>
                            <div className='form-group mt-4 d-flex justify-content-center'>
                                <button className='btn btn-warning w-50' onClick={handleUpdateBookRoom}>
                                    {editAllowance === false ? <span>Chỉnh sửa</span> : <span>Lưu chỉnh sửa</span>}
                                </button>
                            </div>
                        </fieldset>
                        <fieldset className='customer-info border rounded-2 p-3'>
                            <legend className='reset legend-text'>Thông tin khách hàng</legend>
                            <div className='row mb-3'>
                                <div className='form-group col-6'>
                                    <label className='form-label'>Họ và Tên:</label>
                                    <input type='text' className='form-control' disabled value={customerInfo?.name ? customerInfo.name : ''} />
                                </div>
                                <div className='form-group col-6'>
                                    <label className='form-label'>Ngày sinh:</label>
                                    <input type='text' className='form-control' disabled value={customerInfo?.dob ? customerInfo.dob : ''} />
                                </div>
                            </div>
                            <div className='row mb-3'>
                                <div className='form-group col-6'>
                                    <label className='form-label'>Thẻ căn cước/ CMND:</label>
                                    <input type='text' className='form-control' disabled value={customerInfo?.citizen_id ? customerInfo.citizen_id : ''} />
                                </div>
                                <div className='form-group col-6'>
                                    <label className='form-label'>Địa chỉ:</label>
                                    <input type='text' className='form-control' disabled value={customerInfo?.address ? customerInfo.address : ''} />
                                </div>
                            </div>
                            <div className='row mb-3'>
                                <div className='form-group col-6'>
                                    <label className='form-label'>Loại khách hàng:</label>
                                    <input type='text' className='form-control' disabled value={customerInfo?.customer_category ? customerInfo.customer_category : ''} />
                                </div>
                                <div className='form-group col-6'>
                                    <label className='form-label'>Giới tính:</label>
                                    <input type='text' className='form-control' disabled value={customerInfo?.gender ? customerInfo.gender : ''} />
                                </div>
                            </div>
                            <div className='row mb-3'>
                                <div className='form-group col-6'>
                                    <label className='form-label'>Số điện thoại:</label>
                                    <input type='text' className='form-control' disabled value={customerInfo?.phone ? customerInfo.phone : ''} />
                                </div>
                                <div className='form-group col-6'>
                                    <label className='form-label'>Quốc tịch:</label>
                                    <input type='text' className='form-control' disabled value={customerInfo?.nationality ? customerInfo.nationality : ''} />
                                </div>
                            </div>

                        </fieldset>
                    </div>
                    <div className='actions d-flex mt-4 justify-content-end'>
                        <div>
                            <button className='btn btn-outline-danger' onClick={() => setShowDeleteModal(true)}>Hủy đặt phòng</button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
            <DeleteModal
                show={showDeleteModal}
                setShow={setShowDeleteModal}
                handleDelete={handleDeleteBookRoom}
            />

        </>
    )
}

export default BookRoomDetail;