"use strict";
var requestPatientList=function(ward,callback){
    queryData("patientList_"+ward,function(data, timeStamp){
        callback&&callback(data, timeStamp);
    });
}
var preSelectPatient=function(patientID, callback){
    queryData("preSelectPatient_"+patientID,function(data, timeStamp){
        callback&&callback(data, timeStamp);
    });
}
var requestAdmissionList=function(patientID, callback){
    preSelectPatient(patientID, function(data_preSelect, timeStamp_preSelect){
        queryData("admissionList_"+patientID,function(data, timeStamp){
            callback&&callback(data, timeStamp);
         });
    });
}
var requestPatientData=function(patientID, callback){
    preSelectPatient(patientID, function(data_preSelect, timeStamp_preSelect){
        queryData("patientData_"+patientID,function(data, timeStamp){
            callback&&callback(data, timeStamp);
         });
    });
}
var requestChangeBedSection=function(patientID, callback){
    preSelectPatient(patientID, function(data_preSelect, timeStamp_preSelect){
        queryData("changeBedSection_"+patientID,function(data, timeStamp){
            callback&&callback(data, timeStamp);
         });
    });
}
var requestConsultation=function(patientID, callback){
    queryData("consultation_"+patientID,function(data, timeStamp){
        callback&&callback(data, timeStamp);
    });
}
var requestConsultationReply=function(patientID,caseNo, oseq,callback){
    queryData("consultationReply_"+patientID+"_"+caseNo+"_"+oseq, function(data, timeStamp){
        callback&&callback(data, timeStamp);
    });
}
var requestConsultationPending=function(patientID, callback){
    queryData("consultationPending_"+patientID,function(data, timeStamp){
        callback&&callback(data, timeStamp);
    });
}
var requestSurgery=function(patientID, callback){
    preSelectPatient(patientID, function(data_preSelect, timeStamp_preSelect){
        queryData("surgery_"+patientID,function(data, timeStamp){
            callback&&callback(data, timeStamp);
        });
    });
}
var requestOrder=function(patientID, days,callback){
    preSelectPatient(patientID, function(data_preSelect, timeStamp_preSelect){
        queryData("order_"+patientID+"_"+days,function(data, timeStamp){
            callback&&callback(data, timeStamp);
        });
    });
}
var requestReport=function(patientID, monthsOrYear, callback){
    preSelectPatient(patientID, function(data_preSelect, timeStamp_preSelect){
        queryData("report_"+patientID+"_"+monthsOrYear,function(data, timeStamp){
            callback&&callback(data, timeStamp);
        });
    });
}
var requestReportContent=function(patientID,partNo,caseNo, orderSeq, callback){
    queryData("reportContent_"+patientID+"_"+partNo+"_"+caseNo+"_"+orderSeq,function(data, timeStamp){
        callback&&callback(data, timeStamp);
    });
}
var requestCummulative=function(patientID, monthsOrYear, field, callback){
    preSelectPatient(patientID, function(data_preSelect, timeStamp_preSelect){
        queryData("cummulative_"+patientID+"_"+monthsOrYear+"_"+field,function(data, timeStamp){
            callback&&callback(data, timeStamp);
        });
    });
}
var requestVitalSign=function(patientID,caseNo, field, callback){
    preSelectPatient(patientID, function(data_preSelect, timeStamp_preSelect){
        queryData("vitalSign_"+patientID+"_"+caseNo+"_"+field,function(data, timeStamp){
            callback&&callback(data, timeStamp);
        });
    });
}
var requestTreatment=function(patientID, caseNo, callback){
    preSelectPatient(patientID, function(data_preSelect, timeStamp_preSelect){
        queryData("treatment_"+patientID+"_"+caseNo,function(data, timeStamp){
            callback&&callback(data, timeStamp);
        });
    });
}
var requestTransfusion=function(patientID, caseNo, callback){
    preSelectPatient(patientID, function(data_preSelect, timeStamp_preSelect){
        queryData("transfusion_"+patientID+"_"+caseNo,function(data, timeStamp){
            callback&&callback(data, timeStamp);
        });
    });
}
var requestMedication=function(patientID,caseNo, callback){
    preSelectPatient(patientID, function(data_preSelect, timeStamp_preSelect){
        queryData("medication_"+patientID+"_"+caseNo,function(data, timeStamp){
            callback&&callback(data, timeStamp);
        });
    });
}
var updateMedicationInfo=function(patientID,caseNo,seq,callback){
    preSelectPatient(patientID, function(data_preSelect, timeStamp_preSelect){
        queryData("medicationInfo_"+caseNo+"_"+seq ,function(data, timeStamp){
            callback&&callback(data, timeStamp);
        });
    });
}

var preSelectBirthSheet=function(patientID,caseNo,callback){
    queryData("preSelectBirthSheet_"+patientID+"_"+caseNo,function(data, timeStamp){
        callback&&callback(data, timeStamp);
    });
}
var updateBirthSheet=function(patientID,caseNo,callback){
    preSelectBirthSheet(patientID, caseNo, function(data_preSelect, timeStamp_preSelect){
        queryData("birthSheet_"+data_preSelect.caseno+"_"+data_preSelect.histno+"_"+data_preSelect['struts.token.name']+"_"+data_preSelect.token ,function(data, timeStamp){
            callback&&callback(data, timeStamp);
        });
    });
}

var preSelectNIS=function(patientID,caseNo,callback){
    queryData("preSelectNIS_"+patientID+"_"+caseNo,function(data, timeStamp){
        queryData("preSelectNIS2",function(data, timeStamp){
            callback&&callback(data, timeStamp);
        });
    });
}
var updateNISHandOver=function(patientID,caseNo,callback){
    preSelectNIS(patientID, caseNo, function(data_preSelect, timeStamp_preSelect){
        queryData("NISHandOverPatientInfo_"+patientID+"_"+caseNo,function(data, timeStamp){
            callback&&callback(data, timeStamp, "patientInfo");
        });
        queryData("NISHandOverHistory_"+patientID+"_"+caseNo,function(data, timeStamp){
            callback&&callback(data, timeStamp, "history");
        });
        queryData("NISHandOverHealth_"+patientID+"_"+caseNo,function(data, timeStamp){
            callback&&callback(data, timeStamp, "health");
        });
        queryData("NISHandOverLine_"+patientID+"_"+caseNo,function(data, timeStamp){
            callback&&callback(data, timeStamp, "line");
        });
        queryData("NISHandOverNote_"+patientID+"_"+caseNo,function(data, timeStamp){
            callback&&callback(data, timeStamp, "note");
        });
    });
}
var preSelectFlowSheet=function(patientID,caseNo,callback){
    queryData("preSelectFlowSheet_"+patientID+"_"+caseNo,function(data, timeStamp){
        callback&&callback(data, timeStamp);
    });
};

var updateFlowSheet=function(patientID,caseNo,date,callback){
    preSelectFlowSheet(patientID, caseNo, function(data_preSelect, timeStamp_preSelect){
        queryData("flowSheet_"+patientID+"_"+caseNo+"_"+date,function(data, timeStamp){
            callback&&callback(data, timeStamp, date);
        });
    });
}