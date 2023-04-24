import { gql } from '@apollo/client';

const UPDATE_CUSTOMER = gql`
    mutation UpdateCustomer($input: CustomerInput!) {
        updateCustomer(input: $input)
    }
`;

export { UPDATE_CUSTOMER }