import express, { Application } from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import { ApolloServer } from 'apollo-server-express';
/* import { typeDefs, resolvers } from './schema'; */
import { typeDefs } from './schema';
import { resolvers } from './resolver'
/* import taskRoutes from './routes/taskRoutes';
import userRoutes from './routes/userRoutes'; */
import dotenv from 'dotenv'

dotenv.config()

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
const mongoURI = process.env.MONGO_URI as string;
const options: ConnectOptions = {
 /*  useNewUrlParser: true,
  useUnifiedTopology: true, */
};

mongoose.connect(mongoURI, options).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

// Function to start the server
async function startServer() {
// Set up Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });
await server.start();
server.applyMiddleware({ app });

// Use routes
/* app.use('/tasks', taskRoutes);
app.use('/users', userRoutes); */

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`GraphQL endpoint: http://localhost:${PORT}${server.graphqlPath}`);
});
}

// Start the server
startServer().catch((error) => {
  console.error('Error starting the server:', error);
});