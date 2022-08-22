import { connection } from "../index.js";

export const addTraining=(req,res,next)=>{
    const {title,description,datetime,video}=req.body;

    connection.query("INSERT INTO training (title,description,createdTime,video) VALUES (?,?,?,?)",[title,description,datetime,video],(error, results, fields)=>{
        if(error){
            console.log(error);
            res.status(409).send({status:"failed",err:error});
            return
        }
        console.log(results);
        res.send({status:"ok",res:results});
    })
}

export const getTraining=(req,res,next)=>{

    connection.query("select * from training ORDER BY createdTime DESC",(error, results, fields)=>{
        if(error){
            res.status(409).send({status:"failed",err:error});
            return
        }
        console.log(results);
        res.send({status:"ok",res:results});
    })
}


export const updateTraining=(req,res,next)=>{
    const {id,title,description,datetime,video}=req.body;

    connection.query("UPDATE training SET title=?,description=?,createdTime=?,video=? where id=?",[title,description,datetime,video,id],(error, results, fields)=>{
        if(error){
            console.log(error);
            res.status(409).send({status:"failed",err:error});
            return
        }
        console.log(results);
        res.send({status:"ok",res:results});
    })
}


export const deleteTraining=(req,res,next)=>{
    const {id}=req.params;

    connection.query("delete from training where id=?",[id],(error, results, fields)=>{
        if(error){
            console.log(error);
            res.status(409).send({status:"failed",err:error});
            return
        }
        console.log(results);
        res.send({status:"ok",res:results});
    })
}