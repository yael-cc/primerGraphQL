const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Task {
    id: ID!
    title: String!
    description: String
    completed: Boolean!
  }

  type Query {
    getTasks: [Task!]!
    getTask(id: ID!): Task
  }

  type Mutation {
    createTask(title: String!, description: String, completed: Boolean!): Task!
    updateTask(id: ID!, title: String, description: String, completed: Boolean): Task!
    deleteTask(id: ID!): Boolean!
  }
`;

module.exports = { typeDefs };