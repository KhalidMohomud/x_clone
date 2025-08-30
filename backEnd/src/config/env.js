import dotenv from "dotenv"


dotenv.config();

export const  ENV = {
    PORT: process.env.PORT,
    CLERK_PUBLISHABLE_KEY:process.env.CLERK_PUBLISHABLE_KEY,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    MONGO_URL: process.env.MONGO_URL,
    ARCJET_KEY: process.env.ARCJET_KEY,
    CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
    CLOUDINARY_API_KE: process.env.CLOUDINARY_API_KE,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET


}