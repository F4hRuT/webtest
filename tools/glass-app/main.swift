import UIKit

// Spec-driven scene. Host writes Documents/spec.json; app renders and writes Documents/ack.txt.
final class Scene: UIViewController {
    let scroll = UIScrollView()
    let plain = UIView()
    let iv = UIImageView()
    var lastMod: Date? = nil
    var link: CADisplayLink?
    var t0: CFTimeInterval = 0
    var anim: [String: Any] = [:]
    var oy: CGFloat = 0
    var useScroll = true
    let docs = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask)[0]

    init(_ t: String, _ i: String) { super.init(nibName: nil, bundle: nil); tabBarItem = UITabBarItem(title: t, image: UIImage(systemName: i), tag: 0) }
    required init?(coder: NSCoder) { fatalError() }

    override func viewDidLoad() {
        view.backgroundColor = .black
        scroll.frame = view.bounds; scroll.autoresizingMask = [.flexibleWidth, .flexibleHeight]
        scroll.contentInsetAdjustmentBehavior = .never
        scroll.showsVerticalScrollIndicator = false
        scroll.alwaysBounceVertical = true
        plain.frame = view.bounds; plain.autoresizingMask = [.flexibleWidth, .flexibleHeight]
        view.addSubview(plain); view.addSubview(scroll)
        Timer.scheduledTimer(withTimeInterval: 0.05, repeats: true) { [weak self] _ in self?.poll() }
    }

    func col(_ a: [Any]?, _ d: UIColor = .black) -> UIColor {
        guard let a = a as? [Double], a.count >= 3 else { return d }
        return UIColor(red: a[0]/255, green: a[1]/255, blue: a[2]/255, alpha: a.count > 3 ? a[3] : 1)
    }

    func poll() {
        let u = docs.appendingPathComponent("spec.json")
        guard let at = try? FileManager.default.attributesOfItem(atPath: u.path), let m = at[.modificationDate] as? Date else { return }
        if m == lastMod { return }
        lastMod = m
        guard let d = try? Data(contentsOf: u), let j = try? JSONSerialization.jsonObject(with: d) as? [String: Any] else { return }
        if let t = j["tab"] as? Int, let tb = tabBarController, tb.selectedIndex != t { tb.selectedIndex = t }
        apply(j)
    }

    func render(_ j: [String: Any], _ W: CGFloat, _ H: CGFloat) -> UIImage {
        let f = UIGraphicsImageRendererFormat(); f.scale = 3; f.opaque = true
        if #available(iOS 12.0, *) { f.preferredRange = .standard }
        return UIGraphicsImageRenderer(size: CGSize(width: W, height: H), format: f).image { ctx in
            let c = ctx.cgContext
            col(j["bg"] as? [Any]).setFill(); c.fill(CGRect(x: 0, y: 0, width: W, height: H))
            if let name = j["img"] as? String, let im = UIImage(contentsOfFile: docs.appendingPathComponent(name).path) {
                let s = CGFloat(j["imgScale"] as? Double ?? 3)
                let x = CGFloat(j["imgX"] as? Double ?? 0), y = CGFloat(j["imgY"] as? Double ?? 0)
                c.interpolationQuality = .none
                im.draw(in: CGRect(x: x, y: y, width: im.size.width * im.scale / s, height: im.size.height * im.scale / s))
            }
            for r in (j["rects"] as? [[Any]] ?? []) {
                guard r.count >= 7, let n = r as? [Double] else { continue }
                let rc = CGRect(x: n[0], y: n[1], width: n[2], height: n[3])
                col(Array(n[4...]).prefix(3).map { $0 } + (n.count > 8 ? [n[8]] : [])).setFill()
                if n.count > 7 && n[7] > 0 { UIBezierPath(roundedRect: rc, cornerRadius: n[7]).fill() } else { c.fill(rc) }
            }
            for t in (j["texts"] as? [[Any]] ?? []) { // [x,y,size,text,r,g,b]
                guard t.count >= 7, let x = t[0] as? Double, let y = t[1] as? Double, let sz = t[2] as? Double, let s = t[3] as? String else { continue }
                let cc = col([t[4], t[5], t[6]])
                (s as NSString).draw(at: CGPoint(x: x, y: y), withAttributes: [.font: UIFont.systemFont(ofSize: sz, weight: .bold), .foregroundColor: cc])
            }
        }
    }

    func apply(_ j: [String: Any]) {
        let W = view.bounds.width
        let H = CGFloat(j["h"] as? Double ?? Double(view.bounds.height))
        let im = render(j, W, H)
        iv.image = im
        iv.frame = CGRect(x: 0, y: 0, width: W, height: H)
        useScroll = (j["scroll"] as? Bool) ?? true
        iv.removeFromSuperview()
        if useScroll {
            scroll.isHidden = false; scroll.addSubview(iv); scroll.contentSize = CGSize(width: W, height: H)
            let e = j["edge"] as? String ?? "auto"
            scroll.bottomEdgeEffect.isHidden = (e == "none")
            scroll.topEdgeEffect.isHidden = (e == "none")
            if e == "hard" { scroll.bottomEdgeEffect.style = .hard } else if e == "soft" { scroll.bottomEdgeEffect.style = .soft } else { scroll.bottomEdgeEffect.style = .automatic }
        } else {
            scroll.isHidden = true; plain.addSubview(iv)
        }
        if let tb = tabBarController?.tabBar, let ts = j["titles"] as? [String] {
            // custom tab titles/symbols (e.g. the bank menu's labels) to see how iOS lays the items out
            let sy = j["symbols"] as? [String] ?? []
            for (k, it) in (tb.items ?? []).enumerated() where k < ts.count { it.title = ts[k]; it.accessibilityHint = ts[k]; if k < sy.count { it.image = UIImage(systemName: sy[k]) } }
        }
        if let tb = tabBarController?.tabBar {
            let show = (j["icons"] as? Bool) ?? true
            tb.tintColor = show ? nil : .clear
            tb.unselectedItemTintColor = show ? nil : .clear
            for it in tb.items ?? [] {
                if show { it.setTitleTextAttributes(nil, for: .normal) } else { it.setTitleTextAttributes([.foregroundColor: UIColor.clear], for: .normal); it.setTitleTextAttributes([.foregroundColor: UIColor.clear], for: .selected) }
                if !show { if it.tag == 0 { it.tag = 1; it.accessibilityHint = it.title }; it.title = " " } else if let t = it.accessibilityHint { it.title = t }
                if !show, let im = it.image { it.image = im.withTintColor(.clear, renderingMode: .alwaysOriginal) }
                if show, let im = it.image { it.image = im.withRenderingMode(.alwaysTemplate) }
            }
        }
        oy = CGFloat(j["oy"] as? Double ?? 0)
        setY(oy)
        anim = j["anim"] as? [String: Any] ?? [:]
        link?.invalidate(); link = nil
        if !anim.isEmpty {
            t0 = CACurrentMediaTime() + (anim["delay"] as? Double ?? 0)
            let l = CADisplayLink(target: self, selector: #selector(tick))
            if #available(iOS 15.0, *) { l.preferredFrameRateRange = CAFrameRateRange(minimum: 60, maximum: 60, preferred: 60) }
            l.add(to: .main, forMode: .common); link = l
        }
        let id = j["id"] as? Int ?? 0
        DispatchQueue.main.asyncAfter(deadline: .now() + 0.05) {
            try? "\(id)".write(to: self.docs.appendingPathComponent("ack.txt"), atomically: true, encoding: .utf8)
        }
    }

    func setY(_ y: CGFloat) {
        if useScroll { scroll.contentOffset = CGPoint(x: 0, y: y) } else { iv.frame.origin.y = -y }
    }

    @objc func tick() {
        let t = CACurrentMediaTime() - t0
        if t < 0 { return }
        let vy = CGFloat(anim["vy"] as? Double ?? 0)
        let dur = anim["dur"] as? Double ?? 1
        if let steps = anim["step"] as? Double { // jump by steps: change offset every `every` seconds
            let every = anim["every"] as? Double ?? 0.5
            let k = min(floor(t / every), floor(dur / every))
            setY(oy + CGFloat(k * steps)); if t > dur { link?.invalidate(); link = nil }; return
        }
        setY(oy + vy * CGFloat(min(t, dur)))
        if t > dur { link?.invalidate(); link = nil }
    }
}

