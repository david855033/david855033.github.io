var vm = new Vue(
{
    el:'#app',
    data:{
        leftCol:[
            {
                tableName:"Respiratory",
                items:[
                    {name:'Supplement Oxygen', info:'',
                        score:1,group:'A',selected:false},
                    {name:'Surfactant Administration', info:'',
                        score:1,group:'',selected:false},
                    {name:'Tracheostomy Care', info:'',
                        score:1,group:'B',selected:false},
                    {name:'Tracheostomy Placement', info:'',
                        score:1,group:'B',selected:false},
                    {name:'Continuous Positive Airway Pressure Administration', info:'',
                        score:2,group:'A',selected:false},
                    {name:'Endotracheal Intubation', info:'',
                        score:2,group:'',selected:false},
                    {name:'Mechanical Ventilation', info:'',
                        score:3,group:'A',selected:false},
                    {name:'Mechanical Ventilation with Muscle Relaxation', info:'',
                        score:4,group:'A',selected:false},
                    {name:'High-frequency Ventilation', info:'',
                        score:4,group:'A',selected:false},
                    {name:'Extracorporeal Membrane Oxygenation', info:'',
                        score:4,group:'',selected:false}
                ]
            }
        ]
    }
});

