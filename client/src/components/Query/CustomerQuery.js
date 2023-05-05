import { gql } from '@apollo/client';

const GET_ALL_CUSTOMERS = gql`
  query GetAllCustomers {
    customers {
      id
      name
      citizen_id
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

    customer_categories {
      id
      name
    }
  }
`;

const GET_CUSTOMER_BY_NAME_PHONE = gql`
  query GetCustomer($value: String!) {
    customer(value: $value) {
      id
      name
      citizen_id
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

const GET_CUSTOMER_INFO_BY_PHONE = gql`
  query GetCustomerInfoByPhone($value: String!) {
    customer_info_by_phone(value: $value) {
      id
      name
      phone
    }
  }
`;

const GET_CUSTOMER_CATEGORIES = gql`
  query GetCustomerCategories {
    customer_categories {
      id
      name
    }
  }
`;


export { 
  GET_ALL_CUSTOMERS, GET_CUSTOMER_BY_NAME_PHONE, 
  GET_CUSTOMER_INFO_BY_PHONE, GET_CUSTOMER_CATEGORIES }