final class VC: UIViewController {
    init(_ t: String, _ s: String) { super.init(nibName: nil, bundle: nil); tabBarItem = UITabBarItem(title: t, image: UIImage(systemName: s), tag: 0) }
    required init?(coder: NSCoder) { fatalError() }
    override func viewDidLoad() { view.backgroundColor = .black }
}

final class SceneDelegate: UIResponder, UIWindowSceneDelegate {
    var window: UIWindow?
    func scene(_ scene: UIScene, willConnectTo session: UISceneSession, options: UIScene.ConnectionOptions) {
        guard let ws = scene as? UIWindowScene else { return }
        let tb = UITabBarController()
        tb.viewControllers = [Scene("Один","circle"), Scene("Два","star"), Scene("Три","square"), Scene("Четыре","person")]
        tb.tabBarMinimizeBehavior = .never
        let w = UIWindow(windowScene: ws); w.overrideUserInterfaceStyle = .dark; w.rootViewController = tb; w.makeKeyAndVisible(); window = w
    }
}
@main final class App: UIResponder, UIApplicationDelegate {
    func application(_ a: UIApplication, configurationForConnecting s: UISceneSession, options: UIScene.ConnectionOptions) -> UISceneConfiguration {
        let c = UISceneConfiguration(name: "Default", sessionRole: s.role); c.delegateClass = SceneDelegate.self; return c
    }
}
