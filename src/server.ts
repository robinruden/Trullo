import express, { Request, Response } from 'express'
import mongoose from 'mongoose'

const app = express()
const PORT = process.env.PORT || 3000;


// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a simple schema and model
const itemSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
});

const Item = mongoose.model('Item', itemSchema);

// API Endpoints
app.get('/items', async (req: Request, res: Response) => {
  const items = await Item.find();
  res.json(items);
});

app.post('/items', async (req: Request, res: Response) => {
  const newItem = new Item(req.body);
  await newItem.save();
  res.status(201).json(newItem);
});

app.put('/items/:id', async (req: Request, res: Response) => {
  const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedItem);
});

app.delete('/items/:id', async (req: Request, res: Response) => {
  await Item.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

