this;'use strict';
var vm = new Vue({
    el:'#app',
    data:{data:{
        doctorList:[
            {name:"A",workdayDuty:5,holidayDuty:1,group:"",main:"PI",PI:true,NI:true,A91:true,A93:true,NB:true,dayList:[]},
            {name:"B",workdayDuty:5,holidayDuty:1,group:"",main:"NI",PI:true,NI:true,A91:true,A93:true,NB:true,dayList:[]},
            {name:"C",workdayDuty:5,holidayDuty:1,group:"",main:"91",PI:true,NI:true,A91:true,A93:true,NB:true,dayList:[]},
            {name:"D",workdayDuty:5,holidayDuty:1,group:"",main:"93",PI:true,NI:true,A91:true,A93:true,NB:true,dayList:[]},
            {name:"E",workdayDuty:5,holidayDuty:1,group:"",main:"NB",PI:true,NI:true,A91:true,A93:true,NB:true,dayList:[]}
        ],
        dayList:[],
        weekDayList:[],
        firstWeekDay:0,
        totalDay:31
    }},
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
                this.data.weekDayList.push(( Number((i % 7)) + Number(this.data.firstWeekDay)) %7);
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
                    this.data.doctorList[d].dayList=Array(this.data.totalDay).fill('');
                }
            }
        },//E=empty, D=duty, N=No, A=avoid
        clickGroup:function(d){
            if(this.data.doctorList[d].group==4) {this.data.doctorList[d].group=''}
            else{
                this.data.doctorList[d].group = Number(this.data.doctorList[d].group) +1;
            }
        },
        clickMain:function(d){
            if(this.data.doctorList[d].main=="PI") {this.data.doctorList[d].main='NI'}
            else if(this.data.doctorList[d].main=="NI") {this.data.doctorList[d].main='91'}
            else if(this.data.doctorList[d].main=="91") {this.data.doctorList[d].main='93'}
            else if(this.data.doctorList[d].main=="93") {this.data.doctorList[d].main='NB'}
            else if(this.data.doctorList[d].main=="NB") {this.data.doctorList[d].main='PI'}
        },
        clickPosition:function(d,pos){
            this.data.doctorList[d][pos]=!this.data.doctorList[d][pos];
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
            console.log(JSON.stringify(this.data));
            document.cookie="data="+JSON.stringify(this.data);
        },
        load:function(){
            this.data=document.cookie;
        }
    },
    mounted:function(){
        this.initialize();
    }  
})
