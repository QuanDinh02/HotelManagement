import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { CurrencyFormat } from '../../Format/FormatNumber';
import _ from 'lodash';
import { GET_ALL_SURCHARGES } from '../../Query/ServicePaymentQuery';
import { CREATE_ROOM_SURCHARGE } from '../../Mutation/RoomPaymentMutation';
import { useMutation, useLazyQuery } from '@apollo/client';
import './Modal.scss';

const SurchargeModal = (props) => {

    const { show, setShow, room_use_id, updateInvoice } = props;
    const [surchargeList, setSurchargeList] = React.useState([]);
    const [newSurcharge, setNewSurcharge] = React.useState({});

    const [getSurchargeList, { refetch }] = useLazyQuery(GET_ALL_SURCHARGES);
    const [createRoomSurcharge, { data: updateMsg }] = useMutation(CREATE_ROOM_SURCHARGE, {
        onCompleted: async () => {
            await updateInvoice(room_use_id, 'Đã nhận phòng', 'refetch');
        }
    });

    const handleAddRoomSurcharge = async () => {
        if (_.isEmpty(newSurcharge)) {
            return;
        } else {
            let result = await createRoomSurcharge({
                variables: {
                    input: {
                        surcharge_id: +newSurcharge.id,
                        room_use_id: +room_use_id
                    }
                }
            });

            handleCloseModal();
        }
    }

    const handleSelectSurcharge = (new_surcharge) => {
        if (new_surcharge === "0") {
            setNewSurcharge({});
        } else {
            let _surcharge = surchargeList.filter(item => item.id === new_surcharge)[0];
            console.log(_surcharge);
            setNewSurcharge(_surcharge);
        }
    }

    const handleCloseModal = () => {
        setNewSurcharge({});
        setShow(false);
    }

    const fetchSurchargeList = async () => {
        let { data: { surcharge_list } } = await getSurchargeList();
        setSurchargeList(surcharge_list);
    }

    React.useEffect(() => {
        if (show) {
            fetchSurchargeList();
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
                    <Modal.Title className='title'>Phụ Thu</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='main'>
                        <fieldset className='service-category-info border rounded-2 p-3'>
                            <legend className='reset legend-text'>Thông tin phụ thu</legend>
                            <div className='form-group col-12'>
                                <label className='form-label'>Quy định phụ thu:</label>
                                <select className="form-select" value={newSurcharge?.id}
                                    onChange={(event) => handleSelectSurcharge(event.target.value)}
                                >
                                    <option key={`new-service-type-default`} value="0">Chọn loại phụ thu...</option>
                                    {surchargeList && surchargeList.length > 0 &&
                                        surchargeList.map(item => {
                                            return (
                                                <option key={`room-service-category-${item.id}`} value={item.id}>{item.name} - {item.description}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className='form-group col-12 mt-2'>
                                <label className='form-label'>Phí:</label>
                                <input className='form-control' type='text' disabled value={CurrencyFormat(newSurcharge?.price ? newSurcharge.price : 0)} />
                            </div>
                        </fieldset>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="warning" onClick={handleAddRoomSurcharge}>Thêm mới</Button>
                    <Button variant="outline-secondary" onClick={handleCloseModal}>Hủy</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default SurchargeModal;