;'use strict';
var getID = function (x){
    return x.match(/([A-Za-z]|[0-9]+)/)[0];
}

var nextSlot = function(ward, day, param)
{
    var doctorLis=param.doctorList;
    var groupedDoctorList=param.groupedDoctorList;
    var dutyList=param.dutyList;
    var totalDay=param.totalDay;
    var resultPool=param.resultPool;
    var deadEnd=param.deadEnd;
    var dayList=param.dayList;

    console.log("day:" + (day+1) +"/" +totalDay+", ward:"+ward);
    //Generate Available
    var availableDoctorForSlot = groupedDoctorList[ward].slice();
    //console.log(availableDoctorForSlot.map((x)=>x.name).join(','));

    if(day>0){
        //--檢查連值
        availableDoctorForSlot = availableDoctorForSlot.filter((x)=> x.index != dutyList[ward].dayList[day-1].index);
        //--檢查假日值班數
        availableDoctorForSlot = availableDoctorForSlot.filter((x)=>
        {
            var holidayCount= 0;
            dutyList[ward].dayList.slice(0,day).forEach((y, i)=>{
                if(y.index==x.index && dayList[i]){
                     holidayCount++;
                }
            });
            var workdayCount= 0;
            dutyList[ward].dayList.slice(0,day).forEach((y, i)=>{
                if(y.index==x.index && !dayList[i]){
                     workdayCount++;
                }
            });
            console.log(x.name+", holiday:"+holidayCount);
            return x.workdayDuty > workdayCount &&  x.holidayDuty > holidayCount;
        });
    }


    
    
    availableDoctorForSlot=d3.shuffle(availableDoctorForSlot);
    var maxBranch=2;  //************ */
    if( availableDoctorForSlot.length>maxBranch)
    {
        availableDoctorForSlot.length=maxBranch;            
    }

    //makeBranch
    var branchDutyList = [];
    for(var i = 0 ; i < availableDoctorForSlot.length ; i++){
        var copyDutyList = JSON.parse(JSON.stringify(dutyList));
        copyDutyList[ward].dayList.splice(day,1,availableDoctorForSlot[i]);
        branchDutyList.push(copyDutyList);
    }

    //iterating..
    if((ward == dutyList.length - 1)  && (day == totalDay - 1))
    {    
        if(branchDutyList.length>0)
        {
            resultPool.push(branchDutyList[0]); //resulting
        }else
        {
              deadEnd.count++;
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
            branchDutyList.forEach((x)=>{
            param.dutyList=x;
            nextSlot(nextWard, nextDay, param);
        })
        }else{
            deadEnd.count++;
        }
    }
}