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
    {"hour": "48","level": "15.25"},
    {"hour": "60","level": "16.5"},
    {"hour": "72","level": "17.5"},
    {"hour": "84","level": "18.8"},
    {"hour": "96","level": "19.9"},
    {"hour": "108","level": "20.5"},
    {"hour": "120","level": "21"},
    {"hour": "168","level": "21"},
];
JaundiceData.MidRisk = [
    {"hour": "0","level": "5"},
    {"hour": "12","level": "7.5"},
    {"hour": "24","level": "9.75"},
    {"hour": "36","level": "11.5"},
    {"hour": "48","level": "13"},
    {"hour": "60","level": "14.25"},
    {"hour": "72","level": "15.25"},
    {"hour": "84","level": "16.4"},
    {"hour": "96","level": "17"},
    {"hour": "108","level": "18"},
    {"hour": "168","level": "18"},
];
JaundiceData.HighRisk = [
    {"hour": "0","level": "4"},
    {"hour": "12","level": "5.8"},
    {"hour": "24","level": "7.5"},
    {"hour": "36","level": "9.5"},
    {"hour": "48","level": "11.25"},
    {"hour": "60","level": "12.4"},
    {"hour": "72","level": "13.5"},
    {"hour": "84","level": "14"},
    {"hour": "96","level": "14.5"},
    {"hour": "108","level": "15"},
    {"hour": "168","level": "15"},
];
var $graphWrapper = $('.graph.wrapper');
var drawGraph=function(){
    $graphWrapper.empty();
    // set the dimensions and margins of the graph
    var margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = Math.min($graphWrapper.width() - margin.left - margin.right,400),
        height = $graphWrapper.height() - margin.top - margin.bottom;
    // set the ranges
    var x = d3.scaleLinear().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    // define the line
    var valueline = d3.line()
        .x(function(d) { return x(d.hour); })
        .y(function(d) { return y(d.level); });

    // append the svg obgect to the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    var svg = d3.select(".graph.wrapper").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // Scale the range of the data
    x.domain([0,180]);
    y.domain([0,26]);

    // Add the valueline path.
    svg.append("path")
        .data([JaundiceData.LowRisk])
        .attr("class", "line")
        .attr("d", valueline);

    svg.append("path")
        .data([JaundiceData.MidRisk])
        .attr("class", "line")
        .attr("d", valueline);

        svg.append("path")
        .data([JaundiceData.HighRisk])
        .attr("class", "line")
        .attr("d", valueline);

    // Add the X Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickValues(d3.range(0, 180, 24)));

    // Add the Y Axis
    svg.append("g")
        .call(d3.axisLeft(y).tickValues(d3.range(0, 26, 5)));
}

$(drawGraph);
$(window).resize(drawGraph);