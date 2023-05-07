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

const GET_HOTEL_ROOM_USE_BY_ID = gql`
  query GetHotelRoomUseById($hotelRoomUseById: ID!) {
    hotel_room_use_by_id(id: $hotelRoomUseById) {
      id
      night_stay
      receive_date
      checkOut_date
      status
      room {
        id
        category {
          id
        }
      }
      customer {
        id
        name
        phone
        citizen_id
        phone
        dob
        address
        gender
        nationality
        customer_category
      }
    }
  }
`;

const GET_HOTEL_ROOM_USE_BY_CUSTOMER = gql`
  query bookRoomSearch($value: String!) {
    book_room_search_by_customer(value: $value) {
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
  }
`;

const GET_RECEIVE_ROOM_LIST = gql`
  query GetReceiveRoomList {
    received_hotel_room_use_list {
        id
        night_stay
        receive_date
        checkOut_date
        status
        room {
            id
            name
            category {
              id
              name
            }
        }
        customer {
            id
            name
            phone
            citizen_id
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
  }
`;

const GET_HOTEL_RECEIVE_ROOM_BY_CUSTOMER = gql`
  query receiveRoomSearch($value: String!) {
    receive_room_search_by_customer(value: $value) {
      id
      night_stay
      receive_date
      checkOut_date
      status
      room {
        id
        name
        category {
          id
          name
        }
      }
      customer {
        id
        name
        phone
        citizen_id
      }
    }
  }
`;

export {
  GET_ALL_HOTEL_ROOM_USE, GET_HOTEL_ROOM_USE_BY_ID, GET_HOTEL_ROOM_USE_BY_CUSTOMER,
  GET_RECEIVE_ROOM_LIST, GET_HOTEL_RECEIVE_ROOM_BY_CUSTOMER
}