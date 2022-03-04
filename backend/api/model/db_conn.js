//THIS IS THE CONNECTION SETUP PART FOR YOUR DB

//require('mysql') IS DIFFERENT FROM require('../const')
//mysql IS A DEPENDENCY WE IMPORTED FROM THE npm install --save COMMAND
//WHILE THE CONST THERE IS AN IMPORTED FILE
const mysql = require ('mysql');
let consts = require('../const')

let db = mysql.createConnection({
    //YOU CAN FIND THE VALUE OF THIS IN THE const.js
    host : consts.DATABASE.host,
    user : consts.DATABASE.user,
    database : consts.DATABASE.schema_name
});
//.connect IS PART OF THE KEYWORD FOR MYSQL. I DID NOT INVENT THIS ONE.
//.connect IS FOR.. CORRECT! FOR CONNECTING TO THE MYSQL DATABASE!
db.connect((err) => {
    if(err){
        throw err;
    }
    else{
        console.log('MySql Connected');
    }
    
});

module.exports = db;