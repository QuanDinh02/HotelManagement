import { gql } from '@apollo/client';

const LOGIN = gql`
  query userLogin($account: String!, $password: String!) {
    userLogin(account: $account, password: $password) {
        errorCode
        message
        data {
            id
            username
            group
            isAuthenticated
        }
    }
}
`;

const LOGOUT = gql`
  query userLogout {
    userLogout {
        errorCode
        message
    }
}
`;

const FETCH_ACCOUNT = gql`
  query fetchAccount {
    fetchAccountInfo {
        errorCode
        message
        data {
            id
            username
            group
            isAuthenticated
        }
    }
}
`;

export {
    LOGIN, LOGOUT, FETCH_ACCOUNT
}