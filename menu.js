/* Лаймо: меню (таб-бар) iOS 27 с жидким стеклом. Подключается в конце страницы: <div class="dock" id="dock"></div><script src="menu.js?v=N"></script>.
   Связь со страницей: страница задаёт window.ITBH={sel:function(i){},ready:function(){}}, меню даёт window.ITB.set(i).
   Стекло видит содержимое #app (снимок страницы), всё остальное на странице (фиксированные слои) в нём не участвует. */
(function(){var d=document.getElementById('dock');if(!d||document.getElementById('itb-css'))return;var s=document.createElement('style');s.id='itb-css';s.textContent="#dock{color:#fff;font:14px/1.45 -apple-system,BlinkMacSystemFont,\"SF Pro Text\",\"Helvetica Neue\",system-ui,Roboto,\"Segoe UI\",Arial,sans-serif;letter-spacing:normal;-webkit-font-smoothing:antialiased;text-align:left}\n#dock .stage{position:relative;height:100%;box-sizing:border-box;padding-bottom:3px;display:flex;align-items:flex-end;justify-content:center;overflow:hidden}\n#dock .tbar{position:relative;width:360px;height:62px;flex:none;touch-action:none;-webkit-user-select:none;user-select:none;-webkit-tap-highlight-color:transparent;transform-origin:50% 50%;will-change:transform}\n#dock .glass,#dock .fl,#dock .edge{position:absolute;left:0;top:0;width:100%;height:100%}\n#dock .glass{background:#1c1c1c}\n#dock .fl{background:rgba(255,255,255,.075);opacity:0;will-change:opacity}\n#dock .edge{overflow:visible;pointer-events:none}\n#dock .gl{position:absolute;pointer-events:none}\n#dock .lensedge{opacity:0}\n#dock .tabs{position:absolute;left:0;top:0;width:100%;height:100%}\n#dock .tab{position:absolute;top:0;width:85.67px;height:62px;margin:0;padding:0;border:0;background:none;color:transparent;font:inherit;cursor:pointer;outline:0;-webkit-appearance:none;appearance:none}\n#dock .tab svg{position:absolute;overflow:visible}\n#dock .tab .lb{position:absolute;left:-10px;right:-10px;top:39.3px;text-align:center;font-size:10px;line-height:12px;font-weight:500;white-space:nowrap;letter-spacing:.01em}\n#dock .tbar.basic .tab{color:#fff}\n#dock .tbar.basic .tab.on{color:#b6d70a}\n#dock .tbar.basic .tab.on::before{content:\"\";position:absolute;left:-4.67px;right:-4.67px;top:4px;bottom:4px;border-radius:27px;background:#070707}\n#dock .tab:focus-visible{outline:2px solid rgba(255,255,255,.6);outline-offset:-6px;border-radius:30px}";document.head.appendChild(s);d.innerHTML="<div class=\"stage\" id=\"itb-stage\"><div class=\"tbar\" id=\"itb-bar\"><div class=\"glass\" id=\"itb-glass\"></div><svg class=\"edge\" id=\"itb-edge\" aria-hidden=\"true\"></svg><div class=\"fl\" id=\"itb-fl\"></div><canvas class=\"gl\" id=\"itb-base\" aria-hidden=\"true\"></canvas><canvas class=\"gl lensedge\" id=\"itb-lensedge\" aria-hidden=\"true\"></canvas><div class=\"tabs\" id=\"itb-tabs\" role=\"tablist\"></div></div></div>"})();
(function(){
'use strict';
var ICONS={"home":{"w":86,"h":81,"d":"M67 77.5l-3 .3-11 0-2-.3-1-.7-.4-.8-.1-2-.1-15-.1-2-.6-1-.9-1-.8-.5-1-.1-8 0-2 .4-.9 1.2-.4 1-.2 2-.1 15-.3 2-1.1 1.4-1 .3-12 .1-3-.3-1-.3-2-1-2-2.2-.5-1-.5-2-.2-2 0-18-.3-3-.5-.6-4-1.1-2-1.6-.5-.7-.9-2-.2-2 .3-2 1-2 .9-1 23.4-22.3 3-2.6 5.3-5.1 1.7-1.3 2-.9 3-.1 2 .6 2 1.2 28 26.5 3 3.1 1 .7 1.7 2.2 .5 1 .3 2-.2 2-.9 2-1.4 1.5-1 .7-4 1.1-.6 .7-.2 1 0 20-.2 1.8-.7 2.2-1.3 1.9-2 1.7zM66 73.1l1.5-1.1 .9-2 .2-24 .3-2 1.1-1 1-.3 4-.2 1-.4 .6-1.1 .1-1-.2-1-1.8-2-29.7-28.1-2-1.5-1-.2-1 .2-1 .5-28.6 27.1-3.4 3.3-.5 .7-.3 1 .1 1 .7 1.2 2 .5 3 0 1 .5 .9 .8 .5 1 .1 23 .2 3 .6 1 1.7 1.2 4 .2 7-.1 .2-.3 .2-1 .2-15 .2-1 .9-2 1.3-1.7 2-1.5 1-.3 5-.6 5 .1 2 .1 2 .4 2 1.1 1.5 1.4 1 2 .7 4 .1 11 .1 2 .3 1 1.3 .4 8 0z"},"bars":{"w":92,"h":78,"d":"M54 74.3l-3 .2-12 0-2-.1-2.1-1.4-1.1-2-.3-3 .1-61 .1-1 .9-2 1.4-1.2 2-.3 16 0 1 .3 1.3 1.2 .7 1 .3 1 0 64-.3 1.5-1 1.5zM51 69.6l1-.3 .3-.3 .1-1 0-60-.4-.6-1-.5-11 0-1 .5-.4 .6 0 61 .4 .3 1 .3zM85 74.2l-2 .3-15-.1-1-.3-1.5-1.1-.8-1-.3-1-.2-3 0-41 .2-1 .4-1 .9-1 2.3-1.4 3-.1 11 0 2 .1 2.4 1.4 .8 1 .7 2 .1 2 0 40-.3 2-.4 1-.7 1zM82 69.5l.9-.5 .1-1 0-39-.2-1-.8-.4-12 0-.7 .4-.1 1 .1 40 .7 .6zM24 74.1l-1 .3-16 .1-1-.3-1-.7-1.4-1.5-.3-1-.2-2 0-22 .6-2 .8-1 1.5-1.1 1-.3 2-.2 13 .1 1 .1 1 .4 1.4 1 .8 1 .4 1 .2 2 0 22-.6 2-.7 1zM21 69.5l.7-.5 .2-1 0-19-.2-1-.7-.4-1-.1-11 0-.8 .5-.1 1 .1 20 .8 .6z"},"wallet":{"w":84,"h":79,"d":"M73.4 71l-1.7 2-1.7 1.2-2.3 .8-1.7 .3-54 0-4-1-1-.7-1.8-1.6-1.3-2-.9-2.4-.2-1.6 0-38 .2-1 .8-2 1.1-2 1.1-1.2 1.1-.8 2.9-1.3 8-.4 17-14.6 2-1.2 1-.2 2-.2 2 .4 1 .4 2 1.7 4 4.6 1 .7 1-.1 6-1.9 1-.1 1.7 .2 2.3 1 1.1 1 1.3 2 2.1 6 4.2 2 1.3 1 1.5 2 .8 2 .2 1 .1 7 1.1 1 2 1 1.1 1 .8 1 .6 2 .1 13-.1 2-.8 2-.9 1-1.5 1.2-2 .8-.4 1-.1 7zM27.2 18l.8 .7 2-.4 11-3.9 3.4-1.4-.3-1-2.6-3-1.5-.9-1 0-1.5 .9zM61 19l-.4-2-.8-2-.8-1-1-.3-12 4.1-2.5 1.2 2.5 .4 14 0zM68.8 69l.6-1 .3-2 0-5-.7-1-1-.1-13-.1-3-.4-2-1.4-.8-1-.9-2-.3-2 0-12 .9-3 .8-1 1.3-1.2 2-.9 1-.2 15-.2 .6-.5 .1-6-.2-1-.5-.9-1.1-1.1-.9-.4-5-.2-50 .1-1 .1-1 .3-1.2 1.1-.5 1-.3 2 0 37 .4 2 .6 1 2 1.3 1 .1 52 0 3-.2zM75.4 54l.2-1 0-11-.1-1-.8-1-.7-.3-19-.1-1 .2-1 1.2-.1 12 .2 1 .9 .7 2 .3 17 0 1-.1zM61 50l-1-.3-1-.7-.5-1 0-1 .5-1.2 1-.9 1-.2 1 .1 1.4 1.2 .3 1-.1 1-.4 1-1.2 .8z"},"chat":{"w":79,"h":78,"d":"M12 74l-1-.6-.3-.4-.3-1 .1-4 .5-6-.1-1-.4-1-3.8-6-2.1-5-1-4-.4-6 .3-6 1.1-5 1-3 1.3-3 1.7-3 2.1-3 2.7-3 2.6-2.3 6-4 4-1.9 3-1.1 5-1.1 9-.1 2 .3 4 .9 3 1.1 4 1.8 2 1.2 4 2.9 4.4 4.3 2.9 4 1.7 3 1.4 3 1 3 1 4 .4 6-.5 7-1 4-1.1 3-1.9 4-2 3-4.3 5-4 3.4-3 1.9-4 2-6 2-6 .8-4 .1-6-.9-7-2.2-3 .6-5 1.6-3 .8zM16 68.2l5-1.5 3-.7 2 .5 2 .9 3 1 5 .9 6 0 5-.9 3-1 3-1.3 3-1.7 4-3.1 2.3-2.3 3-4 1.7-3.1 1.3-2.9 .9-3 .9-5 .1-3-.1-2-.7-5-1.3-4-.8-2-1.1-2-1.9-3-3.3-3.8-4-3.5-5-2.8-3-1.3-3-.8-5-.6-2-.1-7 .6-3 .9-3 1.2-2 1-3 2-4 3.5-3.3 3.7-2 3-1 2-.9 2-1 3-.9 5-.1 4 .8 6 1.1 4 1.3 2.9 1.7 3.1 2.8 4 .2 1-.3 7 .3 1zM27 42.4l-2 .5-1-.1-2-.6-1.2-1.2-.8-2-.1-1 .6-2 .5-.7 2-1.5 2-.3 1 .2 2.1 1.3 1.2 2 .1 2-.4 1-.5 1zM41 42.5l-2 .4-2-.4-1-.7-1.4-1.8-.2-2 .4-2 1.2-1.4 1-.7 1-.3 2 0 1 .3 1 .7 1.2 1.4 .4 2-.2 2-1.4 1.8zM56 42.2l-2 .6-2-.1-1-.4-1-.8-1-1.6-.3-.9 .1-2 1.2-2 2-1.3 2-.2 1 .2 1.8 1.3 .7 1 .6 2-.1 1-.7 2z"}};
var LABELS=['Главная','Тариф','Расходы','Поддержка'];
var SPEC={"rim":[[0,0.26],[0.004,0.202],[0.01,0.234],[0.022,0.192],[0.03,0.131],[0.04,0.124],[0.05,0.139],[0.08,0.109],[0.2,0.081],[0.25,0.04],[0.3,0.04],[0.4,0.002],[0.6,0.003],[0.85,0.068],[0.94,0.124],[0.97,0.125],[0.978,0.184],[0.996,0.19],[1,0.25]],"dark":[[0,0.0],[0.08,0.0],[0.1,0.171],[0.125,0.171],[0.15,0.283],[0.2,0.317],[0.25,0.267],[0.3,0.475],[0.4,0.536],[0.5,0.669],[0.7,0.472],[0.75,0.355],[0.8,0.32],[0.85,0.24],[0.875,0.214],[0.9,0.237],[0.92,0.067],[0.94,0.0],[0.95,0.109],[0.97,0.0],[0.996,0.0],[1,0.141]]};
var BW=360,BH=62.0,CX0=51.5,PITCH=257/3;
var PW=95,PH=54,LW=123.6,HMAX=60,LH=60,LHT=59;
var $=function(i){return document.getElementById('itb-'+i)};
var PHI=52.4*Math.PI/180,ARAT=1.889;
var IOS=/iP(hone|od|ad)/.test(navigator.userAgent)||(/Macintosh/.test(navigator.userAgent)&&'ontouchend' in document);
function pxr(){var r=window.devicePixelRatio||1;if(IOS)r=3;else if(r<2&&(navigator.maxTouchPoints>0||'ontouchstart' in window))r=3;return Math.min(3,Math.max(2,r))}
function r2(n){return Math.round(n*100)/100}
function path(W,H,ox,oy){
 var R=H/2,c=Math.cos(PHI),s=Math.sin(PHI),qx=R*(1-c),qy=R*(1-s),b1=qx+qy*s/c,b2=b1+1.5*Math.pow(qy/c,2)/(R*c),a=Math.max(Math.min(ARAT*R,W/2),b2),k=Math.min(1,W/(2*a));
 function p(x,y){return r2(x+ox)+' '+r2(y+oy)}function X(x){return x*k}function Z(x){return W-x*k}
 var A='A'+r2(R*k)+' '+r2(R)+' 0 0 1 ';
 return 'M'+p(0,R)+A+p(X(qx),qy)+'C'+p(X(b1),0)+' '+p(X(b2),0)+' '+p(X(a),0)+'L'+p(Z(a),0)+'C'+p(Z(b2),0)+' '+p(Z(b1),0)+' '+p(Z(qx),qy)+A+p(W,R)+A+p(Z(qx),H-qy)+'C'+p(Z(b1),H)+' '+p(Z(b2),H)+' '+p(Z(a),H)+'L'+p(X(a),H)+'C'+p(X(b2),H)+' '+p(X(b1),H)+' '+p(X(qx),H-qy)+A+p(0,R)+'Z';
}
var sel=0,tabsEl=$('tabs'),FONT='-apple-system,BlinkMacSystemFont,"SF Pro Text","Helvetica Neue",system-ui,Roboto,"Segoe UI",Arial,sans-serif';
var KEYS=['home','bars','wallet','chat'],POS={home:[37.29,10.76,28.67,27],bars:[121.76,11.09,30.67,26],wallet:[208.55,11.42,28,26.33],chat:[295.35,11.09,26.33,26]};
(function(){var h='';for(var i=0;i<4;i++){var ic=ICONS[KEYS[i]],q=POS[KEYS[i]],tl=CX0+PITCH*i-PITCH/2;
 h+='<button type="button" class="tab" role="tab" aria-label="'+LABELS[i]+'" data-i="'+i+'" style="left:'+r2(tl)+'px"><svg viewBox="0 0 '+ic.w+' '+ic.h+'" width="'+q[2]+'" height="'+q[3]+'" style="left:'+r2(q[0]-tl)+'px;top:'+q[1]+'px"><path fill="currentColor" fill-rule="evenodd" d="'+ic.d+'"/></svg><span class="lb">'+LABELS[i]+'</span></button>'}
 tabsEl.innerHTML=h})();
var tabBtns=tabsEl.children;
var BASIC=0,GLS=null;function basic(){if(BASIC)return;BASIC=1;try{if(GLS)GLS.off()}catch(_){}var b=$('bar');if(raf)cancelAnimationFrame(raf);raf=0;b.classList.add('basic');b.style.opacity='';resize();$('base').style.display=$('lensedge').style.display='none';
 b.addEventListener('click',function(e){var t=e.target;while(t&&t!==b&&!(t.getAttribute&&t.getAttribute('data-i')))t=t.parentNode;if(t&&t!==b)setSel(+t.getAttribute('data-i'))})}
function setSel(i){if(i!==sel&&!reduce&&typeof clock==='number'&&texW){if(icA)redrawIcon(icA.i,null);icA={i:i,t0:clock}}sel=i;for(var k=0;k<4;k++){tabBtns[k].classList.toggle('on',k===i);tabBtns[k].setAttribute('aria-selected',k===i)}try{if(window.ITBH&&ITBH.sel)ITBH.sel(i)}catch(_){}}
function stops(a,col){var h='';for(var i=0;i<a.length;i++)h+='<stop offset="'+a[i][0]+'" stop-color="'+col+'" stop-opacity="'+a[i][1]+'"/>';return h}
function edgeSVG(svg,W,H,spec,uid){
 var h='<defs>';for(var k in spec.g)h+='<linearGradient id="'+uid+k+'" x1="0" y1="0" x2="0" y2="1">'+stops(spec.g[k][0],spec.g[k][1])+'</linearGradient>';
 h+='</defs>';
 for(var i=0;i<spec.l.length;i++){var l=spec.l[i];h+='<path fill="none" stroke="url(#'+uid+l.g+')" stroke-width="'+l.w+'" opacity="'+l.o+'" d="'+path(W-l.in*2,H-l.in*2,l.in,l.in)+'"/>'}
 svg.setAttribute('viewBox','0 0 '+W+' '+H);svg.innerHTML=h;
}
var BAR_EDGE={g:{d:[SPEC.dark,'#000'],r:[SPEC.rim,'#fff']},
 l:[{g:'d',w:.667,o:1,in:-.417},{g:'r',w:.417,o:.55,in:.208},{g:'r',w:.75,o:.357,in:.375},{g:'r',w:1.167,o:.42,in:.583}]};

/* bar look measured from the iOS 27 Fitness and Watch tab bars over black (simulator, 3x): fill 28 with a faint lighter area low in the middle,
   then one vector stroke per device pixel row from the edge (rim + inner light), each with its colour at the top centre and its opacity
   by the angle of the edge (gradient by height), so it fades toward the sides like iOS; a 1/3 pt ring in the fill colour gives the smooth outer
   edge and hides the clip; the outline is split into short curves (bpath) because Safari flattens long gentle curves by up to 0.25 px */
var BPHI=56*Math.PI/180,BARAT=2.1;/* bar corner: same curve family as path(), fitted to the iOS bar outline */
var FILLV=28,BLOBV=29,ANG=[0,7.5,15,22.5,30,37.5,45,52.5,60,67.5,75,82.5,90],
 ROWS=[[88,[0,0,0.019,0.049,0.092,0.217,0.193,0.357,0.429,0.483,0.55,0.945,1]],
 [70,[0,0,0.053,0.177,0.245,0.294,0.453,0.486,0.62,0.662,0.812,0.962,1]],
 [57,[0,0,0.045,0.101,0.161,0.198,0.276,0.35,0.478,0.575,0.542,0.571,1]],
 [38,[0,0,0,0,0,0,0.001,0.045,0.125,0.285,0.574,0.981,1]],
 [38,[0,0,0,0,0,0,0.056,0.212,0.348,0.389,0.623,0.896,1]],
 [36,[0,0,0,0,0,0,0.024,0.182,0.308,0.526,0.608,1,1]],
 [34,[0,0,0,0,0,0,0.145,0.305,0.391,0.64,0.835,1,1]],
 [34,[0,0,0,0,0,0,0.08,0.124,0.404,0.519,0.566,0.983,1]],
 [33,[0,0,0,0,0,0,0.107,0.187,0.443,0.506,0.65,0.944,1]],
 [32,[0,0,0,0,0,0,0.144,0.164,0.62,0.445,0.98,0.923,1]],
 [31,[0,0,0,0,0,0,0.087,0.45,0.532,0.755,0.799,1,1]],
 [31,[0,0,0,0,0,0,0.053,0.412,0.366,0.861,0.781,1,1]],
 [30,[0,0,0,0,0,0,0.052,0.881,0.27,1,1,1,1]],
 [30,[0,0,0,0,0,0,0,0.46,0.449,0.6,0.836,1,1]],
 [30,[0,0,0,0,0,0,0.005,0.778,0.638,0.411,0.662,1,1]],
 [29,[0,0,0,0,0,0,0.024,0.776,1,1,1,1,1]],
 [29,[0,0,0,0,0,0,0.005,0.502,1,1,1,1,1]],
 [29,[0,0,0,0,0,0,0.005,0.009,1,1,1,1,1]],
 [29,[0,0,0,0,0,0,0.12,0.044,0,1,1,1,1]],
 [29,[0,0,0,0,0,0,0.12,0.044,0.07,0.001,0.785,1,1]]];
function thY(W,H,th){var R=H/2,c=Math.cos(BPHI),s=Math.sin(BPHI),qx=R*(1-c),qy=R*(1-s),b1=qx+qy*s/c,b2=b1+1.5*Math.pow(qy/c,2)/(R*c),a=Math.max(Math.min(BARAT*R,W/2),b2),k=Math.min(1,W/(2*a)),t0=0,t1=1,t=0,u,i;
 th=th*Math.PI/180;if(th<=BPHI)return R*(1-Math.sin(th));
 for(i=0;i<30;i++){t=(t0+t1)/2;u=1-t;if(Math.atan2(k*(3*u*u*(b1-qx)+6*u*t*(b2-b1)+3*t*t*(a-b2)),3*u*u*qy)<th)t0=t;else t1=t}
 return qy*Math.pow(1-t,3)}
function bpath(W,H,ox,oy){var R=H/2,c=Math.cos(BPHI),s=Math.sin(BPHI),qx=R*(1-c),qy=R*(1-s),b1=qx+qy*s/c,b2=b1+1.5*Math.pow(qy/c,2)/(R*c),a=Math.max(Math.min(BARAT*R,W/2),b2),k=Math.min(1,W/(2*a)),S=[],n=Math.ceil(BPHI/(Math.PI/32)),m=12,i,t0,t1,h,P=[[qx,qy],[b1,0],[b2,0],[a,0]];
 function B(t){var u=1-t;return [u*u*u*P[0][0]+3*u*u*t*P[1][0]+3*u*t*t*P[2][0]+t*t*t*P[3][0],u*u*u*P[0][1]+3*u*u*t*P[1][1]+3*u*t*t*P[2][1]+t*t*t*P[3][1]]}
 function D(t){var u=1-t;return [3*u*u*(P[1][0]-P[0][0])+6*u*t*(P[2][0]-P[1][0])+3*t*t*(P[3][0]-P[2][0]),3*u*u*(P[1][1]-P[0][1])+6*u*t*(P[2][1]-P[1][1])+3*t*t*(P[3][1]-P[2][1])]}
 for(i=0;i<n;i++){t0=BPHI*i/n;t1=BPHI*(i+1)/n;h=4/3*Math.tan((t1-t0)/4)*R;
  S.push([R-R*Math.cos(t0),R-R*Math.sin(t0),R-R*Math.cos(t0)+h*Math.sin(t0),R-R*Math.sin(t0)-h*Math.cos(t0),R-R*Math.cos(t1)-h*Math.sin(t1),R-R*Math.sin(t1)+h*Math.cos(t1),R-R*Math.cos(t1),R-R*Math.sin(t1)])}
 for(i=0;i<m;i++){t0=i/m;t1=(i+1)/m;var p0=B(t0),p3=B(t1),d0=D(t0),d3=D(t1),f=(t1-t0)/3;S.push([p0[0],p0[1],p0[0]+f*d0[0],p0[1]+f*d0[1],p3[0]-f*d3[0],p3[1]-f*d3[1],p3[0],p3[1]])}
 function q(x,y,fx,fy){return r3((fx?W-x*k:x*k)+ox)+' '+r3((fy?H-y:y)+oy)}
 function seg(g,fx,fy,rev){return rev?'C'+q(g[4],g[5],fx,fy)+' '+q(g[2],g[3],fx,fy)+' '+q(g[0],g[1],fx,fy):'C'+q(g[2],g[3],fx,fy)+' '+q(g[4],g[5],fx,fy)+' '+q(g[6],g[7],fx,fy)}
 var o='M'+q(0,R,0,0);for(i=0;i<S.length;i++)o+=seg(S[i],0,0,0);o+='L'+q(a,0,1,0);
 for(i=S.length-1;i>=0;i--)o+=seg(S[i],1,0,1);for(i=0;i<S.length;i++)o+=seg(S[i],1,1,0);o+='L'+q(a,0,0,1);
 for(i=S.length-1;i>=0;i--)o+=seg(S[i],0,1,1);return o+'Z'}
function r3(n){return Math.round(n*1000)/1000}
function blob(){var x0=14.67,y0=22.33,y1=56.67,rx=22.33,ry=15,ry2=15.33,x1=BW-x0;
 return 'M'+r2(x0+rx)+' '+y0+'L'+r2(x1-rx)+' '+y0+'A'+rx+' '+ry+' 0 0 1 '+r2(x1)+' '+r2(y0+ry)+'L'+r2(x1)+' '+r2(y1-ry2)+'A'+rx+' '+ry2+' 0 0 1 '+r2(x1-rx)+' '+y1+'L'+r2(x0+rx)+' '+y1+'A'+rx+' '+ry2+' 0 0 1 '+x0+' '+r2(y1-ry2)+'L'+x0+' '+r2(y0+ry)+'A'+rx+' '+ry+' 0 0 1 '+r2(x0+rx)+' '+y0+'Z'}
function paintBar(gm){var c=function(v){return 'rgb('+v+','+v+','+v+')'},ed=$('edge'),h='<defs>',b='',n=ANG.length,i,j,q,d,W,H,s,w=(1/3).toFixed(4);
 $('glass').style.background=gm?'transparent':c(FILLV);ed.style.mixBlendMode=gm?'plus-lighter':'';
 /* glass mode: the canvas under it draws fill, soft spot and smooth edge; strokes are added on top (colour minus fill), which over black gives exactly the normal look */
 if(!gm)b+='<path fill="'+c(BLOBV)+'" d="'+blob()+'"/><path fill="'+c(FILLV)+'" fill-rule="evenodd" d="'+bpath(BW,BH,0,0)+bpath(BW-2/3,BH-2/3,1/3,1/3)+'"/>';
 for(i=ROWS.length-1;i>=0;i--){d=(i+.5)/3;W=BW-2*d;H=BH-2*d;q=ROWS[i];s='';
  for(j=n-1;j>=0;j--)s+='<stop offset="'+(thY(W,H,ANG[j])/H).toFixed(4)+'" stop-color="'+c(gm?q[0]-FILLV:q[0])+'" stop-opacity="'+q[1][j]+'"/>';
  for(j=0;j<n;j++)s+='<stop offset="'+(1-thY(W,H,ANG[j])/H).toFixed(4)+'" stop-color="'+c(gm?q[0]-FILLV:q[0])+'" stop-opacity="'+q[1][j]+'"/>';
  h+='<linearGradient id="rw'+i+'" x1="0" y1="0" x2="0" y2="1">'+s+'</linearGradient>';
  b+='<path fill="none" stroke="url(#rw'+i+')" stroke-width="'+w+'" d="'+bpath(W,H,d,d)+'"/>'}
 ed.setAttribute('viewBox','0 0 '+BW+' '+BH);ed.innerHTML=h+'</defs>'+b}
try{paintBar(0)}catch(_){}
function glassClip(){var g=$('glass').style,cp="path('"+bpath(BW-1/3,BH-1/3,1/6,1/6)+"')",ok=window.CSS&&CSS.supports&&(CSS.supports('clip-path',cp)||CSS.supports('-webkit-clip-path',cp));if(ok){g.clipPath=cp;g.webkitClipPath=cp}else{var m='url("data:image/svg+xml,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+BW+' '+BH+'" preserveAspectRatio="none"><path d="'+bpath(BW-1/3,BH-1/3,1/6,1/6)+'"/></svg>')+'")';
 g.webkitMaskImage=g.maskImage=m;g.webkitMaskSize=g.maskSize='100% 100%';g.webkitMaskRepeat=g.maskRepeat='no-repeat';if(!g.webkitMaskImage&&!g.maskImage){g.borderRadius=BH/2+'px';g.overflow='hidden'}}}
glassClip();
/* the press flash lies above the rim strokes (they are opaque at the top), so the whole bar lightens evenly; masked by the bar outline with a smooth edge */
(function(){var f=$('fl').style,m='url("data:image/svg+xml,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+BW+' '+BH+'" preserveAspectRatio="none"><path d="'+bpath(BW,BH,0,0)+'"/></svg>')+'")';
 f.webkitMaskImage=f.maskImage=m;f.webkitMaskSize=f.maskSize='100% 100%';f.webkitMaskRepeat=f.maskRepeat='no-repeat';if(!f.webkitMaskImage&&!f.maskImage)f.borderRadius=BH/2+'px'})();
