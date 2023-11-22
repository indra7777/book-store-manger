import express, { response } from "express";
import  {PORT,mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import bookRouter from "./routes/bookRoute.js";
import cors from 'cors';
import server from './routes/server.js';
const app = express();
//use middleware for parsing data 
app.use(express.json());
//allow default values
// app.use(cors());

// allow specific urls
app.use(cors({
    origin: "http://localhost:5173",
    methods: ['GET','POST','PUT','DELETE',''],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

 app.get("/",(req,res)=>{
    //console.log(req);
    return res.status(234).send("Welcome to book store");

 });

// app.use("/" , server);


app.use("/books",bookRouter);
//listen server on port after connecting to database
mongoose
    .connect(mongoDBURL,{ useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=>{
        console.log("App connected to database successfully");
        app.listen(PORT,()=>{
            console.log(`Server is running on ${PORT}`);
        });
    })
    .catch((err)=>{
        console.log(err);
    });