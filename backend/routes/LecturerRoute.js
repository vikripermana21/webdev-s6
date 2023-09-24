import express from "express";
import { 
    getLecturer,
    getLecturerById,
    saveLecturer,
    updateLecturer,
    deleteLecturer
} from "../controllers/LecturerController.js";

const router = express.Router();

router.get('/lecturers', getLecturer);
router.get('/lecturers/:id', getLecturerById);
router.post('/lecturers', saveLecturer);
router.patch('/lecturers/:id', updateLecturer);
router.delete('/lecturers/:id', deleteLecturer);

export default router;