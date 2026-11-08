// Compare the actual production motion functions with native layer telemetry.
// This is geometry validation, not browser rendering or a pixel-match claim.
const fs=require('node:fs'),vm=require('node:vm');
const source=fs.readFileSync(process.argv[2]||'work/motion/site/menu.js','utf8');
const curve=source.slice(source.indexOf('function Curve('),source.indexOf('/* v124:'));
const core=source.slice(source.indexOf('/* v124:'),source.indexOf('var FORCE='));
function context(){const c={window:{matchMedia:()=>({matches:false})},matchMedia:()=>({matches:false}),$(){return {style:{}}},CX0:53.64,PITCH:84.227,PW:99.55,PH:54,BASIC:false,performance:{now:()=>0}};vm.createContext(c);vm.runInContext(curve+core,c);return c;}
for(const file of process.argv.slice(3)){
 const fixture=JSON.parse(fs.readFileSync(file,'utf8'));
 const results=[];
 for(const s of fixture.sequences){
  const col=s.columns,idx=n=>col.indexOf(n),row=s.samples,first=row[0],end=row.findLast(r=>r[0]>1.2)||row.at(-1);
  const start=Math.round((first[idx('lens_pos_x')]-53.666667)/84.222222),to=Math.round((end[idx('lens_pos_x')]-53.666667)/84.222222);
  const c=context();c.motion.cx=c.CX0+c.PITCH*start;c.Lx=c.motion.cx-c.PW/2;c.Rx=c.motion.cx+c.PW/2;c.pressing=true;c.startTap(to);
  // Estimate transport/commit lag from base position only; no shape fitting.
  const step=t=>t<=0?0:1-Math.exp(-.853*15.83*t)*(Math.cos(15.83*Math.sqrt(1-.853**2)*t)+.853/Math.sqrt(1-.853**2)*Math.sin(15.83*Math.sqrt(1-.853**2)*t));
  let lag=0,best=Infinity;
  for(let l=-.02;l<.15;l+=.0005){let cost=0;for(const r of row.filter(r=>r[0]>=0&&r[0]<.6)){const norm=(r[idx('lens_pos_x')]-first[idx('lens_pos_x')])/((to-start)*84.222222);cost+=(step(r[0]-l)-norm)**2;}if(cost<best){best=cost;lag=l;}}
  const errs=[],peaks=[];let t=0;
  for(const r of row){const target=r[0]-lag;if(target<0)continue;while(t<target-1e-9){const dt=Math.min(1/240,target-t);t+=dt;c.mclock=t;c.pressing=t<s.duration;c.stepAnim(dt);}errs.push([(c.Lx+c.Rx)/2-r[idx('cx_bar')],c.Rx-c.Lx-r[idx('width_bar')],c.curH-r[idx('height_bar')]]);peaks.push(c.curH);}
  results.push({from:start,to,hold:+s.duration.toFixed(3),lag:+lag.toFixed(4),rmse_pt:[0,1,2].map(i=>+Math.sqrt(errs.reduce((a,e)=>a+e[i]**2,0)/errs.length).toFixed(3)),peak_height_pt:+Math.max(...peaks).toFixed(3)});
 }
 console.log(JSON.stringify({fixture:file,results},null,2));
}
// Irregular frames, rapid retargets, release while moving: finite, continuous,
// bounded, settles to the final tab. Uses the production functions directly.
const c=context();c.pressing=true;c.startTap(3);let min=Infinity,max=-Infinity;
for(let n=0;n<450;n++){const dt=[1/120,1/60,.046,.008][n%4];c.mclock+=dt;if(n===6)c.startTap(0);if(n===11)c.startTap(2);if(n===15)c.pressing=false;c.stepAnim(dt);for(const v of [c.Lx,c.Rx,c.curH,c.scaleV])if(!Number.isFinite(v))throw Error('nonfinite motion');min=Math.min(min,c.curH);max=Math.max(max,c.curH);}
if(Math.abs((c.Lx+c.Rx)/2-(c.CX0+2*c.PITCH))>.01||Math.abs(c.curH-c.PH)>.01)throw Error('failed to settle');
console.log(JSON.stringify({irregular_rapid_retarget:'passed',height_range:[min,max]}));
