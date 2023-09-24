import express from "express";
import { 
    getLecturer,
    getLecturerById,
    saveLecturer,
    updateLecturer,
    deleteLecturer,
    getTeachingHistoryById,
    saveTeachingHistory,
    updateTeachingHistory,
    deleteTeachingHistory,
} from "../controllers/LecturerController.js";

const router = express.Router();

router.get('/lecturers', getLecturer);
router.get('/lecturers/:id', getLecturerById);
router.post('/lecturers', saveLecturer);
router.patch('/lecturers/:id', updateLecturer);
router.delete('/lecturers/:id', deleteLecturer);

// CRUD operasi untuk array document Teaching_history
router.get('/lecturers/:lecturerId/teaching-history/:historyId', getTeachingHistoryById);
router.post('/lecturers/:lecturerId/teaching-history', saveTeachingHistory);
router.patch('/lecturers/:lecturerId/teaching-history/:historyId', updateTeachingHistory);
router.delete('/lecturers/:lecturerId/teaching-history/:historyId', deleteTeachingHistory);

// ... Anda dapat menambahkan rute dan fungsi


export default router;