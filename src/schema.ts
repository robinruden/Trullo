import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
  }

  type Task {
    id: ID!
    title: String!
    description: String!
    status: String!
    assignedTo: User
    createdAt: String!
    finishedBy: String
  }

  type Query {
    users: [User]
    user(id: ID!): User
    tasks: [Task]
    task(id: ID!): Task
  }

  type Mutation {
    addUser(name: String!, email: String!, password: String!): User
    updateUser(id: ID!, name: String, email: String, password: String): User
    deleteUser(id: ID!): User
    deleteAllUsers: Boolean
    addTask(title: String!, description: String!, status: String!, assignedTo: ID): Task
    updateTask(id: ID!, title: String, description: String, status: String, assignedTo: ID, finishedBy: String): Task
    deleteTask(id: ID!): Task
    deleteAllTasks: Boolean
  }
`;

export { typeDefs };