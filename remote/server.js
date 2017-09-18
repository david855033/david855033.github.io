"use strict";
var queue={};
queue.lastRequest=new Date().valueOf();
queue.do=function(job){
    var currentTime=new Date().valueOf();
    queue.lastRequest = queue.lastRequest + 50;
    var timeout = queue.lastRequest-currentTime;
    if(timeout<0){
        timeout=0;
        queue.lastRequest=currentTime;
    }
    setTimeout(function() {
        job();
    }, timeout);
}

//基礎函數：將HTTP request post至node server 等待callback回傳
var PostHTTPRequest=function(options, callback){
    queue.do(function(){
        $.ajax({
            url: "HTTPRequest",
            type:"POST",
            data: JSON.stringify(options),
            contentType: "application/json; charset=utf-8",
            dataType   : "text",
            success: function (data,status,xhr) {
                callback && callback(data,status,xhr);
            }
        })
    });
};

//constructor for defualtOption of VGHserver
var defaulOption = function(){
    this.url="https://web9.vghtpe.gov.tw/";
    this.rejectUnauthorized= false;
    this.headers={
        "Connection": "keep-alive",
        "Cache-Control": "max-age=0",
        "Upgrade-Insecure-Requests": "1",
        "User-Agent": "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.101 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-TW,zh;q=0.8,en-US;q=0.6,en;q=0.4"
    }
};

//server 用來放置與伺服器互動之物件/功能
var server={};
server.cookie={};
server.cookie.DOC={};
server.cookie.DOC.string="";
server.cookie.NUR={};
server.cookie.NUR.string="";

var setCookieString=function(cookieObj, str){
    //先轉換成K-V pair
    var inputObj = Parser.getKeyValuePairsFromCookieString(str);
    var originObj = Parser.getKeyValuePairsFromCookieString(cookieObj.string);
    //將input的K-V pair更新到originObj(用來判斷新增/取代cookies)
    var keysInInputObj = Object.keys(inputObj);
    var keysInOriginObj = Object.keys(originObj);
    keysInInputObj.forEach(function(x)  {originObj[x]=inputObj[x]});
    //轉換成string
    var combinedString = Parser.getCookieStringFromKeyValuePairs(originObj);
    cookieObj.string = combinedString;
};

server.signIn=function(account, password, callback){
    if(account.indexOf('DOC')>=0){
        var cookieObj=server.cookie.DOC;
    }else{
        var cookieObj=server.cookie.NUR;
    }
    
    server.account=account||server.account;
    server.password=password||server.password;
    if(!server.account||!server.password){
        console.error("account or password not set.");
        return;
    }
    var option = new defaulOption();
    option.url="https://web9.vghtpe.gov.tw/Signon/lockaccount";
    option.method='POST';
    option.form={j_username:server.account,j_password:server.password};
    PostHTTPRequest(option, function(data,status,xhr){
        var resObj= JSON.parse(data);
        setCookieString(cookieObj, resObj.cookieString);
        isFunction(callback)&&callback();
    });
};

server.request=function(serverRequest,callback){
    if(serverRequest.isNUR){
        var cookieObj = server.cookie["NUR"];
    }else{
        var cookieObj = server.cookie["DOC"];
    }
    
    var option = new defaulOption();
    option.headers={
        'Cookie': cookieObj.string
    }
    option.url=serverRequest.url;
    serverRequest.method && (option.method=serverRequest.method);
    serverRequest.form && (option.form=serverRequest.form);
    
    PostHTTPRequest(option, function(data,status,xhr){
        var resObj= JSON.parse(data);
        setCookieString(cookieObj, resObj.cookieString);
        callback&&callback(resObj.body, Parser.getDateTime());
    });
}