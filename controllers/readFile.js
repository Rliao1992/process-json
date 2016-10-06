const fs = require("fs");
const async = require("async");
const errMsg = require("../controllers/errMsg");

function readFile(paths, callback){
    async.mapLimit(paths, 4, 
        function(v, mapCallback){
            fs.readFile(v, "utf8", 
                function(err, buffer){
                    if (err){
                        console.log("Readfile: " + v + "failed => " + err);
                    }else{
                        try{
                            mapCallback(null, JSON.parse(buffer));
                        }catch(err){
                            console.log(err.message);
                            console.log(errMsg.fileError);
                        }
                    }
                }
            )    
        },
        function(err, result){
            callback(result);
        }
    );
};

module.exports = readFile;