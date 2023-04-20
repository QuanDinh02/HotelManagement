import React from 'react';
import Modal from 'react-bootstrap/Modal';
import './RoomCategory.scss';
import { CurrencyFormat } from '../../Format/FormatNumber';
const RoomCategory = (props) => {

    const { show, setShow } = props;

    return (
        <>
            <Modal
                show={show}
                size='xl'
                onHide={() => setShow(false)}
                backdrop="static"
                keyboard={false}
                className='room-category'
            >
                <Modal.Header closeButton>
                    <Modal.Title className='title'>Quản Lí Loại Phòng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='main'>
                        <fieldset className='room-category-info border rounded-2 p-3'>
                            <legend className='reset legend-text'>Thông tin loại phòng</legend>
                            <div className='form-group'>
                                <label className='form-label'>Tên loại phòng:</label>
                                <select className="form-select">
                                    <option defaultValue={'1'}>Phòng 1 người</option>
                                    <option value="2">Phòng 2 người</option>
                                    <option value="3">Phòng 4 người</option>
                                </select>
                            </div>
                            <div className='form-group mt-2'>
                                <label className='form-label'>Số người tối đa:</label>
                                <input type='text' className='form-control' />
                            </div>
                            <div className='form-group mt-2'>
                                <label className='form-label'>Giá:</label>
                                <input type='text' className='form-control' />
                            </div>
                            <div className='form-group mt-4'>
                                <button className='btn btn-warning w-100'>Cập nhật</button>
                            </div>
                            <div className='form-group mt-4'>
                                <button className='btn btn-outline-danger w-100'>Xóa loại phòng</button>
                            </div>
                        </fieldset>
                        <div className='room-category-list d-flex gap-3 flex-column'>
                            <fieldset className='room-category-table border rounded-2 p-3'>
                                <legend className='reset legend-text'>Danh sách loại phòng</legend>
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th scope="col">Tên loại phòng</th>
                                            <th scope="col">Số người tối đa</th>
                                            <th scope="col">Giá</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            [...Array(15)].map((item, index) => {
                                                return (
                                                    <tr>
                                                        <td>Phòng 1 người</td>
                                                        <td>1</td>
                                                        <td>{CurrencyFormat(7000000)}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                        {/* <tr>
                                        <td>Phòng 1 người</td>
                                        <td>1</td>
                                        <td>{CurrencyFormat(7000000)}</td>
                                    </tr>
                                    <tr>
                                        <td>Phòng 2 người</td>
                                        <td>2</td>
                                        <td>{CurrencyFormat(10000000)}</td>
                                    </tr>
                                    <tr>
                                        <td>Phòng 4 người</td>
                                        <td>2</td>
                                        <td>{CurrencyFormat(15000000)}</td>
                                    </tr> */}
                                    </tbody>
                                </table>
                            </fieldset>
                            <fieldset className='room-category-addition border rounded-2 p-3'>
                                <legend className='reset legend-text'>Thêm loại phòng mới</legend>
                                <div className='form-group'>
                                    <label className='form-label'>Tên loại phòng:</label>
                                    <input type='text' className='form-control' />
                                </div>
                                <div className='row mt-2'>
                                    <div className='form-group col-6'>
                                        <label className='form-label'>Số người tối đa:</label>
                                        <input type='text' className='form-control' />
                                    </div>
                                    <div className='form-group col-6'>
                                        <label className='form-label'>Giá:</label>
                                        <input type='text' className='form-control' />
                                    </div>
                                </div>

                                <div className='form-group mt-4'>
                                    <button className='btn btn-success w-100'>Thêm mới</button>
                                </div>
                            </fieldset>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default RoomCategory;