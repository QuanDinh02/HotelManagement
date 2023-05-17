import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useImmer } from "use-immer";
import { CurrencyFormat } from '../../Format/FormatNumber';
import _ from 'lodash';
import { GET_HOTEL_SERVICES } from '../../Query/ServicePaymentQuery';
import { CREATE_ROOM_SERVICE } from '../../Mutation/RoomPaymentMutation';
import { useMutation, useLazyQuery } from '@apollo/client';
import './Modal.scss';

const ServiceAddNew = (props) => {

    const { show, setShow, room_use_id, updateInvoice } = props;
    const [hotelServices, setHotelServices] = useImmer([]);

    const [serviceCategories, setServiceCategories] = React.useState([]);
    const [serviceByCategory, setServiceByCategory] = React.useState([]);

    const [category, setCategory] = React.useState({});
    const [newService, setNewService] = useImmer({
        id: '',
        name: '',
        quantity: '',
        price: '',
        total: ''
    });

    const [getServiceList] = useLazyQuery(GET_HOTEL_SERVICES);
    const [createRoomService, { data: updateMsg }] = useMutation(CREATE_ROOM_SERVICE, {
        onCompleted: async () => {
            await updateInvoice(room_use_id, 'Đã nhận phòng', 'refetch');
        }
    });

    const handleAddRoomService = async () => {
        if (!newService.id) {
            return;
        } else {
            let result = await createRoomService({
                variables: {
                    input: {
                        service_id: +newService.id,
                        room_use_id: +room_use_id,
                        quantity: +newService.quantity,
                        total: +newService.total
                    }
                }
            });

            handleCloseModal();
        }
    }

    const handleQuantity = (value) => {
        setNewService(draft => {
            if (value > 0) {
                draft.quantity = value;
                draft.total = draft.price * value;
            }
        });
    }

    const handleSelect = (type, value) => {
        if (type === 'CATEGORY') {
            if (value === "0") {
                setCategory({});
            } else {
                let _category = serviceCategories.filter(item => item.id === value)[0];
                setCategory(_category);

                let _services = hotelServices.filter(item => item.hotel_service_category.id === value);
                setServiceByCategory(_services);
            }
        }

        if (type === 'SERVICE') {
            if (value === "0") {
                setNewService({});
                setNewService(draft => {
                    draft.id = '';
                    draft.name = '';
                    draft.quantity = '';
                    draft.price = '';
                    draft.total = '';
                });
            } else {
                let _service = serviceByCategory.filter(item => item.id === value)[0];
                setNewService(draft => {
                    draft.id = _service.id;
                    draft.name = _service.name;
                    draft.quantity = 1;
                    draft.price = _service.price;
                    draft.total = _service.price;
                });
            }
        }
    }

    const handleCloseModal = () => {
        setNewService({
            id: '',
            name: '',
            quantity: '',
            price: '',
            total: ''
        });
        setCategory({});
        setServiceByCategory([]);
        setShow(false);
    }

    const fetchServiceList = async () => {
        let { data: hotel_services_management } = await getServiceList();
        setHotelServices(hotel_services_management?.hotel_services);
        setServiceCategories(hotel_services_management?.hotel_service_categories);
    }

    React.useEffect(() => {
        if (show) {
            fetchServiceList();
        }
    }, [show]);

    return (
        <>
            <Modal
                show={show}
                onHide={handleCloseModal}
                backdrop="static"
                keyboard={false}
                className='service-room-use-modal'

            >
                <Modal.Header closeButton>
                    <Modal.Title className='title'>Thêm Dịch Vụ</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='main'>
                        <fieldset className='service-category-info border rounded-2 p-3'>
                            <legend className='reset legend-text'>Thông tin dịch vụ</legend>
                            <div className='row'>
                                <div className='form-group col-6'>
                                    <label className='form-label'>Loại dịch vụ:</label>
                                    <select className="form-select" onChange={(event) => handleSelect('CATEGORY', event.target.value)}>
                                        <option key={`new-service-type-default`} value="0">Chọn loại dịch vụ...</option>
                                        {serviceCategories && serviceCategories.length > 0 &&
                                            serviceCategories.map(item => {
                                                return (
                                                    <option key={`room-service-category-${item.id}`} value={item.id}>{item.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className='form-group col-6'>
                                    <label className='form-label'>Tên dịch vụ:</label>
                                    <select className="form-select" disabled={_.isEmpty(category) ? true : false} onChange={(event) => handleSelect('SERVICE', event.target.value)}>
                                        <option key={`new-service-type-default`} value="0">Chọn dịch vụ...</option>
                                        {serviceByCategory && serviceByCategory.length > 0 &&
                                            serviceByCategory.map(item => {
                                                return (
                                                    <option key={`room-service-select-${item.id}`} value={item.id}>{item.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className='row mt-3'>
                                <div className='form-group col-6'>
                                    <label className='form-label'>Số lượng:</label>
                                    <input className='form-control' type='number' disabled={newService.id === "" ? true : false}
                                        value={newService.quantity}
                                        onChange={(event) => handleQuantity(event.target.value)}
                                    />
                                </div>
                                <div className='form-group col-6'>
                                    <label className='form-label'>Thành tiền:</label>
                                    <input className='form-control' type='text' disabled value={CurrencyFormat(newService.total)} />
                                </div>
                            </div>
                        </fieldset>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={handleAddRoomService}>Thêm mới</Button>
                    <Button variant="outline-secondary" onClick={handleCloseModal}>Hủy</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ServiceAddNew;