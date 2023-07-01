import { useHistory } from 'react-router-dom';
import './RegulationManagement.scss';
import { TfiClose } from 'react-icons/tfi';
import { HiOutlineSearch } from 'react-icons/hi';
import React from 'react';
import { CurrencyFormat } from '../Format/FormatNumber';
import { GET_ALL_SURCHARGES } from '../Query/ServicePaymentQuery';
import { GET_SEARCHED_REGULATION } from '../Query/RegulationQuery';
import { useLazyQuery, useMutation } from '@apollo/client';
import { useImmer } from "use-immer";
import { UPDATE_REGULATION, DELETE_REGULATION } from '../Mutation/RegulationMutation';
import { FETCH_ACCOUNT } from '../Query/Login';
import DeleteModal from '../Modal/RegulationManagment/DeleteModal';
import _ from 'lodash';
import RegulationAddNew from '../Modal/RegulationManagment/RegulationAddNew';

const RegulationManagement = () => {

    const history = useHistory();

    const [showAddNewModal, setShowAddNewModal] = React.useState(false);
    const [showDeleteModal, setShowDeleteModal] = React.useState(false);

    const [regulationList, setRegulationList] = useImmer([]);
    const [managerPermission, setManagerPermission] = React.useState(false);

    const [editRegulation, setEditRegulation] = useImmer({});
    const [editAllowance, setEditAllowance] = React.useState(false);

    const [search, setSearch] = React.useState('');

    const [getRegulationList] = useLazyQuery(GET_ALL_SURCHARGES, {
        fetchPolicy: "no-cache"
    });

    const [getSearchRegulation] = useLazyQuery(GET_SEARCHED_REGULATION, {
        fetchPolicy: "no-cache"
    });

    const [updateRegulation] = useMutation(UPDATE_REGULATION, {
        onCompleted: async () => {
            await fetchRegulationList();
        }
    });

    const [deleteRegulation] = useMutation(DELETE_REGULATION, {
        onCompleted: async () => {
            await fetchRegulationList();
        }
    });

    const [fetch_account] = useLazyQuery(FETCH_ACCOUNT, {
        fetchPolicy: "no-cache"
    });

    const handleSearchRegulation = async () => {
        setEditRegulation({});
        let { data: { searched_regulation } } = await getSearchRegulation({
            variables: {
                value: search
            }
        });
        setRegulationList(searched_regulation);
    }

    const handleEditRegulation = (attribute, value) => {
        setEditRegulation(draft => {
            draft[attribute] = value;
        });
    }

    const handleSelectingRegulation = (selected_service) => {
        let _editService = _.cloneDeep(selected_service);
        delete _editService.__typename;
        delete _editService.isSelected;

        setEditRegulation(_editService);

        setRegulationList(draft => {
            draft = draft.map(item => {
                if (item.id === selected_service.id) {
                    item.isSelected = true;
                    return item;
                } else {
                    item.isSelected = false;
                    return item;
                }
            })
        })
    }

    const dataValidation = () => {
        if (!editRegulation?.name || !editRegulation?.id) {
            return;
        }
    }

    const handleUpdateRegulation = async () => {
        if (editAllowance) {
            dataValidation();
            let result = await updateRegulation({
                variables: {
                    input: {
                        ...editRegulation,
                        price: +editRegulation.price
                    }
                }
            });

            setEditRegulation({});
            setEditAllowance(false);
        } else {
            setEditAllowance(true);
        }
    }

    const handleDeleteRegulation = async () => {
        if (!_.isEmpty(editRegulation)) {
            let result = await deleteRegulation({
                variables: {
                    regulationId: editRegulation.id
                }
            });
            setEditRegulation({});
            setEditAllowance(false);
        }
    }

    const fetchRegulationList = async () => {
        let { data: { surcharge_list } } = await getRegulationList();
        setRegulationList(surcharge_list);
    }

    const fetchManagerPermission = async () => {
        let { data: { fetchAccountInfo } } = await fetch_account();
        if (fetchAccountInfo && fetchAccountInfo.data) {
            if (fetchAccountInfo.data.group === 'ADMIN') {
                setManagerPermission(true);
            }
        }
    }

    React.useEffect(() => {
        fetchManagerPermission();
    }, []);

    React.useEffect(() => {
        setEditAllowance(false);
    }, [editRegulation?.id]);

    React.useEffect(() => {
        fetchRegulationList();
    }, []);

    return (
        <>
            <div className='regulation-management-container'>
                <div className='header py-2 ps-5 pe-3 d-flex justify-content-between align-items-center'>
                    <span className='title'>Quản Lý Quy Định</span>
                    <span className='icon' onClick={() => history.push('/')}><TfiClose className='exit-icon' /></span>
                </div>
                <div className='main px-3 d-flex gap-3 mt-2 mb-2'>
                    <div className='left-content d-flex flex-column gap-3'>
                        <fieldset className='top border rounded-2 pt-2 pb-3'>
                            <legend className='reset legend-text'>Tìm kiếm</legend>
                            <div className='d-flex gap-3 px-4'>
                                <div className="input-group">
                                    <input type="text" className="form-control" placeholder="Tên/ Mô tả quy định" value={search}
                                        onChange={(event) => setSearch(event.target.value)}
                                    />
                                    <span className="input-group-text search-btn" title='Tìm kiếm' onClick={handleSearchRegulation}><HiOutlineSearch /></span>
                                </div>
                            </div>

                        </fieldset>
                        <fieldset className='middle border rounded-2 pb-3'>
                            <legend className='reset legend-text'>Thông tin quy định</legend>
                            <div className='row align-items-center px-4'>
                                <div className='form-group col-6'>
                                    <label className='form-label'>Tên quy định:</label>
                                    <input type='text' className='form-control' disabled={!editAllowance} value={editRegulation?.name ? editRegulation.name : ''}
                                        onChange={(event) => handleEditRegulation('name', event.target.value)}
                                    />
                                </div>
                                <div className='form-group col-6'>
                                    <label className='form-label'>Giá:</label>
                                    <input type='text' className='form-control' disabled={!editAllowance} value={editRegulation?.price ? editRegulation.price : ''}
                                        onChange={(event) => handleEditRegulation('price', event.target.value)}
                                    />
                                </div>
                            </div>
                            <div className='description form-group col-12 mt-2 px-4'>
                                <label className='form-label'>Mô tả:</label>
                                <textarea type='text' className='form-control' disabled={!editAllowance} value={editRegulation?.description ? editRegulation.description : ''}
                                    onChange={(event) => handleEditRegulation('description', event.target.value)}
                                />
                            </div>
                        </fieldset>
                        {managerPermission &&
                            <fieldset className='border rounded-2 p-2'>
                                <legend className='reset legend-text'>Chức năng</legend>
                                <div className='row mb-3 px-4'>
                                    <div className='form-group col-6'>
                                        <button className='btn btn-warning col-12' disabled={_.isEmpty(editRegulation) ? true : false}
                                            onClick={handleUpdateRegulation}
                                        >
                                            {editAllowance === false ? <span>Chỉnh sửa</span> : <span>Lưu chỉnh sửa</span>}
                                        </button>
                                    </div>

                                    <div className='form-group col-6'>
                                        <button className='btn btn-outline-danger col-12' disabled={_.isEmpty(editRegulation) ? true : false} onClick={() => setShowDeleteModal(true)}>Xóa quy định</button>
                                    </div>
                                </div>
                                <div className='row mb-3 px-4'>
                                    <div className='form-group col-6'>
                                        <button className='btn btn-success col-12' onClick={() => setShowAddNewModal(true)}>Thêm mới quy định</button>
                                    </div>
                                </div>
                            </fieldset>
                        }
                    </div>
                    <fieldset className='right-content border rounded-2 p-2' onScroll={(event) => { event.preventDefault() }}>
                        <legend className='reset legend-text'>Danh sách các quy định</legend>
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">Tên</th>
                                    <th scope="col">Giá</th>
                                    <th scope="col">Mô tả</th>
                                </tr>
                            </thead>
                            <tbody>
                                {regulationList && regulationList.length > 0 &&
                                    regulationList.map((item, index) => {
                                        return (
                                            <tr
                                                key={`hotel-services-${item.id}`}
                                                className={item.isSelected ? 'selected-row' : ''}
                                                onClick={() => handleSelectingRegulation(item)}
                                            >
                                                <td>{item.name}</td>
                                                <td>{CurrencyFormat(item.price)}</td>
                                                <td>{item.description}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </fieldset>
                </div>
            </div>
            <RegulationAddNew
                show={showAddNewModal}
                setShow={setShowAddNewModal}
                updateRegulationList={fetchRegulationList}
            />
            <DeleteModal
                show={showDeleteModal}
                setShow={setShowDeleteModal}
                handleDelete={handleDeleteRegulation}
                updateRegulationList={fetchRegulationList}
            />
        </>

    )
}

export default RegulationManagement;