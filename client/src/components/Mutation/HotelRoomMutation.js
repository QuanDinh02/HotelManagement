import { gql } from '@apollo/client';

const BOOK_ROOM = gql`
    mutation BookRoom($input: BookRoomInput!) {
        bookRoom(input: $input) {
            errorCode
            message
        }
    }
`;

const UPDATE_BOOK_ROOM = gql`
    mutation UpdateBookRoom($input: BookRoomUpdateInput!) {
        updateBookRoom(input: $input) {
            errorCode
            message
        }
    }
`;

const DELETE_BOOK_ROOM = gql`
    mutation DeleteBookRoom($deleteBookRoomId: ID!) {
        deleteBookRoom(id: $deleteBookRoomId) {
            errorCode
            message
        }
    }
`;

const UPDATE_RECEIVE_ROOM = gql`
    mutation UpdateReceiveRoom($roomUseId: ID!, $staff_id: Int!) {
        updateReceiveRoom(id: $roomUseId, staff_id: $staff_id) {
            errorCode
            message
        }
    }
`;

const UPDATE_RECEIVE_ROOM_INFO = gql`
    mutation UpdateReceiveRoomInfo($input: BookRoomUpdateInput!) {
        updateReceiveRoomInfo(input: $input) {
            errorCode
            message
        }
    }
`;

export {
    BOOK_ROOM, UPDATE_BOOK_ROOM, DELETE_BOOK_ROOM,
    UPDATE_RECEIVE_ROOM, UPDATE_RECEIVE_ROOM_INFO
}