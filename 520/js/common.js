// window.setInterval(function(){
//     var refreshHours = new Date().getHours();
//     console.log(refreshHours)
// }, 1000);
var intime,setime;
function sesscode(key,val){
	sessionStorage.setItem(key, val)
}
function getsess(key,val){
	return sessionStorage.getItem(key)
}
function GetQueryString(name)
{
var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
var r = window.location.search.substr(1).match(reg);
if(r!=null)return unescape(r[2]);
return null;
}
function tipbox(text){
                    $("#newstip").fadeIn();
                    $("#newstext").text(text)
                    setTimeout(function(){
                        $("#newstip").fadeOut();
                        $("#newstext").text("")
                    },2000)

            }
function outlogin(){
	$.ajax({
             type: "post",
             url: "/gdszac/user/logout",
             dataType: "json",
             success: function(data){
                if (data.success ==true) {
                	sessionStorage.clear();
                	window.location.href="login"

                }else{
                }
             },
             error:function(res) {
             }
         });
}
//任务列表
function dowlistico(){
        var strname=getsess("826bad7c06337a70");
        $.ajax({
             type: "get",
             url: "/gdszac/export/list",
             data: {userName:strname},
             dataType: "json",
             success: function(data){
                if (data.success ==true&&data.rows.length>=1) {
                    $("#dowlist").show();
                    sesscode("isdow",1)
                }else{
                    sesscode("isdow",0)
                }
             },
             error:function(res) {
                
             }
         });
    }
//加载

function skinmodel(){
    var datatime=new Date();
    var nowtime=datatime.getHours();
    if (nowtime<=19&&nowtime>=7) {
        sesscode('skinmodel',"day")
    }else{
        sesscode('skinmodel',"back")
    } 
}
//下载任务列表
function dowlist(){
        var win = window.open("/gdszac/dowlist","filedow");
        if (win.location.href === "about:blank") {
            win = window.open("/gdszac/dowlist","filedow");
        } else {
            //window.location.replace()
            win.focus();
            //window.opener.location.reload()
        }
}
// settime();
// function settime(){
//     var date = new Date();//现在时刻
//     var time=date.getHours();
//     clearInterval(setime);
//     if (Math.abs(8-time)<=1||Math.abs(20-time<=1)) {
//         console.log("dd")
//         intime=setInterval('skinmodel()',60*1000)
//     }else{
//         console.log("ddd88")
//         setval();
//     }
// }
// function setval(){
//     console.log("ddd")
//     clearInterval(intime);
//     setime=setInterval('settime()',3600*1000)
// }
/*function userlogin(){
	var username=getsess("user"); 
	if (username=='aaa') {
		alert("aa")
	}else{
		window.location.href='/login.html'
	}
}
userlogin()*/
//清除cookie
function clearAllCookie() {
	var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
	if(keys) {
		for(var i = keys.length; i--;)
			document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
	}
}
//时间戳转日期
function timestampToTime(timestamp) {
                var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
                var Y = date.getFullYear() + '-';
                var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
                var D = date.getDate();
                var h = date.getHours();
                var m = date.getMinutes();
                var s = date.getSeconds();
                return Y+M+(D=D<10?("0"+D):D)+' '+(h=h<10?("0"+h):h)+':'+(m=m<10?("0"+m):m)+':'+(s=s<10?("0"+s):s);
            }
//前一天时间
function daytime(num,string){
    var date = new Date();
    date.setDate(date.getDate()-num);
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    var D = date.getDate();
    var m = date.getHours();
    var s = date.getMinutes();
    if (string=="str") {
        return Y+M+(D=D<10?("0"+D):D)+' '+(m=m<10?("0"+m):m)+':'+(s=s<10?("0"+s):s);
    }else if (string=="arr") {
        var nowarr=[];
        nowarr[0]=date.getFullYear();
        nowarr[1]=date.getMonth()+1;
        nowarr[2]=date.getDate();
        nowarr[3]=date.getHours();
        nowarr[4]=date.getMinutes();
    }else if(string=="ent"){
        return Y+M+(D=D<10?("0"+D):D)+' '+"23:59";
    }
    
}
function getUnixTime(dateStr){
    var newstr = dateStr.replace(/-/g,'/'); 
    var date =  new Date(newstr); 
    var time_str = date.getTime().toString();
    //return time_str.substr(0, 10);
    return time_str
}
//验证是否登录
function islogin(){
    var username=getsess("826bad7c06337a70");
    if (username==""||username==null||username==undefined) {
        window.location.href='login'
    }
}
function isload(){
    var number=getsess("a7dd12b1dab17d");
    if (number==0) {
        window.location.href='login'
    }
}
//皮肤跟换
function skinswitch() {
    var filename=$("#skinindex").attr('filename');
    if ($("#switchico").hasClass('switchopen')) {
        $("#switchico").attr("class","switchshut")
        $("#skintext").text("夜间模式")
        sesscode('skinmodel', "back")
        $("#skinindex").attr("href", "resources/css/"+filename+"back.css")
    } else {
        $("#switchico").attr("class","switchopen")
        $("#skintext").text("白天模式")
        sesscode('skinmodel', "day")
        $("#skinindex").attr("href", "resources/css/"+filename+"day.css")
    }
}
//皮肤加载
function loadskin() {
    var filename=$("#skinindex").attr('filename');
    var model=getsess("skinmodel");
    if (model=="back") {
        $("#skinindex").attr("href", "resources/css/"+filename+"back.css")
    }else{
        $("#skinindex").attr("href", "resources/css/"+filename+"day.css")
    }
}
function menushow() {
    var number=getsess("a7dd12b1dab17d");
    var isdowlist=getsess("isdow")
    if (number==1) {
        $("#navlist #power").show();
        $("#navlist #powername").show();
    }
    if (isdowlist==1) {
        $("#dowlist").show();
    }else{
        $("#dowlist").hide();
    }
}
//数字保留位数
function transformfreq(st){
    var num=parseInt(st*10000)/10000/1000000;
    return num.toFixed(4)
}
// 度分秒转换
function tolonglat(a) {
        var degree = parseInt(a);
        var min = parseInt((a - degree) * 60);
        var sec = parseInt((a - degree) * 3600 - min * 60);
        return degree + '°' + min + '′' + sec + '″';
    }
// $(window).resize(function () {          //当浏览器大小变化时
//     window.location.reload(); 
// });
// window.onresize = function() {
//     // 浏览器窗口变化后需要做的事情
//     // 
//     // 
//     window.location.reload();
// }
// setuptime();
// function setuptime(){
//     console.log("set")
//     clearInterval(setime);
//         intime=setInterval('seticon(0)',30*1000)
// }
// function setval(){
//     console.log("ddd")
//     clearInterval(intime);
//     setime=setInterval('setuptime()',30*1000)
// }