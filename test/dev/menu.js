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
var DPR=Math.min(4,pxr()*vz()),TS=Math.max(2,DPR),texW=null,texWS=null,texO=null,texOS=null;
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
 (Q?[[texW,'#ffffff'],[texO,'#b6d70a']]:[[texW,'#ffffff'],[texWS,'#ffffff'],[texO,'#b6d70a'],[texOS,'#b6d70a']]).forEach(function(p){var c=p[0],x=c.getContext('2d');x.setTransform(c.width/CW,0,0,c.height/CH,0,0);x.clearRect(R[0],R[1],R[2],R[3]);
  x.save();x.beginPath();x.rect(R[0],R[1],R[2],R[3]);x.clip();x.fillStyle=p[1];drawIcon(x,i,t);x.restore()});
 if(texOD&&!Q){var s=texO.width/CW,X0=Math.max(0,Math.floor(R[0]*s)),Y0=Math.max(0,Math.floor(R[1]*s)),X1=Math.min(texO.width,Math.ceil((R[0]+R[2])*s)),Y1=Math.min(texO.height,Math.ceil((R[1]+R[3])*s));
  var part=texOS.getContext('2d').getImageData(X0,Y0,X1-X0,Y1-Y0).data,W=texOD.width,rw=(X1-X0)*4;
  for(var y=Y0;y<Y1;y++)texOD.data.set(part.subarray((y-Y0)*rw,(y-Y0+1)*rw),(y*W+X0)*4);
  if(texWD&&texWS.width===texOS.width){var pw=texWS.getContext('2d').getImageData(X0,Y0,X1-X0,Y1-Y0).data;for(y=Y0;y<Y1;y++)texWD.data.set(pw.subarray((y-Y0)*rw,(y-Y0+1)*rw),(y*W+X0)*4)}}}
function stepIcon(){if(!icA)return false;var tt=(clock-icA.t0)/ICSLOW,k=KEYS[icA.i];if(tt>=ICDUR[k]){redrawIcon(icA.i,null);icA=null;return false}redrawIcon(icA.i,tt);return true}
function drawContent(x,color,weight){x.fillStyle=color;
 for(var i=0;i<4;i++){var ic=ICONS[KEYS[i]],q=POS[KEYS[i]],cxp=PADX+CX0+PITCH*i;
  drawIcon(x,i,null);
  x.font=weight+' 10px '+FONT;x.textAlign='center';x.textBaseline='alphabetic';x.fillText(LABELS[i],cxp,PADY+48.8)}}
function content(sc,color,weight,rf){var c=document.createElement('canvas');c.width=Math.round(CW*sc);c.height=Math.round(CH*sc);var x=c.getContext('2d',rf?{willReadFrequently:true}:undefined);x.setTransform(c.width/CW,0,0,c.height/CH,0,0);drawContent(x,color,weight);return c}
function buildTex(){texW=content(TS,'#ffffff',500);texWS=content(TS,'#ffffff',500,1);texO=content(TS,'#b6d70a',600);texOS=content(TS,'#b6d70a',600,1);texOD=texOS.getContext('2d').getImageData(0,0,texOS.width,texOS.height);texWD=texWS.getContext('2d').getImageData(0,0,texWS.width,texWS.height)}
var REFR={mag:1.096,band:.70,edge:.33,peek:12,rim:4,tb:.366,k:.8}      ,texOD=null,texWD=null,lensC=document.createElement('canvas'),lensX=lensC.getContext('2d'),lensID=null;
function mkLut(){var a=new Float32Array(1024),p=new Float32Array(1024);for(var i=0;i<1024;i++){a[i]=Math.pow(i/1023,REFR.edge);p[i]=Math.pow(i/1023,1.3)}return [a,p]}
/* v121 (speed): the lens is computed at most 2 px per pt (at 3x it was 2.25 times more work per frame) into a buffer that only grows (with
   a margin): before, the canvas and its pixel buffer were made anew on every frame the capsule changed size (garbage,
   stutters); one big buffer for the whole bar was worse (Safari uploads all of it every frame) */
function drawRefracted(c,cx,cy,hw,hh,pk){
 var sx=Math.min(2,baseC.width/CW),x0=Math.floor((cx-hw)*sx)-1,y0=Math.floor((cy-hh)*sx)-1,x1=Math.ceil((cx+hw)*sx)+1,y1=Math.ceil((cy+hh)*sx)+1,w=x1-x0,h=y1-y0;
 if(!lensID||w>lensC.width||h>lensC.height){lensC.width=Math.max(w,lensC.width)+24;lensC.height=Math.max(h,lensC.height)+12;lensID=lensX.createImageData(lensC.width,lensC.height)}var WA=lensC.width;
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
   out[o+2]=(src[p+2]*A00+src[p+6]*A10+src[q+2]*A01+src[q+6]*A11)/A;out[o+3]=A}o+=(WA-w)*4}
 lensX.putImageData(lensID,0,0,0,0,w,h);c.save();var kk=baseC.width/CW/sx;c.setTransform(kk,0,0,kk,0,0);c.drawImage(lensC,0,0,w,h,x0,y0,w,h);c.restore()}
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
function tick_(now){if(Q<2&&FORCE!=='full'&&FORCE!=='lite'&&(drag||an&&an.dir)&&lensV>.5){if(!fresh)FQ.push(now-last);if(FQ.length>=8){FQ.sort(function(a,b){return a-b});if(FQ[4]>30)setQ(Q+1);FQ=[]}}var dt=Math.min(fresh?1/60:.034,Math.max(0,(now-last)/1000))*SPEED;last=Math.max(last,now);fresh=0;var n=drag?Math.max(1,Math.ceil(dt/.004)):1,h=dt/n,busy=false;
 for(var i=0;i<n;i++){clock+=h;busy=stepAnim(h)}
 busy=stepIcon()||busy;if(introV())busy=true;
 paint();if(GLS)GLS.kick(150);raf=busy?requestAnimationFrame(tick):0;if(!raf)setTimeout(recomp,60)}
