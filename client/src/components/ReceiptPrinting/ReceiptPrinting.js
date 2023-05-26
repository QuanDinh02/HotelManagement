import './ReceiptPrinting.scss';
import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import HotelLogo from '../../assets/images/hotel-logo.png';
import { GrPlayFill } from 'react-icons/gr';
import { CurrencyFormat } from '../Format/FormatNumber';

const ReceiptPrinting = (props) => {

    const { show, setShow } = props;

    const handleCloseModal = () => {

        setShow(false);
    }

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
                    <div className='receipt-printing-container position-relative'>
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
                            <div className='d-flex justify-content-between bottomBorder px-4 py-2'>
                                <span>Mã hóa đơn: <span className='ms-2'>1230</span></span>
                                <span>Nhân viên lập: <span className='ms-2'>Nguyễn Văn A</span></span>
                                <span>Ngày lập: <span className='ms-2'>12/04/2023</span></span>
                            </div>
                            <div className='d-flex main-info bottomBorder px-4 py-3'>
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
                                        <strong>Trần Văn Nghĩa</strong>
                                        <span>06270701453</span>
                                        <span>091245336</span>
                                        <span>Khách du lịch</span>
                                        <span>Việt Nam</span>
                                        <span>Việt Nam</span>
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
                                        <strong>Phòng 102</strong>
                                        <span>Deluxe Room</span>
                                        <strong>{CurrencyFormat(2000000)}</strong>
                                        <span>12/04/2023</span>
                                        <span>15/04/2023</span>
                                        <span>3</span>
                                    </div>
                                </div>
                            </div>
                            <div className='service-receipt bottomBorder px-4 py-2'>
                                <table class="table">
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
                                        <tr>
                                            <td>1</td>
                                            <td>Mì xào 2 trứng, 1 xúc xích</td>
                                            <td>{CurrencyFormat(15000)}</td>
                                            <td>2</td>
                                            <td>{CurrencyFormat(30000)}</td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>Mì xào 2 trứng, 1 xúc xích</td>
                                            <td>{CurrencyFormat(15000)}</td>
                                            <td>2</td>
                                            <td>{CurrencyFormat(30000)}</td>
                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td>Mì xào 2 trứng, 1 xúc xích</td>
                                            <td>{CurrencyFormat(15000)}</td>
                                            <td>2</td>
                                            <td>{CurrencyFormat(30000)}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className='d-flex justify-content-between payment bottomBorder px-4 py-3'>
                                <div className='d-flex section gap-4'>
                                    <div className='d-flex flex-column gap-3'>
                                        <span>Tiền phòng: </span>
                                        <span>Tổng tiền: </span>
                                    </div>
                                    <div className='d-flex flex-column gap-3'>
                                        <span>{CurrencyFormat(6000000)}</span>
                                        <strong className='total'>{CurrencyFormat(8000000)}</strong>
                                    </div>
                                </div>
                                <div className='d-flex section gap-4'>
                                    <div className='d-flex gap-3'>
                                        <span>Phụ thu: </span>
                                        <span>{CurrencyFormat(1000000)}</span>
                                    </div>
                                </div>
                                <div className='d-flex section gap-4'>
                                    <div className='d-flex  gap-3'>
                                        <span>Tiền dịch vụ: </span>
                                        <span>{CurrencyFormat(1000000)}</span>
                                    </div>
                                </div>
                            </div>
                            <div className='copyright d-flex justify-content-center align-items-center position-absolute'>
                                <span className='label'>NEW WORLD SAIGON HOTEL</span>
                            </div>
                        </div>
                        <div className='receipt-footer'>

                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success">Xuất hóa đơn</Button>
                    <Button variant="outline-secondary" onClick={handleCloseModal}>Hủy</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ReceiptPrinting;