import { gql } from '@apollo/client';

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


export { UPDATE_CUSTOMER, DELETE_CUSTOMER }