var FX=7;
var PADX=30,PADY=14,CW=BW+2*PADX,CH=BH+2*PADY,baseC=$('base'),bctx=baseC.getContext('2d');

function vz(){var v=window.visualViewport;return v&&v.scale>1?Math.min(2,v.scale):1}
var DPR=Math.min(4,pxr()*vz()),TS=Math.max(2,DPR),texW=null,texO=null,texOS=null;
function bb(d){var xs=[],ys=[];d.split(/(?=M)/).forEach(function(s){var n=s.match(/-?\d*\.?\d+/g).map(Number),x=n[0],y=n[1];xs.push(x);ys.push(y);for(var j=2;j<n.length;j+=2){x+=n[j];y+=n[j+1];xs.push(x);ys.push(y)}});return [xs,ys]}
var ICG={};window.Path2D&&(function(){function sub(d){return d.split(/(?=M)/).filter(Boolean)}
 for(var k in ICONS){var s=sub(ICONS[k].d),G;
  if(k==='bars')G=[[4,5],[0,1],[2,3]];else if(k==='chat')G=[[0,1],[2],[3],[4]];else G=[s.map(function(_,i){return i})];
  ICG[k]=G.map(function(g){var d=g.map(function(i){return s[i]}).join(''),B=bb(d),xs=B[0],ys=B[1];
   return {p:new Path2D(d),x0:Math.min.apply(0,xs),x1:Math.max.apply(0,xs),y0:Math.min.apply(0,ys),y1:Math.max.apply(0,ys)}})}})();
