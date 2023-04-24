import { gql } from '@apollo/client';

const GET_ALL_CUSTOMERS = gql`
  query GetAllCustomers {
    customers {
      id
      name
      citizenID
      phone
      dob
      address
      gender
      nationality
      customer_category {
        id
        name
      }
    }
  }
`;

const GET_CUSTOMER_BY_NAME_PHONE = gql`
  query GetCustomer($value: String!) {
    customer(value: $value) {
      id
      name
      citizenID
      phone
      dob
      address
      gender
      nationality
      customer_category {
        id
        name
      }
    }
  }

`;

export { GET_ALL_CUSTOMERS, GET_CUSTOMER_BY_NAME_PHONE }