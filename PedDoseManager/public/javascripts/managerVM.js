'use strict'



var app=new Vue({
    el: '#app',
    data:{
        dataset: "vghtpe",
        destiny: "vghtpe2",
        drugList:[],
        searchText:"",
        searchTextInput:"",
        bw_checked:0,
        searchList:[]
    },
    computed:{
        bwForCalculation:function(){
            if(typeof this.bw_checked=='string'&&this.isBwInGram)
            {
                return this.bw_checked.toString().match(/\d+[.]?\d*/)/1000;
            }else if(this.bw_checked)
            {
                return this.bw_checked;
            }else
            {
                return 0;
            }
        },
        isBwInGram:function(){
            return checkLastChar(this.bw_checked.toLowerCase(),"g");
        }
    },
    methods:{
        getjson:function()
        {
            console.log("getjson: "+this.dataset);
            this.drugList.length=0;
            var vueInstance=this;
            $.get("http://localhost:3000/manage/"+this.dataset+"/getjson",function(data){
                for(var i = 0 ; i <data.length;i++)
                {
                    //convert old styles
                    data[i].drugName=data[i].drugName.replaceAll("<br>","\n");
                    data[i].indication=data[i].indication.replaceAll("<br>","\n");
                    if(data[i].info)
                    {
                        data[i].info=data[i].info.replaceAll("<li>","\n").trim();
                    }
                    if(data[i].content)
                    {   
                        for(var j = 0; j<data[i].content.length;j++)
                        {
                            if(data[i].content[j].description)
                            {
                                data[i].content[j].description=data[i].content[j].description.replaceAll("<br>","\n");
                            }
                            if(data[i].content[j].dosage)
                            {
                                data[i].content[j].dosage=data[i].content[j].dosage.replaceAll("<br>","\n");
                            }
                            if(data[i].content[j].equation)
                            {
                                data[i].content[j].equation=data[i].content[j].equation.replaceAll("<br>","\n");
                            }
                        }
                    }
                    //--convert old styles
                    
                    vueInstance.drugList.push(data[i]);
                    vueInstance.calculateDose();
                }
            });
        },
        postjson:function()
        {
            console.log("postjson: "+this.dataset);
            var vueInstance=this;
            $.ajax({
                type: "POST",
                url: "http://localhost:3000/manage/"+this.dataset+"/postjson",
                data: JSON.stringify(vueInstance.drugList),
                contentType: "application/json; charset=utf-8",
                dataType: "json"
            });
        },makestable:function()
        {
            console.log("makestable: "+this.dataset);
            $.get( "http://localhost:3000/manage/"+this.dataset+"/makestable", function( data ) {
            });
        },createNewDosage:function(index)
        {
            this.drugList[index].content.push(
                    {});
        },insertMedication:function(index)
        {
            this.drugList.splice(index+1,0,{ });
        },deleteDrug:function(index)
        {
            this.drugList.splice(index,1);
        },copyDrug:function(index)
        {
            this.drugList.splice(index+1,0,this.drugList[index]);
        },deleteDose:function(index,rowindex)
        {
            this.drugList[index].content.splice(rowindex,1);
        },copyDose:function(index,rowindex)
        {
            this.drugList[index].content.splice(rowindex+1,0,this.drugList[index].content[rowindex]);
        }, convertLimit:function(row)
        {
            var result="";
            var bwLimitL=row.bwLimitL;
            var bwLimitU=row.bwLimitU;
            if(bwLimitL&&bwLimitL<=4)
            {
                bwLimitL=bwLimitL*1000+"g";
            }else{bwLimitL+="kg";}
            if(bwLimitU&&bwLimitU<=4)
            {
                bwLimitU=bwLimitU*1000+"g";
            }else{bwLimitL+="kg";}

            if(row.bwLimitL&&row.bwLimitU)
            {
                result = bwLimitL +"-" + bwLimitU;
            }else if(row.bwLimitL)
            {
                result = "≧"+bwLimitL;
            }else if(row.bwLimitU)
            {
                result = "≦"+bwLimitU;
            }

            var ageLimitL=row.ageLimitL;
            var ageLimitU=row.ageLimitU;
            if(ageLimitL)
            {
                if(ageLimitL.toLowerCase().indexOf("d")>=0)
                {
                    ageLimitL=ageLimitL.toLowerCase().replaceAll("d","天");
                }else{
                    ageLimitL+="歲";
                }
            }
            if(ageLimitU)
            {
                if(ageLimitU.toLowerCase().indexOf("d")>=0)
                {
                    ageLimitU=ageLimitU.toLowerCase().replaceAll("d","天");
                }else{
                    ageLimitU+="歲";
                }
            }

            if(ageLimitL&&ageLimitU)
            {
                if(result){result +=" ";}
                result += ageLimitL +"-" + ageLimitU;
            }else if(ageLimitL)
            {
                if(result){result +=", ";}
                result += "≧"+ageLimitL;
            }else if(ageLimitU)
            {
                if(result){result +=", ";}
                result += "≦"+ageLimitU;
            }
            result=result.trim();
            row.description=result;
        },
        sort:function()
        {
            this.drugList.sort(function(a,b){
                return a.drugName.toLowerCase().localeCompare(b.drugName.toLowerCase())}
            );
        },
        checkSearchText: function(item){
            if(!this.searchText)  {
                return true;
            } 
            if(item.drugName.toLowerCase().indexOf(this.searchText.toLowerCase())>=0){
                return true;
            }
            if(item.indication.toLowerCase().indexOf(this.searchText.toLowerCase())>=0){
                return true;
            }
            if(item.tag){
                if(typeof item.tag === 'string')
                {
                    if(item.tag.toLowerCase()==this.searchText.toLowerCase())
                    {
                        return true;
                    }
                }
                else
                {
                    for(var i = 0; i < item.tag.length ; i++)
                    {
                        if(item.tag[i].toLowerCase()==this.searchText.toLowerCase())
                        {
                            return true;
                        }
                    }
               }
            }
        },
        makeSearchList:function(){
            for(var i = 0; i < this.drugList.length;i++)
            {
                if(this.drugList[i].tag && this.searchList.indexOf(this.drugList[i].tag)<0){
                    this.searchList.push(this.drugList[i].tag);
                }
            }
        },setSearchText:_.debounce(function(){
            this.searchText=this.searchTextInput;
            console.log('set');
        },300),
        calculateDose:function(){
            for(var i = 0; i< this.drugList.length;i++)
            {
                var thisDrug=this.drugList[i];
                this.calculateDoseDrug(thisDrug);
            };
        },calculateDoseDrug:function(thisDrug)
        {
            for(var j = 0;j<thisDrug.content.length;j++)   
            {
                var thisDose=thisDrug.content[j];
                this.calculateDoseThisDose(thisDose);
            }
        },calculateDoseThisDose:function(thisDose)
        {
            var prestring=thisDose.equation;
            var match=prestring.match(/[\[].*?[\]]/g);
            if(match)
            {
                for(var k=0; k<match.length;k++)
                {
                    var equation=match[k].slice(1,match[k].length-1);
                    var split = equation.split('*');
                    var multipier=split[1]?split[1]:1;
                    var max=split[3]?split[3]:-1;
                    var bw_checked=this.bwForCalculation;
                    var result=bw_checked*multipier;
                    var isMax=false;
                    if(max>0&&result>max) {result=max; isMax=true;}

                    var digi = equation.split('*')[2]?equation.split('*')[2]:1;
                    result = parseFloat(Math.round(result/digi)*digi).toFixed(3)*1;
                    if(isMax) {
                        result = "["+result+"]";
                    }
                    prestring=prestring.replace(match[k],result);
                }
                thisDose.calculated=prestring;
            }
        }
    },
    watch:{
        searchTextInput:function(){
            console.log('watched');
           this.setSearchText();
        }
    },
    mounted:function(){
        this.getjson();
    }
});

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

var checkLastChar=function(s,c){
    if(s && typeof s === "string"){
        s=s.toLowerCase();
        return (s.slice(-1)==c);
    }else
    {return false;}
}