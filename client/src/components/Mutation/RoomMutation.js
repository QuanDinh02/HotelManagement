import { gql } from '@apollo/client';

const CREATE_NEW_ROOM = gql`
    mutation CreateNewRoom($input: HotelRoomInput!) {
        createRoom(input: $input) {
            errorCode
            message
        }
    }
`;

const UPDATE_ROOM = gql`
    mutation UpdateRoom($input: HotelRoomUpdateInput!) {
        updateRoom(input: $input) {
            errorCode
            message
        }
    }
`;

const DELETE_ROOM = gql`
    mutation DeleteRoom($deleteRoomId: ID!) {
        deleteRoom(id: $deleteRoomId) {
            errorCode
            message
        }
    }
`;

const CREATE_NEW_ROOM_CATEGORY = gql`
    mutation CreateRoomCategory($input: HotelRoomCategoryInput!) {
        createRoomCategory(input: $input) {
            errorCode
            message
        }
    }
`;

const UPDATE_ROOM_CATEGORY = gql`
    mutation UpdateRoomCategory($input: HotelRoomCategoryUpdateInput!) {
        updateRoomCategory(input: $input) {
            errorCode
            message
        }
    }
`;

const DELETE_ROOM_CATEGORY = gql`
    mutation DeleteRoomCategory($deleteRoomCategoryId: ID!) {
        deleteRoomCategory(id: $deleteRoomCategoryId) {
            errorCode
            message
        }
    }
`;

export {
    CREATE_NEW_ROOM, UPDATE_ROOM, DELETE_ROOM, 
    CREATE_NEW_ROOM_CATEGORY, UPDATE_ROOM_CATEGORY, DELETE_ROOM_CATEGORY
}