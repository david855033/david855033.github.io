'use strict'




function Render(){
    app.age="";
    app.bw="";
    app.drugList.length=0;
    makeStyle();
    for(var i = 0 ; i < DataSource.length;i++ )
    {
        var data=DataSource[i];
        app.drugList.push(data);
    }
    
    app.OnAgeChange();
    app.OnBWChange();
    app.calculateDose();
}

function makeStyle(){
    for(var i = 0 ; i < DataSource.length;i++ )
    {
        if( DataSource[i].indication )
        {
            DataSource[i].indication = DataSource[i].indication.replace("[","<span class='emphasize'>");
            DataSource[i].indication = DataSource[i].indication.replace("]","</span>");
        }
        if( DataSource[i].drugName)
        {
            DataSource[i].drugName = DataSource[i].drugName.replace("(","<span class='subtittle'>(");
            DataSource[i].drugName = DataSource[i].drugName.replace(")",")</span>");
        }
    }
}


var app = new Vue({
    el: '#app',
    data: {
        testmode:false,
        drugList:[],
        age:0,
        bw:0,
        isAgeInDay:false,
        isBwInGram:false
    },computed:{
        bwForCalculation:function(){
            if(this.isBwInGram)
            {
                return this.bw.toString().match(/\d+[.]?\d*/)/1000;
            }else
            {
                return this.bw;
            }
        },
        ageInDay:function(){
            if(this.isAgeInDay)
            {
                return this.getDay(this.age);
            }else
            {
                return this.age*365;
            }
        }
    },
    methods:{
        checkAgeAndBW:function (input){
            var bwCheck =!app.bw || (!input.bwLimitL || this.bwForCalculation >= input.bwLimitL)&&
                (!input.bwLimitU || this.bwForCalculation <= input.bwLimitU);
            

            var ageCheckL;
            if(!input.ageLimitL || !app.age){
                ageCheckL=true;
            }else
            {
                var ageLimitLinDay;
                if(this.checkLastChar(input.ageLimitL,"d")){
                    ageLimitLinDay=this.getDay(input.ageLimitL);
                }
                else{
                   ageLimitLinDay=input.ageLimitL*365;
                }
                ageCheckL= this.ageInDay>=ageLimitLinDay;
            }

            var ageCheckU;
            if(!input.ageLimitU || !app.age){
                ageCheckU=true;
            }else
            {
                var ageLimitUinDay;
                if(this.checkLastChar(input.ageLimitU,"d")){
                    ageLimitUinDay=this.getDay(input.ageLimitU);
                }
                else{
                   ageLimitUinDay=input.ageLimitU*365;
                }
                ageCheckU= this.ageInDay<=ageLimitUinDay;
            }

            
            return bwCheck && ageCheckL&&ageCheckU;
        },
        calculateDose:function(){
            for(var i = 0; i< this.drugList.length;i++)
            {
                var thisDrug=this.drugList[i];
                for(var j = 0;j<thisDrug.content.length;j++)
                {
                    var prestring=thisDrug.content[j].equation;
                    var match=prestring.match(/[\[].*?[\]]/g);
                    if(match)
                    {
                        for(var k=0; k<match.length;k++)
                        {
                            var equation=match[k].slice(1,match[k].length-1);
                            var split = equation.split('*');
                            var multipier=split[1]?split[1]:1;
                            var max=split[3]?split[3]:-1;
                            var bw=this.bwForCalculation.toString();

                            var result=bw*multipier;
                            var isMax=false;
                            if(max>0&&result>max) {result=max; isMax=true;}

                            var digi = equation.split('*')[2]?equation.split('*')[2]:1;
                            result = parseFloat(Math.round(result/digi)*digi).toFixed(3)*1;
                            if(isMax) {
                                result = "<span class='maxDose'>"+result+"</span>";
                            }
                            prestring=prestring.replace(match[k],result);
                        }
                        thisDrug.content[j].calculated=prestring;
                    }
                }
            }
        },
        OnAgeChange:function(){
            if(this.age && typeof this.age ==="string")
            {
                var matchValue = this.age.toString().match(/[1-9]\d*[dD]?/);
                this.age=matchValue||"";
                this.isAgeInDay=this.checkLastChar(this.age.toString(),"d");
            }
            this.calculateDose();
        },
        OnBWChange:function(){
            if(this.bw && typeof this.bw ==="string")
            {
                var matchValue = this.bw.toString().match(/[1-9]\d*[.]?\d*[gG]?/);
                this.bw=matchValue||"";
                this.isBwInGram=this.checkLastChar(this.bw.toString(),"g");
            }
            this.calculateDose();
        },
        checkLastChar:function(s,c){
            if(s && typeof s === "string"){
                s=s.toLowerCase();
                return (s.slice(-1)==c);
            }else
            {return false;}
        },
        getDay:function(input){
            return parseInt(input.toString().match(/\d+[.]?\d*/));
        }
    }
});