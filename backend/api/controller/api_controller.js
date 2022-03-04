//CONTROLLERS ARE THE ONES WHO DIRECTLY CONNECT TO THE DATABASE. IN SHORT, THIS IS WHERE WE
//SHOULD PUT OUR QUERIES AND WHERE WE SHOULD VALIDATE REQUESTS AND SEND RESPONSE



//HERE: REQUIRE MEANS IMPORTING OUR CODES FROM ANOTHER FILE
//SO WE IMPORT OUR CONNECTION OF DB AND STORE IT IN A CONSTANT VARIABLE 'db'
const db = require('../model/db_conn');

//THIS IS THE CODE FOR GETTING ALL THE DATA FROM THE DATABASE.
//WE HAVE TO USE THE KEYWORD 'exports' IN ORDER TO BE ABLE TO IMPORT THESE IN OUR OTHER FILES.
//THEN 'getAllData' WILL BE THE FUNCTION NAME
//THE PARAMETERS req MEANS REQUEST, res MEANS response, AND NEXT FOR A FUNCTION
//THOUGH I RARELY USE NEXT()

//WONDERING WHAT => MEANS? IT MEANS FUNCTION.. YUP, INSTEAD OF WRITING
//function getAllData(req, res, next){}... YOU CAN REPLACE IT WITH getAllData=(req,res, next)=>{}
exports.getAllData= (req, res, next)=>{
    //LET ALSO MEANS VAR. YOU CAN ALSO USE VAR IN THIS SITUATION.
    //req.query.table MEANS THE VALUE THE CLIENT PLACED ON THE QUERY PARAMS
    //WHAT QUERY PARAMS DO I MEAN? HAVE YOU SEEN LINKS/URL ON THE WEB LIKE THIS:
    //https://www.something.com/users?1067899999
    //QUERY PARAMS WOULD BE PART: /users?1067899999
    //A query string is a part of a uniform resource locator (URL) that assigns values to specified parameters
    //WHATEVER THE VALUE PLACED AFTER THE /table? PART OF THE URL IS WHAT variable 'table'
    //WILL HAVE.
    //IF THE URL LOOKS LIKE THIS ==> /table?something_tbl, THEN variable table = something_tbl
    let table = req.query.table

    //SO IF table is empty or undefined.. meaning the query string looks like this: /table?
    //THE API WILL SEND A RESPONSE.. 
    //res.status(500) ==> MEANS WHAT STATUS WOULD YOU LIKE FOR YOUR RESPONSE.
    //.json({}) ==> THE CLIENT WILL SEE AS THE RESPONSE MESSAGE.
    //SO IF THE CLIENT REQUESTED FOR /table?
    //THE API WILL RESPOND WITHE 500 STATUS, AND A RESPONSE BODY WITH A JSON DATA
    if (table == "" || table == undefined){
        res.status(500).json({
            successful: false,
            message: "Missing table name"
        })
    }
    else{
        //search_sql IS WHERE WE PUT OUR SQL QUERY.
        //${} MEANS THAT WE CAN USE ANY VARIABLE TO MAKE THE QUERY DYNAMIC.
        let search_sql = `SELECT * FROM ${table} `;
        //db.query ==> YOU REMEMBER THE CONSTANT VARIABLE ON THE TOP? THAT'S THE 'db'
        //.query MEANS WE ARE SENDING QUERY TO OUR DATABASE.
        //.query HAS TWO PARAMETERS, THE QUERY ITSELF, AND A CALLBACK FUNCTION
        //search_sql ==> VARIABLE WHICH CONTAINS THE QUERY
        //(ERR, ROWS, RESULT)=>{} IS THE CALLBACK 'FUNCTION'
        db.query(search_sql, (err, rows, result)=>{
            //IF THERE IS SOMETHING WRONG WITH THE CONNECTION TO THE DATABASE
            if(err){
                console.log(JSON.stringify(err))
            res.status(500).json({
                successful: false,
                message: "No such table"
                });
            }
            //THIS MEANS A SUCCESSFUL QUERY
            else{
                //TAKE NOTE THAT MYSQL SENDS RESULTS IN A ROWS
                if (rows.length == 0){
                    res.status(200).send({
                        successful: true,
                        message: "No data found",
                        data: []
                    });
                }
                else{
                    res.status(200).send({
                        successful: true,
                        message: `Found results (${rows.length})`,
                        data: rows
                    });
                }
                
            }
        })
    }
    
}

