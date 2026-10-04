import multer from "multer";

const storage = multer.diskStorage({  // tells :"I want to temporarily save uploaded files on the server's disk."
    destination: function (req, file, cb) {  //his tells Multer where to save the uploaded file.
      cb(null, "./public/temp")            //cb(error, result)
    },
    filename: function (req, file, cb) {
      
      cb(null, file.originalname)
    }
  })
  
export const upload = multer({ 
    storage
})


//Multer is an Express middleware for handling multipart/form-data, which is the format commonly used when a client uploads files.

// req->
// The Express request.

// It contains things like:

// req.body
// req.headers
// req.params
// file

// Information about the uploaded file.
// For example, conceptually:

// {
//     fieldname: "avatar",
//     originalname: "photo.jpg",
//     mimetype: "image/jpeg",
//     path: "...",
//     size: 12345
// }


// cb->
// cb means callback.
// Multer gives us this function so we can tell it:
// "Okay, use this destination."


// After Multer processes it, you'll typically access the file through:req.file


// We can use it in a route.
// For example:
// router.post(
//     "/register",
//     upload.single("avatar"),
//     registerUser
// );

// The frontend needs to send the file using the field name:avatar


