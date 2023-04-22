import { useHistory } from 'react-router-dom';
import './ServiceManagement.scss';
import { TfiClose } from 'react-icons/tfi';
import { HiOutlineSearch } from 'react-icons/hi';
import React from 'react';
import { CurrencyFormat } from '../Format/FormatNumber';
import ServiceCategory from '../Modal/ServiceCategory/ServiceCategory';
import ServiceModal from '../Modal/Service/ServiceModal';

const ServiceManagement = () => {

    const history = useHistory();
    const [showServiceCategory, setShowServiceCategory] = React.useState(false);
    const [showServiceModal, setShowServiceModal] = React.useState(false);

    return (
        <>
            <div className='service-management-container'>
                <div className='header py-2 ps-5 pe-3 d-flex justify-content-between align-items-center'>
                    <span className='title'>Quản Lý Dịch Vụ</span>
                    <span className='icon' onClick={() => history.push('/')}><TfiClose className='exit-icon' /></span>
                </div>
                <div className='main px-3 d-flex gap-3 mt-2 mb-2'>
                    <div className='left-content d-flex flex-column gap-3'>
                        <fieldset className='top border rounded-2 pt-2 pb-3'>
                            <legend className='reset legend-text'>Tìm kiếm</legend>
                            <div className='d-flex gap-3 px-4'>
                                <div className="input-group">
                                    <input type="text" className="form-control" placeholder="Tên dịch vụ" />
                                    <span className="input-group-text search-btn" title='Tìm kiếm'><HiOutlineSearch /></span>
                                </div>
                                <div className="input-group">
                                    <input type="text" className="form-control" placeholder="Loại dịch vụ" />
                                    <span className="input-group-text search-btn" title='Tìm kiếm'><HiOutlineSearch /></span>
                                </div>
                            </div>

                        </fieldset>
                        <fieldset className='middle border rounded-2 pb-3'>
                            <legend className='reset legend-text'>Thông tin dịch vụ</legend>
                            <div className='row align-items-center px-4'>
                                <div className='form-group col-6'>
                                    <label className='form-label'>Tên dịch vụ:</label>
                                    <input type='text' className='form-control' />
                                </div>
                                <div className='form-group col-6'>
                                    <label className='form-label'>Loại dịch vụ:</label>
                                    <select className="form-select">
                                        <option defaultValue={'1'}>Ăn uống</option>
                                        <option value="2">Giải trí</option>
                                        <option value="3">Tiện ích</option>
                                    </select>
                                </div>
                            </div>
                            <div className='row mt-1 px-4'>
                                <div className='form-group col-6'>
                                    <label className='form-label'>Giá dịch vụ:</label>
                                    <input type='text' className='form-control' />
                                </div>
                            </div>
                        </fieldset>
                        <fieldset className='border rounded-2 p-2'>
                            <legend className='reset legend-text'>Chức năng</legend>
                            <div className='row mb-3 px-4'>
                                <div className='form-group col-6'>
                                    <button className='btn btn-outline-danger col-12'>Hủy dịch vụ</button>

                                </div>
                                <div className='form-group col-6'>
                                    <button className='btn btn-success col-12' onClick={() => setShowServiceModal(true)}>Thêm dịch vụ</button>
                                </div>
                            </div>
                            <div className='row px-4'>
                                <div className='form-group col-6'>
                                    <button className='btn btn-warning col-12'>Cập nhật dịch vụ</button>
                                </div>
                                <div className='form-group col-6'>
                                    <button className='btn btn-primary col-12' onClick={() => setShowServiceCategory(true)}>Quản lý Loại dịch vụ</button>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                    <fieldset className='right-content border rounded-2 p-2' onScroll={(event) => { event.preventDefault() }}>
                        <legend className='reset legend-text'>Danh sách tất cả các phòng</legend>
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">Tên</th>
                                    <th scope="col">Giá</th>
                                    <th scope="col">Loại dịch vụ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    [...Array(3)].map((item, index) => {
                                        return (
                                            <>
                                                <tr>
                                                    <td>Spa</td>
                                                    <td>{CurrencyFormat(1000000)}</td>
                                                    <td>Giải trí</td>
                                                </tr>
                                                <tr>
                                                    <td>Fitness</td>
                                                    <td>{CurrencyFormat(100000)}</td>
                                                    <td>Giải trí</td>
                                                </tr>
                                                <tr>
                                                    <td>Mực khoai chiên vàng & Gỏi bắp bò</td>
                                                    <td>{CurrencyFormat(500000)}</td>
                                                    <td>Ăn uống</td>
                                                </tr>
                                                <tr>
                                                    <td>Giặt quần áo</td>
                                                    <td>{CurrencyFormat(100000)}</td>
                                                    <td>Tiện ích</td>
                                                </tr>
                                                <tr>
                                                    <td>Dịch vụ xe đưa đón sân bay</td>
                                                    <td>{CurrencyFormat(200000)}</td>
                                                    <td>Tiện ích</td>
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
            <ServiceCategory
                show={showServiceCategory}
                setShow={setShowServiceCategory}
            />
            <ServiceModal
                show={showServiceModal}
                setShow={setShowServiceModal}
            />
        </>

    )
}

export default ServiceManagement;