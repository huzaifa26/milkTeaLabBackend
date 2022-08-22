import express from 'express';
const router = express.Router();
import { signup,signin } from '../Controllers/authentication.js';
import { addAnnouncement, getAnnouncement, updateAnnouncement, deleteAnnouncement } from '../Controllers/announcement.js';
import { addMaterial, getMaterial, updateMaterial, deletematerial } from '../Controllers/material.js';
import { addTraining, getTraining, updateTraining, deleteTraining } from '../Controllers/training.js';
import { addExam, getExam, updateExam, deleteExam } from '../Controllers/exam.js';
import { addQuestion } from '../Controllers/question.js';

router.post("/signup",signup);
router.post("/signin",signin);

router.post("/announcement",addAnnouncement);
router.get("/announcement",getAnnouncement);
router.put("/announcement",updateAnnouncement);
router.delete("/announcement/:id",deleteAnnouncement);

router.post("/material",addMaterial);
router.get("/material",getMaterial);
router.put("/material",updateMaterial);
router.delete("/material/:id",deletematerial);

router.post("/training",addTraining);
router.get("/training",getTraining);
router.put("/training",updateTraining);
router.delete("/training/:id",deleteTraining);

router.post("/exam",addExam);
router.get("/exam",getExam);
router.put("/exam",updateExam);
router.delete("/exam/:id",deleteExam);

router.post("/question",addQuestion);

export default router;