import os
import io
from google.cloud import vision
import pandas as pd

# Set the path to the Google Cloud service account credentials file
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = r"E:\Ketab\fast-gecko-431701-t6-9e06164bd591.json"

# Initialize the Vision API client
client = vision.ImageAnnotatorClient()

# Define the image path
img_path = r"E:\Ketab\IMG_3157.jpg"  # Make sure this path is correct

# Open the image file
with io.open(img_path, 'rb') as image_file:
    content = image_file.read()

# Construct the image object
image = vision.Image(content=content)

# Perform text detection
response = client.text_detection(image=image)

# Initialize a list to collect text annotations
texts_list = []

# Extract text annotations and add them to the list
for text in response.text_annotations:
    texts_list.append({'locale': text.locale, 'description': text.description})

# Create a DataFrame from the list
df = pd.DataFrame(texts_list)

# Print the DataFrame
print(df)
