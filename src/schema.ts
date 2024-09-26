/* import { gql } from 'apollo-server-express';
import Task from './models/task';
import User from './models/user';

// Define your GraphQL schema
const typeDefs = gql`
  type Task {
    id: ID!
    title: String!
    description: String!
    status: String!
    assignedTo: String!
    createdAt: String!
    finishedBy: String
  }

  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
  }

  type Query {
    tasks: [Task]
    users: [User]
  }

  type Mutation {
    addTask(title: String!, description: String!, status: String!, assignedTo: String!): Task
    addUser(name: String!, email: String!, password: String!): User
  }
`;

// Define your resolvers
const resolvers = {
  Query: {
    tasks: async () => await Task.find(),
    users: async () => await User.find(),
  },
  Mutation: {
    addTask: async (_: any, { title, description, status, assignedTo }: any) => {
      const newTask = new Task({ title, description, status, assignedTo, createdAt: new Date() });
      return await newTask.save();
    },
    addUser: async (_: any, { name, email, password }: any) => {
      const newUser = new User({ name, email, password });
      return await newUser.save();
    },
  },
};

export { typeDefs, resolvers };

 */


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
    addTask(title: String!, description: String!, status: String!, assignedTo: ID): Task
    updateTask(id: ID!, title: String, description: String, status: String, assignedTo: ID, finishedBy: String): Task
    deleteTask(id: ID!): Task
  }
`;

export { typeDefs };