;'use strict';
var counter=function(ward){
    return function(){
            return [
                this.data.doctorList && d3.sum(this.data.doctorList.map(x=>x[ward].WD)) ,
                this.data.doctorList && d3.sum(this.data.doctorList.map(x=>x[ward].HD))
            ];
    }
};

var insertSparsely=function(arrayOfArray, data, isHoliday){
    var finalArray=[];
    var positionArrays=[];
    var dutyPreference = data.dutyPreference;
    //console.log(JSON.stringify(dutyPreference));
    
    arrayOfArray.forEach((x)=>{
        var thisName = data.doctorList[x[0]].name;
        var thisDutyPreference = dutyPreference.filter(y=>y.name==getID(thisName));
        var thisNoDuty=[];
        if(thisDutyPreference.length>0){thisNoDuty = thisDutyPreference[0].noDuty;}
        var allDaysToSparse = data.dayList.map((y,index)=>y==isHoliday?index:-1).filter(y=>y>=0);
        var availableDaysToSparse = allDaysToSparse.filter(y=>thisNoDuty.indexOf(y)<0);
        // console.log("thisName: "+JSON.stringify(thisName));
        // console.log("thisNoDuty: "+JSON.stringify(thisNoDuty));
        // console.log("isHoliday:" + JSON.stringify(isHoliday));
        // console.log("allDaysToSparse:" + JSON.stringify(allDaysToSparse));
        // console.log("availableDaysToSparse:" + JSON.stringify(availableDaysToSparse));
        var interval = 1/(data.dayList.length-1);
        
        var elementInterval= 1/(availableDaysToSparse.length-1);
        var availableInterval = 1/(x.length);
        var elemenePosition=[];  
        
        x.forEach((y,i)=>{
            elemenePosition.push(Math.round((availableInterval*(i+0.5))/elementInterval,1));
        });
        // console.log("elementInterval:" + JSON.stringify(elementInterval));
        // console.log("elemenePosition:" + JSON.stringify(elemenePosition));
        //** */
        var selectedElement=elemenePosition.map(x=>availableDaysToSparse[x]);
        // console.log("selectedElement:" + JSON.stringify(selectedElement));
        //var thisPositionArray=[];
        positionArrays.push(selectedElement);
    });

    var count=0;

    //console.log("positionArrays"+JSON.stringify(positionArrays));

    while(arrayOfArray.some((x)=>x.length>0) && count++<100)
    {
        var arrayIndexOfMin=0;
        var currentMin=data.dayList.length;
        arrayOfArray.forEach((x,index)=>{
            //console.log("array x:"+x);
            if(x.length>0 && positionArrays[index][0]<currentMin)
            {
                arrayIndexOfMin=index;
                currentMin=positionArrays[index][0];
            }
        });
        //console.log(arrayIndexOfMin+","+currentMin);
        finalArray.push(arrayOfArray[arrayIndexOfMin].shift());
        positionArrays[arrayIndexOfMin].shift();
    }

    //console.log("final array: "+finalArray);
    return finalArray;
}

