import React from 'react';
import { useHistory } from 'react-router-dom';
import './CustomerManagement.scss';
import { TfiClose } from 'react-icons/tfi';
import { HiOutlineSearch } from 'react-icons/hi';
import CustomerHistory from '../Modal/CustomerHistory/CustomerHistory';
import { GET_ALL_CUSTOMERS, GET_CUSTOMER_BY_NAME_PHONE } from '../Query/CustomerQuery';
import { FETCH_ACCOUNT } from '../Query/Login';
import { UPDATE_CUSTOMER, DELETE_CUSTOMER } from '../Mutation/ClientMutation';
import { useLazyQuery, useMutation } from '@apollo/client';
import { useImmer } from "use-immer";
import _ from 'lodash';
import DeleteModal from '../Modal/CustomerMutation/DeleteModal';

const CustomerManagement = () => {

    const history = useHistory();

    const [showCustomerHistory, setShowCustomerHistory] = React.useState(false);
    const [managerPermission, setManagerPermission] = React.useState(false);

    const [customerList, setCustomerList] = useImmer([]);
    const [editCustomer, setEditCustomer] = useImmer({});
    const [editAllowance, setEditAllowance] = React.useState(false);
    const [customerCategories, setCustomerCategories] = React.useState([]);
    const [search, setSearch] = React.useState('');
    const [showDeleteModal, setShowDeleteModal] = React.useState(false);

    const [getCustomerList] = useLazyQuery(GET_ALL_CUSTOMERS, {
        fetchPolicy: "no-cache"
    });

    const [getCustomerByValue] = useLazyQuery(GET_CUSTOMER_BY_NAME_PHONE,{
        fetchPolicy: "no-cache"
    });

    const [updateCustomer] = useMutation(UPDATE_CUSTOMER, {
        onCompleted: async () => {
            await fetchCustomerList();
        }
    });

    const [deleteCustomer] = useMutation(DELETE_CUSTOMER, {
        onCompleted: async () => {
            await fetchCustomerList();
        }
    });

    const [fetch_account] = useLazyQuery(FETCH_ACCOUNT, {
        fetchPolicy: "no-cache"
    });

    const fetchManagerPermission = async () => {
        let { data: { fetchAccountInfo } } = await fetch_account();
        if (fetchAccountInfo && fetchAccountInfo.data) {
            if (fetchAccountInfo.data.group === 'ADMIN') {
                setManagerPermission(true);
            }
        }
    }

    const handleSelectingCustomer = (selected_customer) => {
        let _editCustomer = _.cloneDeep(selected_customer);
        delete _editCustomer.__typename;
        delete _editCustomer.isSelected;

        setEditCustomer(_editCustomer);

        setCustomerList(draft => {
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

    const handleCustomerSearch = async () => {
        setEditCustomer({});

        let { data: { customer } } = await getCustomerByValue({
            variables: {
                value: search
            }
        });
        setCustomerList(customer);
    }

    const handleEditCustomer = (attribute, value) => {
        if (attribute === 'customer_category') {
            let category = _.find(customerCategories, item => item.id === value);
            setEditCustomer(draft => {
                draft[attribute] = category;
            });
        } else {
            setEditCustomer(draft => {
                draft[attribute] = value;
            });
        }
    }

    const dataValidation = () => {
        if (editCustomer.customer_category === "0") {
            return;
        }
    }

    const handleUpdateCustomer = async () => {
        if (editAllowance) {
            dataValidation();
            let result = await updateCustomer({
                variables: {
                    input: {
                        ...editCustomer,
                        customer_category: +editCustomer.customer_category.id
                    }
                }
            });
            setEditCustomer({});
            setEditAllowance(false);
        } else {
            setEditAllowance(true);
        }
    }

    const handleDeleteCustomer = async () => {
        if (!_.isEmpty(editCustomer)) {
            let result = await deleteCustomer({
                variables: {
                    deleteCustomerId: editCustomer.id
                }
            });
            setEditCustomer({});
            setEditAllowance(false);
        }
    }

    React.useEffect(() => {
        fetchManagerPermission();
    }, []);

    React.useEffect(() => {
        setEditAllowance(false);
    }, [editCustomer?.id]);

    const fetchCustomerList = async () => {
        let { data: customersData } = await getCustomerList();
        if (customersData && customersData.customers) {
            let _customerList = customersData.customers.map(item => {
                return {
                    ...item, isSelected: false
                }
            });
            setCustomerList(_customerList);
            setCustomerCategories(customersData.customer_categories);
        }
    }

    React.useState(() => {
        fetchCustomerList();
    }, []);

    return (
        <>
            <div className='customer-management-container'>
                <div className='header py-2 ps-5 pe-3 d-flex justify-content-between align-items-center'>
                    <span className='title'>Quản Lý Khách Hàng</span>
                    <span className='icon' onClick={() => history.push('/')}><TfiClose className='exit-icon' /></span>
                </div>
                <div className='main px-3 d-flex gap-3 mt-2 mb-2'>
                    <div className='left-content d-flex flex-column gap-3'>
                        <fieldset className='top border rounded-2 pt-2 pb-3'>
                            <legend className='reset legend-text'>Tìm kiếm khách hàng</legend>
                            <div className="input-group px-4">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Tên/ số điện thoại của khách hàng"
                                    value={search}
                                    onChange={(event) => setSearch(event.target.value)}
                                />
                                <span className="input-group-text search-btn" title='Tìm kiếm' onClick={handleCustomerSearch}><HiOutlineSearch /></span>
                            </div>
                        </fieldset>
                        <fieldset className='middle border rounded-2 pb-3'>
                            <legend className='reset legend-text'>Thông tin khách hàng</legend>
                            <div className='row align-items-center px-4'>
                                <div className='form-group col-6'>
                                    <label className='form-label'>Họ và Tên:</label>
                                    <input type='text' className='form-control' disabled={!editAllowance} value={editCustomer?.name ? editCustomer.name : ''}
                                        onChange={(event) => handleEditCustomer('name', event.target.value)}
                                    />
                                </div>
                                <div className='form-group col-6'>
                                    <label className='form-label'>Ngày sinh:</label>
                                    <input type='text' className='form-control' disabled={!editAllowance} value={editCustomer?.dob ? editCustomer.dob : ''}
                                        onChange={(event) => handleEditCustomer('dob', event.target.value)}
                                    />
                                </div>
                            </div>
                            <div className='row mt-1 px-4'>
                                <div className='form-group col-6'>
                                    <label className='form-label'>Thẻ căn cước/ CMND:</label>
                                    <input type='text' className='form-control' disabled={!editAllowance} value={editCustomer?.citizen_id ? editCustomer.citizen_id : ''}
                                        onChange={(event) => handleEditCustomer('citizen_id', event.target.value)}
                                    />
                                </div>
                                <div className='form-group col-6'>
                                    <label className='form-label'>Số điện thoại:</label>
                                    <input type='text' className='form-control' disabled={!editAllowance} value={editCustomer?.phone ? editCustomer.phone : ''}
                                        onChange={(event) => handleEditCustomer('phone', event.target.value)}
                                    />
                                </div>
                            </div>
                            <div className='row mt-1 px-4'>
                                <div className='form-group col-6'>
                                    <label className='form-label'>Loại khách hàng:</label>
                                    <select className="form-select" disabled={!editAllowance} value={editCustomer?.customer_category ? editCustomer.customer_category.id : '0'}
                                        onChange={(event) => handleEditCustomer('customer_category', event.target.value)}
                                    >
                                        <option key={`customer-type-default`} value="0">Select customer type...</option>
                                        {customerCategories && customerCategories.length > 0 &&
                                            customerCategories.map(item => {
                                                return (
                                                    <option key={`customer-type-${item.id}`} value={item.id}>{item.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className='form-group col-6'>
                                    <label className='form-label'>Địa chỉ:</label>
                                    <input type='text' className='form-control' disabled={!editAllowance} value={editCustomer?.address ? editCustomer.address : ''}
                                        onChange={(event) => handleEditCustomer('address', event.target.value)}
                                    />
                                </div>
                            </div>
                            <div className='row mt-1 px-4'>
                                <div className='form-group col-6'>
                                    <label className='form-label'>Giới tính:</label>
                                    <select className="form-select" disabled={!editAllowance} value={editCustomer?.gender ? editCustomer.gender : ''}
                                        onChange={(event) => handleEditCustomer('gender', event.target.value)}
                                    >
                                        <option defaultValue={'Nam'}>Nam</option>
                                        <option value="Nữ">Nữ</option>
                                        <option value="Khác">Khác</option>
                                    </select>
                                </div>
                                <div className='form-group col-6'>
                                    <label className='form-label'>Quốc tịch:</label>
                                    <input type='text' className='form-control' disabled={!editAllowance} value={editCustomer?.nationality ? editCustomer.nationality : ''}
                                        onChange={(event) => handleEditCustomer('nationality', event.target.value)}
                                    />
                                </div>
                            </div>
                        </fieldset>
                        <fieldset className='border rounded-2 p-2'>
                            <legend className='reset legend-text'>Chức năng</legend>
                            <div className='row mb-3 px-4'>
                                {managerPermission &&
                                    <div className='form-group col-6'>
                                        <button className='btn btn-outline-danger col-12' onClick={() => setShowDeleteModal(true)} disabled={_.isEmpty(editCustomer) ? true : false}>
                                            Xóa khách hàng
                                        </button>
                                    </div>
                                }
                                <div className='form-group col-6'>
                                    <button className='btn btn-warning col-12' onClick={handleUpdateCustomer} disabled={_.isEmpty(editCustomer) ? true : false}>
                                        {editAllowance === false ? <span>Chỉnh sửa</span> : <span>Lưu chỉnh sửa</span>}
                                    </button>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                    <fieldset className='right-content border rounded-2 p-2' onScroll={(event) => { event.preventDefault() }}>
                        <legend className='reset legend-text'>Danh sách Khách hàng</legend>
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">STT</th>
                                    <th scope="col">Họ và Tên</th>
                                    <th scope="col">CCCD/ CMND</th>
                                    <th scope="col">Loại</th>
                                    <th scope="col">Số điện thoại</th>
                                    <th scope="col">Địa chỉ</th>
                                    <th scope="col">Quốc tịch</th>
                                </tr>
                            </thead>
                            <tbody>
                                {customerList && customerList.length > 0 &&
                                    customerList.map((item, index) => {
                                        return (
                                            <tr
                                                key={`customer-${item.id}`}
                                                className={item.isSelected ? 'selected-row' : ''}
                                                onClick={() => handleSelectingCustomer(item)}
                                            >
                                                <td>{index + 1}</td>
                                                <td>{item.name}</td>
                                                <td>{item.citizen_id}</td>
                                                <td>{item?.customer_category?.name}</td>
                                                <td>{item.phone}</td>
                                                <td>{item.address}</td>
                                                <td>{item.nationality}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </fieldset>
                </div>
            </div>
            <CustomerHistory
                show={showCustomerHistory}
                setShow={setShowCustomerHistory}
            />
            <DeleteModal
                show={showDeleteModal}
                setShow={setShowDeleteModal}
                handleDeleteCustomer={handleDeleteCustomer}
            />
        </>

    )
}

export default CustomerManagement;