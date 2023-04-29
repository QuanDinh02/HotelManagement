import { gql } from '@apollo/client';

const GET_ALL_HOTEL_SERVICES = gql`
  query GetAllHotelServices {
    hotel_services {
      id
      name
      price
      hotel_service_category {
        id
        name
      }
    }

    hotel_service_categories {
      id
      name
    }
  }
`;

export { GET_ALL_HOTEL_SERVICES }