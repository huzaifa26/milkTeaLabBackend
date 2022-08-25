import { connection } from "../index.js";

export const addExam=(req,res,next)=>{
    const {title,description,datetime}=req.body;

    connection.query("INSERT INTO exam (title,description,createdTime) VALUES (?,?,?)",[title,description,datetime],(error, results, fields)=>{
        if(error){
            console.log(error);
            res.status(409).send({status:"failed",err:error});
            return
        }
        
        res.send({status:"ok",res:results});
    })
}

export const getExam=(req,res,next)=>{
    const {uid}=req.params;
    connection.query("select * from exam",(error, results, fields)=>{
        if(error){
            console.log(error);
            res.status(409).send({status:"failed",err:error});
            return
        }

        for (let i=0;i<results.length;i++){
            connection.query("select COUNT(qId) as attemptedquestion from attemptedquestion where examId=? and uId=?",[results[i].id,uid],(error, results1, fields)=>{
                if(error){
                    console.log(error);
                    res.status(409).send({status:"failed",err:error});
                    return
                }
                results[i].attemptedQuestions=results1[0].attemptedquestion;

                connection.query("select COUNT(question) as totalquestion from question where examId=?",[results[i].id],(error, results1, fields)=>{
                    if(error){
                        console.log(error);
                        res.status(409).send({status:"failed",err:error});
                        return
                    }
                    results[i].totalquestion=results1[0].totalquestion;
                    
                    connection.query("select result from result where examId=? and uId",[results[i].id,uid],(error, results1, fields)=>{
                        if(error){
                            console.log(error);
                            res.status(409).send({status:"failed",err:error});
                            return
                        }
                        if(results1.length>0){
                            results[i].result=results1[0].result;
                        }else if(results1.length===0){
                            results[i].result=0;
                        }
                        
                        if(i === results.length-1){
                            console.log("------------------results---------------------")
                            console.log(results)
                            res.send({status:"ok",res:results});
                        }
                    })
                })
            })
        }
    })
}


export const updateExam=(req,res,next)=>{
    const {id,title,description,datetime}=req.body;

    connection.query("UPDATE exam SET title=?,description=?,createdTime=? where id=?",[title,description,datetime,id],(error, results, fields)=>{
        if(error){
            console.log(error);
            res.status(409).send({status:"failed",err:error});
            return
        }
        
        res.send({status:"ok",res:results});
    })
}

export const deleteExam=(req,res,next)=>{
    const {id}=req.params;

    connection.query("delete from exam where id=?",[id],(error, results, fields)=>{
        if(error){
            console.log(error);
            res.status(409).send({status:"failed",err:error});
            return
        }
        
        res.send({status:"ok",res:results});
    })
}


