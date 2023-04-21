import React from 'react';
import Modal from 'react-bootstrap/Modal';
import './ServiceCategory.scss';

const ServiceCategory = (props) => {

    const { show, setShow } = props;

    return (
        <>
            <Modal
                show={show}
                size='lg'
                onHide={() => setShow(false)}
                backdrop="static"
                keyboard={false}
                className='service-category'
            >
                <Modal.Header closeButton>
                    <Modal.Title className='title'>Quản Lý Loại Dịch Vụ</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='main'>
                        <fieldset className='service-category-info border rounded-2 p-3'>
                            <legend className='reset legend-text'>Thông tin loại dịch vụ</legend>
                            <div className='form-group'>
                                <label className='form-label'>Tên loại dịch vụ:</label>
                                <input type='text' className='form-control' />
                            </div>
                            <div className='form-group mt-4'>
                                <button className='btn btn-warning w-100'>Cập nhật</button>
                            </div>
                            <div className='form-group mt-4'>
                                <button className='btn btn-outline-danger w-100'>Xóa loại dịch vụ</button>
                            </div>
                        </fieldset>
                        <div className='service-category-list d-flex gap-3 flex-column'>
                            <fieldset className='service-category-table border rounded-2 p-3'>
                                <legend className='reset legend-text'>Danh sách loại dịch vụ hiện có</legend>
                                <table className="table table-bordered">
                                    <tbody>
                                        {
                                            [...Array(5)].map((item, index) => {
                                                return (
                                                    <>
                                                        <tr>
                                                            <td>Ăn uống</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Tiện ích</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Giải trí</td>
                                                        </tr>
                                                    </>

                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </fieldset>
                            <fieldset className='service-category-addition border rounded-2 p-3'>
                                <legend className='reset legend-text'>Thêm loại dịch vụ mới</legend>
                                <div className='row mt-2'>
                                    <div className='form-group col-6'>
                                        <input type='text' className='form-control' placeholder='Tên loại dịch vụ' />
                                    </div>
                                    <div className='form-group col-6'>
                                        <button className='btn btn-success w-100'>Thêm mới</button>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ServiceCategory;