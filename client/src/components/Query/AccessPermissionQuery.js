import { gql } from '@apollo/client';

const GET_ALL_ACCESS_PERMISSIONS = gql`
  query getAllAccessPermissions {
    staff_access_management {
      access_permisions_list {
        id
        name
        link
      }

      staff_access_list {
        staff_category_info {
          id
          name
        }
        
        access_permisions
      }
    }
  }
`;

export { GET_ALL_ACCESS_PERMISSIONS }