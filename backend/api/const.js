module.exports = {
    "STATUS":{
        "OK" : 200,
        "BAD_REQUEST": 400,
        "UNAUTHORIZED": 401,
        "FORBIDDEN": 403,
        "NOT_FOUND": 404,
        "PAYLOAD_TOO_LARGE": 413,
        "INTERNAL_SERVER": 500
    },
    //IF YOU WANT TO USE THIS API, YOU HAVE TO CHANGE THE DATABASE VALUE.
    //ESPECIALLY THE 'VALUE' OF HOST, USER, AND SCHEMA_NAME
    //CHANGE THE VALUE NOT THE KEY NAME OR ELSE NONE OF THESE WILL WORK.
    "DATABASE":{
        "port": 8000,
        "host": "localhost",
        "user": "root",
        "schema_name": "api_schema"
    },
    "PORT": 8000
}


