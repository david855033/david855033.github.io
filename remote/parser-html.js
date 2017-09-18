"use strict";
var Parser=Parser||{};
//--------轉換HTML--------
//取得某病房的住院病人
//[{bed:"NICU-1",name:"",patientID:"1234567",gender:"",section:"",admissionDate:""}]
Parser.getPatientList=function(htmlText){
    var resultArray=[];
    var doc = Parser.getDOM(htmlText);
    var tbody = doc.getElementsByTagName("tbody");
    tbody = tbody&&tbody[0];
    if(!tbody){return;}
    var trs = tbody.getElementsByTagName("tr");
    for(var i = 0; i < trs.length; i++){
        var tr=trs[i];
        var tds=tr.getElementsByTagName("td");
        var result = {bed:"",name:"",patientID:"",gender:"",section:"",admissionDate:""};
        var td1_id = tds[1].getAttribute('id');
        var td1_idIsTips = td1_id&&td1_id.indexOf("tips")>=0;
        if(td1_idIsTips)
        {
            Parser.removeElementsByTagName(tds[1],"span");
            result.bed=tds[1].innerText.replaceAll(' ','');
            Parser.removeElementsByTagName(tds[2],"font");
            result.name=tds[2].innerText.trim().replaceAll('@','');
            result.patientID=tds[3].innerText.trim();
            result.gender=tds[4].innerText;
            result.section=tds[5].innerText.trim();
            result.admissionDate=Parser.getDateFromShortDate(tds[7].innerText.trim());
            resultArray.push(result);
        }
    }
    return resultArray;
};

//取得某病患的住院清單
//[{admissionDate:"2017-01-01",dischargeDate:"2017-01-02",caseNo:"1234567",section:""}]
Parser.getAdmissionList=function(htmlText){
    var resultArray=[];
    var doc = Parser.getDOM(htmlText);
    var tbody = doc.getElementsByTagName("tbody");
    tbody = tbody&&tbody[0];
    if(!tbody){return resultArray;}
    var trs = tbody.getElementsByTagName("tr");
    for(var i = 0; i < trs.length; i++){
        var tr=trs[i];
        var tds=tr.getElementsByTagName("td");
        var result = {admissionDate:"",dischargeDate:"",caseNo:"",section:""};
        result.admissionDate=Parser.getDateFromShortDate(tds[2].innerText.trim());
        result.dischargeDate=Parser.getDateFromShortDate(tds[3].innerText.trim());
        result.caseNo=tds[1].innerText.trim();
        result.section=tds[4].innerText.trim();
        resultArray.push(result);
    }
    return resultArray;
};
Parser.getPatientData=function(htmlText){
    var result= { 
        currentBed:"",
        patientName:"",
        birthDate:"",
        gender:"",
        bloodType:"",
        currentSection:"",
        visitingStaff:{name:"",code:""},
        resident:{name:"",code:""}
    };
    var doc = Parser.getDOM(htmlText);
    var tbody = doc.getElementsByTagName("tbody");
    tbody = tbody&&tbody[0];
    if(!tbody){return result;}
    var trs = tbody.getElementsByTagName("tr");
    result.currentBed=trs[1].innerText.replaceAll('０２．　病房床號：','').replaceAll('－',"-").replaceAll(' ','');
    result.patientName=trs[2].innerText.replaceAll('０３．　姓　名　：','').trim();
    result.birthDate=Parser.getDateFromShortDate(trs[3].innerText.replaceAll('０４．　生　日　：','').regReplaceAll(/（.*）/g,"").trim());
    result.gender=trs[4].innerText.replaceAll('０５．　性　別　：','').trim();
    result.bloodType=trs[5].innerText.replaceAll('０６．　血　型　：','').replaceAll(' ','').trim();
    result.currentSection=trs[7].innerText.replaceAll('０８．　科　別　：','').trim();
    result.visitingStaff.name=trs[17].innerText.replaceAll('１８．　主治醫師：','').regReplaceAll(/\(.*\)/g,"").trim();
    result.visitingStaff.code=trs[17].innerText.replaceAll('１８．　主治醫師：','').regSelectAll(/\((.*)\)/g,"").regReplaceAll(/(\(|\))/g,"").trim();
    result.resident.name=trs[18].innerText.replaceAll('１９．　住院醫師：','').regReplaceAll(/\(.*\)/g,"").trim();
    result.resident.code=trs[18].innerText.replaceAll('１９．　住院醫師：','').regSelectAll(/\((.*)\)/g,"").regReplaceAll(/(\(|\))/g,"").trim();
    return result;
};

