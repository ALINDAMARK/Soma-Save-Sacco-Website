"""Test profile image upload to Cloudinary"""
import os
import sys
import django
from io import BytesIO
from PIL import Image

# Setup Django
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'somasave_backend.settings')
django.setup()

from django.core.files.uploadedfile import SimpleUploadedFile
from api.models import CustomUser
from api.views import CustomUserViewSet
from rest_framework.test import APIRequestFactory
from django.contrib.auth import get_user_model

print("=" * 70)
print("PROFILE IMAGE UPLOAD TEST")
print("=" * 70)

# Create a test image
print("\n1. Creating test image...")
img = Image.new('RGB', (100, 100), color='red')
img_io = BytesIO()
img.save(img_io, 'JPEG')
img_io.seek(0)
test_image = SimpleUploadedFile(
    "test_profile.jpg",
    img_io.read(),
    content_type="image/jpeg"
)
print("✅ Test image created (100x100 red square)")

# Get or create a test user
User = get_user_model()
print("\n2. Getting/Creating test user...")
test_user, created = User.objects.get_or_create(
    username='testuser',
    defaults={
        'email': 'test@example.com',
        'first_name': 'Test',
        'last_name': 'User',
    }
)
if created:
    test_user.set_password('testpass123')
    test_user.save()
    print("✅ Test user created")
else:
    print("✅ Test user found")

print(f"   Username: {test_user.username}")
print(f"   Email: {test_user.email}")
print(f"   Current profile image: {test_user.profile_image or 'None'}")

# Create a request to test the upload
print("\n3. Testing profile image upload...")
factory = APIRequestFactory()

# Reset the image file pointer
img_io.seek(0)
test_image_for_upload = SimpleUploadedFile(
    "test_profile.jpg",
    img_io.read(),
    content_type="image/jpeg"
)

# Create a multipart request with the image
request = factory.patch(
    '/api/users/update-profile/',
    {
        'first_name': 'Test',
        'last_name': 'User Updated',
        'profile_image': test_image_for_upload,
    },
    format='multipart'
)
request.user = test_user

# Call the view
view = CustomUserViewSet.as_view({'patch': 'update_profile'})
response = view(request)

print(f"   Response status: {response.status_code}")

if response.status_code == 200:
    print("✅ Profile update successful!")
    
    # Refresh user from database
    test_user.refresh_from_db()
    
    print(f"   New profile image URL: {test_user.profile_image}")
    
    # Verify it's a Cloudinary URL
    if test_user.profile_image and 'cloudinary.com' in test_user.profile_image:
        print("✅ Image successfully uploaded to Cloudinary!")
        print(f"\n   Full URL: {test_user.profile_image}")
        
        # Check if URL contains expected path
        if 'somasave/profiles' in test_user.profile_image:
            print("✅ Image stored in correct Cloudinary folder (somasave/profiles)")
        else:
            print("⚠️  Warning: Image not in expected folder")
            
        if f'user_{test_user.id}' in test_user.profile_image:
            print(f"✅ Image has correct public_id (user_{test_user.id})")
        else:
            print("⚠️  Warning: Image public_id doesn't match expected pattern")
    else:
        print("❌ Profile image is not a Cloudinary URL!")
else:
    print(f"❌ Profile update failed!")
    print(f"   Response: {response.data}")

print("\n" + "=" * 70)
print("TEST SUMMARY")
print("=" * 70)

if response.status_code == 200 and test_user.profile_image and 'cloudinary.com' in test_user.profile_image:
    print("✅ ALL TESTS PASSED!")
    print("\nProfile image upload to Cloudinary is working correctly.")
    print(f"\nTest user profile image: {test_user.profile_image}")
else:
    print("❌ TESTS FAILED!")
    print("\nThere are issues with the profile image upload.")

print("=" * 70)
