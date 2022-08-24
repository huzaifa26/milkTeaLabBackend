import express from 'express';
import cors from 'cors';
import mysql from 'mysql';
import router from './Routes/routes.js';
import dotenv from 'dotenv';

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,
    optionSuccessStatus:200
}

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors(corsOptions));

// export var connection = mysql.createConnection({
//     host     : 'localhost',
//     user     : 'root',
//     password : 'root',
//     database : 'milktealab',
//   });
  
export var connection = mysql.createConnection({
    host     : '35.206.112.94',
    user     : 'u9rxwgdcttirs',
    password : 'uwcvkxbwkysz',
    database : 'dbioubfx6ghrre',
  });

// export var connection = mysql.createConnection({
//   host     : process.env.HOSTNAME,
//   user     : process.env.USERNAME,
//   password : process.env.PASSWORD,
//   database : process.env.DATABASENAME,
// });

connection.connect(function(err) {
    if (err) {
      console.log('error connecting');
      // return;
    }
    console.log('connected as id ' + connection.threadId);
});


app.get("/",(req,res)=>{
  res.send("working")
})

app.use('/api', router);

app.listen(process.env.PORT || 5000, ()=>{
    console.log("App running on port:"+process.env.PORT);
});
