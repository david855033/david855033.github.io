"use strict";
var queryData=function(query, callback){
    var notPreSelect=query.indexOf('preSelect')<0;
    var serverRequest=queryToServerRequest(query);
    
    // from datastructure;
    var queryDataSet_local={};
    if(notPreSelect){
        var queryDataSet = dataManager.get(query);
        if(queryDataSet){
            queryDataSet_local = queryDataSet;
            callback(queryDataSet.data, queryDataSet.timeStamp);  
        }
    }

    //from server
    if(queryDataSet_local.timeStamp){
        var secDiff = Parser.getSecondDifference(queryDataSet_local.timeStamp,Parser.getDateTime());
    }else{
        secDiff=100;
    }
    if(secDiff>10||(!queryDataSet_local&&secDiff>1)){   //限制對同一資源的存取間隔
        server.request(serverRequest, function(serverData, timeStamp){ 
            if(serverData=='""'){
                //console.log('not logged, trying log again');
                //重新登入後 再執行一次serverRequest
                view.signIn(function(){
                    server.request(serverRequest, function(serverData, timeStamp){
                        var parsedData = serverRequest.parser?serverRequest.parser(serverData):serverData;
                        callback(parsedData, timeStamp);
                        if(notPreSelect){
                            dataManager.set(query, serverRequest.url, timeStamp, parsedData);
                        }
                    });
                });
                return;
            };
            var parsedData = serverRequest.parser?serverRequest.parser(serverData):serverData;
            callback(parsedData, timeStamp);
            if(notPreSelect){
                dataManager.set(query, serverRequest.url, timeStamp, parsedData);
            }
        });
    }
}

