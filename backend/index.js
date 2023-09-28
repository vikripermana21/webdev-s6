import express from "express";
import cors from "cors";
import routes from './routes/LecturerRoute.js'

const app = express();
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(routes)

app.listen(5000, ()=>{
    console.log("server up and running");
})