from flask import Flask, render_template, request, flash, redirect, url_for, jsonify, session
from gotrue.errors import AuthApiError
from supabase import create_client
from flask_cors import CORS, cross_origin
from werkzeug.utils import secure_filename
import os
from dotenv import load_dotenv
from google.cloud import vision
from google.cloud.vision_v1 import types
import datetime
import jwt
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
def home():
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
        user_id = response.user.id  # Retrieve the user ID from the sign-up response
        create_display_profile = supabase.table("profile").insert({
        "id": user_id,
        "display_name": username,
        "pfp": '',
        "description": '',
    }).execute()
        jwt_token = jwt.encode({"email": email, "password": password, 'exp': datetime.datetime.utcnow() + datetime.timedelta(days=30)}, "secret", algorithm="HS256")
        session['jwt_token'] = jwt_token
        return jsonify({'message': 'Account Succefully Created', 'jwt_token': jwt_token}), 200
    return jsonify({'message': 'Invalid request method'}), 400

@app.route('/token', methods=['POST', 'GET'])
@cross_origin(supports_credentials=True)
def token():
    if request.method == 'GET':
        if session['jwt_token']:
            return session['jwt_token']
    else: 
        return jsonify({'message': 'Invalid request method'}), 400

@app.route("/signIn", methods=['POST'])
@cross_origin(supports_credentials=True)
def signIn():      
    try: 
        if request.method == 'POST':
            email = request.form.get('email')
            password = request.form.get('password')
            # Authenticate with Supabase
            login = supabase.auth.sign_in_with_password({"email": email, "password": password})
            utc_now = datetime.datetime.now(datetime.timezone.utc)
            # Generate JWT token (don't include password in the token)
            jwt_token = jwt.encode(
                {"email": email, "exp": utc_now + datetime.timedelta(days=30)}, "your_jwt_secret", algorithm="HS256")
            # Store JWT token in session
            session['jwt_token'] = jwt_token
            return jsonify({'message': 'Sign in successful', 'jwt_token': jwt_token}), 200
    except AuthApiError as e:
            # Handle specific authentication errors
            if "Email not confirmed" in str(e):
                return jsonify({'message': 'Email not confirmed. Please check your email to confirm your account.'}), 400
            else:
                return jsonify({'message': f'Authentication failed: {str(e)}'}), 400


        

@app.route("/logOut", methods= ["POST", "GET"])
@cross_origin(supports_credentials=True)
def logOut():
    if request.method =='POST':
        response = supabase.auth.sign_out()
        return jsonify({'message': 'Succefully Logged Out'}), 200
    return jsonify({'message': 'Invalid request method'}), 400

@app.route("/current_user", methods=['POST', 'GET'])
@cross_origin(supports_credentials=True)
def current_user():
    if request.method =='GET':
        response = supabase.auth.get_user()
        email = response.user.email
        profile_table = supabase.table("profile").select("*").execute()
        name = profile_table.data[0]['display_name']
        pfp = profile_table.data[0]['pfp']
        user_information = {'name': name, 'email': email, 'pfp': pfp}
        return jsonify(user_information), 200
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
        return jsonify({'title': title, 'description': description})
    
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
    app.run(debug=True, host='0.0.0.0', port=8080)


    
