this;'use strict';
var counter=function(ward){
    return function(){
        var listOfWard = this.data.doctorList.filter(function(d){return d.main==ward;});
            return [this.data.doctorList && listOfWard.length,
            this.data.doctorList && d3.sum(listOfWard,function(d){return d.workdayDuty;} ),
            this.data.doctorList && d3.sum(listOfWard,function(d){return d.holidayDuty;} )
            ];
    }
};



var vm = new Vue({
    el:'#app',
    data:{
        saveString:"",
        dutyView:false,
        showResult:0,
        data:{
            doctorList:[
                {name:"A陳朝敏",workdayDuty:5,holidayDuty:2,group:"",main:"NI",PI:false,NI:false,A91:false,A93:false,NB:false,dayList:[],dutyString:""},
                //{name:"B張家瑗",workdayDuty:5,holidayDuty:2,group:"",main:"PI",PI:false,NI:false,A91:false,A93:false,NB:false,dayList:[],dutyString:""},
                {name:"C曾思穎",workdayDuty:6,holidayDuty:2,group:"",main:"PI",PI:false,NI:false,A91:false,A93:false,NB:false,dayList:[],dutyString:""},
                {name:"D陳裕璇",workdayDuty:6,holidayDuty:2,group:"",main:"PI",PI:false,NI:false,A91:false,A93:false,NB:false,dayList:[],dutyString:""},
                {name:"E唐翊軒",workdayDuty:6,holidayDuty:2,group:"",main:"PI",PI:false,NI:false,A91:false,A93:false,NB:false,dayList:[],dutyString:""},
                {name:"F黃治綱",workdayDuty:6,holidayDuty:2,group:"",main:"NI",PI:false,NI:false,A91:false,A93:false,NB:false,dayList:[],dutyString:""},
                //{name:"G范文博",workdayDuty:5,holidayDuty:2,group:"",main:"NI",PI:false,NI:false,A91:false,A93:false,NB:false,dayList:[],dutyString:""},
                //{name:"H黃心慧",workdayDuty:5,holidayDuty:2,group:"",main:"NI",PI:false,NI:false,A91:false,A93:false,NB:false,dayList:[],dutyString:""},
                {name:"I王亭皓",workdayDuty:6,holidayDuty:3,group:"",main:"NI",PI:false,NI:false,A91:false,A93:false,NB:false,dayList:[],dutyString:""},
                //{name:"J宋亭璇",workdayDuty:5,holidayDuty:2,group:"",main:"NI",PI:false,NI:false,A91:false,A93:false,NB:false,dayList:[],dutyString:""},
                {name:"K黃齡葳",workdayDuty:6,holidayDuty:3,group:"",main:"PI",PI:false,NI:false,A91:false,A93:false,NB:false,dayList:[],dutyString:""},
                {name:"L吳則霖",workdayDuty:6,holidayDuty:3,group:"",main:"NI",PI:false,NI:false,A91:false,A93:false,NB:false,dayList:[],dutyString:""},
                {name:"M黃映齊",workdayDuty:6,holidayDuty:3,group:"",main:"PI",PI:false,NI:false,A91:false,A93:false,NB:false,dayList:[],dutyString:""},
                {name:"N陳以恩",workdayDuty:6,holidayDuty:3,group:"",main:"91",PI:false,NI:false,A91:false,A93:false,NB:false,dayList:[],dutyString:""},
                {name:"O何正尹",workdayDuty:6,holidayDuty:3,group:"",main:"91",PI:false,NI:false,A91:false,A93:false,NB:false,dayList:[],dutyString:""},
                {name:"1",workdayDuty:6,holidayDuty:3,group:"",main:"93",PI:false,NI:false,A91:false,A93:false,NB:false,dayList:[],dutyString:""},
                {name:"2",workdayDuty:6,holidayDuty:3,group:"",main:"93",PI:false,NI:false,A91:false,A93:false,NB:false,dayList:[],dutyString:""},
                {name:"3",workdayDuty:6,holidayDuty:3,group:"",main:"93",PI:false,NI:false,A91:false,A93:false,NB:false,dayList:[],dutyString:""},
                {name:"4",workdayDuty:6,holidayDuty:3,group:"",main:"93",PI:false,NI:false,A91:false,A93:false,NB:false,dayList:[],dutyString:""},
                {name:"5",workdayDuty:6,holidayDuty:3,group:"",main:"93",PI:false,NI:false,A91:false,A93:false,NB:false,dayList:[],dutyString:""},
                {name:"6",workdayDuty:6,holidayDuty:3,group:"",main:"91",PI:false,NI:false,A91:false,A93:false,NB:false,dayList:[],dutyString:""},
                {name:"7",workdayDuty:6,holidayDuty:3,group:"",main:"91",PI:false,NI:false,A91:false,A93:false,NB:false,dayList:[],dutyString:""},
                {name:"8",workdayDuty:6,holidayDuty:3,group:"",main:"NB",PI:false,NI:false,A91:false,A93:false,NB:false,dayList:[],dutyString:""},
                {name:"9",workdayDuty:6,holidayDuty:3,group:"",main:"NB",PI:false,NI:false,A91:false,A93:false,NB:false,dayList:[],dutyString:""},
                {name:"10",workdayDuty:6,holidayDuty:3,group:"",main:"NB",PI:false,NI:false,A91:false,A93:false,NB:false,dayList:[],dutyString:""},
                {name:"11",workdayDuty:6,holidayDuty:3,group:"",main:"NB",PI:false,NI:false,A91:false,A93:false,NB:false,dayList:[],dutyString:""},
                {name:"a",workdayDuty:6,holidayDuty:3,group:"",main:"NB",PI:false,NI:false,A91:false,A93:false,NB:false,dayList:[],dutyString:""}
            ],
            dutyPreference:[
                {name:"A", noDuty:[12,13]},
                {name:"C", noDuty:[19,20],avoid:[4,5,6,12]},
                {name:"D", noDuty:[18,19,20]},
                {name:"E", noDuty:[1,5]},
                {name:"F", noDuty:[5,6,20,21,26]},
                {name:"I", noDuty:[26]},
                {name:"K", noDuty:[26,31]},
                {name:"L", noDuty:[13,20],avoid:[26]},
                {name:"M", noDuty:[26]},
                {name:"N", noDuty:[11,27],avoid:[27]},
                {name:"1", noDuty:[26,27,30,31]},
                {name:"2", noDuty:[1,8], avoid:[15,22,29]},
                {name:"3", noDuty:[13]},
                {name:"4", noDuty:[12,13]},
                {name:"7", noDuty:[22]},
                {name:"8", noDuty:[5,26]},
                {name:"9", noDuty:[10,11]},
                {name:"10", noDuty:[20],avoid:[5,6,31]},
                {name:"11", noDuty:[26,27]}
            ],
            dutyList:[
                {ward:"PI",dayList:[]},
                {ward:"NI",dayList:[]},
                {ward:"91",dayList:[]},
                {ward:"93",dayList:[]},
                {ward:"NB",dayList:[]}
            ],
            dayList:[],
            resultPool:[],
            deadEnd:{count:0},
            weekDayList:[],
            firstWeekDay:0,
            totalDay:31
        }
    },
    computed:{
        sumWorkday:function(){ return this.data.dayList && this.data.dayList.filter(function(a){return !a;}).length; },
        sumHoliday:function(){ return this.data.dayList && this.data.dayList.filter(function(a){return a;}).length; },
        PICounts:counter('PI'),
        NICounts:counter('NI'),
        A91Counts:counter('91'),
        A93Counts:counter('93'),
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
            for(var i = 0;i<this.data.dutyList.length;i++)
            {
                this.data.dutyList[i].dayList.length=0;
                for(var j = 0 ; j < this.data.totalDay;j++)
                {
                    this.data.dutyList[i].dayList.push('');
                }
            }
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
        clickWorkdayDuty:function(d){
            this.data.doctorList[d].workdayDuty+=1;
        },
        rightClickWorkdayDuty:function(d){
            if(this.data.doctorList[d].workdayDuty>0){
                this.data.doctorList[d].workdayDuty-=1;
            }
        },
        clickHolidayDuty:function(d){
            this.data.doctorList[d].holidayDuty+=1;
        },
        rightClickHolidayDuty:function(d){
            if(this.data.doctorList[d].holidayDuty>0){
                this.data.doctorList[d].holidayDuty-=1;
            }
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
        clickMain:function(d){
            if(this.data.doctorList[d].main=="PI") {this.data.doctorList[d].main='NI'}
            else if(this.data.doctorList[d].main=="NI") {this.data.doctorList[d].main='91'}
            else if(this.data.doctorList[d].main=="91") {this.data.doctorList[d].main='93'}
            else if(this.data.doctorList[d].main=="93") {this.data.doctorList[d].main='NB'}
            else if(this.data.doctorList[d].main=="NB") {this.data.doctorList[d].main='PI'}
        },
        rightClickMain:function(d){
            if(this.data.doctorList[d].main=="PI") {this.data.doctorList[d].main='NB'}
            else if(this.data.doctorList[d].main=="NI") {this.data.doctorList[d].main='PI'}
            else if(this.data.doctorList[d].main=="91") {this.data.doctorList[d].main='NI'}
            else if(this.data.doctorList[d].main=="93") {this.data.doctorList[d].main='91'}
            else if(this.data.doctorList[d].main=="NB") {this.data.doctorList[d].main='93'}
        },
        clickPosition:function(d,pos){
            this.data.doctorList[d][pos]=!this.data.doctorList[d][pos];
        },
        clickSlot:function(d,i)
        {
            var doctor=this.data.doctorList[d];
            var slot= this.data.doctorList[d].dayList[i];
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
            }
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
        calculate:function(){
            var doctorList= JSON.parse(JSON.stringify(this.data.doctorList));
            var dutyList = JSON.parse(JSON.stringify([{ward:"PI",dayList:[]},{ward:"NI",dayList:[]},{ward:"91",dayList:[]},{ward:"93",dayList:[]},{ward:"NB",dayList:[]}]));
            var dayList = JSON.parse(JSON.stringify(this.data.dayList)); 
            var totalDay = JSON.parse(JSON.stringify(this.data.totalDay));
            for(var i = 0; i< doctorList.length;i++)
            {
                doctorList[i].index=i;
            }
            var groupedDoctorList = [];
            for(var i = 0; i < dutyList.length ; i++)
            {   
                groupedDoctorList.push(doctorList.filter((x)=>x.main==dutyList[i].ward));
                console.log("group:" + i + "doctor count: " + groupedDoctorList[i].length);
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
            nextSlot(0, 0, param);
            this.data.dutyList=resultPool[0];
        }
    },
    mounted:function(){
        this.initialize();
    }  
})

