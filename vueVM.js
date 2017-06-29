'use strict';
String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};


var app = new Vue({
    el: '#app',
    data: {
        drugList:[],
        testmode:false,
        realTimeRender:true,
        isMenuShowed:false,
        isMenuOnTop:false,
        age:0,
        bw:0,
        age_checked:0,
        bw_checked:0,
        showCaculated:false,
        isAgeInDay:false,
        isAgeInMonth:false,
        isBwInGram:false,
        searchText:"",
        searchList:[],
        searchText_checked:"",
        focused:-1,
        preFocusedPosition:0,
        ManualShowAdjust_1:false,
        manualVol:100,
        manualAmount:40,
        manualFocused:false,
        showExample:false,
    },
    computed:{
        bwForCalculation:function(){
            if(this.isBwInGram)
            {
                return Number(this.bw_checked.toString().match(/\d+[.]?\d*/)/1000);
            }else
            {
                return Number(this.bw_checked);
            }
        },
        ageInDay:function(){
            if(this.isAgeInDay)
            {
                return Number(this.getDay(this.age_checked));
            }else if(this.isAgeInMonth)
            {
                return Number(this.getMonth(this.age_checked)*30);
            }
            else{
                return Number(this.age_checked*365);
            }
        }
    },
    methods:{
        checkAgeAndBW:function (input){
            var bwCheck = !this.bw_checked||
                (!input.bwLimitL || this.bwForCalculation >= input.bwLimitL)&&
                (!input.bwLimitU || this.bwForCalculation <= input.bwLimitU);
            var ageCheckL;
            if(!input.ageLimitL||!this.age_checked){
                ageCheckL=true;
            }else
            {
                var ageLimitLinDay;
                if(this.checkLastChar(input.ageLimitL,"d")){
                    ageLimitLinDay=this.getDay(input.ageLimitL);
                }
                else{
                   ageLimitLinDay=input.ageLimitL*365;
                }
                ageCheckL= this.ageInDay>=ageLimitLinDay;
            }

            var ageCheckU;
            if(!input.ageLimitU||!this.age_checked){
                ageCheckU=true;
            }else
            {
                var ageLimitUinDay;
                if(this.checkLastChar(input.ageLimitU,"d")){
                    ageLimitUinDay=this.getDay(input.ageLimitU);
                }
                else{
                   ageLimitUinDay=input.ageLimitU*365;
                }
                ageCheckU= this.ageInDay<=ageLimitUinDay;
            }
            return bwCheck && ageCheckL&&ageCheckU;
        },
        calculateDose:function(){
            for(var i = 0; i< this.drugList.length;i++)
            {
                var thisDrug=this.drugList[i];
                for(var j = 0;j<thisDrug.content.length;j++)
                {
                    this.calculateDoseRow(thisDrug.content[j]);
                }
            };
        },
        calculateDoseRow:function(row)
        {
            var prestring=row.equation;
            var match=prestring.match(/[\[].*?[\]]/g);
            if(match)
            {
                var isMaxCount=0;
                for(var k=0; k<match.length;k++)
                {
                    var equation=match[k].slice(1,match[k].length-1);
                    var split = equation.split('*');
                    var multipier=split[1]?split[1]:1;
                    var max=split[3]?split[3]:-1;
                    var bw_checked=this.bwForCalculation;
                    var noAdjust = false;
                    if(split[0]&&split[0]=="1/bw")
                    {
                        bw_checked=1/bw_checked;
                        noAdjust=true;
                    }else if(split[0]=="bw_") {
                         noAdjust=true;
                    }
                    var result=bw_checked*multipier;
                    if(row.adjustAmount&&!noAdjust) {result*=row.adjustAmount;}
                    var isMax=false;
                    if(max>0&&result>=max) {
                        result=max;
                        isMax=true;
                        isMaxCount++;
                    }
                    var digi = split[2]?split[2]:1;
                    result = parseFloat(Math.round(result/digi)*digi).toFixed(3)*1;
                    if(result==0) result = digi;
                    if(isMax) {
                        result = "<span class='maxDose'>"+result+"</span>";
                    }
                    if(row.adjustAmount&&row.adjustAmount!=1&&!noAdjust)
                    {
                        result="<span class='adjusted'>"+result+"</span>";
                    }
                    prestring=prestring.replace(match[k],result);
                }
                if(isMaxCount>0)
                {
                    var matchMax=prestring.match(/(<span class='maxDose'>)?([\d]+(.[\d]+)?)(<\/span>)?-(<span class='maxDose'>)\2(<\/span>)/g);
                    if(matchMax){
                        for(var k=0; k<matchMax.length;k++){
                            var toBeReplaced = matchMax[k].toString();
                            var toReplace = "<span class='maxDose'>"+toBeReplaced.match(/[\d]+(.[\d]+)?/g)[0].toString()+"<\/span>";
                            console.log('prestring '+prestring);
                            console.log('toBeReplaced '+toBeReplaced);
                            console.log('toReplace '+toReplace);
                            prestring=prestring.replace(toBeReplaced,toReplace);
                        }
                    }
                }
            }
            var match =prestring.match(/[\(].*?[\)]/g);
            if(match)
            {
                for(var k=0; k<match.length;k++)
                {
                    var equation=match[k].slice(1,match[k].length-1);
                    if(row.adjustAmount)
                    {
                        equation= Number((equation*row.adjustAmount).toFixed(2));
                        if(row.adjustAmount!=1)
                        {
                            equation= "<span class='adjusted'>"+equation+"</span>";
                        }
                    }
                    
                    prestring=prestring.replace(match[k],equation);
                }
            }
            row.calculated=prestring;
        },
        checkLastChar:function(s,c){
            if(s && typeof s === "string"){
                s=s.toLowerCase();
                return (s.slice(-1)==c);
            }else
            {return false;}
        },
        getDay:function(input){
            return parseInt(input.toString().match(/\d+[.]?\d*/));
        },
        getMonth:function(input){
            return parseInt(input.toString().match(/\d+[.]?\m*/));
        },
        OnAgeChange:function(){
            if(this.age && typeof this.age ==="string")
            {
                var matchValue = this.age.toString().match(/[1-9]\d{0,2}[dDmM]?/);
                this.age=matchValue||"";
            }
            if(this.realTimeRender) {this.onAgeValueChange();}
        },
        onAgeValueChange: function (){
            this.age_checked=this.age?this.age:0;
            this.isAgeInDay=this.checkLastChar(this.age_checked.toString(),"d");
            this.isAgeInMonth=this.checkLastChar(this.age_checked.toString(),"m");
            this.calculateDose();
        },
        onMenuButtonClick:function(){
            if(this.isMenuOnTop){
                this.isMenuShowed=!this.isMenuShowed;
            }
        },
        OnBWChange:function(){
            if(this.bw && typeof this.bw ==="string")
            {
                var matchValue = this.bw.toString().match(/\d+[.]?\d*[gG]?/);
                this.bw=matchValue||"";
            }
            if(this.realTimeRender) {
                this.onBWValueChange();
            }
        },
        onBWValueChange: function (){
            this.bw_checked=this.bw?this.bw:0;
            this.isBwInGram=this.checkLastChar(this.bw_checked.toString(),"g");
            if(this.bwForCalculation<=200)
            {
                this.calculateDose();
            }
            if( this.bw!=0 && this.bw == this.bw_checked)
            {
                this.showCaculated=true;
            }else
            {
                this.showCaculated=false;
            }
        },
        onSearchKeyUp: function(){
             if(this.realTimeRender) {
                  this.searchText_checked = this.searchText.trim();
             }
        },
        onSearchTextChange: function(){
            this.searchText_checked= this.searchText.trim();
            this.focused=-1;
            var focusStatus=$("#searchText").is(":focus");
            window.scrollTo(0,0);
            if(focusStatus){
                $('#searchText').focus();
            };
            if(!this.realTimeRender&&this.isMenuOnTop)
            {
                this.isMenuShowed=false;
            }
        },
        checkSearchText: function(item){
            if(!this.searchText_checked)  {
                return true;
            } 
            if(item.drugName.toLowerCase().indexOf(this.searchText_checked.toLowerCase())>=0){
                return true;
            }
            if(item.indication.toLowerCase().indexOf(this.searchText_checked.toLowerCase())>=0){
                return true;
            }
            if(item.tag){
                if(typeof item.tag === 'string')
                {
                    if(item.tag.toLowerCase()==this.searchText_checked.toLowerCase())
                    {
                        return true;
                    }
                }
                else
                {
                    for(var i = 0; i < item.tag.length ; i++)
                    {
                        if(item.tag[i].toLowerCase().indexOf(this.searchText_checked.toLowerCase())>=0)
                        {
                            return true;
                        }
                    }
               }
            }
        },
        onSearchClear:function(){
            if(this.searchText!='')
            {
                this.searchText='';
            }else
            {
                if(this.isMenuOnTop)
                {
                    this.isMenuShowed=false;
                    return;
                }
            }
            this.onSearchTextChange()
        },
        onContainerClick:function(index){
            if(this.isMenuOnTop&&this.isMenuShowed){
                this.isMenuShowed=false;
            }else
            {
                if(this.focused==index)
                {
                    this.focused=-1;
                }else{
                    this.focused=index;
                    this.preFocusedPosition=window.scrollX;
                    window.scrollTo(0,0);
                }
            }
        },
        clearButton:function(){
            this.onSearchClear();
            this.age="";
            this.bw="";
            this.onAgeValueChange();
            this.onBWValueChange();
            this.focused=-1;
        },
        focusSearchBox:function(){
            if(this.isMenuShowed){
                $('#searchText').focus();
            }
        },
        blurSearchBox:function(){
            $('#searchText').focusout();
        },
        makeSearchList:function(){
            for(var i = 0; i < this.drugList.length;i++)
            {
                if(this.drugList[i].tag){
                    for(var j = 0; j<this.drugList[i].tag.length;j++)
                    {
                        if(this.checkLastChar(this.drugList[i].tag[j],'*'))
                        {
                            continue;
                        }
                        if(this.searchList.indexOf(this.drugList[i].tag[j])<0)
                        {
                            this.searchList.push(this.drugList[i].tag[j]);
                        }
                    }
                }
            }
            this.searchList.sort();
        },
        adjustIncrease: function(row,index,rowindex){
            if(!row.adjustAmount) row.adjustAmount=1;
            if(row.adjustAmount<1&&row.adjustAmount>0)
            {
                row.adjustAmount+=0.1
            }
            else if(row.adjustAmount>=1&&row.adjustAmount<2)
            {
                row.adjustAmount+=0.1
            }
            else
            {
                row.adjustAmount+=0.2
            }
            row.adjustAmount= Number(row.adjustAmount.toFixed(1));
            this.calculateDoseRow(row);
            var element=$('#d'+index+'i'+rowindex);
            element.html(row.calculated);
        },
        adjustDecrease: function(row,index,rowindex){
            if(!row.adjustAmount) row.adjustAmount=1;
            if(row.adjustAmount<=1&&row.adjustAmount>0.1)
            {
                row.adjustAmount-=0.1
            }
            else if(row.adjustAmount>1&&row.adjustAmount<=2)
            {
                row.adjustAmount-=0.1
            }
            else if(row.adjustAmount>2)
            {
                row.adjustAmount-=0.2
            }
            row.adjustAmount=Number(row.adjustAmount.toFixed(1));
            this.calculateDoseRow(row);
            var element=$('#d'+index+'i'+rowindex);
            element.html(row.calculated);
        },
        adjustReset: function(row,index,rowindex){
            row.adjustAmount=1;
            this.calculateDoseRow(row);
            var element=$('#d'+index+'i'+rowindex);
            element.html(row.calculated);
        },
        toggleAdjust:function(row)
        {
            if(!row.adjustable) {
                return;
            }
            if(!row.showAdjust){
                row.showAdjust=true;
            }
            else{
                row.showAdjust=false;
            }
        },
        manualPlus:function()
        {
            this.manualAmount+=8;
            this.manualVol+=20;
        },
        manualMinus:function()
        {
            if(this.manualAmount>8){
                this.manualAmount-=8;
                this.manualVol-=20;
            }
        },
        manualReset:function()
        {
            this.manualAmount=40;
            this.manualVol=100;
        }
    }
});


