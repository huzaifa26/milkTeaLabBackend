import { connection } from "../index.js";

export const getUser=(req,res,next)=>{

    connection.query("select * from user",(error, results, fields)=>{
        if(error){
            console.log(error);
            res.status(409).send({status:"failed",err:error});
            return
        }
        
        res.send({status:"ok",res:results});
    })
}

export const changeRole=(req,res)=>{
    const {role,id}=req.body;
    connection.query("UPDATE user SET role=? where id=?",[role,id],(error, results, fields)=>{
        if(error){
            console.log(error);
            res.status(409).send({status:"failed",err:error});
            return
        }
        
        res.send({status:"ok",res:results});
    })
}

export const assignManager=(req,res)=>{
    const {uId,mId}=req.body;

    connection.query("update user set assignedManager=? where id=?",[uId,mId],(error, results, fields)=>{
        if(error){
            console.log(error);
            res.status(409).send({status:"failed",err:error});
            return
        }
        
        res.send({status:"ok",res:results});
    })
}

export const getManagers=(req,res)=>{
    const {uId,mId}=req.body;
    connection.query("select * from user where role='manager'",(error, results, fields)=>{
        if(error){
            console.log(error);
            res.status(409).send({status:"failed",err:error});
            return
        }
        
        res.send({status:"ok",res:results});
    })
}