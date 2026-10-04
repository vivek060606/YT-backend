import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()  //creates your Express application.

app.use(cors({   //app.use() registers middleware.tells-> For incoming requests, run the CORS middleware.
    origin: process.env.CORS_ORIGIN,  //eg:CORS_ORIGIN=http://localhost:5173->Allow requests from this frontend origin.
    credentials: true    //you're allowing credentials such as cookies to be included in cross-origin requests.
}))

app.use(express.json({limit: "16kb"}))  //16kb->limits the maximum JSON body size.
app.use(express.urlencoded({extended: true, limit: "16kb"})) //This handles URL-encoded form data.
app.use(express.static("public"))   //Serve files inside the public folder directly.
app.use(cookieParser())  //This middleware reads cookies sent by the browser.After cookieParser() runs, you can access:req.cookies


//routes import
import userRouter from './routes/user.routes.js'
import healthcheckRouter from "./routes/healthcheck.routes.js"
import tweetRouter from "./routes/tweet.routes.js"
import subscriptionRouter from "./routes/subscription.routes.js"
import videoRouter from "./routes/video.routes.js"
import commentRouter from "./routes/comment.routes.js"
import likeRouter from "./routes/like.routes.js"
import playlistRouter from "./routes/playlist.routes.js"
import dashboardRouter from "./routes/dashboard.routes.js"

//routes declaration
app.use("/api/v1/healthcheck", healthcheckRouter)
app.use("/api/v1/users", userRouter)
app.use("/api/v1/tweets", tweetRouter)
app.use("/api/v1/subscriptions", subscriptionRouter)
app.use("/api/v1/videos", videoRouter)
app.use("/api/v1/comments", commentRouter)
app.use("/api/v1/likes", likeRouter)
app.use("/api/v1/playlist", playlistRouter)
app.use("/api/v1/dashboard", dashboardRouter)

// http://localhost:8000/api/v1/users/register

export { app }   //index.js needs to import it.



// //app.js as the main configuration center of your Express application.
// 1. Create Express application
// 2. Configure middleware
// 3. Import routes
// 4. Connect routes to URL prefixes

// app.js
//    ↓
// configures Express
//    ↓
// middleware
//    ↓
// routes

// CORS = Cross-Origin Resource Sharing
// Suppose your frontend runs on:
// http://localhost:3000

// and your backend runs on:
// http://localhost:8000

// These are different origins.
// The browser normally restricts communication between different origins.
// CORS tells the browser:
// "It's okay for this frontend to communicate with my backend."

// express() creates your Express application.
// app.use(...)
// app.get(...)
// app.post(...)
// app.listen(...)


// app.use(express.json({limit: "16kb"}))

// This allows Express to understand JSON request bodies.
// Suppose the frontend sends:
// {
//     "username": "vivek",
//     "email": "vivek@gmail.com",
//     "password": "123456"
// }

// The request body comes into Express as JSON.
// express.json() parses it.
// Then you can access:
// req.body

// So without this middleware, your controller may not properly receive JSON data.


// app.use(express.urlencoded({
//     extended: true,    //It allows Express to parse richer/nested form data. eg user[name]=Vivek
//     limit: "16kb"
// }))

// This handles URL-encoded form data.
// For example:
// username=vivek&email=test@gmail.com

// It allows that data to become available through:
// req.body

    //              app.js
    //                │
    //                ▼
    //       const app = express()
    //                │
    //                ▼
    //           CORS setup
    //                │
    //                ▼
    //         JSON body parser
    //                │
    //                ▼
    //     URL-encoded body parser
    //                │
    //                ▼
    //        Static file serving
    //                │
    //                ▼
    //          Cookie parser
    //                │
    //                ▼
    //          Import routers
    //                │
    //                ▼
    //     ┌──────────┼───────────┐
    //     ▼          ▼           ▼
    //   users      videos      tweets
    //     │          │           │
    //     ▼          ▼           ▼
    // controllers/controllers/controllers


//     And then:
// index.js
//    ↓
// connectDB()
//    ↓
// app.listen()
//    ↓
// SERVER RUNNING