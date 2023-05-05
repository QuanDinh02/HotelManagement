import { gql } from '@apollo/client';

const BOOK_ROOM = gql`
    mutation BookRoom($input: BookRoomInput!) {
        bookRoom(input: $input) {
            errorCode
            message
        }
    }
`;

export { BOOK_ROOM }