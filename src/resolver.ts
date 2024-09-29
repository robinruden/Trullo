import { User } from './models/user';
import { Task } from './models/task';
import { Document } from 'mongoose';

// Define argument types for resolvers
interface UserArgs {
  id: string;
}

interface AddUserArgs {
  name: string;
  email: string;
  password: string;
}

interface UpdateUserArgs {
  id: string;
  name?: string;
  email?: string;
  password?: string;
}

interface TaskArgs {
  id: string;
}

interface AddTaskArgs {
  title: string;
  description: string;
  status: string;
  assignedTo?: string;
  finishedBy?: string
}

interface UpdateTaskArgs {
  id: string;
  title?: string;
  description?: string;
  status?: string;
  assignedTo?: string;
  finishedBy?: string
}


// Optional: Define a type for the context if you have additional properties in it
interface Context {
  // Define any additional properties here if needed, like authenticated user info
  user?: {
    id: string;
    email: string;
  };
}

const resolvers = {
  Query: {
    users: async (): Promise<Document[]> => await User.find(),
    user: async (_: unknown, { id }: UserArgs): Promise<Document | null> => await User.findById(id),
    tasks: async (): Promise<Document[]> => await Task.find().populate('assignedTo'),
    task: async (_: unknown, { id }: TaskArgs): Promise<Document | null> => 
      await Task.findById(id).populate('assignedTo'),
  },
  Mutation: {
    addUser: async (_: unknown, { name, email, password }: AddUserArgs): Promise<Document> => {
      const newUser = new User({ name, email, password });
      return await newUser.save();
    },
    updateUser: async (_: unknown, { id, name, email, password }: UpdateUserArgs): Promise<Document | null> => {
      return await User.findByIdAndUpdate(
        id, 
        { name, email, password }, 
        { new: true }
      );
    },
    deleteUser: async (_: unknown, { id }: UserArgs): Promise<Document | null> => {
      return await User.findByIdAndRemove(id);
    },
    deleteAllUsers: async (): Promise<boolean> => {
      await User.deleteMany({});
      return true;
    },
    addTask: async (_: unknown, { title, description, status, assignedTo }: AddTaskArgs): Promise<Document> => {
      return await new Task({ title, description, status, assignedTo, createdAt: new Date() }).save();
    },
    updateTask: async (_: unknown, { id, ...updateData }: UpdateTaskArgs): Promise<Document | null> => {
      if (updateData.status === 'done') updateData.finishedBy = new Date().toISOString();
      return await Task.findByIdAndUpdate(id, updateData, { new: true });
    },
    deleteTask: async (_: unknown, { id }: TaskArgs): Promise<Document | null> => {
      return await Task.findByIdAndRemove(id);
    },
    deleteAllTasks: async (): Promise<boolean> => {
      await Task.deleteMany({});
      return true;
    },
  },
};


export { resolvers };
  
