import React from 'react';
import Modal from 'react-bootstrap/Modal';
import './RoomCategory.scss';
import _ from 'lodash';
import { useImmer } from "use-immer";
import { CurrencyFormat } from '../../Format/FormatNumber';
import { GET_ALL_HOTEL_ROOMS_CATEOGRY } from '../../Query/HotelRoomQuery';
import { CREATE_NEW_ROOM_CATEGORY, UPDATE_ROOM_CATEGORY, DELETE_ROOM_CATEGORY } from '../../Mutation/RoomMutation';
import { useLazyQuery, useMutation } from '@apollo/client';
import DeleteModal from './DeleteCategoryModal';

const RoomCategory = (props) => {

    const { show, setShow, updateRoomList } = props;

    const [categoryList, setCategoryList] = useImmer([]);
    const [showDeleteModal, setShowDeleteModal] = React.useState(false);
    const [editRoomCategory, setEditRoomCategory] = useImmer({});
    const [editAllowance, setEditAllowance] = React.useState(false);
    const [newCategory, setNewCategory] = useImmer({
        name: '',
        people_maximum: 0,
        price: 0,
        description: ''
    });

    const [getRoomCateogryList, { refetch }] = useLazyQuery(GET_ALL_HOTEL_ROOMS_CATEOGRY);

    const [createNewRoomCategory] = useMutation(CREATE_NEW_ROOM_CATEGORY, {
        onCompleted: async () => {
            await updateListAfterMutation();
        }
    });

    const [updateRoomCategory, { data: updateMsg }] = useMutation(UPDATE_ROOM_CATEGORY, {
        onCompleted: async () => {
            await updateListAfterMutation();
        }
    });

    const [deleteRoomCategory, { data: deleteMsg }] = useMutation(DELETE_ROOM_CATEGORY, {
        onCompleted: async () => {
            await updateListAfterMutation();
        }
    });

    const updateListAfterMutation = async () => {
        let { data: category } = await refetch();

        let _categories = category?.hotel_room_categories.map(item => {
            return {
                ...item, isSelected: false
            }
        });
        setCategoryList(_categories);
    }

    const dataValidation = () => {
        if (!editRoomCategory) {
            return;
        }
    }

    const handleAddNewRoomCategory = async () => {
        if (!newCategory.name || newCategory.people_maximum === 0 || !newCategory.price === 0 || !newCategory.description) {
            return;
        } else {
            let result = await createNewRoomCategory({
                variables: {
                    input: {
                        ...newCategory,
                        price: +newCategory.price,
                        people_maximum: +newCategory.people_maximum
                    }
                }
            });
            setNewCategory({
                name: '',
                people_maximum: 0,
                price: 0,
                description: ''
            });
            updateRoomList();
        }
    }

    const handleUpdateCategory = async () => {
        if (editAllowance) {
            dataValidation();
            let result = await updateRoomCategory({
                variables: {
                    input: {
                        ...editRoomCategory,
                        price: +editRoomCategory.price,
                        people_maximum: +editRoomCategory.people_maximum
                    }
                }
            });

            setCategoryList(draft => {
                draft = draft.map(item => {
                    item.isSelected = false;
                    return item;
                })
            })
            setEditRoomCategory({});
            setEditAllowance(false);
            updateRoomList();
        } else {
            setEditAllowance(true);
        }
    }

    const handleDeleteCategory = async () => {
        if (!_.isEmpty(editRoomCategory)) {
            let result = await deleteRoomCategory({
                variables: {
                    deleteRoomCategoryId: +editRoomCategory.id
                }
            });
            setCategoryList(draft => {
                draft = draft.map(item => {
                    item.isSelected = false;
                    return item;
                })
            })
            setEditRoomCategory({});
            setEditAllowance(false);
            updateRoomList();
        }
    }

    const handleSelectingCategory = (category) => {
        let _editCategory = _.cloneDeep(category);
        delete _editCategory.__typename;
        delete _editCategory.isSelected;

        setEditRoomCategory(_editCategory);

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

    const handleEditRoom = (attribute, value) => {
        setEditRoomCategory(draft => {
            draft[attribute] = value;
        });
    }

    const handleOnChangeAddNew = (attribute, value) => {
        setNewCategory(draft => {
            draft[attribute] = value;
        });
    }

    const fetchRoomCategoryList = async () => {
        let { data: category } = await getRoomCateogryList();

        let _categories = category?.hotel_room_categories.map(item => {
            return {
                ...item, isSelected: false
            }
        });
        setCategoryList(_categories);
    }

    React.useEffect(() => {
        setEditAllowance(false);
    }, [editRoomCategory?.id]);

    React.useEffect(() => {
        fetchRoomCategoryList();
    }, []);

    return (
        <>
            <Modal
                show={show}
                size='xl'
                onHide={() => setShow(false)}
                backdrop="static"
                keyboard={false}
                className='room-category'
            >
                <Modal.Header closeButton>
                    <Modal.Title className='title'>Quản Lý Loại Phòng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='main'>
                        <fieldset className='room-category-info border rounded-2 p-3'>
                            <legend className='reset legend-text'>Thông tin loại phòng</legend>
                            <div className='form-group'>
                                <label className='form-label'>Tên loại phòng:</label>
                                <input type='text' className='form-control' disabled={!editAllowance} value={editRoomCategory?.name ? editRoomCategory.name : ''}
                                    onChange={(event) => handleEditRoom('name', event.target.value)}
                                />
                            </div>
                            <div className='form-group mt-2'>
                                <label className='form-label'>Số người tối đa:</label>
                                <input type='text' className='form-control' disabled={!editAllowance} value={editRoomCategory?.people_maximum ? editRoomCategory.people_maximum : ''}
                                    onChange={(event) => handleEditRoom('people_maximum', event.target.value)}
                                />
                            </div>
                            <div className='form-group mt-2'>
                                <label className='form-label'>Giá:</label>
                                <input type='text' className='form-control' disabled={!editAllowance} value={editRoomCategory?.price ? editRoomCategory.price : ''}
                                    onChange={(event) => handleEditRoom('price', event.target.value)}
                                />
                            </div>
                            <div className='form-group mt-2'>
                                <label className='form-label'>Mô tả:</label>
                                <textarea type='text' className='form-control' disabled={!editAllowance} value={editRoomCategory?.description ? editRoomCategory.description : ''}
                                    onChange={(event) => handleEditRoom('description', event.target.value)}
                                />
                            </div>
                            <div className='form-group mt-4 d-flex justify-content-center'>
                                <button className='btn btn-warning w-50' onClick={handleUpdateCategory} disabled={_.isEmpty(editRoomCategory) ? true : false}>
                                    {editAllowance === false ? <span>Chỉnh sửa</span> : <span>Lưu chỉnh sửa</span>}
                                </button>
                            </div>
                            <div className='form-group mt-4 d-flex justify-content-center'>
                                <button className='btn btn-outline-danger w-50' disabled={_.isEmpty(editRoomCategory) ? true : false}
                                    onClick={() => setShowDeleteModal(true)}
                                >
                                    Xóa loại phòng
                                </button>
                            </div>
                        </fieldset>
                        <div className='room-category-list d-flex gap-3 flex-column'>
                            <fieldset className='room-category-table border rounded-2 p-3'>
                                <legend className='reset legend-text'>Danh sách loại phòng</legend>
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Tên loại phòng</th>
                                            <th scope="col">Số người tối đa</th>
                                            <th scope="col">Giá</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {categoryList && categoryList.length > 0 &&
                                            categoryList.map((item, index) => {
                                                return (
                                                    <tr
                                                        key={`room-category-item-${item.id}`}
                                                        className={item.isSelected ? 'selected-row' : ''}
                                                        onClick={() => handleSelectingCategory(item)}
                                                    >
                                                        <td>{index + 1}</td>
                                                        <td>{item.name}</td>
                                                        <td>{item.people_maximum}</td>
                                                        <td>{CurrencyFormat(item.price)}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </fieldset>
                            <fieldset className='room-category-addition border rounded-2 p-3'>
                                <legend className='reset legend-text'>Thêm loại phòng mới</legend>
                                <div className='row mt-2'>
                                    <div className='form-group col-5'>
                                        <label className='form-label'>Tên loại phòng:</label>
                                        <input type='text' className='form-control' value={newCategory.name}
                                            onChange={(event) => handleOnChangeAddNew('name', event.target.value)}
                                        />
                                    </div>
                                    <div className='form-group col-3'>
                                        <label className='form-label'>Số người tối đa:</label>
                                        <input type='text' className='form-control' value={newCategory.people_maximum}
                                            onChange={(event) => handleOnChangeAddNew('people_maximum', event.target.value)}
                                        />
                                    </div>
                                    <div className='form-group col-4'>
                                        <label className='form-label'>Giá:</label>
                                        <input type='text' className='form-control' value={newCategory.price}
                                            onChange={(event) => handleOnChangeAddNew('price', event.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className='form-group mt-2'>
                                    <label className='form-label'>Mô tả:</label>
                                    <textarea type='text' className='form-control' value={newCategory.description}
                                        onChange={(event) => handleOnChangeAddNew('description', event.target.value)}
                                    />
                                </div>
                                <div className='form-group mt-4 d-flex justify-content-center'>
                                    <button className='btn btn-success w-50' onClick={handleAddNewRoomCategory}>Thêm mới</button>
                                </div>
                            </fieldset>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
            <DeleteModal
                show={showDeleteModal}
                setShow={setShowDeleteModal}
                handleDelete={handleDeleteCategory}
            />
        </>
    )
}

export default RoomCategory;