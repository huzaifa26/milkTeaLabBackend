import { connection } from "../index.js";

export const addTraining=(req,res,next)=>{
    const {title,description,datetime,video}=req.body;

    connection.query("INSERT INTO training (title,description,createdTime,video) VALUES (?,?,?,?)",[title,description,datetime,video],(error, results, fields)=>{
        if(error){
            console.log(error);
            res.status(409).send({status:"failed",err:error});
            return
        }
        
        res.send({status:"ok",res:results});
    })
}

export const getTraining=(req,res,next)=>{
    const {uid}=req.params;

    connection.query("select * from training ORDER BY createdTime DESC",(error, results, fields)=>{
        if(error){
            res.status(409).send({status:"failed",err:error});
            return
        }
        for (let i=0; i<results.length;i++){
            connection.query("select * from videoProgress where uId=? and vId=?",[uid,results[i].id],(error, results1, fields)=>{
                if(error){
                    res.status(409).send({status:"failed",err:error});
                    return
                }
                console.log("results1")
                if(results1.length>0){
                    results[i].progress=results1[0].progress
                }else if(results1.length === 0) results[i].progress= 0


                if(i === results.length-1){
                    console.log(results);
                    res.send({status:"ok",res:results});
                }
            })
        }
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
        
        res.send({status:"ok",res:results});
    })
}




export const addVideoProgress=(req,res,next)=>{
    const {uId,vId,progress}=req.body;
    console.log(progress)
    connection.query("select * from videoProgress where uId=? and vId=?",[uId,vId],(error, results, fields)=>{
        if(error){
            console.log(error);
            res.status(409).send({status:"failed",err:error});
            return
        }

        if(results.length>0){
            if(+progress < +results[0].progress) {
                console.log("exiting")    
                return
            }
        }

        if(results.length === 0){
            console.log("inserting");
            connection.query("INSERT INTO videoProgress (uId,vId,progress) VALUES (?,?,?)",[uId,vId,progress],(error, results, fields)=>{
                if(error){
                    console.log(error);
                    res.status(409).send({status:"failed",err:error});
                    return
                }
                res.send({status:"ok",res:results});
            })
        }else if(results.length>0){
            console.log("updating");
            connection.query("UPDATE videoProgress set progress=? where uId=? and vId=?",[progress,uId,vId],(error, results, fields)=>{
                if(error){
                    console.log(error);
                    res.status(409).send({status:"failed",err:error});
                    return
                }
                res.send({status:"ok",res:results});
            })
        }
    })


}