//轉科轉床(最近一次住院)
//changeBed:[{dateTime:"",bed:""}],changeSection:[{dateTime:"",section:""}]
Parser.getChangeBedSection=function(htmlText){
    var result={
        changeBed:[],
        changeSection:[]
    };
    var doc = Parser.getDOM(htmlText);
    var tbodyBed = Parser.searchDomByID(doc,'tbody_2');
    if(tbodyBed){
        var trs = tbodyBed.getElementsByTagName("tr");
        for(var i = 0; i < trs.length; i++){
            var tr=trs[i];
            var tds=tr.getElementsByTagName("td");
            var changeBed={dateTime:"",bed:""};
            changeBed.dateTime=Parser.getDateFromShortDate(tds[0].innerText.trim())+" "+Parser.getTimeFromShortTime(tds[1].innerText.trim());
            changeBed.bed=tds[2].innerText;
            result.changeBed.push(changeBed);
        }
    }

    var tbodySection = Parser.searchDomByID(doc,'tbody_3');
    if(tbodySection){
        var trs = tbodySection.getElementsByTagName("tr");
        for(var i = 0; i < trs.length; i++){
            var tr=trs[i];
            var tds=tr.getElementsByTagName("td");
            var changeSection={dateTime:"",bed:""};
            changeSection.dateTime=Parser.getDateFromShortDate(tds[0].innerText.trim())+" "+Parser.getTimeFromShortTime(tds[1].innerText.trim());
            changeSection.section=tds[2].innerText;
            result.changeSection.push(changeSection);
        }
    }
    return result;
};
//會診紀錄
//[{caseNo:"",oseq:"",bed:"",consultSection:"",consultDateTime:"",completeDateTime:"",status:"",doctors:""}]
Parser.getConsultation=function(htmlText){
    var resultArray=[];
    var doc = Parser.getDOM(htmlText);
    var tbody = doc.getElementsByTagName("tbody");
    tbody = tbody&&tbody[0];
    if(!tbody){return result;}
    var trs = tbody.getElementsByTagName("tr");
    for(var i = 0; i < trs.length; i++){
        var tr=trs[i];
        var tds=tr.getElementsByTagName("td");
        if(!tds){continue;}
        var result = {caseNo:"",oseq:"",bed:"",consultSection:"",consultDateTime:"",
            completeDateTime:"",status:"",doctors:""};
        result.caseNo=tds[0]&&tds[0].innerHTML.regSelectAll(/caseno=[0-9]{7,8}/g).replaceAll('caseno=','');
        result.oseq=tds[0]&&tds[0].innerHTML.regSelectAll(/oseq=[0-9]{4}/g).replaceAll('oseq=','');
        if(!result.oseq){continue;}
        result.bed=tds[2]&&tds[2].innerText.replaceAll(' ','');
        result.consultSection=tds[6]&&tds[6].innerText.replaceAll(' ','');
        result.consultDateTime=tds[7]&&Parser.getDateTimeFromShortDateTime(tds[7].innerText);
        result.completeDateTime=tds[8]&&Parser.getDateTimeFromShortDateTime(tds[8].innerText);
        result.status=tds[10]&&tds[10].innerHTML;
        result.doctors=tds[11]&&tds[11].innerText.replaceAll(' ','');
        resultArray.push(result);
    }
    return resultArray;
};
//會診回復(直加抓取含有<br>的htmlText)
Parser.getConsultationReply=function(htmlText){
    var doc = Parser.getDOM(htmlText);
    var tbody = doc.getElementsByTagName("tbody");
    tbody = tbody&&tbody[0];
    if(!tbody){return result;}
    var trs = tbody.getElementsByTagName("tr");
    var tds = trs[8].getElementsByTagName("td");
    var result = tds[1]&&tds[1].innerHTML;
    return result;
};
//尚未回覆會診
//[{bed:"",consultSection:"",consultDateTime:"",status:"",doctors:""}]
Parser.getConsultationPending=function(htmlText){
    var resultArray=[];
    var doc = Parser.getDOM(htmlText);
    var tbody = doc.getElementsByTagName("tbody");
    tbody = tbody&&tbody[0];
    if(!tbody){return resultArray;}
    var trs = tbody.getElementsByTagName("tr");
    if(!trs){return resultArray;}
    for(var i = 0 ; i< trs.length; i++)
    {
        var tr=trs[i];
        var tds=tr.getElementsByTagName("td");
        if(tds.length<12){continue;}
        var result= {bed:"",consultSection:"",consultDateTime:"",status:"",doctors:""}
        result.bed=tds[2].innerText.replaceAll(' ','');
        result.consultDateTime=Parser.getDateTimeFromShortDateTime(tds[6].innerText.trim());
        result.status=tds[9].innerText.trim();
        result.consultSection=tds[10].innerText.trim();
        result.doctors=tds[11].innerText.trim();
        resultArray.push(result);
    }
    return resultArray;
};
//手術
//[{date:"",surgeryName:"",doctor:{name:"",code:""}}] (**surgeryName:html String)
Parser.getSurgery=function(htmlText){
    var resultArray=[];
    var doc = Parser.getDOM(htmlText);
    var tbodies = doc.getElementsByTagName('tbody');
    if(!tbodies){return resultArray;}
    var tbody=tbodies[0];
    var trs = tbody.getElementsByTagName('tr');
    for(var i = 0 ; i<trs.length; i++){
        var tr=trs[i];
        if(!tr){continue;}
        var tds=tr.getElementsByTagName('td');
        if(tds.length<3){continue;}
        var result = {date:"",surgeryName:"",doctor:{name:"",code:""}};
        result.date=tds[0]&&tds[0].innerText;
        result.surgeryName=tds[1]&&tds[1].innerHTML;
        result.doctor.name=tds[2]&&tds[2].innerText.replace(tds[2].innerText.regSelectAll(/DOC[0-9]{4}[A-Z]{1}/g),'').trim();
        result.doctor.code=tds[2]&&tds[2].innerText.regSelectAll(/DOC[0-9]{4}[A-Z]{1}/g);
        resultArray.push(result);
    }
    return resultArray;
};
//查詢醫囑
//[{seq:"",dateTime:"",item:"",specimen:"",REQNO:"",unit:"",status:""}]
Parser.getOrder=function(htmlText){
    var resultArray=[];
    var doc = Parser.getDOM(htmlText);
    var tbodies = doc.getElementsByTagName('tbody');
    if(!tbodies){return resultArray;}
    var tbody=tbodies[0];
    var trs = tbody.getElementsByTagName('tr');
    for(var i = 0 ; i<trs.length; i++){
        var tr=trs[i];
        if(!tr){continue;}
        var tds=tr.getElementsByTagName('td');
        if(tds.length<8){continue;}
        var result ={seq:"",dateTime:"",item:"",specimen:"",req:"",unit:"",status:""};
        result.seq=tds[0]&&tds[0].innerText;
        result.item=tds[1]&&tds[1].innerText;
        result.specimen=tds[2]&&tds[2].innerText;
        result.req=tds[3]&&tds[3].innerText;
        result.unit=tds[4]&&tds[4].innerText;
        result.dateTime=tds[5]&&tds[5].innerText+" "+tds[6]&&tds[6].innerText;
        result.status=tds[7]&&tds[7].innerText;
        resultArray.push(result);
    }
    return resultArray;    
};
    //查詢醫囑
