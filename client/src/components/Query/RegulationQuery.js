import { gql } from '@apollo/client';

const GET_SEARCHED_REGULATION = gql`
  query searchedRegulation($value: String!) {
    searched_regulation(value: $value) {
      id
      name
      price
      description
    }
  }
`;

export {
    GET_SEARCHED_REGULATION
}