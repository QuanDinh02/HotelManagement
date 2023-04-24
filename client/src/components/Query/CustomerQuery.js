
import { gql } from '@apollo/client';

const GET_ALL_CLIENTS = gql`
  query GetAllClients {
    customers {
      id
      name
      email
      phone
    }
  }
`;

export { GET_ALL_CLIENTS }