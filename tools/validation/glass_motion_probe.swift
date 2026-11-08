// Экспериментальный измеритель для отдельной сборки Glass в виртуальном iPhone.
// Ограничения координат/тайминга и запуск: docs/MOTION_STUDY.md. Не включать в production.
import UIKit

final class ProbeWindow: UIWindow {
 override func sendEvent(_ event:UIEvent) {
  for t in event.allTouches ?? [] where t.phase == .began || t.phase == .ended || t.phase == .cancelled {
   let p=t.location(in:self)
   MotionProbe.instance?.events.append(["t":t.timestamp,"now":CACurrentMediaTime(),"phase":t.phase.rawValue,"x":p.x,"y":p.y])
  }
  super.sendEvent(event)
 }
}
final class MotionProbe: NSObject {
 static var instance: MotionProbe?
 let window:UIWindow
 var link:CADisplayLink!
 var frames:[[String:Any]]=[]
 var events:[[String:Any]]=[]
 var lastWrite:CFTimeInterval=0
 init(_ w:UIWindow){window=w;super.init()}
 static func start(_ w:UIWindow){let p=MotionProbe(w);instance=p;p.link=CADisplayLink(target:p,selector:#selector(p.tick));p.link.preferredFrameRateRange=CAFrameRateRange(minimum:60,maximum:120,preferred:120);p.link.add(to:.main,forMode:.common)}
 static func safe(_ v:Any)->Any {
  if let n=v as? NSNumber{return n.doubleValue.isFinite ? n : String(describing:n)}
  if let a=v as? [Any]{return a.map{safe($0)}}
  if let d=v as? [String:Any]{return d.mapValues{safe($0)}}
  return v
 }
 func collect(_ l:CALayer,_ path:String,_ parent:CGAffineTransform,_ result:inout [[String:Any]]) {
  let p=l
  let modelLayer=l.model()
  let m=p.affineTransform()
  let ax=p.bounds.minX+p.bounds.width*p.anchorPoint.x, ay=p.bounds.minY+p.bounds.height*p.anchorPoint.y
  let local=CGAffineTransform(a:m.a,b:m.b,c:m.c,d:m.d,tx:p.position.x+m.tx-m.a*ax-m.c*ay,ty:p.position.y+m.ty-m.b*ax-m.d*ay)
  let global=local.concatenating(parent)
  let name=(modelLayer.delegate as? UIView).map{String(describing:type(of:$0))} ?? String(describing:type(of:l))
  if ["_UITabBarItemPlatterView","_UILiquidLensView","_UITabSelectionView","ClearGlassView","GlowContainerView","LittleGlowView","BackdropView"].contains(name) || (name=="UIView" && path.contains("lens")) {
   let r=p.bounds.applying(global)
   let model=(modelLayer.delegate as? UIView).map{$0.convert($0.bounds,to:(window.rootViewController as? UITabBarController)?.tabBar)} ?? .zero
   result.append(["modelRect":[model.minX,model.minY,model.width,model.height],"modelBounds":[modelLayer.bounds.width,modelLayer.bounds.height],"modelPos":[modelLayer.position.x,modelLayer.position.y],"modelMatrix":[modelLayer.transform.m11,modelLayer.transform.m22,modelLayer.transform.m41,modelLayer.transform.m42],"id":path,"view":name,"bounds":[p.bounds.width,p.bounds.height],"pos":[p.position.x,p.position.y],"rect":[r.minX,r.minY,r.width,r.height],"opacity":p.opacity,"matrix":[p.transform.m11,p.transform.m22,p.transform.m41,p.transform.m42],"shadow":[p.shadowOpacity,p.shadowRadius,p.shadowOffset.width,p.shadowOffset.height]])
  }
  for(i,s) in (l.sublayers ?? []).enumerated(){collect(s,path+(name=="_UILiquidLensView" ? "/lens" : "")+"/"+String(i),global,&result)}
 }
 @objc func tick(_ d:CADisplayLink){
  guard let tab=(window.rootViewController as? UITabBarController)?.tabBar else{return}
  let root=tab.layer.presentation() ?? tab.layer
  var rows:[[String:Any]]=[];for(i,s) in (root.sublayers ?? []).enumerated(){collect(s,"tab/"+String(i),.identity,&rows)}
  frames.append(["t":d.timestamp,"now":CACurrentMediaTime(),"target":d.targetTimestamp,"layers":rows])
  if d.timestamp-lastWrite>1 {
   lastWrite=d.timestamp;let batch:[String:Any]=["frames":frames,"events":events];frames=[];events=[]
   let docs=FileManager.default.urls(for:.documentDirectory,in:.userDomainMask)[0]
   let fn="probe-\(Int(d.timestamp*1000)).json"
   DispatchQueue.global(qos:.utility).async{if let data=try? JSONSerialization.data(withJSONObject:MotionProbe.safe(batch)){try? data.write(to:docs.appendingPathComponent(fn),options:.atomic)}}
  }
 }
}
