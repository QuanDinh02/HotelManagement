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

  type AccessPermission {
    id: ID!
    name: String!
    link: String!
  }

  type StaffCategory {
    id: ID!
    name: String!
  }

  type Query {
    customers: [Customer!]
    customer(value: String!): [Customer]
    customer_categories: [CustomerCategory!]

    staffs: [Staff!]
    staff(value: String!): [Staff]
    staff_categories: [StaffCategory!]
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

  type Mutation {
    updateCustomer(input: CustomerInput!): String
    deleteCustomer(id: ID!): String

    updateStaff(input: StaffInput!): String
    deleteStaff(id: ID!): String
  }
`;

module.exports = { typeDefs }