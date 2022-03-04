//THIS MODULE IS SOMETHING I MADE FOR SENDING REQUESTS TO THE SERVER
//I MADE THIS SO YOU CAN IMPORT THIS ON YOUR FILE.
//THIS LUMP OF 'CANNOT BE UNDERSTAND' CODES IS A SPECIFIC VERSION OF 
//.fetch() FUNCTION OF JS.
//FOR THOSE WILLING TO TRY, YOU CAN USE YOUR OWN VERSION, THOUGH I RECOMMEND IT IF YOU HAVE
//ANY FREE TIME. FOR THE SAKE OF COMPLETING YOUR FINAL PROJECT I REAAAAAALLY RECOMMEND TO USE MINE FIRST

var api_client = (function () {

    var sendRequest = function (data, timeout, callback) {
  
      

      console.log(`URL === ${data.url}`)      
      console.log(`Header === ${JSON.stringify(data.content.headers)}`)
      console.log(`Method === ${data.content.method}`)
      console.log(`Body === ${data.content.body}`)
      console.log(`Content === ${JSON.stringify(data.content)}`)

      timer(timeout * 1000, fetch(`${data.url}`, data.content))

      .then(function (response) {
        console.log("sendRequestv2 response status = " + response.status)
        callback(true, response)

      }).catch(function (error) {
        console.log(`Error === ${JSON.stringify(error.message)}`)

        try {
          if (typeof error.message !== "undefined") {
            error["message"] = (error["message"] === "Failed to fetch") ? "No Internet Connection" : error["message"]
          }
          else {
            error["message"] = "no response"
            error.status = false
          }
          

          callback(false, {
            status: false,
            errorCode: error.status,
            message: error["message"]
          })
        } catch (err) {
          console.log(`sendRequest error: ${err}`)
          callback(false, {
            status: false,
            errorCode: "",
            message: err
          })
        }
         
      })
    }


    return {
        sendRequest : sendRequest
    }
  
  })()
  
  
  
  