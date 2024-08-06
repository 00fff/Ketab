import os
from google.cloud import vision
from google.cloud.vision_v1 import types

# Set up authentication

os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = r"ServiceAccountToken.json"

# Create a client
client = vision.ImageAnnotatorClient()

# Path to the image file
image_path = '../IMG_3157.jpg'

# Read the image file
with open(image_path, 'rb') as image_file:
    content = image_file.read()

# Create an image object
image = vision.Image(content=content)

# Perform text detection
response = client.document_text_detection(image=image)
# Get the text annotations
fullText = response.full_text_annotation.text
Demo_file = open("Demofile.txt", "w")
Demo_file.write(fullText)
Demo_file.close()
