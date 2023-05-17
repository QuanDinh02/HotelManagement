import { gql } from '@apollo/client';

const UPDATE_PAYMENT = gql`
    mutation UpdatePayment($roomUseId: ID!, $total_payment: Int!) {
        updatePayment(id: $roomUseId, total_payment: $total_payment) {
            errorCode
            message
        }
    }
`;

const CREATE_ROOM_SERVICE = gql`
    mutation CreateRoomService($input: RoomUseService!) {
        addRoomService(input: $input) {
            errorCode
            message
        }
    }
`;

const CREATE_ROOM_SURCHARGE = gql`
    mutation CreateRoomSurcharge($input: RoomUseSurcharge!) {
        addRoomSurcharge(input: $input) {
            errorCode
            message
        }
    }
`;

export {
    UPDATE_PAYMENT, CREATE_ROOM_SERVICE, CREATE_ROOM_SURCHARGE
}