import './ReceiptPrinting.scss';
import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import HotelLogo from '../../assets/images/hotel-logo.png';
import { GrPlayFill } from 'react-icons/gr';
import { CurrencyFormat } from '../Format/FormatNumber';
import _ from 'lodash';

const ReceiptPrinting = React.forwardRef((props, ref) => {

    const { show, setShow, print, data } = props;

    const handleCloseModal = () => {
        setShow(false);
    }

    React.useEffect(() => {
        if (!_.isEmpty(data)) {
            console.log(data);
        }
    }, [data]);

    return (
        <>
            <Modal
                show={show}
                onHide={handleCloseModal}
                backdrop="static"
                keyboard={false}
                size='lg'
            >
                <Modal.Header closeButton>
                    <Modal.Title className='title'>In Hóa Đơn</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='receipt-printing-container position-relative px-4 py-2' ref={ref}>
                        <div className='receipt-header d-flex gap-4'>
                            <div className='hotel-logo'>
                                <img src={HotelLogo} alt='' />
                            </div>
                            <div className='hotel-info'>
                                <h4><strong>NEW WORLD SAIGON HOTEL</strong></h4>
                                <div className='d-flex flex-column gap-1'>
                                    <span><GrPlayFill className='me-1' /> Address: New World Saigon Hotel 228 Nguyen Van Cu Street, 4 Ward, District 5, Ho Chi Minh city</span>
                                    <span><GrPlayFill className='me-1' /> Phone: 012 3456 7890</span>
                                    <span><GrPlayFill className='me-1' /> Website: https://www.newworldsaigonhotel.com</span>
                                </div>

                            </div>
                        </div>
                        <div className='receipt-content'>
                            <div className='receipt-title text-center mt-3'>
                                <span>HÓA ĐƠN THANH TOÁN DỊCH VỤ</span>
                            </div>
                            <div className='d-flex justify-content-between bottomBorder py-2'>
                                <span>Mã hóa đơn: <span className='ms-2'>{!_.isEmpty(data) ? data.invoice_info.id : ''}</span></span>
                                <span>Nhân viên lập: <span className='ms-2'>{!_.isEmpty(data) ? data.invoice_info.staff_name : ''}</span></span>
                                <span>Ngày lập: <span className='ms-2'>{!_.isEmpty(data) ? data.invoice_info.date : ''}</span></span>
                            </div>
                            <div className='d-flex main-info bottomBorder py-3'>
                                <div className='d-flex customer-info gap-4'>
                                    <div className='d-flex flex-column gap-3'>
                                        <span>Tên khách hàng: </span>
                                        <span>CMND: </span>
                                        <span>Số điện thoại: </span>
                                        <span>Loại khách hàng: </span>
                                        <span>Địa chỉ: </span>
                                        <span>Quốc tịch: </span>
                                    </div>
                                    <div className='d-flex flex-column gap-3'>
                                        <strong>{!_.isEmpty(data) ? data.customer_info.name : ''}</strong>
                                        <span>{!_.isEmpty(data) ? data.customer_info.citizen_id : ''}</span>
                                        <span>{!_.isEmpty(data) ? data.customer_info.phone : ''}</span>
                                        <span>{!_.isEmpty(data) ? data.customer_info.category : ''}</span>
                                        <span>{!_.isEmpty(data) ? data.customer_info.address : ''}</span>
                                        <span>{!_.isEmpty(data) ? data.customer_info.nationality : ''}</span>
                                    </div>
                                </div>
                                <div className='d-flex room-info gap-5 '>
                                    <div className='d-flex flex-column gap-3'>
                                        <span>Tên phòng: </span>
                                        <span>Loại phòng: </span>
                                        <span>Đơn giá: </span>
                                        <span>Ngày nhận: </span>
                                        <span>Ngày trả: </span>
                                        <span>Số đêm: </span>
                                    </div>
                                    <div className='d-flex flex-column gap-3'>
                                        <strong>{!_.isEmpty(data) ? data.room_info.name : ''}</strong>
                                        <span>{!_.isEmpty(data) ? data.room_info.category : ''}</span>
                                        <strong>{CurrencyFormat(!_.isEmpty(data) ? data.room_info.price : 0)}</strong>
                                        <span>{!_.isEmpty(data) ? data.room_info.receive_date : ''}</span>
                                        <span>{!_.isEmpty(data) ? data.room_info.checkOut_date : ''}</span>
                                        <span>{!_.isEmpty(data) ? data.room_info.night_stay : ''}</span>
                                    </div>
                                </div>
                            </div>
                            <div className='service-receipt bottomBorder  py-2'>
                                <table className="table">
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
                                        {!_.isEmpty(data) && data.services && data.services?.length > 0 &&
                                            data.services.map((item, index) => {
                                                return (
                                                    <tr key={`service-receipt-item-${item.id}`}>
                                                        <td>{index + 1}</td>
                                                        <td>{item.name}</td>
                                                        <td>{CurrencyFormat(item.price)}</td>
                                                        <td>{item.quantity}</td>
                                                        <td>{CurrencyFormat(item.total)}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <div className='d-flex justify-content-between payment py-3'>
                                <div className='d-flex section gap-4'>
                                    <div className='d-flex flex-column gap-3'>
                                        <span>Tiền phòng: </span>
                                        <span>Tổng tiền: </span>
                                    </div>
                                    <div className='d-flex flex-column gap-3'>
                                        <span>{CurrencyFormat(!_.isEmpty(data) ? (data.room_info.price * data.room_info.night_stay) : 0)}</span>
                                        <strong className='total'>{CurrencyFormat(!_.isEmpty(data) ? data.invoice_info.invoice_total : 0)}</strong>
                                    </div>
                                </div>
                                <div className='d-flex section gap-4'>
                                    <div className='d-flex gap-3'>
                                        <span>Phụ thu: </span>
                                        <span>{CurrencyFormat(!_.isEmpty(data) ? data.invoice_info.surcharge_total : 0)}</span>
                                    </div>
                                </div>
                                <div className='d-flex section gap-4'>
                                    <div className='d-flex  gap-3'>
                                        <span>Tiền dịch vụ: </span>
                                        <span>{CurrencyFormat(!_.isEmpty(data) ? data.invoice_info.service_price_total : 0)}</span>
                                    </div>
                                </div>
                            </div>
                            <div className='copyright d-flex justify-content-center align-items-center position-absolute'>
                                <span className='label'>NEW WORLD SAIGON HOTEL</span>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => print()}>Xuất hóa đơn</Button>
                    <Button variant="outline-secondary" onClick={handleCloseModal}>Hủy</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
});

export default ReceiptPrinting;