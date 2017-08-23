'use strict';
//取得某病房的住院病人
var getAdmissionList = function(ward){
    return [
        {bed:"NICU-1",name:"",patientID:"1234567",gender:"",section:"",admissionDate:""},
        {bed:"NICU-2",name:"",patientID:"1234567",gender:"",section:"",admissionDate:""}
    ];
};

//取得某病患的住院清單
var getAdmissionList = function(patientID){
    return [
        {admissionDate:"2017-01-01",dischargeDate:"2017-01-02",caseNo:"1234567"},
        {admissionDate:"2017-01-01",dischargeDate:"2017-01-02",caseNo:"2234567"}
    ];
};

//病患資料
var getPatientData = function(patientID){
    return {
        isCurrentAdmitted:"true",
        currentBed:"",
        patientName:"",
        birthDate:"",
        gender:"",
        bloodType:"",
        currentSection:"",
        visitingStaff:{name:"",code:""},
        resident:{name:"",code:""}
    };
};
//生命徵象
var getVitalSign={};
getVitalSign.BLandBW = function(patientID, caseNo)
{
    return [
        {dateTime:"2017-01-01 12:00",BL:23,BW:0.67},
        {dateTime:"2017-01-02 12:00",BL:23,BW:0.67}
    ];
};
getVitalSign.BPandHR = function(patientID, caseNo)
{
    return [
        {dateTime:"2017-01-01 12:00",SBP:50,DBP:40,HR:120},
        {dateTime:"2017-01-01 13:00",SBP:55,DBP:23,HR:120},
        {dateTime:"2017-01-01 14:00",SBP:60,DBP:40,HR:120}
    ];
};
getVitalSign.IO = function(patientID, caseNo)
{
    return [
        {dateTime:"2017-01-01 07:00",input:120,output:100},
        {dateTime:"2017-01-02 07:00",input:120,output:100},
        {dateTime:"2017-01-03 07:00",input:120,output:100}
    ];
};
getVitalSign.BT = function(patientID, caseNo)
{
    return [
        {dateTime:"2017-01-01 07:00",BT:37},
        {dateTime:"2017-01-02 07:00",BT:37.5}
    ];
};
getVitalSign.RR = function(patientID, caseNo)
{
    return [
        {dateTime:"2017-01-01 07:00",RR:25},
        {dateTime:"2017-01-02 07:00",RR:24}
    ];
};
getVitalSign.saturation = function(patientID, caseNo)
{
    return [
        {dateTime:"2017-01-01 07:00",Sat:90},
        {dateTime:"2017-01-02 07:00",Sat:84}
    ];
};
//住院資訊(最近一次住院資訊，限住院病人)
var getAdmissionInfo={};
getAdmissionInfo.changeBed = function(patientID)
{
    return [
        {dateTime:"2017-01-01 07:00",bed:"NICU-1"},
        {dateTime:"2017-01-03 07:00",bed:"NBR-2"}
    ];
};
getAdmissionInfo.changeSection = function(patientID)
{
    return [
        {dateTime:"2017-01-01 07:00",section:"NICU"},
        {dateTime:"2017-01-03 07:00",section:"NBR"}
    ];
};
//會診紀錄
var getConsult = function(patientID)
{
    return [
        {date:"2017-01-01",consultSection:"PCV-PEDD",consultDocotr1:"李星原",consultDocotr2:"",consultDocotr3:"",content:"...會診內容...."}
    ];
}
//手術紀錄
var getSurgery = function(patientID)
{
    return [
        {date:"2017-01-01",surgery:"1....2.....",surgeon:"梁慕理DOC3370D"}
    ];
};
//醫囑查詢 (最多查詢90天內，限住院中病人))
var getOrder = function(patientID)
{
    return [
        {dateTime:"2017-08-13 09:24:15",item:"NA,K,P",specimen:"BLOOD",REQNO:"2012349",unit:"CEL",status:"待送檢"},
        {dateTime:"2017-08-14 09:24:15",item:"CEL",specimen:"PLASMA_GN3",REQNO:"2012349",unit:"CEL",status:"已簽收"}
    ];
};
//一般報告 (是否有查詢時間限制?)
var getReport = function(patientID)
{
    return [
        {dateTimeRecieve:"2017-08-13 09:24:15",dateTimeReport:"2017-08-16 09:40:30",item:"Ca++, free",specimen:"BLOOD",REQNO:"2345678",content:"...報告內容..."},
        {dateTimeRecieve:"2017-08-13 09:24:15",dateTimeReport:"2017-08-16 09:40:30",item:"CRP",specimen:"BLOOD",REQNO:"2345679",content:"...報告內容..."}
    ];
};
//累積報告 (是否有查詢時間限制?)
var getCummulativeReport = {};
getCummulativeReport.SMAC = function(patientID)
{
    return [
        {dateTime:"2017-07-01 12:00",data:{BUN:12,Crea:0.89,ALT:6,AST:6.2,CRP:"<0.03"}}
    ];
};
getCummulativeReport.CBC = function(patientID)
{
    return [
        {dateTime:"2017-07-01 12:00",data:{WBC:11900,RBC:5.23,HCT:62.6}}
    ];
};
getCummulativeReport.bedsideGlucose = function(patientID)
{
    return [
        {dateTime:"2017-07-01 12:00",data:{GLU:50}},
        {dateTime:"2017-07-01 12:00",data:{GLU:">400"}}
    ];
};
getCummulativeReport.ABG = function(patientID)
{
    return [
        {dateTime:"2017-07-01 12:00",data:{PH:7.3,PO2:54.1,HCO3:23.5,BE:-5}},
        {dateTime:"2017-07-01 12:00",data:{PH:7.25,PO2:60,PCO2:40,HCO3:23.5,BE:-5,HB:15,iCa:1.02,BUN:8,Cr:0.5}}
    ];
};
//以下是累積報告沒有，但也是重要的數值
getCummulativeReport.Mg = function(patientID)
{
    return [
        {dateTime:"2017-07-01 12:00",data:{Mg:2.5}}
    ];
};
getCummulativeReport.PCT = function(patientID)
{
    return [
        {dateTime:"2017-07-01 12:00",data:{PCT:0.35}}
    ];
};
getCummulativeReport.ferritin = function(patientID)
{
    return [
        {dateTime:"2017-07-01 12:00",data:{ferritin:200}}
    ];
};
getCummulativeReport.TCB = function(patientID)
{
    return [
        {dateTime:"2017-07-01 12:00",data:{TCB:12}}
    ];
};
getCummulativeReport.MicroBil = function(patientID)
{
    return [
        {dateTime:"2017-07-01 12:00",data:{MicroBil:14}}
    ];
};
//治療處置 (自備藥物是否要分開? 且必須要顯示附註)
var getTreatment = function(patientID, caseNo)
{
    return [
        {startDateTime:"2017-01-01 12:00",endDateTime:"2017-01-02 12:00",item:"May Be Discharge",subclass:"TRT",freq:"ST",quantity:"1",status:"進行中",info:"..註記的內容..."},
        {startDateTime:"2017-01-01 12:00",endDateTime:"2017-01-02 12:00",item:"Albumin",subclass:"DRUG",freq:"ST",quantity:"1",status:"進行中",info:"2.5ml in NS 2.5ml"}
    ];
}
//輸血記錄
var getTransfusion = function(patientID, caseNo)
{
    return [
        {date:"2017-01-01", item:"CRYOPRECIPITATE", REQNO:"22983019"}
    ];
};
//用藥紀錄
var getMedication = function(patientID, caseNo)
{
    return [
        {startDateTime:"2017-01-01 12:00",endDateTime:"2017-01-02 12:00",drugName:"",tradeName:"",dosage:"",unit:"",route:"",freq:"",status:"",info:""}
    ];
};
//產單
var getBirthSheet = {};
getBirthSheet.hasBirthSheet = function(patientID,caseNo)
{
    return true;
};
getBirthSheet.mother = function(patientID,caseNo)
{
    return {
        motherID:"",
        motherName:"",
        motherAge:"",
        admissionReason:"",
        pastHistory:"",
        recentMedication:""
    };
};
getBirthSheet.birthHistory = function(patientID, caseNo)
{
    return {
        GAweek:"",
        GAday:"",
        sedation:"",
        ROMMethod:"",
        ROMDateTime:"",
        deliverDateTime:"",
        deliverMethod:"",
        meconiumStain:"",
        fetalPosition:"",
        bloodLoss:"",
        UA:"",
        UV:"",
        umbilicalAroundNeck:"",
        meconiumPass:"",
        urinePass:"",
        meconiumAspiration:"",
        placentaPassDateTime:"",
        placentaWeight:"",
        ApgarScore:[],
        management:[],
        transferTo:"",
        GYNDoctor:[],
        PedDoctor:""
    };
};

