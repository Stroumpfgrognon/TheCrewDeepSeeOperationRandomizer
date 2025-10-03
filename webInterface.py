import webbrowser
from flask import Flask, render_template, request, redirect, make_response,send_from_directory
from crewOperationRandomizer import generate_missions
import json

app = Flask(__name__)

@app.route('/',methods=['GET'])
def index():
    return send_from_directory("static/html","Interface.html")

@app.route('/generate',methods=['GET'])
def generate():
    players = request.args.get('players', default=4, type=int)
    difficulty = request.args.get('difficulty', default=50, type=int)
    converted = request.args.get('converted', default='false', type=str)
    converted = True if converted.lower() == 'true' else False
    print(f"Generating missions for {players} players with difficulty {difficulty} and converted={converted}")
    # Logique de génération des missions (exemple simple)
    missions = generate_missions(players, difficulty)
    missions_dumpable = [{"difficulty": mission.getLevel(players), "description": mission.getDescription(converted)} for mission in missions]
    print(f"Generated missions: {missions_dumpable}")
    return json.dumps(missions_dumpable)

if __name__ == '__main__':
    webbrowser.open("http://localhost:8000")
    app.run(debug=False,port=8000) #Lance l'application
    
