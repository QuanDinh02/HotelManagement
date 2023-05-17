import { gql } from '@apollo/client';

const GET_ALL_HOTEL_ROOM_USE_PAYMENT = gql`
  query GetAllHotelRoomUse {
    hotel_room_use_list_payment {
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

const GET_ALL_HOTEL_ROOM_USE_INVOICE = gql`
  query getInvoice($roomUseId: ID!) {
    invoice(id: $roomUseId) {
      id
      room_use_id
      receive_date
      checkOut_date
      night_stay
      invoice_total
      surcharge_total
      service_price_total
      Surcharges {
        id
        name
        description
        price
      }
      HotelRoom {
        name
        price
      }
      Services {
        id
        name
        quantity
        price
        total
      }
    }
  }
`;

const GET_HOTEL_SERVICES = gql`
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

const GET_ALL_SURCHARGES = gql`
  query surchargeList {
    surcharge_list {
      id
      name
      price
      description
    }
  }
`;

export {
    GET_ALL_HOTEL_ROOM_USE_PAYMENT, GET_ALL_HOTEL_ROOM_USE_INVOICE,
    GET_HOTEL_SERVICES, GET_ALL_SURCHARGES
}