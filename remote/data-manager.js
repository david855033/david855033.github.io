'use strict';
var dataManager={};
dataManager.get=function(query){
    var targetQueryData = queryDataStorage.find(function(x){return x.query==query});
    return targetQueryData;
};
dataManager.set=function(query,url,timeStamp,data){
    var targetQueryData = queryDataStorage.find(function(x){return x.query==query});
    if(targetQueryData)
    {
        targetQueryData.url=url;
        targetQueryData.timeStamp=timeStamp;
        targetQueryData.data=data;
        return true;
    }
    else{
        queryDataStorage.push(new queryDataSet(query,url,timeStamp,data));
        return false;
    }
};

var queryDataSet = function(query,url,timeStamp,data){
    this.query=query;
    this.url=url;
    this.timeStamp=timeStamp;
    this.data=data;
}

var queryDataStorage=[
];



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
var getNIS={};
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