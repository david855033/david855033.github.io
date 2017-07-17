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
        testMode:false,
        selectedAge:"",
        selectedComp:"",
        selectedGroup:"",
        content:[
            {pt:"",pheresis:""},
            {pt:"",pheresis:""},
            {pt:"",pheresis:""},
            {pt:"",pheresis:""},
            {pt:"",pheresis:""}
        ],
        order:""
    },
    computed:{
        headerPT:function(){
            if(this.selectedComp=="uncomp"){
                return '建議照光之TSB值<br><span class="subtitle">uncomplicated</span>';
            }else if(this.selectedComp=="comp"){
                return '建議照光之TSB值<br><span class="subtitle">complicated</span>';
            }
            else
            {
                return '建議照光之TSB值<br><span class="subtitle">uncomplicated/complicated</span>';
            }
        },
        headerPheresis:function(){
            if(this.selectedComp=="uncomp"){
                return '建議換血之TSB值<br><span class="subtitle">uncomplicated</span>';
            }else if(this.selectedComp=="comp"){
                return '建議換血之TSB值<br><span class="subtitle">complicated</span>';
            }
            else
            {
                return '建議換血之TSB值<br><span class="subtitle">uncomplicated/complicated</span>';
            }
        }
    },
    methods:{
        renderContent:function(){
            for(var i = 0; i < 5; i++)
            {
                var compStringPT, uncompStringPT, compStringPheresis, uncompStringPheresis;
                if(this.selectedAge==1)
                {
                    uncompStringPT = dataBank.uncomp.pt[i].low;
                    compStringPT = dataBank.comp.pt[i].low;
                    uncompStringPheresis = dataBank.uncomp.pheresis[i].low;
                    compStringPheresis = dataBank.comp.pheresis[i].low;
                }else if(this.selectedAge==2){
                    uncompStringPT = (dataBank.uncomp.pt[i].low + dataBank.uncomp.pt[i].high)/2;
                    compStringPT = (dataBank.comp.pt[i].low + dataBank.comp.pt[i].high)/2;
                    uncompStringPheresis = (dataBank.uncomp.pheresis[i].low+dataBank.uncomp.pheresis[i].high)/2;
                    compStringPheresis = (dataBank.comp.pheresis[i].low+dataBank.comp.pheresis[i].high)/2;
                }else if(this.selectedAge==3){
                    uncompStringPT = dataBank.uncomp.pt[i].high;
                    compStringPT = dataBank.comp.pt[i].high;
                    uncompStringPheresis = dataBank.uncomp.pheresis[i].high;
                    compStringPheresis = dataBank.comp.pheresis[i].high;
                }else{
                    uncompStringPT = dataBank.uncomp.pt[i].low+"-"+dataBank.uncomp.pt[i].high;
                    compStringPT = dataBank.comp.pt[i].low+"-"+dataBank.comp.pt[i].high;
                    uncompStringPheresis = dataBank.uncomp.pheresis[i].low+"-"+dataBank.uncomp.pheresis[i].high;
                    compStringPheresis = dataBank.comp.pheresis[i].low+"-"+dataBank.comp.pheresis[i].high;
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
            if(this.selectedComp&&this.selectedAge&&(this.selectedGroup!==""))
            {
                var PT1 = this.content[this.selectedGroup].pt;
                var PT2 = Math.floor((this.content[this.selectedGroup].pt+this.content[this.selectedGroup].pheresis)/2);
                var PT3 = this.content[this.selectedGroup].pheresis-1;
                this.order="Bil>"+PT1+": PT x 1,<br>Bil>"+PT2+": PT x 2,<br>Bil>"+PT3+": PT x 3";
            }else
            {
                this.order="選取參數後將會自動顯示治療處置<br>";
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
        selectGroup:function(group){
            if(this.selectedGroup===group)
            {
                this.selectedGroup="";
            }
            else{
                this.selectedGroup=group;
            }
            this.renderContent();
        }
    },
    mounted:function(){
        this.renderContent();
    }
})

var JaundiceData={}
JaundiceData.LowRisk = [
    {"hour": "0","level": "6.5"},
    {"hour": "12","level": "9"},
    {"hour": "24","level": "11.5"},
    {"hour": "36","level": "13.5"},
    {"hour": "48","level": "15.25"}
];

var graph = d3.select("#graph");
var width = $('#graph').width();
console.log(width);
var xScale = d3.scaleLinear().domain([0,168]).range([20, width - 20]);
console.log(xScale(20));

var height =  $('#graph').height();
console.log(height);
var yScale = d3.scaleLinear().domain([0,25]).range([20, height - 20]);
console.log(yScale(5));

var xAxis = d3.svg.axis().scale(xScale);
var yAxis = d3.svg.axis().scale(yScale);