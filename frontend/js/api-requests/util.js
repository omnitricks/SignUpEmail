//THIS IS ALSO A FUNCTION I MADE FOR HANDLING REQUEST TIMEOUT WITHIN A GIVEN TIME
//YOU CAN ALWAYS USE THIS CODE OR IMPORT THIS.
//FOR NOW, YOU HAVE TO INCLUDE THIS ON YOUR FILE.
function timer(ms, promise) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            reject(new Error("Request Timed Out"))
        }, ms)
        promise.then(resolve, reject)
    })
}
