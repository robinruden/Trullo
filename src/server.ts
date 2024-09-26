import express from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import taskRoutes from './routes/taskRoutes';
import userRoutes from './routes/userRoutes';
import dotenv from 'dotenv'

dotenv.config()

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
const mongoURI = process.env.MONGO_URI as string;
const options: ConnectOptions = {
  /* useNewUrlParser: true,
  useUnifiedTopology: true, */
};

mongoose.connect(mongoURI, options).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

// Use routes
app.use('/tasks', taskRoutes);
app.use('/users', userRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});