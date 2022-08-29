import { connection } from "../index.js";

export const signup=(req,res,next)=>{
    const {userName,email,password,phone,mailingAddress,desiredLocation,budget,question}=req.body;
    const role='member';
    connection.query("INSERT INTO user (userName,email,pass,phone,mailingAddress,desiredLocation,budget,question,role) VALUES (?,?,?,?,?,?,?,?,?)",[userName,email,password,phone,mailingAddress,desiredLocation,budget,question,role],(error, results, fields)=>{
        if(error){
            console.log(error);
            res.status(409).send({status:"failed",err:error});
            return
        }
        
        res.send({status:"ok",res:results});
    })
}

export const signin=(req,res,next)=>{
    const {email,password}=req.body;
    connection.query("select * from user where email=? and pass=?",[email,password],(error, results, fields)=>{
        if(error){
            console.log(error);
            res.status(409).send({status:"failed",err:error});
            return
        }
        
        res.send({status:"ok",res:results});
    })
}

export const forgotPasswordChange = (req, res) => {
    const {id,pass}=req.body;

connection.query("UPDATE user set pass=? where id=?",[pass,id],(err, results) => {
        if (err) {
          console.log(err);
          res.status(409).send({status:"failed",err:error});
          return
        }
        res.send({status:"ok",res:results});
      });
  };