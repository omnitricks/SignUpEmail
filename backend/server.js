const http = require('http');
 //importing http module since we need one of its built in function.
//Then we set it to the constant variable http. Now, the variable http can be used to access
//all of http functions.
let consts = require('./api/const')
const app = require('./app'); //This line of code imports the whole app.js module so we can access
//its functions. app is very important as it is the middleware of the server to the function
//code of our system.
const server = http.createServer(app); //this means that we have created a server for the app
//module.
server.listen(consts.PORT, ()=>{
    console.log(`Listening to port: ${consts.PORT}`);

}); // then we declare here that whenever a client makes a request to the host, then the server
//will listen to it. We log the result to make sure that our server is up and running.

//Note: developers have OBLIGATION to log the results. console.log() is a powerful line
//that enables easy debugging to fix errors. So make use of console.log(). It is created
//for a wonderful purpose.

//It is also important to write comments like these texts in green. This is to let you, and
//other developers to know the function of the code without analyzing your code.
//Because, let's admit it. Codes in development process can be a bit messy.

