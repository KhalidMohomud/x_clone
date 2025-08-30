import  express from  "express"
import { ENV } from "./config/env.js";
import { connectionBD } from "./config/db.js";
import {clerkMiddleware} from "@clerk/express";
import cors  from "cors";
import usersRouter from "./router/user.router.js";
import postrouter from "./router/post.router.js";

const app = express();

app.use(cors());

app.use(express.json());
app.use(clerkMiddleware());

app.use("/api/user", usersRouter);
app.use("/api/post",postrouter)

const serverStart = async ()=>{
    try {
        await connectionBD();
       
        app.listen(ENV.PORT,()=> console.log("http localhost",ENV.PORT) );
        
    } catch (error) {
        console.log("error",error);
        process.exit(1);
        
    }
}
serverStart();