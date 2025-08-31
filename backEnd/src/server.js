import  express from  "express"
import { ENV } from "./config/env.js";
import { connectionBD } from "./config/db.js";
import {clerkMiddleware} from "@clerk/express";
import cors  from "cors";
import usersRouter from "./router/user.router.js";
import postrouter from "./router/post.router.js";
import commentsrouter from "./router/comment.router.js";
import notificationsrouter from "./router/notification.router.js";
import { arcjetMiddleware } from "./middleware/arcject.middleware.js";
const app = express();

app.use(cors());

app.use(express.json());
app.use(clerkMiddleware());

app.use(arcjetMiddleware);

app.use("/api/user", usersRouter);
app.use("/api/post",postrouter)
app.use("/api/post",commentsrouter);
app.use("/api/notification",notificationsrouter)

app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err);
  res.status(err.status || 500).json({
    error: err.message || "Something went wrong",
  });
});
const serverStart = async ()=>{
    try {
        await connectionBD();

        //listen for local development

        if(ENV.NODE_ENV !== "production"){
           app.listen(ENV.PORT,()=> console.log("http localhost",ENV.PORT) );

        }
       
       
        
    } catch (error) {
        console.log("error",error);
        process.exit(1);
        
    }
}
serverStart();