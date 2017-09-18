"use strict";
var Parser={
    //cookie
    getKeyValuePairsFromCookieString:function(cookieString){
        var keyValuePairs={};
        cookieString&&cookieString.split(';')
            .forEach(function(x){
                var parts=x.split('=');
                var key=parts.shift();
                var value=parts.join('=');
                keyValuePairs[key.trim()]=value.trim();
            });
        return keyValuePairs; 
    },
    getCookieStringFromKeyValuePairs:function(keyValuePairs){
         var keys= Object.keys(keyValuePairs);
         return keys.map(function(x){return x+"="+keyValuePairs[x];}).join('; ');
    },
    //時間日期
    getDateTime:function(dateObj){
        var toParse = dateObj || new Date();
        var str = toParse.getFullYear()+"-"
            +this.get2DigiNum((toParse.getMonth()+1))+"-"
            +this.get2DigiNum((toParse.getDate()))+" "
            +this.get2DigiNum(toParse.getHours())+":"
            +this.get2DigiNum(toParse.getMinutes())+":"
            +this.get2DigiNum(toParse.getSeconds());
        return str;
    },
    getDateFromShortDate:function(dateString){
        if(typeof dateString =="string" && dateString.length==8)
        {
            return dateString.substr(0,4)+"-"+dateString.substr(4,2)+"-"+dateString.substr(6,2);
        }
        else{
            return dateString;
        } 
    },
    getTimeFromShortTime:function(timeString){
        if(typeof timeString =="string" && timeString.length==4)
        {
            return timeString.substr(0,2)+":"+timeString.substr(2,2);
        }
        else{
            return timeString;
        } 
    },
    getDateTimeFromShortDateTime:function(dateTimeString)
    {
        var parts = dateTimeString.replaceAll('-',':').split(':');
        if(parts.length=2)
        {
            parts[0]=Parser.getDateFromShortDate(parts[0].trim());
            parts[1]=Parser.getTimeFromShortTime(parts[1].trim());
            return parts[0]+' '+parts[1];
        }
        return dateTimeString;
    },
    getDateTimeFromMedicationTable:function(inputString)
    {
        return inputString.regSelectAll(/[0-9]{4}-[0-9]{2}-[0-9]{2}/)+" "+inputString.regSelectAll(/[0-9]{2}\.[0-9]{2}/).regReplaceAll('\.',":");
    },
    getShortDate:function(inputString){
        var result=inputString.regReplaceAll(/(\/|-|\\)/g,"");
        if(result.length>8) {result=result.slice(0,8);}
        return result;
    },
    get2DigiNum:function(num){
        if(typeof num == "number" && num<10)
        {
            return "0"+num;
        }else{
            return num;
        }
    },
    getSecondDifference:function(dateTime1, dateTime2)
    {
        var date1 = new Date(dateTime1);
        var date2 = new Date(dateTime2);
        var timeDiff = Math.abs(date2.getTime() - date1.getTime());
        var diff = Math.ceil(timeDiff / (1000)); 
        return diff?diff:0;
    },
    //DOM manipulate
    getDOM:function(htmlText){
        var doc = document.implementation.createHTMLDocument("example");
        doc.documentElement.innerHTML = htmlText;
        return doc;
    },
    removeElementsByTagName:function(HtmlElement, tagName)
    {
        var element = HtmlElement.getElementsByTagName(tagName), index;
        for (index = element.length - 1; index >= 0; index--) {
            element[index].parentNode.removeChild(element[index]);
        }
    },
    searchDomByID:function(HtmlElements, id){
        var allChildElement = HtmlElements.getElementsByTagName("*");
        for(var i = 0; i < allChildElement.length; i++)
        {
            if(allChildElement[i].getAttribute('id')&&allChildElement[i].getAttribute('id').indexOf(id)>=0)
            {
                return  allChildElement[i];
            }
        }  
        return null;
    }
}
