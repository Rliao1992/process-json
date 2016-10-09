const fs = require("fs");
const async = require("async");
const errMsg = require("../controllers/errMsg");

function read(paths, callback) {
    async.mapLimit(paths, 4,
        function (v, mapCallback) {
            fs.readFile(v, "utf8",
                function (err, buffer) {
                    if (err) {
                        console.log("Readfile: " + v + "failed => " + err);
                        process.exit();
                    } else {
                        try {
                            //mapCallback(null, JSON.parse(buffer));
                            var fileContent = JSON.parse(buffer);
                            mapCallback(null, fileContent);
                        } catch (err) {
                            console.log("codeError: ",err.message);
                            process.exit();
                        }
                    }
                }
            )
        },
        function (err, result) {
            for(i in result){
                console.log(JSON.parse(JSON.stringify(result[i]).split(",")));
            }
            callback(result);
        }
    );
};

function getTags(sources, tags, callback) {
    async.mapLimit(sources, 4,
        function (value, mapCallback) {
            console.log(typeof (value), Array.isArray(value));
            if (Array.isArray(value) === true) {
                for (i in value) {
                    //console.log(value[i]);
                    for (var a = 0; a < tags.length; a++) {
                        if (typeof (value[i][tags[a]]) === 'object') {
                            console.log(tags[a] + "[" + i + "]" + ": " + JSON.stringify(value[i][tags[a]]));
                        } else {
                            console.log(tags[a] + "[" + i + "]" + ": " + value[i][tags[a]]);
                        }
                    }
                }
            } else {
                for (var b = 0; b < tags.length; b++) {
                    if (typeof (value[tags[b]]) === 'object') {
                        console.log(tags[b] + ": " + JSON.stringify(value[tags[b]]));
                    } else {
                        console.log(tags[b] + ": " + value[tags[b]]);
                    }
                }
            }
        }
    );
};

module.exports = {
    read: read,
    getTags: getTags
}