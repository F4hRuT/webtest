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
 var WX=+((/[?&]wx=([\d.]+)/.exec(location.search)||[])[1]||5),WT=15,WB=13.67,WS=15.67,BL1=22,BL1O=.245,BL2=13.26,GSAT=+((/[?&]gsat=([\d.]+)/.exec(location.search)||[])[1]||1.4);
 var RIM='data:image/png;base64,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';
 function init(){
  if(BASIC||/[?&]itbglass=0/.test(location.search)||!window.Path2D||!window.CSS||!CSS.supports)return false;
  if(!(CSS.supports('-webkit-backdrop-filter','blur(1px)')||CSS.supports('backdrop-filter','blur(1px)')))return false;
  return CSS.supports('mix-blend-mode','plus-lighter')&&CSS.supports('mix-blend-mode','multiply')}
 /* weight the blur of iOS gives to what lies beyond a window edge at distance d (pt): tails of 75.5% gauss 13.26 + 24.5% gauss 25.7 */
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
  out.outl=png(W3,H3,function(d){var cv=document.createElement('canvas');cv.width=W3;cv.height=H3;var cx=cv.getContext('2d');cx.setTransform(3,0,0,3,MP*3,MP*3);cx.fillStyle='#fff';cx.fill(new Path2D(bpath(BW,BH,0,0)));
   var cov=cx.getImageData(0,0,W3,H3).data,x,y,R=4,SIDE=[[-1.5,0],[-.5,0],[.5,.22],[1.5,.09],[2.5,.03]],TOP=[[-1.5,0],[-.5,0],[.5,.06],[1.5,.02],[2.5,0]];
   function prof(P,t){if(t<P[0][0]||t>=P[P.length-1][0]+1)return 0;for(var k=P.length-1;k>=0;k--)if(t>=P[k][0])return P[k][1];return 0}
   for(y=0;y<H3;y++)for(x=0;x<W3;x++){var c=cov[(y*W3+x)*4+3]/255,ins=c>=.5,best=9;
    for(var dy=-R;dy<=R;dy++)for(var dx=-R;dx<=R;dx++){var yy=y+dy,xx=x+dx;if(yy<0||yy>=H3||xx<0||xx>=W3)continue;if((cov[(yy*W3+xx)*4+3]>=128)!==ins){var dd=Math.sqrt(dx*dx+dy*dy);if(dd<best)best=dd}}
    if(best>=9)continue;var t=ins?-(best-.5):(best-.5);if(c>.03&&c<.97)t=.5-c;
    var bx=x/3-MP,by=y/3-MP,r=BH/2,w=0;if(bx<r||bx>BW-r){var ex=bx<r?r-bx:bx-(BW-r),ey=by-r;w=Math.abs(ex)/Math.max(.001,Math.sqrt(ex*ex+ey*ey))}w=w*w*(3-2*w);
    var a=w*prof(SIDE,t)+(1-w)*prof(TOP,t);d[(y*W3+x)*4+3]=Math.round(Math.min(1,a)*255)}});
  out.sat=png(W3,H3,function(d){for(i=0;i<N;i++){var s=map.kl[i]>.05?map.kc[i]/map.kl[i]:1,w=Math.min(1,Math.max(0,(s-1)/(SMAX-1)));d[i*4+3]=Math.round(w*255)}});
  cb(out)}
 function rimMap(cb){var im=new Image();im.onload=function(){try{var c=document.createElement('canvas');c.width=im.width;c.height=im.height;var x=c.getContext('2d');x.drawImage(im,0,0);
   var d=x.getImageData(0,0,im.width,im.height).data,cw=im.width,rh=im.height/2,W3=BWX*3,N=W3*rh,m={a:new Float32Array(N),kl:new Float32Array(N),kc:new Float32Array(N),b:new Float32Array(N)},L=cw-1,X,y,sx,i,j;
   for(y=0;y<rh;y++)for(X=0;X<W3;X++){sx=X<L?X:(X>=W3-L?W3-1-X:L);i=(y*cw+sx)*4;j=y*W3+X;m.a[j]=d[i]-64;m.kl[j]=d[i+1]/200;m.kc[j]=d[i+2]/150;m.b[j]=d[((y+rh)*cw+sx)*4]/200-.1}
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
  function rimSamp(){var P=(/[?&]rs=([\d.,]+)/.exec(location.search)||[])[1],v=(P||'15,16,1.4,1').split(',').map(Number),EO=v[0],SG=v[1],DP=v[2],K=v[3];
   function m(dir,len){return 'linear-gradient('+dir+',rgba(0,0,0,'+K+') 0,rgba(0,0,0,'+K+') '+EO+'px,rgba(0,0,0,'+(K*.5).toFixed(3)+') '+(EO+len*.35).toFixed(2)+'px,rgba(0,0,0,0) '+(EO+len)+'px)'}
   function box(x,y,w,h,mk2){el('div','position:absolute;pointer-events:none;left:'+x+'px;top:'+y+'px;width:'+w+'px;height:'+h+'px;'+bf('blur('+SG+'px)')+mk2,WIN)}
   function mm(g,px,py){return '-webkit-mask-image:url('+L.mask+'),'+g+';mask-image:url('+L.mask+'),'+g+';-webkit-mask-composite:source-in;mask-composite:intersect;-webkit-mask-size:'+BWX+'px '+BHX+'px,100% 100%;mask-size:'+BWX+'px '+BHX+'px,100% 100%;-webkit-mask-position:'+px+'px '+py+'px,0 0;mask-position:'+px+'px '+py+'px,0 0;-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;'}
   /* top and bottom: full width, from EO pt outside to DP pt inside */
   box(0,MP-EO,BWX,EO+DP,mm(m('to bottom',DP),0,EO-MP));
   box(0,MP+BH-DP,BWX,EO+DP,mm(m('to top',DP),0,-(MP+BH-DP)));
   /* ends: from EO pt outside to the start of the straight part */
   box(MP-EO,0,EO+BH/2,BHX,mm(m('to right',DP),EO-MP,0));
   box(MP+BW-BH/2,0,EO+BH/2,BHX,mm(m('to left',DP),-(MP+BW-BH/2),0))}
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
