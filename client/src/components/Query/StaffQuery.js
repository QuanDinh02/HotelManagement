import { gql } from '@apollo/client';

const GET_ALL_STAFFS = gql`
  query GetAllStaffs {
    staffs {
      id
      name
      citizen_id
      phone
      dob
      address
      gender
      working_day
      staff_account_name
      staff_category {
        id
        name
      }
    }

    staff_categories {
      id
      name
    }
  }
`;

const GET_SEARCHED_STAFF = gql`
  query GetSearchedStaff($value: String!) {
    staff(value: $value) {
      id
      name
      citizen_id
      phone
      dob
      address
      gender
      working_day
      staff_account_name
      staff_category {
        id
        name
      }
    }
  }

`;

export { GET_ALL_STAFFS, GET_SEARCHED_STAFF }