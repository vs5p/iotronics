import cv2
import os
from PIL import Image, ImageEnhance
import numpy as np
import sys

# Set encoding to UTF-8
sys.stdout.reconfigure(encoding='utf-8') if hasattr(sys.stdout, 'reconfigure') else None

# Path to images folder
images_folder = r"public\images\Heads"
output_folder = r"public\images\Heads"

# Load face detector
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

def process_image(image_path, output_path):
    """Process a single image: detect face, crop, adjust contrast/brightness, resize, and compress"""
    try:
        # Read image with OpenCV
        img = cv2.imread(image_path)
        if img is None:
            print(f"Failed to read {image_path}")
            return
        
        # Convert to grayscale for face detection
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        
        # Detect faces
        faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))
        
        if len(faces) == 0:
            print(f"No face detected in {image_path}, skipping face crop")
            processed_img = img
        else:
            # Get the largest face
            (x, y, w, h) = max(faces, key=lambda f: f[2] * f[3])
            
            # Add padding around the face (20% on each side)
            padding = int(max(w, h) * 0.2)
            x = max(0, x - padding)
            y = max(0, y - padding)
            w = min(img.shape[1] - x, w + padding * 2)
            h = min(img.shape[0] - y, h + padding * 2)
            
            # Crop to face
            processed_img = img[y:y+h, x:x+w]
            print(f"Face detected and cropped in {image_path}")
        
        # Convert BGR to RGB for PIL
        processed_img_rgb = cv2.cvtColor(processed_img, cv2.COLOR_BGR2RGB)
        pil_img = Image.fromarray(processed_img_rgb)
        
        # Resize to standard size (300x300) for profile pictures
        pil_img = pil_img.resize((300, 300), Image.Resampling.LANCZOS)
        
        # Adjust brightness and contrast
        enhancer = ImageEnhance.Brightness(pil_img)
        pil_img = enhancer.enhance(1.1)  # Increase brightness by 10%
        
        enhancer = ImageEnhance.Contrast(pil_img)
        pil_img = enhancer.enhance(1.2)  # Increase contrast by 20%
        
        # Save as JPEG with compression (quality=85 for good balance)
        pil_img.save(output_path, 'JPEG', quality=85, optimize=True)
        
        # Get file size
        file_size_kb = os.path.getsize(output_path) / 1024
        print(f"[OK] Processed: {os.path.basename(output_path)} ({file_size_kb:.1f} KB)")
        
    except Exception as e:
        print(f"Error processing {image_path}: {str(e)}")

def main():
    if not os.path.exists(images_folder):
        print(f"Folder {images_folder} not found!")
        return
    
    # Create output folder if it doesn't exist
    os.makedirs(output_folder, exist_ok=True)
    
    # Process all images in folder
    for filename in os.listdir(images_folder):
        if filename.lower().endswith(('.jpg', '.jpeg', '.png')):
            input_path = os.path.join(images_folder, filename)
            
            # Convert all to .jpg for web
            output_filename = os.path.splitext(filename)[0] + '.jpg'
            output_path = os.path.join(output_folder, output_filename)
            
            print(f"\nProcessing: {filename}")
            process_image(input_path, output_path)
    
    print("\n[OK] All images processed successfully!")

if __name__ == "__main__":
    main()
