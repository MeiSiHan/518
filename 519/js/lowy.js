$(function(){let canvas=document.getElementById("canvas")
let ctx=canvas.getContext("2d")
let Wi=$(window).width()
let Hi=$(window).height()
let count_xsd
let Xrule=$("#Xzhou").val()
let Yrule=$("#Yzhou").val()
$("#Xzhou").change(function(){Xrule=$("#Xzhou").val()})
$("#Yzhou").change(function(){Yrule=$("#Yzhou").val()})
let Ts=$("#Time_dul").val()*80
$("#Time_dul").change(function(){Ts=$("#Time_dul").val()*80})
canvas.width=Wi
canvas.height=Hi
let imgs=$("#Tupian").val()
$("#Tupian").change(function(){imgs=$("#Tupian").val()})
let points=[]
$("canvas").click(function(e){points=[]
let xo=e.clientX
let yo=e.clientY
let theimg=new Image()
theimg.src=imgs
theimg.onload=function(){ctx.drawImage(theimg,100,50)
pot(xo,yo)}
return false})
function pot(xo,yo){let imgdata=ctx.getImageData(0,0,Wi,Hi);for(let x=0;x<imgdata.width;x++){for(let y=0;y<imgdata.height;y++){i=(y*imgdata.width+x)*4
if(imgdata.data[i+3]>0){let pots=new newpot(x,y,xo,yo,Ts,imgdata.data[i],imgdata.data[i+1],imgdata.data[i+2],imgdata.data[i+3])
points.push(pots)}}}
count_xsd=points.length
console.log(count_xsd)
draw_img()}
function draw_img(){rid=window.requestAnimationFrame(draw_img);ctx.clearRect(0,0,Wi,Hi)
points.forEach(function(value,index){value.cul();value.draw()})}
class newpot{constructor(x,y,Xn,Yn,Ts,r,g,b,a){this.x=x,this.y=y,this.xd=0,this.yd=0,this.Ts=Ts,this.Ti=0,this.Xn=Xn,this.Yn=Yn,this.over=false,this.beginT=-parseInt(Math.random()*Ts)
this.rgba="rgba("+r+","+g+","+b+","+a+")"}
draw(){ctx.beginPath();ctx.fillStyle=this.rgba;ctx.fillRect(this.xd,this.yd,1,1);}
cul(){if(this.beginT<=0){this.beginT++;return false}
if(this.Ti>=this.Ts){if(!this.over){count_xsd--;this.over=true;if(count_xsd<=0){window.cancelAnimationFrame(rid)}}return false}
this.xd=ani[Xrule](1,this.Ti,this.Xn,this.x-this.Xn,this.Ts)
this.yd=ani[Yrule](1,this.Ti,this.Yn,this.y-this.Yn,this.Ts)
this.Ti++}}})