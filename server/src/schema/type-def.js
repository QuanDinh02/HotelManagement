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

  type Query {
    customers: [Customer!]
    customer(value: String!): [Customer]
    customer_categories: [CustomerCategory!]

    staffs: [Staff!]
    staff(value: String!): [Staff]
    staff_categories: [StaffCategory!]

    staff_access_management: StaffAccessManagement!
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

  type Mutation {
    updateCustomer(input: CustomerInput!): String
    deleteCustomer(id: ID!): String

    createStaff(input: CreateStaffInput!): Response
    updateStaff(input: StaffInput!): String
    deleteStaff(id: ID!): String

    addAccessPermission(input: AccessPermissionInput!): Response
    deleteStaffAccess(input: AccessPermissionInput!): Response
  }
`;

module.exports = { typeDefs }