import { connection } from "../index.js";

export const getUser=(req,res,next)=>{

    connection.query("select * from user",(error, results, fields)=>{
        if(error){
            console.log(error);
            res.status(409).send({status:"failed",err:error});
            return
        }
        console.log(results);
        res.send({status:"ok",res:results});
    })
}
