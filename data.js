
var DataSource = 
[
    { 
        drugName: 'Albumin<br>(Plasbumin 25%)',
        indication:"Supplement",
            content:[
                {
                    description:"Albumin Supplement",
                    dosage:"1g/kg/dose keep 4 hours",equation:"[bw*4*0.5*50]ml albumin in NS [bw*4*0.5*50]ml<br>keep 4 hours"
                }                
            ],
        reference:"2017.6.12"
        ,tag:"輸液"
    },
    { 
        drugName: 'Aminophylline<br>(IV)',
        indication:"Prematurity<br>Apnea",
            content:[
                {
                    description:"Loading",
                    dosage:"5-8mg/kg/dose",equation:"[bw*5*0.1]-[bw*8*0.1]mg st"
                },
                {
                    description:"Maintenance",
                    dosage:"2-6mg/kg/dose q8-12h",equation:"[bw*2*0.1]-[bw*6*0.1]mg q8-12h"
                }
            ],
        reference:"2017.6.12",
        info: "滴注時間>30分鐘"
        ,tag:"呼吸道"
    },
    { 
        drugName: 'Ampicillin<br>(Ampolin)',
        indication:"Neonate<br>Infection",
            content:[
                {
                    description: "≦14天 ≦1000g",
                    dosage:"200mg/kg/day q12h",equation:"[bw*100*1]mg q12h",
                    ageLimitU:"14d", bwLimitU:1
                },
                {
                    description: ">14天 ≦1000g",
                    dosage:"200mg/kg/day q8h",equation:"[bw*66.7*1]mg q8h",
                    ageLimitL:"15d", bwLimitU:1
                },
                {
                    description: "≦7天 1000g-2000g",
                    dosage:"200mg/kg/day q12h",equation:"[bw*100*1]mg q12h",
                    ageLimitU:"7d", bwLimitL:1 , bwLimitU:2
                },
                {
                    description: ">7天 1000g-2000g",
                    dosage:"200mg/kg/day q8h",equation:"[bw*66.7*1]mg q8h",
                    ageLimitL:"8d", bwLimitL:1 , bwLimitU:2
                },
                {
                    description: "≦7天 ≧2000g",
                    dosage:"200mg/kg/day q8h",equation:"[bw*66.7*1]mg q8h",
                    ageLimitU:"7d", bwLimitL:2 
                },
                {
                    description: ">7天 ≧2000g",
                    dosage:"200mg/kg/day q6h",equation:"[bw*50*1]mg q6h",
                    ageLimitL:"8d", bwLimitL:2 
                },
                
            ],
        reference:"2017.6.12",
        ageLimitU:"30d"
        ,tag:"抗生素"
    },
    { 
        drugName: 'Ampicillin<br>(Ampolin)',
        indication:"Neonate<br>Meningitis",
            content:[
                {
                    description: "≦14天",
                    dosage:"300mg/kg/day q6-8h",equation:"[bw*75*1]mg q6h or [bw*100*1]mg q8h",
                    ageLimitU:"14d"
                },
                {
                    description: ">14天",
                    dosage:"300mg/kg/day q6h",equation:"[bw*75*1]mg q6h",
                    ageLimitL:"15d"
                }
            ],
        reference:"2017.6.12",
        ageLimitU:"30d"
    },
    { 
        drugName: 'Augmentin<br>(Soonmelt)',
        indication:"Infection",
            content:[
                {
                    description: "",
                    dosage:"36mg/kg/dose q8h",equation:"[bw*36*1]mg q8h",
                }
            ],
        reference:"2017.6.12"
        ,tag:"抗生素"
    },
    { 
        drugName: 'Claforan<br>(Cefotaxime)',
        indication:"Neonate<br>Infection",
            content:[ 
                {
                    description: "≦14天 ≦1000g",
                    dosage:"50mg/kg/dose q12h",equation:"[bw*50*1]mg q12h",
                    ageLimitU:"14d",bwLimitU:1
                },
                {
                    description: ">14天 ≦1000g",
                    dosage:"50mg/kg/dose q8h",equation:"[bw*50*1]mg q8h",
                    ageLimitL:"15d",bwLimitU:1
                },
                {
                    description: "≦7天 1000g-2000g",
                    dosage:"50mg/kg/dose q12h",equation:"[bw*50*1]mg q12h",
                    ageLimitU:"7d",bwLimitL:1,bwLimitU:2
                },
                {
                    description: ">7天 1000g-2000g",
                    dosage:"50mg/kg/dose q8h",equation:"[bw*50*1]mg q8h",
                    ageLimitL:"8d",bwLimitL:1,bwLimitU:2
                },
                {
                    description: "≦7天 ≧2000g",
                    dosage:"50mg/kg/dose q12h",equation:"[bw*50*1]mg q12h",
                    ageLimitU:"7d",bwLimitL:2
                },
                {
                    description: ">7天 ≧2000g",
                    dosage:"50mg/kg/dose q8h",equation:"[bw*50*1]mg q8h",
                    ageLimitL:"8d",bwLimitL:2
                },
            ],
        reference:"2017.6.13"
        ,ageLimitU:"30d"
        ,tag:"抗生素"
    },
    { 
        drugName: 'Claforan<br>(Cefotaxime)',
        indication:"Neonate<br>Meningitis",
            content:[ 
                {
                    description: "≦7天 ≧2000g",
                    dosage:"150mg/kg/day q8-q12h",equation:"[bw*50*1]mg q8h<br>[bw*75*1]mg q12h",
                    ageLimitU:"7d"
                },
                {
                    description: ">7天 ≧2000g",
                    dosage:"200mg/kg/day q6-8h",equation:"[bw*50*1]mg q6h<br>[bw*66.7*1]mg q8h",
                    ageLimitL:"8d"
                }
            ],
        reference:"2017.6.13"
        ,ageLimitU:"30d",bwLimitL:2
        ,tag:"抗生素"
    },
    { 
        drugName: 'Claforan<br>(Cefotaxime)',
        indication:"Infant<br>Infection",
            content:[ 
                {
                    description: "Infant",
                    dosage:"200mg/kg/day q6h",equation:"[bw*50*1]mg q6h"
                }
            ],
        reference:"2017.6.13"
        ,ageLimitL:"31d", ageLimitU:"365d"
        ,tag:"抗生素"
    },
    {
        drugName: 'Cefazolin',
        indication:"Neonate<br>Infection",
            content:[ 
                {
                    description: "≦7天 ≦2000g",
                    dosage:"25mg/kg/dose q12h",equation:"[bw*25*1]mg q12h"
                    ,ageLimitU:"7d",bwLimitU:2
                },
                {
                    description: "≦7天 ≧2000g",
                    dosage:"50mg/kg/dose q12h",equation:"[bw*50*1]mg q12h"
                    ,ageLimitU:"7d",bwLimitL:2
                },
                {
                    description: ">7天 ≦2000g",
                    dosage:"25mg/kg/dose q8h",equation:"[bw*25*1]mg q8h"
                    ,ageLimitL:"8d",bwLimitU:2
                },
                {
                    description: ">7天 ≧2000g",
                    dosage:"50mg/kg/dose q8h",equation:"[bw*50*1]mg q8h"
                    ,ageLimitL:"8d",bwLimitL:2
                }
            ],
        reference:"2017.6.14"
        ,ageLimitU:"30d"
        ,tag:"抗生素"
    },
     { 
        drugName: 'Chloral hydrate<br>(10%)',
        indication:"Sedation",
            content:[ 
                {
                    description: "Loading, PO or RC",
                    dosage:"0.5ml/kg/dose",equation:"[bw*0.5*0.1]ml in NS [bw*0.5*0.1]ml st"
                }
            ],
        reference:"2017.6.14"
        ,info:"可能prolong QT"
        ,tag:"麻醉"
    },
    { 
        drugName: 'Dormicum<br>(Midazolam)',
        indication:"Sedation",
            content:[ 
                {
                    description: "Loading",
                    dosage:"0.05-0.3mg/kg/dose st",equation:"[bw*0.05*0.1]-[bw*0.3*0.1]ml st"
                },
                {
                    description: "Maintenance",
                    dosage:"0.05-0.3mg/kg/hr cont",equation:"pure dormicum pump<br>[bw*0.05*0.1]-[bw*0.3*0.1]ml/hr"
                }
            ],
        reference:"2017.6.14"
        ,tag:"麻醉"
    },
    { 
        drugName: 'Heparin',
        indication:"NICU<br>Keep Line",
            content:[ 
                {
                    description: "A-Line/UA",
                    dosage:"NS:Heparin = 1ml:2U<br>keep 0.2-0.4ml/hr",equation:""
                }
            ],
        reference:"2017.6.11"
        ,info:"大寶若回沖可考慮0.5ml/hr"
        ,tag:"輸液"
    },
    { 
        drugName: 'Tazocin<br>(Piperacillin 2g<br>Tazobactam 0.25g)',
        indication:"Neonate<br>Infection",
            content:[
                {
                    description: "≦14天 ≦1000g",
                    dosage:"100mg piperacillin/kg/day q12h", equation:"[bw*0.05625*0.00225]g q12h",
                    ageLimitU:"14d", bwLimitU:1
                },
                {
                    description: ">14天 ≦1000g",
                    dosage:"100mg piperacillin/kg/day q8h", equation:"[bw*0.0375*0.00225]g q8h",
                    ageLimitL:"15d", bwLimitU:1
                },
                {
                    description: "≦7天 ≧1000g",
                     dosage:"100mg piperacillin/kg/day q12h", equation:"[bw*0.05625*0.00225]g q12h",
                    ageLimitU:"7d", bwLimitL:1
                },
                {
                    description: ">7天 ≧1000g",
                   dosage:"100mg piperacillin/kg/day q8h", equation:"[bw*0.0375*0.00225]g q8h",
                    ageLimitL:"8d", bwLimitL:1
                }     
            ],
        reference:"2017.6.12",
        ageLimitU:"30d"
        ,tag:"抗生素"
    },
    { 
        drugName: 'Tazocin<br>(Piperacillin 2g<br>Tazobactam 0.25g)',
        indication:"Infant<br>Infection",
            content:[
                {
                    description: "Infant",
                    dosage:"80mg piperacillin/kg/day q6h", equation:"[bw*0.0225*0.00225]g q6h"
                }
            ],
        reference:"2017.6.12",
        ageLimitL:"31d", ageLimitU:"365d"
        ,tag:"抗生素"
    },
    { 
        drugName: 'Targocid<br>(Teicoplanin)',
        indication:"Newborn<br>Infection",
            content:[
                {
                    description: "Loading",
                    dosage:"16mg/kg/dose on day 1", equation:"[bw*16*0.1]mg on day 1",
                },
                {
                    description: "Maintenance",
                    dosage:"8mg/kg/day qd", equation:"[bw*8*0.1]mg qd"
                }
            ],
        reference:"2017.6.14",
        ageLimitU:"30d"
        ,tag:"抗生素"
    },
    { 
        drugName: 'Targocid<br>(Teicoplanin)',
        indication:"Infant<br>Infection",
            content:[
                {
                    description: "Loading",
                    dosage:"10mg/kg/dose q12h for 3 doses", equation:"[bw*10*0.1]mg q12h for 3 doses",
                },
                {
                    description: "Maintenance",
                    dosage:"10mg/kg/day qd", equation:"[bw*10*0.1]mg qd"
                }
            ],
        reference:"2017.6.14",
        ageLimitL:"31d"
        ,tag:"抗生素"
    },
    { 
        drugName: 'Vancomycin',
        indication:"Neonate<br>Infection",
            content:[ 
                {
                    description: "≦1200g",
                    dosage:"15mg/kg/dose qd",equation:"[bw*15*0.1]mg qd",
                    bwLimitU:1.2
                },
                {
                    description: "≦7天 1200g-2000g",
                    dosage:"10mg/kg/dose q12h",equation:"[bw*10*0.1]mg q12h",
                    ageLimitU:"7d",bwLimitL:1.2,bwLimitU:2
                },
                {
                    description: "≦7天 ≧2000g",
                    dosage:"10mg/kg/dose q8h",equation:"[bw*10*0.1]mg q8h",
                    ageLimitU:"7d",bwLimitL:2
                },
                {
                    description: ">7天 1200g-2000g",
                    dosage:"10mg/kg/dose q8h",equation:"[bw*10*0.1]mg q8h",
                    ageLimitL:"8d",bwLimitL:1.2,bwLimitU:2
                },
                {
                    description: ">7天 ≧2000g",
                    dosage:"10mg/kg/dose q6h",equation:"[bw*10*0.1]mg q6h",
                    ageLimitL:"8d",bwLimitL:2
                },
            ],
        reference:"2017.6.13"
        ,info:"使用時要考慮腎功能\n5th dose前抽Trouph level\n一般: 10-15mcg/ml，Meningitis: 15-20mcg/ml"
        ,ageLimitU:"30d"
        ,tag:"抗生素"
    },
    { 
        drugName: 'Vancomycin',
        indication:"Infant<br>Infection",
            content:[ 
                {
                    description: "Infant",
                    dosage:"40-60mg/kg/day",equation:"[bw*10*0.1]-[bw*15*0.1]mg q6h"
                }
            ],
        reference:"2017.6.13"
        ,info:"使用時要考慮腎功能\n5th dose前抽Trouph level\n一般: 10-15mcg/ml，Meningitis: 15-20mcg/ml"
        ,ageLimitL:"31d"
        ,tag:"抗生素"
    }
]