function spr(t,per,tau){return t<0?0:Math.sin(2*Math.PI*t/per)*Math.exp(-t/tau)}
function ramp(t,a){return t<=0?0:t>=a?1:(t/a)*(t/a)*(3-2*t/a)}
var ICDUR={home:1.1,bars:.95,wallet:1.2,chat:1.25};
function icXf(k,gi,g,t,ic){var ax=(g.x0+g.x1)/2,ay=g.y1,sx=1,sy=1,r=0,dx=0,dy=0;
 if(k==='home'){var e=ramp(t,.04),q=-spr(t+.0,.34,.24)*e;sy=1+.42*q;sx=1-.26*q;dy=-ic.h*.26*Math.max(0,-q);r=.1*spr(t-.08,.3,.22)}
 else if(k==='bars'){var tt=t-.07*gi,e2=ramp(tt,.05),q2=-Math.cos(2*Math.PI*Math.max(0,tt)/.36)*Math.exp(-Math.max(0,tt)/.13);sy=1+(q2*.8)*e2;if(tt<0)sy=1}
 else if(k==='wallet'){ay=(g.y0+g.y1)/2;r=.22*spr(t,.32,.28);var q3=spr(t,.26,.22);sx=1+.24*q3;sy=1-.2*q3;dy=-ic.h*.16*Math.max(0,spr(t,.4,.18))}
 else if(k==='chat'){if(gi===0){ay=(g.y0+g.y1)/2;var q4=spr(t,.34,.27),q6=spr(t-.05,.3,.24);sx=1+.26*q4;sy=1+.12*q4-.14*q6;r=-.12*spr(t,.38,.25)}
  else{ax=(g.x0+g.x1)/2;ay=(g.y0+g.y1)/2;var t5=t-.12-.11*(gi-1),b=t5>0&&t5<.24?Math.sin(Math.PI*t5/.24):0;sx=sy=1+1.1*b;dy=-ic.h*.16*b}}
 return [sx,sy,r,dx,dy,ax,ay]}
function drawIcon(x,i,t){var k=KEYS[i],ic=ICONS[k],q=POS[k];x.save();x.translate(PADX+q[0],PADY+q[1]);x.scale(q[2]/ic.w,q[3]/ic.h);
 var G=ICG[k];for(var gi=0;gi<G.length;gi++){var g=G[gi];
  if(t==null||t>=ICDUR[k]){x.fill(g.p,'evenodd');continue}
  var m=icXf(k,gi,g,t,ic);x.save();x.translate(m[5]+m[3],m[6]+m[4]);x.rotate(m[2]);x.scale(m[0],m[1]);x.translate(-m[5],-m[6]);x.fill(g.p,'evenodd');x.restore()}
 x.restore()}
var icA=null,ICSLOW=1.9;
function icRect(i){var q=POS[KEYS[i]];return [PADX+q[0]-9,PADY+q[1]-9,q[2]+18,q[3]+9+3.4]}
function redrawIcon(i,t){if(!texW)return;var R=icRect(i);
 (Q?[[texW,'#ffffff'],[texO,'#b6d70a']]:[[texW,'#ffffff'],[texO,'#b6d70a'],[texOS,'#b6d70a']]).forEach(function(p){var c=p[0],x=c.getContext('2d');x.setTransform(c.width/CW,0,0,c.height/CH,0,0);x.clearRect(R[0],R[1],R[2],R[3]);
  x.save();x.beginPath();x.rect(R[0],R[1],R[2],R[3]);x.clip();x.fillStyle=p[1];drawIcon(x,i,t);x.restore()});
 if(texOD&&!Q){var s=texO.width/CW,X0=Math.max(0,Math.floor(R[0]*s)),Y0=Math.max(0,Math.floor(R[1]*s)),X1=Math.min(texO.width,Math.ceil((R[0]+R[2])*s)),Y1=Math.min(texO.height,Math.ceil((R[1]+R[3])*s));
  var part=texOS.getContext('2d').getImageData(X0,Y0,X1-X0,Y1-Y0).data,W=texOD.width,rw=(X1-X0)*4;
  for(var y=Y0;y<Y1;y++)texOD.data.set(part.subarray((y-Y0)*rw,(y-Y0+1)*rw),(y*W+X0)*4)}}
function stepIcon(){if(!icA)return false;var tt=(clock-icA.t0)/ICSLOW,k=KEYS[icA.i];if(tt>=ICDUR[k]){redrawIcon(icA.i,null);icA=null;return false}redrawIcon(icA.i,tt);return true}
function drawContent(x,color,weight){x.fillStyle=color;
 for(var i=0;i<4;i++){var ic=ICONS[KEYS[i]],q=POS[KEYS[i]],cxp=PADX+CX0+PITCH*i;
  drawIcon(x,i,null);
  x.font=weight+' 10px '+FONT;x.textAlign='center';x.textBaseline='alphabetic';x.fillText(LABELS[i],cxp,PADY+48.8)}}
function content(sc,color,weight,rf){var c=document.createElement('canvas');c.width=Math.round(CW*sc);c.height=Math.round(CH*sc);var x=c.getContext('2d',rf?{willReadFrequently:true}:undefined);x.setTransform(c.width/CW,0,0,c.height/CH,0,0);drawContent(x,color,weight);return c}
function buildTex(){texW=content(TS,'#ffffff',500);texO=content(TS,'#b6d70a',600);texOS=content(TS,'#b6d70a',600,1);texOD=texOS.getContext('2d').getImageData(0,0,texOS.width,texOS.height)}
var REFR={mag:1.096,band:.70,edge:.33,peek:12,rim:4,tb:.366,k:.8}      ,texOD=null,lensC=document.createElement('canvas'),lensX=lensC.getContext('2d'),lensID=null;
function mkLut(){var a=new Float32Array(1024),p=new Float32Array(1024);for(var i=0;i<1024;i++){a[i]=Math.pow(i/1023,REFR.edge);p[i]=Math.pow(i/1023,1.3)}return [a,p]}
function drawRefracted(c,cx,cy,hw,hh,pk){
 var sx=baseC.width/CW,x0=Math.floor((cx-hw)*sx)-1,y0=Math.floor((cy-hh)*sx)-1,x1=Math.ceil((cx+hw)*sx)+1,y1=Math.ceil((cy+hh)*sx)+1,w=x1-x0,h=y1-y0;
 if(lensC.width!==w||lensC.height!==h||!lensID){lensC.width=w;lensC.height=h;lensID=lensX.createImageData(w,h)}
 var LT=REFR.lut||(REFR.lut=mkLut()),LE_=LT[0],LP=LT[1],out=lensID.data,src=texOD.data,TW=texOD.width,TH=texOD.height,ts=TW/CW,r=hh,a=Math.max(0,hw-hh),b=r*REFR.band,
     mk=(1-1/REFR.mag)*pk,inv=1/sx,o=0;
 for(var j=0;j<h;j++){var py=(y0+j+.5)*inv-cy;
  for(var i=0;i<w;i++,o+=4){var px=(x0+i+.5)*inv-cx,qx=Math.abs(px)-a;if(qx<0)qx=0;var ql=Math.sqrt(qx*qx+py*py),d=r-ql;if(d<-1.5){out[o+3]=0;continue}
   var dd=d>0?d:0,ppx=px,ppy=py,wm=1;
   if(dd<b&&ql>1e-4){var hf=qx/ql,rw=REFR.rim*hf,dn=dd<rw?-REFR.peek*hf*LP[(1-dd/rw)*1023|0]:dd+(b*LE_[(dd-rw)/(b-rw)*1023|0]-dd)*REFR.k,sh=(dn-dd)*pk*(REFR.tb+(1-REFR.tb)*hf)/ql;ppx-=(px<0?-qx:qx)*sh;ppy-=py*sh;var z=dd/b;wm=z*z*(3-2*z)}
   var im=1-mk*wm,ax=PADX+CX0+PITCH*Math.min(3,Math.max(0,Math.round((ppx+cx-PADX-CX0)/PITCH)))-cx,X=ax+(ppx-ax)*im,Y=ppy*im;
   var tx=(X+cx)*ts-.5,ty=(Y+cy)*ts-.5,ix=Math.floor(tx),iy=Math.floor(ty),fx=tx-ix,fy=ty-iy;
   if(ix<0||iy<0||ix>=TW-1||iy>=TH-1){out[o+3]=0;continue}
   var p=(iy*TW+ix)*4,q=p+TW*4,w00=(1-fx)*(1-fy),w10=fx*(1-fy),w01=(1-fx)*fy,w11=fx*fy;
   var A00=src[p+3]*w00,A10=src[p+7]*w10,A01=src[q+3]*w01,A11=src[q+7]*w11,A=A00+A10+A01+A11;
   if(A<.5){out[o+3]=0;continue}
   out[o]=(src[p]*A00+src[p+4]*A10+src[q]*A01+src[q+4]*A11)/A;out[o+1]=(src[p+1]*A00+src[p+5]*A10+src[q+1]*A01+src[q+5]*A11)/A;
   out[o+2]=(src[p+2]*A00+src[p+6]*A10+src[q+2]*A01+src[q+6]*A11)/A;out[o+3]=A}}
 lensX.putImageData(lensID,0,0);c.save();var kk=baseC.width/CW/sx;c.setTransform(kk,0,0,kk,0,0);c.drawImage(lensC,x0,y0);c.restore()}
