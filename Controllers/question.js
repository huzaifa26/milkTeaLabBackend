import { connection } from "../index.js";

export const addQuestion=(req,res,next)=>{
    const {examId,question,op1,op2,op3,op4,correctOp,createdTime}=req.body;

    connection.query("INSERT INTO question (examId,question,op1,op2,op3,op4,correctOp,createdTime) VALUES (?,?,?,?,?,?,?,?)",[examId,question,op1,op2,op3,op4,correctOp,createdTime],(error, results, fields)=>{
        if(error){
            console.log(error);
            res.status(409).send({status:"failed",err:error});
            return
        }
        console.log(results);
        res.send({status:"ok",res:results});
    })
}
