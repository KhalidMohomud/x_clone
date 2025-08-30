import express from "express";
import { protectauth } from "../middleware/auth.middleware.js";
import { createComment, deleteComment, getComments } from "../controller/comment.controller.js";

const router =  express.Router();

//public router
router.get("/post/:postId",getComments);


//prived router

router.post("/post/:postId",protectauth , createComment);

router.delete("/:commentId",protectauth , deleteComment);



export default router;