import LoginImage from '../../assets/images/login_image.jpg';
import './Authentication.scss';
import { RiUserFill, RiLockFill } from 'react-icons/ri';
import { useImmer } from "use-immer";
import { useLazyQuery } from '@apollo/client';
import { LOGIN, FETCH_ACCOUNT } from '../Query/Login';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { UserLogin } from '../../redux/action/actions';
import { successToast, errorToast2 } from '../Toast/Toast';
import React from 'react';
import _ from 'lodash';

const LoginPage = () => {

    const history = useHistory();
    const dispatch = useDispatch();

    const userAccount = useSelector(state => state.user.account);

    const [account, setAccount] = useImmer({
        account_name: '',
        password: ''
    })

    const [login] = useLazyQuery(LOGIN, {
        fetchPolicy: "no-cache"
    });

    const [fetch_account] = useLazyQuery(FETCH_ACCOUNT, {
        fetchPolicy: "no-cache"
    });

    const fetchAccountInfo = async () => {
        let { data: { fetchAccountInfo } } = await fetch_account();
        if (fetchAccountInfo && fetchAccountInfo.data) {
            let data = {
                isAuthenticated: fetchAccountInfo.data.isAuthenticated,
                account: {
                    id: fetchAccountInfo.data.id,
                    username: fetchAccountInfo.data.username,
                    group: fetchAccountInfo.data.group
                }
            }
            dispatch(UserLogin(data));
            history.push('/');
        }
    }

    const handleOnChange = (attribute, value) => {
        setAccount(draft => {
            draft[attribute] = value;
        })
    }

    const handleLogin = async () => {
        if (!account.account_name || !account.password) {
            return;
        }
        else {
            let { data: { userLogin } } = await login({
                variables: {
                    account: account.account_name,
                    password: account.password
                }
            });

            if (userLogin) {
                if (userLogin.errorCode === 0) {
                    successToast(userLogin.message);
                    let data = {
                        isAuthenticated: userLogin.data.isAuthenticated,
                        account: {
                            id: userLogin.data.id,
                            username: userLogin.data.username,
                            group: userLogin.data.group
                        }
                    }
                    setTimeout(() => {
                        dispatch(UserLogin(data));
                        history.push('/');
                    }, 1500);
                }

                if (userLogin.errorCode === -1) {
                    errorToast2(userLogin.message);
                }
            }
        }
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleLogin();
        }
    }

    React.useEffect(() => {
        fetchAccountInfo();
    }, []);

    React.useEffect(() => {
        if (!_.isEmpty(userAccount)) {
            history.push('/');
        }
    }, [userAccount]);

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
                                <input type="text" className="form-control" id="floatingInput" placeholder="Account name"
                                    value={account.account_name}
                                    onChange={(event) => handleOnChange('account_name', event.target.value)}
                                />
                                <label htmlFor="floatingInput">Tên đăng nhập</label>
                            </div>
                        </div>
                        <div className="input-group mb-5">
                            <span className="input-group-text icon"><RiLockFill /></span>
                            <div className="form-floating">
                                <input type="password" className="form-control" id="floatingPassword" placeholder="Password"
                                    value={account.password}
                                    onChange={(event) => handleOnChange('password', event.target.value)}
                                    onKeyPress={(event) => handleKeyPress(event)}
                                />
                                <label htmlFor="floatingPassword">Mật khẩu</label>
                            </div>
                        </div>
                        <div className='login-btn-box d-flex mt-4'>
                            <button className='btn login-btn' onClick={handleLogin}>Đăng nhập</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;