import { useHistory } from 'react-router-dom';
import './StaffManagement.scss';
import { TfiClose } from 'react-icons/tfi';
import { HiOutlineSearch } from 'react-icons/hi';
import { FaUserTie } from 'react-icons/fa';
import React from 'react';
import AccessManagement from '../Modal/AccessManagement/AccessManagement';
import { GET_ALL_STAFFS, GET_SEARCHED_STAFF } from '../Query/StaffQuery';
import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import { UPDATE_STAFF, DELETE_STAFF } from '../Mutation/StaffMutation';
import { useImmer } from "use-immer";
import _ from 'lodash';
import DeleteModal from '../Modal/StaffMutation/DeleteModal';
import StaffModal from '../Modal/Staff/StaffModal';

const StaffManagement = () => {

    const history = useHistory();

    const [showAccessControl, setShowAccessControl] = React.useState(false);
    const [showDeleteModal, setShowDeleteModal] = React.useState(false);
    const [showAddNewModal, setShowAddNewModal] = React.useState(false);

    const [staffList, setStaffList] = useImmer([]);
    const [editStaff, setEditStaff] = useImmer({});
    const [editAllowance, setEditAllowance] = React.useState(false);
    const [search, setSearch] = React.useState('');
    const [staffCategories, setStaffCategories] = React.useState([]);

    const { data: staffData } = useQuery(GET_ALL_STAFFS);

    const [getSearchedStaff] = useLazyQuery(GET_SEARCHED_STAFF);

    const [updateStaff, { data: updateMsg }] = useMutation(UPDATE_STAFF, {
        refetchQueries: [
            { query: GET_ALL_STAFFS }
        ],
    });

    const [deleteStaff, { data: deleteMsg }] = useMutation(DELETE_STAFF, {
        refetchQueries: [
            { query: GET_ALL_STAFFS }
        ],
    });

    const handleStaffSearch = async () => {
        setEditStaff({});

        let { data: { staff } } = await getSearchedStaff({
            variables: {
                value: search
            }
        });
        setStaffList(staff);
    }

    const handleSelectingStaff = (selected_customer) => {
        let _editStaff = _.cloneDeep(selected_customer);
        delete _editStaff.__typename;
        delete _editStaff.isSelected;

        setEditStaff(_editStaff);

        setStaffList(draft => {
            draft = draft.map(item => {
                if (item.id === selected_customer.id) {
                    item.isSelected = true;
                    return item;
                } else {
                    item.isSelected = false;
                    return item;
                }
            })
        })
    }

    const handleEditStaff = (attribute, value) => {
        if (attribute === 'staff_category') {
            let category = _.find(staffCategories, item => item.id === value);
            setEditStaff(draft => {
                draft[attribute] = category;
            });
        } else {
            setEditStaff(draft => {
                draft[attribute] = value;
            });
        }
    }

    const dataValidation = () => {
        if (editStaff.staff_category === "0") {
            return;
        }
    }

    const handleUpdateStaff = async () => {
        if (editAllowance) {
            dataValidation();
            let _editStaff = _.cloneDeep(editStaff);
            delete _editStaff.staff_account_name;

            console.log(_editStaff);

            let result = await updateStaff({
                variables: {
                    input: {
                        ..._editStaff,
                        staff_category: +_editStaff.staff_category.id
                    }
                }
            });

            setEditStaff({});
            setEditAllowance(false);
        } else {
            setEditAllowance(true);
        }
    }

    const handleDeleteStaff = async () => {
        if (!_.isEmpty(editStaff)) {
            let result = await deleteStaff({
                variables: {
                    deleteStaffId: editStaff.id
                }
            });
            setEditStaff({});
            setEditAllowance(false);
        }
    }

    React.useEffect(() => {
        setEditAllowance(false);
    }, [editStaff?.id]);

    React.useEffect(() => {
        if (staffData && staffData.staffs) {
            let _staffList = staffData.staffs.map(item => {
                return {
                    ...item, isSelected: false
                }
            });
            setStaffList(_staffList);
            setStaffCategories(staffData.staff_categories);
        }
    }, [staffData]);

    return (
        <>
            <div className='staff-management-container'>
                <div className='header py-2 ps-5 pe-3 d-flex justify-content-between align-items-center'>
                    <span className='title'>Quản Lý Nhân Viên<span className='ms-2'><FaUserTie /></span></span>
                    <span className='icon' onClick={() => history.push('/')}><TfiClose className='exit-icon' /></span>
                </div>
                <div className='main px-3 d-flex gap-3 mt-2 mb-2'>
                    <div className='left-content d-flex flex-column gap-2'>
                        <div className='top-left d-flex gap-3'>
                            <div className='left d-flex flex-column gap-2'>
                                <fieldset className='top border rounded-2 pt-2 pb-3'>
                                    <legend className='reset legend-text'>Tìm kiếm nhân viên</legend>
                                    <div className="input-group px-4">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Tên/ CMND/ SĐT"
                                            value={search}
                                            onChange={(event) => setSearch(event.target.value)}
                                        />
                                        <span className="input-group-text search-btn" title='Tìm kiếm' onClick={handleStaffSearch}><HiOutlineSearch /></span>
                                    </div>
                                </fieldset>
                                <fieldset className='bottom border rounded-2 pb-3'>
                                    <legend className='reset legend-text'>Tài khoản nhân viên</legend>
                                    <div className='form-group col-12 px-4 mt-2'>
                                        <label className='form-label'>Tên đăng nhập:</label>
                                        <input type='text' className='form-control' disabled value={editStaff?.staff_account_name ? editStaff.staff_account_name : ''} />
                                    </div>
                                    <div className='form-group col-12 px-4 mt-2'>
                                        <label className='form-label'>Loại nhân viên:</label>
                                        <select className="form-select" disabled={!editAllowance} value={editStaff?.staff_category ? editStaff.staff_category.id : ''}
                                            onChange={(event) => handleEditStaff('staff_category', event.target.value)}
                                        >
                                            <option key={`staff-type-default`} value="0">Chọn loại nhân viên...</option>
                                            {staffCategories && staffCategories.length > 0 &&
                                                staffCategories.map(item => {
                                                    return (
                                                        <option key={`staff-type-${item.id}`} value={item.id}>{item.name}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className='form-group col-12 px-4 mt-2'>
                                        <label className='form-label'>Ngày vào làm:</label>
                                        <input type='text' className='form-control' disabled={!editAllowance} value={editStaff?.working_day ? editStaff.working_day : ''}
                                            onChange={(event) => handleEditStaff('working_day', event.target.value)}
                                        />
                                    </div>
                                </fieldset>
                            </div>
                            <fieldset className='right border rounded-2 pb-3'>
                                <legend className='reset legend-text'>Thông tin nhân viên</legend>
                                <div className='form-group col-12 px-4 mt-2'>
                                    <label className='form-label'>Tên:</label>
                                    <input type='text' className='form-control' disabled={!editAllowance} value={editStaff?.name ? editStaff.name : ''}
                                        onChange={(event) => handleEditStaff('name', event.target.value)}
                                    />
                                </div>
                                <div className='form-group col-12 px-4 mt-2'>
                                    <label className='form-label'>Số CCCD/ CMND:</label>
                                    <input type='text' className='form-control' disabled={!editAllowance} value={editStaff?.citizen_id ? editStaff.citizen_id : ''}
                                        onChange={(event) => handleEditStaff('citizen_id', event.target.value)}
                                    />
                                </div>
                                <div className='form-group col-12 px-4 mt-2'>
                                    <label className='form-label'>Giới tính:</label>
                                    <select className="form-select" disabled={!editAllowance} value={editStaff?.gender ? editStaff.gender : ''}
                                        onChange={(event) => handleEditStaff('gender', event.target.value)}
                                    >
                                        <option defaultValue={'Nam'}>Nam</option>
                                        <option value="Nữ">Nữ</option>
                                        <option value="Khác">Khác</option>
                                    </select>
                                </div>
                                <div className='form-group col-12 px-4 mt-2'>
                                    <label className='form-label'>Ngày sinh:</label>
                                    <input type='text' className='form-control' disabled={!editAllowance} value={editStaff?.dob ? editStaff.dob : ''}
                                        onChange={(event) => handleEditStaff('dob', event.target.value)}
                                    />
                                </div>
                                <div className='form-group col-12 px-4 mt-2'>
                                    <label className='form-label'>Số điện thoại:</label>
                                    <input type='text' className='form-control' disabled={!editAllowance} value={editStaff?.phone ? editStaff.phone : ''}
                                        onChange={(event) => handleEditStaff('phone', event.target.value)}
                                    />
                                </div>
                                <div className='form-group col-12 px-4 mt-2'>
                                    <label className='form-label'>Địa chỉ:</label>
                                    <input type='text' className='form-control' disabled={!editAllowance} value={editStaff?.address ? editStaff.address : ''}
                                        onChange={(event) => handleEditStaff('address', event.target.value)}
                                    />
                                </div>
                            </fieldset>
                        </div>
                        <fieldset className='bottom-left border rounded-2 p-2'>
                            <legend className='reset legend-text'>Chức năng</legend>
                            <div className='row mb-3 px-4'>
                                <div className='form-group col-6'>
                                    <button className='btn btn-success col-12' onClick={() => setShowAddNewModal(true)}>Thêm nhân viên</button>
                                </div>
                                <div className='form-group col-6'>
                                    <button className='btn btn-outline-danger col-12' onClick={() => setShowDeleteModal(true)} disabled={_.isEmpty(editStaff) ? true : false}>
                                        Xóa nhân viên
                                    </button>
                                </div>
                            </div>
                            <div className='row px-4'>
                                <div className='form-group col-6'>
                                    <button className='btn btn-primary col-12' onClick={() => setShowAccessControl(true)}>Quyền truy cập</button>
                                </div>
                                <div className='form-group col-6'>
                                    <button className='btn btn-warning col-12' onClick={handleUpdateStaff} disabled={_.isEmpty(editStaff) ? true : false}>
                                        {editAllowance === false ? <span>Chỉnh sửa</span> : <span>Lưu chỉnh sửa</span>}
                                    </button>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                    <fieldset className='right-content border rounded-2 p-2' onScroll={(event) => { event.preventDefault() }}>
                        <legend className='reset legend-text'>Danh sách nhân viên</legend>
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">Tên đăng nhập</th>
                                    <th scope="col">Tên</th>
                                    <th scope="col">Loại</th>
                                    <th scope="col">CMND</th>
                                    <th scope="col">SĐT</th>
                                </tr>
                            </thead>
                            <tbody>
                                {staffList && staffList.length > 0 &&
                                    staffList.map((item, index) => {
                                        return (
                                            <tr
                                                key={`staff-${item.id}`}
                                                className={item.isSelected ? 'selected-row' : ''}
                                                onClick={() => handleSelectingStaff(item)}
                                            >
                                                <td>{item.staff_account_name}</td>
                                                <td>{item.name}</td>
                                                <td>{item?.staff_category?.name}</td>
                                                <td>{item.citizen_id}</td>
                                                <td>{item.phone}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </fieldset>
                </div>
            </div>
            <AccessManagement
                show={showAccessControl}
                setShow={setShowAccessControl}
            />
            <DeleteModal
                show={showDeleteModal}
                setShow={setShowDeleteModal}
                handleDeleteStaff={handleDeleteStaff}
            />
            <StaffModal
                show={showAddNewModal}
                setShow={setShowAddNewModal}
                staffCategories={staffCategories}
            />
        </>

    )
}

export default StaffManagement;