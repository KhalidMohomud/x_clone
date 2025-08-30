import express from "express"
import {  getPost, getPosts, getUserPosts } from "../controller/post.controller.js";

const router = express.Router();

//public router
router.get("/", getPosts);

router.get("/:postId", getPost);
router.get("/user/:username", getUserPosts);

//prived router

// router.post("/", protectRoute, upload.single("image"), createPost);
// router.post("/:postId/like", protectRoute, likePost);
// router.delete("/:postId", protectRoute, deletePost);



export default router;