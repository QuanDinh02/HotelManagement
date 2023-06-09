import { FETCH_ACCOUNT } from '../Query/Login';
import { UserLogin } from '../../redux/action/actions';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { errorToast2 } from '../Toast/Toast';
const ManagerRoute = (props) => {

    const dispatch = useDispatch();
    const history = useHistory();

    const [allow, setAllow] = React.useState(false);

    const userAccount = useSelector(state => state.user.account);

    const [fetch_account] = useLazyQuery(FETCH_ACCOUNT, {
        fetchPolicy: "no-cache"
    });

    if (userAccount && userAccount?.group !== "ADMIN") {
        errorToast2("Your access is not allowed !");
        history.push('/');
    }

    const fetchAccountInfo = async () => {
        let { data: { fetchAccountInfo } } = await fetch_account();
        if (fetchAccountInfo && fetchAccountInfo?.data) {
            setAllow(true);
            let data = {
                isAuthenticated: fetchAccountInfo.data.isAuthenticated,
                account: {
                    id: fetchAccountInfo.data.id,
                    username: fetchAccountInfo.data.username,
                    group: fetchAccountInfo.data.group
                }
            }

            dispatch(UserLogin(data));
        } else {
            window.location.reload();
            history.push('/login');
        }
    }

    React.useEffect(() => {
        fetchAccountInfo();
    }, []);

    return (
        <div>
            {allow ? props.children : <></>}
        </div>
    )
}

export default ManagerRoute;