import mongooge from "mongoose"
import { ENV } from "./env.js";


export  const  connectionBD = async()=>{
    try {
        await mongooge.connect(ENV.MONGO_URL);
        console.log("sucessfull coneected database");
        
    } catch (error) {
        console.log("error does not connected dababase",error)
        process.exit(1);
        
    }
}