var nextDay = function(day, doctorList, dutyList, totalDay, resultPool)
{
    console.log("day:" + (day+1) +"/"+totalDay);
    for(var i = 0; i < dutyList.length ; i++)
    {
        var dayList = dutyList[i].dayList;
        dayList.splice(day,1,"T");
    }
    if(day<totalDay-1){
        
        nextDay(day+1, doctorList, dutyList, totalDay, resultPool);
    }else
    {
        resultPool.push(dutyList);
    }
}