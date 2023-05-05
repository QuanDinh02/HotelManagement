const typeDefs = `#graphql
  type Customer {
    id: ID!
    name: String!
    citizen_id: String
    phone: String!
    dob: String
    address: String
    gender: String
    nationality: String
    customer_category: CustomerCategory!
  }

  type CustomerCategory {
    id: ID!
    name: String!
  }

  type Staff {
    id: ID!
    name: String!
    citizen_id: String!
    phone: String!
    dob: String!
    address: String!
    gender: String
    working_day: String
    staff_category: StaffCategory!
    staff_account_name: String!
  }

  type Response {
    errorCode: Int!
    message: String!
  }

  type AccessPermission {
    id: ID!
    name: String!
    link: String!
  }

  type StaffCategory {
    id: ID!
    name: String!
  }

  type StaffCategoryAccess {
    staff_category_info: StaffCategory!
    access_permisions: [ID!]
  }

  type StaffAccessManagement {
    staff_access_list: [StaffCategoryAccess!]
    access_permisions_list: [AccessPermission!]
  }

  type HotelServiceCategory {
    id: ID!
    name: String!
  }

  type HotelService {
    id: ID!
    name: String!
    price: Int!
    hotel_service_category: HotelServiceCategory!
  }

  type HotelRoomCategory {
    id: ID!
    name: String!
    description: String!
    price: Int!
    people_maximum: Int!
  }

  type HotelRoom {
    id: ID!
    name: String!
    status: String!
    room_category: HotelRoomCategory!
  }

  type RoomUse {
    id: ID!
    name: String!
    category: String!
  }

  type CustomerUse {
    id: ID!
    name: String!
    phone: String!
  }

  type HotelRoomUse {
    id: ID!
    night_stay: Int!
    receive_date: String!
    checkOut_date: String!
    status: String!
    room: RoomUse!
    customer: CustomerUse!
  }

  type HotelRoomReponse {
    id: ID!
    name: String!
  }

  type HotelRoomByRoomCategory {
    id: ID!
    name: String!
    price: Int!
    people_maximum: Int!
    rooms: [HotelRoomReponse!]
  }

  type CustomerInfoByPhone {
    id: ID!
    name: String!
    phone: String!
  }

  type Query {
    customers: [Customer!]
    customer(value: String!): [Customer]
    customer_categories: [CustomerCategory!]

    staffs: [Staff!]
    staff(value: String!): [Staff]
    staff_categories: [StaffCategory!]
    staff_access_management: StaffAccessManagement!

    hotel_services: [HotelService!]
    hotel_service_categories: [HotelServiceCategory!]

    searched_service_by_name(value: String!): [HotelService!]
    searched_service_by_category(value: String!): [HotelService!]

    hotel_rooms: [HotelRoom!]
    hotel_room_categories: [HotelRoomCategory!]

    room_search_by_name(value: String!): [HotelRoom!]
    room_search_by_category(value: String!): [HotelRoom!]

    hotel_room_use_list: [HotelRoomUse!]
    hotel_rooms_by_categories: [HotelRoomByRoomCategory!]

    customer_info_by_phone(value: String!): CustomerInfoByPhone
  }

  input CustomerInput {
    id: ID!
    name: String!
    citizen_id: String
    phone: String!
    dob: String
    address: String
    gender: String
    nationality: String
    customer_category: Int!
  }

  input StaffInput {
    id: ID!
    name: String!
    citizen_id: String
    phone: String!
    dob: String
    address: String
    gender: String
    working_day: String
    staff_category: Int!
  }

  input StaffAccountInput {
    account_name: String!
    password: String!
  }

  input StaffInfoInput {
    name: String!
    citizen_id: String
    phone: String!
    dob: String
    address: String
    gender: String
    working_day: String
    staff_category: Int!
  }

  input CreateStaffInput {
    staffInfo: StaffInfoInput!
    staffAccount: StaffAccountInput!
  }

  input AccessPermissionInput {
    id: ID!
    access_permissions: [ID!]
  }

  input ServiceInput {
    name: String!
    price: Int!
    hotel_service_category: Int!
  }

  input ServiceUpdateInput {
    id: ID!
    name: String!
    price: Int!
    hotel_service_category: Int!
  }

  input ServiceCategoryInput {
    id: ID!
    name: String!
  }

  input HotelRoomInput {
    name: String!
    room_category: Int!
  }

  input HotelRoomUpdateInput {
    id: ID!
    name: String!
    status: String!
    room_category: Int!
  }

  input HotelRoomCategoryInput {
    name: String!
    description: String!
    price: Int!
    people_maximum: Int!
  }

  input HotelRoomCategoryUpdateInput {
    id: ID!
    name: String!
    description: String!
    price: Int!
    people_maximum: Int!
  }

  type CreateCustomerReponse {
    id: ID!
    name: String!
    phone: String!
  }

  input CustomerCreateInput {
    name: String!
    citizen_id: String
    phone: String!
    dob: String
    address: String
    gender: String
    nationality: String
    customer_category: Int!
  }

  input BookRoomInput {
    room_id: Int!
    customer_id: Int!
    night_stay: Int!,
    receive_date: String!,
    checkOut_date: String!,
    status: String!
  }

  type Mutation {
    createCustomer(input: CustomerCreateInput!): CreateCustomerReponse
    updateCustomer(input: CustomerInput!): String
    deleteCustomer(id: ID!): String

    createStaff(input: CreateStaffInput!): Response
    updateStaff(input: StaffInput!): String
    deleteStaff(id: ID!): String

    addAccessPermission(input: AccessPermissionInput!): Response
    deleteStaffAccess(input: AccessPermissionInput!): Response

    createService(input: ServiceInput!): Response
    updateService(input: ServiceUpdateInput!): Response
    deleteService(id: ID!): Response

    createServiceCategory(name: String!): Response
    updateServiceCategory(input: ServiceCategoryInput!): Response
    deleteServiceCategory(id: ID!): Response

    createRoom(input: HotelRoomInput!): Response
    updateRoom(input: HotelRoomUpdateInput!): Response
    deleteRoom(id: ID!): Response

    createRoomCategory(input: HotelRoomCategoryInput!): Response
    updateRoomCategory(input: HotelRoomCategoryUpdateInput!): Response
    deleteRoomCategory(id: ID!): Response

    bookRoom(input: BookRoomInput!): Response
  }
`;

module.exports = { typeDefs }