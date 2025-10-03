import webbrowser
from flask import Flask, render_template, request, redirect, make_response,send_from_directory
from crewMissionRandomizer import generate_missions
import json
from http.server import BaseHTTPRequestHandler, HTTPServer
import mimetypes

# app = Flask(__name__)

# @app.route('/',methods=['GET'])
# def index():
#     return send_from_directory("static/html","Interface.html")

# @app.route('/generate',methods=['GET'])
# def generate():
#     players = request.args.get('players', default=4, type=int)
#     difficulty = request.args.get('difficulty', default=50, type=int)
#     converted = request.args.get('converted', default='false', type=str)
#     converted = True if converted.lower() == 'true' else False
#     print(f"Generating missions for {players} players with difficulty {difficulty} and converted={converted}")
#     # Logique de génération des missions (exemple simple)
#     missions = generate_missions(players, difficulty)
#     missions_dumpable = [{"difficulty": mission.getLevel(players), "description": mission.getDescription(converted)} for mission in missions]
#     print(f"Generated missions: {missions_dumpable}")
#     return json.dumps(missions_dumpable)

# if __name__ == '__main__':
#     webbrowser.open("http://localhost:8000")
#     app.run(debug=False,port=8000) #Lance l'application
    
class RequestHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/':
            self.send_response(200)
            type='text/html'
            self.end_headers()
            with open("static/html/Interface.html", 'rb') as file:
                self.wfile.write(file.read())
        elif self.path.startswith('/static/'):
            self.end_headers()
            try:
                with open("."+self.path, 'rb') as file:
                    texte = file.read()
                    self.wfile.write(texte)
                    print(texte)
                    self.send_response(200)
            except FileNotFoundError:
                print("File not found:", self.path)
                self.send_response(404)
        else:
            self.send_response(404)
            self.end_headers()
    def do_POST(self):       
        if self.path.startswith('/generate'):
            query = self.path.split('?')[-1]
            params = dict(qc.split('=') for qc in query.split('&'))
            players = int(params.get('players', 4))
            difficulty = int(params.get('difficulty', 50))
            converted = params.get('converted', 'false').lower() == 'true'
            print(f"Generating missions for {players} players with difficulty {difficulty} and converted={converted}")
            missions = generate_missions(players, difficulty)
            missions_dumpable = [{"difficulty": mission.getLevel(players), "description": mission.getDescription(converted)} for mission in missions]
            print(f"Generated missions: {missions_dumpable}")
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(missions_dumpable).encode())
        else:
            self.send_response(404)
            self.end_headers()
            
httpd = HTTPServer(('localhost', 8000), RequestHandler)
webbrowser.open("http://localhost:8000")
httpd.serve_forever()