

import { Schema, model } from 'mongoose';

const taskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, required: true },
  assignedTo: { type: Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  finishedBy: { type: Date, default: null},
}, { timestamps: true });

const Task = model('Task', taskSchema);

export { Task };