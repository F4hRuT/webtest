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
  for(var y=Y0;y<Y1;y++)texOD.data.set(part.subarray((y-Y0)*rw,(y-Y0+1)*rw),(y*W+X0)*4);
  if(texWD&&texW.width===texOS.width){var pw=texW.getContext('2d').getImageData(X0,Y0,X1-X0,Y1-Y0).data;for(y=Y0;y<Y1;y++)texWD.data.set(pw.subarray((y-Y0)*rw,(y-Y0+1)*rw),(y*W+X0)*4)}}}
function stepIcon(){if(!icA)return false;var tt=(clock-icA.t0)/ICSLOW,k=KEYS[icA.i];if(tt>=ICDUR[k]){redrawIcon(icA.i,null);icA=null;return false}redrawIcon(icA.i,tt);return true}
function drawContent(x,color,weight){x.fillStyle=color;
 for(var i=0;i<4;i++){var ic=ICONS[KEYS[i]],q=POS[KEYS[i]],cxp=PADX+CX0+PITCH*i;
  drawIcon(x,i,null);
  x.font=weight+' 10px '+FONT;x.textAlign='center';x.textBaseline='alphabetic';x.fillText(LABELS[i],cxp,PADY+48.8)}}
function content(sc,color,weight,rf){var c=document.createElement('canvas');c.width=Math.round(CW*sc);c.height=Math.round(CH*sc);var x=c.getContext('2d',rf?{willReadFrequently:true}:undefined);x.setTransform(c.width/CW,0,0,c.height/CH,0,0);drawContent(x,color,weight);return c}
function buildTex(){texW=content(TS,'#ffffff',500);texO=content(TS,'#b6d70a',600);texOS=content(TS,'#b6d70a',600,1);texOD=texOS.getContext('2d').getImageData(0,0,texOS.width,texOS.height);texWD=texW.getContext('2d',{willReadFrequently:true}).getImageData(0,0,texW.width,texW.height)}
var REFR={mag:1.096,band:.70,edge:.33,peek:12,rim:4,tb:.366,k:.8}      ,texOD=null,texWD=null,lensC=document.createElement('canvas'),lensX=lensC.getContext('2d'),lensID=null;
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
   /* what the lens takes from inside the capsule is in the selection colour, what it takes from outside (its rim looks a
      little outward) stays white, like iOS — before: lime slivers of the neighbour icon/label at the capsule edge */
   var qx2=Math.abs(X)-a;if(qx2<0)qx2=0;src=(qx2*qx2+Y*Y<=r*r||!texWD)?texOD.data:texWD.data;
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
/* ---------- liquid glass v106 (iOS 27 tab bar, «Tinted», measured on a real iOS tab bar: tools/glass-app, CLAUDE.md).
   The glass is made by Safari itself from what is on screen under the bar (backdrop-filter), at the moment of drawing — like
   the iOS glass. Nothing is computed in advance and nothing has to follow the scroll, so the glass can not lag behind the
   page or drift from it. Before v106 a precomputed picture of the whole page was moved by a CSS scroll-driven animation:
   on the iPhone Safari moved it ~35 pt off the page while a finger scrolled and after loading (frame-by-frame analysis of
   the recording 23.10.2026), which was the "colour of what already passed" and the jumps.
   Layers (none of them inside a group: a backdrop-filter inside a group with a mask or opacity sees only that group):
   - the iOS window: each glass layer is a box 15 pt above the bar, 13.67 below and 15.67 at the sides (Safari samples the
     backdrop only inside the box, like iOS) and shows only the bar (mask);
   - blur: 75.5% gauss 13.26 pt + 24.5% gauss 25.7 pt (= 13.26 after 22 at 24.5%);
   - tone curve of «Tinted» y = .125 + .5x - .2x^2 (x, y 0..1; within ±1 of the measured iOS table): multiply by
     (.5 - .2x) made from the backdrop (invert, contrast .25, brightness .8), then + 32;
   - colour: saturate 1.6 after the curve (iOS colour factor .65 - .00083 L; mean error 2-3 levels on the site colours);
   - then the per-pixel iOS rim (multiply / plus-lighter / plus-darker / saturate) and the capsule (backdrop-filter). ---------- */
