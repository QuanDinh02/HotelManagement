import { gql } from '@apollo/client';

const CREATE_NEW_SERVICE = gql`
    mutation CreateNewService($input: ServiceInput!) {
        createService(input: $input) {
            errorCode
            message
        }
    }
`;

const UPDATE_SERVICE = gql`
    mutation UpdateService($input: ServiceUpdateInput!) {
        updateService(input: $input) {
            errorCode
            message
        }
    }
`;

const DELETE_SERVICE = gql`
    mutation DeleteService($deleteServiceId: ID!) {
        deleteService(id: $deleteServiceId) {
            errorCode
            message
        }
    }
`;

export {
    CREATE_NEW_SERVICE, UPDATE_SERVICE, DELETE_SERVICE
}