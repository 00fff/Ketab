from unicodedata import name
from flask import Flask, render_template, request, flash, redirect, url_for, jsonify, session
from gotrue.errors import AuthApiError
from supabase import create_client
from flask_cors import CORS, cross_origin
from werkzeug.utils import secure_filename
import base64
import uuid
from PIL import Image
import io
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
app.secret_key = os.getenv('SECRET_KEY')
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
        try:
            # Sign up the user
            response = supabase.auth.sign_up({"email": email, "password": password})
            user_id = response.user.id  # Retrieve the user ID from the sign-up response

            # Create user profile
            supabase.table("profile").insert({
                "id": user_id,
                "display_name": username,
                "pfp": '',
                "description": '',
            }).execute()

            # Generate JWT token
            jwt_token = jwt.encode({
                "email": email,
                'user_id': user_id,
                'exp': datetime.datetime.utcnow() + datetime.timedelta(days=30)
            }, "your_jwt_secret", algorithm="HS256")

            # Store JWT token and user ID in session
            session['jwt_token'] = jwt_token
            session['user_id'] = user_id

            return jsonify({'message': 'Account Successfully Created', 'jwt_token': jwt_token}), 200
        except AuthApiError as e:
            return jsonify({'message': f'Error during sign up: {str(e)}'}), 400
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
            user_id = login.user.id
            utc_now = datetime.datetime.now(datetime.timezone.utc)
            # Generate JWT token (don't include password in the token)
            jwt_token = jwt.encode(
                {"email": email, 'user_id': user_id, "exp": utc_now + datetime.timedelta(days=30)}, "your_jwt_secret", algorithm="HS256")
            # Store JWT token in session
            session['jwt_token'] = jwt_token 
            session['user_id'] = user_id
            print(session['user_id'])
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
        session.clear()
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
        if request.form.get('img'):
            img = request.form.get('img')
        book_id = request.form.get('id')
        user_id = session["user_id"]
        base64_data = img.split(',')[1]
        image_bytes = base64.b64decode(base64_data)
        
        response = (
            supabase.table("books")
            .insert({"title": title, 'description':description, 'user_id': user_id})
            .execute()
        )
        book = (
            supabase.table("books")
            .select("id")
            .eq("title", title)
            .execute()
        )
        book_id = book.data[0]['id']
        print(book_id)
        file_path = f'{user_id}/{book_id}/cover.png'
        response = supabase.storage.from_('Pages').upload(file_path, image_bytes)
        res = supabase.storage.from_('Pages').get_public_url(file_path)
        response = (
                supabase.table("books")
                .update({"cover": res})
                .eq("title", title)
                .execute()
            )
        
        

        return jsonify({'title': title, 'description': description})
    
    return jsonify({'message': 'Invalid request method'}), 400
@app.route("/UpdateText", methods=['POST'])
@cross_origin(supports_credentials=True)
def UpdateText():
    if request.method =='POST':
        new_text = request.form.get('text')
        id = request.form.get('id')
        response = (
            supabase.table("page")
            .update({"translated_img": new_text})
            .eq("id", id)
            .execute()
        )
    return jsonify({'message': 'valid request method'}), 200

@app.route('/addPage', methods=['POST'])
@cross_origin(supports_credentials=True)
def addPage():
    if request.method == 'POST':
        # Get the base64 encoded image string from the request
        id = request.form.get("id")
        image_data = request.form.get('image') 
        if image_data:
            # Extract base64 data from the string (the part after the comma)
            base64_data = image_data.split(',')[1] 
            # Decode the base64 data into bytes
            image_bytes = base64.b64decode(base64_data)
            file_name = str(uuid.uuid4())
            # Optionally, you could open the image with PIL to verify its validity
            # image = Image.open(io.BytesIO(image_bytes))
            # Ensure the image is valid (uncomment if needed)
            # image.verify()
            # Define the file path where the image will be stored
            user_id = session.get("user_id")
            file_path = f'{user_id}/{id}/{file_name}.png'
            
            # Perform text extraction from the image
            text = translate(image_bytes)
            print(text)

            # Upload the image bytes to Supabase storage
            response = supabase.storage.from_('Pages').upload(file_path, image_bytes)
            res = supabase.storage.from_('Pages').get_public_url(file_path)
            createPage = (supabase.table("page")
            .insert({"book_id": id, "img": res, "translated_img": text})
            .execute()
            )
            return jsonify({'message': 'yippie'}), 200
        else:
            return jsonify({'message': 'No image data provided'}), 400
    
    return jsonify({'message': 'Invalid request method'}), 400

