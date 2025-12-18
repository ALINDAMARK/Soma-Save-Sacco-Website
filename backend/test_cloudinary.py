"""Test Cloudinary configuration"""
import os
from dotenv import load_dotenv
import cloudinary
import cloudinary.uploader

# Load environment
load_dotenv()

# Configure Cloudinary
cloudinary.config(
    cloud_name=os.getenv('CLOUDINARY_CLOUD_NAME', 'dhgjydahn'),
    api_key=os.getenv('CLOUDINARY_API_KEY', '617993754119547'),
    api_secret=os.getenv('CLOUDINARY_API_SECRET', 'Y7X7ttx7sw6XPkqAjS04-sa6qHc'),
    secure=True
)

print("=" * 60)
print("CLOUDINARY CONFIGURATION TEST")
print("=" * 60)
print(f"Cloud Name: {cloudinary.config().cloud_name}")
print(f"API Key: {cloudinary.config().api_key}")
print(f"API Secret: {'*' * 10}{cloudinary.config().api_secret[-5:]}")
print("=" * 60)

# Try a simple upload test with a dummy in-memory file
try:
    from io import BytesIO
    from PIL import Image
    
    # Create a small test image
    img = Image.new('RGB', (100, 100), color='red')
    img_bytes = BytesIO()
    img.save(img_bytes, format='JPEG')
    img_bytes.seek(0)
    
    print("Testing image upload to Cloudinary...")
    result = cloudinary.uploader.upload(
        img_bytes,
        folder='somasave/test',
        public_id='test_image',
        overwrite=True,
        resource_type='image'
    )
    print("✅ Cloudinary upload successful!")
    print(f"Image URL: {result.get('secure_url')}")
    print(f"Public ID: {result.get('public_id')}")
except Exception as e:
    print(f"❌ Cloudinary upload failed: {str(e)}")
    import traceback
    traceback.print_exc()

print("=" * 60)