exports.getDataByCol= (req, res, next)=>{
    let table = req.query.table
    //NOW WE HAVE A DIFFERENT REQ.
    //req.body.data MEANS THAT THE VALUE WILL BE FOUND ON THE BODY PART OF THE REQUEST.
    //THE BODY OF THE REQUESTS/THE 'PAYLOAD' ARE USUALLY HIDDEN TO THE USER UNLIKE THE 
    //QUERY PARAMS.
    let table_col = req.body.data

    //THESE CODES ARE ONLY FOR VALIDATION
    if (table == "" || table == undefined){
        res.status(500).json({
            successful: false,
            message: "Missing table name"
        })
    }
    else if (table_col == "" || table_col == undefined){
        res.status(500).json({
            successful: false,
            message: "No table columns included."
        })
    }
    else{
        //getWhereStatement IS A FUNCTION SINCE I REUSE THIS CODE IN OTHER CONTROLLER FUNCTIONS.
        //YOU CAN VIEW FIRST THE FUNCTION.
        //REMEMBER THE callback(whereStatement) IN getWhereStatement? 
        //IT ONLY MEANS THAT IT WILL EXECUTE WHATEVER FUNCTION YOU PUT IN THE SECOND PARAMETER
        getWhereStatement(table_col, function(whereStatement){
            let search_sql = `SELECT * FROM ${table} where ${whereStatement} `;
            console.log("search sql = "+search_sql)
            db.query(search_sql, (err, rows, result)=>{
                if(err){
                    console.log(JSON.stringify(err))
                res.status(500).json({
                    successful: false,
                    message: "No such table"
                    });
                }
                else{
                    if (rows.length == 0){
                        res.status(200).send({
                            successful: true,
                            message: "No data found",
                            data: []
                        });
                    }
                    else{
                        res.status(200).send({
                            successful: true,
                            message: `Found results (${rows.length})`,
                            data: rows
                        });
                    }
                    
                }
            })
        })
       
    }
    
}

exports.insertData= (req, res, next)=>{

    var table = req.query.table
    var table_data = req.body.data
    if (table == "" || table == undefined){
        res.status(500).json({
            successful: false,
            message: "Missing table name"
        })
    }
    else if (table_data == "" || table_data == undefined){
        res.status(400).json({
            successful: false,
            message: "No table data included."
        })
    }
    else{
        let insert_sql = `INSERT INTO ${table} SET ?`;
        console.log("insert data = "+insert_sql)
        //INSERT QUERY IS DIFFERENT FROM OTHER QUERIES AS IT HAS THREE PARAMETERS
        //THE INSERT QUERY, TABLE COL VALUES, AND THE CALLBACK FUNCTION
        db.query(insert_sql, table_data, (err, result)=>{
            if(err){
                res.status(500).json({
                        successful: false,
                        message: err
                    });
            }
            else{
                res.status(200).json({
                    successful: true,
                    message: "Successfully inserted data"
                });
            }
        });
    }
}

    exports.updateById=(req, res, next)=>{
        var table = req.query.table
        var table_data = req.body.updateValues
        var table_id = req.body.idData
        var whereStatement = ""
        var setStatement = ""

        if (table == "" || table == undefined){
            res.status(500).json({
                successful: false,
                message: "Missing table name"
            })
        }
        else if (table_data == "" || table_data == undefined){
            res.status(400).json({
                successful: false,
                message: "No table data included."
            })
        }
        else if (table_id == "" || table_id == undefined){
            res.status(400).json({
                successful: false,
                message: "No table id included."
            })
        }
        else{
            for (var i in table_data){
                var val = `${table_data[i].table_val}`
                //THIS CODE MEANS THAT IF THE VALUE SHOULD BE A STRING, ADD A ''
                if (table_data[i].isString == true){
                    val = `'${table_data[i].table_val}'`
                }
                
                setStatement += `${table_data[i].table_col} = ${val}`
                if (table_data.length > 1 && i < table_data.length-1){
                    setStatement += `, `
                }
            }
            for (var i in table_id){
                value = ""
                if (table_id[i].isString == true){
                    
                    if (table_id[i].case_sensitive == true){
                        operator = ` = `
                        value = `'${table_id[i].col_val}'`
                    }
                    else{
                        operator = ` LIKE '%${table_id[i].col_val}%'`;
                        value = ""
                    }
                }
                else{
                    value = `${table_id[i].col_val}`
                    operator = ` = `
                }
    
                
                whereStatement += `${table_id[i].col_name}${operator}${value}`
                if (table_id.length > 1 && i < table_id.length-1){
                    whereStatement += ` AND `
                }
            }
            let update_sql = `UPDATE ${table} SET ${setStatement} WHERE ${whereStatement}`;
            console.log("update sql = "+update_sql)
            db.query(update_sql, (err, rows, result)=>{
                if(err){
                res.status(500).json({
                        successful: false,
                        message: err
                    });
                }
                else{
                    if (rows.affectedRows == 0){
                        res.status(200).send({
                            successful: true,
                            message: "no matched data to update"
                
                         
                        });
                    }
                    else{
                        res.status(200).send({
                            successful: true,
                            message: "successfully updated data"
                        });
                    }
                    
                }
            
            });
        }
        
}

