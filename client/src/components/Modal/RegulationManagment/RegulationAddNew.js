import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useImmer } from "use-immer";
import _ from 'lodash';
import { useMutation, useLazyQuery } from '@apollo/client';
import { CREATE_REGULATION } from '../../Mutation/RegulationMutation';
import './Modal.scss';

const RegulationAddNew = (props) => {

    const { show, setShow, updateRegulationList } = props;

    const [newRegulation, setNewRegulation] = useImmer({
        name: '',
        price: '',
        description: ''
    });

    const [createRegulation, { data: updateMsg }] = useMutation(CREATE_REGULATION, {
        onCompleted: async () => {
            await updateRegulationList();
        }
    });

    const handleAddRegulation = async () => {
        if (!newRegulation.name) {
            return;
        } else {
            let result = await createRegulation({
                variables: {
                    input: {
                        name: newRegulation.name,
                        price: +newRegulation.price,
                        description: newRegulation.description
                    }
                }
            });

            handleCloseModal();
        }
    }

    const handleOnChange = (attribute, value) => {
        setNewRegulation(draft => {
            draft[attribute] = value;
        });
    }

    const handleCloseModal = () => {
        setNewRegulation({
            name: '',
            price: '',
            description: ''
        });
        setShow(false);
    }

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
                    <Modal.Title className='title'>Quy Định Mới</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='main'>
                        <fieldset className='service-category-info border rounded-2 p-3'>
                            <legend className='reset legend-text'>Thông tin quy định</legend>
                            <div className='row'>
                                <div className='form-group col-6'>
                                    <label className='form-label'>Tên quy định:</label>
                                    <input className='form-control' type='text' value={newRegulation.name}
                                        onChange={(event) => handleOnChange('name', event.target.value)}
                                    />
                                </div>
                                <div className='form-group col-6'>
                                    <label className='form-label'>Giá:</label>
                                    <input className='form-control' type='text' value={newRegulation.price}
                                        onChange={(event) => handleOnChange('price', event.target.value)}
                                    />
                                </div>
                            </div>
                            <div className='row mt-3'>
                                <div className='form-group col-12'>
                                    <label className='form-label'>Mô tả:</label>
                                    <textarea className='form-control' type='text'
                                        value={newRegulation.regulation}
                                        onChange={(event) => handleOnChange('description', event.target.value)}
                                    />
                                </div>
                            </div>
                        </fieldset>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={handleAddRegulation}>Thêm mới</Button>
                    <Button variant="outline-secondary" onClick={handleCloseModal}>Hủy</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default RegulationAddNew;