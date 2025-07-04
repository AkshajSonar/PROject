import {v2 as cloudinary} from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localfilePath) => {
    try {
        if(!localfilePath) {
            return null
        }
        const response = await cloudinary.uploader.upload(localfilePath,{
            resource_type: "auto" // Automatically detect the resource type (image, video, etc.)
        })
        // console.log("File uploaded successfully to Cloudinary",response.url);
        fs.unlinkSync(localfilePath); // Delete the local file after upload
        return response;
    }
    catch (error){
        fs.unlinkSync(localfilePath); // Delete the local file if upload fails
        console.error("Error uploading file to Cloudinary:", error);
        }
}

export { uploadOnCloudinary };