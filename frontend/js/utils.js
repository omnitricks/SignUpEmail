var UserDefaults = (function() {

    var get = function(key){
        if(localStorage.getItem(key) != null)
            return localStorage.getItem(key)
        else
            return ""
    }
   
    var set = function(key, data){
        localStorage.setItem(key, data)
    }

    return {
        get : get,
        set : set
    }
})()

var JS = (function (){
    var callback = function(data,callbackFn){
        callbackFn(data)
    }

    return{
        callback : callback
    }
})()