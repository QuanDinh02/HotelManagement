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

const GET_ALL_HOTEL_SERVICES_CATEOGRY = gql`
  query GetAllHotelServiceCategories {
    hotel_service_categories {
      id
      name
    }
  }
`;

const GET_SEARCHED_SERVICE_BY_NAME = gql`
  query getSearchService($value: String!) {
    searched_service_by_name(value: $value) {
      id
      name
      price
      hotel_service_category {
        id
        name
      }
    }
  }
`;

const GET_SEARCHED_SERVICE_BY_CATEGORY = gql`
  query getSearchService($value: String!) {
    searched_service_by_category(value: $value) {
      id
      name
      price
      hotel_service_category {
        id
        name
      }
    }
  }
`;

export { 
  GET_ALL_HOTEL_SERVICES, GET_ALL_HOTEL_SERVICES_CATEOGRY,
  GET_SEARCHED_SERVICE_BY_NAME, GET_SEARCHED_SERVICE_BY_CATEGORY 
}