var vm = new Vue({
    el:'#app',
    data:{
        saveString:"",
        dutyView:false,
        showResult:0,
        selected:-1,
        data:{
            doctorList:[
                {name:"A張家瑗",group:"",PI:{WD:0,HD:0},NI:{WD:5,HD:1},A91:{WD:0,HD:0},A93:{WD:0,HD:0},NB:{WD:0,HD:0},dayList:[],dutyString:""},
                {name:"C陳裕璇",group:"",PI:{WD:0,HD:0},NI:{WD:6,HD:2},A91:{WD:0,HD:0},A93:{WD:0,HD:0},NB:{WD:0,HD:0},dayList:[],dutyString:""},
                {name:"E黃治鋼",group:"",PI:{WD:6,HD:2},NI:{WD:0,HD:0},A91:{WD:0,HD:0},A93:{WD:0,HD:0},NB:{WD:0,HD:0},dayList:[],dutyString:""},
                {name:"F范文博",group:"",PI:{WD:0,HD:0},NI:{WD:6,HD:2},A91:{WD:0,HD:0},A93:{WD:0,HD:0},NB:{WD:0,HD:0},dayList:[],dutyString:""},
                {name:"G黃心慧",group:"",PI:{WD:6,HD:2},NI:{WD:0,HD:0},A91:{WD:0,HD:0},A93:{WD:0,HD:0},NB:{WD:0,HD:0},dayList:[],dutyString:""},
                {name:"H王亭皓",group:"",PI:{WD:0,HD:0},NI:{WD:6,HD:2},A91:{WD:0,HD:0},A93:{WD:0,HD:0},NB:{WD:0,HD:0},dayList:[],dutyString:""},
                {name:"I宋亭璇",group:"",PI:{WD:0,HD:0},NI:{WD:6,HD:2},A91:{WD:0,HD:0},A93:{WD:0,HD:0},NB:{WD:0,HD:0},dayList:[],dutyString:""},
                {name:"J黃齡葳",group:"",PI:{WD:0,HD:0},NI:{WD:6,HD:2},A91:{WD:0,HD:0},A93:{WD:0,HD:0},NB:{WD:0,HD:0},dayList:[],dutyString:""},
                {name:"L黃映齊",group:"",PI:{WD:6,HD:2},NI:{WD:0,HD:0},A91:{WD:0,HD:0},A93:{WD:0,HD:0},NB:{WD:0,HD:0},dayList:[],dutyString:""},
                {name:"M陳以恩上",group:"",PI:{WD:6,HD:2},NI:{WD:0,HD:0},A91:{WD:0,HD:0},A93:{WD:0,HD:0},NB:{WD:0,HD:0},dayList:[],dutyString:""},
                {name:"m陳以恩下",group:"",PI:{WD:6,HD:2},NI:{WD:0,HD:0},A91:{WD:0,HD:0},A93:{WD:0,HD:0},NB:{WD:0,HD:0},dayList:[],dutyString:""},
                {name:"N何正尹",group:"",PI:{WD:0,HD:0},NI:{WD:0,HD:0},A91:{WD:0,HD:0},A93:{WD:0,HD:0},NB:{WD:6,HD:2},dayList:[],dutyString:""},
                {name:"O吳政宏",group:"",PI:{WD:0,HD:0},NI:{WD:0,HD:0},A91:{WD:0,HD:0},A93:{WD:0,HD:0},NB:{WD:6,HD:2},dayList:[],dutyString:""},
                {name:"P陳文音",group:"",PI:{WD:0,HD:0},NI:{WD:0,HD:0},A91:{WD:0,HD:0},A93:{WD:0,HD:0},NB:{WD:6,HD:2},dayList:[],dutyString:""},
                {name:"Q侯明欣",group:"",PI:{WD:0,HD:0},NI:{WD:0,HD:0},A91:{WD:0,HD:0},A93:{WD:0,HD:0},NB:{WD:6,HD:2},dayList:[],dutyString:""},
                {name:"R李苡萱",group:"",PI:{WD:0,HD:0},NI:{WD:0,HD:0},A91:{WD:6,HD:2},A93:{WD:0,HD:0},NB:{WD:0,HD:0},dayList:[],dutyString:""},

                {name:"1蘇稚庭",group:"",PI:{WD:0,HD:0},NI:{WD:0,HD:0},A91:{WD:0,HD:0},A93:{WD:0,HD:0},NB:{WD:6,HD:2},dayList:[],dutyString:""},
                {name:"2田德敏",group:"",PI:{WD:0,HD:0},NI:{WD:0,HD:0},A91:{WD:0,HD:0},A93:{WD:0,HD:0},NB:{WD:6,HD:2},dayList:[],dutyString:""},
                {name:"3呂亭緯",group:"",PI:{WD:0,HD:0},NI:{WD:0,HD:0},A91:{WD:0,HD:0},A93:{WD:0,HD:0},NB:{WD:6,HD:2},dayList:[],dutyString:""},
                {name:"4李晏廷",group:"",PI:{WD:0,HD:0},NI:{WD:0,HD:0},A91:{WD:0,HD:0},A93:{WD:6,HD:2},NB:{WD:0,HD:0},dayList:[],dutyString:""},
                {name:"5丘薰儀",group:"",PI:{WD:0,HD:0},NI:{WD:0,HD:0},A91:{WD:0,HD:0},A93:{WD:6,HD:2},NB:{WD:0,HD:0},dayList:[],dutyString:""},
                {name:"6凌儀芝",group:"",PI:{WD:0,HD:0},NI:{WD:0,HD:0},A91:{WD:0,HD:0},A93:{WD:6,HD:2},NB:{WD:0,HD:0},dayList:[],dutyString:""},
                {name:"7張祐翰",group:"",PI:{WD:0,HD:0},NI:{WD:0,HD:0},A91:{WD:0,HD:0},A93:{WD:6,HD:2},NB:{WD:0,HD:0},dayList:[],dutyString:""},
                {name:"8蔡欣璉",group:"",PI:{WD:0,HD:0},NI:{WD:0,HD:0},A91:{WD:6,HD:2},A93:{WD:0,HD:0},NB:{WD:0,HD:0},dayList:[],dutyString:""},
                {name:"9呂高安",group:"",PI:{WD:0,HD:0},NI:{WD:0,HD:0},A91:{WD:0,HD:0},A93:{WD:6,HD:2},NB:{WD:0,HD:0},dayList:[],dutyString:""},
                {name:"S黃皓軒",group:"",PI:{WD:0,HD:0},NI:{WD:0,HD:0},A91:{WD:6,HD:2},A93:{WD:0,HD:0},NB:{WD:0,HD:0},dayList:[],dutyString:""},
                {name:"T廖廣榆",group:"",PI:{WD:0,HD:0},NI:{WD:0,HD:0},A91:{WD:6,HD:2},A93:{WD:0,HD:0},NB:{WD:0,HD:0},dayList:[],dutyString:""},
                {name:"U子德",group:"",PI:{WD:0,HD:0},NI:{WD:0,HD:0},A91:{WD:6,HD:2},A93:{WD:0,HD:0},NB:{WD:0,HD:0},dayList:[],dutyString:""}
            ],
            dutyPreference:[
                {name:"A", noDuty:[1,2,3]},
                {name:"E", noDuty:[20,21,22,23,28,29,30]},
                {name:"F", noDuty:[3,23]},
                {name:"G", noDuty:[29,30],avoid:[1]},
                {name:"I", noDuty:[2,16],avoid:[9]},
                {name:"J", noDuty:[15,16,17]},
                {name:"L", noDuty:[23]},
                {name:"M", noDuty:[16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]},
                {name:"m", noDuty:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,26,27]},
                {name:"O", noDuty:[15,16],avoid:[17]},
                {name:"P", noDuty:[1]},
                {name:"Q", noDuty:[2,3]},
                {name:"R", noDuty:[1]},
                {name:"1", noDuty:[9,10]},
                {name:"2", noDuty:[16,17]},
                {name:"5", noDuty:[7,14],avoid:[21,28]},
                {name:"6", noDuty:[30]},
                {name:"7", noDuty:[29,30]},
                {name:"8", noDuty:[22,30]},
                {name:"9", noDuty:[1,2,3,29,30]},
                {name:"S", noDuty:[6,7,8]},
                {name:"T", noDuty:[5,12,19,26]}
            ],
            dutyList:[
                {ward:"PI",dayList:[]},
                {ward:"NI",dayList:[]},
                {ward:"A91",dayList:[]},
                {ward:"A93",dayList:[]},
                {ward:"NB",dayList:[]}
            ],
            emptyDutyList:[
                {ward:"PI",dayList:[]},
                {ward:"NI",dayList:[]},
                {ward:"A91",dayList:[]},
                {ward:"A93",dayList:[]},
                {ward:"NB",dayList:[]}
            ],
            dayList:[],
            resultPool:[],
            deadEnd:{count:0},
            weekDayList:[],
            firstWeekDay:5,
            totalDay:30
        }
    },
    computed:{
        sumWorkday:function(){ return this.data.dayList && this.data.dayList.filter(function(a){return !a;}).length; },
        sumHoliday:function(){ return this.data.dayList && this.data.dayList.filter(function(a){return a;}).length; },
        PICounts:counter('PI'),
        NICounts:counter('NI'),
        A91Counts:counter('A91'),
        A93Counts:counter('A93'),
        NBCounts:counter('NB')
    },
    watch:{
        showResult:function(){
            var newDutyList = this.data.resultPool[this.showResult];
            if(newDutyList){this.data.dutyList=newDutyList;}
        }
    },
    methods:
    {
        initialize:function(){
            this.initializeDayList();
            this.initializeDoctorList();
            this.initializeDutyList();
            this.updateDoctorListNoDuty();
        },
        initializeDayList:function(){
            this.data.dayList.length=0;
            this.data.weekDayList.length=0;
            for(var i = 0; i < this.data.totalDay; i++)
            {
                this.data.dayList.push(i % 7 == (6-this.data.firstWeekDay)%7 || (i+6) % 7 == (6-this.data.firstWeekDay)%7);
                var weekDay;
                var weekDayRaw=(Number((i % 7)) + Number(this.data.firstWeekDay)) %7;
                if(weekDayRaw==0){weekDay='日';}
                else if(weekDayRaw==1){weekDay='一';}
                else if(weekDayRaw==2){weekDay='二';}
                else if(weekDayRaw==3){weekDay='三';}
                else if(weekDayRaw==4){weekDay='四';}
                else if(weekDayRaw==5){weekDay='五';}
                else if(weekDayRaw==6){weekDay='六';}
                this.data.weekDayList.push(weekDay);
            }
        },
        initializeDoctorList:function(){
            for(var d = 0 ; d < this.data.doctorList.length; d++)
            {
                var currentLength =  this.data.doctorList[d].dayList.length;
                if(currentLength>this.data.totalDay)
                {
                    this.data.doctorList[d].dayList.length=this.data.totalDay;
                }else{
                    for(var i = currentLength; i < this.data.totalDay ; i++){
                        this.data.doctorList[d].dayList.splice(i,0,'');
                    }
                }
            }
        },//''=empty, D=duty, N=No, A=avoid
        initializeDutyList:function(){
            for(var i = 0;i<this.data.emptyDutyList.length;i++)
            {
                this.data.emptyDutyList[i].dayList.length=0;
                for(var j = 0 ; j < this.data.totalDay;j++)
                {
                    this.data.emptyDutyList[i].dayList.push('');
                }
            }
            this.data.dutyList=JSON.parse(JSON.stringify(this.data.emptyDutyList));
        },
        updateDoctorListNoDuty:function(){
            for(var i = 0; i < this.data.doctorList.length;i++)
            {
                var thisDoctor = this.data.doctorList[i];
                var thisID = thisDoctor.name.match(/([A-Za-z]|[0-9]+)/)[0];
                var thisDutyPreference = this.data.dutyPreference.filter((x)=>x.name==thisID);
                var noDuty = thisDutyPreference[0]&&thisDutyPreference[0].noDuty;
                var avoid = thisDutyPreference[0]&&thisDutyPreference[0].avoid;
                var duty = thisDutyPreference[0]&&thisDutyPreference[0].duty;
                for(var j = 0 ; j < (noDuty && noDuty.length) && (noDuty[j]-1 < this.data.totalDay); j++)
                {
                    thisDoctor.dayList[noDuty[j]-1]="N";
                }
                for(var j = 0 ; j < (avoid && avoid.length) && (avoid[j]-1 < this.data.totalDay); j++)
                {
                    thisDoctor.dayList[avoid[j]-1]="A";
                }
                for(var j = 0 ; j < (duty && duty.length) && (duty[j]-1 < this.data.totalDay); j++)
                {
                    thisDoctor.dayList[duty[j]-1]="D";
                }
                thisDoctor.dutyString=(noDuty?("不值班:"+noDuty.join(",")):"")+"\t"
                +(avoid?("希望不值班:"+avoid.join(",")):"")+"\t"
                +(duty?("確定值班:"+duty.join(",")):"")+" ";
            }
        },
        clickWeekday:function(i){
            this.data.dayList.splice(i,1,!this.data.dayList[i]);
        },
        clickGroup:function(d){
            if(this.data.doctorList[d].group==4) {this.data.doctorList[d].group=''}
            else{
                this.data.doctorList[d].group = Number(this.data.doctorList[d].group) +1;
            }
        },
        rightClickGroup:function(d){
            if(this.data.doctorList[d].group=='') {this.data.doctorList[d].group=4}
            else if(this.data.doctorList[d].group==1){this.data.doctorList[d].group=''}
            else{
                this.data.doctorList[d].group = Number(this.data.doctorList[d].group) -1;
            }
        },
        clickDutyCount:function(d,w,duty,modi){
            this.data.doctorList[d][w][duty]+=modi;
           if(this.data.doctorList[d][w][duty]<0) this.data.doctorList[d][w][duty]=0;
        },
        clickSlot:function(d,i)
        {
            var doctor=this.data.doctorList[d];
            var slot= doctor.dayList[i];
            if(slot=='')
            {
                doctor.dayList.splice(i,1,'D');
            }else if(slot=='D')
            {
                doctor.dayList.splice(i,1,'N');
            }else if(slot=='N')
            {
                doctor.dayList.splice(i,1,'A');
            }else
            {
                doctor.dayList.splice(i,1,'');
            };
            
            var currentID= getID(this.data.doctorList[d].name);
            var thisDutyPreference = {name:currentID};
            var noDuty = [];
            var avoid = [];
            var duty = [];
            for(var i = 0 ; i < doctor.dayList.length; i++)
            {
                var currentSlot = doctor.dayList[i];
                if(currentSlot=='A')
                {
                    avoid.splice(i,0,i+1);
                }
                else if(currentSlot=='D')
                {
                    duty.splice(i,0,i+1);
                }
                else if(currentSlot=='N')
                {
                    noDuty.splice(i,0,i+1);
                }
            };
            if(avoid.length>0){
                thisDutyPreference.avoid=avoid;
            }
            if(duty.length>0){
                thisDutyPreference.duty=duty;
            }
            if(noDuty.length>0){
                thisDutyPreference.noDuty=noDuty;
            }
            var searchDutyPreference =-1;
            this.data.dutyPreference.forEach((x,index)=>{
                if(x.name==currentID){
                    searchDutyPreference=index;
                }
            });
            if(searchDutyPreference<0){
                this.data.dutyPreference.splice(0,0,thisDutyPreference);
            }else{
                var selected = this.data.dutyPreference[searchDutyPreference];
                selected.avoid = thisDutyPreference.avoid;
                selected.noDuty = thisDutyPreference.noDuty;
                selected.duty = thisDutyPreference.duty;
            }
            doctor.dutyString=(noDuty.length>0?("不值班:"+noDuty.join(",")):"")+"\t"
            +(avoid.length>0?("希望不值班:"+avoid.join(",")):"")+"\t"
            +(duty.length>0?("確定值班:"+duty.join(",")):"")+" ";
        },
        rightClickSlot:function(d,i)
        {
            var doctor=this.data.doctorList[d];
            var slot= this.data.doctorList[d].dayList[i];
            if(slot=='')
            {
                doctor.dayList.splice(i,1,'A');
            }else if(slot=='D')
            {
                doctor.dayList.splice(i,1,'');
            }else if(slot=='N')
            {
                doctor.dayList.splice(i,1,'D');
            }else
            {
                doctor.dayList.splice(i,1,'N');
            }
        },
        clear:function(d)
        {
            for(var i = 0; i < this.data.doctorList[d].dayList.length ; i++){
                this.data.doctorList[d].dayList.splice(i,1,'');
            }
        },
        moveUp:function(index){
            var temp = this.data.doctorList[index-1];
            this.data.doctorList.splice(index-1, 1, this.data.doctorList[index]);
            this.data.doctorList.splice(index, 1, temp);
        },
        moveDown:function(index){
            var temp = this.data.doctorList[index];
            this.data.doctorList.splice(index, 1, this.data.doctorList[index+1]);
            this.data.doctorList.splice(index+1, 1, temp);
        },
        addAt:function(index){
            this.data.doctorList.splice(index, 0, {
                name:this.data.doctorList[index].name,
                group:this.data.doctorList[index].group,
                main:this.data.doctorList[index].main,
                PI:this.data.doctorList[index].PI,
                NI:this.data.doctorList[index].NI,
                A91:this.data.doctorList[index].A91,
                A93:this.data.doctorList[index].A93,
                NB:this.data.doctorList[index].NB,
                workdayDuty:this.data.doctorList[index].workdayDuty,
                holidayDuty:this.data.doctorList[index].holidayDuty,
                dayList:Array(this.data.totalDay).fill('')
            });
        },
        delAt:function(index){
            if(this.data.doctorList.length>1)
            {
                this.data.doctorList.splice(index,1);
            }
        },
        save:function(){
            this.saveString=JSON.stringify(this.data);
        },
        load:function(){
            var loadedData = JSON.parse(this.saveString);
            this.data=loadedData;
        },
        calculate: function(){
            var doctorList= JSON.parse(JSON.stringify(this.data.doctorList));
            var dutyList = JSON.parse(JSON.stringify(this.data.emptyDutyList));
            var dayList = JSON.parse(JSON.stringify(this.data.dayList)); 
            var totalDay = JSON.parse(JSON.stringify(this.data.totalDay));
            for(var i = 0; i< doctorList.length;i++)
            {
                doctorList[i].index=i;
            }
            var groupedDoctorList = [];
            var doctorBins = [];
            for(var i = 0; i < dutyList.length ; i++)
            {   
                groupedDoctorList.push(doctorList.filter(x=>(x[dutyList[i].ward].WD+x[dutyList[i].ward].HD)>0));
                //console.log("group:" + i + " doctor count: " + groupedDoctorList[i].length);
                var newBin = { ward:dutyList[i].ward, WorkdayTokens:[], HolidayTokens:[] };
                var workdayDutyArray = [];
                var holidayDutyArray = [];
                groupedDoctorList[i].forEach((x)=>{
                    workdayDutyArray.push(Array(x[dutyList[i].ward].WD).fill(x.index));
                    holidayDutyArray.push(Array(x[dutyList[i].ward].HD).fill(x.index));
                });
                newBin.WorkdayTokens = insertSparsely(d3.shuffle(workdayDutyArray), this.data, false);
                newBin.HolidayTokens = insertSparsely(d3.shuffle(holidayDutyArray), this.data, true);
                //console.log("bin W-Day: "+newBin.ward+"=>"+newBin.WorkdayTokens.join(','));
                //console.log("bin H-Day: "+newBin.ward+"=>"+newBin.HolidayTokens.join(','));
                doctorBins.push(newBin);
            }
            var resultPool = this.data.resultPool;
            resultPool.length=0;
            var deadEnd = this.data.deadEnd;
            deadEnd.count=0;
            var param={};
            param.doctorList=doctorList;
            param.groupedDoctorList=groupedDoctorList;
            param.dutyList= dutyList;
            param.totalDay= totalDay;
            param.resultPool=resultPool;
            param.deadEnd=deadEnd;
            param.dayList=dayList;
            param.doctorBins=doctorBins;
            param.firstWeekDay=this.data.firstWeekDay;
            //console.log("param doctorBins: "+JSON.stringify(param.doctorBins));
            nextSlot(0, param);
            
            this.data.dutyList=resultPool[0];
            console.log('done');
        }
    },
    mounted:function(){
        this.initialize();
    }  
})

