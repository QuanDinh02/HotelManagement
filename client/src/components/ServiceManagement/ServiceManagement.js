import { useHistory } from 'react-router-dom';
import './ServiceManagement.scss';
import { TfiClose } from 'react-icons/tfi';
import { HiOutlineSearch } from 'react-icons/hi';
import React from 'react';
import { CurrencyFormat } from '../Format/FormatNumber';
import ServiceCategory from '../Modal/ServiceCategory/ServiceCategory';
import ServiceModal from '../Modal/Service/ServiceModal';
import {
    GET_ALL_HOTEL_SERVICES, GET_SEARCHED_SERVICE_BY_NAME,
    GET_SEARCHED_SERVICE_BY_CATEGORY
} from '../Query/HotelServiceQuery';
import { UPDATE_SERVICE, DELETE_SERVICE } from '../Mutation/ServiceMutation';
import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import { useImmer } from "use-immer";
import _ from 'lodash';
import DeleteModal from '../Modal/ServiceMutation/DeleteModal';

const ServiceManagement = () => {

    const history = useHistory();

    const [showServiceCategory, setShowServiceCategory] = React.useState(false);
    const [showServiceModal, setShowServiceModal] = React.useState(false);
    const [showDeleteModal, setShowDeleteModal] = React.useState(false);

    const [hotelServices, setHotelServices] = useImmer([]);
    const [editService, setEditService] = useImmer({});
    const [editAllowance, setEditAllowance] = React.useState(false);
    const [serviceCategories, setServiceCategories] = React.useState([]);

    const [nameSearch, setNameSearch] = React.useState('');
    const [categorySearch, setCategorySearch] = React.useState('');

    const [getSearchedServiceByName] = useLazyQuery(GET_SEARCHED_SERVICE_BY_NAME);
    const [getSearchedServiceByCategory] = useLazyQuery(GET_SEARCHED_SERVICE_BY_CATEGORY);

    const { data: hotel_services_data } = useQuery(GET_ALL_HOTEL_SERVICES);

    const [updateService, { data: updateMsg }] = useMutation(UPDATE_SERVICE, {
        refetchQueries: [
            { query: GET_ALL_HOTEL_SERVICES }
        ],
    });

    const [deleteService, { data: deleteMsg }] = useMutation(DELETE_SERVICE, {
        refetchQueries: [
            { query: GET_ALL_HOTEL_SERVICES }
        ],
    });

    const handleSearchService = async (type) => {
        setEditService({});

        if (type === 'NAME') {
            let { data: { searched_service_by_name } } = await getSearchedServiceByName({
                variables: {
                    value: nameSearch
                }
            });
            setHotelServices(searched_service_by_name);
        }

        if (type === 'CATEGORY') {
            let { data: { searched_service_by_category } } = await getSearchedServiceByCategory({
                variables: {
                    value: categorySearch
                }
            });
            setHotelServices(searched_service_by_category);
        }

    }

    const handleEditService = (attribute, value) => {
        if (attribute === 'hotel_service_category') {
            let category = _.find(serviceCategories, item => item.id === value);
            setEditService(draft => {
                draft[attribute] = category;
            });
        } else {
            setEditService(draft => {
                draft[attribute] = value;
            });
        }
    }

    const handleSelectingService = (selected_service) => {
        let _editService = _.cloneDeep(selected_service);
        delete _editService.__typename;
        delete _editService.isSelected;

        setEditService(_editService);

        setHotelServices(draft => {
            draft = draft.map(item => {
                if (item.id === selected_service.id) {
                    item.isSelected = true;
                    return item;
                } else {
                    item.isSelected = false;
                    return item;
                }
            })
        })
    }

    const dataValidation = () => {
        if (!editService) {
            return;
        }
    }

    const handleUpdateService = async () => {
        if (editAllowance) {
            dataValidation();
            let result = await updateService({
                variables: {
                    input: {
                        ...editService,
                        price: +editService.price,
                        hotel_service_category: +editService.hotel_service_category.id
                    }
                }
            });

            setEditService({});
            setEditAllowance(false);
        } else {
            setEditAllowance(true);
        }
    }

    const handleDeleteService = async () => {
        if (!_.isEmpty(editService)) {
            let result = await deleteService({
                variables: {
                    deleteServiceId: editService.id
                }
            });
            setEditService({});
            setEditAllowance(false);
        }
    }

    React.useEffect(() => {
        if (hotel_services_data && hotel_services_data.hotel_services) {
            let _hotelServices = hotel_services_data.hotel_services.map(item => {
                return {
                    ...item, isSelected: false
                }
            });
            setHotelServices(_hotelServices);
            setServiceCategories(hotel_services_data.hotel_service_categories);
        }
    }, [hotel_services_data]);

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
                                    <input type="text" className="form-control" placeholder="Tên dịch vụ" value={nameSearch}
                                        onChange={(event) => setNameSearch(event.target.value)}
                                    />
                                    <span className="input-group-text search-btn" title='Tìm kiếm' onClick={() => handleSearchService('NAME')}><HiOutlineSearch /></span>
                                </div>
                                <div className="input-group">
                                    <input type="text" className="form-control" placeholder="Loại dịch vụ" value={categorySearch}
                                        onChange={(event) => setCategorySearch(event.target.value)}
                                    />
                                    <span className="input-group-text search-btn" title='Tìm kiếm' onClick={() => handleSearchService('CATEGORY')}><HiOutlineSearch /></span>
                                </div>
                            </div>

                        </fieldset>
                        <fieldset className='middle border rounded-2 pb-3'>
                            <legend className='reset legend-text'>Thông tin dịch vụ</legend>
                            <div className='row align-items-center px-4'>
                                <div className='form-group col-6'>
                                    <label className='form-label'>Tên dịch vụ:</label>
                                    <input type='text' className='form-control' disabled={!editAllowance} value={editService?.name ? editService.name : ''}
                                        onChange={(event) => handleEditService('name', event.target.value)}
                                    />
                                </div>
                                <div className='form-group col-6'>
                                    <label className='form-label'>Loại dịch vụ:</label>
                                    <select className="form-select" disabled={!editAllowance} value={editService?.hotel_service_category ? editService.hotel_service_category.id : ''}
                                        onChange={(event) => handleEditService('hotel_service_category', event.target.value)}
                                    >
                                        <option key={`service-type-default`} value="0">Chọn loại dịch vụ...</option>
                                        {serviceCategories && serviceCategories.length > 0 &&
                                            serviceCategories.map(item => {
                                                return (
                                                    <option key={`service-type-${item.id}`} value={item.id}>{item.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className='row mt-1 px-4'>
                                <div className='form-group col-6'>
                                    <label className='form-label'>Giá dịch vụ:</label>
                                    <input type='text' className='form-control' disabled={!editAllowance} value={editService?.price ? editService.price : ''}
                                        onChange={(event) => handleEditService('price', event.target.value)}
                                    />
                                </div>
                            </div>
                        </fieldset>
                        <fieldset className='border rounded-2 p-2'>
                            <legend className='reset legend-text'>Chức năng</legend>
                            <div className='row mb-3 px-4'>
                                <div className='form-group col-6'>
                                    <button className='btn btn-success col-12' onClick={() => setShowServiceModal(true)}>Thêm dịch vụ</button>
                                </div>
                                <div className='form-group col-6'>
                                    <button className='btn btn-outline-danger col-12' onClick={() => setShowDeleteModal(true)} disabled={_.isEmpty(editService) ? true : false}>Xóa dịch vụ</button>
                                </div>
                            </div>
                            <div className='row mb-3 px-4'>
                                <div className='form-group col-6'>
                                    <button className='btn btn-primary col-12' onClick={() => setShowServiceCategory(true)}>Quản lý Loại dịch vụ</button>
                                </div>
                                <div className='form-group col-6'>
                                    <button className='btn btn-warning col-12' onClick={handleUpdateService} disabled={_.isEmpty(editService) ? true : false}>
                                        {editAllowance === false ? <span>Chỉnh sửa</span> : <span>Lưu chỉnh sửa</span>}
                                    </button>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                    <fieldset className='right-content border rounded-2 p-2' onScroll={(event) => { event.preventDefault() }}>
                        <legend className='reset legend-text'>Danh sách tất cả các dịch vụ</legend>
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">Tên</th>
                                    <th scope="col">Giá</th>
                                    <th scope="col">Loại dịch vụ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {hotelServices && hotelServices.length > 0 &&
                                    hotelServices.map((item, index) => {
                                        return (
                                            <tr
                                                key={`hotel-services-${item.id}`}
                                                className={item.isSelected ? 'selected-row' : ''}
                                                onClick={() => handleSelectingService(item)}
                                            >
                                                <td>{item.name}</td>
                                                <td>{CurrencyFormat(item.price)}</td>
                                                <td>{item.hotel_service_category?.name}</td>
                                            </tr>
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
            <DeleteModal
                show={showDeleteModal}
                setShow={setShowDeleteModal}
                handleDeleteService={handleDeleteService}
            />
            <ServiceModal
                show={showServiceModal}
                setShow={setShowServiceModal}
                serviceCategories={serviceCategories}
            />
        </>

    )
}

export default ServiceManagement;