function sizeCanvas(){[baseC,edC].forEach(function(c){var w=Math.round(CW*DPR),h=Math.round(CH*DPR);if(!(FX&1)||c.width!==w)c.width=w;if(!(FX&1)||c.height!==h)c.height=h;c.style.left=-PADX+'px';c.style.top=-PADY+'px';c.style.width=CW+'px';c.style.height=CH+'px'});leO=-1;edClr=0}
function smooth(a,b,x){var t=Math.min(1,Math.max(0,(x-a)/(b-a)));return t*t*(3-2*t)}
function drawBase(cx,hw,hh,pk){if(!texW)return;var c=bctx,X=PADX+cx,Y=PADY+BH/2,pp=new Path2D(path(2*hw,2*hh,X-hw,Y-hh));
 c.setTransform(baseC.width/CW,0,0,baseC.height/CH,0,0);c.globalCompositeOperation='source-over';c.clearRect(0,0,CW,CH);
 c.drawImage(texW,0,0,CW,CH);
 c.globalCompositeOperation='destination-out';c.fillStyle='#000';c.fill(pp);c.globalCompositeOperation='source-over';
 c.save();c.clip(pp);if(GLS&&GLS.on)GLS.caps(cx,hw,hh,1-pk);else{c.globalAlpha=1-pk;c.fillStyle='#070707';c.fillRect(0,0,CW,CH);c.globalAlpha=1}if(pk>.003&&texOD){if(!Q)drawRefracted(c,X,Y,hw,hh,pk);else{var im=1/(1-(1-1/REFR.mag)*pk);for(var i=0;i<4;i++){var ax=PADX+CX0+PITCH*i,l=i?ax-PITCH/2:0,r=i<3?ax+PITCH/2:CW;if(r<X-hw||l>X+hw)continue;c.save();c.beginPath();c.rect(l,0,r-l,CH);c.clip();c.translate(ax,Y);c.scale(im,im);c.translate(-ax,-Y);c.drawImage(texO,0,0,CW,CH);c.restore()}}}else c.drawImage(texO,0,0,CW,CH);c.restore()}
var LE={dark:.767,rimW:.867,rimIn:.733,shade:1,shadeO:1,kR:1,kD:1};
var DARKA=[[0,.5],[.06,.5],[.16,.58],[.3,.64],[.5,.66],[.7,.64],[.84,.56],[.94,.42],[1,.4]];
var RIMA=[[0.0,0.125],[0.04,0.125],[0.0616,0.1198],[0.0831,0.1145],[0.1047,0.1091],[0.1262,0.1036],[0.1478,0.0981],[0.1694,0.0926],[0.1909,0.0872],[0.2125,0.082],[0.2341,0.077],[0.2556,0.0721],[0.2772,0.0675],[0.2987,0.063],[0.3203,0.0588],[0.3419,0.0549],[0.3634,0.0513],[0.385,0.0479],[0.4066,0.0449],[0.4281,0.0421],[0.4497,0.0396],[0.4712,0.0374],[0.4928,0.0356],[0.5072,0.0355],[0.5288,0.037],[0.5503,0.0387],[0.5719,0.0408],[0.5934,0.043],[0.615,0.0455],[0.6366,0.0482],[0.6581,0.0512],[0.6797,0.0543],[0.7013,0.0577],[0.7228,0.0613],[0.7444,0.0651],[0.7659,0.069],[0.7875,0.0731],[0.8091,0.0774],[0.8306,0.0817],[0.8522,0.0862],[0.8738,0.0906],[0.8953,0.0951],[0.9169,0.0995],[0.9384,0.1038],[0.96,0.108],[1.0,0.108]];
var GLOWA=[[0,.045],[.05,.035],[.09,.018],[.13,.005],[.17,0],[.8,0],[.86,.012],[.92,.026],[.96,.038],[1,.045]];
var SLA=[[.5,0],[.57,.008],[.64,.024],[.71,.048],[.78,.076],[.85,.102],[.92,.118],[.97,.116],[1,.096]];
var edC=$('lensedge'),ectx=edC.getContext('2d'),leO=-1,edClr=0;
function lgr(c,x0,y0,x1,y1,a,rgb){var g=c.createLinearGradient(x0,y0,x1,y1);for(var i=0;i<a.length;i++)g.addColorStop(a[i][0],'rgba('+rgb+','+a[i][1]+')');return g}
function drawEdge(cx,hw,hh,pk){var o=smooth(.08,.5,pk),c=ectx,k=edC.width/CW;if(o!==leO){edC.style.opacity=o;leO=o}c.setTransform(k,0,0,k,0,0);
 if(o<=0){if(!edClr){c.clearRect(0,0,CW,CH);edClr=1}return}edClr=0;c.clearRect(0,0,CW,CH);c.translate(PADX,PADY);
 var W=2*hw,H=2*hh,ox=cx-hw,oy=BH/2-hh,P=new Path2D(path(W,H,ox,oy)),R=H/2,rr=R*1.7*LE.shade,dx=R*1.4,gy=BH/2+R*.14,mR=Math.min(R*2,W/2),r=LE.rimIn;
 for(var s=0;s<2;s++){var gx=s?ox+W-dx:ox+dx,rx=s?ox+W-mR:ox-2,x1=s?ox+W:ox,x2=s?ox+W-mR:ox+mR,g=c.createRadialGradient(gx,gy,0,gx,gy,rr);
  for(var i=0;i<SLA.length;i++)g.addColorStop(SLA[i][0],'rgba(0,0,0,'+SLA[i][1]+')');
  c.save();c.beginPath();c.rect(rx,-50,mR+2,200);c.clip();c.globalAlpha=LE.shadeO;c.fillStyle=g;c.fill(P);c.globalAlpha=1;
  c.globalCompositeOperation='destination-out';c.fillStyle=lgr(c,x1,0,x2,0,[[0,0],[.4,0],[1,1]],'0,0,0');c.fillRect(rx,-50,mR+2,200);c.restore()}
 c.globalCompositeOperation='destination-over';c.fillStyle=lgr(c,0,oy,0,oy+H,GLOWA,'240,240,240');c.fill(P);c.fillStyle='rgba(255,255,255,.012)';c.fill(P);
 c.globalCompositeOperation='source-over';c.lineWidth=LE.rimW;c.globalAlpha=LE.kR;c.strokeStyle=lgr(c,0,oy+r,0,oy+H-r,RIMA,'240,240,240');c.stroke(new Path2D(path(W-2*r,H-2*r,ox+r,oy+r)));
 c.lineWidth=LE.dark;c.globalAlpha=LE.kD;c.strokeStyle=lgr(c,0,oy,0,oy+H,DARKA,'0,0,0');c.stroke(P);c.globalAlpha=1}
function Curve(tt,vv){this.t=tt;this.v=vv;var n=tt.length,d=[],m=[],i;for(i=0;i<n-1;i++)d.push((vv[i+1]-vv[i])/(tt[i+1]-tt[i]));
 m[0]=d[0];m[n-1]=d[n-2];for(i=1;i<n-1;i++)m[i]=d[i-1]*d[i]<=0?0:(d[i-1]+d[i])/2;
 for(i=0;i<n-1;i++){if(d[i]===0){m[i]=m[i+1]=0;continue}var a=m[i]/d[i],b=m[i+1]/d[i],h=a*a+b*b;if(h>9){var k=3/Math.sqrt(h);m[i]=k*a*d[i];m[i+1]=k*b*d[i]}}this.m=m}
Curve.prototype.at=function(x){var t=this.t,v=this.v,n=t.length;if(x<=t[0])return v[0];if(x>=t[n-1])return v[n-1];var i=0;while(t[i+1]<x)i++;
 var h=t[i+1]-t[i],u=(x-t[i])/h,u2=u*u,u3=u2*u;return (2*u3-3*u2+1)*v[i]+(u3-2*u2+u)*h*this.m[i]+(-2*u3+3*u2)*v[i+1]+(u3-u2)*h*this.m[i+1]};
function K(a){var t=[],v=[];for(var i=0;i<a.length;i+=2){t.push(a[i]);v.push(a[i+1])}return new Curve(t,v)}
var CEF=K([0,0,.033,2,.067,4.8,.1,6.5,.133,7.3,.2,7.2,.3,6.8,.367,6.6,.4,6,.433,4.6,.467,4,.5,3.4,.533,2,.567,1.2,.6,.8,.667,.4,.8,.2,.9,0]);
var CEB=K([0,0,.033,-3,.067,-7,.1,-10,.133,-11,.2,-10.5,.267,-11.3,.3,-12,.333,-11.8,.367,-10.4,.4,-9.2,.433,-8.2,.467,-6.4,.5,-4.7,.533,-3.3,.567,-2.3,.6,-1.3,.633,-.5,.667,0,.7,.4,.767,.9,.833,1,.9,.9,1,.5,1.2,.3,1.4,0]);
var CD=K([0.0,1,0.035,0.95,0.07,0.85,0.105,0.7,0.14,0.52,0.175,0.34,0.21,0.18,0.245,0.06,0.28,0,0.337,0,0.37,0.03,0.403,0.09,0.435,0.18,0.468,0.3,0.501,0.44,0.534,0.58,0.566,0.71,0.599,0.82,0.632,0.91,0.665,0.97,0.697,1]);
var CFL=K([0,0,.017,.3,.033,.6,.05,.85,.067,1,.083,.9,.1,.55,.117,.48,.2,.38,.25,.3,.3,.2,.35,.12,.4,.07,.45,.03,.5,0]);
var CS=K([0,1,.033,1.0067,.067,1.0129,.1,1.0193,.133,1.0254,.167,1.0293,.2,1.031,.233,1.0285,.267,1.0251,.3,1.0211,.333,1.0168,.367,1.0126,.4,1.0088,.433,1.0054,.467,1.0026,.5,1.0004,.533,.999,.567,.998,.6,.9974,.633,.997,.667,.9971,.7,.9975,.733,.9979,.767,.9983,.8,.9986,.833,.9989,.9,1]);
var M_F=K([0,0,.017,.049,.05,.242,.083,.392,.117,.506,.15,.623,.183,.755,.217,.9,.25,.945,.283,.979,.317,1.005,.35,1.03,.383,1.062,.417,1.084,.45,1.08,.483,1.068,.517,1.056,.55,1.042,.583,1.031,.617,1.022,.65,1.015,.683,1.009,.717,1.005,.75,1.002,.85,1]);
var M_B=K([0,0,.017,.049,.05,.2,.083,.313,.117,.392,.15,.468,.183,.558,.217,.645,.25,.68,.283,.712,.317,.748,.35,.79,.383,.83,.417,.866,.45,.899,.483,.932,.517,.965,.55,.993,.583,1.019,.617,1.041,.65,1.057,.683,1.069,.717,1.078,.75,1.082,.783,1.083,.817,1.082,.85,1.078,.883,1.074,.917,1.069,.95,1.064,.983,1.058,1.017,1.052,1.05,1.045,1.083,1.039,1.117,1.033,1.15,1.027,1.183,1.022,1.217,1.018,1.25,1.014,1.283,1.01,1.317,1.007,1.35,1.005,1.4,1.002,1.46,1]);
var M_H=K([0,0,.017,.05,.05,.25,.083,.38,.117,.36,.15,.12,.183,-.2,.217,-.48,.25,-.62,.283,-.58,.317,-.36,.35,.02,.383,.45,.417,.82,.45,.98,.483,.97,.517,.95,.55,.94,.6,.94,.65,.94,.7,.92,.75,.88,.783,.84,.817,.79,.85,.73,.883,.67,.917,.62,.95,.57,.983,.53,1.017,.48,1.05,.43,1.083,.38,1.117,.33,1.15,.27,1.183,.22,1.217,.17,1.25,.13,1.283,.09,1.317,.06,1.383,.03,1.46,0]);
var MEND=1.46,MSP={base:1.08,perTab:.12};
var HOLD={d:.28,fl:.117,s:.1,e:.15},TEND=.8,VS=2;
var SPEED=1.55,POP={a:.05,tau:.12,per:.22},DRG={st:.16,om:22,z:.38};
var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion:reduce)').matches;
var raf=0,last=0,fit=1,barEl=$('bar'),flEl=$('fl'),lastTf='',lastFo='',clock=0;
var IN0=-1,INo='0';barEl.style.opacity='0';
function introV(){if(IN0<0)return null;var t=(performance.now()-IN0)/1000;if(t>=.8)return null;var w=16,z=.5,wd=w*Math.sqrt(1-z*z),x=1-Math.exp(-z*w*t)*(Math.cos(wd*t)+z*w/wd*Math.sin(wd*t));return [.84+.16*x,Math.min(1,t/.2)]}
function intro(){if(IN0>=0)return;try{if(window.ITBH&&ITBH.ready)ITBH.ready()}catch(_){}if(reduce||BASIC){IN0=0;INo='';barEl.style.opacity='';return}IN0=performance.now();go()}
var Lx=CX0-PW/2,Rx=CX0+PW/2,lensV=0,flashV=0,scaleV=1,holdX=0,wNom=PW;
var an=null;
var drag=null;
var pressing=false,downX=0,downAt=0;
var BARK=2.11;
function chanTk(c,el,k){var h=HOLD[c]*k,t;if(an.pre)t=an.rel<0?h:h+(el-an.rel);else if(an.rel<0)t=Math.min(el,h);else t=Math.min(an.rel,h)+(el-an.rel);return t/k}
function chanT(c,el){var h=HOLD[c];if(an.pre)return an.rel<0?h:h+(el-an.rel);if(an.rel<0)return Math.min(el,h);return Math.min(an.rel,h)+(el-an.rel)}
function startTap(to,pre){var cx=(Lx+Rx)/2,tx=CX0+PITCH*to,dir=tx>cx+.5?1:tx<cx-.5?-1:0;
 var F=dir<0?Lx:Rx,B=dir<0?Rx:Lx,D=Math.abs(tx-cx);
 an={t0:clock,dir:dir,Fs:F,Bs:B,Fe:tx+(dir<0?-1:1)*PW/2,Be:tx-(dir<0?-1:1)*PW/2,rel:-1,pre:!!pre,
  d0:1-lensV,fl0:flashV,s0:scaleV,to:to,h0:curH,ms:MSP.base*(1+MSP.perTab*Math.max(0,D/PITCH-1)),g:Math.min(1,Math.sqrt(PITCH/Math.max(PITCH,D)))}}
