//THIS IS WHERE YOU INTEGRATE YOUR USER INTERFACE TO THE BACKEND/API
//NOW THIS IS ALSO A READY MADE FUNCTION. ALL YOU HAVE TO DO IS RENAME THE FUNCTIONS
//AND THE PARAM VALUES. NOTHING ELSE.
//IF YOU HAVE OTHER PLANS FOR INTEGRATING OTHER THAN THIS.. THEN YOU CAN DO IT ON YOUR FREE TIME
//I AM NOT SAYING THAT YOU MAY NOT USE YOUR OWN VERSION. IN FACT, I WANT YOU TO EXPLORE JS
//SINCE IT IS A FUN LANGUAGE TO LEARN. I ALWAYS SUPPORT THOSE WHO WANT TO LEARN 
//HOWEVER, CONSIDERING THE TIME, AGAIN, THIS PERIOD IS TOO SHORT TO EVEN DO A PROJECT LIKE THIS
//BUT THIS IS WHAT THE MANAGEMENT WANTS, SO I'M SORRY FOR THIS..
//I PROMISE THAT IF YOU WANT TO TRY ON YOUR OWN AND EVEN IF I'M NOT YOUR PROFESSOR ANYMORE,
//THEN I WILL HELP YOU... IF I'M FREE.... >_<

//apiGetAllNotes function name is configurable
function apiGetAllNotes(callback){
        
   //THIS PARAM VARIABLE IS ALSO CONFIGURABLE... YOU CAN CHANGE THE VALUES OF THE KEY NAME
    let param = {
      //INDICATE WHAT KIND OF API IN THE api key
      api: "GET ALL NOTES",
      //INDICATE THE URL HERE OR WHAT THE BACKEND REQUIRES
      url: `${endpoint}/api/all?table=notes_table`,
      //content KEY CONTAINS THREE KEY-VALUE PAIR.
      //1. METHOD --> WHAT HTTP VERB THE API REQUIRES (GO TO THE ROUTER PART TO KNOW)
      //2. HEADERS --> SEE THE apiDeleteNote FUNCTION FOR ANY IDEA
      //3. BODY -- > SEE ALSO THE apiDeleteNote FOR MORE DETAILS
      content: {
        method: 'GET'
      }
    }
    //DO NOT CHANGE ANYTHING HERE:
    api_client.sendRequest(param, 60, function (status, response) {
      if (status) {
        //THIS ONE IS CONFIGURABLE. YOU CAN CHANGE THE parseGetAllNotesResponse NAME
        parseGetAllNotesResponse(response, callback)
      }
      else {
        console.log(`Failed === ${JSON.stringify(response)}`)
        callback(JSON.stringify(response))
      }
    })
    
  
}

//THIS IS THE FUNCTION CALLED AFTER A SUCCESSFUL REQUEST
function parseGetAllNotesResponse(response, callback) {
    
        
    //IF THE BACKEND RESPOND WITH A STATUS OF 200
    if (response.status === 200) {
      response.json().then(object => {
       //THIS ONE IS CONFIGURABLE. THE OBJECT KEY NAME DEPENDS ON THE API.
       //object.successful BECAUSE THE API I MADE RETURNS A successful KEY.
        var returnData = {}
         returnData["status"] = object.successful;
         returnData["message"] = object.message;
         returnData["notesData"] = object.data;
         returnData["count"] = object["data"].length;

       //NOPE. DON'T TRY TO CHANGE THIS ONE.
        JS.callback(JSON.stringify(returnData), callback)
      })
    }
    //THIS IS FOR ERROR HANDLING
    else if (response.status === 404) {
      var returnData = {}
      returnData["status"] = false
      returnData["message"] = 404;
      callback(JSON.stringify(returnData))
    }
    else {
      response.json().then(object => {
        console.log(`Failed === ${JSON.stringify(object)}`)
        var returnData = {};

        returnData["status"] = false;
        returnData["message"] = object.message;

        callback(JSON.stringify(returnData));
      })
    }
  }

