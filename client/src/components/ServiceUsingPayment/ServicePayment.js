import { useHistory } from 'react-router-dom';
import './ServicePayment.scss';
import { TfiClose } from 'react-icons/tfi';
import { HiOutlineSearch } from 'react-icons/hi';
import { MdPayment } from 'react-icons/md';
import React from 'react';
import { CurrencyFormat } from '../Format/FormatNumber';
const ServicePayment = () => {

    const history = useHistory();

    return (
        <>
            <div className='service-payment-container'>
                <div className='header py-2 ps-5 pe-3 d-flex justify-content-between align-items-center'>
                    <span className='title'>Sử Dụng Dịch Vụ Và Thanh Toán <span><MdPayment /></span></span>
                    <span className='icon' onClick={() => history.push('/')}><TfiClose className='exit-icon' /></span>
                </div>
                <div className='main px-3 d-flex gap-3 mt-2 mb-2'>
                    <div className='left-content d-flex justify-content-between gap-3'>
                        <div className='left d-flex flex-column gap-2'>
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
                                            <th scope="col">Loại phòng</th>
                                            <th scope="col">Giá</th>
                                            <th scope="col">Số người tối đa</th>
                                            <th scope="col">Trạng thái</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            [...Array(4)].map((item, index) => {
                                                return (
                                                    <tr>
                                                        <td>{index + 1}</td>
                                                        <td>Phòng 1 người</td>
                                                        <td>{CurrencyFormat(7000000)}</td>
                                                        <td>1</td>
                                                        <td>Có người</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                        {
                                            [...Array(16)].map((item, index) => {
                                                return (
                                                    <tr>
                                                        <td>{index + 5}</td>
                                                        <td>Phòng 2 người</td>
                                                        <td>{CurrencyFormat(10000000)}</td>
                                                        <td>2</td>
                                                        <td>Trống</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </fieldset>
                        </div>
                        <div className='right d-flex flex-column gap-2'>
                            <fieldset className='service border rounded-2 p-2'>
                                <legend className='reset legend-text'>Dịch vụ</legend>
                                <div className='form-group px-4'>
                                    <label className='form-label'>Loại dịch vụ:</label>
                                    <select className="form-select">
                                        <option defaultValue={'1'}>Ăn uống</option>
                                        <option value="2">Tiện ích</option>
                                        <option value="3">Giải trí</option>
                                    </select>
                                </div>
                                <div className='form-group mt-2 px-4'>
                                    <label className='form-label'>Dịch vụ:</label>
                                    <select className="form-select">
                                        <option defaultValue={'1'}>Spa</option>
                                        <option value="2">Mì xào 2 trứng và xúc xích</option>
                                        <option value="3">Giặt ủi quần áo</option>
                                    </select>
                                </div>
                                <div className='form-group mt-2 px-4'>
                                    <label className='form-label'>Giá:</label>
                                    <input type='text' className='form-control' />
                                </div>
                                <div className='form-group mt-2 px-4'>
                                    <label className='form-label'>Số lượng:</label>
                                    <input type="number" className="form-control" min="1"></input>
                                </div>
                                <div className='form-group mt-3 pb-2 px-4'>
                                    <button className='btn btn-success col-12'>Thêm dịch vụ</button>
                                </div>
                            </fieldset>
                            <fieldset className='payment border rounded-2 p-2'>
                                <legend className='reset legend-text'>Thanh toán</legend>
                                <div className='form-group px-4'>
                                    <label className='form-label'>Tổng tiền:</label>
                                    <input type='text' className='form-control' />
                                </div>
                                <div className='form-group mt-2 px-4'>
                                    <label className='form-label'>Giảm giá:</label>
                                    <input type='text' className='form-control' />
                                </div>
                                <div className='form-group mt-3 pb-2 px-4'>
                                    <button className='btn payment-btn col-12'>Thanh toán</button>
                                </div>
                            </fieldset>
                        </div>
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
                                    <tr>
                                        <td>102</td>
                                        <td>{CurrencyFormat(550000)}</td>
                                        <td>12/03/2020</td>
                                        <td>14/03/2020</td>
                                        <td>{CurrencyFormat(1200000)}</td>
                                        <td>{CurrencyFormat(100000)}</td>
                                        <td>{CurrencyFormat(1850000)}</td>
                                    </tr>
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
                                    {
                                        [...Array(5)].map((item, index) => {
                                            return (
                                                <tr>
                                                    <td>{index + 1}</td>
                                                    <td>QĐ 1.1</td>
                                                    <td>{CurrencyFormat(10000)}</td>
                                                    <td>Số người ở nhiều hơn 2 người ở phòng 2 người</td>
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
                                    {
                                        [...Array(5)].map((item, index) => {
                                            return (
                                                <tr>
                                                    <td>{index + 1}</td>
                                                    <td>Mì xào 2 trứng và xúc xích đức</td>
                                                    <td>{CurrencyFormat(18000)}</td>
                                                    <td>1</td>
                                                    <td>{CurrencyFormat(18000)}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </fieldset>
                    </div>

                </div>
            </div>
        </>

    )
}

export default ServicePayment;