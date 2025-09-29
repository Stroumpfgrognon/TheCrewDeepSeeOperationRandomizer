import webbrowser
from flask import Flask, render_template, request, redirect, make_response,send_from_directory

app = Flask(__name__)

@app.route('/',methods=['GET'])
def index():
    return send_from_directory("static","./Interface.html")

if __name__ == '__main__':
    webbrowser.open("http://localhost:8000")
    app.run(debug=False,port=8000) #Lance l'application
    
