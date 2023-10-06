import express from "express";
import cors from "cors";
import routes from './routes/LecturerRoute.js'
import bodyParser from 'body-parser';
const app = express();

app.use(bodyParser.json({ limit: '5mb' })); // Limit the request body size to 5 MB
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(routes)

app.listen(5000, ()=>{
    console.log("server up and running");
})