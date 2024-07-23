# ChatGPT-Clone

In the provided Flask application, the / and /search routes serve different purposes and are connected through the frontend (HTML form and JavaScript). Let's go through each route and understand how they interact with each other to send and receive data.


/ Route
 

Purpose:

The / route is responsible for rendering the initial HTML page, which contains a form that the user can fill out.

Code

@app.route("/")  
def hello_world():  
    return render_template("index.html")  


Route: /
HTTP Method: GET
Function: hello_world
Action: Renders the index.html template.

JavaScript Fetch API:
The JavaScript code captures the value entered in the textarea.
It sends this value to the /search route using a POST request.
The fetch function is used to make the POST request. It sends the data as a JSON object with the Content-Type header set to application/json.


/search Route
 

Purpose
 
The /search route processes the data sent from the client, interacts with the Azure OpenAI API, and returns the result to the client.
Code
 

@app.route("/search", methods=["POST"])  
def search_route():  
    data = request.get_json()  
    prompt = data.get("prompt")  
    if not prompt:  
        return jsonify({"error": "No prompt provided"}), 400  
    response = search(prompt)  
    return jsonify({"response": response})  

Route: /search
HTTP Method: POST
Function: search_route
Action:
Extracts the JSON data from the request.
Retrieves the prompt from the JSON data.
If the prompt is not provided, it returns an error message with a 400 status code.
Calls the search function with the prompt and gets the response.
Returns the response as a JSON object.