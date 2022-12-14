import { connection } from "../index.js";

export const addMessage=(req,res,next)=>{
    const {cId,sId,message,createdTime,url}=req.body;

    connection.query("INSERT INTO message (cId,sId,message,createdTime,url) VALUES (?,?,?,?,?)",[cId,sId,message,createdTime,url],(error, results, fields)=>{
        if(error){
            console.log(error);
            res.status(409).send({status:"failed",err:error});
            return
        }
        
        res.send({status:"ok",res:results});
    })
}

export const getMessage=(req,res,next)=>{
    const {cId}=req.params;
    connection.query("select * from message where cId=?",[cId],(error, results, fields)=>{
        if(error){
            console.log(error);
            res.status(409).send({status:"failed",err:error});
            return
        }
        res.send({status:"ok",res:results});
    })
}