function edgesAt(el){
 if(an.dir){var tm=el*an.ms,f=M_F.at(tm),b=M_B.at(tm),C=(f+b)/2,S=(f-b)*an.g;if(C>1)C=1+(C-1)*an.g;f=C+S/2;b=C-S/2;
  var F=an.Fs+(an.Fe-an.Fs)*f,B=an.Bs+(an.Be-an.Bs)*b;return [Math.max(2.2,Math.min(F,B)),Math.min(BW-2.2,Math.max(F,B)),PW]}
 var te=chanT('e',el)*VS,ef=CEF.at(te),eb=CEB.at(te),m=an.pre?0:(ef-eb)/2,f=smooth(0,.4,el),F=an.Fs+(an.Fe-an.Fs)*f+m,B=an.Bs+(an.Be-an.Bs)*f-m;
 return [Math.max(2.2,Math.min(F,B)),Math.min(BW-2.2,Math.max(F,B)),PW+2*Math.abs(m)]}
var curH=PH;
function stepAnim(dt){
 if(drag){
  var om=26,z=.85,a=om*om*(drag.x-drag.cx)-2*z*om*drag.vx;drag.vx+=a*dt;drag.cx+=drag.vx*dt;
  var wt=LW*(1+Math.min(DRG.st,Math.abs(drag.vx)/1500)),aw=DRG.om*DRG.om*(wt-drag.w)-2*DRG.z*DRG.om*(drag.vw||0);drag.vw=(drag.vw||0)+aw*dt;drag.w+=drag.vw*dt;
 var c=Math.min(Math.max(drag.cx,drag.w/2-3),BW-drag.w/2+3);Lx=c-drag.w/2;Rx=c+drag.w/2;wNom=drag.w;
  lensV+=(1-lensV)*(1-Math.exp(-dt/.04));flashV+=(CFL.at(HOLD.fl)-flashV)*(1-Math.exp(-dt/.08));
  scaleV+=(CS.at(HOLD.s*VS)-scaleV)*(1-Math.exp(-dt/.08));holdX+=(1-holdX)*(1-Math.exp(-dt/.08));return true}
 if(!an)return false;
 var el=clock-an.t0,E=edgesAt(el);Lx=E[0];Rx=E[1];wNom=E[2];
 var td=chanT('d',el),D=CD.at(td);if(td<HOLD.d)D=Math.min(D,an.d0);
 lensV=1-D;
 var tf=chanTk('fl',el,BARK),FL=CFL.at(tf);if(tf<.067)FL=Math.max(FL,an.fl0);flashV=FL;
 var ts=chanTk('s',el,BARK)*VS,S=CS.at(ts);if(ts<.2)S=Math.max(S,an.s0);scaleV=S;
 var held=pressing&&el>HOLD.d;holdX+=((held?1:0)-holdX)*(1-Math.exp(-dt/(held?.04:.025)));
 if(an.rel>=0&&el-an.rel>TEND&&(!an.dir||el*an.ms>MEND)&&chanT('d',el)>.71&&chanTk('fl',el,BARK)>.5){an=null;holdX=0;return false}
 return true}
function paint(){
 var pk=Math.min(1,Math.max(0,lensV)),w=Rx-Lx,ex=(LW-PW-18)*holdX;
 var iv=introV(),op=iv?iv[1].toFixed(3):(IN0>=0?'':'0');if(op!==INo){barEl.style.opacity=op;INo=op}
 var tf='scale('+(fit*scaleV*(iv?iv[0]:1)).toFixed(4)+')',fo=flashV.toFixed(3);if(tf!==lastTf){barEl.style.transform=tf;lastTf=tf}if(fo!==lastFo){flEl.style.opacity=fo;lastFo=fo}
 var mv=an&&an.dir,h;
 if(mv){var tm=(clock-an.t0)*an.ms,h1=PH+(HMAX-PH)*M_H.at(tm);h=h1+(an.h0-PH-(HMAX-PH)*M_H.at(0))*Math.exp(-tm/.07);h=lerp(h,LH,holdX)}
 else h=PH+((holdX>0?lerp(LHT,LH,holdX):LHT)-PH)*pk;
 var pt=clock-downAt;if(!mv&&downAt>=0&&pt<.7){var pp=POP.a*Math.exp(-pt/POP.tau)*Math.sin(2*Math.PI*pt/POP.per)*pk;w*=1+pp;h*=1-pp*.6}
 if(drag)h*=Math.max(.9,Math.min(1.1,Math.pow(LW/Math.max(1,w),.5)));
 h=Math.min(h,HMAX);curH=h;var hh=h/2,hw=(w+ex*pk)/2,cx=(Lx+Rx)/2;
 drawBase(cx,hw,hh,pk);drawEdge(cx,hw,hh,pk);
}
function lerp(a,b,t){return a+(b-a)*t}
var FORCE=(/[?&]itb=(full|lite|auto)/.exec(location.search)||[])[1],Q=navigator.deviceMemory&&navigator.deviceMemory<=2?2:0,FQ=[];try{if(FORCE==='auto')localStorage.removeItem('itbQ2');Q=Math.min(2,Math.max(Q,+localStorage.getItem('itbQ2')||0))}catch(_){}if(FORCE==='full')Q=0;else if(FORCE==='lite')Q=1;
function setQ(q){Q=q;FQ=[];if(!FORCE||FORCE==='auto')try{localStorage.setItem('itbQ2',q)}catch(_){}if(Q>1){var g=$('glass').style;g.webkitBackdropFilter=g.backdropFilter='none'}}
if(Q>1)setQ(Q);
function tick(now){try{return tick_(now)}catch(_){basic()}}
function tick_(now){if(Q<2&&FORCE!=='full'&&FORCE!=='lite'&&(drag||an&&an.dir)&&lensV>.5){FQ.push(now-last);if(FQ.length>=8){FQ.sort(function(a,b){return a-b});if(FQ[4]>38)setQ(Q+1);FQ=[]}}var dt=Math.min(.05,Math.max(0,(now-last)/1000))*SPEED;last=Math.max(last,now);var n=drag?Math.max(1,Math.ceil(dt/.004)):1,h=dt/n,busy=false;
 for(var i=0;i<n;i++){clock+=h;busy=stepAnim(h)}
 busy=stepIcon()||busy;if(introV())busy=true;
 paint();if(GLS)GLS.kick(150);raf=busy?requestAnimationFrame(tick):0;if(!raf)setTimeout(recomp,60)}
function go(){if(BASIC)return;if(reduce){if(an){an.t0=clock-10;an.rel=an.rel<0&&!pressing?0:an.rel}stepAnim(0);paint();return}if(!raf){last=performance.now();raf=requestAnimationFrame(tick)}}
function localX(e){var r=barEl.getBoundingClientRect();return (e.clientX-r.left)/(r.width/BW)}
function clampX(x){return Math.min(Math.max(x,CX0-6.5),CX0+PITCH*3+6.5)}
function tabAt(x){return Math.min(3,Math.max(0,Math.round((clampX(x)-CX0)/PITCH)))}
function pDown(e){if(e.button>0)return;try{barEl.setPointerCapture(e.pointerId)}catch(_){}
 pressing=true;downX=localX(e);downAt=clock;drag=null;startTap(tabAt(downX));go();e.preventDefault()}
function pMove(e){if(!pressing)return;var x=localX(e);
 if(!drag&&Math.abs(x-downX)>8){var cx=(Lx+Rx)/2;drag={x:clampX(x),cx:cx,vx:0,w:Rx-Lx};an=null}
 if(drag){drag.x=clampX(x);go()}}
function release(e){if(!pressing)return;pressing=false;var i=drag?tabAt(drag.x):(an?an.to:sel);setSel(i);
 if(drag){drag=null;startTap(i,true);an.rel=0}else if(an){an.rel=clock-an.t0}go()}
function ev(el,t,f){el.addEventListener(t,f,{passive:false})}
if(window.PointerEvent){ev(barEl,'pointerdown',pDown);ev(barEl,'pointermove',pMove);ev(barEl,'pointerup',release);ev(barEl,'pointercancel',release)}
else{var tw=function(f){return function(e){var t=e.changedTouches&&e.changedTouches[0];if(t)f({clientX:t.clientX,button:0,pointerId:0,preventDefault:function(){e.preventDefault()}})}},tmo=0;
 ev(barEl,'touchstart',function(e){tmo=1;tw(pDown)(e)});ev(barEl,'touchmove',tw(pMove));ev(barEl,'touchend',tw(release));ev(barEl,'touchcancel',tw(release));
 ev(barEl,'mousedown',function(e){if(!tmo)pDown(e)});ev(window,'mousemove',function(e){if(!tmo)pMove(e)});ev(window,'mouseup',function(e){if(!tmo)release(e)})}
barEl.addEventListener('keydown',function(e){var d=e.key==='ArrowRight'?1:e.key==='ArrowLeft'?-1:0;if(!d)return;var i=Math.min(3,Math.max(0,sel+d));
 setSel(i);startTap(i);an.rel=0;tabBtns[i].focus();go();e.preventDefault()});
function snap(){if(!(FX&2))return;barEl.style.willChange='auto';barEl.style.left='0px';barEl.style.top='0px';var q=barEl.getBoundingClientRect(),p=window.devicePixelRatio||1;barEl.style.left=(Math.round(q.left*p)/p-q.left)+'px';barEl.style.top=(Math.round(q.top*p)/p-q.top)+'px'}
function recomp(){if(!(FX&4))return;[baseC,edC].forEach(function(c){c.style.display='none';void c.offsetWidth;c.style.display=''})}
/* width of the page, not of the zoomed view: with pinch zoom innerWidth shrinks and the menu shrank with it */
function resize(){fit=Math.min(1,((document.documentElement.clientWidth||window.innerWidth)-16)/(BW*1.06));if(BASIC){barEl.style.transform='scale('+fit+')';return}sizeCanvas();paint();snap()}
window.addEventListener('resize',resize);
/* pinch zoom: keep the menu at the bottom of what is on screen and at its normal size, like an app tab bar */
var dockEl=document.getElementById('dock'),dockGap=-1;
function pinVV(){var v=window.visualViewport;if(!v||!dockEl)return;var s=v.scale||1,Hl=document.documentElement.clientHeight;
 if(s<1.01){if(dockEl.style.transform){dockEl.style.transform='';dockEl.style.transformOrigin=''}dockGap=Hl-dockEl.getBoundingClientRect().bottom;return}
 if(dockGap<0)dockGap=5;dockEl.style.transformOrigin='0 100%';dockEl.style.transform='translate('+v.offsetLeft.toFixed(2)+'px,'+(v.offsetTop+v.height-Hl+dockGap*(1-1/s)).toFixed(2)+'px) scale('+(1/s).toFixed(4)+')';if(GLS)GLS.kick(300)}
if(window.visualViewport){visualViewport.addEventListener('resize',pinVV);visualViewport.addEventListener('scroll',pinVV)}
function rescale(){var n=Math.min(4,pxr()*vz());if(Math.abs(n-DPR)<.25||BASIC)return;DPR=n;TS=Math.max(2,DPR);sizeCanvas();buildTex();paint();if(GLS)GLS.size()}
if(window.visualViewport)visualViewport.addEventListener('resize',function(){clearTimeout(rescale.t);rescale.t=setTimeout(rescale,150)});
try{if(!window.Path2D||!window.CanvasRenderingContext2D)throw 0;setSel(0);buildTex();resize();go()}catch(_){basic();setSel(0)}
var WS=0;function warm(){if(!texW||BASIC||WS>4)return;if(raf||pressing){setTimeout(warm,300);return}
 try{if(WS<2){var c=95+170*WS;drawBase(c,61.8,30,1);drawEdge(c,61.8,30,1)}
  else if(WS===2){for(var i=0;i<4;i++){redrawIcon(i,.12);redrawIcon(i,null)}}
  else if(WS===3){var S=[an,Lx,Rx,lensV,flashV,scaleV,holdX,wNom,curH,clock,downAt];startTap(sel<2?sel+2:sel-2);an.rel=0;for(var k=0;k<4;k++){clock+=.06;stepAnim(.06);paint()}
   an=S[0];Lx=S[1];Rx=S[2];lensV=S[3];flashV=S[4];scaleV=S[5];holdX=S[6];wNom=S[7];curH=S[8];clock=S[9];downAt=S[10]}
  }catch(_){}
 paint();WS++;
 if(WS>4){barEl.style.transform='scale('+(fit*1.002).toFixed(4)+')';flEl.style.opacity='.02';lastTf=lastFo='';requestAnimationFrame(function(){requestAnimationFrame(function(){if(!raf)paint()})})}
 else requestAnimationFrame(function(){setTimeout(warm,0)})}
