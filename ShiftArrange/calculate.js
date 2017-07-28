;'use strict';
var getID = function (x){
    return x.match(/([A-Za-z]|[0-9]+)/)[0];
}

var maxBranch=3;  //******分支數量上限****** */
var doctorInclude=3; //排名前多少的會加入考量
var maxResult=1;  //****結果數量上限 */
var maxDeadend=1000; //****嘗試數量上限 */

var nextSlot = function(day, param)
{
    var doctorList=param.doctorList;
    var groupedDoctorList=param.groupedDoctorList;
    var dutyList=param.dutyList;
    var totalDay=param.totalDay;
    var resultPool=param.resultPool;
    var deadEnd=param.deadEnd;
    var dayList=param.dayList;
    var doctorBins=param.doctorBins;
    var firstWeekDay=param.firstWeekDay;
    
    var isHoliday = dayList[day]; 
    var availableDoctorsInADay = [];
    
    for(var i = 0;i<dutyList.length;i++)
    {
        var availableDoctorForSlot = [];

        //從BIN中依序抓出可用的醫師，排除重複
        var currrentBin = isHoliday ? doctorBins[i].HolidayTokens : doctorBins[i].WorkdayTokens;
        for(var j = 0 ; j < currrentBin.length;j++){
            if(availableDoctorForSlot.indexOf(currrentBin[j])<0)
            {
                availableDoctorForSlot.push(currrentBin[j]);
            }
        }
        //--檢查要班
        var newList=availableDoctorForSlot.filter((x)=>{
            return (doctorList[x].dayList[day]=="D")
        });
        if(newList.length>0){availableDoctorForSlot=newList;}
        //--檢查不值班
        availableDoctorForSlot = availableDoctorForSlot.filter((x)=>{
            return !(doctorList[x].dayList[day]=="N")
        });
        //--檢查連值
        if(day>0){
            availableDoctorForSlot = availableDoctorForSlot.filter((x)=> {
                return dutyList.map((y) => y.dayList[day-1]).indexOf(x)<0;
            });
        }
        //--檢查本周是否已經值兩班
        if(day>=4){
            var weekDayShift = firstWeekDay==0?7:(weekDayShift);
            var lastMonday = (Math.floor((day-1)/7)*7 + weekDayShift-6);
            console.log("day = "+(day+1) + ", last monday = "+ (lastMonday+1));
            availableDoctorForSlot=  availableDoctorForSlot.filter((theDoctorIndex)=>{
                var dutyCountThisWeek = 0 ;
                for(var j = lastMonday; j < day;j++)
                {
                    var doctorsOftheDay = dutyList.map(y=>y.dayList[j]);
                    console.log("day:"+(j+1)+" doctor of the day: "+ doctorsOftheDay);
                    if(doctorsOftheDay.indexOf(theDoctorIndex)>=0)
                    {
                        dutyCountThisWeek++;
                    }
                    if(dutyCountThisWeek==2) break;
                };
                console.log("dutyCountThisWeek: "+ dutyCountThisWeek);
                return dutyCountThisWeek<2;
            });
        }
        //--排序希望不值班
        availableDoctorForSlot.sort((x,y)=>{
        if(doctorList[x].dayList[day]=="A" && doctorList[y].dayList[day]!=="A")
            {
                return 1;
            }
            else if(doctorList[x].dayList[day]!=="A" && doctorList[y].dayList[day]=="A")
            {
                return -1;
            }else
            {
                return 0;
            }
        });
        //將可以的醫師群傳入
        availableDoctorsInADay.push(availableDoctorForSlot);
    }

    //製作組合
    var doctorCombinationsInADay =[];
    if(availableDoctorsInADay.every(x=>x.length>0) && resultPool.length < maxResult &&  deadEnd.count<maxDeadend)
    {
        availableDoctorsInADay.forEach(x=>{x.length= Math.min(x.length,doctorInclude)});
        for(var i = 0;i<maxBranch;i++)
        {
            var thisCombination = availableDoctorsInADay.map(x=>x[Math.floor((Math.random() * x.length))]);
            //檢查當天同一人
        
            //--檢查同組別
    
            doctorCombinationsInADay.push(thisCombination);
        }
    }
    //console.log("availableDoctorsInADay"+JSON.stringify(availableDoctorsInADay));
    //console.log("doctorCombinationsInADay"+JSON.stringify(doctorCombinationsInADay));

    //makeBranch
    var branchDutyList = [], branchDoctorBins = [];
    for(var i = 0 ; i < doctorCombinationsInADay.length ; i++){
        var thisCombinationInADay = doctorCombinationsInADay[i];
        var copyDutyList = JSON.parse(JSON.stringify(dutyList));
        var copyDoctorBins = JSON.parse(JSON.stringify(doctorBins));
        thisCombinationInADay.forEach((x,index)=>
        {
            copyDutyList[index].dayList.splice(day,1,x);
            var theBin = isHoliday ? copyDoctorBins[index].HolidayTokens : copyDoctorBins[index].WorkdayTokens;
            var indexToRemove = theBin.indexOf(x);
            theBin.splice(indexToRemove,1);
        });
          
        branchDutyList.push(copyDutyList);
        branchDoctorBins.push(copyDoctorBins);
    }

    //iterating..
    if(day == totalDay - 1)
    {    
        if(branchDutyList.length>0)
        {
            resultPool.push(branchDutyList[0]); //resulting
            //console.log(JSON.stringify(branchDutyList[0]));
            console.log(resultPool.length+"/" + deadEnd.count);
        }else
        {
            deadEnd.count++;
            console.log(resultPool.length+"/" + deadEnd.count);
        }
    }else{
        var nextDay;
        nextDay=day+1;
        if(branchDutyList.length>0)
        {
            branchDutyList.forEach((x,index)=>{
                param.dutyList=x;
                param.doctorBins=branchDoctorBins[index];
                nextSlot(nextDay, param);
            });
        }else{
            deadEnd.count++;
            console.log(resultPool.length+"/" + deadEnd.count);
        }
    }
}


