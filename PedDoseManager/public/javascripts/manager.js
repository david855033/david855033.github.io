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
                    vueInstance.drugList.push(data[i]);
                }
            });
        }
    }
});