function Render(){
    app.age="";
    app.bw="";
    app.drugList.length=0;
    makeStyle();
    DataSource.sort(function(a,b){
        return a.index-b.index;
    }
    );
    for(var i = 0 ; i < DataSource.length;i++ )
    {
        var data=DataSource[i];
        app.drugList.push(data);
    }
    app.makeSearchList();
}

function makeStyle(){
    for(var i = 0 ; i < DataSource.length;i++ )
    {
        if( DataSource[i].indication )
        {
            DataSource[i].indication = DataSource[i].indication.replaceAll("[","<span class='IndiEmphasize'>");
            DataSource[i].indication = DataSource[i].indication.replaceAll("]","</span>");
            DataSource[i].indication = DataSource[i].indication.replaceAll("\n","<br>");
        }
        if( DataSource[i].info )
        {
            DataSource[i].info = DataSource[i].info.replaceAll("[","<span class='warning'>");
            DataSource[i].info = DataSource[i].info.replaceAll("]","</span>");
        }
        if( DataSource[i].drugName)
        {
            DataSource[i].drugName = DataSource[i].drugName.replaceAll("(","<span class='subtittle'>(");
            DataSource[i].drugName = DataSource[i].drugName.replaceAll(")",")</span>");
            DataSource[i].drugName = DataSource[i].drugName.replaceAll("\n","<br>");
            DataSource[i].drugName = DataSource[i].drugName.replaceAll(" IV"," <span class='r iv'>IV</span>");
            DataSource[i].drugName = DataSource[i].drugName.replaceAll(" PO"," <span class='r po'>PO</span>");
            DataSource[i].drugName = DataSource[i].drugName.replaceAll(" RC"," <span class='r rc'>RC</span>");
            DataSource[i].drugName = DataSource[i].drugName.replaceAll(" ET"," <span class='r et'>ET</span>");
            DataSource[i].drugName = DataSource[i].drugName.replaceAll(" IM"," <span class='r im'>IM</span>");
            DataSource[i].drugName = DataSource[i].drugName.replaceAll(" IH"," <span class='r ih'>IH</span>");
        }
        if(DataSource[i].info)
        {
            var InfoArray = DataSource[i].info.split('\n');
            DataSource[i].info="";
            InfoArray.forEach(function(element) {
                DataSource[i].info += "<li>" + element;
            }, this);
        }
        if(DataSource[i].reference)
        {
            DataSource[i].reference = DataSource[i].reference.replaceAll("\n","<br>");
        }
        if(DataSource[i].tag)
        {
            DataSource[i].tag=DataSource[i].tag.split(',');
        }
        if(DataSource[i].content)
        {
            for(var j=0; j<DataSource[i].content.length;j++)
            {
                var current = DataSource[i].content[j];
                current.showAdjust=false;
                current.equation = current.equation.replaceAll("\n","<br>");
                current.equation = current.equation.replaceAll("q6-","q6h-");
                current.equation = current.equation.replaceAll("q8-","q8h-");
                current.equation = current.equation.replaceAll("q12-","q12h");
                current.equation = current.equation.replaceAll("-6h","-q6h");
                current.equation = current.equation.replaceAll("-8h","-q8h");
                current.equation = current.equation.replaceAll("-12h","-q12h");
                current.equation = current.equation.replaceAll("--","-");
                current.equation = current.equation.replaceAll("\n","<br>");

                current.dosage = current.dosage.replaceAll("\n","<br>");
                current.dosage = current.dosage.replaceAll("q6-","q6h-");
                current.dosage = current.dosage.replaceAll("q8-","q8h-");
                current.dosage = current.dosage.replaceAll("q12-","q12h");
                current.dosage = current.dosage.replaceAll("-6h","-q6h");
                current.dosage = current.dosage.replaceAll("-8h","-q8h");
                current.dosage = current.dosage.replaceAll("-12h","-q12h");
                current.dosage = current.dosage.replaceAll("--","-");

                current.dosage = current.dosage.replaceAll("q4h","<span class='q q4h'>q4h</span>");
                current.dosage = current.dosage.replaceAll("q6h","<span class='q q6h'>q6h</span>");
                current.dosage = current.dosage.replaceAll("q8h","<span class='q q8h'>q8h</span>");
                current.dosage = current.dosage.replaceAll("q12h","<span class='q q12h'>q12h</span>");
                current.dosage = current.dosage.replaceAll("qd","<span class='q qd'>qd</span>");
                current.dosage = current.dosage.replaceAll("qod","<span class='q qod'>qod</span>");
                current.dosage = current.dosage.replaceAll(" st"," <span class='q st'>st</span>");
                current.dosage = current.dosage.replaceAll(" cont"," <span class='q cont'>cont</span>");
                current.dosage = current.dosage.replaceAll("qw","<span class='q qw'>qw</span>");
                current.dosage = current.dosage.replaceAll("biw","<span class='q biw'>biw</span>");
                current.dosage = current.dosage.replaceAll("tiw","<span class='q tiw'>tiw</span>");

                current.dosage = current.dosage.replaceAll("[","<span class='emphasize'>");
                current.dosage = current.dosage.replaceAll("]","</span>");
                current.equation = current.equation.replaceAll("{","<span class='emphasize'>");
                current.equation = current.equation.replaceAll("}","</span>");
            }
        }
    }
}

