const fs = require("fs");
const async = require("async");
const express = require("express");
const readline = require("readline");
const fileInit = require("./controllers/init-file");
const errMsg = require("./controllers/errMsg");
const arg = process.argv.slice(2);
/*const rl = readline.createInterface(
    {
        input: process.stdin,
        output: process.stdout
    }
);*/
//console.log(arg);

//console.log("magic start here");


switch (arg[0]) {
    case "read":
        if (!arg[1]) {
            console.log(errMsg.needFile);
            process.exit();
        } else {
            var file = arg.slice(1);
            for(f in file){
                if(file[f].indexOf(".json") == -1){
                    console.log(errMsg.fileError);
                    process.exit();
                }
            }
            fileInit.read(file, function (res) {
            });
        }
        break;
    case "grab":
        var tagIndex = arg.indexOf('-tag');
        if (tagIndex === -1){
            console.log(errMsg.grabParaErr);
            process.exit();
        } else if (!arg[1] || tagIndex === 1) {
            console.log(errMsg.needFile);
            process.exit();
        } else { 
            var files = arg.slice(1,tagIndex);
            var tags = arg.slice(tagIndex + 1);
            for(f in files){
                if(files[f].indexOf(".json") == -1){
                    console.log(errMsg.fileError);
                    process.exit();
                }
            }
            fileInit.read(files, function (res) {
               fileInit.getTags(res, tags); 
            });
        }
        break;
    //end of read part
    default:
        console.log("Help: \n read: read file(s) only");
        process.exit();
}

/*rl.question(
    "what is (are) your json file(s)?", 
    function(answer){
        console.log(answer);
        rl.close();
    }
);*/