function dbg(){if(!/[?&]itbdbg/.test(location.search))return;var c=document.createElement('canvas'),k=pxr(),x;c.width=180*k;c.height=24*k;c.style.cssText='width:180px;height:24px;vertical-align:middle';x=c.getContext('2d');x.scale(k,k);x.fillStyle='#fff';x.font='500 13px '+FONT;x.fillText('Canvas: Тариф Расходы',2,17);
 var d=document.createElement('div');d.style.cssText='position:fixed;left:8px;right:8px;top:calc(env(safe-area-inset-top,0px) + 8px);z-index:99;background:rgba(20,20,20,.94);color:#7CFC00;font:11px/1.35 ui-monospace,Menlo,monospace;padding:8px 10px;border-radius:12px;white-space:pre-wrap;pointer-events:none';
 d.textContent='itb v73\nUA iOS: '+IOS+'\ndevicePixelRatio: '+window.devicePixelRatio+'  -> used: '+DPR+'  zoom: '+vz()+'\ninnerWidth: '+innerWidth+'  screen: '+screen.width+'x'+screen.height+'\nbase canvas: '+baseC.width+'x'+baseC.height+' px, css '+baseC.clientWidth+'px\nmode Q: '+Q+(FORCE?' (forced '+FORCE+')':'')+'  basic: '+BASIC+'\nclip-path: '+!!$('glass').style.clipPath+'  mask: '+!!($('glass').style.webkitMaskImage||$('glass').style.maskImage)+'\nPointerEvent: '+!!window.PointerEvent+'  deviceMemory: '+navigator.deviceMemory+'\n';
 var t=document.createElement('span');t.textContent='DOM: Тариф Расходы';t.style.cssText='font:500 13px '+FONT+';color:#fff;margin-left:8px';d.appendChild(c);d.appendChild(t);document.body.appendChild(d)}
function idle(f){(window.requestIdleCallback||function(g){setTimeout(g,120)})(f,{timeout:150})}
var FL=document.fonts&&document.fonts.status==='loading';if(document.fonts&&document.fonts.ready)document.fonts.ready.then(function(){if(BASIC){intro();return}if(FL){buildTex();paint()}intro();idle(warm)});else{intro();idle(warm)}
setTimeout(intro,2000);
try{dbg()}catch(_){}
[400,1200,2500].forEach(function(t){setTimeout(function(){if(!raf)recomp()},t)});
window.ITB={gls:function(){return GLS},set:function(i){if(GLS&&GLS.screen)GLS.screen(i);if(i===sel)return;setSel(i);if(BASIC)return;startTap(i);an.rel=0;go()}};
/* ---------- liquid glass (iOS 27 tab bar), measured on a real iOS 27 tab bar (tools/glass-app, numbers in CLAUDE.md).
   A picture of the page (#app, SVG foreignObject) is cut to the bar + 16 pt around it (iOS sees nothing farther), blurred,
   bent near the edge (sampling moved along the edge normal), then brightness curve + colour like iOS. The v93 strokes,
   fill and soft spot are drawn in the same canvas, so the edge stays smooth over any colour; each pixel of the rim takes
   the glass with its own iOS gains (brightness Kl, colour Kc by distance to the edge and edge angle). Over black: v93. ---------- */
