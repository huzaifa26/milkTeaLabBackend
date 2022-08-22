import { connection } from "../index.js";

export const addMaterial=(req,res,next)=>{
    const {title,description,datetime,file}=req.body;

    connection.query("INSERT INTO material (title,description,createdTime,file) VALUES (?,?,?,?)",[title,description,datetime,file],(error, results, fields)=>{
        if(error){
            console.log(error);
            res.status(409).send({status:"failed",err:error});
            return
        }
        console.log(results);
        res.send({status:"ok",res:results});
    })
}

export const getMaterial=(req,res,next)=>{

    connection.query("select * from material ORDER BY createdTime DESC",(error, results, fields)=>{
        if(error){
            res.status(409).send({status:"failed",err:error});
            return
        }
        console.log(results);
        res.send({status:"ok",res:results});
    })
}


export const updateMaterial=(req,res,next)=>{
    const {id,title,description,datetime,file}=req.body;

    connection.query("UPDATE material SET title=?,description=?,createdTime=?,file=? where id=?",[title,description,datetime,file,id],(error, results, fields)=>{
        if(error){
            console.log(error);
            res.status(409).send({status:"failed",err:error});
            return
        }
        console.log(results);
        res.send({status:"ok",res:results});
    })
}


export const deletematerial=(req,res,next)=>{
    const {id}=req.params;

    connection.query("delete from material where id=?",[id],(error, results, fields)=>{
        if(error){
            console.log(error);
            res.status(409).send({status:"failed",err:error});
            return
        }
        console.log(results);
        res.send({status:"ok",res:results});
    })
}