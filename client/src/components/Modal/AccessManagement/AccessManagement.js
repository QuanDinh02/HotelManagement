import React from 'react';
import Modal from 'react-bootstrap/Modal';
import './AccessManagement.scss';
import { useLazyQuery, useMutation } from '@apollo/client';
import { GET_ALL_ACCESS_PERMISSIONS } from '../../Query/AccessPermissionQuery';
import { ADD_ACCESS_PERMISSIONS } from '../../Mutation/StaffMutation';
import { useImmer } from "use-immer";
import _ from 'lodash';

const AccessManagement = (props) => {

    const { show, setShow } = props;

    const [selectedStaffCategory, setSelectedStaffCategory] = React.useState({});
    const [staffCategories, setStaffCategories] = React.useState([]);
    const [accessPermissionList, setAccessPermissionList] = React.useState([]);

    const [staffAccessList, setStaffAccessList] = useImmer([]);
    const [staffNoAccessList, setStaffNoAccessList] = useImmer([]);

    const [addAccess, setAddAccess] = React.useState(false);
    const [editAccess, setEditAccess] = React.useState(false);

    const [getAccessPermissionsList, { refetch }] = useLazyQuery(GET_ALL_ACCESS_PERMISSIONS);

    const [addAccessPermissions] = useMutation(ADD_ACCESS_PERMISSIONS, {
        onCompleted: async () => {
            await updateAfterAddMutation();
        }
    });

    const updateAfterAddMutation = async () => {
        let { data: { staff_access_management } } = await refetch();
        setAccessPermissionList(staff_access_management.access_permisions_list);
        setStaffCategories(staff_access_management.staff_access_list);

        let staff_category = _.find(staff_access_management.staff_access_list, item => item.staff_category_info.id === selectedStaffCategory.staff_category_info.id);
        setSelectedStaffCategory({
            staff_category_info: staff_category.staff_category_info,
            access_permisions: staff_category.access_permisions
        });
    }

    const handleAddAccessPermissions = async () => {
        let new_access_permisions = staffNoAccessList.filter(item => item.isSelected === true);
        let _new_acc_per = new_access_permisions.map(item => item.id);

        await addAccessPermissions({
            variables: {
                input: {
                    id: selectedStaffCategory.staff_category_info.id,
                    access_permissions: _new_acc_per
                }
            }
        });

        setAddAccess(false);
        setEditAccess(false);
    }

    const checkSelectAccess = (type) => {
        if (type === 'ACCESS') {
            return staffAccessList.some(item => item.isSelected === true);
        }

        if (type === 'NO_ACCESS') {
            return staffNoAccessList.some(item => item.isSelected === true);
        }
    }

    const handleCancelSelections = () => {
        if (editAccess) {
            setStaffAccessList(draft => {
                draft = draft.map(item => {
                    item.isSelected = false;
                    return item;
                })
            })
        }

        if (addAccess) {
            setStaffNoAccessList(draft => {
                draft = draft.map(item => {
                    item.isSelected = false;
                    return item;
                })
            })
        }
    }

    const handleSelectingAccess = (type, selected_access) => {
        if (type === 'ACCESS') {
            setStaffAccessList(draft => {
                draft = draft.map(item => {
                    if (item.id === selected_access.id) {
                        item.isSelected = !item.isSelected;
                        return item;
                    }
                })
            })
        }

        if (type === 'NO_ACCESS') {
            setStaffNoAccessList(draft => {
                draft = draft.map(item => {
                    if (item.id === selected_access.id) {
                        item.isSelected = !item.isSelected;
                        return item;
                    }
                })
            })
        }
    }

    const fetchAccessPermissionList = async () => {
        let { data: { staff_access_management } } = await getAccessPermissionsList();

        setAccessPermissionList(staff_access_management.access_permisions_list);
        setStaffCategories(staff_access_management.staff_access_list);

    }

    const handleSelectStaffCategory = (value) => {
        if (value === "0") {
            setSelectedStaffCategory({});
            setStaffAccessList([]);
            setStaffNoAccessList([]);
            setAddAccess(false);
            setEditAccess(false);
        } else {
            let staff_category = _.find(staffCategories, item => item.staff_category_info.id === value);
            setSelectedStaffCategory({
                staff_category_info: staff_category.staff_category_info,
                access_permisions: staff_category.access_permisions
            });
        }
    }

    const handleCloseModal = () => {
        setSelectedStaffCategory({});
        setStaffAccessList([]);
        setStaffNoAccessList([]);
        setAddAccess(false);
        setEditAccess(false);
        setShow(false);
    }

    React.useEffect(() => {
        if (staffAccessList && staffAccessList.length > 0) {
            if (checkSelectAccess('ACCESS')) {
                setEditAccess(true);
                setAddAccess(false);
            } else {
                setEditAccess(false);
            }
        }
    }, [staffAccessList]);

    React.useEffect(() => {
        if (staffNoAccessList && staffNoAccessList.length > 0) {
            if (checkSelectAccess('NO_ACCESS')) {
                setAddAccess(true);
                setEditAccess(false);
            } else {
                setAddAccess(false);
            }
        }
    }, [staffNoAccessList]);

    React.useEffect(() => {
        if (!_.isEmpty(selectedStaffCategory)) {
            let _accessList = accessPermissionList.filter(item => selectedStaffCategory?.access_permisions?.includes(item.id));
            setStaffAccessList(_accessList);

            let _notAccessList = accessPermissionList.filter(item => !selectedStaffCategory?.access_permisions?.includes(item.id));
            setStaffNoAccessList(_notAccessList);
        }

    }, [selectedStaffCategory]);

    React.useEffect(() => {
        if (show) {
            fetchAccessPermissionList();
        }
    }, [show]);

    React.useEffect(() => {
        if (staffAccessList && staffAccessList.length > 0) {
            let _staffAccessList = staffAccessList.map(item => {
                return {
                    ...item, isSelected: false
                }
            });
            setStaffAccessList(_staffAccessList);
        }

        if (staffNoAccessList && staffNoAccessList.length > 0) {
            let _staffNoAccessList = staffNoAccessList.map(item => {
                return {
                    ...item, isSelected: false
                }
            });
            setStaffNoAccessList(_staffNoAccessList);
        }
    }, [selectedStaffCategory?.id]);

    return (
        <>
            <Modal
                show={show}
                size='xl'
                onHide={handleCloseModal}
                backdrop="static"
                keyboard={false}
                className='access-management'
            >
                <Modal.Header closeButton>
                    <Modal.Title className='title'>Quyền Truy Cập</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='main'>
                        <fieldset className='staff-category border rounded-2 p-3'>
                            <legend className='reset legend-text'>Loại nhân viên</legend>
                            <div className='form-group'>
                                <label className='form-label'>Tên loại nhân viên:</label>
                                <select className="form-select" value={selectedStaffCategory?.staff_category_info ? selectedStaffCategory.staff_category_info.id : ''}
                                    onChange={(event) => handleSelectStaffCategory(event.target.value)}
                                >
                                    <option key={`staff-access-type-default`} value="0">Chọn loại nhân viên...</option>
                                    {staffCategories && staffCategories?.length > 0 &&
                                        staffCategories.map(item => {
                                            return (
                                                <option key={`staff-access-type-${item.staff_category_info.id}`} value={item.staff_category_info.id}>
                                                    {item.staff_category_info.name}
                                                </option>
                                            )
                                        })
                                    }
                                </select>

                            </div>
                            <div className='mt-4 d-flex flex-column col-12'>
                                {(addAccess || editAccess) &&
                                    <button className='btn btn-dark col-12 mt-3' onClick={handleCancelSelections}>Hủy chọn</button>
                                }
                                {(addAccess && !editAccess) &&
                                    <button className='btn btn-success col-12 mt-3' onClick={handleAddAccessPermissions}>Thêm quyền</button>
                                }
                                {(editAccess && !addAccess) &&
                                    <>
                                        <button className='btn btn-warning col-12 mt-3'>Sửa tên quyền</button>
                                        <button className='btn btn-outline-danger col-12 mt-3'>Xóa quyền</button>
                                    </>
                                }
                            </div>
                        </fieldset>
                        <div className='access-list d-flex gap-3'>
                            <fieldset className='access-table border rounded-2 p-3'>
                                <legend className='reset legend-text'>Quyền được cấp hiện tại</legend>
                                <table className="table table-bordered">
                                    <tbody>
                                        {staffAccessList && staffAccessList.length > 0 &&
                                            staffAccessList.map(item => {
                                                return (
                                                    <>
                                                        {!addAccess ?
                                                            <tr key={`access-permission-${item.id}`} onClick={() => handleSelectingAccess('ACCESS', item)}
                                                                className={item.isSelected ? 'selected-row table-row-hover' : 'table-row-hover'}
                                                            >
                                                                <td>{item.name}</td>
                                                            </tr>
                                                            :
                                                            <tr key={`access-permission-${item.id}`} className='disabled-access'>
                                                                <td>{item.name}</td>
                                                            </tr>
                                                        }
                                                    </>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </fieldset>
                            <fieldset className='not-access-table border rounded-2 p-3'>
                                <legend className='reset legend-text'>Quyền chưa được cấp</legend>
                                <table className="table table-bordered">
                                    <tbody>
                                        {staffNoAccessList && staffNoAccessList.length > 0 &&
                                            staffNoAccessList.map(item => {
                                                return (
                                                    <>
                                                        {!editAccess ?
                                                            <tr key={`no-access-permission-${item.id}`} onClick={() => handleSelectingAccess('NO_ACCESS', item)}
                                                                className={item.isSelected ? 'selected-row table-row-hover' : 'table-row-hover'}
                                                            >
                                                                <td>{item.name}</td>
                                                            </tr>
                                                            :
                                                            <tr key={`no-access-permission-${item.id}`} className='disabled-access'>
                                                                <td>{item.name}</td>
                                                            </tr>
                                                        }
                                                    </>

                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </fieldset>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default AccessManagement;