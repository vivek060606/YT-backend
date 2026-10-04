//OLDER METHOD

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


import dotenv from "dotenv";  //dotenv allows you to load variables from your .env file into: process.env
import { app } from "./app.js";
import connectDB from "./db/index.js";  //->Give index.js the function responsible for connecting to MongoDB.

dotenv.config({
    path: "./.env"  //Load environment variables from ./.env.
});

connectDB()  //Because connectDB is asynchronous, it returns a Promise.
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


// index.js
//    ↓
// Load environment variables
//    ↓
// Create/configure Express app
//    ↓
// Connect MongoDB
//    ↓
// If DB connection succeeds
//    ↓
// Start Express server

// app.listen() ->Server starts


// index.js is basically your entry point.

// app.on("error", (error) => {
//     console.error("Express app error:", error);
//     throw error;
// });

// This registers an event listener for an "error" event emitted by the Express app.
// Think of:
// app.on("error", ...)

// as:
// If the app emits an error event, run this function.


// app.listen()->Listen for HTTP requests on port 8000
// so
// const app = express()
//         ↓
// Express application created

// app.listen(8000)
//         ↓
// HTTP server starts listening

// npm run dev->
//                  npm run dev
//                       │
//                       ▼
//                   index.js
//                       │
//                       ▼
//               import dotenv
//                       │
//                       ▼
//                 import app
//                       │
//                       ▼
//               import connectDB
//                       │
//                       ▼
//               dotenv.config()
//                       │
//                       ▼
//               .env variables loaded
//                       │
//                       ▼
//                  connectDB()
//                       │
//                 ┌─────┴─────┐
//                 │           │
//              SUCCESS       FAILURE
//                 │           │
//                 ▼           ▼
//              .then()     .catch()
//                 │           │
//                 ▼           ▼
//           app.listen()   print error
//                 │
//                 ▼
//            SERVER STARTED


//    Now connect index.js + app.js + db->
//                 index.js
//                     │
//           ┌─────────┴──────────┐
//           │                    │
//        app.js                db/index.js
//           │                    │
//           │                    │
//    Express configuration    MongoDB connection
//           │                    │
//           ▼                    ▼
//       Middleware            MongoDB
//           │
//           ▼
//         Routes
//           │
//           ▼
//      Controllers
//           │
//           ▼
//        Models
//           │
//           ▼
//        MongoDB

// flow of->POST /api/v1/users/register=>
// Client
//  ↓
// app.js
//  ↓
// user.routes.js
//  ↓
// Multer middleware
//  ↓
// registerUser controller
//  ↓
// Cloudinary
//  ↓
// User model
//  ↓
// MongoDB
//  ↓
// ApiResponse
//  ↓
// Client