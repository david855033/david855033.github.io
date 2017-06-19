'use strict'



var app=new Vue({
    el: '#app',
    data:{
        dataset: "vghtpe",
        destiny: "vghtpe2",
        drugList:[]
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
                console.log(data);
            });
        },createNewDosage:function(index)
        {
            console.log(index);
            this.drugList[index].content.push(
                    {});
        },insertMedication:function(index)
        {
            console.log(index);
            this.drugList.splice(index+1,0,{ });
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