exports.clearData= (req, res, next)=>{

    var table = req.query.table

    if (table == "" || table == undefined){
        res.status(500).json({
            successful: false,
            message: "Missing table name"
        })
    }

    else{
        let delete_sql = `DELETE FROM ${table}`;
        console.log("DELETE query = "+delete_sql)
        db.query(delete_sql,  (err, rows, result)=>{
            if(err){
                res.status(500).json({
                        successful: false,
                        message: err
                    });
            }
            else{
                res.status(200).json({
                    successful: true,
                    message: "Successfully cleared table"
                });
            }
        });
    }
}


exports.deleteByCol= (req, res, next)=>{
    let table = req.query.table
    let table_col = req.body.data
    
   
    if (table == "" || table == undefined){
        res.status(500).json({
            successful: false,
            message: "Missing table name"
        })
    }
    else if (table_col == "" || table_col == undefined){
        res.status(500).json({
            successful: false,
            message: "No table column/s included."
        })
    }
    else{
        getWhereStatement(table_col, function(whereStatement){
            let delete_sql = `DELETE FROM ${table} WHERE ${whereStatement} `;
        console.log("delete sql = "+delete_sql)
        db.query(delete_sql, (err, rows, result)=>{
            if(err){
                console.log(JSON.stringify(err))
            res.status(500).json({
                successful: false,
                message: "No such table"
                });
            }
            else{
                if (rows.affectedRows == 0){
                    res.status(200).send({
                        successful: true,
                        message: "no matched data to delete"
            
                     
                    });
                }
                else{
                    res.status(200).send({
                        successful: true,
                        message: "successfully deleted data"
                    });
                }
                
            }
        })
        })
        
        
    }
    
}

//THIS IS THE getWhereStatement FUNCTION. IT HAS TWO PARAMS, table_col AND callback
function getWhereStatement(table_col, callback){
    var whereStatement = ""
    var value, operator
    //MANIPULATION OF TABLE_COL WHICH IS A JSON
    for (var i in table_col){
        value = ""
        //IF THE COL HAS A STRING VALUE
        if (table_col[i].isString == true){
            //IF THE COLUMN VALUE SHOULD BE CASE SENSITIVE, OF COURSE THE QUERY SHOULD BE =
            if (table_col[i].case_sensitive == true){
                operator = ` = `
                value = `'${table_col[i].col_val}'`
            }
            //IF THE CASE SHOULD NOT MATTER, USE LIKE
            else{
                operator = ` LIKE '%${table_col[i].col_val}%'`;
                value = ""
            }
        }
        //FOR NUMBERS
        else{
            value = `${table_col[i].col_val}`
            operator = ` = `
        }

        
        whereStatement += `${table_col[i].col_name}${operator}${value}`
        if (table_col.length > 1 && i < table_col.length-1){
            whereStatement += ` and `
        }
    }
    //THEN THIS CALLBACK MEANS 'GO BACK TO WHAT FUNCTION CALLED THIS getWhereStatement'
    callback(whereStatement)
    console.log("where statement = "+whereStatement)
}