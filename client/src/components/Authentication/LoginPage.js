import LoginImage from '../../assets/images/login_image.jpg';
import './Authentication.scss';
import { RiUserFill, RiLockFill } from 'react-icons/ri';


const LoginPage = () => {
    return (
        <div className='login-container'>
            <div className='login-bg-image'>
                <img src={LoginImage} alt='' />
            </div>
            <div className='login-content'>
                <div className='login-title mb-4'>
                    <span>Đăng Nhập</span>
                </div>
                <div className='login-main'>
                    <div>
                        <div className="input-group mb-3">
                            <span className="input-group-text icon"><RiUserFill /></span>
                            <div className="form-floating">
                                <input type="text" className="form-control" id="floatingInput" placeholder="abc" />
                                <label htmlFor="floatingInput">Tên đăng nhập</label>
                            </div>
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text icon"><RiLockFill /></span>
                            <div className="form-floating">
                                <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
                                <label htmlFor="floatingPassword">Mật khẩu</label>
                            </div>
                        </div>
                        <div className="form-check d-flex gap-3">
                            <input className="form-check-input checkbox-warning" type="checkbox" value="" id="flexCheckChecked" />
                            <label className="form-check-label">Remember me</label>
                        </div>
                        <div className='login-btn-box d-flex mt-4'>
                            <button className='btn login-btn'>Đăng nhập</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;