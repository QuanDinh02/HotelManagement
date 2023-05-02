import React from 'react';
import Modal from 'react-bootstrap/Modal';
import _ from 'lodash';
import { useImmer } from "use-immer";
import './ServiceCategory.scss';
import { UPDATE_SERVICE_CATEGORY, DELETE_SERVICE_CATEGORY, CREATE_NEW_SERVICE_CATEGORY } from '../../Mutation/ServiceMutation';
import { GET_ALL_HOTEL_SERVICES_CATEOGRY } from '../../Query/HotelServiceQuery';
import { useMutation } from '@apollo/client';
import { useLazyQuery } from '@apollo/client';
import DeleteCategoryModal from '../ServiceCategory/DeleteCategoryModal';

const ServiceCategory = (props) => {

    const { show, setShow, updateServiceList } = props;
    const [showDeleteModal, setShowDeleteModal] = React.useState(false);
    const [categoryList, setCategoryList] = useImmer([]);
    const [editServiceCategory, setEditServiceCategory] = useImmer({});
    const [editAllowance, setEditAllowance] = React.useState(false);
    const [newCategory, setNewCategory] = React.useState('');

    const [getServiceCateogryList, { refetch }] = useLazyQuery(GET_ALL_HOTEL_SERVICES_CATEOGRY);

    const [createNewServiceCategory] = useMutation(CREATE_NEW_SERVICE_CATEGORY, {
        onCompleted: async () => {
            await updateListAfterMutation();
        }
    });

    const [updateServiceCategory, { data: updateMsg }] = useMutation(UPDATE_SERVICE_CATEGORY, {
        onCompleted: async () => {
            await updateListAfterMutation();
        }
    });

    const [deleteServiceCategory, { data: deleteMsg }] = useMutation(DELETE_SERVICE_CATEGORY, {
        onCompleted: async () => {
            await updateListAfterMutation();
        }
    });

    const updateListAfterMutation = async () => {
        let { data: category } = await refetch();

        let _categories = category?.hotel_service_categories.map(item => {
            return {
                ...item, isSelected: false
            }
        });
        setCategoryList(_categories);
    }

    const dataValidation = () => {
        if (!editServiceCategory) {
            return;
        }
    }

    const handleEditService = (value) => {
        setEditServiceCategory(draft => {
            draft['name'] = value;
        });
    }

    const handleSelectingCategory = (category) => {
        let _editCategory = _.cloneDeep(category);
        delete _editCategory.__typename;
        delete _editCategory.isSelected;

        setEditServiceCategory(_editCategory);

        setCategoryList(draft => {
            draft = draft.map(item => {
                if (item.id === category.id) {
                    item.isSelected = true;
                    return item;
                } else {
                    item.isSelected = false;
                    return item;
                }
            })
        })
    }

    const handleAddNewServiceCategory = async () => {
        if (!newCategory) {
            return;
        } else {
            let result = await createNewServiceCategory({
                variables: {
                    name: newCategory
                }
            });
            setNewCategory('');
            updateServiceList();
        }
    }

    const handleUpdateCategory = async () => {
        if (editAllowance) {
            dataValidation();
            let result = await updateServiceCategory({
                variables: {
                    input: editServiceCategory
                }
            });

            setCategoryList(draft => {
                draft = draft.map(item => {
                    item.isSelected = false;
                    return item;
                })
            })
            setEditServiceCategory({});
            setEditAllowance(false);
            updateServiceList();
        } else {
            setEditAllowance(true);
        }
    }

    const handleDeleteCategory = async () => {
        if (!_.isEmpty(editServiceCategory)) {
            let result = await deleteServiceCategory({
                variables: {
                    deleteServiceCategoryId: editServiceCategory.id
                }
            });
            setCategoryList(draft => {
                draft = draft.map(item => {
                    item.isSelected = false;
                    return item;
                })
            })
            setEditServiceCategory({});
            setEditAllowance(false);
            updateServiceList();
        }
    }

    const fetchServiceCategoryList = async () => {
        let { data: category } = await getServiceCateogryList();

        let _categories = category?.hotel_service_categories.map(item => {
            return {
                ...item, isSelected: false
            }
        });
        setCategoryList(_categories);
    }

    React.useEffect(() => {
        setEditAllowance(false);
    }, [editServiceCategory?.id]);

    React.useEffect(() => {
        fetchServiceCategoryList();
    }, []);

    return (
        <>
            <Modal
                show={show}
                size='lg'
                onHide={() => setShow(false)}
                backdrop="static"
                keyboard={false}
                className='service-category'
            >
                <Modal.Header closeButton>
                    <Modal.Title className='title'>Quản Lý Loại Dịch Vụ</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='main'>
                        <fieldset className='service-category-info border rounded-2 p-3'>
                            <legend className='reset legend-text'>Thông tin loại dịch vụ</legend>
                            <div className='form-group'>
                                <label className='form-label'>Tên loại dịch vụ:</label>
                                <input type='text' className='form-control' disabled={!editAllowance} value={editServiceCategory?.name ? editServiceCategory.name : ''}
                                    onChange={(event) => handleEditService(event.target.value)}
                                />
                            </div>
                            <div className='form-group mt-4'>
                                <button className='btn btn-warning col-12' onClick={handleUpdateCategory} disabled={_.isEmpty(editServiceCategory) ? true : false}>
                                    {editAllowance === false ? <span>Chỉnh sửa</span> : <span>Lưu chỉnh sửa</span>}
                                </button>
                            </div>
                            <div className='form-group mt-4'>
                                <button className='btn btn-outline-danger w-100' onClick={() => setShowDeleteModal(true)} disabled={_.isEmpty(editServiceCategory) ? true : false}>
                                    Xóa loại dịch vụ
                                </button>
                            </div>
                        </fieldset>
                        <div className='service-category-list d-flex gap-3 flex-column'>
                            <fieldset className='service-category-table border rounded-2 p-3'>
                                <legend className='reset legend-text'>Danh sách loại dịch vụ hiện có</legend>
                                <table className="table table-bordered">
                                    <tbody>
                                        {categoryList && categoryList.length > 0 &&
                                            categoryList.map(item => {
                                                return (
                                                    <tr
                                                        key={`service-category-item-${item.id}`}
                                                        className={item.isSelected ? 'selected-row' : ''}
                                                        onClick={() => handleSelectingCategory(item)}
                                                    >
                                                        <td>{item.name}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </fieldset>
                            <fieldset className='service-category-addition border rounded-2 p-3'>
                                <legend className='reset legend-text'>Thêm loại dịch vụ mới</legend>
                                <div className='row mt-2'>
                                    <div className='form-group col-6'>
                                        <input type='text' className='form-control' placeholder='Tên loại dịch vụ' value={newCategory}
                                            onChange={(event) => setNewCategory(event.target.value)}
                                        />
                                    </div>
                                    <div className='form-group col-6'>
                                        <button className='btn btn-success w-100' onClick={handleAddNewServiceCategory}>Thêm mới</button>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
            <DeleteCategoryModal
                show={showDeleteModal}
                setShow={setShowDeleteModal}
                handleDelete={handleDeleteCategory}
            />
        </>
    )
}

export default ServiceCategory;