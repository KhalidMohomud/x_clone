import express from "express"
import { protectauth } from "../middleware/auth.middleware.js";
import { deleteNotification, getNotifications } from "../controller/notification.controller.js";

const router = express.Router();

router.get("/", protectauth ,getNotifications)
router.delete("/:notificationId", protectauth , deleteNotification)
export default router;