//[{seq:"",dateTime:"",item:"",specimen:"",REQNO:"",unit:"",status:""}]
Parser.getReport=function(htmlText){
    var resultArray=[];
    var doc = Parser.getDOM(htmlText);
    var tbodies = doc.getElementsByTagName('tbody');
    if(!tbodies){return resultArray;}
    var tbody=tbodies[0];
    var trs = tbody.getElementsByTagName('tr');
    for(var i = 0 ; i<trs.length; i++){
        var tr=trs[i];
        if(!tr){continue;}
        var tds=tr.getElementsByTagName('td');
        if(tds.length<7){continue;}
        var result ={partNo:"",patientID:"",caseNo:"",orderSeq:"",item:"",
            specimen:"",req:"",signDate:"",reportDate:""};
        var a = tds[0]&&tds[0].getElementsByTagName('a');
        if(!a){continue};
        a=a[0];
        var href=a.getAttribute('href');
        if(!href){continue};
        result.partNo=href.regSelectAll(/partno=[0-9]*/g).regReplaceAll('partno=','');
        result.patientID=href.regSelectAll(/histno=[0-9]*/g).regReplaceAll('histno=','');
        result.caseNo=href.regSelectAll(/caseno=[0-9]*/g).regReplaceAll('caseno=','');
        result.orderSeq=href.regSelectAll(/ordseq=[0-9]*/g).regReplaceAll('ordseq=','');
        result.item=a.innerText;
        result.specimen=tds[1]&&tds[1].innerText;
        result.req=tds[2]&&tds[2].innerText;
        result.signDate=tds[3]&&tds[3].innerText;
        result.reportDate=tds[4]&&tds[4].innerText;
        resultArray.push(result);
    }
    return resultArray;    
};
//查詢報告內容
//{htmlText:"",parsed:[{recieveDateTime:"",reportDateTime:"",key:"",value:""}]}
Parser.getReportContent=function(htmlText){
    var result={htmlText:"",parsed:[]};
    var doc = Parser.getDOM(htmlText);
    var pre = doc.getElementsByTagName('pre');
    if(!pre){return result;}
    pre=pre[0];
    result.htmlText=pre.innerText.regReplaceAll(/\\r\\n/g,"<br>");
    return result;
};
//查詢累積報告
//return {colNames:[], data:[]};
Parser.getCummulative=function(htmlText){
    var result={colNames:[], data:[]};
    var doc = Parser.getDOM(htmlText);
    var thead = doc.getElementsByTagName('thead');
    var tbody = doc.getElementsByTagName('tbody');
    if(!thead||!tbody||thead.length==0||tbody.length==0){return result;}
    thead=thead[0];
    var ths=thead.getElementsByTagName('th');
    for(var i = 0; i < ths.length;i++)
    {
        if(ths[i].innerText.trim()){
            result.colNames.push(ths[i].innerText.trim());
        }
    }
    tbody=tbody[0];
    var trs=tbody.getElementsByTagName('tr');
    for(var i = 0; i < trs.length-1;i++)
    {
        var tds =  trs[i].getElementsByTagName('td');
        if(tds.length < result.colNames.length){continue;}
        var newDataRow=[];
        for(var j = 0 ; j <result.colNames.length;j++)
        {
            var thisCol=tds[j].innerText.trim();
            if(thisCol=="-"){thisCol="";}
            newDataRow.push(thisCol);
        }
        if(result.colNames.indexOf('Glucose')<0){
            newDataRow[0]="20"+newDataRow[0];
        }
        newDataRow[0]=newDataRow[0].regReplaceAll(/\./,":");
        result.data.push(newDataRow);
    }
    return result;
}
//查詢生命徵象
//return {colNames:[], data:[]};
Parser.getVitalSign=function(htmlText){
    var result={colNames:[], data:[]};
    var doc = Parser.getDOM(htmlText);
    var thead = doc.getElementsByTagName('thead');
    var tbody = doc.getElementsByTagName('tbody');
    if(!thead||!tbody||thead.length==0||tbody.length==0){return result;}
    thead=thead[0];
    var ths=thead.getElementsByTagName('th');
    for(var i = 0; i < ths.length;i++)
    {
        result.colNames.push(ths[i].innerText.trim());
    }
    tbody=tbody[0];
    var trs=tbody.getElementsByTagName('tr');
    for(var i = 0; i < trs.length;i++)
    {
        var tds =  trs[i].getElementsByTagName('td');
        if(tds.length != result.colNames.length){continue;}
        var newDataRow=[];
        for(var j = 0 ; j <tds.length;j++)
        {
            var thisCol=tds[j].innerText.trim();
            newDataRow.push(thisCol);
        }
        newDataRow[0]=newDataRow[0].regReplaceAll(/\s\s+/g, ' ');
        if(result.colNames.indexOf('血氧濃度')>=0){
            var parts= newDataRow[0].split(' ');
            newDataRow[0]=Parser.getDateFromShortDate(parts[0])+" "+Parser.getTimeFromShortTime(parts[1])
        }
        result.data.push(newDataRow);
    }
    return result;
};
//治療處置
//{item:"",info:"",class:"",freq:"",qty:"",duration:"",startDate:"", endData:"",status:""};
Parser.getTreatment=function(htmlText){
    var resultArray=[];
    var doc = Parser.getDOM(htmlText);
    var tbodies = doc.getElementsByTagName('tbody');
    if(!tbodies){return resultArray;}
    var tbody=tbodies[0];
    var trs = tbody.getElementsByTagName('tr');
    for(var i = 0 ; i<trs.length; i++){
        var tr=trs[i];
        if(!tr){continue;}
        var tds=tr.getElementsByTagName('td');
        if(tds.length<8){continue;}
        var result ={item:"",info:"",class:"",freq:"",qty:"",
            duration:"",startDate:"", endData:"",status:""};
        var span = tds[0].getElementsByTagName('span');
        if(span&&span[0]){
            result.info=span[0].innerText.trim();
        }
        Parser.removeElementsByTagName(tds[0],'a');
        result.item=tds[0].innerText.trim();
        result.class=tds[1].innerText.trim();
        result.freq=tds[2].innerText.trim();
        result.qty=tds[3].innerText.trim();
        result.duration=Number(tds[4].innerText);
        result.startDate=tds[5].innerText.trim();
        result.endData=tds[6].innerText.trim();
        result.status=tds[7].innerText.trim();
        resultArray.push(result);
    }
    return resultArray;
}
//輸血記錄
//[{item:"",req:"",date:""}]
Parser.getTransfusion=function(htmlText){
    var resultArray=[];
    var doc = Parser.getDOM(htmlText);
    var tbodies = doc.getElementsByTagName('tbody');
    if(!tbodies){return resultArray;}
    var tbody=tbodies[0];
    var trs = tbody.getElementsByTagName('tr');
    for(var i = 0 ; i<trs.length; i++){
        var tr=trs[i];
        if(!tr){continue;}
        var tds=tr.getElementsByTagName('td');
        if(tds.length<6){continue;}
        var result ={item:"",req:"",date:""};
        result.item=tds[1].innerText;
        result.req=tds[3].innerText;
        result.date=tds[4].innerText;
        resultArray.push(result);
    }
    return resultArray;
}
//藥物清單
//  {startDateTime:"",endDateTime:"",drugName:"",tradeName:"",dosage:"",unit:"",route:"",freq:"",status:"",info:""}
Parser.getMedication=function(htmlText){
    var resultArray=[];
    var doc = Parser.getDOM(htmlText);
    var tbodies = doc.getElementsByTagName('tbody');
    if(!tbodies){return resultArray;}
    var tbody=tbodies[0];
    var trs = tbody.getElementsByTagName('tr');
    for(var i = 0 ; i<trs.length; i++){
        var tr=trs[i];
        if(!tr){continue;}
        var tds=tr.getElementsByTagName('td');
        if(tds.length<12){continue;}
        var result ={drugName:"",tradeName:"",dosage:"",unit:"",route:"",freq:"",startDateTime:"",endDateTime:"",status:"",selfPaid:"",seq:"",info:""};
        result.drugName=tds[0].innerText.regReplaceAll(/\\r/g,'').regReplaceAll(/\\n/g,'').regReplaceAll(/\\t/g,'').regReplaceAll(/\\"/g,'').trim();
        result.tradeName=tds[1].innerText.regReplaceAll(/\\"/g,'').trim();
        result.dosage=tds[2].innerText.trim();
        result.unit=tds[3].innerText.trim();
        result.route=tds[4].innerText.trim();
        result.freq=tds[5].innerText.trim();
        result.startDateTime=Parser.getDateTimeFromMedicationTable(tds[6].innerText.trim());
        result.endDateTime=Parser.getDateTimeFromMedicationTable(tds[7].innerText.trim());
        result.status=tds[8].innerText.trim();
        result.selfPaid=tds[10].innerText.trim();
        result.seq=tds[11].innerHTML.trim().regSelectAll(/ordseq=[0-9]*/).replaceAll('ordseq=','');
        result.info=tds[11].innerText.trim();
        resultArray.push(result);
    }
    return resultArray;
}
//取得藥物註記(字串)
Parser.getMedicationInfo=function(htmlText){
    var result="";
    var doc = Parser.getDOM(htmlText);
    var div=doc.getElementsByTagName('div');
    div=div&&div[0];
    if(!div){return result;}
    result=div.innerText.trim().replaceAll('用藥說明:','').regReplaceAll(/\\r/g,'').regReplaceAll(/\\n/g,'').regReplaceAll(/\\t/g,'')
    return result;
}
//取得產單
Parser.getPreSelectBirthSheet=function(htmlText){
    var result={caseno:"",histno:"",token:""};
    result['struts.token.name']="";
    var doc = Parser.getDOM(htmlText);
    var inputs = doc.getElementsByTagName('input');
    if(!inputs||inputs.length<4){return result;}
    result.caseno=inputs[0].getAttribute('value').regReplaceAll(/\\/g,"").regReplaceAll(/"/g,"");
    result.histno=inputs[1].getAttribute('value').regReplaceAll(/\\/g,"").regReplaceAll(/"/g,"");
    result['struts.token.name']=inputs[2].getAttribute('value').regReplaceAll(/\\/g,"").regReplaceAll(/"/g,"");
    result.token=inputs[3].getAttribute('value').regReplaceAll(/\\/g,"").regReplaceAll(/"/g,"");
    return result;
}

Parser.getBirthSheet=function(htmlText){
    var result={
        hasBirthSheet:false,
        mother:{ID:"",name:"",admissionReason:""},
        child:{GAweek:"",GAday:"",ROMDateTime:"",deliverDateTime:"",deliverMethod:""
            ,ApgarScore:[],management:[]
        }
    };
    htmlText=htmlText.regReplaceAll(/\\t/g,'').regReplaceAll(/\\n/g,'').regReplaceAll(/\\r/g,'').regReplaceAll(/\\"/g,'');
    var doc =Parser.getDOM(htmlText);
    var $doc = $(doc);

    var $motherName = $doc.find('font>span');
    if(!$motherName){return result;}
    var nameText =$motherName.text().regSelectAll(/\[母親姓名:.*(?=\]\[)/).regReplaceAll(/\[母親姓名:/,"").replaceNbsps();
    var parts = nameText.split(" ");
    if(parts.length<3){return result;}
    result.mother.ID=parts[1];
    result.mother.name=parts[0];
    if(!result.mother.ID){return result;}
    result.hasBirthSheet=true;
    var span_tab2=$doc.find('#tabs-2 span');
    result.mother.admissionReason=span_tab2[0]&&span_tab2[0].innerText.trim();

    var span_tab3=$doc.find('#tabs-3 span');
    result.child.GAweek=span_tab3[0]&&span_tab3[0].innerText.trim();
    result.child.GAday=span_tab3[1]&&span_tab3[1].innerText.trim();
    result.child.ROMDateTime=span_tab3[3]&&span_tab3[3].innerText.trim();
    result.child.deliverDateTime=span_tab3[4]&&span_tab3[4].innerText.trim();
    var ApgarScore=[
        span_tab3[14]&&span_tab3[14].innerText.trim(),
        span_tab3[15]&&span_tab3[15].innerText.trim(),
        span_tab3[16]&&span_tab3[16].innerText.trim(),
        span_tab3[17]&&span_tab3[17].innerText.trim(),
        span_tab3[18]&&span_tab3[18].innerText.trim()
    ];
    result.child.ApgarScore=ApgarScore.filter(function(x){return x;})

    if(isDOMChecked($doc,'#fillForm_nisNcInfo_del0')){
        result.child.deliverMethod="NSD";
    }
    if(isDOMChecked($doc,'#fillForm_nisNcInfo_del1')){
        result.child.deliverMethod="C/S";
    }

    if(isDOMChecked($doc,'#ckListNisEmeTre-1[value="7"]')){
        result.child.management.push("Dry and stimulate");
    }
    if(isDOMChecked($doc,'#ckListNisEmeTre-1[value="3"]')){
        result.child.management.push("Suction");
    }
    if(isDOMChecked($doc,'#ckListNisEmeTre-1[value="2"]')){
        result.child.management.push("Oxygen");
    }
    if(isDOMChecked($doc,'#ckListNisEmeTre-1[value="0"]')){
        result.child.management.push("PPV");
    }
    if(isDOMChecked($doc,'#ckListNisEmeTre-1[value="1"]')){
        result.child.management.push("Intubation");
    }
    if(isDOMChecked($doc,'#ckListNisEmeTre-1[value="5"]')){
        result.child.management.push("Cardiac Massage");
    }
    if(isDOMChecked($doc,'#ckListNisEmeTre-1[value="6"]')){
        result.child.management.push("Medication");
    }
    if(isDOMChecked($doc,'#ckListNisEmeTre-1[value="4"]')){
        result.child.management.push("Other");
    }
    
    return result;
}
var isDOMChecked=function(jqObj,selector){
    var obj=jqObj.find(selector);
    return obj[0]&&obj[0].checked;
}


//護理交班
Parser.NISHandOverPatientInfo=function(htmlText){
    var resultArray=[];
    htmlText=htmlText.regReplaceAll(/\\r/g,'').regReplaceAll(/\\n/g,'').regReplaceAll(/\\t/g,'').regReplaceAll(/\\\"/g,'').replaceNbsps().trim();
    var doc = Parser.getDOM(htmlText);
    // var tbodies = doc.getElementsByTagName('tbody');
    var tds = doc.getElementsByTagName('td');
    if(!(tds&&tds.length>0)){return resultArray;}
    var datas=[];
    for(var i = 0 ; i < tds.length;i++)
    {
        var data = tds[i].innerText.trim();
        datas.push(data);
    }

    datas[30]&&resultArray.push({key:"聯絡人1",value:datas[30]});
    datas[32]&&resultArray.push({key:"聯絡人1電話1",value:datas[32]});
    datas[34]&&resultArray.push({key:"聯絡人1電話2",value:datas[34]});
    datas[36]&&resultArray.push({key:"聯絡人1手機",value:datas[36]});
    datas[38]&&resultArray.push({key:"聯絡人2",value:datas[38]});
    datas[40]&&resultArray.push({key:"聯絡人2電話1",value:datas[40]});
    datas[42]&&resultArray.push({key:"聯絡人2電話2",value:datas[42]});
    datas[44]&&resultArray.push({key:"聯絡人2手機",value:datas[44]});
    datas[46]&&resultArray.push({key:"聯絡人3",value:datas[46]});
    datas[48]&&resultArray.push({key:"聯絡人3電話1",value:datas[48]});
    datas[50]&&resultArray.push({key:"聯絡人3電話2",value:datas[50]});
    datas[52]&&resultArray.push({key:"聯絡人3手機",value:datas[52]});
    datas[54]&&resultArray.push({key:"main照顧者",value:datas[54]});
    datas[56]&&resultArray.push({key:"電話",value:datas[56]});
    return resultArray;
}
Parser.NISHandOverHistory=function(htmlText){
    var resultArray=[];
    htmlText=htmlText.regReplaceAll(/\\r/g,'').regReplaceAll(/\\n/g,'').regReplaceAll(/\\t/g,'').regReplaceAll(/\\\"/g,'').replaceNbsps().trim();
    var doc = Parser.getDOM(htmlText);
    var tds = doc.getElementsByTagName('td');
    if(!(tds&&tds.length>0)){return resultArray;}
    var datas=[];
    for(var i = 0 ; i < tds.length;i++)
    {
        var data = tds[i].innerText.trim();
        datas.push(data);
    }
    //console.log(datas);
    datas[8]&&resultArray.push({key:"重要病史",value:datas[8]});
    datas[14]&&resultArray.push({key:"入院原因",value:datas[14]});
    return resultArray;
}
Parser.NISHandOverHealth=function(htmlText){
    var resultArray=[];
    htmlText=htmlText.regReplaceAll(/\\r/g,'').regReplaceAll(/\\n/g,'').regReplaceAll(/\\t/g,'').regReplaceAll(/\\\"/g,'').replaceNbsps().trim();
    var doc = Parser.getDOM(htmlText);
    var tds = doc.getElementsByTagName('td');
    if(!(tds&&tds.length>0)){return resultArray;}
    var datas=[];
    for(var i = 0 ; i < tds.length;i++)
    {
        var data = tds[i].innerText.trim();
        datas.push(data);
    }
    var i=datas.indexOf("備註");
    (i>=0)&&datas[i+1]&&resultArray.push({key:"備註",value:datas[i+1]});
    return resultArray;
}
Parser.NISHandOverLine=function(htmlText){
    var resultArray=[];
    htmlText=htmlText.regReplaceAll(/\\r/g,'').regReplaceAll(/\\n/g,'').regReplaceAll(/\\t/g,'').regReplaceAll(/\\\"/g,'').replaceNbsps().trim();
    var doc = Parser.getDOM(htmlText);
    var tds = doc.getElementsByTagName('td');
    if(!(tds&&tds.length>0)){return resultArray;}
    var datas=[];
    for(var i = 0 ; i < tds.length;i++)
    {
        var data = tds[i].innerText.trim();
        datas.push(data);
    }
    for(var i = 0; i < datas.length;i++){
        if(datas[i]=="執行內容"){
            var line={};
            (i-6>=0)&&datas[i-6]&&(line.name=datas[i-6]);
            (i-5>=0)&&datas[i-5]&&(line.type=datas[i-5]);
            (i-4>=0)&&datas[i-4]&&(line.part=datas[i-4]);
            (i-3>=0)&&datas[i-3]&&(line.applyTime=datas[i-3]);
            (i-2>=0)&&datas[i-2]&&(line.changeTime=datas[i-2]);
            (i+1>=0)&&datas[i+1]&&(line.info=datas[i+1]);
            resultArray.push({key:"管路"+line.name,value:line});
        }
    }
    return resultArray;
}
Parser.NISHandOverNote=function(htmlText){
    var resultArray=[];
    htmlText=htmlText.regReplaceAll(/\\r/g,'').regReplaceAll(/\\n/g,'').regReplaceAll(/\\t/g,'').regReplaceAll(/\\\"/g,'').replaceNbsps().trim();
    var doc = Parser.getDOM(htmlText);
    var tds = doc.getElementsByTagName('td');
    if(!(tds&&tds.length>0)){return resultArray;}
    var datas=[];
    for(var i = 0 ; i < tds.length;i++)
    {
        var data = tds[i].innerText.trim();
        datas.push(data);
    }
    var startIndex=datas.indexOf("內容");
    if(startIndex<0){return resultArray;}
    for(var i = startIndex+1; i < datas.length;i++){
        var note={};
        (i>=0)&&datas[i]&&(note.date=datas[i]);
        i++;
        (i>=0)&&datas[i]&&(note.text=datas[i]);
        if(note.date&&note.text){
            resultArray.push({key:note.date,value:note.text});
        }
    }
    return resultArray;
}
//flowSheet
Parser.flowSheet=function(htmlText){
    var getProperty=function(name){
        var match = htmlText.match(new RegExp(name+"(\\s|\\S)*?<\\/script>"));
        if(match){
            match=match[0].regReplaceAll(/<\/script>/g,"").regReplaceAll(new RegExp(name+"="),"").regReplaceAll(/\\/g,"");
            do{
                var fix=match.regReplaceAll(/\,\,/g,",\"\",");
                var fixed= (fix!=match);
                match=fix;
            }while(fixed);
            match=match.regReplaceAll(/\,\]/g,",\"\"]");
            match=match.regReplaceAll(/\[\,/g,"[\"\",");
            if(match[match.length-1]==";"){match=match.slice(0,match.length-1)}
            return JSON.parse(match);
        }
        return "";
    }

    var result={};
    
    var event=getProperty("event_Array");
    event&&(result.event=event);

    var peripheral=getProperty("peripheral_Array");
    peripheral&&(result.peripheral=peripheral);
    
    var aline=getProperty("aline_Array");
    aline&&(result.aline=aline);

    var central=getProperty("central_Array");
    central&&(result.central=central);

    var transfusion=getProperty("transfusion_Array");
    transfusion&&(result.transfusion=transfusion);

    var drain=getProperty("drain_Array");
    drain&&(result.drain=drain);

    var NGDrain=getProperty("NGDrain");
    NGDrain&&(result.NGDrain=NGDrain);

    var POAmount=getProperty("POAmount");
    POAmount&&(result.POAmount=POAmount);

    var NGAmount=getProperty("NGAmount");
    NGAmount&&(result.NGAmount=NGAmount);

    var RVAmount=getProperty("RVAmount");
    RVAmount&&(result.RVAmount=RVAmount);

    var urine=getProperty(" urine");
    urine&&(result.urine=urine);

    var stool=getProperty("stool");
    stool&&(result.stool=stool);

    var enema=getProperty("enema");
    enema&&(result.enema=enema);

    return result;
}
