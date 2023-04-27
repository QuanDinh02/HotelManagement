import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './StaffModal.scss';
import { useImmer } from "use-immer";
import _ from 'lodash';
import { GET_ALL_STAFFS } from '../../Query/StaffQuery';
import { CREATE_STAFF } from '../../Mutation/StaffMutation';
import { useMutation } from '@apollo/client';

const StaffModal = (props) => {

    const { show, setShow, staffCategories } = props;

    const [createStaff] = useMutation(CREATE_STAFF, {
        refetchQueries: [
            { query: GET_ALL_STAFFS }
        ],
    });

    const [newStaff, setNewStaff] = useImmer({
        name: '',
        citizen_id: '',
        gender: '',
        dob: '',
        phone: '',
        address: '',
        working_day: '',
        staff_category: {
            id: '',
            name: ''
        }
    });

    const [newStaffAccount, setNewStaffAccount] = useImmer({
        account_name: '',
        password: ''
    });

    const handleOnChange = (attribute, value) => {
        if (attribute === 'staff_category') {
            let category = _.find(staffCategories, item => item.id === value);
            setNewStaff(draft => {
                draft[attribute] = category;
            });
        } else {
            setNewStaff(draft => {
                draft[attribute] = value;
            });
        }
    }

    const handleAccountOnChange = (attribute, value) => {
        setNewStaffAccount(draft => {
            draft[attribute] = value;
        });
    }

    const handleCloseModal = () => {
        setNewStaff({
            name: '',
            citizen_id: '',
            gender: '',
            dob: '',
            phone: '',
            address: '',
            working_day: '',
            staff_category: {
                id: '',
                name: ''
            }
        });

        setNewStaffAccount({
            account_name: '',
            password: ''
        });

        setShow(false);
    }

    const handleAddNewStaff = async () => {
        let result = await createStaff({
            variables: {
                input: {
                    staffInfo: {
                        ...newStaff,
                        staff_category: +newStaff.staff_category.id
                    },

                    staffAccount: newStaffAccount
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
                size='lg'
                keyboard={false}
                className='staff-modal'
            >
                <Modal.Header closeButton>
                    <Modal.Title className='title'>Thêm mới Nhân Viên</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='main d-flex gap-3'>
                        <fieldset className='staff-info border rounded-2 p-3'>
                            <legend className='reset legend-text'>Thông tin nhân viên</legend>
                            <div className='row-info d-flex gap-4 mb-2'>
                                <div className='form-group left'>
                                    <label className='form-label'>Tên nhân viên: <span className='required'>(*)</span></label>
                                    <input type='text' className='form-control' value={newStaff.name}
                                        onChange={(event) => handleOnChange('name', event.target.value)}
                                    />
                                </div>
                                <div className='form-group right'>
                                    <label className='form-label'>Loại nhân viên: <span className='required'>(*)</span></label>
                                    <select className="form-select" value={newStaff.staff_category.id}
                                        onChange={(event) => handleOnChange('staff_category', event.target.value)}
                                    >
                                        <option key={`new-staff-type-default`} value="0">Chọn loại nhân viên...</option>
                                        {staffCategories && staffCategories.length > 0 &&
                                            staffCategories.map(item => {
                                                return (
                                                    <option key={`new-staff-type-${item.id}`} value={item.id}>{item.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className='row-info d-flex gap-4 mb-2'>
                                <div className='form-group left'>
                                    <label className='form-label'>Số CCCD/ CMND: <span className='required'>(*)</span></label>
                                    <input type='text' className='form-control' value={newStaff.citizen_id}
                                        onChange={(event) => handleOnChange('citizen_id', event.target.value)}
                                    />
                                </div>
                                <div className='form-group right'>
                                    <label className='form-label'>Giới tính: <span className='required'>(*)</span></label>
                                    <select className="form-select" value={newStaff.gender}
                                        onChange={(event) => handleOnChange('gender', event.target.value)}
                                    >
                                        <option defaultValue={'Nam'}>Nam</option>
                                        <option value="Nữ">Nữ</option>
                                        <option value="Khác">Khác</option>
                                    </select>
                                </div>
                            </div>
                            <div className='row-info d-flex gap-4 mb-2'>
                                <div className='form-group left'>
                                    <label className='form-label'>Ngày sinh: <span className='required'>(*)</span></label>
                                    <input type='text' className='form-control' value={newStaff.dob}
                                        onChange={(event) => handleOnChange('dob', event.target.value)}
                                    />
                                </div>
                                <div className='form-group left'>
                                    <label className='form-label'>Số điện thoại: <span className='required'>(*)</span></label>
                                    <input type='text' className='form-control' value={newStaff.phone}
                                        onChange={(event) => handleOnChange('phone', event.target.value)}
                                    />
                                </div>
                            </div>
                            <div className='row-info d-flex gap-4 mb-2'>
                                <div className='form-group left'>
                                    <label className='form-label'>Ngày vào làm: </label>
                                    <input type='text' className='form-control' value={newStaff.working_day}
                                        onChange={(event) => handleOnChange('working_day', event.target.value)}
                                    />
                                </div>
                                <div className='form-group left'>
                                    <label className='form-label'>Địa chỉ:</label>
                                    <input type='text' className='form-control' value={newStaff.address}
                                        onChange={(event) => handleOnChange('address', event.target.value)}
                                    />
                                </div>
                            </div>
                        </fieldset>
                        <fieldset className='staff-account border rounded-2 p-3'>
                            <legend className='reset legend-text'>Tài khoản nhân viên</legend>
                            <div className='form-group mb-2 col-12'>
                                <label className='form-label'>Tên đăng nhập: <span className='required'>(*)</span></label>
                                <input type='text' className='form-control' value={newStaffAccount.account_name}
                                    onChange={(event) => handleAccountOnChange('account_name', event.target.value)}
                                />
                            </div>
                            <div className='form-group mb-2 col-12'>
                                <label className='form-label'>Mật khẩu: <span className='required'>(*)</span></label>
                                <input type='password' className='form-control' value={newStaffAccount.password}
                                    onChange={(event) => handleAccountOnChange('password', event.target.value)}
                                />
                            </div>
                        </fieldset>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={handleAddNewStaff}>Thêm mới</Button>
                    <Button variant="outline-secondary" onClick={handleCloseModal}>Hủy</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default StaffModal;