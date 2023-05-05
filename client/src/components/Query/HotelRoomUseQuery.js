import { gql } from '@apollo/client';

const GET_ALL_HOTEL_ROOM_USE = gql`
  query GetAllHotelRoomUse {
    hotel_room_use_list {
        id
        night_stay
        receive_date
        checkOut_date
        status
        room {
            id
            name
            category
        }
        customer {
            id
            name
            phone
        }
    }

    hotel_rooms_by_categories {
      id
      name
      price
      people_maximum
      rooms {
        id
        name
      }
    }

    customer_categories {
      id
      name
    }
  }
`;

export {
    GET_ALL_HOTEL_ROOM_USE
}