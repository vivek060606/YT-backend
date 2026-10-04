import {v2 as cloudinary} from "cloudinary"
import fs from "fs"  //fs: Node.js built-in File System module, used here to manage local files on your server disk.


  cloudinary.config({  //This tells the Cloudinary SDK which account to use.
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET
    });


    const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {  //The response contains information about the uploaded file, including its URL.
            resource_type: "auto"
        })
        // file has been uploaded successfull
        //console.log("file is uploaded on cloudinary ", response.url);
        fs.unlinkSync(localFilePath)
        return response;

    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
        return null;
    }
}

export {uploadOnCloudinary}


// Your backend shouldn't have to store every uploaded image directly on your server.

// User uploads avatar
//        ↓
// Multer
//        ↓
// temporary/local file
//        ↓
// Cloudinary utility
//        ↓
// Cloudinary
//        ↓
// URL
//        ↓
// MongoDB

// Multer handles the incoming uploaded file.

// Cloudinary utility uploads that file to Cloudinary.