var setLayout=function(){
  var bodyWidth=$("body").width();
  if(bodyWidth<600){
      app.isMenuShowed=false;
      if(!app.isMenuOnTop)
      {
        app.isMenuOnTop=true;
      }
    $(".content").width(bodyWidth);
  }else
  {
      app.isMenuShowed=true;
      if(app.isMenuOnTop)
      {
          app.isMenuOnTop=false;
      }
      $(".content").width(bodyWidth-160);
  }
  $('.menu').css({'max-height':$(window).height()-65});
}
$(window).resize(function() {
    setLayout();
});
$(function() {
    setLayout();
});
$(function(){
    var isMobile = false; //initiate as false
    // device detection
    if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4)))
    {
        isMobile = true;
    }
    app.realTimeRender=!isMobile;
});

$(function(){
    $('#content').click(function(){
        if(app.isMenuOnTop)
        {
            app.isMenuShowed=false;
            return false;
        }
    });
    $("#searchText").click(function(){
        $("#searchText").focus();
        if(!app.realTimeRender)
        {
            app.searchText="";
        }
    });
    
    $(".search").keyup(function(e){
        if(e.keyCode==13){
            app.onSearchTextChange();
            $("#searchText").blur();
            if(app.isMenuOnTop) app.isMenuShowed=false;
            return false;
        }else if(e.keyCode==27){
            app.searchText="";
            $("#searchText").val('');
            app.onSearchTextChange();
            $("#searchText").blur();
            return false;
        }
    });
    $(".bw").keyup(function(e){
        if(e.keyCode==13){
            app.bw= $(".bw").val();
            app.onBWValueChange();
            $(".bw").blur();
            return false;
        }else if(e.keyCode==27){
            app.bw="";
              $(".bw").blur();
            return false;
        }
    });
    $(".bw").blur(function(){
        if(app.bwForCalculation>200)
        {
            app.bw=200;
            $(".bw").val(200);
            app.onBWValueChange();
        }
    });
     $(".age").keyup(function(e){
          if(e.keyCode==13){
            app.onAgeValueChange();
            $(".age").blur();
            return false;
        }else if(e.keyCode==27){
            app.age="";
            $(".age").val('');
            app.onAgeValueChange();
            $(".age").blur();
            return false;
        }
    });
   
    $(document).keyup(function(e){
        if(!$(".bw").is(":focus")&&!$(".age").is(":focus")&&!$("#searchText").is(":focus")&&!e.ctrlKey){
            if (e.keyCode==27) {    //capture ESC
                if(app.isMenuOnTop){
                    app.isMenuShowed=false;
                }
                app.clearButton();
                return false;
            }else if(e.keyCode==13)  //capture Enter
            {
                if(app.isMenuOnTop) 
                {
                    app.isMenuShowed=!app.isMenuShowed;
                }
                return false;
            } else if((e.keyCode>=48&&e.keyCode<=57) ||
            (e.keyCode >= 96 && e.keyCode <= 105))  //capture numbers
            {
                $(".bw").focus();
                app.bw=e.key;
                $(".bw").val(e.key);
                app.OnBWChange();
                return false;
            }else if((e.keyCode>= 65 && e.keyCode<=90 )) //capture Chars
            {
                if(app.isMenuOnTop)
                {
                    if(app.isMenuShowed)
                    {
                        $("#searchText").focus();
                        var newContent=$("#searchText").val()+e.key;
                        app.searchText=newContent;
                        $("#searchText").val(newContent);
                    }else
                    {
                        app.searchText=e.key;
                        $("#searchText").val(e.key);
                        app.isMenuShowed=true;
                    }
                }else
                {
                        $("#searchText").focus();
                        $("#searchText").val(e.key);
                }
            }else if(e.keyCode==8 && app.searchText)
            {
                if(app.isMenuOnTop)
                {
                    if(app.isMenuShowed)
                    {
                        $("#searchText").focus();
                        var newContent=$("#searchText").val().slice(0,-1);
                        $("#searchText").val(newContent);
                        app.searchText=newContent;
                    }else
                    {
                        $("#searchText").focus();
                        app.isMenuShowed=true;
                    }
                }else
                {
                    $("#searchText").focus();
                    var newContent=$("#searchText").val().slice(0,-1);
                    $("#searchText").val(newContent);
                    app.searchText=newContent;
                }
            }
        }
    });

});
