import os  
from flask import Flask, render_template, request, jsonify  
from modelconn import search 
  
app = Flask(__name__)  
  
  
@app.route("/")  
def hello_world():  
    return render_template("index.html")  
  
@app.route("/search", methods=["POST"])  
def search_route():  
    data = request.get_json()  
    prompt = data.get("prompt")  
    if not prompt:  
        return jsonify({"error": "No prompt provided"}), 400  
    response = search(prompt)  
    return jsonify({"response": response})  
  
if __name__ == "__main__":  
    app.run(host='0.0.0.0', debug=True)  
