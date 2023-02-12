import express from "express"
import {createMentor} from "./../controllers/mentorController.js"

const router = express.Router();
router.post("/",createMentor)

export default router;