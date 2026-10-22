/* Лаймо: меню (таб-бар) iOS 27 с жидким стеклом. Подключается в конце страницы: <div class="dock" id="dock"></div><script src="menu.js?v=N"></script>.
   Связь со страницей: страница задаёт window.ITBH={sel:function(i){},ready:function(){}}, меню даёт window.ITB.set(i).
   Стекло видит содержимое #app (снимок страницы), всё остальное на странице (фиксированные слои) в нём не участвует. */
(function(){var d=document.getElementById('dock');if(!d||document.getElementById('itb-css'))return;var s=document.createElement('style');s.id='itb-css';s.textContent="#dock{color:#fff;font:14px/1.45 -apple-system,BlinkMacSystemFont,\"SF Pro Text\",\"Helvetica Neue\",system-ui,Roboto,\"Segoe UI\",Arial,sans-serif;letter-spacing:normal;-webkit-font-smoothing:antialiased;text-align:left}\n#dock .stage{position:relative;height:100%;box-sizing:border-box;padding-bottom:3px;display:flex;align-items:flex-end;justify-content:center;overflow:hidden}\n#dock .tbar{position:relative;width:360px;height:62px;flex:none;touch-action:none;-webkit-user-select:none;user-select:none;-webkit-tap-highlight-color:transparent;transform-origin:50% 50%;will-change:transform}\n#dock .glass,#dock .fl,#dock .edge{position:absolute;left:0;top:0;width:100%;height:100%}\n#dock .glass{background:#1c1c1c}\n#dock .fl{background:rgba(255,255,255,.075);opacity:0;will-change:opacity}\n#dock .edge{overflow:visible;pointer-events:none}\n#dock .gl{position:absolute;pointer-events:none}\n#dock .lensedge{opacity:0}\n#dock .tabs{position:absolute;left:0;top:0;width:100%;height:100%}\n#dock .tab{position:absolute;top:0;width:85.67px;height:62px;margin:0;padding:0;border:0;background:none;color:transparent;font:inherit;cursor:pointer;outline:0;-webkit-appearance:none;appearance:none}\n#dock .tab svg{position:absolute;overflow:visible}\n#dock .tab .lb{position:absolute;left:-10px;right:-10px;top:39.3px;text-align:center;font-size:10px;line-height:12px;font-weight:500;white-space:nowrap;letter-spacing:.01em}\n#dock .tbar.basic .tab{color:#fff}\n#dock .tbar.basic .tab.on{color:#b6d70a}\n#dock .tbar.basic .tab.on::before{content:\"\";position:absolute;left:-4.67px;right:-4.67px;top:4px;bottom:4px;border-radius:27px;background:#070707}\n#dock .tab:focus-visible{outline:2px solid rgba(255,255,255,.6);outline-offset:-6px;border-radius:30px}";document.head.appendChild(s);d.innerHTML="<div class=\"stage\" id=\"itb-stage\"><div class=\"tbar\" id=\"itb-bar\"><div class=\"glass\" id=\"itb-glass\"></div><svg class=\"edge\" id=\"itb-edge\" aria-hidden=\"true\"></svg><div class=\"fl\" id=\"itb-fl\"></div><canvas class=\"gl\" id=\"itb-base\" aria-hidden=\"true\"></canvas><canvas class=\"gl lensedge\" id=\"itb-lensedge\" aria-hidden=\"true\"></canvas><div class=\"tabs\" id=\"itb-tabs\" role=\"tablist\"></div></div></div>"})();
(function(){
'use strict';
var ICONS={"home":{"w":86,"h":81,"d":"M67 77.5l-3 .3-11 0-2-.3-1-.7-.4-.8-.1-2-.1-15-.1-2-.6-1-.9-1-.8-.5-1-.1-8 0-2 .4-.9 1.2-.4 1-.2 2-.1 15-.3 2-1.1 1.4-1 .3-12 .1-3-.3-1-.3-2-1-2-2.2-.5-1-.5-2-.2-2 0-18-.3-3-.5-.6-4-1.1-2-1.6-.5-.7-.9-2-.2-2 .3-2 1-2 .9-1 23.4-22.3 3-2.6 5.3-5.1 1.7-1.3 2-.9 3-.1 2 .6 2 1.2 28 26.5 3 3.1 1 .7 1.7 2.2 .5 1 .3 2-.2 2-.9 2-1.4 1.5-1 .7-4 1.1-.6 .7-.2 1 0 20-.2 1.8-.7 2.2-1.3 1.9-2 1.7zM66 73.1l1.5-1.1 .9-2 .2-24 .3-2 1.1-1 1-.3 4-.2 1-.4 .6-1.1 .1-1-.2-1-1.8-2-29.7-28.1-2-1.5-1-.2-1 .2-1 .5-28.6 27.1-3.4 3.3-.5 .7-.3 1 .1 1 .7 1.2 2 .5 3 0 1 .5 .9 .8 .5 1 .1 23 .2 3 .6 1 1.7 1.2 4 .2 7-.1 .2-.3 .2-1 .2-15 .2-1 .9-2 1.3-1.7 2-1.5 1-.3 5-.6 5 .1 2 .1 2 .4 2 1.1 1.5 1.4 1 2 .7 4 .1 11 .1 2 .3 1 1.3 .4 8 0z"},"bars":{"w":92,"h":78,"d":"M54 74.3l-3 .2-12 0-2-.1-2.1-1.4-1.1-2-.3-3 .1-61 .1-1 .9-2 1.4-1.2 2-.3 16 0 1 .3 1.3 1.2 .7 1 .3 1 0 64-.3 1.5-1 1.5zM51 69.6l1-.3 .3-.3 .1-1 0-60-.4-.6-1-.5-11 0-1 .5-.4 .6 0 61 .4 .3 1 .3zM85 74.2l-2 .3-15-.1-1-.3-1.5-1.1-.8-1-.3-1-.2-3 0-41 .2-1 .4-1 .9-1 2.3-1.4 3-.1 11 0 2 .1 2.4 1.4 .8 1 .7 2 .1 2 0 40-.3 2-.4 1-.7 1zM82 69.5l.9-.5 .1-1 0-39-.2-1-.8-.4-12 0-.7 .4-.1 1 .1 40 .7 .6zM24 74.1l-1 .3-16 .1-1-.3-1-.7-1.4-1.5-.3-1-.2-2 0-22 .6-2 .8-1 1.5-1.1 1-.3 2-.2 13 .1 1 .1 1 .4 1.4 1 .8 1 .4 1 .2 2 0 22-.6 2-.7 1zM21 69.5l.7-.5 .2-1 0-19-.2-1-.7-.4-1-.1-11 0-.8 .5-.1 1 .1 20 .8 .6z"},"wallet":{"w":84,"h":79,"d":"M73.4 71l-1.7 2-1.7 1.2-2.3 .8-1.7 .3-54 0-4-1-1-.7-1.8-1.6-1.3-2-.9-2.4-.2-1.6 0-38 .2-1 .8-2 1.1-2 1.1-1.2 1.1-.8 2.9-1.3 8-.4 17-14.6 2-1.2 1-.2 2-.2 2 .4 1 .4 2 1.7 4 4.6 1 .7 1-.1 6-1.9 1-.1 1.7 .2 2.3 1 1.1 1 1.3 2 2.1 6 4.2 2 1.3 1 1.5 2 .8 2 .2 1 .1 7 1.1 1 2 1 1.1 1 .8 1 .6 2 .1 13-.1 2-.8 2-.9 1-1.5 1.2-2 .8-.4 1-.1 7zM27.2 18l.8 .7 2-.4 11-3.9 3.4-1.4-.3-1-2.6-3-1.5-.9-1 0-1.5 .9zM61 19l-.4-2-.8-2-.8-1-1-.3-12 4.1-2.5 1.2 2.5 .4 14 0zM68.8 69l.6-1 .3-2 0-5-.7-1-1-.1-13-.1-3-.4-2-1.4-.8-1-.9-2-.3-2 0-12 .9-3 .8-1 1.3-1.2 2-.9 1-.2 15-.2 .6-.5 .1-6-.2-1-.5-.9-1.1-1.1-.9-.4-5-.2-50 .1-1 .1-1 .3-1.2 1.1-.5 1-.3 2 0 37 .4 2 .6 1 2 1.3 1 .1 52 0 3-.2zM75.4 54l.2-1 0-11-.1-1-.8-1-.7-.3-19-.1-1 .2-1 1.2-.1 12 .2 1 .9 .7 2 .3 17 0 1-.1zM61 50l-1-.3-1-.7-.5-1 0-1 .5-1.2 1-.9 1-.2 1 .1 1.4 1.2 .3 1-.1 1-.4 1-1.2 .8z"},"chat":{"w":79,"h":78,"d":"M12 74l-1-.6-.3-.4-.3-1 .1-4 .5-6-.1-1-.4-1-3.8-6-2.1-5-1-4-.4-6 .3-6 1.1-5 1-3 1.3-3 1.7-3 2.1-3 2.7-3 2.6-2.3 6-4 4-1.9 3-1.1 5-1.1 9-.1 2 .3 4 .9 3 1.1 4 1.8 2 1.2 4 2.9 4.4 4.3 2.9 4 1.7 3 1.4 3 1 3 1 4 .4 6-.5 7-1 4-1.1 3-1.9 4-2 3-4.3 5-4 3.4-3 1.9-4 2-6 2-6 .8-4 .1-6-.9-7-2.2-3 .6-5 1.6-3 .8zM16 68.2l5-1.5 3-.7 2 .5 2 .9 3 1 5 .9 6 0 5-.9 3-1 3-1.3 3-1.7 4-3.1 2.3-2.3 3-4 1.7-3.1 1.3-2.9 .9-3 .9-5 .1-3-.1-2-.7-5-1.3-4-.8-2-1.1-2-1.9-3-3.3-3.8-4-3.5-5-2.8-3-1.3-3-.8-5-.6-2-.1-7 .6-3 .9-3 1.2-2 1-3 2-4 3.5-3.3 3.7-2 3-1 2-.9 2-1 3-.9 5-.1 4 .8 6 1.1 4 1.3 2.9 1.7 3.1 2.8 4 .2 1-.3 7 .3 1zM27 42.4l-2 .5-1-.1-2-.6-1.2-1.2-.8-2-.1-1 .6-2 .5-.7 2-1.5 2-.3 1 .2 2.1 1.3 1.2 2 .1 2-.4 1-.5 1zM41 42.5l-2 .4-2-.4-1-.7-1.4-1.8-.2-2 .4-2 1.2-1.4 1-.7 1-.3 2 0 1 .3 1 .7 1.2 1.4 .4 2-.2 2-1.4 1.8zM56 42.2l-2 .6-2-.1-1-.4-1-.8-1-1.6-.3-.9 .1-2 1.2-2 2-1.3 2-.2 1 .2 1.8 1.3 .7 1 .6 2-.1 1-.7 2z"}};
var LABELS=['Главная','Тариф','Расходы','Поддержка'];
var SPEC={"rim":[[0,0.26],[0.004,0.202],[0.01,0.234],[0.022,0.192],[0.03,0.131],[0.04,0.124],[0.05,0.139],[0.08,0.109],[0.2,0.081],[0.25,0.04],[0.3,0.04],[0.4,0.002],[0.6,0.003],[0.85,0.068],[0.94,0.124],[0.97,0.125],[0.978,0.184],[0.996,0.19],[1,0.25]],"dark":[[0,0.0],[0.08,0.0],[0.1,0.171],[0.125,0.171],[0.15,0.283],[0.2,0.317],[0.25,0.267],[0.3,0.475],[0.4,0.536],[0.5,0.669],[0.7,0.472],[0.75,0.355],[0.8,0.32],[0.85,0.24],[0.875,0.214],[0.9,0.237],[0.92,0.067],[0.94,0.0],[0.95,0.109],[0.97,0.0],[0.996,0.0],[1,0.141]]};
/* tab layout of iOS 27 for these four labels (test app with the same titles, 22.10.2026): capsule 99.2 x 53.9 pt, centres
   53.49 + 84.227*i pt from the bar edge (v93-v102: 51.5 + 85.67*i, capsule 95 — measured with the English Fitness labels) */
var BW=360,BH=62.0,CX0=53.64,PITCH=84.227;
var PW=99.55,PH=54,LW=123.6,HMAX=60,LH=60,LHT=59;
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
/* ---------- liquid glass v99 (iOS 27 tab bar, «Tinted», measured on a real iOS tab bar: tools/glass-app, CLAUDE.md).
   On a phone Safari tells scripts the scroll position only ~10 times a second while the page scrolls, so the glass can
   not be drawn by a script every frame. Here the glass picture is computed for the WHOLE page in advance (blur, brightness
   curve, colour like iOS), once per screen and change, and Safari itself moves it with the page (CSS scroll-driven
   animation runs on Safari's scrolling thread: page and glass move in the same frame even when scripts are busy).
   Everything bar-related is static compositor layers on top: refraction bands (scaled copies of the glass picture near
   the edge), the per-pixel iOS rim (multiply / plus-lighter / plus-darker / saturate), the capsule (backdrop-filter). ---------- */
GLS=(function(){
 var M={on:false,err:'',ver:0,st:{n:0,take:0,load:0,up:0},kick:function(){},snap:function(){},caps:function(){},screen:function(){},size:function(){}},
  g,cv,P={},T={},F={},SN={},SNS={},curScr=0,cur=null,dirty={},dirtyAt=0,busy=false,again=0,st=0,touching=0,lastScroll=-1e4,
  WIN=null,IMGS=[],GPG=[],LENS=[],CAP=null,geo={l:0,t:0,f:1},capKey='',
  SDA=!!(window.CSS&&CSS.supports&&CSS.supports('animation-timeline','scroll()'));
 var MP=4,BWX=BW+2*MP,BHX=BH+2*MP,GAM=.932,GR=.5,SMAX=1.6;
 var LUT=[32.0,32.5,33.0,33.5,34.0,34.5,35.0,35.5,36.0,36.5,37.0,37.5,38.0,38.5,39.0,39.5,40.0,40.4,40.8,41.1,41.5,41.9,42.2,42.6,43.0,43.5,44.0,44.5,45.0,45.5,46.0,46.5,47.0,47.5,48.0,48.5,49.0,49.5,50.0,50.5,51.0,51.4,51.7,52.1,52.5,52.9,53.2,53.6,54.0,54.4,54.8,55.1,55.5,55.9,56.2,56.6,57.0,57.5,58.0,58.5,59.0,59.5,60.0,60.5,60.9,61.3,61.7,62.1,62.5,62.9,63.2,63.6,64.0,64.4,64.8,65.1,65.5,65.9,66.2,66.6,67.0,67.4,67.8,68.1,68.5,68.9,69.2,69.6,70.0,70.4,70.7,71.1,71.5,71.8,72.2,72.6,72.9,73.2,73.5,73.7,74.0,74.2,74.5,74.7,75.0,75.4,75.8,76.1,76.5,76.9,77.2,77.6,78.0,78.4,78.7,79.1,79.4,79.8,80.1,80.5,80.9,81.1,81.4,81.7,81.9,82.2,82.5,82.7,83.0,83.2,83.5,83.8,84.0,84.2,84.5,84.8,85.0,85.4,85.7,86.1,86.4,86.8,87.2,87.5,87.9,88.1,88.4,88.7,88.9,89.2,89.4,89.7,90.0,90.2,90.5,90.7,91.0,91.2,91.5,91.7,92.0,92.2,92.5,92.7,93.0,93.2,93.5,93.7,94.0,94.2,94.4,94.7,94.9,95.2,95.4,95.6,95.9,96.0,96.1,96.3,96.4,96.6,96.7,96.9,97.0,97.2,97.5,97.8,98.0,98.2,98.5,98.8,99.0,99.2,99.4,99.7,99.9,100.1,100.3,100.6,100.8,100.9,101.1,101.2,101.4,101.5,101.7,101.8,102.0,102.1,102.2,102.4,102.5,102.6,102.8,102.9,103.0,103.2,103.5,103.7,103.9,104.1,104.4,104.6,104.8,105.0,105.1,105.2,105.4,105.5,105.6,105.8,105.9,106.0,106.2,106.3,106.4,106.5,106.7,106.8,106.9,107.1,107.2,107.3,107.4,107.5,107.7,107.8,107.9,107.9,107.9,107.9,108.0,108.0,108.0,108.0];
 var KW=[0.053062,0.052525,0.050948,0.048434,0.045138,0.041256,0.037001,0.032589,0.028214,0.024041,0.020192,0.016750,0.013753,0.011209,0.009093,0.007366,0.005977,0.004871,0.003995,0.003301,0.002749,0.002306,0.001945,0.001647,0.001398,0.001186,0.001006,0.000851,0.000717,0.000601,0.000502,0.000417,0.000344,0.000283,0.000231,0.000187,0.000151,0.000121,0.000097,0.000077];
 var RIM='data:image/png;base64,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';
 /* refraction: iOS samples the glass shifted along the edge normal (table D in CLAUDE.md). Here: copies of the glass picture
    scaled about the bar centre line (straight part) or the cap centre (ends), shown in bands by distance t from the edge (pt):
    [t0, t1, scale]; scale < 1 shows content from outside the bar (rim glow), > 1 magnifies (lens near the inner edge). */
 /* first three bands = the three outer device-pixel rows of iOS (sample 8.6 pt outside, 3.3 pt outside, 1 pt inside: table DT) */
 var BANDS=[[0,1/3,.779],[1/3,2/3,.8905],[2/3,1,1.0084],[1,5,1.059],[5,10,1.035],[10,20,1.015]],CAPC=40;
 function FEo(b){return b<=1.01?.12:.35}
 var VS='attribute vec2 p;varying vec2 v;void main(){v=p*.5+.5;gl_Position=vec4(p,0.,1.);}';
 var PR='#ifdef GL_FRAGMENT_PRECISION_HIGH\nprecision highp float;\n#else\nprecision mediump float;\n#endif\nvarying vec2 v;';
 var FD=PR+'uniform sampler2D S;uniform vec2 Z,D;uniform float G;void main(){vec2 u=v*Z;'+
  'vec3 c=.25*(texture2D(S,u+vec2(-D.x,-D.y)).rgb+texture2D(S,u+vec2(D.x,-D.y)).rgb+texture2D(S,u+vec2(-D.x,D.y)).rgb+texture2D(S,u+vec2(D.x,D.y)).rgb);gl_FragColor=vec4(pow(c,vec3(G)),1.);}';
 var FB=PR+'uniform sampler2D T;uniform vec2 D;uniform vec4 CL;uniform float W['+KW.length+'];vec4 S(vec2 p){return texture2D(T,clamp(p,CL.xy,CL.zw));}'+
  'void main(){vec4 c=W[0]*S(v);for(int i=1;i<'+KW.length+';i++){float f=float(i);c+=W[i]*(S(v+D*f)+S(v-D*f));}gl_FragColor=c;}';
 var TONE='const vec3 W7=vec3(.2126,.7152,.0722);uniform sampler2D L;uniform float G;vec3 tone(vec3 z){vec3 c=pow(max(z,vec3(0.)),vec3(1./G))*255.;float l=dot(c,W7);'+
  'float gv=texture2D(L,vec2((min(l,255.)+.5)/256.,.5)).a*255.;return gv+clamp(.6543-.000833*l,.4,.7)*(c-l);}';
 var FG=PR+'uniform sampler2D T;'+TONE+'void main(){gl_FragColor=vec4(clamp(tone(texture2D(T,v).rgb),0.,255.)/255.,1.);}';
 /* iOS sees only a window around the bar (15 pt above, 13.67 below, 15.67 to the sides, in 8 px cells) and repeats its edge
    cell outward. The page-wide picture cannot do that while Safari scrolls it, so the difference at the top and bottom edge
    is a separate picture per screen: rows = position of the window edge on the page, value = 64 + change of the glass if the
    edge cell (E) replaced what lies beyond the window (A), at the largest weight WM. On screen it is stretched from the
    window edge over the bar and weighted per row (plus-lighter, then -64 by a plus-darker layer). */
 var NA=40,FC=PR+'uniform sampler2D T,C;uniform vec2 E2;uniform float DIR,PY,SO,WM,AS,EG,AW['+NA+'];'+TONE+
  'void main(){vec3 e=.5*(texture2D(T,v+vec2(0.,DIR*E2.x*PY)).rgb+texture2D(T,v+vec2(0.,DIR*E2.y*PY)).rgb),a=vec3(0.);'+
  'for(int i=0;i<'+NA+';i++){a+=AW[i]*texture2D(T,v-vec2(0.,DIR*(float(i)+.5)*AS*PY)).rgb;}'+
  'vec3 u=texture2D(C,v+vec2(0.,DIR*SO*PY)).rgb;vec3 d=EG*4.*(tone(u+.25*WM*(e-a))-tone(u));gl_FragColor=vec4(clamp((64.+d)/255.,0.,1.),1.);}';
 function sh(t,s){var o=g.createShader(t);g.shaderSource(o,s);g.compileShader(o);if(!g.getShaderParameter(o,g.COMPILE_STATUS))throw g.getShaderInfoLog(o);return o}
 function prog(fs){var p=g.createProgram();g.attachShader(p,sh(g.VERTEX_SHADER,VS));g.attachShader(p,sh(g.FRAGMENT_SHADER,fs));g.bindAttribLocation(p,0,'p');g.linkProgram(p);if(!g.getProgramParameter(p,g.LINK_STATUS))throw g.getProgramInfoLog(p);p.u={};return p}
 function U(p,n){return p.u[n]||(p.u[n]=g.getUniformLocation(p,n))}
 function tx(w,h){var t=g.createTexture();g.bindTexture(g.TEXTURE_2D,t);g.texParameteri(g.TEXTURE_2D,g.TEXTURE_MIN_FILTER,g.LINEAR);g.texParameteri(g.TEXTURE_2D,g.TEXTURE_MAG_FILTER,g.LINEAR);
  g.texParameteri(g.TEXTURE_2D,g.TEXTURE_WRAP_S,g.CLAMP_TO_EDGE);g.texParameteri(g.TEXTURE_2D,g.TEXTURE_WRAP_T,g.CLAMP_TO_EDGE);if(w)g.texImage2D(g.TEXTURE_2D,0,g.RGBA,w,h,0,g.RGBA,g.UNSIGNED_BYTE,null);return t}
 function fbo(w,h){var t=tx(w,h),f=g.createFramebuffer();g.bindFramebuffer(g.FRAMEBUFFER,f);g.framebufferTexture2D(g.FRAMEBUFFER,g.COLOR_ATTACHMENT0,g.TEXTURE_2D,t,0);if(g.checkFramebufferStatus(g.FRAMEBUFFER)!==g.FRAMEBUFFER_COMPLETE)throw 'fbo';return {t:t,f:f,w:w,h:h}}
 function pass(p,o,w,h){g.useProgram(p);g.bindFramebuffer(g.FRAMEBUFFER,o?o.f:null);g.viewport(0,0,w,h);g.drawArrays(g.TRIANGLE_STRIP,0,4)}
 function init(){
  if(BASIC||/[?&]itbglass=0/.test(location.search)||!window.Path2D||!window.Float32Array||!window.URL||!URL.createObjectURL)return false;
  if(!(CSS.supports('-webkit-backdrop-filter','blur(1px)')||CSS.supports('backdrop-filter','blur(1px)'))||!CSS.supports('mix-blend-mode','plus-lighter'))return false;
  cv=document.createElement('canvas');cv.width=cv.height=4;
  g=cv.getContext('webgl',{alpha:false,antialias:false,depth:false,stencil:false,preserveDrawingBuffer:false})||cv.getContext('experimental-webgl');
  if(!g)return false;
  P.d=prog(FD);P.b=prog(FB);P.g=prog(FG);P.c=prog(FC);
  var vb=g.createBuffer();g.bindBuffer(g.ARRAY_BUFFER,vb);g.bufferData(g.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),g.STATIC_DRAW);g.enableVertexAttribArray(0);g.vertexAttribPointer(0,2,g.FLOAT,false,0,0);
  var i,a=new Uint8Array(256);T.l=tx(0,0);for(i=0;i<256;i++)a[i]=Math.round(LUT[i]);g.texImage2D(g.TEXTURE_2D,0,g.ALPHA,256,1,0,g.ALPHA,g.UNSIGNED_BYTE,a);
  T.s=tx(0,0);M.max=g.getParameter(g.MAX_TEXTURE_SIZE);g.disable(g.BLEND);
  cv.addEventListener('webglcontextlost',function(e){e.preventDefault();off()});return true}
 /* whole-page glass picture from the page picture (texture T.s, W x H CSS px): downsample to GR, blur, iOS brightness/colour */
 /* window of iOS around the bar in page px (set by take() from the bar position) */
 var WINP={l:0,r:1e5,f:1};
 function erfc(x){var z=Math.abs(x),t=1/(1+.5*z),r=t*Math.exp(-z*z-1.26551223+t*(1.00002368+t*(.37409196+t*(.09678418+t*(-.18628806+t*(.27886807+t*(-1.13520398+t*(1.48851587+t*(-.82215223+t*.17087277)))))))));return x>=0?r:2-r}
 function wTail(z){return .755*.5*erfc(z/13.26/Math.SQRT2)+.245*.5*erfc(z/25.7/Math.SQRT2)}   /* blur weight beyond z pt */
 /* EGAIN: measured iOS answer to a white edge cell is ~1.5x what the blur model gives (line tests 22.10.2026) */
 var WT0=15,WB0=BH+13.67,WMX=.37,EGAIN=+((/[?&]eg=([\d.]+)/.exec(location.search)||[])[1]||1.5);
 function glassOf(W,H,cb){var mx=M.max||4096,s=Math.min(GR,mx/H),sy=Math.min(1,mx/H),OW=Math.max(1,Math.ceil(W*s)),OH=Math.max(1,Math.ceil(H*s)),OY=Math.max(1,Math.ceil(H*sy)),OC=Math.max(1,Math.ceil(W*s/2)),
   A=fbo(OW,OY),B=fbo(OW,OY),C=fbo(OW,OY),R=fbo(OW,OH),Q=fbo(OC,OY),i,outs=[],f=WINP.f;
  /* the picture is worked at 2 pt across and 1 pt down (window edges need the finer rows); base glass 2 pt, edge pictures 4 x 1 pt */
  try{g.activeTexture(g.TEXTURE0);
   g.useProgram(P.d);g.bindTexture(g.TEXTURE_2D,T.s);g.uniform1i(U(P.d,'S'),0);g.uniform2f(U(P.d,'Z'),OW/s/W,OY/sy/H);g.uniform2f(U(P.d,'D'),.5/W,.5/H);g.uniform1f(U(P.d,'G'),GAM);pass(P.d,A,OW,OY);
   g.useProgram(P.b);g.uniform1fv(U(P.b,'W'),KW);g.uniform1i(U(P.b,'T'),0);
   /* across: only the window columns (edge column repeated, as iOS) */
   g.bindTexture(g.TEXTURE_2D,A.t);g.uniform4f(U(P.b,'CL'),Math.max(0,WINP.l/W),0,Math.min(1,WINP.r/W),1);g.uniform2f(U(P.b,'D'),1/OW,0);pass(P.b,B,OW,OY);
   g.bindTexture(g.TEXTURE_2D,B.t);g.uniform4f(U(P.b,'CL'),0,0,1,1);g.uniform2f(U(P.b,'D'),0,2*sy/OY);pass(P.b,C,OW,OY);
   var rd=function(F,w,h){var px=new Uint8Array(w*h*4);g.bindFramebuffer(g.FRAMEBUFFER,F.f);g.readPixels(0,0,w,h,g.RGBA,g.UNSIGNED_BYTE,px);g.bindFramebuffer(g.FRAMEBUFFER,null);outs.push([px,w,h])};
   g.useProgram(P.g);g.activeTexture(g.TEXTURE1);g.bindTexture(g.TEXTURE_2D,T.l);g.uniform1i(U(P.g,'L'),1);g.activeTexture(g.TEXTURE0);g.bindTexture(g.TEXTURE_2D,C.t);g.uniform1i(U(P.g,'T'),0);g.uniform1f(U(P.g,'G'),GAM);pass(P.g,R,OW,OH);rd(R,OW,OH);
   /* beyond-the-edge average A: 2 pt apart, weights = blur weight of the row 3 pt outside the bar (12 pt from the edge) */
   var tp=sy*f,dz=2,aw=[],sum=0;for(i=0;i<NA;i++){var z=(i+.5)*dz;aw.push(wTail(12+z-dz/2)-wTail(12+z+dz/2));sum+=aw[i]}for(i=0;i<NA;i++)aw[i]/=sum;
   g.useProgram(P.c);g.activeTexture(g.TEXTURE2);g.bindTexture(g.TEXTURE_2D,C.t);g.uniform1i(U(P.c,'C'),2);g.activeTexture(g.TEXTURE1);g.bindTexture(g.TEXTURE_2D,T.l);g.uniform1i(U(P.c,'L'),1);
   g.activeTexture(g.TEXTURE0);g.bindTexture(g.TEXTURE_2D,B.t);g.uniform1i(U(P.c,'T'),0);g.uniform1f(U(P.c,'G'),GAM);g.uniform1fv(U(P.c,'AW'),aw);g.uniform1f(U(P.c,'PY'),1/OY);g.uniform1f(U(P.c,'WM'),WMX);
   /* E: the edge cell (2.667 pt) sampled at 1/4 and 3/4 of it; offsets in texels (tp per pt) */
   g.uniform2f(U(P.c,'E2'),.6667*tp,2*tp);g.uniform1f(U(P.c,'AS'),dz*tp);g.uniform1f(U(P.c,'EG'),EGAIN);
   g.uniform1f(U(P.c,'DIR'),1);g.uniform1f(U(P.c,'SO'),(WT0+3)*tp);pass(P.c,Q,OC,OY);rd(Q,OC,OY);
   g.uniform1f(U(P.c,'DIR'),-1);g.uniform1f(U(P.c,'SO'),(WB0-BH+3)*tp);pass(P.c,Q,OC,OY);rd(Q,OC,OY)}
  finally{[A,B,C,R,Q].forEach(function(o){g.deleteFramebuffer(o.f);g.deleteTexture(o.t)})}
  var urls=[],k=0;
  /* PNG packing off the page thread when the browser can (it took ~100 ms per picture on the page thread) */
  if(enc()){var left=outs.length;outs.forEach(function(o,n){encW(o[0],o[1],o[2],function(u){urls[n]=u;if(--left===0)cb(urls,true)})});return}
  (function nx(){if(k>=outs.length){cb(urls,!!document.createElement('canvas').toBlob);return}var o=outs[k++],c=document.createElement('canvas');c.width=o[1];c.height=o[2];var x=c.getContext('2d'),id=x.createImageData(o[1],o[2]);id.data.set(o[0]);x.putImageData(id,0,0);
   if(c.toBlob)c.toBlob(function(b){urls.push(b?URL.createObjectURL(b):null);nx()},'image/png');else{urls.push(c.toDataURL('image/png'));nx()}})()}
 var EW=null,EWn=0,EWcb={},EWok=null;
 function enc(){if(EWok!==null)return EWok;EWok=false;try{if(!window.Worker||!window.OffscreenCanvas||!OffscreenCanvas.prototype.convertToBlob)return false;
   var src='onmessage=function(e){var d=e.data;try{var c=new OffscreenCanvas(d.w,d.h),x=c.getContext("2d");x.putImageData(new ImageData(new Uint8ClampedArray(d.b),d.w,d.h),0,0);c.convertToBlob({type:"image/png"}).then(function(b){postMessage({id:d.id,b:b})},function(){postMessage({id:d.id,b:null})})}catch(err){postMessage({id:d.id,b:null})}}';
   EW=new Worker(URL.createObjectURL(new Blob([src],{type:'text/javascript'})));EW.onmessage=function(e){var f=EWcb[e.data.id];delete EWcb[e.data.id];if(f)f(e.data.b?URL.createObjectURL(e.data.b):null)};EWok=true}catch(_){EWok=false}return EWok}
 function encW(px,w,h,f){var id=++EWn;EWcb[id]=f;EW.postMessage({id:id,w:w,h:h,b:px.buffer},[px.buffer])}
 /* static layers from the iOS per-pixel rim map (RIM: out = A + Kl*L + Kc*(G-L) + beta*page) and the edge geometry */
 function png(w,h,fill){var c=document.createElement('canvas');c.width=w;c.height=h;var x=c.getContext('2d'),id=x.createImageData(w,h);fill(id.data);x.putImageData(id,0,0);return c.toDataURL('image/png')}
 function edt1(f,n,o,v,z){var k=0,q,s;v[0]=0;z[0]=-1e20;z[1]=1e20;
  for(q=1;q<n;q++){s=((f[q]+q*q)-(f[v[k]]+v[k]*v[k]))/(2*q-2*v[k]);while(s<=z[k]){k--;s=((f[q]+q*q)-(f[v[k]]+v[k]*v[k]))/(2*q-2*v[k])}k++;v[k]=q;z[k]=s;z[k+1]=1e20}
  for(k=0,q=0;q<n;q++){while(z[k+1]<q)k++;o[q]=(q-v[k])*(q-v[k])+f[v[k]]}}
 function layers(map,cb){var W3=BWX*3,H3=BHX*3,N=W3*H3,i,x,y;
  /* distance to the bar outline (pt) for refraction bands */
  var c=document.createElement('canvas');c.width=W3;c.height=H3;var cx=c.getContext('2d');cx.setTransform(3,0,0,3,MP*3,MP*3);cx.fillStyle='#fff';cx.fill(new Path2D(bpath(BW,BH,0,0)));
  var cov=cx.getImageData(0,0,W3,H3).data,P2=2,W2=W3+2*P2,H2=H3+2*P2,f=new Float64Array(W2*H2),L=Math.max(W2,H2),o=new Float64Array(L),fi=new Float64Array(L),vv=new Int32Array(L),z=new Float64Array(L+1),T3=new Float32Array(N);
  for(y=0;y<H3;y++)for(x=0;x<W3;x++)if(cov[(y*W3+x)*4+3]>=128)f[(y+P2)*W2+x+P2]=1e20;
  for(x=0;x<W2;x++){for(y=0;y<H2;y++)fi[y]=f[y*W2+x];edt1(fi,H2,o,vv,z);for(y=0;y<H2;y++)f[y*W2+x]=o[y]}
  for(y=0;y<H2;y++){for(x=0;x<W2;x++)fi[x]=f[y*W2+x];edt1(fi,W2,o,vv,z);for(x=0;x<W2;x++)f[y*W2+x]=o[x]}
  for(y=0;y<H3;y++)for(x=0;x<W3;x++){i=y*W3+x;var d=Math.sqrt(f[(y+P2)*W2+x+P2]);T3[i]=d>0?(d-.5-(1-cov[i*4+3]/255))/3:0}
  function sm(a,b,t){t=Math.min(1,Math.max(0,(t-a)/(b-a)));return t*t*(3-2*t)}
  var out={};
  out.mask=png(W3,H3,function(d){for(i=0;i<N;i++){d[i*4+3]=Math.round(Math.min(1,Math.max(0,1-map.b[i]))*255)}});
  out.mul=png(W3,H3,function(d){for(i=0;i<N;i++){var al=1-map.b[i],v=al>.02?Math.min(1,Math.max(0,map.kl[i]/al)):1;d[i*4]=d[i*4+1]=d[i*4+2]=Math.round(v*255);d[i*4+3]=255}});
  out.add=png(W3,H3,function(d){for(i=0;i<N;i++){var al=1-map.b[i],v=al>.02?map.a[i]/al:0;v=Math.max(0,Math.min(255,v));d[i*4]=d[i*4+1]=d[i*4+2]=Math.round(v);d[i*4+3]=255}});
  out.sub=png(W3,H3,function(d){for(i=0;i<N;i++){var al=1-map.b[i],v=al>.02?-map.a[i]/al:0;v=Math.max(0,Math.min(255,v));d[i*4]=d[i*4+1]=d[i*4+2]=Math.round(255-v);d[i*4+3]=255}});
  /* window-edge weights per pixel: blur weight beyond the edge for the row the glass is sampled from (refraction DT) */
  var DT=[25,85,133,153,151,150,149,148,147,146,145,145,143,142,142,141,140,140,139,138,137,137,136,135,134,134,134,133,132,132,132,131,131,131,130,130,131,130,130,130,130,129,129,129,128,128,128,127,128,128,128,128,128,129,129,128,128,128,128,128,128,128,128,128],
   AT=new Float32Array(N),AB=new Float32Array(N);
  for(y=0;y<H3;y++)for(x=0;x<W3;x++){i=y*W3+x;var bu=y/3-MP,bx2=x/3-MP,tt=T3[i],us=bu;
   if(cov[i*4+3]>0){var tp=Math.round(tt*3),dd=tp<DT.length?(DT[tp]-128)/12:0,cx2=bx2<31?31:(bx2>BW-31?BW-31:bx2),ny=bx2<31||bx2>BW-31?(BH/2-bu)/Math.max(.5,Math.hypot(cx2-bx2,BH/2-bu)):(bu<BH/2?1:-1);us=bu+dd*ny}
   AT[i]=Math.min(1,wTail(us+WT0)/WMX);AB[i]=Math.min(1,wTail(WB0-us)/WMX)}
  out.wt=png(W3,H3,function(d){for(i=0;i<N;i++)d[i*4+3]=Math.round(AT[i]*255)});
  out.wb=png(W3,H3,function(d){for(i=0;i<N;i++)d[i*4+3]=Math.round(AB[i]*255)});
  out.w64=png(W3,H3,function(d){for(i=0;i<N;i++){var v=255-Math.round(64*(Math.round(AT[i]*255)+Math.round(AB[i]*255))/255);d[i*4]=d[i*4+1]=d[i*4+2]=v;d[i*4+3]=255}});
  out.sat=png(W3,H3,function(d){for(i=0;i<N;i++){var s=map.kl[i]>.05?map.kc[i]/map.kl[i]:1,w=Math.min(1,Math.max(0,(s-1)/(SMAX-1)));d[i*4+3]=Math.round(w*255)}});
  /* ends (l, r) and the straight part (s) blend over 26..36 pt: the s copy lies on top with a soft edge, no seam */
  out.bands=BANDS.map(function(bd){var o={};['l','r','s'].forEach(function(rg){o[rg]=png(W3,H3,function(d){for(y=0;y<H3;y++)for(x=0;x<W3;x++){i=y*W3+x;var bx=x/3-MP,t=T3[i],
     wl=1-sm(26,36,bx),wr=sm(BW-36,BW-26,bx),w=rg==='l'?(bx<36?1:0):(rg==='r'?(bx>BW-36?1:0):(1-wl)*(1-wr));if(w<=0)continue;
     /* a band fades in at its outer edge and stays opaque until the next band (drawn over it) is fully in: no unrefracted
        picture shows through between bands; only the last band fades out */
     var f0=FEo(bd[0]),f1=FEo(bd[1]),last=bd===BANDS[BANDS.length-1],a=w*(bd[0]<=0?1:sm(bd[0]-f0,bd[0]+f0,t))*(last?1-sm(bd[1]-f1,bd[1]+f1,t):(t<bd[1]+f1?1:0));d[i*4+3]=Math.round(a*255)}})});return o});
  cb(out)}
 /* the iOS map, embedded as a PNG: left 142 columns + middle column (right side mirrored). v103: measurement noise smoothed
    along the outline (outer 3 px rows kept exact; it showed as ±1 speckles/stripes on the phone) and calibrated to the real
    iPhone (Fitness over black, 22.10.2026): outer rows +6/+5/+3, inside -1 */
 function rimMap(cb){var im=new Image();im.onload=function(){try{var c=document.createElement('canvas');c.width=im.width;c.height=im.height;var x=c.getContext('2d');x.drawImage(im,0,0);
   var d=x.getImageData(0,0,im.width,im.height).data,cw=im.width,rh=im.height/2,W3=BWX*3,N=W3*rh,m={a:new Float32Array(N),kl:new Float32Array(N),kc:new Float32Array(N),b:new Float32Array(N)},L=cw-1,X,y,sx,i,j;
   for(y=0;y<rh;y++)for(X=0;X<W3;X++){sx=X<L?X:(X>=W3-L?W3-1-X:L);i=(y*cw+sx)*4;j=y*W3+X;m.a[j]=d[i]-64;m.kl[j]=d[i+1]/200;m.kc[j]=d[i+2]/150;m.b[j]=d[((y+rh)*cw+sx)*4]/200-.1}
   cb(m)}catch(e){M.err='rim '+e;cb(null)}};im.onerror=function(){cb(null)};im.src=RIM}
 function el(tag,css,parent){var e=document.createElement(tag);e.style.cssText=css;if(parent)parent.appendChild(e);return e}
 function mskCss(url){return '-webkit-mask-image:url('+url+');mask-image:url('+url+');-webkit-mask-size:100% 100%;mask-size:100% 100%;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;'}
 /* ?glsoff=lens,edge,rim,sat,cap — switch layers off one by one (checking aid) */
 var OFF=(/[?&]glsoff=([a-z,]+)/.exec(location.search)||[])[1]||'';
 function build(L){var ab='position:absolute;left:0;top:0;width:'+BWX+'px;height:'+BHX+'px;pointer-events:none;';
  WIN=el('div',ab+'left:'+(-MP)+'px;top:'+(-MP)+'px;isolation:isolate;background:rgb(32,32,32);'+mskCss(L.mask));WIN.className='gwin';WIN.setAttribute('aria-hidden','true');
  function glassLayer(parent,tf,kind){var gp=el('div','position:absolute;left:0;top:0;width:0;height:0;transform-origin:0 0',parent),host=gp,ln=null;
   if(tf){ln=el('div','position:absolute;left:0;top:0;width:0;height:0',gp);ln._tf=tf;LENS.push(ln);host=ln}
   var im=el('img','position:absolute;left:0;top:0;width:1px;height:1px;max-width:none',host);im.className='gimg';im.alt='';im.decoding='sync';im._k=kind||0;GPG.push(gp);IMGS.push(im)}
  glassLayer(WIN,null);
  if(OFF.indexOf('lens')<0)BANDS.forEach(function(bd,bi){['l','r','s'].forEach(function(rg){var b=el('div',ab+mskCss(L.bands[bi][rg]),WIN);glassLayer(b,[rg,bd[2]])})});
  /* window edges of iOS: picture of the change at the edge, stretched from the edge line over the bar (scale 1:100 about it),
     weighted per row by the mask; both pictures carry +64, taken off by one plus-darker layer */
  if(OFF.indexOf('edge')<0)[['et',1,L.wt],['eb',2,L.wb]].forEach(function(q){var b=el('div',ab+mskCss(q[2])+'mix-blend-mode:plus-lighter',WIN);glassLayer(b,[q[0],100],q[1])});
  if(OFF.indexOf('edge')<0&&CSS.supports('mix-blend-mode','plus-darker'))el('div',ab+'background:url('+L.w64+') 0 0/100% 100% no-repeat;mix-blend-mode:plus-darker',WIN);
  /* order: x Kl, + A, - |A| (dark ring), then the colour gain last: no channel is cut at 0 or 255 before the end */
  if(OFF.indexOf('rim')<0){el('div',ab+'background:url('+L.mul+') 0 0/100% 100% no-repeat;mix-blend-mode:multiply',WIN);
  el('div',ab+'background:url('+L.add+') 0 0/100% 100% no-repeat;mix-blend-mode:plus-lighter',WIN);}
  if(OFF.indexOf('rim')<0&&CSS.supports('mix-blend-mode','plus-darker'))el('div',ab+'background:url('+L.sub+') 0 0/100% 100% no-repeat;mix-blend-mode:plus-darker',WIN);
  if(OFF.indexOf('sat')<0)el('div',ab+'-webkit-backdrop-filter:saturate('+SMAX+');backdrop-filter:saturate('+SMAX+');'+mskCss(L.sat),WIN);
  CAP=el('div','position:absolute;left:0;top:0;width:0;height:0;opacity:0;-webkit-backdrop-filter:brightness(.763) contrast(1.14) saturate(1.2);backdrop-filter:brightness(.763) contrast(1.14) saturate(1.2)',WIN);
  /* capsule outline = path() of the canvas menu (iOS shape, not a plain stadium): end caps from its resting shape, scaled with
     the height, and a plain middle; the caps are flat to 0.01 pt at CAPC from the ends */
  var cs=CAP.style,sv=function(x0){return 'url("data:image/svg+xml;charset=utf-8,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="'+CAPC+'" height="'+PH+'" viewBox="'+x0+' 0 '+CAPC+' '+PH+'"><path d="'+path(PW,PH,0,0)+'"/></svg>')+'")'};
  cs.webkitMaskImage=cs.maskImage=sv(0)+','+sv(PW-CAPC)+',linear-gradient(#000,#000)';cs.webkitMaskRepeat=cs.maskRepeat='no-repeat';
  $('glass').appendChild(WIN)}
 /* where the window is on screen and how the glass picture sits under it (viewport px); the scroll itself is Safari's */
 function place(){if(!WIN)return;var r=WIN.getBoundingClientRect(),f=r.width/BWX||1,i,v=window.visualViewport,dk=document.getElementById('dock'),gt=r.top,gl=r.left;
  /* while Safari moves its toolbar the rects come shifted by the visual viewport offset for a moment (18 pt seen): take the
     dock's own CSS top (layout, stable) when the page is not pinch-zoomed */
  if(dk&&!dk.style.transform&&(!v||v.scale<1.01)){var dr=dk.getBoundingClientRect(),ct=parseFloat(getComputedStyle(dk).top);if(isFinite(ct))gt=ct+(r.top-dr.top);if(v)gl=r.left+v.offsetLeft}
  geo={l:gl,t:gt,f:f};LG('place');
  for(i=0;i<GPG.length;i++)GPG[i].style.transform='scale('+(1/f).toFixed(5)+')';
  for(i=0;i<LENS.length;i++){var t=LENS[i]._tf,s=t[1],oy=(t[0]==='et'?MP-WT0:(t[0]==='eb'?MP+WB0:BH/2+MP))*f,ox=(t[0]==='l'?31+MP:(t[0]==='r'?BW-31+MP:0))*f;
   LENS[i].style.transformOrigin=ox.toFixed(2)+'px '+oy.toFixed(2)+'px';LENS[i].style.transform=t[0]==='l'||t[0]==='r'?'scale('+s+')':'scale(1,'+s+')'}
  if(cur)fit(cur)}
 function fit(e){for(var i=0;i<IMGS.length;i++){var s=IMGS[i].style;s.left=(-geo.l).toFixed(2)+'px';s.top=(e.y0-geo.t).toFixed(2)+'px';s.width=e.w+'px';s.height=e.h+'px'}}
 function show(e){if(!e||e===cur)return;var old=cur;cur=e;var us=(e.urls||[e.url]).filter(Boolean),left=us.length,go1=function(){if(--left===0)go()};
  var go=function(){if(cur!==e)return;place();fit(e);LG('show',{y0:e.y0});for(var i=0;i<IMGS.length;i++)IMGS[i].src=e.urls[IMGS[i]._k]||e.url;restart();M.ver++;if(old&&old.blob&&!used(old))setTimeout(function(){if(!used(old))freeE(old)},1000)};
  /* all pictures decoded first: the layers change in one frame */
  us.forEach(function(u){var pre=new Image();pre.src=u;if(pre.decode)pre.decode().then(go1,go1);else{pre.onload=pre.onerror=go1}})}
 /* Safari keeps a scroll-driven animation that started before the picture was set frozen on its compositor: restart it */
 function restart(){if(!SDA)return;var i;for(i=0;i<IMGS.length;i++)IMGS[i].style.animation='none';void WIN.offsetWidth;for(i=0;i<IMGS.length;i++)IMGS[i].style.animation=''}
 function freeE(e){(e.urls||[e.url]).forEach(function(u){if(u)URL.revokeObjectURL(u)})}
 function used(e){if(e===cur)return true;for(var k in SN)if(SN[k]===e)return true;return false}
 /* page pictures: one per screen of #app (the 4 tabs), page CSS, animations stopped at their end state; other screens are
    taken in advance while nothing happens; not while a finger is down or the page scrolls (it costs a moment on a phone),
    but an outdated one is replaced at most 1.5 s later anyway. Card shapes (SVG backgrounds) -> their CSS colour + radius. */
 function esc(t){return t.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}
 function liveScr(){var a=document.querySelector('#app .scr.on');return a?+a.getAttribute('data-scr')||0:0}
 function nScr(){var n=document.querySelectorAll('#app .scr').length;return n||1}
 M.screen=function(i){if(!M.on)return;curScr=i;if(SN[i])show(SN[i]);else{dirty[i]=1;dirtyAt=dirtyAt||performance.now();sched(0)}};
 function pick(){var now=performance.now(),idle=!touching&&now-lastScroll>400,i,n=nScr();curScr=liveScr();
  if(!SN[curScr])return curScr;
  if(dirty[curScr])return idle||now-dirtyAt>1500?curScr:-2;
  if(!idle)return -1;
  for(i=0;i<n;i++)if(!SN[i]||dirty[i])return i;return -1}
 function take(){st=0;if(!M.on)return;if(busy){again=1;return}var which=pick();if(which===-2){st=setTimeout(take,250);return}if(which<0)return;
  var app=document.getElementById('app');if(!app)return;busy=true;var t0=performance.now(),live=which===liveScr();delete dirty[which];if(!Object.keys(dirty).length)dirtyAt=0;
  try{var de=document.documentElement,W=de.clientWidth,ar=app.getBoundingClientRect(),y0=ar.top-de.getBoundingClientRect().top,H,_lg=LG('take',{art:ar.top}),
   li=app.querySelectorAll('input,textarea,select'),cl=app.cloneNode(true),ci=cl.querySelectorAll('input,textarea,select'),i,css='',xs=new XMLSerializer();
   for(i=0;i<li.length&&i<ci.length;i++){if(li[i].type==='checkbox'||li[i].type==='radio'){if(li[i].checked)ci[i].setAttribute('checked','');else ci[i].removeAttribute('checked')}else ci[i].setAttribute('value',li[i].value)}
   var sc=cl.querySelectorAll('.scr');for(i=0;i<sc.length;i++){if((+sc[i].getAttribute('data-scr')||0)===which){if(!/(^|\s)on(\s|$)/.test(sc[i].className))sc[i].className+=' on';sc[i].style.removeProperty('--dx');if(!sc[i].getAttribute('style'))sc[i].removeAttribute('style')}else sc[i].parentNode.removeChild(sc[i])}
   var bi=cl.querySelectorAll('[style*="url("]');for(i=0;i<bi.length;i++){var es=bi[i].style;es.backgroundImage='';es.backgroundSize='';es.backgroundRepeat='';if(es.backgroundColor==='transparent')es.backgroundColor=''}
   if(live)H=Math.max(1,Math.ceil(ar.height));
   else{var box=document.createElement('div');box.setAttribute('aria-hidden','true');box.style.cssText='position:absolute;left:-30000px;top:0;width:'+W+'px;visibility:hidden;pointer-events:none';
    box.appendChild(cl);document.body.appendChild(box);H=Math.max(1,Math.ceil(cl.getBoundingClientRect().height));document.body.removeChild(box);box.removeChild(cl)}
   /* black margin below the page: the window of iOS reaches ~14 pt below the bar, past the end of a short page or at the very
      bottom; without rows there the edge pictures were empty while their -64 layer still darkened the menu */
   H=Math.max(H+120,Math.ceil((window.innerHeight||700)*1.3));
   var ss=document.querySelectorAll('style');for(i=0;i<ss.length;i++)if(ss[i].id!=='itb-css'&&ss[i].id!=='itb-css2')css+=ss[i].textContent;
   /* sharper picture through a CSS scale inside: Safari does not scale foreignObject content by the SVG viewBox */
   var sp=document.querySelector('body>svg'),s=Math.max(.2,Math.min(1,(M.max||4096)/W,(M.max||4096)/H)),PW=Math.floor(W*s),PH=Math.min(M.max||4096,Math.floor(H*s));s=PW/W;
   css+='*,*::before,*::after{animation:none!important;transition:none!important;caret-color:transparent!important}html,body{margin:0;width:'+PW+'px;height:'+PH+'px;overflow:hidden;background:#000}body::before{display:none}';
   var str='<svg xmlns="http://www.w3.org/2000/svg" width="'+PW+'" height="'+PH+'"><foreignObject x="0" y="0" width="'+PW+'" height="'+PH+'">'+
    '<html xmlns="http://www.w3.org/1999/xhtml"><head><style>'+esc(css)+'</style></head><body class="'+esc(document.body.className)+'"><div style="position:relative;width:'+W+'px;height:'+H+'px;transform:scale('+s+');transform-origin:0 0">'+(sp?xs.serializeToString(sp):'')+xs.serializeToString(cl)+'</div></body></html></foreignObject></svg>';
   /* same picture as last time (tab switch, a toggle set back, etc.): nothing to do — no work on the phone */
   if(SNS[which]===str&&SN[which]){if(which===curScr)show(SN[which]);busy=false;M.st.skip=(M.st.skip||0)+1;done();return}SNS[which]=str;
   var hasImg=!!cl.querySelector('img'),im=new Image();M.st.take=Math.round(performance.now()-t0);t0=performance.now();
   var make=function(fin){var t1=performance.now();try{g.bindTexture(g.TEXTURE_2D,T.s);g.texImage2D(g.TEXTURE_2D,0,g.RGBA,g.RGBA,g.UNSIGNED_BYTE,im);
     if(WIN){var wr=WIN.getBoundingClientRect(),wf=wr.width/BWX||1;WINP={l:wr.left+(MP-15.67)*wf,r:wr.right-(MP-15.67)*wf,f:wf}}
     glassOf(W,H,function(urls,blob){var url=urls&&urls[0];M.st.up=Math.round(performance.now()-t1);if(url&&/[?&]glsdump/.test(location.search)){(urls||[]).forEach(function(u,n){try{var q=new XMLHttpRequest();q.open('GET',u);q.responseType='blob';q.onload=function(){var z=new XMLHttpRequest();z.open('POST','/glassimg'+n+'?H='+H+'&y0='+y0);z.send(q.response)};q.send()}catch(_){}})}if(!url||!M.on){fin();return}var e={url:url,urls:urls,blob:blob,y0:y0,w:W,h:H},old=SN[which];LG('made',{y0:y0,which:which,H:H});SN[which]=e;M.st.n++;
      if(which===curScr)show(e);if(old&&old!==cur&&old.blob)freeE(old);fin()})}catch(x){M.err='glass '+x;fin()}};
   im.onload=function(){M.st.load=Math.round(performance.now()-t0);M.img=im;
    /* <img> inside the picture decode a moment later (none on the bank page): make it once more */
    make(function(){if(hasImg)setTimeout(function(){make(done)},350);else done();if(/[?&]glsdump/.test(location.search)&&which===curScr){dump(im,y0,W,H);stat()}})};
   im.onerror=function(){M.err='img';done()};im.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(str)}catch(e){M.err='snap '+e;done()}}
 /* checking aid (only with ?glsdump on the local test server): send the page picture to compare it with the screen */
 function dump(im,y0,W,H){try{var c=document.createElement('canvas');c.width=im.width;c.height=im.height;c.getContext('2d').drawImage(im,0,0);var x=new XMLHttpRequest();x.open('POST','/glsdump?y0='+y0+'&w='+W+'&h='+H+'&sy='+(window.pageYOffset||0));x.send(c.toDataURL('image/png'))}catch(_){}}
 function stat(){try{var x=new XMLHttpRequest();x.open('POST','/glsstat');x.send(JSON.stringify({n:M.st.n,take:M.st.take,load:M.st.load,up:M.st.up,ver:M.ver,err:M.err,why:M.why,sda:SDA,t:Math.round(performance.now())}))}catch(_){}}
 function done(){busy=false;var w=pick();if(again||w!==-1){again=0;sched(w===curScr?60:250)}}
 function sched(ms){if(!M.on)return;if(st)clearTimeout(st);st=setTimeout(take,ms==null?200:ms)}
 function strip(s){return (s||'').replace(/(^|\s)down(?=\s|$)/g,' ').replace(/\s+/g,' ').trim()}
 /* selected-tab capsule: a backdrop-filter element over the glass (iOS: 0.87 brightness, -18, colour 1.2) */
 M.caps=function(cx,hw,hh,a){if(!M.on||!CAP)return;var k=[cx,hw,hh,a].map(function(n){return n.toFixed(2)}).join();if(k===capKey)return;capKey=k;var s=CAP.style;
  s.left=(cx-hw+MP).toFixed(2)+'px';s.top=(BH/2-hh+MP).toFixed(2)+'px';s.width=(2*hw).toFixed(2)+'px';s.height=(2*hh).toFixed(2)+'px';s.opacity=a.toFixed(3);
  var cw=CAPC*2*hh/PH,mid=Math.max(0,2*hw-2*cw);s.webkitMaskSize=s.maskSize='auto 100%,auto 100%,'+mid.toFixed(2)+'px 100%';s.webkitMaskPosition=s.maskPosition='0 0,100% 0,'+cw.toFixed(2)+'px 0'};
 /* without scroll-driven animations (old browsers): move the glass from scripts (it lags there) */
 function jsScroll(){var y=-(window.pageYOffset||0);for(var i=0;i<IMGS.length;i++)IMGS[i].style.transform='translateY('+y+'px)'}
 function on(){var gs=$('glass').style;gs.clipPath=gs.webkitClipPath='none';gs.webkitMaskImage=gs.maskImage='none';gs.background='transparent';$('edge').style.display='none';WIN.style.display='';M.on=true;place();try{paint()}catch(_){}}
 function off(){M.on=false;try{$('edge').style.display='';paintBar(0);glassClip();if(WIN)WIN.style.display='none';paint()}catch(_){}}
 var LGQ=[],LGON=/[?&]glslog/.test(location.search);function LG(t,o){if(!LGON)return;o=o||{};o.t=t;o.ms=Math.round(performance.now());o.py=Math.round((window.pageYOffset||0)*10)/10;var v=window.visualViewport;if(v){o.vt=Math.round(v.offsetTop*10)/10;o.vh=Math.round(v.height*10)/10;o.vpt=Math.round(v.pageTop*10)/10}o.ih=window.innerHeight;o.ch=document.documentElement.clientHeight;if(WIN){var r=WIN.getBoundingClientRect();o.wt=Math.round(r.top*10)/10}var d=document.getElementById('dock');if(d){o.dt=Math.round(d.getBoundingClientRect().top*10)/10;o.dcs=getComputedStyle(d).top}if(IMGS[0]){var cs=getComputedStyle(IMGS[0]);o.tf=cs.transform;o.it=IMGS[0].style.top}o.gt=Math.round(geo.t*10)/10;LGQ.push(JSON.stringify(o))}
 if(LGON){setInterval(function(){LG('tick')},100);setInterval(function(){if(!LGQ.length)return;try{var x=new XMLHttpRequest();x.open('POST','/glslog');x.send(LGQ.join('\n'));LGQ=[]}catch(_){}},400);window.addEventListener('resize',function(){LG('resize')});if(window.visualViewport)visualViewport.addEventListener('resize',function(){LG('vvresize')})}
 /* ?glshud: small debug line at the top of the screen (pictures made / shown, long frames, scroll events per second) —
    readable from a screenshot or a screen recording of the phone */
 if(/[?&]glshud/.test(location.search)){(function(){var d=document.createElement('div'),fr=[],se=[],lt=performance.now(),shows=0,ov=0;
  d.style.cssText='position:fixed;left:0;right:0;top:env(safe-area-inset-top,0px);z-index:99;font:600 13px/1.25 -apple-system,monospace;color:#0f0;background:rgba(0,0,0,.75);padding:3px 6px;pointer-events:none;white-space:pre';
  document.body.appendChild(d);addEventListener('scroll',function(){se.push(performance.now())},{passive:true});
  (function f(t){fr.push(t-lt);lt=t;if(fr.length>240)fr.shift();requestAnimationFrame(f)})(lt);
  setInterval(function(){var now=performance.now();while(se.length&&now-se[0]>1000)se.shift();if(M.ver!==ov){shows++;ov=M.ver}
   var long=0,mx=0;fr.forEach(function(x){if(x>34)long++;if(x>mx)mx=x});
   d.textContent='snap '+M.st.n+' show '+M.ver+' up '+M.st.up+'ms take '+M.st.take+' load '+M.st.load+(M.err?' ERR '+M.err:'')+'\nframes>34ms '+long+'/'+fr.length+' max '+Math.round(mx)+'ms  scroll ev/s '+se.length+'  y '+Math.round(window.pageYOffset||0)},250)})()}
 M.dbg=function(){var i=IMGS[0];if(!i)return 'noimg';var cs=getComputedStyle(i);return [SDA,cs.animationName,cs.transform,(cs.animationTimeline||cs.webkitAnimationTimeline||'?'),window.pageYOffset,i.style.top,i.src.slice(0,30)].join('|')};
 M.off=off;M.snap=sched;M.size=function(){if(M.on)place()};
 M.start=function(){try{if(!init())return;rimMap(function(m){if(!m){off();return}layers(m,function(L){try{build(L);start2()}catch(e){M.err='build '+e;off()}})})}catch(e){M.err='start '+e;off()}};
 function start2(){var st2=document.createElement('style');st2.id='itb-css2';
  st2.textContent='#dock .gimg{'+(SDA?'animation:itbScroll linear both;animation-timeline:scroll(root block);animation-range:0px 100000px;':'')+'will-change:transform}@keyframes itbScroll{from{transform:translateY(0)}to{transform:translateY(-100000px)}}';
  document.head.appendChild(st2);on();
  var app=document.getElementById('app'),mo=function(rs){for(var i=0;i<rs.length;i++){var r=rs[i];if(r.type==='attributes'&&r.attributeName==='class'&&strip(r.oldValue)===strip(r.target.getAttribute('class')))continue;M.why=r.type+':'+(r.attributeName||'')+':'+(r.target.className||r.target.nodeName||'')+':'+String(r.oldValue).slice(0,40);var ls=liveScr();if(!dirty[ls]){dirty[ls]=1;dirtyAt=dirtyAt||performance.now()}if(r.target===document.body)for(var j=0;j<nScr();j++)dirty[j]=1;sched();return}};
  if(app&&window.MutationObserver){new MutationObserver(mo).observe(app,{subtree:true,childList:true,attributes:true,attributeOldValue:true,characterData:true});new MutationObserver(mo).observe(document.body,{attributes:true,attributeOldValue:true})}
  var tch=function(e){touching=e.touches?e.touches.length:0};['touchstart','touchend','touchcancel'].forEach(function(t){window.addEventListener(t,tch,{passive:true,capture:true})});
  window.addEventListener('scroll',function(){lastScroll=performance.now();if(!SDA)jsScroll()},{passive:true});
  /* Safari folds/unfolds its toolbar on every scroll direction change: that is a resize of the height only. The page layout does
     not depend on the height (only the dock uses svh), so the pictures are made again only when the width changes — before
     v101 every toolbar move re-made the pictures of all 4 tabs: hundreds of ms of work on the phone right while scrolling */
  var rp=function(){clearTimeout(rp.t);rp.t=setTimeout(place,120)},lastW=document.documentElement.clientWidth;
  window.addEventListener('resize',function(){var w=document.documentElement.clientWidth;if(w!==lastW){lastW=w;for(var j=0;j<nScr();j++)dirty[j]=1;dirtyAt=performance.now();sched(250)}rp()});
  if(window.visualViewport)visualViewport.addEventListener('resize',rp);[300,900,1600].forEach(function(t){setTimeout(place,t)});sched(0)}
 return M})();

if(!BASIC)GLS.start();
})();
