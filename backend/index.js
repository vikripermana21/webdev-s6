import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import LecturerRoute from "./routes/LecturerRoute.js";

const app = express();
mongoose.connect('mongodb://127.0.0.1:27017/lecturer_db',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Database Connected...'));

app.use(cors());
app.use(express.json());
app.use(LecturerRoute);

app.listen(5000, ()=> console.log('Server up and running...'));