var nextSlot2 = function(ward, day, param)
{
    var doctorList=param.doctorList;
    var groupedDoctorList=param.groupedDoctorList;
    var dutyList=param.dutyList;
    var totalDay=param.totalDay;
    var resultPool=param.resultPool;
    var deadEnd=param.deadEnd;
    var dayList=param.dayList;
    var doctorBins=param.doctorBins;

    //console.log("day:" + (day+1) +"/" +totalDay+", ward:"+ward);
    //Generate Available
    //console.log('workday bin:' + doctorBins[ward].WorkdayTokens.map((x)=>doctorList[x].name).join(','));
    var availableDoctorForSlot = [];
    var isHoliday = dayList[day]; 
    //console.log("holiday: " + isHoliday);
    var currrentBin = isHoliday ? doctorBins[ward].HolidayTokens : doctorBins[ward].WorkdayTokens;
    for(var i = 0;i<currrentBin.length;i++)
    {
        if(availableDoctorForSlot.length==groupedDoctorList[ward].length){
            break;
        }
        if(availableDoctorForSlot.indexOf(currrentBin[i])<0)
        {
            availableDoctorForSlot.push(currrentBin[i]);
        }
    }

    //console.log("available for slot: "+availableDoctorForSlot.map((x)=>doctorList[x].name).join(','));
    
    //--檢查要班
    var newList=availableDoctorForSlot.filter((x)=>{
        return (doctorList[x].dayList[day]=="D")
    });
    if(newList.length>0){availableDoctorForSlot=newList;}
    
    //--檢查不值班
    availableDoctorForSlot = availableDoctorForSlot.filter((x)=>{
        return !(doctorList[x].dayList[day]=="N")
    });

    
    //--檢查連值
    if(day>0){
        availableDoctorForSlot = availableDoctorForSlot.filter((x)=> {
            return dutyList.map((y) => y.dayList[day-1]).indexOf(x)<0;
        });
    }

    //檢查當天同一人
    availableDoctorForSlot = availableDoctorForSlot.filter((x)=> {
        return dutyList.map((y) => y.dayList[day]).indexOf(x)<0;
    });

    //--檢查同組別
    availableDoctorForSlot = availableDoctorForSlot.filter((x)=> {
        var thisGroup = doctorList[x].group;
        if(thisGroup=='') {
            return true;
        }else
        {
            return !dutyList.map((y)=>y.dayList[day]).filter((y=>y!="")).some((y)=>doctorList[y].group==thisGroup);
        }
    });
    
    //--排序希望不值班
    availableDoctorForSlot.sort((x,y)=>{
       if(doctorList[x].dayList[day]=="A" && doctorList[y].dayList[day]!=="A")
        {
            return 1;
        }
        else if(doctorList[x].dayList[day]!=="A" && doctorList[y].dayList[day]=="A")
        {
            return -1;
        }else
        {
            return 0;
        }
    });
    

    //檢查運算數量
    if(resultPool.length>=maxResult || deadEnd.count>=maxDeadend){
        availableDoctorForSlot.length=0;
    }
    else if(availableDoctorForSlot.length>maxBranch)
    {
        availableDoctorForSlot.length=maxBranch;            
    }

    //makeBranch
    var branchDutyList = [], branchDoctorBins = [];
    for(var i = 0 ; i < availableDoctorForSlot.length ; i++){
        var copyDutyList = JSON.parse(JSON.stringify(dutyList));
        var copyDoctorBins = JSON.parse(JSON.stringify(doctorBins));
        copyDutyList[ward].dayList.splice(day,1,availableDoctorForSlot[i]);
        var theBin = isHoliday ? copyDoctorBins[ward].HolidayTokens : copyDoctorBins[ward].WorkdayTokens;
        var indexToRemove = theBin.indexOf(availableDoctorForSlot[i]);
        theBin.splice(indexToRemove,1);
        branchDutyList.push(copyDutyList);
        branchDoctorBins.push(copyDoctorBins);
    }

    //iterating..
    if((ward == dutyList.length - 1)  && (day == totalDay - 1))
    {    
        if(branchDutyList.length>0)
        {
            resultPool.push(branchDutyList[0]); //resulting
            //console.log(JSON.stringify(branchDutyList[0]));
            console.log(resultPool.length+"/" + deadEnd.count);
        }else
        {
            deadEnd.count++;
            console.log(resultPool.length+"/" + deadEnd.count);
        }
    }else{
        var nextWard, nextDay;
        if(ward==dutyList.length-1)
        {
            nextWard=0;
            nextDay=day+1;
        }else{
            nextWard=ward+1;
            nextDay=day;
        }
        if(branchDutyList.length>0)
        {
            branchDutyList.forEach((x,index)=>{
                param.dutyList=x;
                param.doctorBins=branchDoctorBins[index];
                nextSlot(nextWard, nextDay, param);
            });
        }else{
            deadEnd.count++;
            console.log(resultPool.length+"/" + deadEnd.count);
        }
    }
}