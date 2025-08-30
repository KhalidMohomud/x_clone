import express from "express"
import {  createPost, deletePost, getPost, getPosts, getUserPosts, likePost } from "../controller/post.controller.js";
import { protectauth } from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";

const router = express.Router();

//public router
router.get("/", getPosts);

router.get("/:postId", getPost);
router.get("/user/:username", getUserPosts);

//prived router

router.post("/", protectauth, upload.single("image"), createPost);
router.post("/:postId/like",protectauth , likePost);
router.delete("/:postId", protectauth, deletePost);



export default router;