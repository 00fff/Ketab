from flask import Flask, render_template, request, flash, redirect, url_for
from flask_cors import CORS, cross_origin
from werkzeug.utils import secure_filename
import os
from google.cloud import vision
from google.cloud.vision_v1 import types
# variables 
UPLOAD_FOLDER = '/uploads'
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg',}
def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
# Set up authentication
    #os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = r"ServiceAccountToken.json"
# Create a client
    #client = vision.ImageAnnotatorClient()
# Set Up Flask App
app = Flask(__name__)
app.secret_key = ("ioefjefjieiofjefjio")
app.config['UPLOAD_FOLDER'] = os.path.join(os.path.dirname(__file__), 'uploads')
CORS(app, supports_credentials=True, origins="*")

# Image Route
@app.route("/")
@cross_origin(supports_credentials=True)
def translate():
    return render_template("index.html")

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
            save_path = os.path.join(UPLOAD_FOLDER, filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            print(save_path)
    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True, port=8080)

    

# # Path to the image file
# image_path = '../IMG_3157.jpg'

# # Read the image file
# with open(image_path, 'rb') as image_file:
#     content = image_file.read()

# # Create an image object
# image = vision.Image(content=content)

# # Perform text detection
# response = client.document_text_detection(image=image)
# # Get the text annotations
# fullText = response.full_text_annotation.text

# Demo_file = open("Demofile.txt", "w")
# Demo_file.write(fullText)
# Demo_file.close()
