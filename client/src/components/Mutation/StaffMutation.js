import { gql } from '@apollo/client';

const UPDATE_STAFF = gql`
    mutation UpdateStaff($input: StaffInput!) {
        updateStaff(input: $input)
    }
`;

const DELETE_STAFF = gql`
    mutation DeleteStaff($deleteStaffId: ID!) {
        deleteStaff(id: $deleteStaffId)
    }
`;


export { UPDATE_STAFF, DELETE_STAFF }