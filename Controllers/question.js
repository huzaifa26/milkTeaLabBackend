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

export const getQuestion=(req,res,next)=>{
    const {examId}=req.params;

    connection.query("SELECT * from question where examId=?",[+examId],(error, results, fields)=>{
        if(error){
            console.log(error);
            res.status(409).send({status:"failed",err:error});
            return
        }
        console.log(results);
        res.send({status:"ok",res:results});
    })
}


export const updateQuestion=(req,res,next)=>{
    const {examId,question,op1,op2,op3,op4,correctOp,createdTime,id}=req.body;

    connection.query("UPDATE  question set examId=?,question=?,op1=?,op2=?,op3=?,op4=?,correctOp=?,createdTime=? where id=?",[examId,question,op1,op2,op3,op4,correctOp,createdTime,id],(error, results, fields)=>{
        if(error){
            console.log(error);
            res.status(409).send({status:"failed",err:error});
            return
        }
        console.log(results);
        res.send({status:"ok",res:results});
    })
}

export const deleteQuestion=(req,res,next)=>{
    const {id}=req.params;

    connection.query("delete from question where id=?",[id],(error, results, fields)=>{
        if(error){
            console.log(error);
            res.status(409).send({status:"failed",err:error});
            return
        }
        console.log(results);
        res.send({status:"ok",res:results});
    })
}


export const addAttemptedQuestion=(req,res,next)=>{
    const {examId,uId,qId,userChoice,createdTime}=req.body;
    connection.query("select correctOp from question where id=?",qId,(error, results, fields)=>{
        if(error){
            console.log(error);
            return
        }
        let correctOp=results[0].correctOp;
        let isCorrect=correctOp === userChoice;
            connection.query("INSERT INTO attemptedquestion (examId,uId,qId,userChoice,isCorrect,createdTime,correctChoice) VALUES (?,?,?,?,?,?,?)",[examId,uId,qId,userChoice,isCorrect,createdTime,correctOp],(error, results, fields)=>{
                if(error){
                    console.log(error);
                    res.status(409).send({status:"failed",err:error});
                    return
                }
                console.log(results);
                res.send({status:"ok",res:results});
            })
    })
}

export const addResult=(req,res,next)=>{
    const {examId,uId,qId,userChoice,createdTime}=req.body;
    connection.query("select count(*) as totalRows from attemptedquestion where examId=? and uId=?",[examId,uId],(error, results, fields)=>{
        connection.query("select isCorrect from attemptedquestion where examId=? and uId=?",[examId,uId],(error, results1, fields)=>{
            console.log(results)
            let count=0
            for(let i = 0;i<results1.length;i++){
                console.log(results1[i].isCorrect === 1)
                if(results1[i].isCorrect === 1){
                    count++;
                }
            }
            let number=(count/results[0].totalRows)*100;
            number=Math.round((number + Number.EPSILON) * 100) / 100;
            connection.query("INSERT INTO result (examId,uId,result) VALUES (?,?,?)",[examId,uId,number],(error, results, fields)=>{
                if(error){
                    console.log(error);
                    res.status(409).send({status:"failed",err:error});
                    return
                }
                console.log(results);
                res.send({status:"ok",res:results});
            })
        })
    })
}