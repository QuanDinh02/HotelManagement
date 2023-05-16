import { useHistory } from 'react-router-dom';
import './ServicePayment.scss';
import { TfiClose } from 'react-icons/tfi';
import { HiOutlineSearch } from 'react-icons/hi';
import { MdPayment } from 'react-icons/md';
import React from 'react';
import { CurrencyFormat } from '../Format/FormatNumber';
import { GET_ALL_HOTEL_ROOM_USE_PAYMENT, GET_ALL_HOTEL_ROOM_USE_INVOICE } from '../Query/ServicePaymentQuery';
import { useLazyQuery, useMutation } from '@apollo/client';
import { useImmer } from "use-immer";
import _ from 'lodash';
import ServiceAddNew from '../Modal/ServicePayment/ServiceAddNew';

const ServicePayment = () => {

    const history = useHistory();

    const [getRoomList, { refetch }] = useLazyQuery(GET_ALL_HOTEL_ROOM_USE_PAYMENT);
    const [getInvoice] = useLazyQuery(GET_ALL_HOTEL_ROOM_USE_INVOICE);
    const [editAllowance, setEditAllowance] = React.useState(false);
    const [hotelRoomUseList, setHotelRoomUseList] = useImmer([]);
    const [roomInvoice, setRoomInvoice] = React.useState({});
    const [surchareList, setSurchargeList] = React.useState([]);
    const [serviceList, setServiceList] = React.useState([]);

    const [showAddNewModal, setShowAddNewModal] = React.useState(false);

    const handleSelectRoomUse = async (room_use_id) => {
        let { data: { invoice } } = await getInvoice({
            variables: {
                roomUseId: room_use_id
            }
        });

        if (invoice) {
            console.log(invoice);
            setEditAllowance(true);
            setHotelRoomUseList(draft => {
                draft = draft.map(e => {
                    if (e.id === room_use_id) {
                        e.isSelected = true;
                        return e;
                    } else {
                        e.isSelected = false;
                        return e;
                    }
                })
            })

            let _surchargeList = invoice?.Surcharges.map(item => {
                let _item = _.cloneDeep(item);
                delete _item.__typename;
                return _item;
            });
            setSurchargeList(_surchargeList);

            let _serviceList = invoice?.Services.map(item => {
                let _item = _.cloneDeep(item);
                delete _item.__typename;
                return _item;
            });
            setServiceList(_serviceList);

            setRoomInvoice({
                room_use_id: invoice.room_use_id,
                room_number: invoice.HotelRoom.name,
                price: invoice.HotelRoom.price,
                receive_date: invoice.receive_date,
                checkOut_date: invoice.checkOut_date,
                room_price: invoice.HotelRoom.price * invoice.night_stay,
                invoice_total: invoice.invoice_total,
                surcharge_total: invoice.surcharge_total,
            });
        } else {
            setServiceList({});
            setSurchargeList({});
            setRoomInvoice({});
        }
    }

    const fetchHotelRoomUseList = async () => {
        let { data: hotel_room_use } = await getRoomList();

        let _rooms = hotel_room_use?.hotel_room_use_list_payment.map(item => {
            let _item = _.cloneDeep(item);
            delete _item.__typename;
            delete _item.room.__typename;
            delete _item.room.category.__typename;
            delete _item.customer.__typename;

            return {
                ..._item, isSelected: false
            }
        });

        setHotelRoomUseList(_rooms);
    }

    React.useEffect(() => {
        fetchHotelRoomUseList();
    }, []);

    return (
        <>
            <div className='service-payment-container'>
                <div className='header py-2 ps-5 pe-3 d-flex justify-content-between align-items-center'>
                    <span className='title'>Sử Dụng Dịch Vụ Và Thanh Toán <span><MdPayment /></span></span>
                    <span className='icon' onClick={() => history.push('/')}><TfiClose className='exit-icon' /></span>
                </div>
                <div className='main px-3 d-flex gap-3 mt-2 mb-2'>
                    <div className='left-content d-flex flex-column gap-3'>
                        <fieldset className='search-box border rounded-2 p-2'>
                            <legend className='reset legend-text'>Tìm kiếm phòng</legend>
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="Số/ loại phòng" />
                                <span className="input-group-text search-btn" title='Tìm kiếm'><HiOutlineSearch /></span>
                            </div>
                        </fieldset>
                        <fieldset className='room-list border rounded-2 p-2'>
                            <legend className='reset legend-text'>Danh sách phòng</legend>
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th scope="col">Số phòng</th>
                                        <th scope="col">Họ và Tên</th>
                                        <th scope="col">SĐT</th>
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
                                                    key={`hotel-rooms-use-items-${item.id}`}
                                                    className={item.isSelected ? 'selected-row' : ''}
                                                    onClick={() => handleSelectRoomUse(item.id)}
                                                >
                                                    <td>{item.room?.name}</td>
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
                    <div className='right-content d-flex flex-column gap-2'>
                        <fieldset className='room-invoice border rounded-2 p-2' onScroll={(event) => { event.preventDefault() }}>
                            <legend className='reset legend-text'>Hóa đơn tiền phòng</legend>
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th scope="col">Số phòng</th>
                                        <th scope="col">Đơn giá</th>
                                        <th scope="col">Ngày nhận</th>
                                        <th scope="col">Ngày trả</th>
                                        <th scope="col">Tiền phòng</th>
                                        <th scope="col">Phụ thu</th>
                                        <th scope="col">Thành tiền</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {!_.isEmpty(roomInvoice) &&
                                        <tr key={`room-use-info-${roomInvoice.room_use_id}`}>
                                            <td>{roomInvoice.room_number}</td>
                                            <td>{CurrencyFormat(roomInvoice.price)}</td>
                                            <td>{roomInvoice.receive_date}</td>
                                            <td>{roomInvoice.checkOut_date}</td>
                                            <td>{CurrencyFormat(roomInvoice.room_price)}</td>
                                            <td>{CurrencyFormat(roomInvoice.surcharge_total)}</td>
                                            <td>{CurrencyFormat(roomInvoice.invoice_total)}</td>
                                        </tr>
                                    }
                                </tbody>
                            </table>
                        </fieldset>
                        <fieldset className='policies border rounded-2 p-2' onScroll={(event) => { event.preventDefault() }}>
                            <legend className='reset legend-text'>Chính sách phụ thu</legend>
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th scope="col">STT</th>
                                        <th scope="col">Tên quy định</th>
                                        <th scope="col">Phí</th>
                                        <th scope="col">Mô tả quy định</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {surchareList && surchareList.length > 0 &&
                                        surchareList.map((item, index) => {
                                            return (
                                                <tr key={`room-use-surcharge-${index}${roomInvoice.room_use_id}`}>
                                                    <td className='text-center'>{index + 1}</td>
                                                    <td>{item.name}</td>
                                                    <td className='text-center'>{CurrencyFormat(item.price)}</td>
                                                    <td>{item.descriptionF}</td>
                                                </tr>
                                            )
                                        })
                                    }

                                </tbody>
                            </table>
                        </fieldset>
                        <fieldset className='service border rounded-2 p-2' onScroll={(event) => { event.preventDefault() }}>
                            <legend className='reset legend-text'>Hóa đơn dịch vụ</legend>
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th scope="col">STT</th>
                                        <th scope="col">Tên dịch vụ</th>
                                        <th scope="col">Đơn giá</th>
                                        <th scope="col">Số lượng</th>
                                        <th scope="col">Thành tiền</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {serviceList && serviceList.length > 0 &&
                                        serviceList.map((item, index) => {
                                            return (
                                                <tr ey={`room-use-service-${index}${roomInvoice.room_use_id}`}>
                                                    <td className='text-center'>{index + 1}</td>
                                                    <td>{item.name}</td>
                                                    <td className='text-center'>{CurrencyFormat(item.price)}</td>
                                                    <td className='text-center'>{item.quantity}</td>
                                                    <td className='text-center'>{CurrencyFormat(item.total)}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </fieldset>
                        <fieldset className='payment border rounded-2 p-2'>
                            <div className='d-flex align-items-center'>
                                <div className='form-group mt-3 pb-2 col-6 px-4'>
                                    <button className='btn btn-success col-12' disabled={!editAllowance} onClick={() => setShowAddNewModal(true)}>+ Thêm dịch vụ</button>
                                </div>
                                <div className='form-group mt-3 pb-2 col-6 px-4'>
                                    <button className='btn payment-btn col-12' disabled={!editAllowance}>Thanh toán</button>
                                </div>
                            </div>
                            <div className='form-group mt-3 pb-2 col-6 px-4'>
                                <button className='btn btn-warning col-12' disabled={!editAllowance}>+ Thêm phụ thu</button>
                            </div>
                        </fieldset>
                    </div>

                </div>
            </div>
            <ServiceAddNew
                show={showAddNewModal}
                setShow={setShowAddNewModal}
            />
        </>

    )
}

export default ServicePayment;