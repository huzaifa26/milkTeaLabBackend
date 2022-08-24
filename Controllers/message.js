import { connection } from "../index.js";

export const addMessage=(req,res,next)=>{
    const {cId,sId,message,createdTime}=req.body;
    console.log(req.body);

    connection.query("INSERT INTO message (cId,sId,message,createdTime) VALUES (?,?,?,?)",[cId,sId,message,createdTime],(error, results, fields)=>{
        if(error){
            console.log(error);
            res.status(409).send({status:"failed",err:error});
            return
        }
        console.log(results);
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
        console.log("cId")
        console.log(cId)
        console.log(results)
        res.send({status:"ok",res:results});
    })
}