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
