import { connection } from "../index.js";

export const addAnnouncement=(req,res,next)=>{
    const {title,description,body,datetime}=req.body;
    console.log(req.body);

    connection.query("INSERT INTO announcement (title,description,body,publishedTime) VALUES (?,?,?,?)",[title,description,body,datetime],(error, results, fields)=>{
        if(error){
            console.log(error);
            res.status(409).send({status:"failed",err:error});
            return
        }
        
        res.send({status:"ok",res:results});
    })
}

export const getAnnouncement=(req,res,next)=>{
    const {uid}=req.params;
    connection.query("select * from announcement ORDER BY publishedTime DESC",(error, results, fields)=>{
        if(error){
            console.log(error);
            res.status(409).send({status:"failed",err:error});
            return
        }
        
        for(let i=0; i<results.length;i++){
            connection.query("select * from openedAnnouncement where aId=? and uId=?",[results[i].id,uid],(error, results1, fields)=>{
                if(error){
                    console.log(error);
                    res.status(409).send({status:"failed",err:error});
                    return
                }
                if(results1.length>0){
                    results[i].isOpened=true;
                }else if(results1.length===0){
                    results[i].isOpened=false;
                }
                if(i===results.length-1){
                    res.send({status:"ok",res:results});
                }
            })
        }
    })
}


export const updateAnnouncement=(req,res,next)=>{
    const {id,title,description,body,datetime}=req.body;

    connection.query("UPDATE announcement SET title=?,description=?,body=?,publishedTime=? where id=?",[title,description,body,datetime,id],(error, results, fields)=>{
        if(error){
            console.log(error);
            res.status(409).send({status:"failed",err:error});
            return
        }
        
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
        
        res.send({status:"ok",res:results});
    })
}

export const markAccouncementAsRead=(req,res)=>{
    const {uid,aid}=req.body;
    console.log(uid,aid);
    connection.query("select * from openedAnnouncement where uId=? and aId=?",[uid,aid],(error,results,fields)=>{
        if(error){
            console.log("----------0-------------")
            console.log(error);
            res.status(409).send({status:"failed",err:error});
            return
        }
        if(results.length === 0){
            console.log("----------1-------------")
            connection.query("INSERT into openedAnnouncement (uId,aId) values(?,?)",[uid,aid],(error,results,fields)=>{
                if(error){
                console.log("----------2-------------")

                    console.log(error);
                    res.status(409).send({status:"failed",err:error});
                    return
                }
                console.log("INSERTING")
                res.send({status:"ok",res:results});
            })
        }else if(results.length > 0){
            console.log("----------3-------------")
            res.send({status:"ok",res:"Record Already Exists"});
        }
    })
}