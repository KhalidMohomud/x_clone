// multer is a middleware for handling multipart/from-data , which is primarily used for image upload

import multer from "multer"

const storage = multer.memoryStorage();

const fileFilter = (req,file,cb)=>{
    if(file.mimetype.startsWith("image/")){
     
         cb(null,true);
    }else {
        cb(new Error("only image files are allowed"), false);
    }
};


const upload =multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {fileSize: 5*1024*1024}, //5mb
})

export default upload;