GLS=(function(){
 var M={on:false,err:'',ver:0,kick:function(){},snap:function(){},caps:function(){},screen:function(){},size:function(){}},
  WIN=null,CAP=null,capKey='';
 var MP=4,BWX=BW+2*MP,BHX=BH+2*MP,SMAX=1.6,CAPC=40;
 /* iOS window around the bar (pt) and the glass tone */
 /* tone of «Tinted» measured on the iPhone (23.10, grey 0..255 under the iOS bar): y = .1189 + .5494x - .2187x^2 (±0.4 level):
    multiply by (.5494 - .2187x) = invert, contrast TK, brightness TM; then + TA */
 var TK=.2485,TM=.8801,TA=+((/[?&]ta=([\d.]+)/.exec(location.search)||[])[1]||31.8);
 /* the glass box reaches WX pt past the iOS window: a large thing at the window edge then still lights the glass a bit beyond
    it, which is what iOS gets by repeating its edge cell outward (iPhone sweep 23.10: best 5 pt) */
 /* GSAT: colour of the glass. iPhone check 24.10 (same content under both bars, 7 places): 1.4 gave colour 1.07-1.13 of iOS
    on grey/mixed content, 1.32 gives 1.0-1.06; the rim keeps its colour (its saturate is raised by 1.4/GSAT) */
 var WX=+((/[?&]wx=([\d.]+)/.exec(location.search)||[])[1]||5),WT=15,WB=13.67,WS=15.67,BL1=22,BL1O=.245,BL2=13.26,GSAT=+((/[?&]gsat=([\d.]+)/.exec(location.search)||[])[1]||1.32);
 var RIM='data:image/png;base64,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';
 function init(){
  if(BASIC||/[?&]itbglass=0/.test(location.search)||!window.Path2D||!window.CSS||!CSS.supports)return false;
  if(!(CSS.supports('-webkit-backdrop-filter','blur(1px)')||CSS.supports('backdrop-filter','blur(1px)')))return false;
  return CSS.supports('mix-blend-mode','plus-lighter')&&CSS.supports('mix-blend-mode','multiply')}
 /* weight the blur of iOS gives to what lies beyond a window edge at distance d (pt): tails of 75.5% gauss 13.26 + 24.5% gauss 25.7 */
 /* rim samplers: EO pt outward, blur, DP pt inward fade, strength */
 var RS=((/[?&]rs=([\d.,]+)/.exec(location.search)||[])[1]||'15,16,1.4,1').split(',').map(Number);
 var RSB=(function(){var EO=RS[0],DP=RS[2];return [[0,MP-EO,BWX,EO+DP,'t'],[0,MP+BH-DP,BWX,EO+DP,'b'],[MP-EO,0,EO+BH/2,BHX,'l'],[MP+BW-BH/2,0,EO+BH/2,BHX,'r']]})();
 function Qn(z){var t=1/(1+.3275911*z),y=t*(.254829592+t*(-.284496736+t*(1.421413741+t*(-1.453152027+t*1.061405429))));return .5*y*Math.exp(-z*z/2)}
 function Wd(d){return .755*Qn(d/13.26)+.245*Qn(d/25.7)}
 function png(w,h,fill){var c=document.createElement('canvas');c.width=w;c.height=h;var x=c.getContext('2d'),im=x.createImageData(w,h);fill(im.data);x.putImageData(im,0,0);return c.toDataURL('image/png')}
 /* rim layers from the iOS map: out = A + Kl*G + Kc*(G - L) + beta*page; mask = 1 - beta (0 inside the bar, ~1 outside) */
 function layers(map,cb){var W3=BWX*3,H3=BHX*3,N=W3*H3,i,out={};
  out.mask=png(W3,H3,function(d){for(i=0;i<N;i++){d[i*4+3]=Math.round(Math.min(1,Math.max(0,1-map.b[i]))*255)}});
  out.mul=png(W3,H3,function(d){for(i=0;i<N;i++){var al=1-map.b[i],v=al>.02?Math.min(1,Math.max(0,map.kl[i]/al)):1;d[i*4]=d[i*4+1]=d[i*4+2]=Math.round(v*255);d[i*4+3]=255}});
  out.add=png(W3,H3,function(d){for(i=0;i<N;i++){var al=1-map.b[i],v=al>.02?map.a[i]/al:0;v=Math.max(0,Math.min(255,v));d[i*4]=d[i*4+1]=d[i*4+2]=Math.round(v);d[i*4+3]=255}});
  out.sub=png(W3,H3,function(d){for(i=0;i<N;i++){var al=1-map.b[i],v=al>.02?-map.a[i]/al:0;v=Math.max(0,Math.min(255,v));d[i*4]=d[i*4+1]=d[i*4+2]=Math.round(255-v);d[i*4+3]=255}});
  /* the menu is its own group (fixed dock): outside the bar the group is see-through, and a neutral (white) multiply or
     plus-darker pixel would show there as light (also on the half-covered edge pixels). Their masks are therefore 1 only where
     the menu is opaque and they change something */
  /* the menu is its own group (fixed dock): where the group is see-through, multiply / plus-darker / the curve layers would
     show their own grey as light (v106: a light halo, then a staircase edge when cut off hard). So first an exact copy of the
     page is laid into the group on the half-covered edge ring (+2 px): every layer then works on an opaque backdrop and the
     edge keeps its smooth (fractional) coverage, like iOS */
  out.ring=png(W3,H3,function(d){var r=new Uint8Array(N),x,y,k,dy,dx;for(i=0;i<N;i++){var al=1-map.b[i];r[i]=al>.004&&al<.996?1:0}
   for(y=0;y<H3;y++)for(x=0;x<W3;x++){k=0;for(dy=-2;dy<=2&&!k;dy++)for(dx=-2;dx<=2;dx++){var yy=y+dy,xx=x+dx;if(yy>=0&&yy<H3&&xx>=0&&xx<W3&&r[yy*W3+xx]){k=1;break}}d[(y*W3+x)*4+3]=k?255:0}});
  /* Kl above 1 (the rim lights up more than the glass under it, e.g. the bottom rows on the iPhone): multiply can not go
     above 1, so the excess is added: a copy of what is under it, plus-lighter, with that excess as its alpha */
  out.klx=png(W3,H3,function(d){for(i=0;i<N;i++){var al=1-map.b[i];d[i*4+3]=al>=.97?Math.round(Math.min(1,Math.max(0,map.kl[i]/al-1))*255):0}});
  /* dark outline, the outermost element of the bar (asked by the owner, like the second dark contour of iOS): a thin
     soft shadow all round, thicker and darker at the ends (iPhone: iOS ends 131/41 over a light page, ours were 144/61) and
     one pixel wider than before, only 1-2 px and faint along the straight top and bottom. Alpha of black by the signed
     distance to the bar outline (device px, < 0 inside) and by how much the outline faces sideways */
  out.outl=png(W3,H3,function(d){for(i=0;i<N;i++)d[i*4+3]=Math.round(Math.min(1,map.o[i])*255)});
  /* masks of the rim sampler boxes: bar coverage (1 - beta) x fade from the edge inward (K at the edge, K/2 at .35 DP, 0 at DP) */
  out.rs=RSB.map(function(b){var w=Math.round(b[2]*3),h=Math.round(b[3]*3),K=RS[3],DP=RS[2];
   function f(t){if(t<=0)return K;if(t>=DP)return 0;return t<.35*DP?K*(1-.5*t/(.35*DP)):K*.5*(1-(t-.35*DP)/(.65*DP))}
   return png(w,h,function(d){for(var j=0;j<h;j++)for(var i=0;i<w;i++){var X=Math.round(b[0]*3)+i,Y=Math.round(b[1]*3)+j;if(X<0||Y<0||X>=W3||Y>=H3)continue;
    var al=Math.min(1,Math.max(0,1-map.b[Y*W3+X]));if(al<=0)continue;var px=X/3-MP,py=Y/3-MP,t=b[4]==='t'?py:b[4]==='b'?BH-py:b[4]==='l'?px:BW-px;
    d[(j*w+i)*4+3]=Math.round(al*f(t)*255)}})});
  out.sat=png(W3,H3,function(d){for(i=0;i<N;i++){var s=map.kl[i]>.05?map.kc[i]/map.kl[i]:1;s*=1+(1.4/GSAT-1)*Math.min(1,Math.max(0,(s-1)/.15));var w=Math.min(1,Math.max(0,(s-1)/(SMAX-1)));d[i*4+3]=Math.round(w*255)}});
  cb(out)}
 /* v120: the map is rebuilt smooth along the outline (owner: a step where the top rim turns into the end, uneven pixels,
    a bump at the leftmost point). Before, only 47 pt from each end were per pixel and the rest repeated the middle column,
    so the bright top row jumped where the true outline still goes down (to 65 pt). Now every pixel up to 68 pt is the exact
    pixel-area average of the iOS rim profile across the edge (taken where the edge lies on the pixel grid: top middle,
    bottom middle) at the exact signed distance to the outline, with one profile per 2 degrees of edge angle, fitted on the
    old per-pixel map (same values, rms 1 level) and kept smooth across angles. The dark outline is stored in the map too (bottom half, green), same design, exact coverage. */
 /* v108: A and Kl of the map refitted per pixel on the iPhone: the bank main page as a picture, under the real iOS bar (test app
    Glass) and under this menu (test/dev/scan.html), 246 positions 10 pt apart; colour gain kept from v107 (the fit underestimates
    it), bottom rim colour +15% */
 function rimMap(cb){var im=new Image();im.onload=function(){try{var c=document.createElement('canvas');c.width=im.width;c.height=im.height;var x=c.getContext('2d');x.drawImage(im,0,0);
   var d=x.getImageData(0,0,im.width,im.height).data,cw=im.width,rh=im.height/2,W3=BWX*3,N=W3*rh,m={a:new Float32Array(N),kl:new Float32Array(N),kc:new Float32Array(N),b:new Float32Array(N),o:new Float32Array(N)},L=cw-1,X,y,sx,i,j;
   for(y=0;y<rh;y++)for(X=0;X<W3;X++){sx=X<L?X:(X>=W3-L?W3-1-X:L);i=(y*cw+sx)*4;j=y*W3+X;m.a[j]=d[i]-64;m.kl[j]=d[i+1]/200;m.kc[j]=d[i+2]/150;m.b[j]=d[((y+rh)*cw+sx)*4]/200-.1;m.o[j]=d[((y+rh)*cw+sx)*4+1]/255}
   var KB=+((/[?&]kb=([\d.]+)/.exec(location.search)||[])[1]||0),yb=MP*3+BH*3;
   if(KB)for(y=yb-12;y<yb;y++){var f=KB*Math.min(1,(y-(yb-12))/4);for(X=0;X<W3;X++){j=y*W3+X;if(m.b[j]<.5)m.kl[j]+=f}}
   cb(m)}catch(e){M.err='rim '+e;cb(null)}};im.onerror=function(){cb(null)};im.src=RIM}
 function el(tag,css,parent){var e=document.createElement(tag);e.style.cssText=css;if(parent)parent.appendChild(e);return e}
 function mskCss(url){return '-webkit-mask-image:url('+url+');mask-image:url('+url+');-webkit-mask-size:100% 100%;mask-size:100% 100%;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;'}
 /* ?glsoff=glass,rim,sat,cap — switch layers off one by one (checking aid) */
 var OFF=(/[?&]glsoff=([a-z,]+)/.exec(location.search)||[])[1]||'';
 function bf(f){return '-webkit-backdrop-filter:'+f+';backdrop-filter:'+f+';'}
 function build(L){var ab='position:absolute;left:0;top:0;width:'+BWX+'px;height:'+BHX+'px;pointer-events:none;',mk=mskCss(L.mask);
  WIN=el('div','position:absolute;left:'+(-MP)+'px;top:'+(-MP)+'px;width:'+BWX+'px;height:'+BHX+'px;pointer-events:none');WIN.className='gwin';WIN.setAttribute('aria-hidden','true');
  /* glass: the iOS window as the box, the bar (iOS mask) as what is shown */
  var gw='position:absolute;pointer-events:none;left:'+(MP-WS-WX)+'px;top:'+(MP-WT-WX)+'px;width:'+(BW+2*WS+2*WX)+'px;height:'+(BH+WT+WB+2*WX)+'px;'+
   '-webkit-mask-image:url('+L.mask+');mask-image:url('+L.mask+');-webkit-mask-size:'+BWX+'px '+BHX+'px;mask-size:'+BWX+'px '+BHX+'px;'+
   '-webkit-mask-position:'+(WS+WX-MP)+'px '+(WT+WX-MP)+'px;mask-position:'+(WS+WX-MP)+'px '+(WT+WX-MP)+'px;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;';
  /* exact copy of the page on the edge ring (see out.ring) */
  if(OFF.indexOf('ring')<0)el('div',ab+bf('brightness(1.001)')+mskCss(L.ring),WIN);
  if(OFF.indexOf('glass')<0){el('div',gw+bf('blur('+BL1+'px)')+'opacity:'+BL1O,WIN);el('div',gw+bf('blur('+BL2+'px)'),WIN);
   if(OFF.indexOf('rs')<0)rimSamp();
   el('div',gw+bf('invert(1) contrast('+TK+') brightness('+TM+')')+'mix-blend-mode:multiply',WIN);
   el('div',gw+'background:rgb('+TA+','+TA+','+TA+');mix-blend-mode:plus-lighter',WIN);
   el('div',gw+bf('saturate('+GSAT+')'),WIN)}
  /* the rim of iOS looks outward (refraction: its outer rows take the glass 3-9 pt outside the bar, and the window edge cell
     is repeated outward), so a bright thing a few pt from the bar lights the rim. Safari blurs with nothing beyond a box, so a
     blur box that reaches out from the edge gives, on the bar's outer rows, a mix of the glass and of what is outside */
  function rimSamp(){
   /* each box shows only inside the bar: its mask (bar shape x fade inward) is one precomputed picture — v107/v108 combined two
      masks with mask-composite, which Safari on the iPhone ignored, and the boxes showed as blurred plates around the menu */
   function box(x,y,w,h,mu){el('div','position:absolute;pointer-events:none;left:'+x+'px;top:'+y+'px;width:'+w+'px;height:'+h+'px;'+bf('blur('+RS[1]+'px)')+mskCss(mu),WIN)}
   RSB.forEach(function(b,k){box(b[0],b[1],b[2],b[3],L.rs[k])})}
  /* order: x Kl, + A, - |A| (dark ring), then the colour gain last: no channel is cut at 0 or 255 before the end */
  if(OFF.indexOf('rim')<0){if(OFF.indexOf('mul')<0)el('div',ab+mk+'background:url('+L.mul+') 0 0/100% 100% no-repeat;mix-blend-mode:multiply',WIN);
   if(OFF.indexOf('klx')<0)el('div',ab+mskCss(L.klx)+bf('brightness(1.001)')+'mix-blend-mode:plus-lighter',WIN);
   if(OFF.indexOf('add')<0)el('div',ab+mk+'background:url('+L.add+') 0 0/100% 100% no-repeat;mix-blend-mode:plus-lighter',WIN);
   if(OFF.indexOf('sub')<0&&CSS.supports('mix-blend-mode','plus-darker'))el('div',ab+mk+'background:url('+L.sub+') 0 0/100% 100% no-repeat;mix-blend-mode:plus-darker',WIN)}
  if(OFF.indexOf('sat')<0)el('div',ab+bf('saturate('+SMAX+')')+mskCss(L.sat),WIN);
  if(OFF.indexOf('outl')<0)el('div',ab+mskCss(L.outl)+'background:#000',WIN);
  CAP=el('div','position:absolute;left:0;top:0;width:0;height:0;opacity:0;'+bf('brightness(.763) contrast(1.14) saturate(1.2)'),WIN);
  if(OFF.indexOf('cap')>=0)CAP.style.display='none';
  /* capsule outline = path() of the canvas menu (iOS shape, not a plain stadium): end caps from its resting shape, scaled with
     the height, and a plain middle; the caps are flat to 0.01 pt at CAPC from the ends */
  var cs=CAP.style,sv=function(x0){return 'url("data:image/svg+xml;charset=utf-8,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="'+CAPC+'" height="'+PH+'" viewBox="'+x0+' 0 '+CAPC+' '+PH+'"><path d="'+path(PW,PH,0,0)+'"/></svg>')+'")'};
  cs.webkitMaskImage=cs.maskImage=sv(0)+','+sv(PW-CAPC)+',linear-gradient(#000,#000)';cs.webkitMaskRepeat=cs.maskRepeat='no-repeat';
  $('glass').appendChild(WIN)}
 /* selected-tab capsule: a backdrop-filter element over the glass (iOS: 0.87 brightness, -18, colour 1.2) */
 M.caps=function(cx,hw,hh,a){if(!M.on||!CAP)return;var k=[cx,hw,hh,a].map(function(n){return n.toFixed(2)}).join();if(k===capKey)return;capKey=k;var s=CAP.style;
  s.left=(cx-hw+MP).toFixed(2)+'px';s.top=(BH/2-hh+MP).toFixed(2)+'px';s.width=(2*hw).toFixed(2)+'px';s.height=(2*hh).toFixed(2)+'px';s.opacity=a.toFixed(3);
  /* the middle part overlaps the caps by 1.5 px: while the capsule springs its parts got fractional sizes and a hair gap
     showed as two thin lines across it for a few frames */
  var cw=CAPC*2*hh/PH,ov=Math.min(1.5,cw/4),mid=Math.max(0,2*hw-2*cw)+2*ov;s.webkitMaskSize=s.maskSize='auto 100%,auto 100%,'+mid.toFixed(2)+'px 100%';s.webkitMaskPosition=s.maskPosition='0 0,100% 0,'+(cw-ov).toFixed(2)+'px 0'};
 function on(){var gs=$('glass').style;gs.clipPath=gs.webkitClipPath='none';gs.webkitMaskImage=gs.maskImage='none';gs.background='transparent';$('edge').style.display='none';WIN.style.display='';M.on=true;M.ver++;capKey='';try{paint()}catch(_){}}
 function off(){M.on=false;try{$('edge').style.display='';paintBar(0);glassClip();if(WIN)WIN.style.display='none';paint()}catch(_){}}
 /* ?glshud: small debug line at the top of the screen (long frames, scroll events per second) — readable from a screenshot
    or a screen recording of the phone */
 if(/[?&]glshud/.test(location.search)){(function(){var d=document.createElement('div'),fr=[],se=[],lt=performance.now();
  d.style.cssText='position:fixed;left:0;right:0;top:env(safe-area-inset-top,0px);z-index:99;font:600 13px/1.25 -apple-system,monospace;color:#0f0;background:rgba(0,0,0,.75);padding:3px 6px;pointer-events:none;white-space:pre';
  document.body.appendChild(d);addEventListener('scroll',function(){se.push(performance.now())},{passive:true});
  (function f(t){fr.push(t-lt);lt=t;if(fr.length>240)fr.shift();requestAnimationFrame(f)})(lt);
  setInterval(function(){var now=performance.now();while(se.length&&now-se[0]>1000)se.shift();var long=0,mx=0;fr.forEach(function(x){if(x>34)long++;if(x>mx)mx=x});
   d.textContent='glass '+(M.on?'on':'off')+(M.err?' ERR '+M.err:'')+'  frames>34ms '+long+'/'+fr.length+' max '+Math.round(mx)+'ms  scroll ev/s '+se.length+'  y '+Math.round(window.pageYOffset||0)},250)})()}
 M.off=off;
 M.start=function(){try{if(!init())return;rimMap(function(m){if(!m){off();return}layers(m,function(L){try{build(L);on()}catch(e){M.err='build '+e;off()}})})}catch(e){M.err='start '+e;off()}};
 return M})();

if(!BASIC)GLS.start();
})();
