import React from 'react';
import Modal from 'react-bootstrap/Modal';
import './AccessManagement.scss';
import { useLazyQuery } from '@apollo/client';
import { GET_ALL_ACCESS_PERMISSIONS } from '../../Query/AccessPermissionQuery';
import { useImmer } from "use-immer";
import _ from 'lodash';

const AccessManagement = (props) => {

    const { show, setShow } = props;

    const [selectedStaffCategory, setSelectedStaffCategory] = React.useState({});
    const [staffCategories, setStaffCategories] = React.useState([]);
    const [accessPermissionList, setAccessPermissionList] = React.useState([]);

    const [staffAccessList, setStaffAccessList] = useImmer([]);
    const [staffNoAccessList, setStaffNoAccessList] = useImmer([]);

    const [getAccessPermissionsList] = useLazyQuery(GET_ALL_ACCESS_PERMISSIONS);

    const fetchAccessPermissionList = async () => {
        let { data: { staff_access_management } } = await getAccessPermissionsList();
        console.log(staff_access_management);

        setAccessPermissionList(staff_access_management.access_permisions_list);
        setStaffCategories(staff_access_management.staff_access_list);

    }

    const handleSelectStaffCategory = (value) => {
        if (value === "0") {
            setSelectedStaffCategory({});
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
        setShow(false);
    }

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
                                <button className='btn btn-warning col-12'>Sửa tên quyền</button>
                                <button className='btn btn-success col-12 mt-3'>Thêm quyền</button>
                                <button className='btn btn-outline-danger col-12 mt-3'>Xóa quyền</button>
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
                                                    <tr key={`access-permission-${item.id}`} className='access'>
                                                        <td>{item.name}</td>
                                                    </tr>
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
                                                    <tr key={`no-access-permission-${item.id}`}>
                                                        <td>{item.name}</td>
                                                    </tr>
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