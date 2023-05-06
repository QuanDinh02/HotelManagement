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

export { BOOK_ROOM, UPDATE_BOOK_ROOM, DELETE_BOOK_ROOM }