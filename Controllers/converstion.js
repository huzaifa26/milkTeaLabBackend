import { connection } from "../index.js";

export const addConversation=(req,res,next)=>{
    const {senderId,revieverId,createdTime}=req.body;

    connection.query("INSERT INTO conversation (mId,m2Id,createdTime) VALUES (?,?,?)",[senderId,revieverId,createdTime],(error, results, fields)=>{
        if(error){
            console.log(error);
            res.status(409).send({status:"failed",err:error});
            return
        }
        
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
                    res.send({status:"ok",res:newArr});
                }
            })
        }
    })
}

export const getSingleConversation=(req,res,next)=>{
    const {uId,rId}=req.params;
    connection.query("select * from conversation where mId=? and m2Id=?;",[uId,rId],(error, results, fields)=>{
        if(error){
            res.status(409).send({status:"failed",err:error});
            return
        }

        // Execution of second query
        if(results.length === 0) {
            connection.query("select * from conversation where mId=? and m2Id=?;",[rId,uId],(error, results, fields)=>{
                if(error){
                    res.status(409).send({status:"failed",err:error});
                    return
                }

                if(results.length === 0){
                    res.send({status:"ok",res:[]})
                }
                
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
                            res.send({status:"ok",res:newArr});
                        }
                    })
                    
                }
                return
            })
        }else if (results.length >0){

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
            console.log(otheruser)
            connection.query("select * from user where id=?",otheruser,(error, results1, fields)=>{
                if(error){
                    console.log(error);
                    res.status(409).send({status:"failed",err:error});
                }

                let arr=[conv[i],results1[0]];
                newArr.push(arr)
                if(i===conv.length-1){
                    res.send({status:"ok",res:newArr});
                }
            })
            
        }
    }
})



}
export const getMonitorConversation=(req,res,next)=>{
    const {uId}=req.params;
    connection.query("SELECT * FROM conversation WHERE mId != 1 AND m2Id != 1;",[uId,uId],(error, results, fields)=>{
        if(error){
            res.status(409).send({status:"failed",err:error});
            return
        }

        let mConv=results
        let newArr=[]
        for (let i=0;i<mConv.length;i++){
            connection.query("SELECT id,firstName,lastName,role,assignedManager FROM user WHERE (id = ?) OR (id = ?);",[mConv[i].mId,mConv[i].m2Id],(error, results1, fields)=>{
                if(error){
                    console.log(error);
                    res.status(409).send({status:"failed",err:error});
                    return
                }

                if(results1[0].role==="admin" && results1[1].role==="admin"){
                    // do nothing
                } else  if(results1[0].role !== "admin" && results1[1].role !== "admin"){
                    console.log(mConv[i].m2Id);
                    console.log(results1[0].assignedManager)
                    if((results1[0].assignedManager === mConv[i].m2Id || results1[0].assignedManager === mConv[i].mId) || (results1[1].assignedManager === mConv[i].m2Id || results1[1].assignedManager === mConv[i].mId)){
                        console.log("----------------------------1----------------------------");
                        console.log(mConv[i],results1)
                        mConv[i].users=results1
                        newArr.push(mConv[i]);
                    }
                }
                
                if(i===mConv.length-1){
                    console.log(newArr);
                    res.send({status:"ok",res:newArr});
                }
            })
        }
    })
}