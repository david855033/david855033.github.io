var fs = require('fs');

var postjson = function(dataset){
    return function(req,res,next)
    {
        res.set({ 'content-type': 'application/json; charset=utf-8' })
        var path =__dirname+"/"+dataset+"2.js";
        console.log('write data set: '+dataset);
        console.log(path);
        var toWrite= JSON.stringify(req.body);
        console.log("to write: "+toWrite);
        fs.writeFile(path,toWrite,function(err,data){
            console.log('write!');
            res.send();
        });
    }
};

module.exports = postjson;

