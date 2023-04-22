import React from 'react';
import Modal from 'react-bootstrap/Modal';
import './CustomerHistory.scss';
import { CurrencyFormat } from '../../Format/FormatNumber';

const CustomerHistory = (props) => {

    const { show, setShow } = props;

    return (
        <>
            <Modal
                show={show}
                size='xl'
                onHide={() => setShow(false)}
                backdrop="static"
                keyboard={false}
                className='customer-history'
            >
                <Modal.Header closeButton>
                    <Modal.Title className='title'>Lịch sử Khách hàng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='main'>
                        <fieldset className='customer-info border rounded-2 p-3'>
                            <legend className='reset legend-text'>Thông tin khách hàng</legend>
                            <div className='form-group mt-2'>
                                <label className='form-label'>Tên khách hàng:</label>
                                <input type='text' className='form-control' />
                            </div>
                            <div className='form-group mt-2'>
                                <label className='form-label'>Số điện thoại:</label>
                                <input type='text' className='form-control' />
                            </div>
                            <div className='form-group mt-2'>
                                <label className='form-label'>Loại khách hàng:</label>
                                <input type='text' className='form-control' />
                            </div>
                        </fieldset>
                        <div className='list d-flex gap-3 flex-column'>
                            <fieldset className='room-history-table border rounded-2 p-3'>
                                <legend className='reset legend-text'>Lịch sử Sử dụng phòng</legend>
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th scope="col">Số phòng</th>
                                            <th scope="col">Loại phòng</th>
                                            <th scope="col">Ngày nhận</th>
                                            <th scope="col">Ngày trả</th>
                                            <th scope="col">Tổng Tiền</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            [...Array(18)].map((item, index) => {
                                                return (
                                                    <tr>
                                                        <td>{index + 1}</td>
                                                        <td>Phòng 1 người</td>
                                                        <td>14/04/2023</td>
                                                        <td>16/04/2023</td>
                                                        <td>{CurrencyFormat(1800000)}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </fieldset>
                            <fieldset className='service-history-table border rounded-2 p-3'>
                                <legend className='reset legend-text'>Lịch sử Sử dụng dịch vụ</legend>
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th scope="col">Tên dịch vụ</th>
                                            <th scope="col">Loại dịch vụ</th>
                                            <th scope="col">Số lượng</th>
                                            <th scope="col">Thành tiền</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            [...Array(5)].map((item, index) => {
                                                return (
                                                    <>
                                                        <tr>
                                                            <td>Spa</td>
                                                            <td>Giải trí</td>
                                                            <td>1</td>
                                                            <td>{CurrencyFormat(200000)}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Mì xào trứng và xúc xích</td>
                                                            <td>Đồ ăn</td>
                                                            <td>1</td>
                                                            <td>{CurrencyFormat(18000)}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Chai nước Sting</td>
                                                            <td>Đồ ăn</td>
                                                            <td>1</td>
                                                            <td>{CurrencyFormat(18000)}</td>
                                                        </tr>
                                                    </>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </fieldset>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default CustomerHistory;