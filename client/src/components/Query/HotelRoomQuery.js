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

export {
  GET_ALL_HOTEL_ROOMS, GET_ALL_HOTEL_ROOMS_CATEOGRY
}