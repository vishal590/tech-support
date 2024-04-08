import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js';
import morgan from 'morgan';
import authRoute from './routes/userRoutes.js'
import ticketRoute from './routes/ticketRoutes.js'
import cors from 'cors';


dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));


app.use(cors());


app.use('/api/v1/user', authRoute);
app.use('/api/v1/tickets', ticketRoute);

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Server is running on port ${port} and in ${process.env.DEV_MODE}`.bgGreen)
})