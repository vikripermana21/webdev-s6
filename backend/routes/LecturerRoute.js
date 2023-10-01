import express from "express";
import { createAccount, getAllAccounts, getAccountById, login } from "../controllers/UserAccController.js";
import { getAllLecturers, createLecturer, getLecturerById, updateLecturer, deleteLecturer } from "../controllers/ProfileController.js";
import { createTeachingHistory, showAllTeachingHistory, getTeachingHistoryById, updateTeachingHistory, deleteTeachingHistory } from "../controllers/TeachHistoryController.js";
import { createEducationHistory, showAllEducationHistory, getEducationHistoryById, updateEducationHistory, deleteEducationHistory } from "../controllers/EduHistoryController.js";
import { createResearch, showAllResearch, getResearchById, updateResearch, deleteResearch } from "../controllers/ResearchController.js";
// import { createPKM, showAllPKM, getPKMById, updatePKM, deletePKM } from "../controllers/PKMController.js";

const router = express.Router();

router.get('/', (req, res) => {
    res.send('tess')
});

//AKUN
router.post('/account', createAccount);
router.get('/accounts', getAllAccounts);
router.get('/accounts/:id_account', getAccountById);
router.post('/login', login)

// Dosen
router.post('/lecturer', createLecturer);
router.get('/lecturer', getAllLecturers);
router.get('/lecturer/:id_dosen', getLecturerById);
router.patch("/lecturer/:id_dosen", updateLecturer);
router.delete("/lecturer/:id_dosen", deleteLecturer);

// Teaching History
router.post('/teaching-history', createTeachingHistory);
router.get('/teaching-history/:id_dosen', showAllTeachingHistory);
router.get('/teaching-history/:id_dosen/:id_teaching_history', getTeachingHistoryById);
router.patch('/teaching-history/:id_teaching_history', updateTeachingHistory);
router.delete('/teaching-history/:id_teaching_history', deleteTeachingHistory);

// Education History
router.post('/education-history', createEducationHistory);
router.get('/education-history/:id_dosen', showAllEducationHistory);
router.get('/education-history/:id_dosen/:id_education_history', getEducationHistoryById);
router.patch('/education-history/:id_education_history', updateEducationHistory);
router.delete('/education-history/:id_education_history', deleteEducationHistory);

// Research
router.post('/research', createResearch);
router.get('/research/:id_dosen', showAllResearch); //tampilkan semua research berdasarkan id_dosen
router.get('/research/:id_dosen/:id_research', getResearchById); //tampilkan berdasarkan id_research (spesifik)
router.patch('/research/:id_research', updateResearch);
router.delete('/research/:id_research', deleteResearch);

// PKM
// router.post('/pkm', createPKM);
// router.get('/pkm/:id_dosen', showAllPKM);
// router.get('/pkm/:id_dosen/:id_pkm', getPKMById);
// router.patch('/pkm/:id_pkm', updatePKM);
// router.delete('/pkm/:id_pkm', deletePKM);

export default router;