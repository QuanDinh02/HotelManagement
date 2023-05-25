import { gql } from '@apollo/client';

const CREATE_REGULATION = gql`
    mutation CreateRegulation($input: RegulationInput!) {
        createRegulation(input: $input) {
            errorCode
            message
        }
    }
`;

const UPDATE_REGULATION = gql`
    mutation UpdateRegulation($input: RegulationUpdateInput!) {
        updateRegulation(input: $input) {
            errorCode
            message
        }
    }
`;

const DELETE_REGULATION = gql`
    mutation DeleteRegulation($regulationId: ID!) {
        deleteRegulation(id: $regulationId) {
            errorCode
            message
        }
    }
`;

export {
    CREATE_REGULATION, UPDATE_REGULATION, DELETE_REGULATION
}