import { connection } from "../index.js";

export const addConversation=(req,res,next)=>{
    const {senderId,revieverId,createdTime}=req.body;

    connection.query("INSERT INTO conversation (mId,m2Id,createdTime) VALUES (?,?,?)",[senderId,revieverId,createdTime],(error, results, fields)=>{
        if(error){
            console.log(error);
            res.status(409).send({status:"failed",err:error});
            return
        }
        console.log(results);
        res.send({status:"ok",res:results});
    })
}

export const getConversation=(req,res,next)=>{
    const {uId}=req.params;
    connection.query("select * from conversation where mId=? or m2Id=?;",[uId,uId],(error, results, fields)=>{
        if(error){
            res.status(409).send({status:"failed",err:error});
            return
        }

        console.log("conversations of huzaifa -----------------------------------");
        console.log(results)

        let conv=results
        let newArr=[];
        for (let i=0;i<conv.length;i++){
            let otheruser;
            if(+results[i].mId !== +uId){
                otheruser=conv[i].mId
            }
            if(+results[i].m2Id !== +uId){
                otheruser=conv[i].m2Id
            }
            connection.query("select * from user where id=?",otheruser,(error, results1, fields)=>{
                if(error){
                    console.log(error);
                    res.status(409).send({status:"failed",err:error});
                    return
                }
                let arr=[conv[i],results1[0]];
                newArr.push(arr)
                if(i===conv.length-1){
                    console.log("conversation user of huzaifa")
                    console.log(newArr);
                    res.send({status:"ok",res:newArr});
                }
            })
            
        }
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

// qgy#&ic#ex4^