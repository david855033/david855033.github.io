'use strict'

function Render(){
    app.age="";
    app.bw="";
    app.drugList.length=0;
    makeStyle();
    DataSource.sort(function(a,b){
         return a.drugName.toLowerCase().localeCompare(b.drugName.toLowerCase())}
         );
    for(var i = 0 ; i < DataSource.length;i++ )
    {
        var data=DataSource[i];
        app.drugList.push(data);
    }
}

function makeStyle(){
    for(var i = 0 ; i < DataSource.length;i++ )
    {
        if( DataSource[i].indication )
        {
            DataSource[i].indication = DataSource[i].indication.replace("[","<span class='emphasize'>");
            DataSource[i].indication = DataSource[i].indication.replace("]","</span>");
        }
        if( DataSource[i].drugName)
        {
            DataSource[i].drugName = DataSource[i].drugName.replace("(","<span class='subtittle'>(");
            DataSource[i].drugName = DataSource[i].drugName.replace(")",")</span>");
        }
    }
}


$(window).resize(function() {
  var bodyWidth=$("body").width();
  if(bodyWidth<900){
      if(!app.isMenuOnTop)
      {
        app.isMenuOnTop=true;
        app.isMenuShowed=false;
      }
    $(".content").width(bodyWidth);
  }else
  {
      if(app.isMenuOnTop)
      {
            app.isMenuOnTop=false;
            app.isMenuShowed=true;     
      }
      $(".content").width(bodyWidth-220);
  }
});
$(function() {
  var bodyWidth=$("body").width();
  if(bodyWidth<900){
    app.isMenuOnTop=true;
    app.isMenuShowed=false;
   $(".content").width(bodyWidth);
  }else
  {
    app.isMenuOnTop=false;
    app.isMenuShowed=true;
    $(".content").width(bodyWidth-220);
  }
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
    $(".search").keypress(function(e){
        if(e.keyCode==13){
            app.onSearchTextChange();
            if(app.isMenuOnTop) app.isMenuShowed=false;
            return false;
        }
    });
    $('#app').mousedown(function(){
        if(app.isMenuOnTop){
            app.isMenuShowed=false;
        }
    });
    $(".menuButton").mousedown(function(){
        if(app.realTimeRender){ 
            $("#searchText").focus(); 
        }
        return false;
    });
    $(".search").mousedown(function(){
        return false;
    });
    $(".menu").mousedown(function(){
        return false;
    });
    $(document).keyup(function(e){
        if (e.keyCode===27) {
            if(app.isMenuOnTop){
                app.isMenuShowed=false;
            }
            app.clearButton();
        }
    });
    $(".age").dblclick(function(){
        app.showGuide=true;
    });
    $(".bw").dblclick(function(){
        app.showGuide=true;
    });
});

var app = new Vue({
    el: '#app',
    data: {
        testmode:false,
        realTimeRender:true,
        isMenuShowed:false,
        isMenuOnTop:false,
        drugList:[],
        age:0,
        bw:0,
        age_checked:0,
        bw_checked:0,
        showCaculated:false,
        showGuide:true,
        isAgeInDay:false,
        isBwInGram:false,
        searchText:"",
        searchList:["抗生素","輸液","麻醉","呼吸道"],
        searchText_checked:"",
        focused:"",
    },
    computed:{
        bwForCalculation:function(){
            if(this.isBwInGram)
            {
                return this.bw_checked.toString().match(/\d+[.]?\d*/)/1000;
            }else
            {
                return this.bw_checked[0];
            }
        },
        ageInDay:function(){
            if(this.isAgeInDay)
            {
                return this.getDay(this.age_checked);
            }else
            {
                return this.age_checked*365[0];
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
                    var prestring=thisDrug.content[j].equation;
                    var match=prestring.match(/[\[].*?[\]]/g);
                    if(match)
                    {
                        for(var k=0; k<match.length;k++)
                        {
                            var equation=match[k].slice(1,match[k].length-1);
                            var split = equation.split('*');
                            var multipier=split[1]?split[1]:1;
                            var max=split[3]?split[3]:-1;
                            var bw_checked=this.bwForCalculation;
                            var result=bw_checked*multipier;
                            var isMax=false;
                            if(max>0&&result>max) {result=max; isMax=true;}

                            var digi = equation.split('*')[2]?equation.split('*')[2]:1;
                            result = parseFloat(Math.round(result/digi)*digi).toFixed(3)*1;
                            if(isMax) {
                                result = "<span class='maxDose'>"+result+"</span>";
                            }
                            prestring=prestring.replace(match[k],result);
                        }
                        thisDrug.content[j].calculated=prestring;
                    }
                }
            };
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
        OnAgeChange:function(){
            if(this.age && typeof this.age ==="string")
            {
                var matchValue = this.age.toString().match(/[1-9]\d*[dD]?/);
                this.age=matchValue||"";
            }
            if(this.realTimeRender) {this.onAgeValueChange();}
        },
        onAgeValueChange: function (){
            this.age_checked=this.age?this.age:0;
            this.isAgeInDay=this.checkLastChar(this.age_checked.toString(),"d");
            this.calculateDose();
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
             this.calculateDose();
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
                  this.searchText_checked = this.searchText;
             }
        },
        onSearchTextChange: function(){
            this.searchText_checked= this.searchText;
            window.scrollTo(0,0);
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
                        if(item.tag[i].toLowerCase()==this.searchText_checked.toLowerCase())
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
                this.onSearchTextChange()
            }
        },
        onContainerClick:function(s){
            if(this.isMenuOnTop&&this.isMenuShowed){
                this.isMenuShowed=false;
            }else
            {
                if(this.focused==s)
                {
                    this.focused="";
                }else{
                    this.focused=s;
                }
            }
        },
        clearButton:function(){
            this.onSearchClear();
            this.age="";
            this.bw="";
            this.onAgeValueChange();
            this.onBWValueChange();
            this.focused="";
        }
    }
});