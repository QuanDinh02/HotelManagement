import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './ServiceModal.scss';
import { useImmer } from "use-immer";
import _ from 'lodash';
import { CREATE_NEW_SERVICE } from '../../Mutation/ServiceMutation';
import { GET_ALL_HOTEL_SERVICES } from '../../Query/HotelServiceQuery';
import { useMutation } from '@apollo/client';

const ServiceModal = (props) => {

    const { show, setShow, serviceCategories } = props;

    const [newService, setNewService] = useImmer({
        name: '',
        price: '',
        hotel_service_category: {
            id: '',
            name: ''
        }
    });

    const [createNewService] = useMutation(CREATE_NEW_SERVICE, {
        refetchQueries: [
            { query: GET_ALL_HOTEL_SERVICES }
        ],
    });

    const handleOnChange = (attribute, value) => {
        if (attribute === 'hotel_service_category') {
            let category = _.find(serviceCategories, item => item.id === value);
            setNewService(draft => {
                draft[attribute] = category;
            });
        } else {
            setNewService(draft => {
                draft[attribute] = value;
            });
        }
    }

    const handleCloseModal = () => {
        setNewService({
            name: '',
            price: '',
            hotel_service_category: {
                id: '',
                name: ''
            }
        });

        setShow(false);
    }

    const handleAddNewService = async () => {
        let result = await createNewService({
            
            variables: {
                input: {
                    name: newService.name,
                    price: +newService.price,
                    hotel_service_category: +newService.hotel_service_category.id
                }
            }
        });
        handleCloseModal();
    }

    return (
        <>
            <Modal
                show={show}
                onHide={handleCloseModal}
                backdrop="static"
                keyboard={false}
                className='service-modal'
            >
                <Modal.Header closeButton>
                    <Modal.Title className='title'>Thêm mới Dịch Vụ</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='main'>
                        <fieldset className='service-category-info border rounded-2 p-3'>
                            <legend className='reset legend-text'>Thông tin dịch vụ</legend>
                            <div className='d-flex justify-content-between'>
                                <div className='form-group col-6'>
                                    <label className='form-label'>Tên dịch vụ: <span className='required'>(*)</span></label>
                                    <input type='text' className='form-control' value={newService.name}
                                        onChange={(event) => handleOnChange('name', event.target.value)}
                                    />
                                </div>
                                <div className='form-group col-5'>
                                    <label className='form-label'>Loại dịch vụ: <span className='required'>(*)</span></label>
                                    <select className="form-select" value={newService.hotel_service_category.id}
                                        onChange={(event) => handleOnChange('hotel_service_category', event.target.value)}
                                    >
                                        <option key={`new-service-type-default`} value="0">Chọn loại dịch vụ...</option>
                                        {serviceCategories && serviceCategories.length > 0 &&
                                            serviceCategories.map(item => {
                                                return (
                                                    <option key={`new-service-type-${item.id}`} value={item.id}>{item.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className='form-group mt-2'>
                                <label className='form-label'>Giá dịch vụ:</label>
                                <input type='text' className='form-control'
                                    onChange={(event) => handleOnChange('price', event.target.value)}
                                />
                            </div>
                        </fieldset>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={handleAddNewService}>Thêm mới</Button>
                    <Button variant="outline-secondary" onClick={handleCloseModal}>Hủy</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ServiceModal;