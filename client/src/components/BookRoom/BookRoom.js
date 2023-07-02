import { useHistory } from 'react-router-dom';
import './BookRoom.scss';
import { TfiClose } from 'react-icons/tfi';
import { HiOutlineSearch } from 'react-icons/hi';
import { IoMdRefresh } from 'react-icons/io';
import { MdHotel } from 'react-icons/md';
import React from 'react';
import BookRoomDetail from '../Modal/BookRoomDetail/BookRoomDetail';
import { GET_ALL_HOTEL_ROOM_USE, GET_HOTEL_ROOM_USE_BY_CUSTOMER } from '../Query/HotelRoomUseQuery';
import { GET_CUSTOMER_INFO_BY_PHONE } from '../Query/CustomerQuery';
import { CREATE_CUSTOMER } from '../Mutation/ClientMutation';
import { BOOK_ROOM } from '../Mutation/HotelRoomMutation';
import { useLazyQuery, useMutation } from '@apollo/client';
import { useImmer } from "use-immer";
import _ from 'lodash';
import { CurrencyFormat } from '../Format/FormatNumber';
import { useSelector } from 'react-redux';

const ROOM_USE_STATUS = ['Đã nhận phòng', 'Hủy đặt phòng', 'Đã thanh toán'];

const ROOM_USE_STATUS_COLOR = {
    'Đã nhận phòng': 'already-received',
    'Hủy đặt phòng': 'room-book-cancel',
    'Đã thanh toán': 'already-payment',
    'Chờ nhận phòng': ''
}

