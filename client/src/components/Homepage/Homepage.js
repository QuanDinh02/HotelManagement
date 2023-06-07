import './Homepage.scss';
import { AiOutlineUser, AiOutlineQuestionCircle } from 'react-icons/ai';
import { RxExit } from 'react-icons/rx';
import { RiInformationLine } from 'react-icons/ri';
import Calendar from '../../assets/images/calender_image.png';
import Key from '../../assets/images/key.png';
import Invoice from '../../assets/images/invoice.png';
import Dish from '../../assets/images/dish.png';
import Revenue from '../../assets/images/revenue.png';
import Room from '../../assets/images/room.png';
import Staff from '../../assets/images/staff.png';
import Payment from '../../assets/images/service_payment.png';
import Policy from '../../assets/images/policy.png';
import Customer from '../../assets/images/customer.png';
import Profile from '../Modal/Profile/Profile';
import React from 'react';
import { LOGOUT } from '../Query/Login';
import { useHistory } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { useLazyQuery } from '@apollo/client';
import { UserLogout } from '../../redux/action/actions';
import { successToast } from '../Toast/Toast';

const Homepage = () => {

    const item_class_name = 'item d-flex align-items-center gap-3 mt-3';
    const [showProfile, setShowProfile] = React.useState(false);
    const history = useHistory();
    const dispatch = useDispatch();

    const [logout] = useLazyQuery(LOGOUT, {
        fetchPolicy: "no-cache"
    });

    const handleLogout = async () => {
        let { data: { userLogout } } = await logout();
        if (userLogout && userLogout?.errorCode === 0) {
            successToast(userLogout.message);
            dispatch(UserLogout());
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }
    }

    return (
        <div className='homepage-container'>
            <div className='sidebar d-flex justify-content-end flex-column'>
                <div className={item_class_name} onClick={() => setShowProfile(true)}>
                    <AiOutlineUser className='icon' />
                    <span>Thông tin cá nhân</span>
                </div>
                <div className={item_class_name} onClick={handleLogout}><RxExit className='icon' /> <span>Đăng xuất</span></div>
                <div className={item_class_name}><AiOutlineQuestionCircle className='icon' /> <span>Trợ giúp</span></div>
                <div className={item_class_name}><RiInformationLine className='icon' /> <span>Giới thiệu</span></div>
            </div>
            <div className='content'>
                <div className='title'>
                    <span>Quản Lý Khách Sạn</span>
                </div>
                <hr className='mb-4' />
                <div className='main'>
                    <div className='item left-content'>
                        <div className='top-left'>
                            <div className='left section d-flex flex-column p-2' onClick={() => history.push('/book-room')}>
                                <div className='image-box d-flex flex-column justify-content-center'>
                                    <div>
                                        <img src={Calendar} alt='' />
                                    </div>
                                </div>
                                <span className='text-title'>Đặt Phòng</span>
                            </div>
                            <div className='right section d-flex flex-column p-2' onClick={() => history.push('/receive-room')}>
                                <div className='image-box d-flex flex-column justify-content-center align-items-center'>
                                    <div className='image'>
                                        <img src={Key} alt='' />
                                    </div>
                                </div>
                                <span className='text-title'>Nhận Phòng</span>
                            </div>
                        </div>
                        <div className='bottom-left section d-flex flex-column p-2' onClick={() => history.push('/service-using-payment')}>
                            <div className='image-box d-flex justify-content-center align-items-center'>
                                <div className='image'>
                                    <img src={Payment} alt='' />
                                </div>
                            </div>
                            <span className='text-title'>Sử Dụng Dịch Vụ và Thanh Toán</span>
                        </div>
                    </div>
                    <div className='item center-content'>
                        <div className='top-left'>
                            <div className='top section d-flex flex-column p-2' onClick={() => history.push('/revenue-report')}>
                                <div className='image-box d-flex justify-content-center'>
                                    <div className='image'>
                                        <img src={Revenue} alt='' />
                                    </div>
                                </div>
                                <span className='text-title'>Thống kê doanh thu</span>
                            </div>
                            <div className='bottom'>
                                <div className='left section d-flex flex-column p-2' onClick={() => history.push('/room-management')}>
                                    <div className='image-box d-flex justify-content-center align-items-center'>
                                        <div className='image'>
                                            <img src={Room} alt='' />
                                        </div>
                                    </div>
                                    <span className='text-title'>Quản Lý Phòng</span>
                                </div>
                                <div className='right section d-flex flex-column p-2' onClick={() => history.push('/staff-management')}>
                                    <div className='image-box d-flex justify-content-center align-items-center'>
                                        <div className='staff-image'>
                                            <img src={Staff} alt='' />
                                        </div>
                                    </div>
                                    <span className='text-title'>Quản Lý Nhân Viên</span>
                                </div>
                            </div>
                        </div>
                        <div className='bottom-left section d-flex flex-column p-2' onClick={() => history.push('/customer-management')}>
                            <div className='image-box d-flex justify-content-center align-items-center'>
                                <div className='image'>
                                    <img src={Customer} alt='' />
                                </div>
                            </div>
                            <span className='text-title'>Quản Lý Khách Hàng</span>
                        </div>
                    </div>
                    <div className='item right-content'>
                        <div className='top-left'>
                            <div className='left section d-flex flex-column p-2'>
                                <div className='image-box d-flex flex-column justify-content-center align-items-center'>
                                    <div className='image'>
                                        <img src={Invoice} alt='' />
                                    </div>
                                </div>
                                <span className='text-title'>Quản Lý Hóa Đơn</span>
                            </div>
                            <div className='right section d-flex flex-column p-2' onClick={() => history.push('/service-management')}>
                                <div className='image-box d-flex flex-column justify-content-center align-items-center'>
                                    <div className='image'>
                                        <img src={Dish} alt='' />
                                    </div>
                                </div>
                                <span className='text-title'>Quản Lý Dịch Vụ</span>
                            </div>
                        </div>
                        <div className='bottom-left section d-flex flex-column p-2' onClick={() => history.push('/regulation-management')}>
                            <div className='image-box d-flex justify-content-center align-items-center'>
                                <div className='image'>
                                    <img src={Policy} alt='' />
                                </div>
                            </div>
                            <span className='text-title'>Quy Định</span>
                        </div>
                    </div>
                </div>
            </div>
            <Profile
                show={showProfile}
                setShow={setShowProfile}
            />
        </div>
    )
}

export default Homepage;