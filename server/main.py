from flask import Flask, render_template, request, flash, redirect, url_for, jsonify
from supabase import create_client
from flask_cors import CORS, cross_origin
from werkzeug.utils import secure_filename
import os
from models import db
from dotenv import load_dotenv
from google.cloud import vision
from google.cloud.vision_v1 import types
# Load environment variables from .env file
load_dotenv()
# variables 
UPLOAD_FOLDER = '/uploads'
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg',}
def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
# Set up authentication
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = r"ServiceAccountToken.json"
# Create a client
client = vision.ImageAnnotatorClient()

# Set Up Flask App
app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
app.config['UPLOAD_FOLDER'] = os.path.join(os.path.dirname(__file__), 'uploads')
# allows for React to fetch
CORS(app, supports_credentials=True, origins="*")
# Setting Up Database
SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_KEY")
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)


# Image Route
@app.route("/")
@cross_origin(supports_credentials=True)
def translate():
    return redirect('http://localhost:8081/home')

# Image Route
@app.route("/translate")
@cross_origin(supports_credentials=True)
def translate():
    return render_template("index.html")



@app.route("/signUp", methods=['POST'])
@cross_origin(supports_credentials=True)
def signUp():
    if request.method == 'POST':
        username = request.form.get('username')
        email = request.form.get('email')
        password = request.form.get('password')
        
        # Step 1: Sign up the user
        response = supabase.auth.sign_up({"email": email, "password": password})
        return jsonify({'message': 'Account Succefully Created'}), 200
    return jsonify({'message': 'Invalid request method'}), 400


@app.route("/signIn", methods=['POST'])
@cross_origin(supports_credentials=True)
def signIn():   
    if request.method == 'POST':
        email = request.form.email
        password = request.form.password
        login = supabase.auth.sign_in_with_password({"email": email, "password": password})
        return jsonify({'email': email, 'password': password})
    
    return jsonify({'message': 'Invalid request method'}), 400

@app.route("/createBook", methods=['POST'])
@cross_origin(supports_credentials=True)
def createBook():
    if request.method == 'POST':
        title = request.form.get('title')
        description = request.form.get('description')
        response = (
    supabase.table("books")
    .insert({"id": 1, "title": title, 'description':description})
    .execute()
)
        return jsonify({'email': title, 'password': description})
    
    return jsonify({'message': 'Invalid request method'}), 400



@app.route("/upload", methods=['GET', 'POST'])
@cross_origin(supports_credentials=True)
def upload():
    if request.method == 'POST':
        if 'file' not in request.files:
            flash('No file part')
            return redirect(request.url)
        file = request.files['file']
        if file.filename == '':
            flash('No selected file')
            return redirect(request.url)
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            save_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            image_path = save_path
            if image_path:
                with open(image_path, 'rb') as image_file:
                    content = image_file.read()
                image = vision.Image(content=content)
                # Perform text detection
                response = client.document_text_detection(image=image)
                # Get the text annotations
                fullText = response.full_text_annotation.text
                filename = filename.rsplit('.', 1)[0]
                filename = f"{filename}_translated.txt"
                translated_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
                # Save the detected text to the new file
                with open(translated_path, 'w') as text_file:
                    text_file.write(fullText)
                # Demo_file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
                # Demo_file = open(f"{filename}", "w")
                # Demo_file.write(fullText)
                # Demo_file.close()
            else:
                return "<h1>no image path</h1>"
    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True, port=8080)

    
