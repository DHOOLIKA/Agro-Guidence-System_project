from flask import Flask, request, jsonify
from flask_cors import CORS
import cv2
import numpy as np
import base64
import os

# 1. First, Flask app-ah create pannanum
app = Flask(__name__)

# 2. Apparam CORS enable pannanum
CORS(app)

# Face storage setup
FACES_PATH = 'registered_faces'
if not os.path.exists(FACES_PATH):
    os.makedirs(FACES_PATH)

# 3. Adhuku apparam thaan routes ezhudhanum
@app.route('/')
def home():
    return "AgroGuide Backend is Running!"

@app.route('/register_face', methods=['POST'])
def register_face():
    try:
        data = request.json
        user_name = data.get("name")
        image_data = data.get("image")

        if not user_name or not image_data:
            return jsonify({"status": "error", "message": "Missing name or image"}), 400

        header, encoded = image_data.split(",", 1)
        decoded_image = base64.b64decode(encoded)
        
        file_path = os.path.join(FACES_PATH, f"{user_name}.jpg")
        with open(file_path, "wb") as f:
            f.write(decoded_image)
            
        return jsonify({"status": "success", "message": f"{user_name} முகப்பதிவு வெற்றி!"})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)