const fs = require("fs");
const async = require("async");
const express = require("express");
const readFile = require("./controllers/readFile");
const errMsg = require("./controllers/errMsg");
const arg = process.argv.slice(2);

//console.log(arg);

//console.log("magic start here");


switch (arg[0]) {
    case "-r":
        if (!arg[1]) {
            console.log("Please enter your file path.");
        } else {
            var file = arg.slice(1);
            for(f in file){
                if(file[f].indexOf(".json") == -1){
                    console.log(errMsg.fileError);
                    process.exit();
                }
            }
            readFile(file, function (res) {
                console.log(res);
                //console.log("array: " + Array.isArray(res));
            });
        }
        break;
    default:
        console.log("Help: \n -r: read file only");
}