/* v121: fresh = the first frame of a new run: a page that switches its screen in the same tap makes that frame long (~45 ms
   on an iPhone 17 Pro), and the capsule then jumped forward at the very start of its move. Now it starts one frame later
   instead; a long frame in the middle of a move slows it for a moment (at most 2 frames of motion) instead of a jump */
var fresh=0;function go(){if(BASIC)return;if(reduce){if(an){an.t0=clock-10;an.rel=an.rel<0&&!pressing?0:an.rel}stepAnim(0);paint();return}if(!raf){last=performance.now();fresh=1;raf=requestAnimationFrame(tick)}}
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
 var WX=+((/[?&]wx=([\d.]+)/.exec(location.search)||[])[1]||5),WT=15,WB=13.67,WS=15.67,BL1=22,BL1O=+((/[?&]bl1o=([\d.]+)/.exec(location.search)||[])[1]||.45),BL2=+((/[?&]bl2=([\d.]+)/.exec(location.search)||[])[1]||13.26),GSAT=+((/[?&]gsat=([\d.]+)/.exec(location.search)||[])[1]||1.32);
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
  out.mul=png(W3,H3,function(d){for(i=0;i<N;i++){var al=Math.min(1,1-map.b[i]),v=al>.02?Math.min(1,Math.max(0,map.kl[i]/al)):1;d[i*4]=d[i*4+1]=d[i*4+2]=Math.round(v*255);d[i*4+3]=255}});
  out.add=png(W3,H3,function(d){for(i=0;i<N;i++){var al=Math.min(1,1-map.b[i]),v=al>.02?map.a[i]/al:0;v=Math.max(0,Math.min(255,v));d[i*4]=d[i*4+1]=d[i*4+2]=Math.round(v);d[i*4+3]=255}});
  out.sub=png(W3,H3,function(d){for(i=0;i<N;i++){var al=Math.min(1,1-map.b[i]),v=al>.02?-map.a[i]/al:0;v=Math.max(0,Math.min(255,v));d[i*4]=d[i*4+1]=d[i*4+2]=Math.round(255-v);d[i*4+3]=255}});
  /* the menu is its own group (fixed dock): outside the bar the group is see-through, and a neutral (white) multiply or
     plus-darker pixel would show there as light (also on the half-covered edge pixels). Their masks are therefore 1 only where
     the menu is opaque and they change something */
  /* the menu is its own group (fixed dock): where the group is see-through, multiply / plus-darker / the curve layers would
     show their own grey as light (v106: a light halo, then a staircase edge when cut off hard). So first an exact copy of the
     page is laid into the group on the half-covered edge ring (+2 px): every layer then works on an opaque backdrop and the
     edge keeps its smooth (fractional) coverage, like iOS */
  out.ring=png(W3,H3,function(d){var r=new Uint8Array(N),x,y,k,dy,dx;for(i=0;i<N;i++){var al=Math.min(1,1-map.b[i]);r[i]=al>.004&&al<.996?1:0}
   for(y=0;y<H3;y++)for(x=0;x<W3;x++){k=0;for(dy=-2;dy<=2&&!k;dy++)for(dx=-2;dx<=2;dx++){var yy=y+dy,xx=x+dx;if(yy>=0&&yy<H3&&xx>=0&&xx<W3&&r[yy*W3+xx]){k=1;break}}d[(y*W3+x)*4+3]=k?255:0}});
  /* Kl above 1 (the rim lights up more than the glass under it, e.g. the bottom rows on the iPhone): multiply can not go
     above 1, so the excess is added: a copy of what is under it, plus-lighter, with that excess as its alpha */
  out.klx=png(W3,H3,function(d){for(i=0;i<N;i++){var al=Math.min(1,1-map.b[i]);d[i*4+3]=al>=.97?Math.round(Math.min(1,Math.max(0,map.kl[i]/al-1))*255):0}});
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
    old per-pixel map (same values, rms 1 level) and kept smooth across angles; on the curves the profile is softened
    by 0.5 px across the edge (a 1 px line flickers from pixel to pixel on a curve). The dark outline is now a soft line
    (gaussian 0.65 px at the ends — v121 thinner, owner — and 0.8 px top/bottom) instead of 1 px steps. v122: inside the bar
    (from 1.3 pt from the edge, smoothed) the brightness only falls under the top rim and then only rises (one lowest point; A one whole
    level, the change in Kl): whole-level steps of A (1, 0, -1, 0) showed as two thin dark lines below the middle (v120), and
    v121 (A only rising) cut the glow under the top rim, a dark line 5 pt below the top. Inside the bar beta is exactly 0 (the old
    map had -0.005 in two rows, so multiply was 1/255 darker there: a faint line 9 pt below the top) and alpha is capped at 1. The dark outline is stored in the map too (bottom half, green), same design, exact coverage. */
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
