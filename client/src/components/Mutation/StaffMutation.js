import { gql } from '@apollo/client';

const CREATE_STAFF = gql`
    mutation CreateStaff($input: CreateStaffInput!) {
        createStaff(input: $input) {
            errorCode
            message
        }
    }
`;

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

const ADD_ACCESS_PERMISSIONS = gql`
    mutation AddAccessPermissions($input: AccessPermissionInput!) {
        addAccessPermission(input: $input) {
            errorCode
            message
        }
    }
`;

const DELETE_ACCESS_PERMISSIONS = gql`
    mutation DeleteAccessPermissions($input: AccessPermissionInput!) {
        deleteStaffAccess(input: $input) {
            errorCode
            message
        }
    }
`;

export { 
    CREATE_STAFF, UPDATE_STAFF, DELETE_STAFF,
    ADD_ACCESS_PERMISSIONS, DELETE_ACCESS_PERMISSIONS
}