function apiDeleteNote(payload, callback){

  

  console.log("JSON data ="+JSON.stringify(payload))
        
    let param = {
      api: "DELETE NOTES",
      url: `${endpoint}/api/delete?table=notes_table`,
      content: {
        method: 'DELETE',
        //REMEMBER THAT WHENEVER YOU HAVE A REQUEST BODY, YOU HAVE TO INCLUDE A HEADER FOR YOUR REQUEST
        //USUALLY IT IS 'Content-Type': 'application/json'
        headers: {
          "Content-Type": "application/json"
        },
        //THEN THIS IS WHERE YOU INDICATE THE VALUES OF YOUR REQUEST BODY
        body: JSON.stringify(payload)
      }
    }

    api_client.sendRequest(param, 60, function (status, response) {
      if (status) {
        parseDeleteNotesResponse(response, callback)
      }
      else {
        console.log(`Failed === ${JSON.stringify(response)}`)
        callback(JSON.stringify(response))
      }
    })
    
    
      
}

function parseDeleteNotesResponse(response, callback) {
    
        
    
    if (response.status === 200) {
      response.json().then(object => {
       
        var returnData = {}
         returnData["status"] = object.successful;
         returnData["message"] = object["message"];

        // console.log(JSON.stringify(returnData))
        JS.callback(JSON.stringify(returnData), callback)
        // callback(JSON.stringify(returnData));
      })
    }
    else if (response.status === 404) {
      var returnData = {}
      returnData["status"] = false
      returnData["message"] = 404;
      // JS.callback(JSON.stringify(returnData), callbackFn);
      callback(JSON.stringify(returnData))
    }
    else {
      response.json().then(object => {
        console.log(`Failed === ${JSON.stringify(object)}`)
        var returnData = {};

        returnData["status"] = false;
        returnData["message"] = object.message;

        callback(JSON.stringify(returnData));
      })
    }
  }



function apiAddNote(payload, callback){


        
    let param = {
      api: "ADD NOTES",
      url: `${endpoint}/api/insert?table=notes_table`,
      content: {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      }
    }

    api_client.sendRequest(param, 60, function (status, response) {
      if (status) {
        parseAddNotesResponse(response, callback)
      }
      else {
        console.log(`Failed === ${JSON.stringify(response)}`)
        callback(JSON.stringify(response))
      }
    })
    
    
       
}

function parseAddNotesResponse(response, callback) {
    
        
    
    if (response.status === 200) {
      response.json().then(object => {
       
        var returnData = {}
         returnData["status"] = object.successful;
         returnData["message"] = object["message"];

        // console.log(JSON.stringify(returnData))
        JS.callback(JSON.stringify(returnData), callback)
        // callback(JSON.stringify(returnData));
      })
    }
    else if (response.status === 404) {
      var returnData = {}
      returnData["status"] = false
      returnData["message"] = 404;
      // JS.callback(JSON.stringify(returnData), callbackFn);
      callback(JSON.stringify(returnData))
    }
    else {
      response.json().then(object => {
        console.log(`Failed === ${JSON.stringify(object)}`)
        var returnData = {};

        returnData["status"] = false;
        returnData["message"] = object.message;

        callback(JSON.stringify(returnData));
      })
    }
  }
function apiEditNote(payload, callback){


        
    let param = {
      api: "EDIT NOTES",
      url: `${endpoint}/api/update?table=notes_table`,
      content: {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      }
    }

    api_client.sendRequest(param, 60, function (status, response) {
      if (status) {
        parseUpdateNotesResponse(response, callback)
      }
      else {
        console.log(`Failed === ${JSON.stringify(response)}`)
        callback(JSON.stringify(response))
      }
    })
    
    
       
}

function parseUpdateNotesResponse(response, callback) {
    
        
    
    if (response.status === 200) {
      response.json().then(object => {
       
        var returnData = {}
         returnData["status"] = object.successful;
         returnData["message"] = object["message"];

        // console.log(JSON.stringify(returnData))
        JS.callback(JSON.stringify(returnData), callback)
        // callback(JSON.stringify(returnData));
      })
    }
    else if (response.status === 404) {
      var returnData = {}
      returnData["status"] = false
      returnData["message"] = 404;
      // JS.callback(JSON.stringify(returnData), callbackFn);
      callback(JSON.stringify(returnData))
    }
    else {
      response.json().then(object => {
        console.log(`Failed === ${JSON.stringify(object)}`)
        var returnData = {};

        returnData["status"] = false;
        returnData["message"] = object.message;

        callback(JSON.stringify(returnData));
      })
    }
  }