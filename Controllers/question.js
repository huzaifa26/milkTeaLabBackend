import { connection } from "../index.js";

export const addQuestion=(req,res,next)=>{
    const {examId,question,op1,op2,op3,op4,correctOp,createdTime}=req.body;

    connection.query("INSERT INTO question (examId,question,op1,op2,op3,op4,correctOp,createdTime) VALUES (?,?,?,?,?,?,?,?)",[examId,question,op1,op2,op3,op4,correctOp,createdTime],(error, results, fields)=>{
        if(error){
            console.log(error);
            res.status(409).send({status:"failed",err:error});
            return
        }
        
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
        
        res.send({status:"ok",res:results});
    })
}


export const updateQuestion=(req,res,next)=>{
    const {examId,question,op1,op2,op3,op4,correctOp,createdTime,id}=req.body;
    console.log(req.body);

    connection.query("UPDATE question set examId=?,question=?,op1=?,op2=?,op3=?,op4=?,correctOp=?,createdTime=? where id=?",[examId,question,op1,op2,op3,op4,correctOp,createdTime,id],(error, results, fields)=>{
        if(error){
            console.log(error);
            res.status(409).send({status:"failed",err:error});
            return
        }
        
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
        
        res.send({status:"ok",res:results});
    })
}


export const addAttemptedQuestion=(req,res,next)=>{
    const {examId,uId,qId,userChoice,createdTime}=req.body;

    connection.query("SELECT * from attemptedquestion where examId=? and uid=?",[+examId,uId],(error, results, fields)=>{
        if(error){
            console.log(error);
            res.status(409).send({status:"failed",err:error});
            return
        }
        
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
                        
                        res.send({status:"ok",res:results});
                    })
            })

        // if(results.length === 0){

        // } else if(results.length > 0){
        //     connection.query("select correctOp from question where id=?",qId,(error, results, fields)=>{
        //         if(error){
        //             console.log(error);
        //             return
        //         }
        //         let correctOp=results[0].correctOp;
        //         let isCorrect=correctOp === userChoice;
        //             connection.query("update attemptedquestion set userChoice=?,isCorrect=?,createdTime=?,correctChoice=? where examId=? and qId=? and uId=?",[userChoice,isCorrect,createdTime,correctOp,examId,qId,uId],(error, results, fields)=>{
        //                 if(error){
        //                     console.log(error);
        //                     res.status(409).send({status:"failed",err:error});
        //                     return
        //                 }
                        
        //                 res.send({status:"ok",res:results});
        //             })
        //     })
        // }

    })

    
}

export const addResult=(req,res,next)=>{
    const {examId,uId,qId,userChoice,createdTime}=req.body;
    connection.query("select count(*) as totalRows from attemptedquestion where examId=? and uId=?",[examId,uId],(error, results, fields)=>{
        connection.query("select isCorrect from attemptedquestion where examId=? and uId=?",[examId,uId],(error, results1, fields)=>{
            let count=0
            for(let i = 0;i<results1.length;i++){
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
                res.send({status:"ok",res:results});
            })
        })
    })
}


export const getResult=(req,res,next)=>{

    const {uId}=req.params;
    console.log(uId);
    connection.query("select * from result where uId=?",[uId],(error, results, fields)=>{
        if(error){
            console.log(error);
            res.status(409).send({status:"failed",err:error});
            return
        }

        for(let i=0;i<results.length;i++){
            connection.query("select * from exam where id=?",[results[i].examId],(error, results1, fields)=>{
                if(error){
                    console.log(error);
                    res.status(409).send({status:"failed",err:error});
                    return
                }
                results[i].exam=results1[0]

                connection.query("select COUNT(qId) as attemptedquestion from attemptedquestion where examId=? and uId=?",[results[i].examId,uId],(error, results1, fields)=>{
                    if(error){
                        console.log(error);
                        res.status(409).send({status:"failed",err:error});
                        return
                    }
                    results[i].attemptedQuestions=results1[0].attemptedquestion;
    
                    connection.query("select COUNT(question) as totalquestion from question where examId=?",[results[i].examId],(error, results1, fields)=>{
                        if(error){
                            console.log(error);
                            res.status(409).send({status:"failed",err:error});
                            return
                        }
                        results[i].totalquestion=results1[0].totalquestion;
        
                        if(i === results.length-1){
                            res.send({status:"ok",res:results});
                        }
                    })
                })
            })
        }

    })
}



export function deletAllQuestion(req,res,next){
    const {eId,uId}=req.params;
    connection.query("delete from attemptedquestion where examId=? and uId=?",[eId,uId],(err,results,fields)=>{
        if(err){
            console.log(err)
            res.status(409).send({status:"failed",err:error});
        }
        connection.query("delete from result where examId=? and uId=?",[eId,uId],(err,results,fields)=>{
            if(err){
                console.log(err)
                res.status(409).send({status:"failed",err:error});
            }
            console.log("------deleted------")
            res.send({status:"ok",res:results});
        })
    })
}