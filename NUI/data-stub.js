'use strict';
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
getBirthSheet.baby = function(patientID, caseNo)
{
    return {

    };
};
//NIS系統
var getNIS = {};
getNIS.nursingAssessment = function(patientID, caseNo){
    return {
        admissionReason:"",
    };
};
//護理病程，是以天為單位查詢?
getNIS.nursingProgress=function(patientID, caseNo, date)
{
    return [
        {dateTime:"2017-01-01 12:00", content:"護理紀錄內容....."}
    ];
};
getNIS.specialEvent=function(patientID, caseNo, date)
{
    return [
        {dateTime:"2017-01-01 12:00", content:"特殊事件內容....."}
    ];
};
getNIS.breathAssessment=function(patientID, caseNo, date)
{
    return [
        {dateTime:"2017-01-01 13:00", circulation:"末梢循環、心跳..", respiration:"呼吸及型態內容...",breathSound:"呼吸音...",secretion:"呼吸道分泌物..",bloodGas:"氣體分析..."}
    ];
};
getNIS.length=function(patientID,caseNo)
{
    return [
        {dateTime:"2017-01-01 13:00", part:"頭圍", length:"23.5"}
    ];
};