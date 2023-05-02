import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './Room.scss';
import { useImmer } from "use-immer";
import _ from 'lodash';
import { CREATE_NEW_ROOM } from '../../Mutation/RoomMutation';
import { useMutation } from '@apollo/client';

const RoomAddModal = (props) => {

    const { show, setShow, roomCategories, updateRoomList } = props;

    const [newRoom, setNewRoom] = useImmer({
        name: '',
        room_category: {
            id: '',
            name: ''
        }
    });

    const [createNewRoom] = useMutation(CREATE_NEW_ROOM);

    const handleOnChange = (attribute, value) => {
        if (attribute === 'room_category') {
            let category = _.find(roomCategories, item => item.id === value);
            setNewRoom(draft => {
                draft[attribute] = category;
            });
        } else {
            setNewRoom(draft => {
                draft[attribute] = value;
            });
        }
    }

    const handleCloseModal = () => {
        setNewRoom({
            name: '',
            room_category: {
                id: '',
                name: ''
            }
        });

        setShow(false);
    }

    const handleAddNewRoom = async () => {
        if (newRoom.room_category.id === "0") {
            return;
        }
        let result = await createNewRoom({

            variables: {
                input: {
                    name: newRoom.name,
                    room_category: +newRoom.room_category.id
                }
            }
        });

        updateRoomList();
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
                    <Modal.Title className='title'>Thêm mới Phòng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='main'>
                        <fieldset className='border rounded-2 p-3'>
                            <legend className='reset legend-text'>Thông tin phòng</legend>
                            <div className='form-group mt-2'>
                                <label className='form-label'>Số phòng (tên phòng): <span className='required'>(*)</span></label>
                                <input type='text' className='form-control' value={newRoom.name}
                                    onChange={(event) => handleOnChange('name', event.target.value)}
                                />
                            </div>
                            <div className='form-group mt-2'>
                                <label className='form-label'>Loại phòng: <span className='required'>(*)</span></label>
                                <select className="form-select" value={newRoom.room_category.id}
                                    onChange={(event) => handleOnChange('room_category', event.target.value)}
                                >
                                    <option key={`new-room-type-default`} value="0">Chọn loại phòng...</option>
                                    {roomCategories && roomCategories.length > 0 &&
                                        roomCategories.map(item => {
                                            return (
                                                <option key={`new-room-type-${item.id}`} value={item.id}>{item.name}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        </fieldset>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={handleAddNewRoom}>Thêm mới</Button>
                    <Button variant="outline-secondary" onClick={handleCloseModal}>Hủy</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default RoomAddModal;