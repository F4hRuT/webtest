import http.server, sys, os, time
ROOT='/Users/artem_fahrutdinov/Desktop/Projects/webtest'
OUT='/private/tmp/claude-501/-Users-artem-fahrutdinov-Desktop-Projects-webtest/a2fd9e5b-0c4e-42c1-804d-5d5b273638f9/scratchpad'
class H(http.server.SimpleHTTPRequestHandler):
    def __init__(s,*a,**k): super().__init__(*a,directory=ROOT,**k)
    def end_headers(s):
        s.send_header('Cache-Control','no-store'); super().end_headers()
    def do_POST(s):
        n=int(s.headers.get('Content-Length',0)); body=s.rfile.read(n)
        name=s.path.strip('/').replace('/','_') or 'post'
        if name.startswith('glslog'):
            open(os.path.join(OUT,'glslog.txt'),'ab').write(body+b'\n')
        else:
            open(os.path.join(OUT,'post_'+name),'wb').write(body)
        s.send_response(200); s.end_headers(); s.wfile.write(b'ok')
http.server.ThreadingHTTPServer(('',8002),H).serve_forever()
