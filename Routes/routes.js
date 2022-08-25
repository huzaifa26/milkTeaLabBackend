import express from 'express';
const router = express.Router();
import { signup,signin } from '../Controllers/authentication.js';
import { addAnnouncement, getAnnouncement, updateAnnouncement, deleteAnnouncement } from '../Controllers/announcement.js';
import { addMaterial, getMaterial, updateMaterial, deletematerial } from '../Controllers/material.js';
import { addTraining, getTraining, updateTraining, deleteTraining, addVideoProgress } from '../Controllers/training.js';
import { addExam, getExam, updateExam, deleteExam } from '../Controllers/exam.js';
import { addQuestion,deleteQuestion,getQuestion, updateQuestion,addAttemptedQuestion, addResult,getResult, deletAllQuestion } from '../Controllers/question.js';
import { addConversation, getConversation, getSingleConversation } from '../Controllers/converstion.js';
import { addMessage, getMessage } from '../Controllers/message.js';
import { assignManager, changeRole, getManagers, getUser } from '../Controllers/user.js';

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
router.get("/training/:uid",getTraining);
router.put("/training",updateTraining);
router.delete("/training/:id",deleteTraining);

router.post("/exam",addExam);
router.get("/exam/:uid",getExam);
router.put("/exam",updateExam);
router.delete("/exam/:id",deleteExam);

router.post("/question",addQuestion);
router.get("/question/:examId",getQuestion);
router.put("/question/",updateQuestion);
router.delete("/question/:id",deleteQuestion);
router.post("/attemptedQuestion",addAttemptedQuestion);

router.post("/result",addResult);
router.get("/result/:uId",getResult);

router.post("/conversation",addConversation);
router.get("/conversation/:uId",getConversation);

router.get("/singleConversation/:uId/:rId",getSingleConversation);

router.post("/message",addMessage);
router.get("/message/:cId",getMessage);

router.get("/user",getUser);
router.post("/user-role",changeRole);

router.post("/assign-manager",assignManager);
router.get("/getManager",getManagers);


router.post("/videoProgress",addVideoProgress);
// router.get("/videoProgress",getVideoProgress);

router.delete("/deleteQuestionResult/:eId/:uId",deletAllQuestion);

export default router;