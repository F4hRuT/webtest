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
    bottom middle, leftmost point) at the exact signed distance to the outline, mixed top/side by the edge angle (mix fitted
    on the old map, smooth). The dark outline is stored in the map too (bottom half, green), same design, exact coverage. */
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
