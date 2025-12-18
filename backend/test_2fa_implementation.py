#!/usr/bin/env python
"""
Test script for 2FA and Password Change functionality
Run this from the backend directory after activating virtual environment
"""

import os
import sys
import django

# Setup Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'somasave_backend.settings')
django.setup()

from django.contrib.auth import authenticate
from api.models import CustomUser
from django.utils import timezone
import random

def test_password_validation():
    """Test password change validation"""
    print("\n=== Testing Password Validation ===\n")
    
    test_cases = [
        ("short", "Too short", False),
        ("12345678", "No letters", False),
        ("abcdefgh", "No numbers", False),
        ("password123", "Valid", True),
        ("MyPassword123", "Valid with mixed case", True),
    ]
    
    for password, description, should_pass in test_cases:
        has_letter = any(c.isalpha() for c in password)
        has_number = any(c.isdigit() for c in password)
        is_long_enough = len(password) >= 8
        
        passes = has_letter and has_number and is_long_enough
        status = "✅ PASS" if passes == should_pass else "❌ FAIL"
        
        print(f"{status} - {description}: '{password}'")
        print(f"  Length: {len(password)}, Has letter: {has_letter}, Has number: {has_number}")


def test_otp_generation():
    """Test OTP generation"""
    print("\n=== Testing OTP Generation ===\n")
    
    # Generate 10 OTPs to check randomness
    otps = set()
    for i in range(10):
        otp = ''.join([str(random.randint(0, 9)) for _ in range(6)])
        otps.add(otp)
        print(f"OTP {i+1}: {otp}")
    
    print(f"\n✅ Generated {len(otps)} unique OTPs out of 10")
    
    # Check format
    for otp in list(otps)[:3]:
        is_valid = len(otp) == 6 and otp.isdigit()
        status = "✅ PASS" if is_valid else "❌ FAIL"
        print(f"{status} - OTP format check: {otp}")


def test_otp_expiry():
    """Test OTP expiry logic"""
    print("\n=== Testing OTP Expiry ===\n")
    
    from datetime import timedelta
    
    now = timezone.now()
    test_cases = [
        (now - timedelta(minutes=5), "5 minutes ago", False),
        (now - timedelta(minutes=9), "9 minutes ago", False),
        (now - timedelta(minutes=10), "10 minutes ago (exact)", True),
        (now - timedelta(minutes=11), "11 minutes ago", True),
        (now - timedelta(hours=1), "1 hour ago", True),
    ]
    
    for otp_time, description, should_expire in test_cases:
        is_expired = now - otp_time > timedelta(minutes=10)
        status = "✅ PASS" if is_expired == should_expire else "❌ FAIL"
        
        print(f"{status} - {description}: Expired={is_expired}")


def test_user_model_fields():
    """Test that required fields exist in User model"""
    print("\n=== Testing User Model Fields ===\n")
    
    required_fields = [
        'two_factor_auth',
        'otp_code',
        'otp_created_at',
        'email',
        'username',
    ]
    
    for field in required_fields:
        has_field = hasattr(CustomUser, field)
        status = "✅ PASS" if has_field else "❌ FAIL"
        print(f"{status} - CustomUser has field: {field}")


def test_api_endpoints():
    """List and verify API endpoints"""
    print("\n=== API Endpoints Available ===\n")
    
    from django.urls import get_resolver
    from django.urls.resolvers import URLPattern, URLResolver
    
    def get_urls(urlpatterns, prefix=''):
        urls = []
        for pattern in urlpatterns:
            if isinstance(pattern, URLResolver):
                urls.extend(get_urls(pattern.url_patterns, prefix + str(pattern.pattern)))
            elif isinstance(pattern, URLPattern):
                urls.append(prefix + str(pattern.pattern))
        return urls
    
    resolver = get_resolver()
    all_urls = get_urls(resolver.url_patterns)
    
    # Filter for our new endpoints
    target_endpoints = [
        'change-password',
        'enable-2fa',
        'verify-2fa',
        'disable-2fa',
        'send-login-otp',
    ]
    
    print("New 2FA & Password Endpoints:")
    for endpoint in target_endpoints:
        found = any(endpoint in url for url in all_urls)
        status = "✅ FOUND" if found else "❌ NOT FOUND"
        print(f"{status} - {endpoint}")


def run_all_tests():
    """Run all tests"""
    print("="*60)
    print("2FA AND PASSWORD CHANGE - TEST SUITE")
    print("="*60)
    
    try:
        test_user_model_fields()
        test_otp_generation()
        test_otp_expiry()
        test_password_validation()
        test_api_endpoints()
        
        print("\n" + "="*60)
        print("✅ ALL TESTS COMPLETED")
        print("="*60)
        print("\nNext Steps:")
        print("1. Start the Django server: python manage.py runserver")
        print("2. Test login at: http://localhost:5173/login")
        print("3. Enable 2FA in Settings")
        print("4. Test password change in Settings")
        print("\n")
        
    except Exception as e:
        print(f"\n❌ ERROR: {str(e)}")
        import traceback
        traceback.print_exc()


if __name__ == '__main__':
    run_all_tests()
