import React from 'react';
import Modal from 'react-bootstrap/Modal';
import './RoomCategory.scss';
import _ from 'lodash';
import { useImmer } from "use-immer";
import { CurrencyFormat } from '../../Format/FormatNumber';
import { GET_ALL_HOTEL_ROOMS_CATEOGRY } from '../../Query/HotelRoomQuery';
import { useLazyQuery } from '@apollo/client';

const RoomCategory = (props) => {

    const { show, setShow } = props;

    const [categoryList, setCategoryList] = useImmer([]);
    const [editRoomCategory, setEditRoomCategory] = useImmer({});
    const [editAllowance, setEditAllowance] = React.useState(false);
    const [newCategory, setNewCategory] = useImmer({
        name: '',
        people_maximum: 0,
        price: 0,
        description: ''
    });

    const [getRoomCateogryList, { refetch }] = useLazyQuery(GET_ALL_HOTEL_ROOMS_CATEOGRY);

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

    const handleUpdateCategory = async () => {
        if (editAllowance) {
            // dataValidation();
            // let result = await updateServiceCategory({
            //     variables: {
            //         input: editServiceCategory
            //     }
            // });

            // setCategoryList(draft => {
            //     draft = draft.map(item => {
            //         item.isSelected = false;
            //         return item;
            //     })
            // })
            setEditRoomCategory({});
            setEditAllowance(false);
            //updateServiceList();
        } else {
            setEditAllowance(true);
        }
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

    const handleAddNewRoom = async () => {
        setNewCategory({
            name: '',
            people_maximum: 0,
            price: 0,
            description: ''
        })
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
                                <button className='btn btn-outline-danger w-50' disabled={_.isEmpty(editRoomCategory) ? true : false}>Xóa loại phòng</button>
                            </div>
                        </fieldset>
                        <div className='room-category-list d-flex gap-3 flex-column'>
                            <fieldset className='room-category-table border rounded-2 p-3'>
                                <legend className='reset legend-text'>Danh sách loại phòng</legend>
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th scope="col">Tên loại phòng</th>
                                            <th scope="col">Số người tối đa</th>
                                            <th scope="col">Giá</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {categoryList && categoryList.length > 0 &&
                                            categoryList.map(item => {
                                                return (
                                                    <tr
                                                        key={`room-category-item-${item.id}`}
                                                        className={item.isSelected ? 'selected-row' : ''}
                                                        onClick={() => handleSelectingCategory(item)}
                                                    >
                                                        <td>{item.name}</td>
                                                        <td>{item.people_maximum}</td>
                                                        <td>{item.price}</td>
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
                                    <button className='btn btn-success w-50' onClick={handleAddNewRoom}>Thêm mới</button>
                                </div>
                            </fieldset>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default RoomCategory;