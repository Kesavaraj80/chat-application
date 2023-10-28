import express from "express";
import dotenv from "dotenv";
// import {chats} from './data/data.js'
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import { notFound ,errorHandler} from "./middleware/errorMiddleware.js";
// Middleware
const app = express();
dotenv.config();

// Accept JSON 
app.use(express.json());

// Database Connection
connectDB(process.env.MONGO_URL);


// Route Path

app.get('/', (req, res) => {
    res.send("API Server is Runnig")
});

// app.get('/api/chat', (req, res) => {
//     res.send(chats)
// });

// app.get('/api/chat/:id', (req, res) => {
//     const singleChat = chats.find(c=>c._id===req.params.id);
//     res.send(singleChat);
// })

app.use('/api/user',userRoutes);
app.use('/api/chat',chatRoutes)
app.use(notFound)
app.use(errorHandler);

// Server side
const PORT = process.env.PORT || 5000

app.listen(PORT,()=>console.log(`Server Started in port ${PORT}`));