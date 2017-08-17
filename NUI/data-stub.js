var getAdmissionList = function(patientID){
    return [
        {admissionDate:"2017-01-01",dischargeDate:"2017-01-02",caseNo:"1234567"},
        {admissionDate:"2017-01-01",dischargeDate:"2017-01-02",caseNo:"2234567"}
    ];
};

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

var getAdmissionInfo={};
getAdmissionInfo.lastDiagnosis = function(patientID)
{
    
}