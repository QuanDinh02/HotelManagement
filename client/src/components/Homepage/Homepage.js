import './Homepage.scss';
import { FaUserAlt } from 'react-icons/fa';
import { RxExit } from 'react-icons/rx';
import Calendar from '../../assets/images/calender_image.png';
import Key from '../../assets/images/key.png';
import Dish from '../../assets/images/dish.png';
import Revenue from '../../assets/images/revenue.png';
import Room from '../../assets/images/room.png';
import Staff from '../../assets/images/staff.png';
import Payment from '../../assets/images/service_payment.png';
import Policy from '../../assets/images/policy.png';
import Customer from '../../assets/images/customer.png';
import React from 'react';
import { LOGOUT } from '../Query/Login';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useLazyQuery } from '@apollo/client';
import { UserLogout } from '../../redux/action/actions';
import { successToast } from '../Toast/Toast';

const Homepage = () => {

    const item_class_name = 'item d-flex align-items-center gap-3 mt-3';
    const history = useHistory();
    const dispatch = useDispatch();
    const [logOut, setLogOut] = React.useState(false);
    const userAccount = useSelector(state => state.user.account);

    const [logout] = useLazyQuery(LOGOUT, {
        fetchPolicy: "no-cache"
    });

    const handleLogout = async () => {
        let { data: { userLogout } } = await logout();
        if (userLogout && userLogout?.errorCode === 0) {
            setLogOut(true);
            successToast(userLogout.message);
            dispatch(UserLogout());
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }
    }

    return (
        <div className='homepage-container'>
            <div className='sidebar d-flex justify-content-between flex-column'>
                <div className="account_name d-flex align-items-center gap-3">
                    {!logOut &&
                        <>
                            <FaUserAlt />
                            <div>
                                <span>{userAccount ? (String(userAccount?.username)).toUpperCase() : ''}</span>
                                <br />
                                <span className='text'>{userAccount ? userAccount?.group : ''}</span>
                            </div>
                        </>
                    }
                </div>
                <div className={item_class_name} onClick={handleLogout}><RxExit className='icon' /> <span>Đăng xuất</span></div>
            </div>
            <div className='content'>
                <div className='title'>
                    <span>Quản Lý Khách Sạn</span>
                </div>
                <hr className='mb-4 w-100' />
                <div className='main'>
                    <div className='item' onClick={() => history.push('/book-room')}> 
                        <div>
                            <div className='img-box'>
                                <img src={Calendar} alt='' />
                            </div>
                        </div>
                        <span className='text-title'>Đặt Phòng</span>
                    </div>
                    <div className='item' onClick={() => history.push('/receive-room')}>
                        <div>
                            <div className='img-box'>
                                <img src={Key} alt='' />
                            </div>
                        </div>
                        <span className='text-title'>Nhận Phòng</span>
                    </div>
                    <div className='item' onClick={() => history.push('/service-using-payment')}>
                        <div>
                            <div className='img-box'>
                                <img src={Payment} alt='' />
                            </div>
                        </div>
                        <span className='text-title'>Sử Dụng Dịch Vụ và Thanh Toán</span>
                    </div>
                    <div className='item' onClick={() => history.push('/revenue-report')}>
                        <div>
                            <div className='img-box'>
                                <img src={Revenue} alt='' />
                            </div>
                        </div>
                        <span className='text-title'>Thống kê doanh thu</span>
                    </div>
                    <div className='item' onClick={() => history.push('/room-management')}>
                        <div>
                            <div className='img-box'>
                                <img src={Room} alt='' />
                            </div>
                        </div>
                        <span className='text-title'>Quản Lý Phòng</span>
                    </div>
                    <div className='item' onClick={() => history.push('/staff-management')}>
                        <div>
                            <div className='img-box'> 
                                <img src={Staff} alt='' />
                            </div>
                        </div>
                        <span className='text-title'>Quản Lý Nhân Viên</span>
                    </div>
                    <div className='item' onClick={() => history.push('/customer-management')}>
                        <div>
                            <div className='img-box'>
                                <img src={Customer} alt='' />
                            </div>
                        </div>
                        <span className='text-title'>Quản Lý Khách Hàng</span>
                    </div>
                    <div className='item' onClick={() => history.push('/service-management')}>
                        <div>
                            <div className='img-box'>
                                <img src={Dish} alt='' />
                            </div>
                        </div>
                        <span className='text-title'>Quản Lý Dịch Vụ</span>
                    </div>
                    <div className='item' onClick={() => history.push('/regulation-management')}>
                        <div>
                            <div className='img-box'>
                                <img src={Policy} alt='' />
                            </div>
                        </div>
                        <span className='text-title'>Quy Định</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Homepage;