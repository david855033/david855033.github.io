var vm = new Vue(
{
    el:'#app',
    data:{
        name:'恩提斯之女',
        birthday:'2017-08-07',
        patientNo:'40236547',
        adminNo:'2358736',
        currentDate:'2017-08-07',
        recordList:[
            {"date":'2017-08-07',"score":25},
            {"date":'2017-08-08',"score":20},
            {"date":'2017-08-09',"score":15},
        ],
        colNumber:3,
        showDetail:true,
        tables:[
            {
                tableName:"Respiratory",
                items:[
                    {name:'',info:'',score:'',group:'',selected:false},
                    {name:'Supplement Oxygen', info:'',
                        score:1,group:'A',selected:false},
                    {name:'Continuous Positive Airway Pressure', info:'',
                        score:2,group:'A',selected:false},
                    {name:'Mechanical Ventilation', info:'',
                        score:3,group:'A',selected:false},
                    {name:'Mechanical Ventilation with Muscle Relaxation', info:'',
                        score:4,group:'A',selected:false},
                    {name:'High-frequency Ventilation', info:'',
                        score:4,group:'A',selected:false},
                    {name:'',info:'',score:'',group:'',selected:false},
                    {name:'Endotracheal Intubation', info:'',
                        score:2,group:'',selected:false},
                    {name:'',info:'',score:'',group:'',selected:false},
                    {name:'Surfactant Administration', info:'',
                        score:1,group:'',selected:false},
                    {name:'',info:'',score:'',group:'',selected:false},
                    {name:'Tracheostomy Care', info:'',
                        score:1,group:'B',selected:false},
                    {name:'Tracheostomy Placement', info:'',
                        score:1,group:'B',selected:false},
                    {name:'',info:'',score:'',group:'',selected:false},
                    {name:'Extracorporeal Membrane Oxygenation', info:'',
                        score:4,group:'',selected:false},
                    {name:'',info:'',score:'',group:'',selected:false}
                ]
            },
            {
                tableName:"Drug Therapy",
                items:[
                    {name:'',info:'',score:'',group:'',selected:false},
                    {name:'Antibiotics Administration(≤2 agents)', info:'',
                        score:1,group:'F',selected:false},
                    {name:'Antibiotics Administration(>2 agents)', info:'',
                        score:2,group:'F',selected:false},
                    {name:'',info:'',score:'',group:'',selected:false},
                    {name:'Diuretic Administration(Enteral)', info:'',
                        score:1,group:'G',selected:false},
                    {name:'Diuretic Administration(Parenteral)', info:'',
                        score:2,group:'G',selected:false},
                    {name:'',info:'',score:'',group:'',selected:false},
                    {name:'Steroid Administration', info:'',
                        score:1,group:'',selected:false},
                    {name:'Anticonvulsant Administration', info:'',
                        score:1,group:'',selected:false},
                    {name:'Aminophylline Administration', info:'',
                        score:1,group:'',selected:false},
                    {name:'Other Unscheduled Medication', info:'',
                        score:1,group:'',selected:false},
                    {name:'Treatment of Metabolic Acidosis', info:'',
                        score:3,group:'',selected:false},
                    {name:'Potassium Binding Resin Administration', info:'',
                        score:3,group:'',selected:false},
                    {name:'',info:'',score:'',group:'',selected:false}
                ]
            },
            {
                tableName:"Cardiovascular",
                items:[
                    {name:'',info:'',score:'',group:'',selected:false},
                    {name:'Indomethacin Administration', info:'',
                        score:1,group:'',selected:false,spacing:true},
                    {name:'',info:'',score:'',group:'',selected:false},
                    {name:'Volume Expansion ≤ 15ml/kg', info:'',
                        score:1,group:'C',selected:false},
                    {name:'Volume Expansion > 15ml/kg', info:'',
                        score:3,group:'C',selected:false},
                    {name:'',info:'',score:'',group:'',selected:false},
                    {name:'Vasopressor Administration(1 agent)', info:'',
                        score:2,group:'D',selected:false},
                    {name:'Vasopressor Administration(>1 agent)', info:'',
                        score:3,group:'D',selected:false},
                    {name:'',info:'',score:'',group:'',selected:false},
                    {name:'Pacemaker on Standby', info:'',
                        score:3,group:'E',selected:false},
                    {name:'Pacemaker Used', info:'',
                        score:4,group:'E',selected:false},
                    {name:'',info:'',score:'',group:'',selected:false},
                    {name:'Cardiopulmonary Resustation', info:'',
                        score:4,group:'',selected:false},
                    {name:'',info:'',score:'',group:'',selected:false}
                ]
            },
            {
                tableName:"Monitoring",
                items:[
                    {name:'Frequent Vital Signs', info:'',
                        score:1,group:'',selected:true},
                    {name:'Cardiacrespiratory Monitoring', info:'',
                        score:1,group:'',selected:true},
                    {name:'Thermoregulated Enviroment', info:'',
                        score:1,group:'',selected:true},
                    {name:'Noninvasive Oxygen Monitoring', info:'',
                        score:1,group:'',selected:true},
                    {name:'Quantitative Intake and Output', info:'',
                        score:1,group:'',selected:true},
                    {name:'Arterial Pressure Monitoring', info:'',
                        score:1,group:'',selected:false},
                    {name:'Urinary Catheter', info:'',
                        score:1,group:'',selected:false},
                    {name:'',info:'',score:'',group:'',selected:false},
                    {name:'Phlebotomy (5-10 draws)', info:'',
                        score:1,group:'H',selected:false},
                    {name:'Extensive Phlebotomy (>10 draws)', info:'',
                        score:2,group:'H',selected:false},
                    {name:'',info:'',score:'',group:'',selected:false}
                ]
            },
            {
                tableName:"Vascular Access",
                items:[
                    {name:'Peripheral Intravanous Line', info:'',
                        score:1,group:'',selected:true},
                    {name:'Central Venous Line', info:'',
                        score:2,group:'',selected:false},
                    {name:'Arterial Line', info:'',
                        score:2,group:'',selected:false},
                    {name:'',info:'',score:'',group:'',selected:false}
                ]
            },
            {
                tableName:"Transfussion",
                items:[
                    {name:'Intravenous Gamma Globulin', info:'',
                        score:2,group:'',selected:false},
                    {name:'',info:'',score:'',group:'',selected:false},
                    {name:'Red Blood Cell Transfusion (≤ 15ml/kg)', info:'',
                        score:2,group:'I',selected:false},
                    {name:'Red Blood Cell Transfusion (> 15ml/kg)', info:'',
                        score:3,group:'I',selected:false},
                    {name:'',info:'',score:'',group:'',selected:false},
                    {name:'Partial Volume Exchange Transfuison', info:'',
                        score:2,group:'',selected:false},
                    {name:'Platelet Transfusion', info:'',
                        score:3,group:'',selected:false},
                    {name:'Double Volume Exchange Transfuison', info:'',
                        score:3,group:'',selected:false},
                    {name:'White Blood Cell Transfusion', info:'',
                        score:3,group:'',selected:false},
                    {name:'',info:'',score:'',group:'',selected:false}
                ]
            },
            {
                tableName:"Procedural",
                items:[
                    {name:'Transport of Patient', info:'',
                        score:2,group:'',selected:false},
                    {name:'',info:'',score:'',group:'',selected:false},
                    {name:'Single Chest Tube In Place', info:'',
                        score:2,group:'J',selected:false},
                    {name:'Multyple Chest Tube In Place', info:'',
                        score:3,group:'J',selected:false},
                    {name:'',info:'',score:'',group:'',selected:false},
                    {name:'Thoracentasis', info:'',
                        score:3,group:'',selected:false},
                    {name:'',info:'',score:'',group:'',selected:false},
                    {name:'Minor Operation', info:'',
                        score:2,group:'K',selected:false},
                    {name:'Major Operation', info:'',
                        score:4,group:'K',selected:false},
                    {name:'',info:'',score:'',group:'',selected:false},
                    {name:'Dialysis', info:'',
                        score:4,group:'',selected:false},
                    {name:'',info:'',score:'',group:'',selected:false},
                    {name:'Pericardiocentesis', info:'',
                        score:4,group:'L',selected:false},
                    {name:'Pericardial Tube In Place', info:'',
                        score:4,group:'L',selected:false},
                    {name:'',info:'',score:'',group:'',selected:false}
                ]
            },
            {
                tableName:"Metabolic Nutrition",
                items:[
                    {name:'Gavage Feeding', info:'',
                        score:1,group:'',selected:false},
                    {name:'Intravenous Amino Acid Solution', info:'',
                        score:1,group:'',selected:false},
                    {name:'Intravenous Fat Emulsion', info:'',
                        score:1,group:'',selected:false},
                    {name:'Phototherapy', info:'',
                        score:1,group:'',selected:false},
                    {name:'Potassium Infusion', info:'',
                        score:3,group:'',selected:false},
                    {name:'Insulin Administration', info:'',
                        score:2,group:'',selected:false},
                    {name:'',info:'',score:'',group:'',selected:false}
                ]
            }
        ]
    },
    computed:
    {
        totalScore:function(){
            var sum=0;
            sum=d3.sum(this.tables.map(x=>d3.sum(x.items,y=>y.selected?y.score:0)));
            return sum;
        },
        col1Table:function(){
            if(this.colNumber==1)
            {
                return [0,7];
            }else if (this.colNumber==2)
            {
                return [0,3];
            }else if (this.colNumber==3)
            {
                return [0,1];
            }
        },
        col2Table:function(){
            if(this.colNumber==1)
            {
                return [8,8];
            }else if (this.colNumber==2)
            {
                return [4,7];
            }else if (this.colNumber==3)
            {
                return [2,4];
            }
        },
        col3Table:function(){
            if(this.colNumber==1)
            {
                return [8,8];
            }else if (this.colNumber==2)
            {
                return [8,8];
            }else if (this.colNumber==3)
            {
                return [5,7];
            }
        }
    },
    methods:
    {
        checkSameGroup:function(table, item){
            if(item.name!=""){
                if(item.group && !item.selected)
                {
                    table.items.filter(x=>x.group==item.group).forEach(x=>x.selected=false);
                }
                item.selected=!item.selected;
            }
        }
    }
});

var renderCols=function(){
    var windowWidth = $(window).width();
    var app=$('#app');
    var col1=$('#col1');
    var col2=$('#col2');
    var col3=$('#col3');
    if(windowWidth>=1450){
        app.width(1450);
        col1.css('width',"33%");
        col2.css('width',"33%");
        col3.css('width',"33%");
        vm.colNumber=3;
    }else if(windowWidth>=1050)
    {
        app.width(1050);
        col1.css('width',"50%");
        col2.css('width',"50%");
        col3.css('width',"0%");
        vm.colNumber=2;
    }else if(windowWidth>=850)
    {
        app.width(850);
        col1.css('width',"100%");
        col2.css('width',"0%");
        col3.css('width',"0%");
        vm.colNumber=1;
    }
}

$(window).resize(renderCols);
$(renderCols);