@app.route('/deleteBook', methods=['POST', 'GET'])
@cross_origin(supports_credentials=True)
def deleteBook():
    if request.method == 'POST':
        id = request.form.get('id')
        print(id)
        response = supabase.table('books').delete().eq('id', id).execute()
        user_id = user_id = session.get("user_id")
        file_path = f'{user_id}/{id}'
        bucket = supabase.storage.from_('Pages')
        list = bucket.list(path=file_path)
        print(list)
        delete_response = supabase.storage.from_("Pages").remove(file_path)
        # res = supabase.storage.empty_bucket(f"Pages/{file_path}")

        print(delete_response)
        return jsonify("Book Succefully Deleted"), 200

def translate(img):
    user_id = session.get("user_id")
    # Initialize the Vision API client
    client = vision.ImageAnnotatorClient()
    # Create a Vision API image object from the byte data
    image = vision.Image(content=img)
    # Perform text detection on the image
    response = client.document_text_detection(image=image)
    # Extract the full text annotation from the response
    full_text = response.full_text_annotation.text
    # Create a filename for the text file
    filename = "hello"
    translated_filename = f"{filename}_translated.txt"
    # Define the file path where the text will be stored
    file_path = f'{user_id}/{translated_filename}'
    # # Convert the extracted text to bytes
    # text_bytes = full_text.encode('utf-8')
    # # Upload the text bytes to Supabase storage
    # response = supabase.storage.from_('Pages').upload(file_path, text_bytes)
    return full_text

@app.route('/listBooks', methods=['GET', 'POST'])
@cross_origin(supports_credentials=True)
def listBooks():
    if request.method =='GET':
        user_id = session['user_id']
        response = supabase.table("books").select("title", "description", "id", "cover").eq("user_id", user_id).execute()
        # response = supabase.table("page").select("img, translated_img").eq("book_id", book_id).execute()
    return jsonify({'response': response.data}), 200

@app.route('/listPages', methods=['POST', 'GET'])
@cross_origin(supports_credentials=True)
def listPages():
    if request.method == 'GET':
        book_id = request.args.get('book_id')
        print(book_id)
        response = supabase.table("page").select("id", "img", "translated_img").eq("book_id", book_id).execute()
    return jsonify({'response': response.data}), 200


# @app.route("/upload", methods=['GET', 'POST'])
# @cross_origin(supports_credentials=True)
# def upload():
#     if request.method == 'POST':
#         if 'file' not in request.files:
#             flash('No file part')
#             return redirect(request.url)
#         file = request.files['file']
#         if file.filename == '':
#             flash('No selected file')
#             return redirect(request.url)
#         if file and allowed_file(file.filename):
#             filename = secure_filename(file.filename)
#             save_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
#             file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
#             image_path = save_path
#             if image_path:
#                 with open(image_path, 'rb') as image_file:
#                     content = image_file.read()
#                 image = vision.Image(content=content)
#                 # Perform text detection
#                 response = client.document_text_detection(image=image)
#                 # Get the text annotations
#                 fullText = response.full_text_annotation.text
#                 filename = filename.rsplit('.', 1)[0]
#                 filename = f"{filename}_translated.txt"
#                 translated_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
#                 # Save the detected text to the new file
#                 with open(translated_path, 'w') as text_file:
#                     text_file.write(fullText)
#                 # Demo_file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
#                 # Demo_file = open(f"{filename}", "w")
#                 # Demo_file.write(fullText)
#                 # Demo_file.close()
#             else:
#                 return "<h1>no image path</h1>"
#     return render_template("index.html")


if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=8080)


    
