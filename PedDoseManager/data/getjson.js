var fs = require('fs');

var getjson = function(dataset){
    return function(req,res,next)
    {
        res.set({ 'content-type': 'application/json; charset=utf-8' })
        var path =__dirname+"/"+dataset+".js";
        console.log('managing: '+dataset+ "");
        console.log(path+"");

        fs.readFile(path,function(err,data){
            console.log('read!');
            var obj=JSON.parse(data);
            console.log(obj.length+"\r");
            res.send(data);
        });
    }
};

module.exports = getjson;

