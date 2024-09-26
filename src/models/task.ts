/* import { Document, Schema, model } from 'mongoose';

interface ITask extends Document {
  title: string;
  description: string;
  status: 'to-do' | 'in progress' | 'blocked' | 'done';
  assignedTo: string;
  createdAt: Date;
  finishedBy: Date;
}

const taskSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['to-do', 'in progress', 'blocked', 'done'], required: true },
  assignedTo: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  finishedBy: { type: Date },
});

const Task = model<ITask>('Task', taskSchema);

export default Task; */

import { Schema, model } from 'mongoose';

const taskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, required: true },
  assignedTo: { type: Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  finishedBy: { type: Date },
});

const Task = model('Task', taskSchema);

export { Task };