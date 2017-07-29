;'use strict';
var getID = function (x){
    return x.match(/([A-Za-z]|[0-9]+)/)[0];
}

var maxBranch=5;  //******分支數量上限****** */
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
            //console.log("day = "+(day+1) + ", last monday = "+ (lastMonday+1));
            availableDoctorForSlot=  availableDoctorForSlot.filter((theDoctorIndex)=>{
                var dutyCountThisWeek = 0 ;
                for(var j = lastMonday; j < day;j++)
                {
                    var doctorsOftheDay = dutyList.map(y=>y.dayList[j]);
                    // console.log("day:"+(j+1)+" doctor of the day: "+ doctorsOftheDay);
                    if(doctorsOftheDay.indexOf(theDoctorIndex)>=0)
                    {
                        dutyCountThisWeek++;
                    }
                    if(dutyCountThisWeek==2) break;
                };
                // console.log("dutyCountThisWeek: "+ dutyCountThisWeek);
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
        //將QOD值班排到最後
        if(day>=4)
        {
            var initialLength =  availableDoctorForSlot.length;
            for(var j = 0; j < initialLength; j++)
            {
                var twoDaysAgo = dutyList.map(y=>y.dayList[day-2]).indexOf(availableDoctorForSlot[j])>=0;
                var fourDaysAgo = dutyList.map(y=>y.dayList[day-4]).indexOf(availableDoctorForSlot[j])>=0;
                if(twoDaysAgo&&fourDaysAgo)
                {
                    availableDoctorForSlot.push(availableDoctorForSlot.splice(j,1));
                    j--;
                    initialLength--;
                }
            }
        }

        //將可以的醫師群傳入
        availableDoctorsInADay.push(availableDoctorForSlot);
    }

    //製作組合
    var doctorCombinationsInADay =[];
    if(availableDoctorsInADay.every(x=>x.length>0) && resultPool.length < maxResult &&  deadEnd.count<maxDeadend)
    {
        availableDoctorsInADay.forEach(x=>{x.length= Math.min(x.length,doctorInclude)});
        for(var i = 0;i<maxBranch;i++) //重複maxBranch次
        {
            var thisCombination =[];
            //製造組合
            for(var j = 0; j<availableDoctorsInADay.length;j++)
            {
                //選取不重複的人
                var nonDuplicatedAvailableDoctor = availableDoctorsInADay[j].filter(x=> {return thisCombination.indexOf(x)<0;} );
                
                //選取組別不重複的人
                nonDuplicatedAvailableDoctor = nonDuplicatedAvailableDoctor.filter(x=>{
                    return thisCombination.map(y=>doctorList[y].group).indexOf(doctorList[x].group)<0;
                });

                if(nonDuplicatedAvailableDoctor.length>0)
                {
                    var randIndex = Math.floor(nonDuplicatedAvailableDoctor.length * Math.random());
                    thisCombination.push(nonDuplicatedAvailableDoctor[randIndex][0] || nonDuplicatedAvailableDoctor[randIndex]);
                } 
            }

            //如果人數正確，增加此組合
            if(thisCombination.length == dutyList.length){
                doctorCombinationsInADay.push(thisCombination);
            }
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