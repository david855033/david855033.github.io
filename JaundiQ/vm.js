'use strict';
var dataBank=
{
    uncomp:{
        pt:[
            {low:6,high:7},
            {low:6,high:7},
            {low:7,high:8},
            {low:8,high:10},
            {low:10,high:11}
        ],
        pheresis:[
            {low:12,high:13},
            {low:12,high:14},
            {low:14,high:16},
            {low:16,high:20},
            {low:20,high:22}
        ]
    },
    comp:{
        pt:[
            {low:5,high:6},
            {low:5,high:6},
            {low:6,high:7},
            {low:7,high:9},
            {low:9,high:10}
        ],
        pheresis:[
            {low:10,high:12},
            {low:10,high:12},
            {low:12,high:14},
            {low:15,high:17},
            {low:18,high:20}
        ]
    }
}

var vm = new Vue({
    el:'#vm',
    data:{
        selectedAge:"",
        selectedComp:"",
        content:[
            {pt:"",pheresis:""},
            {pt:"",pheresis:""},
            {pt:"",pheresis:""},
            {pt:"",pheresis:""},
            {pt:"",pheresis:""}
        ]
    },
    methods:{
        renderContent:function(){
            for(var i = 0; i < 5; i++)
            {
                var compStringPT, uncompStringPT, compStringPheresis, uncompStringPheresis;
                if(this.selectedAge==1)
                {
                    compStringPT = dataBank.comp.pt[i].low;
                    uncompStringPT = dataBank.uncomp.pt[i].low;
                    compStringPheresis = dataBank.comp.pheresis[i].low;
                    uncompStringPheresis = dataBank.uncomp.pheresis[i].low;
                }else if(this.selectedAge==2){
                    compStringPT = (dataBank.comp.pt[i].low + dataBank.comp.pt[i].high)/2;
                    uncompStringPT = (dataBank.uncomp.pt[i].low + dataBank.uncomp.pt[i].high)/2;
                    compStringPheresis = (dataBank.comp.pheresis[i].low+dataBank.comp.pheresis[i].high)/2;
                    uncompStringPheresis = (dataBank.uncomp.pheresis[i].low+dataBank.comp.pheresis[i].high)/2;
                }else if(this.selectedAge==3){
                    compStringPT = dataBank.comp.pt[i].high;
                    uncompStringPT = dataBank.uncomp.pt[i].high;
                    compStringPheresis = dataBank.comp.pheresis[i].high;
                    uncompStringPheresis = dataBank.uncomp.pheresis[i].high;
                }else{
                    compStringPT = dataBank.comp.pt[i].low+"-"+dataBank.comp.pt[i].high;
                    uncompStringPT = dataBank.uncomp.pt[i].low+"-"+dataBank.uncomp.pt[i].high;
                    compStringPheresis = dataBank.comp.pheresis[i].low+"-"+dataBank.comp.pheresis[i].high;
                    uncompStringPheresis = dataBank.uncomp.pheresis[i].low+"-"+dataBank.uncomp.pheresis[i].high;
                }
                
                if(this.selectedComp=="uncomp")
                {
                    this.content[i].pt = uncompStringPT;    
                    this.content[i].pheresis = uncompStringPheresis;    
                }else if(this.selectedComp=="comp")
                {
                    this.content[i].pt = compStringPT;
                    this.content[i].pheresis = compStringPheresis;
                }else{
                    this.content[i].pt= uncompStringPT + " / "+ compStringPT;
                    this.content[i].pheresis= uncompStringPheresis + " / "+ compStringPheresis;
                }
            }
        },
        selectComp:function(comp){
            if(this.selectedComp==comp)
            {
                this.selectedComp="";
            }
            else{
                this.selectedComp=comp;
            }
            this.renderContent();
        },
        selectAge:function(age){
            if(this.selectedAge==age)
            {
                this.selectedAge="";
            }
            else{
                this.selectedAge=age;
            }
            this.renderContent();
        },        
    },
    mounted:function(){
        this.renderContent();
    }
})