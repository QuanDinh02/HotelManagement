import { gql } from '@apollo/client';

const GET_ALL_HOTEL_ROOMS = gql`
  query GetAllHotelRooms {
    hotel_rooms {
        id
        name
        status
        room_category {
            id
            name
            price
            people_maximum
        }
    }
  
    hotel_room_categories {
        id
        name
        price
        people_maximum
    }
  }
`;

const GET_ALL_HOTEL_ROOMS_CATEOGRY = gql`
  query GetAllHotelRoomCategories {
    hotel_room_categories {
      id
      name
      description
      price
      people_maximum
    }
  }
`;

const GET_SEARCHED_ROOM_BY_NAME = gql`
  query getSearchRoomByName($value: String!) {
    room_search_by_name(value: $value) {
        id
        name
        status
        room_category {
          id
          name
          description
          price
          people_maximum
        }
    }
  }
`;

const GET_SEARCHED_ROOM_BY_CATEGORY = gql`
  query getSearchRoomByCategory($value: String!) {
    room_search_by_category(value: $value) {
        id
        name
        status
        room_category {
          id
          name
          description
          price
          people_maximum
        }
    }
  }
`;

export {
  GET_ALL_HOTEL_ROOMS, GET_ALL_HOTEL_ROOMS_CATEOGRY, GET_SEARCHED_ROOM_BY_NAME, GET_SEARCHED_ROOM_BY_CATEGORY
}