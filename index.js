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

export var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'milktealab',
  });

// connection.connect(function(err) {
//     if (err) {
//       console.error('error connecting: ' + err.stack);
//       return;
//     }
//     console.log('connected as id ' + connection.threadId);
// });

app.use('/api', router);

app.listen(5000, () => {
    console.log(`App started on Port ${process.env.PORT}`);
});