const typeDefs = `#graphql
  type Customer {
    id: ID!
    name: String!
    citizenID: String
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
    customer_categories: [CustomerCategory!]
  }
`;

module.exports = { typeDefs }