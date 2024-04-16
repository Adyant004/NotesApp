import express from 'express';
import connectToDB from './db/connect';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRouter from './routes/authRoute'
import noteRouter from './routes/noteRoute'
dotenv.config();

const app = express();
const path = require('path');

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth',authRouter)
app.use('/api/notes',noteRouter)

app.use(express.static(path.join(__dirname, "../frontend/dist")));

const PORT = process.env.PORT || 3000;

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
});

app.listen(PORT,() => {
    connectToDB(process.env.MONGO_URI);
    console.log(`Server is listening on ${PORT}...`)
})