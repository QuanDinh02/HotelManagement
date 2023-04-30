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

const CREATE_NEW_SERVICE_CATEGORY = gql`
    mutation CreateServiceCategory($name: String!) {
        createServiceCategory(name: $name) {
            errorCode
            message
        }
    }
`;

const UPDATE_SERVICE_CATEGORY = gql`
    mutation UpdateServiceCategory($input: ServiceCategoryInput!) {
        updateServiceCategory(input: $input) {
            errorCode
            message
        }
    }
`;

const DELETE_SERVICE_CATEGORY = gql`
    mutation DeleteServiceCategory($deleteServiceCategoryId: ID!) {
        deleteServiceCategory(id: $deleteServiceCategoryId) {
            errorCode
            message
        }
    }
`;

export {
    CREATE_NEW_SERVICE, UPDATE_SERVICE, DELETE_SERVICE, 
    CREATE_NEW_SERVICE_CATEGORY, UPDATE_SERVICE_CATEGORY, DELETE_SERVICE_CATEGORY
}