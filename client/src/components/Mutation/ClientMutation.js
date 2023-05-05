import { gql } from '@apollo/client';

const CREATE_CUSTOMER = gql`
    mutation CreateCustomer($input: CustomerCreateInput!) {
        createCustomer(input: $input) {
            id
            name
            phone
        }
    }
`;

const UPDATE_CUSTOMER = gql`
    mutation UpdateCustomer($input: CustomerInput!) {
        updateCustomer(input: $input)
    }
`;

const DELETE_CUSTOMER = gql`
    mutation DeleteCustomer($deleteCustomerId: ID!) {
        deleteCustomer(id: $deleteCustomerId)
    }
`;


export { CREATE_CUSTOMER, UPDATE_CUSTOMER, DELETE_CUSTOMER }