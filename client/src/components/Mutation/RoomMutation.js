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

export {
    CREATE_NEW_ROOM, UPDATE_ROOM, DELETE_ROOM
}