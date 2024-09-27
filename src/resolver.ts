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
      const newTask = new Task({
        title,
        description,
        status,
        assignedTo: assignedTo ? assignedTo : undefined, // optional field
        createdAt: new Date(),
      });
      return await newTask.save();
    },
    updateTask: async (_: unknown, { id, title, description, status, assignedTo, finishedBy }: UpdateTaskArgs): Promise<Document | null> => {
      // Fetch the current task to compare status
      const currentTask = await Task.findById(id);

      if (!currentTask) {
        throw new Error("Task not found");
      }

      // Determine if we need to set finishedBy based on status change
      const updateData: Partial<UpdateTaskArgs> = {
        title,
        description,
        status,
        assignedTo: assignedTo ? assignedTo : undefined,
        finishedBy: finishedBy ? finishedBy : undefined, // If finishedBy is provided, use it
      };

      if (status && status.toLowerCase() === 'done' && !currentTask.finishedBy) {
        // If the status is 'done' and it was not finished before, set the finishedBy date
        updateData.finishedBy = new Date().toISOString();
      }

      // Update the task with the new data
      const updatedTask = await Task.findByIdAndUpdate(
        id,
        updateData,
        { new: true }
      ).populate('assignedTo');

      return updatedTask;
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
  
