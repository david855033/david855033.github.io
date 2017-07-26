;'use strict';
var getID = function (x){
    return x.match(/([A-Za-z]|[0-9]+)/)[0];
}

var maxBranch=3;  //******分支數量上限****** */
var maxResult=1;  //****結果數量上限 */
var maxDeadend=2500; //****嘗試數量上限 */

var nextSlot = function(ward, day, param)
{
    var doctorList=param.doctorList;
    var groupedDoctorList=param.groupedDoctorList;
    var dutyList=param.dutyList;
    var totalDay=param.totalDay;
    var resultPool=param.resultPool;
    var deadEnd=param.deadEnd;
    var dayList=param.dayList;
    var doctorBins=param.doctorBins;

    console.log("day:" + (day+1) +"/" +totalDay+", ward:"+ward);
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
            console.log("result/fail: "+resultPool.length+"/" + deadEnd.count);
        }else
        {
            deadEnd.count++;
            console.log("result/fail: "+resultPool.length+"/" + deadEnd.count);
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
            console.log("result/fail: "+resultPool.length+"/" + deadEnd.count);
        }
    }
}