const BookRoom = () => {

    const history = useHistory();
    const [showDetailModal, setShowDetailModal] = React.useState(false);
    const [newCustomer, setNewCustomer] = React.useState(true);

    const userAccount = useSelector(state => state.user.account);

    const [editBookRoom, setEditBookRoom] = React.useState('');

    const [bookRoomInfo, setBookRoomInfo] = useImmer({
        room_id: '',
        night_stay: '',
        receive_date: '',
        checkOut_date: '',
        status: 'Chờ nhận phòng'
    });

    const [newCustomerInfo, setNewCustomerInfo] = useImmer({
        name: '',
        dob: '',
        citizen_id: '',
        phone: '',
        address: '',
        customer_category: "0",
        gender: 'Nam',
        nationality: 'Việt Nam'
    });

    const [hotelRoomUseList, setHotelRoomUseList] = useImmer([]);
    const [hotelRoomsByCategories, setHotelRoomsByCategories] = React.useState([]);
    const [selectRoomCategory, setSelectRoomCategory] = React.useState({});
    const [customerCategories, setCustomerCategories] = React.useState([]);
    const [search, setSearch] = React.useState('');

    const [oldCustomerInfo, setOldCustomerInfo] = useImmer({
        id: '',
        name: '',
        phone: ''
    });

    const [getHotelRoomUseList] = useLazyQuery(GET_ALL_HOTEL_ROOM_USE, {
        fetchPolicy: "no-cache"
    });

    const [getCustomerInfoByPhone] = useLazyQuery(GET_CUSTOMER_INFO_BY_PHONE,{
        fetchPolicy: "no-cache"
    });
    
    const [getBookRoomSearchByCustomer] = useLazyQuery(GET_HOTEL_ROOM_USE_BY_CUSTOMER, {
        fetchPolicy: "no-cache"
    });

    const [createNewCustomer] = useMutation(CREATE_CUSTOMER);

    const [bookRoom] = useMutation(BOOK_ROOM, {
        onCompleted: async () => {
            await fetchHotelRoomUseList();
        }
    });

    const handleBookRoomSearch = async () => {
        let { data: { book_room_search_by_customer } } = await getBookRoomSearchByCustomer({
            variables: {
                value: search
            }
        });
        setHotelRoomUseList(book_room_search_by_customer);
    }

    const handleRefreshNew = () => {
        setBookRoomInfo({
            room_id: '',
            night_stay: '',
            receive_date: '',
            checkOut_date: '',
            status: 'Chờ nhận phòng'
        });

        setNewCustomerInfo({
            name: '',
            dob: '',
            citizen_id: '',
            phone: '',
            address: '',
            customer_category: "0",
            gender: 'Nam',
            nationality: 'Việt Nam'
        });

        setOldCustomerInfo({
            id: '',
            name: '',
            phone: ''
        });

        setNewCustomer(true);
        setSelectRoomCategory({});
    }

    const handleBookRoom = async (book_room_status) => {
        if (newCustomer === true) {
            let { data: { createCustomer } } = await createNewCustomer({

                variables: {
                    input: {
                        ...newCustomerInfo,
                        customer_category: +newCustomerInfo.customer_category
                    }
                }
            });

            if (createCustomer.id) {
                let { data: bookRoomReponse } = await bookRoom({

                    variables: {
                        input: {
                            ...bookRoomInfo,
                            room_id: +bookRoomInfo.room_id,
                            night_stay: +bookRoomInfo.night_stay,
                            customer_id: +createCustomer.id,
                            status: book_room_status,
                            staffId: +userAccount.id
                        }
                    }
                });
                fetchHotelRoomUseList();
                handleRefreshNew();
            }

        } else {
            if (!oldCustomerInfo.id) {
                return;
            }
            let { data: bookRoomReponse } = await bookRoom({

                variables: {
                    input: {
                        room_id: +bookRoomInfo.room_id,
                        night_stay: +bookRoomInfo.night_stay,
                        receive_date: bookRoomInfo.receive_date,
                        checkOut_date: bookRoomInfo.checkOut_date,
                        customer_id: +oldCustomerInfo.id,
                        status: book_room_status,
                        staffId: +userAccount.id
                    }
                }
            });

            fetchHotelRoomUseList();
            handleRefreshNew();
        }
    }

    const handleBookRoomInfo = (attribute, value) => {
        setBookRoomInfo(draft => {
            draft[attribute] = value
        })
    }

    const handleNewCustomerInfo = (attribute, value) => {
        setNewCustomerInfo(draft => {
            draft[attribute] = value
        })
    }

    const fetchHotelRoomUseList = async () => {
        let { data: hotel_room_use } = await getHotelRoomUseList();

        setHotelRoomUseList(hotel_room_use?.hotel_room_use_list);
        setHotelRoomsByCategories(hotel_room_use?.hotel_rooms_by_categories);
        setCustomerCategories(hotel_room_use?.customer_categories);
    }

    const handleSelectRoomCategory = (room_category_id) => {
        let result = hotelRoomsByCategories.filter(item => item.id === room_category_id)[0];
        setSelectRoomCategory(result);
    }

    const handleSelectingBookRoomHistory = (item) => {
        if (!ROOM_USE_STATUS.includes(item.status)) {
            setEditBookRoom(item.id);
            setShowDetailModal(true);
        }
    }

    const GetCustomerInfo = React.useCallback(_.debounce(async () => {
        let { data: customer_info } = await getCustomerInfoByPhone({
            variables: {
                value: oldCustomerInfo.phone
            }
        });

        setOldCustomerInfo(draft => {
            draft.id = customer_info.customer_info_by_phone ? customer_info.customer_info_by_phone?.id : ''
            draft.name = customer_info.customer_info_by_phone ? customer_info.customer_info_by_phone?.name : ''
        });
    }, 500), [oldCustomerInfo]);

    React.useEffect(() => {
        GetCustomerInfo();
    }, [oldCustomerInfo]);

    React.useEffect(() => {
        if (newCustomer) {
            setOldCustomerInfo({
                id: '',
                name: '',
                phone: ''
            });
        } else {
            setNewCustomerInfo({
                name: '',
                dob: '',
                citizen_id: '',
                phone: '',
                address: '',
                customer_category: "0",
                gender: 'Nam',
                nationality: 'Việt Nam'
            })
        }
    }, [newCustomer]);

    React.useEffect(() => {
        fetchHotelRoomUseList();
    }, []);

    return (
        <>
            <div className='book-room-container'>
                <div className='header py-2 ps-5 pe-3 d-flex justify-content-between align-items-center'>
                    <span className='title'>Đặt Phòng <span><MdHotel /></span></span>
                    <span className='icon' onClick={() => history.push('/')}><TfiClose className='exit-icon' /></span>
                </div>
                <div className='main px-3 d-flex gap-3 mt-2 mb-2'>
                    <div className='left-content d-flex flex-column gap-3'>
                        <fieldset className='first-form border rounded-2 pt-2 px-4'>
                            <legend className='reset legend-text'>Tìm kiếm khách hàng</legend>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" placeholder="Tên/ số điện thoại khách hàng" value={search}
                                    onChange={(event) => setSearch(event.target.value)}
                                />
                                <span className="input-group-text search-btn" title='Tìm kiếm' onClick={handleBookRoomSearch}><HiOutlineSearch /></span>
                            </div>
                        </fieldset>
                        <fieldset className='second-form border rounded-2 px-4'>
                            <legend className='reset legend-text'>Thông tin đặt phòng</legend>
                            <div className='row align-items-center'>
                                <div className='form-group col-6'>
                                    <label className='form-label'>Loại phòng:</label>
                                    <select className="form-select"
                                        value={selectRoomCategory?.id ? selectRoomCategory.id : ''}
                                        onChange={(event) => handleSelectRoomCategory(event.target.value)}
                                    >
                                        <option key={`room-category-type-default`} value="">Chọn loại phòng...</option>
                                        {hotelRoomsByCategories && hotelRoomsByCategories.length > 0 &&
                                            hotelRoomsByCategories.map(item => {
                                                return (
                                                    <option key={`room-category-type-${item.id}`} value={item.id}>{item.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className='form-group col-6'>
                                    <label className='form-label'>Số phòng:</label>
                                    <select className="form-select"
                                        disabled={_.isEmpty(selectRoomCategory) ? true : false}
                                        value={bookRoomInfo.room_id}
                                        onChange={(event) => handleBookRoomInfo('room_id', event.target.value)}
                                    >
                                        <option key={`room-select-default`} value="">Chọn số phòng...</option>
                                        {selectRoomCategory && selectRoomCategory?.rooms && selectRoomCategory?.rooms.length > 0 &&
                                            selectRoomCategory?.rooms.map(item => {
                                                return (
                                                    <option key={`room-select-${item.id}`} value={item.id}>{item.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className='row my-2'>
                                <div className='form-group col-6'>
                                    <label className='form-label'>Số người tối đa:</label>
                                    <input type='text' className='form-control' disabled value={selectRoomCategory?.people_maximum ? selectRoomCategory.people_maximum : 0} />
                                </div>
                                <div className='form-group col-6'>
                                    <label className='form-label'>Giá:</label>
                                    <input type='text' className='form-control' disabled value={selectRoomCategory?.price ? `${CurrencyFormat(selectRoomCategory.price)} / 1 đêm` : 0} />
                                </div>
                            </div>
                            <div className='row mb-4'>
                                <div className='form-group col-4 '>
                                    <label className='form-label'>Số đêm lưu trú:</label>
                                    <input type='text' className='form-control' placeholder='Vd: 1, 2, 3'
                                        value={bookRoomInfo.night_stay}
                                        onChange={(event) => handleBookRoomInfo('night_stay', event.target.value)}
                                    />
                                </div>
                                <div className='form-group col-4'>
                                    <label className='form-label'>Ngày nhận phòng:</label>
                                    <input type='text' className='form-control' placeholder='Vd: 12/03/2022'
                                        value={bookRoomInfo.receive_date}
                                        onChange={(event) => handleBookRoomInfo('receive_date', event.target.value)}
                                    />
                                </div>
                                <div className='form-group col-4'>
                                    <label className='form-label'>Ngày trả phòng:</label>
                                    <input type='text' className='form-control' placeholder='Vd: 12/03/2022'
                                        value={bookRoomInfo.checkOut_date}
                                        onChange={(event) => handleBookRoomInfo('checkOut_date', event.target.value)}
                                    />
                                </div>
                            </div>
                        </fieldset>
                        <fieldset className='third-form border rounded-2 py-3 px-4'>
                            <legend className='reset legend-text'>
                                {newCustomer ? <span>Thông tin khách hàng mới</span> : <span>Thông tin khách hàng cũ</span>}
                            </legend>
                            <div className='d-flex justify-content-end gap-2 mb-4'>
                                <span className='badge text-bg-success btn' onClick={() => setNewCustomer(true)}>New Customer</span>
                                <span className='badge text-bg-warning btn' onClick={() => setNewCustomer(false)}>Old Customer</span>
                            </div>
                            {
                                newCustomer ?
                                    <>
                                        <div className='row mb-2'>
                                            <div className='form-group col-6'>
                                                <label className='form-label'>Họ và Tên: <span className='required'>(*)</span></label>
                                                <input type='text' className='form-control'
                                                    value={newCustomerInfo.name}
                                                    onChange={(event) => handleNewCustomerInfo('name', event.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div className='form-group col-6'>
                                                <label className='form-label'>Ngày sinh:</label>
                                                <input type='text' className='form-control'
                                                    value={newCustomerInfo.dob}
                                                    onChange={(event) => handleNewCustomerInfo('dob', event.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className='row mb-2'>
                                            <div className='form-group col-6'>
                                                <label className='form-label'>Thẻ căn cước/ CMND:</label>
                                                <input type='text' className='form-control'
                                                    value={newCustomerInfo.citizen_id}
                                                    onChange={(event) => handleNewCustomerInfo('citizen_id', event.target.value)}
                                                />
                                            </div>
                                            <div className='form-group col-6'>
                                                <label className='form-label'>Địa chỉ:</label>
                                                <input type='text' className='form-control'
                                                    value={newCustomerInfo.address}
                                                    onChange={(event) => handleNewCustomerInfo('address', event.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className='row mb-2'>
                                            <div className='form-group col-6'>
                                                <label className='form-label'>Loại khách hàng: <span className='required'>(*)</span></label>
                                                <select className="form-select"
                                                    onChange={(event) => handleNewCustomerInfo('customer_category', event.target.value)}
                                                >
                                                    <option key={`customer-category-type-default`} value="0">Chọn loại khách hàng...</option>
                                                    {customerCategories && customerCategories.length > 0 &&
                                                        customerCategories.map(item => {
                                                            return (
                                                                <option key={`customer-category-type-${item.id}`} value={item.id}>{item.name}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>
                                            <div className='form-group col-6'>
                                                <label className='form-label'>Giới tính:</label>
                                                <select className="form-select"
                                                    value={newCustomerInfo.gender}
                                                    onChange={(event) => handleNewCustomerInfo('gender', event.target.value)}
                                                >
                                                    <option value={'Nam'}>Nam</option>
                                                    <option value="Nữ">Nữ</option>
                                                    <option value="Khác">Khác</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className='row mb-2'>
                                            <div className='form-group col-6'>
                                                <label className='form-label'>Số điện thoại: <span className='required'>(*)</span></label>
                                                <input type='text' className='form-control'
                                                    value={newCustomerInfo.phone}
                                                    onChange={(event) => handleNewCustomerInfo('phone', event.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div className='form-group col-6'>
                                                <label className='form-label'>Quốc tịch:</label>
                                                <select className="form-select"
                                                    value={newCustomerInfo.nationality}
                                                    onChange={(event) => handleNewCustomerInfo('nationality', event.target.value)}
                                                >
                                                    <option value={'Việt Nam'}>Việt Nam</option>
                                                    <option value="Khác">Khác</option>
                                                </select>
                                            </div>
                                        </div>
                                    </>

                                    :
                                    <>
                                        <div className='row mb-2'>
                                            <div className='form-group col-6'>
                                                <label className='form-label'>Họ và Tên:</label>
                                                <input type='text' className='form-control' value={oldCustomerInfo.name} disabled />
                                            </div>
                                            <div className='form-group col-6'>
                                                <label className='form-label'>Số điện thoại: <span className='required'>(*)</span></label>
                                                <input type='text' className='form-control' value={oldCustomerInfo.phone}
                                                    onChange={(event) => {
                                                        setOldCustomerInfo(draft => {
                                                            draft.phone = event.target.value
                                                        });
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </>
                            }
                        </fieldset>
                        <fieldset className='last-confirm-form border rounded-2 p-2'>
                            <legend className='reset legend-text'>Xác nhận đặt phòng</legend>
                            <div className='d-flex mt-4'>
                                <div className='ps-4 pe-3 col-6'>
                                    <button className='btn btn-primary cancel-btn' onClick={handleRefreshNew}>
                                        <span className='refresh-btn'><IoMdRefresh className='refresh-icon' /> Làm mới</span>
                                    </button>
                                </div>
                                <div className='pe-4 ps-3 col-6'>
                                    <button className='btn book-btn' onClick={() => handleBookRoom('Chờ nhận phòng')}>Đặt phòng</button>
                                </div>
                            </div>
                            <div className='mt-4 ps-4 pe-3 col-6'>
                                <button className='btn btn-outline-dark col-12' onClick={() => handleBookRoom('Đã nhận phòng')}>Đặt và nhận phòng</button>
                            </div>
                        </fieldset>
                    </div>
                    <fieldset className='right-content border rounded-2 p-2' onScroll={(event) => { event.preventDefault() }}>
                        <legend className='reset legend-text'>Lịch sử đặt phòng</legend>
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">Số phòng đặt</th>
                                    <th scope="col">Họ và Tên</th>
                                    <th scope="col">Số điện thoại</th>
                                    <th scope="col">Loại phòng</th>
                                    <th scope="col">Ngày nhận</th>
                                    <th scope="col">Ngày trả</th>
                                    <th scope="col">Trạng thái</th>
                                </tr>
                            </thead>
                            <tbody>
                                {hotelRoomUseList && hotelRoomUseList.length > 0 &&
                                    hotelRoomUseList.map((item, index) => {
                                        return (
                                            <tr
                                                key={`hotel-room-use-${item.id}`}
                                                className={ROOM_USE_STATUS_COLOR[item.status]}
                                                onClick={() => handleSelectingBookRoomHistory(item)}
                                            >
                                                <td>{item.room?.name}</td>
                                                <td>{item.customer?.name}</td>
                                                <td>{item.customer?.phone}</td>
                                                <td>{item.room?.category}</td>
                                                <td>{item.receive_date}</td>
                                                <td>{item.checkOut_date}</td>
                                                <td>{item.status}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </fieldset>
                </div>
            </div>
            <BookRoomDetail
                show={showDetailModal}
                setShow={setShowDetailModal}
                data={editBookRoom}
                hotelRoomsByCategories={hotelRoomsByCategories}
                fetchRoomUseList={fetchHotelRoomUseList}
            />
        </>

    )
}

export default BookRoom;