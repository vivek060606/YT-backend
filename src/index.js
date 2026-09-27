// import mongoose from "mongoose";
// import {DB_NAME} from "./constants";


/*
import  express from "express"
const app=express()
;(async ()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}`)
        app.on("error",(error)=>{
            console.log("ERROR",error);
            throw error
        })

        app.listen(process.env.PORT,()=>{
            console.log(`App is listening on port ${process.env.PORT}`);
        })
    } catch (error) {
        console.error("Error:", error)
        throw err
    }
})()
*/


//***************ERROR IS COMING FROM THIS         /************* */ */

// // require('dotenv').config({path:'./env'})
// import dotenv from 'dotenv'
// import {app} from './app.js'

// import connectDB from "./db/index.js";

// dotenv.config({
//     path:'./.env'
// });



// connectDB()
// .then(()=>{
//     app.listen(process.env.PORT || 8000, ()=>{
//         console.log(`server is running at: ${process.env.PORT}`);
//     })
// })

// /// ASSIGNMENT write app.on for this 
// .catch((err)=>{
//     console.log("mongo db connection failed !!!",err);
// })







import dotenv from "dotenv";
import { app } from "./app.js";
import connectDB from "./db/index.js";

dotenv.config({
    path: "./.env"
});

connectDB()
    .then(() => {
        // ASSIGNMENT: Listen for app-level errors
        app.on("error", (error) => {
            console.error("Express app error:", error);
            throw error;
        });

        const port = process.env.PORT || 8000;
        app.listen(port, () => {
            console.log(`Server is running at: http://localhost:${port}`);
        });
    })
    .catch((err) => {
        console.error("MongoDB connection failed !!!", err);
    });


