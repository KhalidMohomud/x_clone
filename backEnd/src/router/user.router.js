import  express from "express"
import {  followUser, getCurrentUser, getUserprofile, synUser, updateProfile } from "../controller/user.controller.js";
import { protectauth } from "../middleware/auth.middleware.js";


const router = express.Router();

//public router
router.get("/profile/:username", getUserprofile);

//prived router
router.post("/sync" , protectauth , synUser)
router.get("/me", protectauth ,getCurrentUser);
router.put("/profile", protectauth  , updateProfile);
router.post("/follow/:targetuser", protectauth ,followUser)


export default router;