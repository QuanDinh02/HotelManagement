import { FETCH_ACCOUNT } from '../Query/Login';
import { UserLogin } from '../../redux/action/actions';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';

const PrivateRoute = (props) => {

    const dispatch = useDispatch();
    const history = useHistory();

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
        } else {
            history.push('/login');
        }
    }

    React.useEffect(() => {
        fetchAccountInfo();
    }, []);

    return (
        <div>
            {props.children}
        </div>
    )
}

export default PrivateRoute;