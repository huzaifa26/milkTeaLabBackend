import { connection } from "../index.js";

export const addExam=(req,res,next)=>{
    const {title,description,datetime}=req.body;

    connection.query("INSERT INTO exam (title,description,createdTime) VALUES (?,?,?)",[title,description,datetime],(error, results, fields)=>{
        if(error){
            console.log(error);
            res.status(409).send({status:"failed",err:error});
            return
        }
        console.log(results);
        res.send({status:"ok",res:results});
    })
}

export const getExam=(req,res,next)=>{

    connection.query("select * from exam ORDER BY createdTime DESC",(error, results, fields)=>{
        if(error){
            console.log(error);
            res.status(409).send({status:"failed",err:error});
            return
        }
        console.log(results);
        res.send({status:"ok",res:results});
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
        console.log(results);
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
        console.log(results);
        res.send({status:"ok",res:results});
    })
}