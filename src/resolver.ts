import { User } from './models/user';
import { Task } from './models/task';

const resolvers = {
  Query: {
    users: async () => await User.find(),
    user: async (_: any, { id }: any) => await User.findById(id),
    tasks: async () => await Task.find().populate('assignedTo'),
    task: async (_: any, { id }: any) => await Task.findById(id).populate('assignedTo'),
  },
  Mutation: {
    addUser: async (_: any, { name, email, password }: any) => {
      const newUser = new User({ name, email, password });
      return await newUser.save();
    },
    updateUser: async (_: any, { id, name, email, password }: any) => {
      return await User.findByIdAndUpdate(id, { name, email, password }, { new: true });
    },
    deleteUser: async (_: any, { id }: any) => {
      return await User.findByIdAndRemove(id);
    },
    addTask: async (_: any, { title, description, status, assignedTo }: any) => {
      const newTask = new Task({ title, description, status, assignedTo, createdAt: new Date() });
      return await newTask.save();
    },
    updateTask: async (_: any, { id, title, description, status, assignedTo, finishedBy }: any) => {
      return await Task.findByIdAndUpdate(id, { title, description, status, assignedTo, finishedBy }, { new: true });
    },
    deleteTask: async (_: any, { id }: any) => {
      return await Task.findByIdAndRemove(id);
    },
  },
};

export { resolvers };