//NIS系統
var getNIS = {};
//入院評估
getNIS.admssionAssessment = function(patientID, caseNo){
    return {
        admissionReason:"",
        birthLocation:"",
        BL:"",
        BW:"",
        HC:"",
        CC:"",
        contact1:{name:"",relation:"",phone:[]},
        contact2:{name:"",relation:"",phone:[]},
        contact3:{name:"",relation:"",phone:[]},
        siblings:{olderBrother:0,youngerBrother:0,olderSister:0,youngerSister:0},
        careGiver:""
    };
};

//護理病程，是以天為單位查詢?
getNIS.nursingProgress=function(patientID, caseNo, date)
{
    return [
        {dateTime:"2017-01-01 12:00", content:"護理紀錄內容.....",nurse:"某護理師"}
    ];
};

//每日評估
//特殊事件，以天為單位查詢
getNIS.specialEvent=function(patientID, caseNo, date)
{
    return [
        {dateTime:"2017-01-01 12:00", content:"特殊事件內容....."}
    ];
};
//氧和
getNIS.breathAssessment=function(patientID, caseNo, date)
{
    return [
        {dateTime:"2017-01-01 13:00", sat:"", device:"", respiration:"呼吸及型態內容...",breathSound:"呼吸音...",secretion:"呼吸道分泌物..",bloodGas:"氣體分析..."}
    ];
};
//體圍
getNIS.bodyLength=function(patientID,caseNo)
{
    return [
        {dateTime:"2017-01-01 13:00", part:"頭圍", length:"23.5"}
    ];
};
//管路
getNIS.line=function(patientID,caseNo)
{
    return {dateTime:"2017-01-01 12:30",name:"A-line",type:"vessel", bodyPart:"身體部位",changeDateTime:"",content:""};
};
//輸出入量 每一筆都有timestamp(dateTime)
getNIS.getIO={};
//輸出入量-輸液 (成分、管路(別名、部位))
//輸出入量-血品 (成分、管路(別名、部位))
//輸出入量-進食 (途徑(口服、灌食、親餵、瓶餵)、類別(水、藥、食物、母奶、配方奶(配方奶選項))、親餵時間、RV)
//輸出入量-排尿 (方式(自解、導尿)、性狀(清澈、沉澱、血尿....)、顏色(...)、排出量(少量 中量 大量)、排出量(ml)、Lost次數(次))
//輸出入量-排便 (自解次數、自解重量、enema次數、enema重量、lost次數、enema輸入量、digital次數、digital重量、顏色、性狀)
//輸出入量-失血 (ml)
//輸出入量-滲液 (ml)
//輸出入量-嘔吐 (含性質、顏色)
//輸出入量-引流 (含性質、顏色、管路(別名、部位))
//輸出入量-穿刺 (含穿刺部位)
//輸出入量-透析 (排出量+輸入量)
//輸出入量-沖洗 (排出量+輸入量、管路(別名、部位))

//護理交班-限住院中
//代辦事項
getNIS.todo=function(patientID,caseNo)
{
    return [
        {date:"2017-01-01",content:"代辦事項內容..."},
        {date:"2017-01-02",content:"代辦事項內容..."}
    ];
};
//健康問題-備註
getNIS.info=function(patientID,caseNo)
{
    return "...備註內容...";
};
//重要病史
getNIS.importantHistory=function(patientID,caseNo)
{
    return "...重要病史...";
};