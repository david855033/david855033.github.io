
var DataSource = 
[
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
                    dosage:"200mg/kg/day q6h",equation:"[bw*50*1*100] mg q6h",
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