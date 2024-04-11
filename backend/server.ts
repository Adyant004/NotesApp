import express from 'express';
import connectToDB from './db/connect';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRouter from './routes/authRoute'
import noteRouter from './routes/noteRoute'
dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth',authRouter)
app.use('/api/notes',noteRouter)

const PORT = process.env.PORT || 3000;

app.listen(PORT,() => {
    connectToDB(process.env.MONGO_URI);
    console.log(`Server is listening on ${PORT}...`)
})