GLS=(function(){
 var M={on:false,err:'',ver:0,st:{n:0,take:0,load:0,up:0},kick:function(){},snap:function(){},caps:function(){}},
  cv,g,P={},T={},F={},SN={},cur=null,prv=null,fT0=0,fDur=1,curScr=0,dirty={},dirtyAt=0,busy=false,again=0,st=0,raf=0,until=0,lastKey='',dpr=0,capC=null,capX=null,capKey='',capVer=0,
  touching=0,lastScroll=-1e4;
 var MP=4,BWX=BW+2*MP,BHX=BH+2*MP,MG=16,UW=BW+2*MG,UH=BH+2*MG,CU=2,TW=Math.round(UW/CU),TH=Math.round(UH/CU),GAM=.932,SHARP=0;/* «Tinted» glass has no see-through sharp copy (in «Clear» it is 5.3%) */
 /* iOS «Liquid Glass: Tinted» (the user's phone): brightness curve g(L) of the glass, L = 0..255 */
 var LUT=[32.0,32.5,33.0,33.5,34.0,34.5,35.0,35.5,36.0,36.5,37.0,37.5,38.0,38.5,39.0,39.5,40.0,40.4,40.8,41.1,41.5,41.9,42.2,42.6,43.0,43.5,44.0,44.5,45.0,45.5,46.0,46.5,47.0,47.5,48.0,48.5,49.0,49.5,50.0,50.5,51.0,51.4,51.7,52.1,52.5,52.9,53.2,53.6,54.0,54.4,54.8,55.1,55.5,55.9,56.2,56.6,57.0,57.5,58.0,58.5,59.0,59.5,60.0,60.5,60.9,61.3,61.7,62.1,62.5,62.9,63.2,63.6,64.0,64.4,64.8,65.1,65.5,65.9,66.2,66.6,67.0,67.4,67.8,68.1,68.5,68.9,69.2,69.6,70.0,70.4,70.7,71.1,71.5,71.8,72.2,72.6,72.9,73.2,73.5,73.7,74.0,74.2,74.5,74.7,75.0,75.4,75.8,76.1,76.5,76.9,77.2,77.6,78.0,78.4,78.7,79.1,79.4,79.8,80.1,80.5,80.9,81.1,81.4,81.7,81.9,82.2,82.5,82.7,83.0,83.2,83.5,83.8,84.0,84.2,84.5,84.8,85.0,85.4,85.7,86.1,86.4,86.8,87.2,87.5,87.9,88.1,88.4,88.7,88.9,89.2,89.4,89.7,90.0,90.2,90.5,90.7,91.0,91.2,91.5,91.7,92.0,92.2,92.5,92.7,93.0,93.2,93.5,93.7,94.0,94.2,94.4,94.7,94.9,95.2,95.4,95.6,95.9,96.0,96.1,96.3,96.4,96.6,96.7,96.9,97.0,97.2,97.5,97.8,98.0,98.2,98.5,98.8,99.0,99.2,99.4,99.7,99.9,100.1,100.3,100.6,100.8,100.9,101.1,101.2,101.4,101.5,101.7,101.8,102.0,102.1,102.2,102.4,102.5,102.6,102.8,102.9,103.0,103.2,103.5,103.7,103.9,104.1,104.4,104.6,104.8,105.0,105.1,105.2,105.4,105.5,105.6,105.8,105.9,106.0,106.2,106.3,106.4,106.5,106.7,106.8,106.9,107.1,107.2,107.3,107.4,107.5,107.7,107.8,107.9,107.9,107.9,107.9,108.0,108.0,108.0,108.0];
 var KW=[0.053062,0.052525,0.050948,0.048434,0.045138,0.041256,0.037001,0.032589,0.028214,0.024041,0.020192,0.016750,0.013753,0.011209,0.009093,0.007366,0.005977,0.004871,0.003995,0.003301,0.002749,0.002306,0.001945,0.001647,0.001398,0.001186,0.001006,0.000851,0.000717,0.000601,0.000502,0.000417,0.000344,0.000283,0.000231,0.000187,0.000151,0.000121,0.000097,0.000077];
 /* bending: sampling shift along the inward normal, px at 3x by distance to the edge (+ = inward), D = b/255*64-32 */
 var DT=[25,85,133,153,151,150,149,148,147,146,145,145,143,142,142,141,140,140,139,138,137,137,136,135,134,134,134,133,132,132,132,131,131,131,130,130,131,130,130,130,130,129,129,129,128,128,128,127,128,128,128,128,128,129,129,128,128,128,128,128,128,128,128,128];
 var FL=function(s){return '#ifdef GL_FRAGMENT_PRECISION_HIGH\nprecision highp float;\n#else\nprecision mediump float;\n#endif\n'+s},N=function(x){return x.toFixed(1)};
 var VS='attribute vec2 p;varying vec2 v;void main(){v=p*.5+.5;gl_Position=vec4(p,0.,1.);}';
 var HD='varying vec2 v;uniform sampler2D S;uniform vec4 R,Q;uniform float G;'+
  'vec3 sn(vec2 s){vec2 u=(s+Q.xy)/Q.zw;if(u.x<0.||u.y<0.||u.x>1.||u.y>1.)return vec3(0.);return texture2D(S,u).rgb;}';
 /* capture: the previous page picture fades into the new one (FD 0..1), so a new picture never jumps in */
 var FC=FL(HD+'uniform sampler2D S2;uniform vec4 Q2;uniform float FD;vec3 sn2(vec2 s){vec2 u=(s+Q2.xy)/Q2.zw;if(u.x<0.||u.y<0.||u.x>1.||u.y>1.)return vec3(0.);return texture2D(S2,u).rgb;}'+
  'vec3 tp(vec2 s){return mix(sn2(s),sn(s),FD);}void main(){vec2 k=R.zw/vec2('+N(BW)+','+N(BH)+'),u=vec2(v.x*'+N(UW)+',v.y*'+N(UH)+')-'+N(MG)+',s=R.xy+u*k;'+
  'vec3 c=.25*(tp(s+vec2(-.5,-.5)*k)+tp(s+vec2(.5,-.5)*k)+tp(s+vec2(-.5,.5)*k)+tp(s+vec2(.5,.5)*k));gl_FragColor=vec4(pow(c,vec3(G)),1.);}');
 var FB=FL('varying vec2 v;uniform sampler2D T;uniform vec2 D;uniform float W['+KW.length+'];'+
  'void main(){vec4 c=W[0]*texture2D(T,v);for(int i=1;i<'+KW.length+';i++){float f=float(i);c+=W[i]*(texture2D(T,v+D*f)+texture2D(T,v-D*f));}gl_FragColor=c;}');
 /* final pass over the bar + 4 pt around it: every pixel is the real iOS 27 «Tinted» tab bar measured per pixel
    (rim light, its gradients, the dark side ring, soft spot, faint shadow, smooth edge): out = A + Kl*L + Kc*(G-L) + beta*page */
 var FO=FL(HD+'uniform sampler2D B,L,GE,DX,CP,MPX;uniform float A;const vec3 W7=vec3(.2126,.7152,.0722);'+
  'void main(){vec2 tc=vec2(v.x,1.-v.y);vec4 mp=texture2D(MPX,tc);float be=mp.a*1.275-.1,al=clamp(1.-be,0.,1.);if(al<=.003){gl_FragColor=vec4(0.);return;}'+
  'float a0=mp.r*255.-64.,kl=mp.g*1.275,kc=mp.b*1.7;'+
  'vec4 ge=texture2D(GE,tc);float t3=ge.r*63.75;vec2 n=ge.ba*2.-1.;float d=texture2D(DX,vec2(t3/64.,.5)).a*64.-32.;'+
  'vec2 u=vec2(v.x*'+N(BWX)+',(1.-v.y)*'+N(BHX)+')-'+N(MP)+',us=u+n*d/3.,k=R.zw/vec2('+N(BW)+','+N(BH)+');'+
  'vec3 b=texture2D(B,(us+'+N(MG)+')/vec2('+N(UW)+','+N(UH)+')).rgb;vec3 z=(1.-A)*b+A*pow(sn(R.xy+us*k),vec3(G));'+
  'vec3 c=pow(max(z,vec3(0.)),vec3(1./G))*255.;float l=dot(c,W7);float gv=texture2D(L,vec2((l+.5)/256.,.5)).a*255.;vec3 dc=clamp(.6543-.000833*l,.4,.7)*(c-l);'+
  'vec3 bar=a0+kl*gv+kc*dc;float q=texture2D(CP,tc).a;vec3 cap=-17.87+.87*gv+1.2*dc;'+
  'vec3 col=clamp(mix(bar,cap,q),0.,255.*al);gl_FragColor=vec4(col/255.,al);}');
 function sh(t,s){var o=g.createShader(t);g.shaderSource(o,s);g.compileShader(o);if(!g.getShaderParameter(o,g.COMPILE_STATUS))throw g.getShaderInfoLog(o);return o}
 function prog(fs){var p=g.createProgram();g.attachShader(p,sh(g.VERTEX_SHADER,VS));g.attachShader(p,sh(g.FRAGMENT_SHADER,fs));g.bindAttribLocation(p,0,'p');g.linkProgram(p);if(!g.getProgramParameter(p,g.LINK_STATUS))throw g.getProgramInfoLog(p);p.u={};return p}
 function U(p,n){return p.u[n]||(p.u[n]=g.getUniformLocation(p,n))}
 function tx(w,h,lin){var t=g.createTexture();g.bindTexture(g.TEXTURE_2D,t);g.texParameteri(g.TEXTURE_2D,g.TEXTURE_MIN_FILTER,lin?g.LINEAR:g.NEAREST);g.texParameteri(g.TEXTURE_2D,g.TEXTURE_MAG_FILTER,lin?g.LINEAR:g.NEAREST);
  g.texParameteri(g.TEXTURE_2D,g.TEXTURE_WRAP_S,g.CLAMP_TO_EDGE);g.texParameteri(g.TEXTURE_2D,g.TEXTURE_WRAP_T,g.CLAMP_TO_EDGE);if(w)g.texImage2D(g.TEXTURE_2D,0,g.RGBA,w,h,0,g.RGBA,g.UNSIGNED_BYTE,null);return t}
 function fb(t){var f=g.createFramebuffer();g.bindFramebuffer(g.FRAMEBUFFER,f);g.framebufferTexture2D(g.FRAMEBUFFER,g.COLOR_ATTACHMENT0,g.TEXTURE_2D,t,0);if(g.checkFramebufferStatus(g.FRAMEBUFFER)!==g.FRAMEBUFFER_COMPLETE)throw 'fbo';return f}
 function upl(t,src,pm){g.bindTexture(g.TEXTURE_2D,t);g.pixelStorei(g.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!!pm);g.texImage2D(g.TEXTURE_2D,0,g.RGBA,g.RGBA,g.UNSIGNED_BYTE,src);g.pixelStorei(g.UNPACK_PREMULTIPLY_ALPHA_WEBGL,false)}
 function cnv(w,h){var c=document.createElement('canvas');c.width=w;c.height=h;var x=c.getContext('2d');x.setTransform(w/BWX,0,0,h/BHX,MP*w/BWX,MP*h/BHX);return [c,x]}
 /* squared distance transform (Felzenszwalb), 1D */
 function edt1(f,n,o,v,z){var k=0,q,s;v[0]=0;z[0]=-1e20;z[1]=1e20;
  for(q=1;q<n;q++){s=((f[q]+q*q)-(f[v[k]]+v[k]*v[k]))/(2*q-2*v[k]);while(s<=z[k]){k--;s=((f[q]+q*q)-(f[v[k]]+v[k]*v[k]))/(2*q-2*v[k])}k++;v[k]=q;z[k]=s;z[k+1]=1e20}
  for(k=0,q=0;q<n;q++){while(z[k+1]<q)k++;o[q]=(q-v[k])*(q-v[k])+f[v[k]]}}
 function boxb(a,w,h,r){var b=new Float32Array(w*h),x,y,i,s;for(y=0;y<h;y++){for(x=0;x<w;x++){s=0;for(i=-r;i<=r;i++)s+=a[y*w+Math.min(w-1,Math.max(0,x+i))];b[y*w+x]=s/(2*r+1)}}
  for(x=0;x<w;x++){for(y=0;y<h;y++){s=0;for(i=-r;i<=r;i++)s+=b[Math.min(h-1,Math.max(0,y+i))*w+x];a[y*w+x]=s/(2*r+1)}}}
 /* bar outline: coverage mask, v93 strokes (premultiplied), geometry (distance to the edge in px at 3x, edge angle, inward normal) */
 function shape(){var w=cv.width,h=cv.height,d=w/BWX,c,x,i,j;
  c=cnv(w,h);x=c[1];x.fillStyle='#fff';x.fill(new Path2D(bpath(BW,BH,0,0)));
  var cov=x.getImageData(0,0,w,h).data;
  var P2=2,W2=w+2*P2,H2=h+2*P2,f=new Float64Array(W2*H2),o=new Float64Array(Math.max(W2,H2)),fi=new Float64Array(Math.max(W2,H2)),v=new Int32Array(Math.max(W2,H2)),z=new Float64Array(Math.max(W2,H2)+1),xx,yy;
  for(yy=0;yy<h;yy++)for(xx=0;xx<w;xx++)if(cov[(yy*w+xx)*4+3]>=128)f[(yy+P2)*W2+xx+P2]=1e20;
  for(xx=0;xx<W2;xx++){for(yy=0;yy<H2;yy++)fi[yy]=f[yy*W2+xx];edt1(fi,H2,o,v,z);for(yy=0;yy<H2;yy++)f[yy*W2+xx]=o[yy]}
  for(yy=0;yy<H2;yy++){for(xx=0;xx<W2;xx++)fi[xx]=f[yy*W2+xx];edt1(fi,W2,o,v,z);for(xx=0;xx<W2;xx++)f[yy*W2+xx]=o[xx]}
  var dist=new Float32Array(w*h),sm,out=new Uint8Array(w*h*4),k=3/d;
  for(yy=0;yy<h;yy++)for(xx=0;xx<w;xx++)dist[yy*w+xx]=Math.sqrt(f[(yy+P2)*W2+xx+P2]);
  sm=new Float32Array(dist);boxb(sm,w,h,Math.max(1,Math.round(d)));boxb(sm,w,h,Math.max(1,Math.round(d)));
  for(yy=0;yy<h;yy++)for(xx=0;xx<w;xx++){i=yy*w+xx;var a=cov[i*4+3]/255,t=dist[i]>0?dist[i]-.5-(1-a):0;if(t<0)t=0;
   var gx=sm[yy*w+Math.min(w-1,xx+1)]-sm[yy*w+Math.max(0,xx-1)],gy=sm[Math.min(h-1,yy+1)*w+xx]-sm[Math.max(0,yy-1)*w+xx],gl=Math.sqrt(gx*gx+gy*gy)||1;gx/=gl;gy/=gl;
   out[i*4]=Math.min(255,Math.round(t*k*4));out[i*4+1]=Math.round(Math.atan2(Math.abs(gy),Math.abs(gx))/(Math.PI/2)*255);out[i*4+2]=Math.round((gx*.5+.5)*255);out[i*4+3]=Math.round((gy*.5+.5)*255)}
  g.bindTexture(g.TEXTURE_2D,T.ge);g.texImage2D(g.TEXTURE_2D,0,g.RGBA,w,h,0,g.RGBA,g.UNSIGNED_BYTE,out);
  capC=cnv(w,h);capKey='';lastKey=''}
 function size(){var d=Math.min(3,Math.max(1,DPR||2)),w=Math.round(BWX*d),h=Math.round(BHX*d);if(cv.width!==w||cv.height!==h||d!==dpr){cv.width=w;cv.height=h;dpr=d;shape();try{paint()}catch(_){}}}
 /* selected-tab capsule (it moves): its coverage is drawn here, the shader darkens the glass under it like iOS (0.867 brightness, 1.2 colour) */
 M.caps=function(cx,hw,hh,a){if(!M.on||!capC)return;var k=[cx,hw,hh,a].map(function(n){return n.toFixed(3)}).join();if(k===capKey)return;capKey=k;
  var x=capC[1];x.clearRect(-MP,-MP,BWX,BHX);if(a>.002){x.globalAlpha=a;x.fillStyle='#fff';x.fill(new Path2D(path(2*hw,2*hh,cx-hw,BH/2-hh)));x.globalAlpha=1}upl(T.cp,capC[0],0);capVer++;kick(60)};
 /* iOS 27 «Tinted» tab bar measured per pixel (simulator, 3x, bar + 4 pt): left 142 columns + middle column; right side is the mirror.
    rows 0..209: R = A+64, G = Kl*200, B = Kc*150; rows 210..419: R = (beta+0.1)*200 */
 var RIM='data:image/png;base64,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';
 function rimMap(cb){var im=new Image();im.onload=function(){try{var c=document.createElement('canvas');c.width=im.width;c.height=im.height;var x=c.getContext('2d');x.drawImage(im,0,0);
   var d=x.getImageData(0,0,im.width,im.height).data,cw=im.width,rh=im.height/2,W3=BWX*3,out=new Uint8Array(W3*rh*4),L=cw-1,X,y,sx,i,j;
   for(y=0;y<rh;y++)for(X=0;X<W3;X++){sx=X<L?X:(X>=W3-L?W3-1-X:L);i=(y*cw+sx)*4;j=(y*W3+X)*4;out[j]=d[i];out[j+1]=d[i+1];out[j+2]=d[i+2];out[j+3]=d[((y+rh)*cw+sx)*4]}
   g.bindTexture(g.TEXTURE_2D,T.mp);g.texImage2D(g.TEXTURE_2D,0,g.RGBA,W3,rh,0,g.RGBA,g.UNSIGNED_BYTE,out);cb(true)}catch(e){M.err='rim '+e;cb(false)}};im.onerror=function(){cb(false)};im.src=RIM}
 function init(){
  if(BASIC||/[?&]itbglass=0/.test(location.search)||!window.Path2D||!window.Float32Array)return false;
  cv=document.createElement('canvas');cv.className='gl';cv.setAttribute('aria-hidden','true');cv.style.cssText='left:'+(-MP)+'px;top:'+(-MP)+'px;width:'+BWX+'px;height:'+BHX+'px';
  g=cv.getContext('webgl',{alpha:true,premultipliedAlpha:true,antialias:false,depth:false,stencil:false,preserveDrawingBuffer:false})||cv.getContext('experimental-webgl');
  if(!g)return false;
  P.c=prog(FC);P.b=prog(FB);P.o=prog(FO);
  var vb=g.createBuffer();g.bindBuffer(g.ARRAY_BUFFER,vb);g.bufferData(g.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),g.STATIC_DRAW);g.enableVertexAttribArray(0);g.vertexAttribPointer(0,2,g.FLOAT,false,0,0);
  T.s=tx(1,1,1);g.texImage2D(g.TEXTURE_2D,0,g.RGBA,1,1,0,g.RGBA,g.UNSIGNED_BYTE,new Uint8Array([0,0,0,255]));
  T.c=tx(TW,TH,1);T.t=tx(TW,TH,1);T.b=tx(TW,TH,1);F.c=fb(T.c);F.t=fb(T.t);F.b=fb(T.b);
  T.ge=tx(0,0,0);T.cp=tx(0,0,1);g.texImage2D(g.TEXTURE_2D,0,g.RGBA,1,1,0,g.RGBA,g.UNSIGNED_BYTE,new Uint8Array(4));
  var i,a=new Uint8Array(256);T.l=tx(0,0,1);for(i=0;i<256;i++)a[i]=Math.round(LUT[i]);g.texImage2D(g.TEXTURE_2D,0,g.ALPHA,256,1,0,g.ALPHA,g.UNSIGNED_BYTE,a);
  T.mp=tx(0,0,1);g.texImage2D(g.TEXTURE_2D,0,g.RGBA,1,1,0,g.RGBA,g.UNSIGNED_BYTE,new Uint8Array([64,0,0,255]));
  T.dx=tx(0,0,1);g.texImage2D(g.TEXTURE_2D,0,g.ALPHA,64,1,0,g.ALPHA,g.UNSIGNED_BYTE,new Uint8Array(DT));
  g.bindFramebuffer(g.FRAMEBUFFER,null);g.disable(g.BLEND);
  cv.addEventListener('webglcontextlost',function(e){e.preventDefault();off()});
  $('glass').appendChild(cv);size();return true}
 /* Safari hands the scroll position to scripts 1-2 frames after the page has moved. A careful prediction: only while the
    scroll speed is steady for a few frames, off while the menu itself moves (Safari's toolbar), zero as soon as a frame
    brings no change (a sudden stop). ?lat=<seconds> in the address overrides the default (0 = off). */
 var sv={y:0,t:0,v:0,n:0,tb:-1e4,bt:null},LAT=(function(){var m=/[?&]lat=([\d.]+)/.exec(location.search);return m?+m[1]:.02})();
 function scrollY(now){var y=window.pageYOffset||0;
  if(y!==sv.y){var dt=(now-sv.t)/1000,dy=y-sv.y;
   if(sv.t&&dt>0&&dt<.05&&Math.abs(dy)<400&&now-sv.tb>120){var vv=dy/dt,ok=sv.v&&(vv>0)===(sv.v>0)&&Math.abs(vv-sv.v)<Math.abs(sv.v)*.5+300;sv.n=ok?sv.n+1:0;sv.v=sv.v&&ok?sv.v*.5+vv*.5:vv}else{sv.v=0;sv.n=0}
   sv.y=y;sv.t=now}
  else if(now-sv.t>30){sv.v=0;sv.n=0}
  if(!LAT||sv.n<2)return y;var m=document.documentElement.scrollHeight-window.innerHeight;return y<0||y>m?y:Math.max(0,Math.min(m,y+sv.v*LAT))}
 function qOf(e,y){return e?[(window.pageXOffset||0),y-e.y0,e.w||1,e.h||1]:[0,-1e5,1,1]}
 function draw(r,now,fd){var y=scrollY(now),q=qOf(cur,y),q2=qOf(prv||cur,y),o=P.o,t1=cur?cur.t:T.s,t2=prv?prv.t:t1;
  g.useProgram(P.c);g.bindFramebuffer(g.FRAMEBUFFER,F.c);g.viewport(0,0,TW,TH);
  g.activeTexture(g.TEXTURE1);g.bindTexture(g.TEXTURE_2D,t2);g.uniform1i(U(P.c,'S2'),1);g.activeTexture(g.TEXTURE0);g.bindTexture(g.TEXTURE_2D,t1);g.uniform1i(U(P.c,'S'),0);
  g.uniform4f(U(P.c,'R'),r.left,r.top,r.width,r.height);g.uniform4f(U(P.c,'Q'),q[0],q[1],q[2],q[3]);g.uniform4f(U(P.c,'Q2'),q2[0],q2[1],q2[2],q2[3]);g.uniform1f(U(P.c,'FD'),fd);g.uniform1f(U(P.c,'G'),GAM);g.drawArrays(g.TRIANGLE_STRIP,0,4);
  g.useProgram(P.b);g.uniform1fv(U(P.b,'W'),KW);g.uniform1i(U(P.b,'T'),0);
  g.bindFramebuffer(g.FRAMEBUFFER,F.t);g.bindTexture(g.TEXTURE_2D,T.c);g.uniform2f(U(P.b,'D'),1/TW,0);g.drawArrays(g.TRIANGLE_STRIP,0,4);
  g.bindFramebuffer(g.FRAMEBUFFER,F.b);g.bindTexture(g.TEXTURE_2D,T.t);g.uniform2f(U(P.b,'D'),0,1/TH);g.drawArrays(g.TRIANGLE_STRIP,0,4);
  g.useProgram(o);g.bindFramebuffer(g.FRAMEBUFFER,null);g.viewport(0,0,cv.width,cv.height);
  var L=[['S',t1],['B',T.b],['L',T.l],['GE',T.ge],['DX',T.dx],['CP',T.cp],['MPX',T.mp]];
  for(var i=0;i<L.length;i++){g.activeTexture(g.TEXTURE0+i);g.bindTexture(g.TEXTURE_2D,L[i][1]);g.uniform1i(U(o,L[i][0]),i)}g.activeTexture(g.TEXTURE0);
  g.uniform4f(U(o,'R'),r.left,r.top,r.width,r.height);g.uniform4f(U(o,'Q'),q[0],q[1],q[2],q[3]);g.uniform1f(U(o,'G'),GAM);g.uniform1f(U(o,'A'),SHARP);
  g.drawArrays(g.TRIANGLE_STRIP,0,4)}
 function frame(now){raf=0;if(!M.on)return;try{var fd=1;if(prv){fd=Math.min(1,(now-fT0)/fDur);fd=fd*fd*(3-2*fd);if(now-fT0>=fDur){var p0=prv;prv=null;free(p0);fd=1}}
  var r=barEl.getBoundingClientRect();if(sv.bt!==null&&Math.abs(r.top-sv.bt)>.5){sv.tb=now;sv.v=0;sv.n=0}sv.bt=r.top;var k=[r.left,r.top,r.width,r.height,window.pageXOffset,window.pageYOffset,cur?cur.ver:0,dpr,capVer,sv.v?now:0,fd.toFixed(3)].join();
  if(k!==lastKey){lastKey=k;draw(r,now,fd)}}catch(e){M.err='draw '+e;off();return}
  if(performance.now()<until||prv)raf=requestAnimationFrame(frame)}
 function kick(ms){if(!M.on)return;until=Math.max(until,performance.now()+(ms||300));if(!raf)raf=requestAnimationFrame(frame)}
 /* page pictures: one per screen of #app (the 4 tabs), with the page's own CSS and animations stopped at their end state.
    Other screens are taken in advance while nothing happens, so a tab switch has its picture at once; a new picture
    always fades in over 0.2-0.35 s. Taking one costs a moment on a phone: not while a finger is down or the page
    scrolls, but an outdated picture is replaced at most 1.5 s later anyway. Card shapes (SVG backgrounds) are left to
    their CSS colour + radius, so a picture is complete at once. */
 function esc(t){return t.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}
 function liveScr(){var a=document.querySelector('#app .scr.on');return a?+a.getAttribute('data-scr')||0:0}
 function nScr(){var n=document.querySelectorAll('#app .scr').length;return n||1}
 function used(e){if(!e)return false;if(e===cur||e===prv)return true;for(var k in SN)if(SN[k]===e)return true;return false}
 function free(e){if(e&&!used(e))try{g.deleteTexture(e.t)}catch(_){}}
 function show(e,dur){if(!e||e===cur)return;if(cur&&dur>0){var p0=prv;prv=cur;free(p0);fT0=performance.now();fDur=dur}cur=e;M.ver++;kick(dur+120)}
 M.screen=function(i){if(!M.on)return;curScr=i;if(SN[i])show(SN[i],350);else{dirty[i]=1;dirtyAt=dirtyAt||performance.now();sched(0)}};
 function pick(){var now=performance.now(),idle=!touching&&now-lastScroll>400,i,n=nScr();curScr=liveScr();
  if(!SN[curScr])return curScr;
  if(dirty[curScr])return idle||now-dirtyAt>1500?curScr:-2;
  if(!idle)return -1;
  for(i=0;i<n;i++)if(!SN[i]||dirty[i])return i;return -1}
 function take(){st=0;if(!M.on)return;if(busy){again=1;return}var which=pick();if(which===-2){st=setTimeout(take,250);return}if(which<0)return;
  var app=document.getElementById('app');if(!app)return;busy=true;var t0=performance.now(),live=which===liveScr();delete dirty[which];if(!Object.keys(dirty).length)dirtyAt=0;
  try{var de=document.documentElement,W=de.clientWidth,ar=app.getBoundingClientRect(),y0=ar.top+(window.pageYOffset||0),H,
   li=app.querySelectorAll('input,textarea,select'),cl=app.cloneNode(true),ci=cl.querySelectorAll('input,textarea,select'),i,css='',xs=new XMLSerializer();
   for(i=0;i<li.length&&i<ci.length;i++){if(li[i].type==='checkbox'||li[i].type==='radio'){if(li[i].checked)ci[i].setAttribute('checked','');else ci[i].removeAttribute('checked')}else ci[i].setAttribute('value',li[i].value)}
   var sc=cl.querySelectorAll('.scr');for(i=0;i<sc.length;i++){if((+sc[i].getAttribute('data-scr')||0)===which){if(!/(^|\s)on(\s|$)/.test(sc[i].className))sc[i].className+=' on'}else sc[i].parentNode.removeChild(sc[i])}
   var bi=cl.querySelectorAll('[style*="url("]');for(i=0;i<bi.length;i++){var es=bi[i].style;es.backgroundImage='';es.backgroundSize='';es.backgroundRepeat='';if(es.backgroundColor==='transparent')es.backgroundColor=''}
   if(live)H=Math.max(1,Math.ceil(ar.height));
   else{var box=document.createElement('div');box.setAttribute('aria-hidden','true');box.style.cssText='position:absolute;left:-30000px;top:0;width:'+W+'px;visibility:hidden;pointer-events:none';
    box.appendChild(cl);document.body.appendChild(box);H=Math.max(1,Math.ceil(cl.getBoundingClientRect().height));document.body.removeChild(box);box.removeChild(cl)}
   var ss=document.querySelectorAll('style');for(i=0;i<ss.length;i++)if(ss[i].id!=='itb-css')css+=ss[i].textContent;
   /* sharper picture through a CSS scale inside: Safari does not scale foreignObject content by the SVG viewBox */
   var sp=document.querySelector('body>svg'),s=Math.max(.2,Math.min(1.5,window.devicePixelRatio||1,(M.max||4096)/W,(M.max||4096)/H,Math.sqrt(6e6/(W*H)))),PW=Math.floor(W*s),PH=Math.min(M.max||4096,Math.floor(H*s));s=PW/W;
   css+='*,*::before,*::after{animation:none!important;transition:none!important;caret-color:transparent!important}html,body{margin:0;width:'+PW+'px;height:'+PH+'px;overflow:hidden;background:#000}body::before{display:none}';
   var str='<svg xmlns="http://www.w3.org/2000/svg" width="'+PW+'" height="'+PH+'"><foreignObject x="0" y="0" width="'+PW+'" height="'+PH+'">'+
    '<html xmlns="http://www.w3.org/1999/xhtml"><head><style>'+esc(css)+'</style></head><body class="'+esc(document.body.className)+'"><div style="position:relative;width:'+W+'px;height:'+H+'px;transform:scale('+s+');transform-origin:0 0">'+(sp?xs.serializeToString(sp):'')+xs.serializeToString(cl)+'</div></body></html></foreignObject></svg>';
   var hasImg=!!cl.querySelector('img'),im=new Image();M.st.take=Math.round(performance.now()-t0);t0=performance.now();
   im.onload=function(){M.st.load=Math.round(performance.now()-t0);M.img=im;
    var put=function(src){requestAnimationFrame(function(){var t1=performance.now(),e;
     try{if(M.on){e={t:tx(0,0,1),y0:y0,w:W,h:H,ver:(M.st.n++)};upl(e.t,src,0);var old=SN[which];SN[which]=e;if(which===curScr)show(e,cur?220:0);free(old)}}catch(x){M.err='tex '+x}
     M.st.up=Math.round(performance.now()-t1);
     /* <img> inside the picture decode a moment later (none on the bank page): upload once more */
     if(hasImg&&e)setTimeout(function(){try{if(M.on&&SN[which]===e){upl(e.t,im,0);e.ver++;M.ver++;kick(60)}}catch(_){}done()},350);else done();
     if(/[?&]glsdump/.test(location.search)&&which===curScr){dump(im,y0,W,H);stat()}})};
    /* decode off the main thread where the browser can */
    if(window.createImageBitmap&&!hasImg)createImageBitmap(im).then(put,function(){put(im)});else put(im)};
   im.onerror=function(){M.err='img';done()};im.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(str)}catch(e){M.err='snap '+e;done()}}
 /* checking aid (only with ?glsdump on the local test server): send the page picture to compare it with the screen */
 function dump(im,y0,W,H){try{var c=document.createElement('canvas');c.width=im.width;c.height=im.height;c.getContext('2d').drawImage(im,0,0);var x=new XMLHttpRequest();x.open('POST','/glsdump?y0='+y0+'&w='+W+'&h='+H+'&sy='+(window.pageYOffset||0));x.send(c.toDataURL('image/png'))}catch(_){}}
 function stat(){try{var x=new XMLHttpRequest();x.open('POST','/glsstat');x.send(JSON.stringify({n:M.st.n,take:M.st.take,load:M.st.load,up:M.st.up,ver:M.ver,err:M.err,why:M.why,t:Math.round(performance.now())}))}catch(_){}}
 function done(){busy=false;var w=pick();if(again||w!==-1){again=0;sched(w===curScr?60:250)}}
 function sched(ms){if(!M.on)return;if(st)clearTimeout(st);st=setTimeout(take,ms==null?200:ms)}
 function strip(s){return (s||'').replace(/(^|\s)down(?=\s|$)/g,' ').replace(/\s+/g,' ').trim()}
 function on(){var gs=$('glass').style;gs.clipPath=gs.webkitClipPath='none';gs.webkitMaskImage=gs.maskImage='none';gs.background='transparent';$('edge').style.display='none';cv.style.display='';M.on=true;lastKey='';try{paint()}catch(_){}kick(100)}
 function off(){M.on=false;try{$('edge').style.display='';paintBar(0);glassClip();if(cv)cv.style.display='none';paint()}catch(_){}}
 M.kick=kick;M.snap=sched;M.off=off;M.size=function(){if(M.on){size();kick(100)}};
 M.start=function(){try{if(!init())return;M.max=g.getParameter(g.MAX_TEXTURE_SIZE);rimMap(function(ok){if(ok)start2();else off()})}catch(e){M.err='start '+e;off()}};
 function start2(){try{on();
   var app=document.getElementById('app'),mo=function(rs){for(var i=0;i<rs.length;i++){var r=rs[i];if(r.type==='attributes'&&r.attributeName==='class'&&strip(r.oldValue)===strip(r.target.getAttribute('class')))continue;M.why=r.type+':'+(r.attributeName||'')+':'+(r.target.className||r.target.nodeName||'')+':'+String(r.oldValue).slice(0,40);var ls=liveScr();if(!dirty[ls]){dirty[ls]=1;dirtyAt=dirtyAt||performance.now()}if(r.target===document.body)for(var j=0;j<nScr();j++)dirty[j]=1;sched();return}};
   if(app&&window.MutationObserver){new MutationObserver(mo).observe(app,{subtree:true,childList:true,attributes:true,attributeOldValue:true,characterData:true});new MutationObserver(mo).observe(document.body,{attributes:true,attributeOldValue:true})}
   var tch=function(e){touching=e.touches?e.touches.length:0};['touchstart','touchend','touchcancel'].forEach(function(t){window.addEventListener(t,tch,{passive:true,capture:true})});
   window.addEventListener('scroll',function(){lastScroll=performance.now();kick(500)},{passive:true});window.addEventListener('resize',function(){for(var j=0;j<nScr();j++)dirty[j]=1;dirtyAt=performance.now();sched(250);kick(300)});sched(0)}catch(e){M.err='start '+e;off()}}
 return M})();

if(!BASIC)GLS.start();
})();
