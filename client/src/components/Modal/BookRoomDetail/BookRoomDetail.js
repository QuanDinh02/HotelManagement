import React from 'react';
import Modal from 'react-bootstrap/Modal';
import './BookRoomDetail.scss';
import _ from 'lodash';
import { GET_HOTEL_ROOM_USE_BY_ID } from '../../Query/HotelRoomUseQuery';
import { useLazyQuery } from '@apollo/client';
import { useImmer } from "use-immer";
const BookRoomDetail = (props) => {

    const { show, setShow, data } = props;
    const [bookRoomInfo, setBookRoomInfo] = useImmer({});

    const [getRoomUseById] = useLazyQuery(GET_HOTEL_ROOM_USE_BY_ID);

    const fetchBookRoomInfo = async (room_use_id) => {
        let { data: { hotel_room_use_by_id } } = await getRoomUseById({
            variables: {
                hotelRoomUseById: +room_use_id
            }
        });
        console.log(hotel_room_use_by_id);
        setBookRoomInfo(hotel_room_use_by_id);
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
                onHide={() => setShow(false)}
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
                                <input type='text' className='form-control' value={bookRoomInfo?.room?.name ? bookRoomInfo.room?.name : ''} />
                            </div>
                            <div className='form-group mt-2'>
                                <label className='form-label'>Tên loại phòng:</label>
                                <input type='text' className='form-control' value={bookRoomInfo?.room?.category?.name ? bookRoomInfo.room?.category.name : ''} />
                            </div>
                            <div className='form-group mt-2'>
                                <label className='form-label'>Ngày nhận:</label>
                                <input type='text' className='form-control' value={bookRoomInfo?.receive_date ? bookRoomInfo.receive_date : ''} />
                            </div>
                            <div className='form-group mt-2'>
                                <label className='form-label'>Ngày trả:</label>
                                <input type='text' className='form-control' value={bookRoomInfo?.checkOut_date ? bookRoomInfo.checkOut_date : ''} />
                            </div>
                            <div className='form-group mt-2'>
                                <label className='form-label'>Số đêm:</label>
                                <input type='text' className='form-control' value={bookRoomInfo?.night_stay ? bookRoomInfo.night_stay : ''} />
                            </div>
                        </fieldset>
                        <fieldset className='customer-info border rounded-2 p-3'>
                            <legend className='reset legend-text'>Thông tin khách hàng</legend>
                            <div className='row mb-3'>
                                <div className='form-group col-6'>
                                    <label className='form-label'>Họ và Tên:</label>
                                    <input type='text' className='form-control' disabled value={bookRoomInfo?.customer?.name ? bookRoomInfo.customer?.name : ''} />
                                </div>
                                <div className='form-group col-6'>
                                    <label className='form-label'>Ngày sinh:</label>
                                    <input type='text' className='form-control' disabled value={bookRoomInfo?.customer?.dob ? bookRoomInfo.customer?.dob : ''} />
                                </div>
                            </div>
                            <div className='row mb-3'>
                                <div className='form-group col-6'>
                                    <label className='form-label'>Thẻ căn cước/ CMND:</label>
                                    <input type='text' className='form-control' disabled value={bookRoomInfo?.customer?.citizen_id ? bookRoomInfo.customer?.citizen_id : ''} />
                                </div>
                                <div className='form-group col-6'>
                                    <label className='form-label'>Địa chỉ:</label>
                                    <input type='text' className='form-control' disabled value={bookRoomInfo?.customer?.address ? bookRoomInfo.customer?.address : ''} />
                                </div>
                            </div>
                            <div className='row mb-3'>
                                <div className='form-group col-6'>
                                    <label className='form-label'>Loại khách hàng:</label>
                                    <input type='text' className='form-control' disabled value={bookRoomInfo?.customer?.customer_category ? bookRoomInfo.customer?.customer_category : ''} />
                                </div>
                                <div className='form-group col-6'>
                                    <label className='form-label'>Giới tính:</label>
                                    <input type='text' className='form-control' disabled value={bookRoomInfo?.customer?.gender ? bookRoomInfo.customer?.gender : ''} />
                                </div>
                            </div>
                            <div className='row mb-3'>
                                <div className='form-group col-6'>
                                    <label className='form-label'>Số điện thoại:</label>
                                    <input type='text' className='form-control' disabled value={bookRoomInfo?.customer?.phone ? bookRoomInfo.customer?.phone : ''} />
                                </div>
                                <div className='form-group col-6'>
                                    <label className='form-label'>Quốc tịch:</label>
                                    <input type='text' className='form-control' disabled value={bookRoomInfo?.customer?.nationality ? bookRoomInfo.customer?.nationality : ''} />
                                </div>
                            </div>

                        </fieldset>
                    </div>
                    <div className='actions d-flex mt-4 gap-3 justify-content-end'>
                        <div>
                            <button className='btn btn-outline-danger'>Hủy đặt phòng</button>
                        </div>
                        <div>
                            <button className='btn btn-warning' disabled>Lưu thay đổi</button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default BookRoomDetail;