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

  type Query {
    customers: [Customer!]
    customer(value: String!): [Customer]
    customer_categories: [CustomerCategory!]
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

  type Mutation {
    updateCustomer(input: CustomerInput!): String
    deleteCustomer(id: ID!): String
  }
`;

module.exports = { typeDefs }