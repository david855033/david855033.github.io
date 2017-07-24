var nextDay = function(day, data){
    var doctorList = data.doctorList;
    var dutyList = data.dutyList;
    var totalDay = data.totalDay;
    console.log("day:" + (day+1) +"/"+totalDay);
    for(var i = 0; i < dutyList.length ; i++)
    {
        var dayList = dutyList[i].dayList;
        dayList.splice(day,1,"T");
    }
    if(day<totalDay-1){
        nextDay(day+1,data);
    }
}