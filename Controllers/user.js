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

export const updataUser=(req,res,next)=>{
    const {id}=req.params;
    console.log(id);
    const {userName,image,oldpass,newpass,phone,mailingAddress,desiredLocation}=req.body;

    if(oldpass !== null){
        connection.query("select * from user where id=?",+id,(error, results, fields)=>{
            if(error){
                console.log(error);
                res.status(409).send({status:"failed",err:error});
                return
            }
            if(oldpass === results[0].pass){
                connection.query("Update user set userName=?,image=?,pass=?,phone=?,mailingAddress=?,desiredLocation=? where id=?",[userName,image,newpass,phone,mailingAddress,desiredLocation,+    id],(error, results, fields)=>{
                    if(error){
                        console.log(error);
                        res.status(409).send({status:"failed",err:error});
                        return
                    }
                    res.send({status:"ok",res:results});
                })
            }else if(oldpass !== results[0].pass){
                res.send({status:"failed",res:"password doesnot match"});
                return
            }
            // res.send({status:"ok",res:results});
        })
    } else {
        connection.query("Update user set userName=?,image=?,phone=?,mailingAddress=?,desiredLocation=? where id=?",[userName,image,phone,mailingAddress,desiredLocation,+id],(error, results, fields)=>{
            if(error){
                console.log(error);
                res.status(409).send({status:"failed",err:error});
                return
            }
            
            res.send({status:"ok",res:results});
        })
    }
}


export const getSignedUser=(req,res,next)=>{
    const {id}=req.params;
    connection.query("select * from user where id=?",[+id],(error, results, fields)=>{
        if(error){
            console.log(error);
            res.status(409).send({status:"failed",err:error});
            return
        }
        console.log(results);
        res.send({status:"ok",res:results});
    })
}