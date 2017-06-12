
var DataSource = 
[
    { 
        drugName: 'Albumin<br>(Plasbumin 25%)',
        indication:"Supplement",
            content:[
                {
                    dosage:"1g/kg/dose",equation:"[bw*4*0.5*50]ml albumin in NS [bw*4*0.5*50]ml<br>keep 4 hours"
                }                
            ],
        reference:"2017.6.12",
        height: 150
    },
    { 
        drugName: 'Aminophylline<br>(IV)',
        indication:"Prematurity<br>Apnea",
            content:[
                {
                    description:"Loading",
                    dosage:"5-8mg/kg/dose",equation:"[bw*5*0.1]-[bw*8*0.1] mg st"
                },
                {
                    description:"Maintain",
                    dosage:"2-6mg/kg/dose q8-12h",equation:"[bw*2*0.1]-[bw*6*0.1] mg q8-12h"
                }
            ],
        reference:"2017.6.12",
        info: "<li>滴注時間>30分鐘",
        height: 150
    },
    { 
        drugName: 'Ampicillin<br>(Ampolin)',
        indication:"Neonate<br>Infection",
            content:[
                {
                    description: "≦14天 <1000g",
                    dosage:"200mg/kg/day q12h",equation:"[bw*100*1] mg q12h",
                    ageLimitU:"14d", bwLimitU:1
                },
                {
                    description: ">14天 <1000g",
                    dosage:"200mg/kg/day q8h",equation:"[bw*66.7*1] mg q8h",
                    ageLimitL:"15d", bwLimitU:1
                },
                {
                    description: "≦7天 1000g-2000g",
                    dosage:"200mg/kg/day q12h",equation:"[bw*100*1] mg q12h",
                    ageLimitU:"7d", bwLimitL:1 , bwLimitU:2
                },
                {
                    description: ">7天 1000g-2000g",
                    dosage:"200mg/kg/day q8h",equation:"[bw*66.7*1] mg q8h",
                    ageLimitL:"8d", bwLimitL:1 , bwLimitU:2
                },
                {
                    description: "≦7天 ≧2000g",
                    dosage:"200mg/kg/day q8h",equation:"[bw*66.7*1] mg q8h",
                    ageLimitU:"7d", bwLimitL:2 
                },
                {
                    description: ">7天 ≧2000g",
                    dosage:"200mg/kg/day q6h",equation:"[bw*50*1] mg q6h",
                    ageLimitL:"8d", bwLimitL:2 
                },
                
            ],
        reference:"2017.6.12",
        ageLimitU:"30d",
        height: 350
    },
    { 
        drugName: 'Ampicillin<br>(Ampolin)',
        indication:"Neonate<br>[Meningitis]",
            content:[
                {
                    description: "≦14天",
                    dosage:"300mg/kg/day q6h<br>300mg/kg/day q8h",equation:"[bw*75*1] mg q6h<br>[bw*100*1] mg q8h",
                    ageLimitU:"14d"
                },
                {
                    description: ">14天",
                    dosage:"300mg/kg/day q6h",equation:"[bw*75*1] mg q6h",
                    ageLimitL:"15d"
                }
            ],
        reference:"2017.6.12",
        ageLimitU:"30d",
        height: 150
    },
    { 
        drugName: 'Augmentin<br>(Soonmelt)',
        indication:"Infection",
            content:[
                {
                    description: "",
                    dosage:"36mg/kg/dose q8h",equation:"[bw*36*1] mg q8h",
                    ageLimitU:"14d"
                }
            ],
        reference:"2017.6.12",
        height: 150
    },
     { 
        drugName: 'Tazocin<br>(Piperacillin 2g<br>Tazobactam 0.25g)',
        indication:"Neonate<br>Infection",
            content:[
                {
                    description: "≦14天 ≦1000g",
                    dosage:"100mg piperacillin/kg/day q12h", equation:"[bw*0.05625*0.00225] g q12h",
                    ageLimitU:"14d", bwLimitU:1
                },
                {
                    description: ">14天 ≦1000g",
                    dosage:"100mg piperacillin/kg/day q8h", equation:"[bw*0.0375*0.00225] g q8h",
                    ageLimitL:"15d", bwLimitU:1
                },
                {
                    description: "≦7天 ≧1000g",
                     dosage:"100mg piperacillin/kg/day q12h", equation:"[bw*0.05625*0.00225] g q12h",
                    ageLimitU:"7d", bwLimitL:1
                },
                {
                    description: ">7天 ≧1000g",
                   dosage:"100mg piperacillin/kg/day q8h", equation:"[bw*0.0375*0.00225] g q8h",
                    ageLimitL:"8d", bwLimitL:1
                }     
            ],
        reference:"2017.6.12",
        ageLimitU:"30d",
        height: 300
    },
    
     { 
        drugName: 'Tazocin<br>(Piperacillin 2g<br>Tazobactam 0.25g)',
        indication:"Infant<br>Infection",
            content:[
                {
                    dosage:"80mg piperacillin/kg/day q6h", equation:"[bw*0.0225*0.00225] g q6h"
                }
            ],
        reference:"2017.6.12",
        ageLimitL:"31d", ageLimitU:"365d",
        height: 180
    }
]