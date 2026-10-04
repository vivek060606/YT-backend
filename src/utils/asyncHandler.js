const asyncHandler=(requestHandler)=>{   // requestHandler- >async (req, res) => {...}
   return (req, res, next)=>{        //It returns another function
        Promise
        .resolve(requestHandler(req, res, next)) //This actually executes your controller.
        .catch((err)=>next(err))
    }
}

export {asyncHandler}


// const asyncHandler=(fn)=>async (req, res, next)=>{
//     try {
        
//     } catch (error) {
//         res.status(error.code || 500).json({
//             success:false,
//             message:error.message
//         })        
//     }
// }

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
// Controllers often contain asynchronous operations:

// const registerUser = async (req, res) => {
//     const user = await User.create(...);
// };

// What if MongoDB throws an error?

// We need to pass that error to Express's error-handling middleware.
// How do we handle errors that occur inside asynchronous Express controllers?
// Instead of repeatedly writing:

// const getUser = async (req, res, next) => {
//     try {
//         const user = await User.findById(req.params.id);

//         res.status(200).json(user);
//     } catch (error) {
//         next(error);
//     }
// };
// you can create an asyncHandler.

// Then:
// const registerUser = asyncHandler(async (req, res) => {
//     ...
// });

// Now errors from the async controller can be passed to Express's error middleware.