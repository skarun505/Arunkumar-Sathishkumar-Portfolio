import http.server
import socketserver
import os

PORT = 8000

class CleanUrlHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # If path is exactly root, standard behavior (index.html)
        if self.path == '/':
            return super().do_GET()
            
        # Get the file system path
        path = self.translate_path(self.path)
        
        # If the path exists as a directory (and we aren't at root), let standard handler deal (might add /)
        if os.path.isdir(path):
            return super().do_GET()
            
        # If path doesn't exist as a file, try adding .html
        if not os.path.exists(path):
            if os.path.exists(path + ".html"):
                self.path += ".html"
                
        return super().do_GET()

# Allow reusing address to prevent "Address already in use" errors on restart
socketserver.TCPServer.allow_reuse_address = True

print(f"Starting Clean URL Server on http://localhost:{PORT}")
print("This server automatically handles extensionless URLs (e.g., /contact -> /contact.html)")

with socketserver.TCPServer(("", PORT), CleanUrlHandler) as httpd:
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass
