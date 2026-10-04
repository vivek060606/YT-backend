import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js";


export const verifyJWT =asyncHandler(async(req, _, next)=>{
      try {
         const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
  
         if(!token){
          throw new ApiError(401, "Unauthorized request")
         }
  
         const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)  //If the token is valid, it returns the decoded payload.
  
         const user= await User.findById(decodedToken?._id).select("-password -refreshToken")
  
         if(!user){
          throw new ApiError(401, "invalid access token")
         }

         req.user= user;  //next controller can simply do: const user = req.user;
         next()

      } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access Token")
      }


})


// A middleware is a function that runs between the incoming request and the controller.

// Client
//   ↓
// Request
//   ↓
// Middleware
//   ↓
// Controller
//   ↓
// Response


// const decodedToken = jwt.verify(token, secretKey);
// you can normally treat the token as verified.

// If it fails, it throws an error.

// ? means ->If decodedToken exists, get _id; otherwise don't throw an error just do decodedToken is null/undefined."