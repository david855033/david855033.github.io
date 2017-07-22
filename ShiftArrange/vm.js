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
        data:{
            doctorList:[
                {name:"A陳朝敏",workdayDuty:5,holidayDuty:2,group:"",main:"PI",PI:false,NI:false,A91:false,A93:false,NB:false,dayList:[]},
                //{name:"B張家瑗",workdayDuty:5,holidayDuty:2,group:"",main:"PI",PI:false,NI:false,A91:false,A93:false,NB:false,dayList:[]},
                {name:"C曾思穎",workdayDuty:5,holidayDuty:2,group:"",main:"PI",PI:false,NI:false,A91:false,A93:false,NB:false,dayList:[]},
                {name:"D陳裕璇",workdayDuty:5,holidayDuty:2,group:"",main:"PI",PI:false,NI:false,A91:false,A93:false,NB:false,dayList:[]},
                {name:"E唐翊軒",workdayDuty:5,holidayDuty:2,group:"",main:"PI",PI:false,NI:false,A91:false,A93:false,NB:false,dayList:[]},
                {name:"F黃治綱",workdayDuty:5,holidayDuty:2,group:"",main:"NI",PI:false,NI:false,A91:false,A93:false,NB:false,dayList:[]},
                //{name:"G范文博",workdayDuty:5,holidayDuty:2,group:"",main:"NI",PI:false,NI:false,A91:false,A93:false,NB:false,dayList:[]},
                //{name:"H黃心慧",workdayDuty:5,holidayDuty:2,group:"",main:"NI",PI:false,NI:false,A91:false,A93:false,NB:false,dayList:[]},
                {name:"I王亭皓",workdayDuty:5,holidayDuty:2,group:"",main:"NI",PI:false,NI:false,A91:false,A93:false,NB:false,dayList:[]},
                //{name:"J宋亭璇",workdayDuty:5,holidayDuty:2,group:"",main:"NI",PI:false,NI:false,A91:false,A93:false,NB:false,dayList:[]},
                {name:"K黃齡葳",workdayDuty:5,holidayDuty:2,group:"",main:"91",PI:false,NI:false,A91:false,A93:false,NB:false,dayList:[]},
                {name:"L吳則霖",workdayDuty:5,holidayDuty:2,group:"",main:"91",PI:false,NI:false,A91:false,A93:false,NB:false,dayList:[]},
                {name:"M黃映齊",workdayDuty:5,holidayDuty:2,group:"",main:"91",PI:false,NI:false,A91:false,A93:false,NB:false,dayList:[]},
                {name:"N陳以恩",workdayDuty:5,holidayDuty:2,group:"",main:"91",PI:false,NI:false,A91:false,A93:false,NB:false,dayList:[]},
                {name:"O何正尹",workdayDuty:5,holidayDuty:2,group:"",main:"91",PI:false,NI:false,A91:false,A93:false,NB:false,dayList:[]},
                {name:"1",workdayDuty:5,holidayDuty:2,group:"",main:"93",PI:false,NI:false,A91:false,A93:false,NB:false,dayList:[]},
                {name:"2",workdayDuty:5,holidayDuty:2,group:"",main:"93",PI:false,NI:false,A91:false,A93:false,NB:false,dayList:[]},
                {name:"3",workdayDuty:5,holidayDuty:2,group:"",main:"93",PI:false,NI:false,A91:false,A93:false,NB:false,dayList:[]},
                {name:"4",workdayDuty:5,holidayDuty:2,group:"",main:"93",PI:false,NI:false,A91:false,A93:false,NB:false,dayList:[]},
                {name:"5",workdayDuty:5,holidayDuty:2,group:"",main:"93",PI:false,NI:false,A91:false,A93:false,NB:false,dayList:[]},
                {name:"6",workdayDuty:5,holidayDuty:2,group:"",main:"NB",PI:false,NI:false,A91:false,A93:false,NB:false,dayList:[]},
                {name:"7",workdayDuty:5,holidayDuty:2,group:"",main:"NB",PI:false,NI:false,A91:false,A93:false,NB:false,dayList:[]},
                {name:"8",workdayDuty:5,holidayDuty:2,group:"",main:"NB",PI:false,NI:false,A91:false,A93:false,NB:false,dayList:[]},
                {name:"9",workdayDuty:5,holidayDuty:2,group:"",main:"NB",PI:false,NI:false,A91:false,A93:false,NB:false,dayList:[]},
                {name:"10",workdayDuty:5,holidayDuty:2,group:"",main:"NB",PI:false,NI:false,A91:false,A93:false,NB:false,dayList:[]},
                {name:"11",workdayDuty:5,holidayDuty:2,group:"",main:"NB",PI:false,NI:false,A91:false,A93:false,NB:false,dayList:[]},
                {name:"a",workdayDuty:5,holidayDuty:2,group:"",main:"NB",PI:false,NI:false,A91:false,A93:false,NB:false,dayList:[]}
            ],
            noDuty:[
                {name:"A", day:[12,13]},
                {name:"C", day:[19,20],avoid:[4,5,6,12]},
                {name:"D", day:[18,19,20]},
                {name:"E", day:[1,5]},
                {name:"F", day:[5,6,20,21,26]},
                {name:"I", day:[26]},
                {name:"K", day:[26,31]},
                {name:"L", day:[13,20],avoid:[26]},
                {name:"M", day:[26]},
                {name:"N", day:[11,27],avoid:[27]},
                {name:"1", day:[26,27,30,31]},
                {name:"2", day:[1,8], avoid:[15,22,29]},
                {name:"3", day:[13]},
                {name:"4", day:[12,13]},
                {name:"7", day:[22]},
                {name:"8", day:[5,26]},
                {name:"9", day:[10,11]},
                {name:"10", day:[20],avoid:[5,6,31]},
                {name:"11", day:[26,27]}
            ],
            dayList:[],
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
    methods:
    {
        initialize:function(){
            this.initializeDayList();
            this.initializeDoctorList();
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
                    this.data.doctorList[d].dayList.splice(this.data.totalDay,currentLength-this.data.totalDay);
                }else{
                    for(var i = currentLength; i < this.data.totalDay ; i++){
                        this.data.doctorList[d].dayList.splice(i,0,'');
                    }
                }
            }
        },//''=empty, D=duty, N=No, A=avoid
        initializeNoDuty:function(){

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
            var loadedData = JSON.parse( this.saveString);
            this.data=loadedData;
        }
    },
    mounted:function(){
        this.initialize();
    }  
})
