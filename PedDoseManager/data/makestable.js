var fs = require('fs');

var makestable = function(dataset){
    return function(req,res,next)
    {
        res.set({ 'content-type': 'application/json; charset=utf-8' })
        var readpath =__dirname+"/"+dataset+".js";
        var writepath =__dirname+"/"+dataset+"_stable.js";
        console.log('write data set for stable: '+dataset);
        console.log(writepath);
        fs.readFile(readpath,function(err,data){
            console.log('read for stable!');
            var obj=JSON.parse(data);
            console.log(obj.length+"\r");
            var toWrite= "var DataSource="+data;
            console.log("to write: "+toWrite);
            fs.writeFile(writepath,toWrite,function(err,data){
                console.log('write to Stable!');
                res.send("stable version is made");
            });
        });

       
    }
};

module.exports = makestable;

