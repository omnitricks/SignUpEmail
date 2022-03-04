//LIST OF ALL DEPENDENCIES: START
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

//WE IMPORT THE api_router FILE HERE
let apiRoutes = require('./api/routes/api_router')

//DEPENDENCY MIDDLEWARES: START
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//FOR CORS HANDLING OF HEADERS --> THIS ALLOWS ALL ORIGIN AND HEADERS TO BE ACCEPTED. SO IN SHORT,
//CLIENT CAN MAKE ALL REQUESTS
app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");

    if (req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(consts.STATUS.OK).json({});
    }
    next();
})

//LIST ALL ROUTES: START
app.use('/api', apiRoutes);
//LIST ALL ROUTES: END


//ERROR MIDDLEWARE : START
app.use((req, res, next)=>{
    const error = new Error('Not Found');
    error.status = consts.STATUS.NOT_FOUND;
    next(error);
}); //this code handles requests from unknown endpoints


app.use((error, req, res, next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    })
}); //this code handles error from requests that cannot be handled from the above code.
//Take note that javascript reads code asynchronously. Unless stated by a callback or a promise,
//javascript will execute codes from top to bottom.
//ERROR MIDDLEWARE : END

module.exports = app; // THIS LINE IS THE MOST SIGNIFICANT CODE HERE SINCE IT ALLOWS OTHER JS FILES TO ACCESS APP.JS
//MODULE.EXPORTS IS A NODE BUILT-IN FUNCTION. I DIDN'T MAKE THIS UP. 