//serverRequest {url; method; form;}
var queryToServerRequest=function(query)
{
    var queryList = query.split('_');
    if(queryList[0] == "patientList"){
        return {
            url:"https://web9.vghtpe.gov.tw/emr/qemr/qemr.cfm?action=findPatient",
            method:"POST",
            form:{wd:queryList[1]},
            parser:Parser.getPatientList
        };
    }else if(queryList[0]  == "preSelectPatient"){
        return {
            url:"https://web9.vghtpe.gov.tw/emr/qemr/qemr.cfm?action=findEmr&histno="+queryList[1]
        };
    }else if(queryList[0]  == "admissionList"){
        return {
            url:"https://web9.vghtpe.gov.tw/emr/qemr/qemr.cfm?action=findNicu&histno="+queryList[1],
            parser:Parser.getAdmissionList
        };
    }else if(queryList[0]  == "patientData"){
        return {
            url:"https://web9.vghtpe.gov.tw/emr/qemr/qemr.cfm?action=findPba&histno="+queryList[1],
            parser:Parser.getPatientData
        };
    }else if(queryList[0]  == "changeBedSection"){
        return {
            url:"https://web9.vghtpe.gov.tw/emr/qemr/qemr.cfm?action=findPlocs&histno="+queryList[1],
            parser:Parser.getChangeBedSection
        };
    }else if(queryList[0] =="consultation"){
        return {
            url:"https://web9.vghtpe.gov.tw/emr/cps/consultation.cfm?action=find",
            method:"POST",
            form:{cpscwd:'',cpsrsect:'',cpsdept:'',cpsdoc:'',cpshist:queryList[1],month:'',bgndt:'',enddt:''},
            parser:Parser.getConsultation
        };
    }else if(queryList[0] =="consultationReply"){
        return {
            url:"https://web9.vghtpe.gov.tw/emr/cps/consultation.cfm?action=find&histno="+queryList[1]+"&caseno="+queryList[2]+"&oseq="+queryList[3],
            parser:Parser.getConsultationReply
        };
    }else if(queryList[0] =="consultationPending"){
        return {
            url:"https://web9.vghtpe.gov.tw/emr/cps/consultation.cfm?action=add",
            method:"POST",
            form:{cpscwd:'',cpsrsect:'',cpsdept:'',cpsdoc:'',cpshist:queryList[1],cstype:"adm"},
            parser:Parser.getConsultationPending
        };
    }else if(queryList[0] =="surgery"){
        return {
            url:"https://web9.vghtpe.gov.tw/emr/qemr/qemr.cfm?action=findOpn&histno="+queryList[1],
            parser:Parser.getSurgery
        };
    }else if(queryList[0] =="order"){
        return {
            url:"https://web9.vghtpe.gov.tw/emr/qemr/qemr.cfm?action=findOrd&histno="+queryList[1]+"&tday="+queryList[2]+"&tdept=ALL",
            parser:Parser.getOrder
        };
    }else if(queryList[0] =="report"){
        return {
            url:"https://web9.vghtpe.gov.tw/emr/qemr/qemr.cfm?action=findRes&histno="+queryList[1]+"&tmonth="+queryList[2]+"&tdept=ALL",
            parser:Parser.getReport
        };
    }else if(queryList[0] =="reportContent"){
        return {
            url:"https://web9.vghtpe.gov.tw/emr/qemr/qemr.cfm?action=findRes&partno="+queryList[2]+"&histno="+queryList[1]+"&caseno="+queryList[3]+"&ordseq="+queryList[4]+"&tmonth=03",
            parser:Parser.getReportContent
        };
    }else if(queryList[0] =="cummulative"){
        return {
            url:"https://web9.vghtpe.gov.tw/emr/qemr/qemr.cfm?action=findResd&histno="+queryList[1]+"&resdtmonth="+queryList[2]+"&resdtype="+queryList[3],
            parser:Parser.getCummulative
        };
    }else if(queryList[0] =="vitalSign"){
        return {
            url:"https://web9.vghtpe.gov.tw/emr/qemr/qemr.cfm?action=findVts&histno="+queryList[1]+"&caseno="+queryList[2]+"&pbvtype="+queryList[3],
            parser:Parser.getVitalSign
        };
    }else if(queryList[0] =="treatment"){
        return {
            url:"https://web9.vghtpe.gov.tw/emr/qemr/qemr.cfm?action=findTrt&histno="+queryList[1]+"&caseno="+queryList[2],
            parser:Parser.getTreatment
        };
    }else if(queryList[0] =="transfusion"){
        return {
            url:"https://web9.vghtpe.gov.tw/emr/qemr/qemr.cfm?action=findBcst&histno="+queryList[1]+"&caseno="+queryList[2]+"&admdt=00010101",
            parser:Parser.getTransfusion
        };
    }else if(queryList[0] =="medication"){
        return {
            url:"https://web9.vghtpe.gov.tw/emr/qemr/qemr.cfm?action=findUd&histno="+queryList[1]+"&caseno="+queryList[2]+"&dt=0&type=I&dept=0&dt1=0",
            parser:Parser.getMedication
        };
    }else if(queryList[0] =="medicationInfo"){
        return {
            url:"https://web9.vghtpe.gov.tw/emr/qemr/qemr.cfm?action=findUd&caseno="+queryList[1]+"&ordseq="+queryList[2],
            parser:Parser.getMedicationInfo
        };
    }else if(queryList[0] =="preSelectBirthSheet"){
        return {
            url:"https://web9.vghtpe.gov.tw/OBSTS/nurlist?caseno="+queryList[2]+"&histno="+queryList[1],
            parser:Parser.getPreSelectBirthSheet
        };
    }else if(queryList[0] =="birthSheet"){
        return {
            url:"https://web9.vghtpe.gov.tw/OBSTS/pedlist",
            method:"POST",
            form:{caseno:queryList[1],histno:queryList[2],'struts.token.name':queryList[3],token:queryList[4]},
            parser:Parser.getBirthSheet
        };
    }else if(queryList[0] =="preSelectNIS"){
        return {
            url:"https://web9.vghtpe.gov.tw/NIS/emr.jsp?hisid="+queryList[1]+"&caseno="+queryList[2]
        };
    }else if(queryList[0] =="preSelectNIS2"){
        return {
            url:"https://web9.vghtpe.gov.tw/NIS/reportForEmr.do"
        };
    }else if(queryList[0] =="NISHandOverPatientInfo"){
        return {
            url:"https://web9.vghtpe.gov.tw/NIS/handover/NishRpt/patinfo.do?reqtype=rpt",
            parser:Parser.NISHandOverPatientInfo
        };
    }else if(queryList[0] =="NISHandOverHistory"){
        return {
            url:"https://web9.vghtpe.gov.tw/NIS/handover/NishRpt/history.do?reqtype=rpt",
            parser:Parser.NISHandOverHistory
        };
    }else if(queryList[0] =="NISHandOverHealth"){
        return {
            url:"https://web9.vghtpe.gov.tw/NIS/handover/NishRpt/helth.do?reqtype=rpt",
            parser:Parser.NISHandOverHealth
        };
    }else if(queryList[0] =="NISHandOverLine"){
        return {
            url:"https://web9.vghtpe.gov.tw/NIS/handover/NishRpt/canlskin.do?reqtype=rpt",
            parser:Parser.NISHandOverLine
        };
    }else if(queryList[0] =="NISHandOverNote"){
        return {
            url:"https://web9.vghtpe.gov.tw/NIS/handover/NishRpt/note.do?reqtype=rpt",
            parser:Parser.NISHandOverNote
        };
    }else if(queryList[0] =="preSelectFlowSheet"){
        return {
            url:"https://web9.vghtpe.gov.tw/NIS/nicuflowsheet.jsp?hisid="+queryList[1]+"&caseno="+queryList[2]
        };
    }else if(queryList[0] =="flowSheet"){
        return {
            url:"https://web9.vghtpe.gov.tw/NIS/report/FlowSheet/main.do?gaugeDate1="+queryList[3]+"&r_ser_num="+queryList[2]+"&r_his_id="+queryList[1],
            parser:Parser.flowSheet
        };
    }
}
