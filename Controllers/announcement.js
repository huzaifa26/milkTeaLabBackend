import { connection } from "../index.js";

export const addAnnouncement=(req,res,next)=>{
    const {title,description,datetime}=req.body;

    connection.query("INSERT INTO announcement (title,description,publishedTime) VALUES (?,?,?)",[title,description,datetime],(error, results, fields)=>{
        if(error){
            console.log(error);
            res.status(409).send({status:"failed",err:error});
            return
        }
        console.log(results);
        res.send({status:"ok",res:results});
    })
}

export const getAnnouncement=(req,res,next)=>{

    connection.query("select * from announcement ORDER BY publishedTime DESC",(error, results, fields)=>{
        if(error){
            console.log(error);
            res.status(409).send({status:"failed",err:error});
            return
        }
        console.log(results);
        res.send({status:"ok",res:results});
    })
}


export const updateAnnouncement=(req,res,next)=>{
    const {id,title,description,datetime}=req.body;

    connection.query("UPDATE announcement SET title=?,description=?,publishedTime=? where id=?",[title,description,datetime,id],(error, results, fields)=>{
        if(error){
            console.log(error);
            res.status(409).send({status:"failed",err:error});
            return
        }
        console.log(results);
        res.send({status:"ok",res:results});
    })
}

export const deleteAnnouncement=(req,res,next)=>{
    const {id}=req.params;

    connection.query("delete from announcement where id=?",[id],(error, results, fields)=>{
        if(error){
            console.log(error);
            res.status(409).send({status:"failed",err:error});
            return
        }
        console.log(results);
        res.send({status:"ok",res:results});
    })
}