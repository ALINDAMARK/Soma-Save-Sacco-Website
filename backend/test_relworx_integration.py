"""
Test script for Relworx Payment Integration
Run this to verify your Relworx setup is working correctly
"""
import os
import sys
import django

# Setup Django
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'somasave_backend.settings')
django.setup()

from django.conf import settings
from api.relworx import RelworxPaymentGateway


def test_configuration():
    """Test that all Relworx configuration is present"""
    print("=" * 60)
    print("RELWORX CONFIGURATION TEST")
    print("=" * 60)
    
    issues = []
    
    # Check API Key
    if settings.RELWORX_API_KEY:
        print(f"✅ API Key: {settings.RELWORX_API_KEY[:20]}...")
    else:
        print("❌ API Key: NOT CONFIGURED")
        issues.append("RELWORX_API_KEY is not set")
    
    # Check Account Number
    if settings.RELWORX_ACCOUNT_NO:
        print(f"✅ Account Number: {settings.RELWORX_ACCOUNT_NO}")
    else:
        print("❌ Account Number: NOT CONFIGURED")
        issues.append("RELWORX_ACCOUNT_NO is not set - THIS IS REQUIRED!")
    
    # Check Webhook Key
    if settings.RELWORX_WEBHOOK_KEY:
        print(f"✅ Webhook Key: {settings.RELWORX_WEBHOOK_KEY[:20]}...")
    else:
        print("❌ Webhook Key: NOT CONFIGURED")
        issues.append("RELWORX_WEBHOOK_KEY is not set")
    
    # Check API URL
    print(f"✅ API URL: {settings.RELWORX_API_URL}")
    
    print()
    
    if issues:
        print("⚠️  CONFIGURATION ISSUES:")
        for issue in issues:
            print(f"   - {issue}")
        return False
    else:
        print("✅ All configuration values are set!")
        return True


def test_phone_validation(test_phone="+256701345678"):
    """Test phone number validation"""
    print("\n" + "=" * 60)
    print("TESTING PHONE NUMBER VALIDATION")
    print("=" * 60)
    
    if not settings.RELWORX_ACCOUNT_NO:
        print("⚠️  Skipping - Account number not configured")
        return False
    
    relworx = RelworxPaymentGateway()
    
    print(f"Testing phone: {test_phone}")
    result = relworx.validate_mobile_number(test_phone)
    
    if result['success']:
        print(f"✅ Phone validation successful!")
        print(f"   Customer Name: {result['data'].get('customer_name', 'N/A')}")
        return True
    else:
        print(f"❌ Phone validation failed: {result.get('error')}")
        return False


def test_transaction_history():
    """Test fetching transaction history"""
    print("\n" + "=" * 60)
    print("TESTING TRANSACTION HISTORY")
    print("=" * 60)
    
    if not settings.RELWORX_ACCOUNT_NO:
        print("⚠️  Skipping - Account number not configured")
        return False
    
    relworx = RelworxPaymentGateway()
    
    result = relworx.get_transaction_history()
    
    if result['success']:
        transactions = result['data'].get('transactions', [])
        print(f"✅ Transaction history retrieved!")
        print(f"   Found {len(transactions)} transactions")
        
        if transactions:
            print("\n   Recent transactions:")
            for tx in transactions[:3]:  # Show first 3
                print(f"   - {tx.get('customer_reference')} | {tx.get('amount')} {tx.get('currency')} | {tx.get('status')}")
        
        return True
    else:
        print(f"❌ Failed to get transaction history: {result.get('error')}")
        return False


def test_webhook_signature():
    """Test webhook signature verification"""
    print("\n" + "=" * 60)
    print("TESTING WEBHOOK SIGNATURE VERIFICATION")
    print("=" * 60)
    
    relworx = RelworxPaymentGateway()
    
    # Test data
    webhook_url = "https://your-domain.com/api/payments/relworx-webhook/"
    timestamp = "1234567890"
    params = {
        "status": "success",
        "customer_reference": "TEST_REF_123",
        "internal_reference": "RELWORX_REF_456"
    }
    
    # Generate signature
    import hashlib
    import hmac
    
    signed_data = webhook_url + timestamp
    sorted_params = sorted(params.items())
    for key, value in sorted_params:
        signed_data += str(key) + str(value)
    
    signature = hmac.new(
        settings.RELWORX_WEBHOOK_KEY.encode('utf-8'),
        signed_data.encode('utf-8'),
        hashlib.sha256
    ).hexdigest()
    
    print(f"Generated signature: {signature[:40]}...")
    
    # Verify
    is_valid = relworx.verify_webhook_signature(webhook_url, timestamp, signature, params)
    
    if is_valid:
        print("✅ Webhook signature verification working!")
        return True
    else:
        print("❌ Webhook signature verification failed!")
        return False


def test_payment_request(test_phone="+256701345678", test_amount=500):
    """Test initiating a payment request (CAREFUL - this will trigger a real payment!)"""
    print("\n" + "=" * 60)
    print("TESTING PAYMENT REQUEST (DRY RUN)")
    print("=" * 60)
    
    if not settings.RELWORX_ACCOUNT_NO:
        print("⚠️  Skipping - Account number not configured")
        return False
    
    print("⚠️  This test will NOT actually send a payment request.")
    print("⚠️  To test real payment, uncomment the code in this function.")
    print()
    print(f"Would send payment request:")
    print(f"   Phone: {test_phone}")
    print(f"   Amount: UGX {test_amount}")
    print(f"   Account: {settings.RELWORX_ACCOUNT_NO}")
    
    # Uncomment below to test real payment (BE CAREFUL!)
    """
    import uuid
    relworx = RelworxPaymentGateway()
    
    tx_ref = f"TEST_{uuid.uuid4().hex[:12].upper()}"
    
    result = relworx.request_payment(
        reference=tx_ref,
        msisdn=test_phone,
        currency='UGX',
        amount=test_amount,
        description="SomaSave Test Payment"
    )
    
    if result['success']:
        print(f"✅ Payment request sent successfully!")
        print(f"   Internal Reference: {result['data'].get('internal_reference')}")
        return True
    else:
        print(f"❌ Payment request failed: {result.get('error')}")
        return False
    """
    
    return True


def main():
    """Run all tests"""
    print("\n")
    print("╔" + "=" * 58 + "╗")
    print("║" + " " * 15 + "RELWORX INTEGRATION TEST" + " " * 19 + "║")
    print("╚" + "=" * 58 + "╝")
    
    results = {
        'Configuration': test_configuration(),
        'Webhook Signature': test_webhook_signature(),
    }
    
    # Only run API tests if configuration is complete
    if results['Configuration']:
        results['Transaction History'] = test_transaction_history()
        # Uncomment to test phone validation (requires valid phone)
        # results['Phone Validation'] = test_phone_validation()
        results['Payment Request (Dry Run)'] = test_payment_request()
    
    # Summary
    print("\n" + "=" * 60)
    print("TEST SUMMARY")
    print("=" * 60)
    
    passed = sum(1 for v in results.values() if v)
    total = len(results)
    
    for test_name, passed_test in results.items():
        status = "✅ PASS" if passed_test else "❌ FAIL"
        print(f"{status}: {test_name}")
    
    print()
    print(f"Results: {passed}/{total} tests passed")
    
    if not results['Configuration']:
        print("\n⚠️  CRITICAL: Configuration incomplete!")
        print("   Please add your RELWORX_ACCOUNT_NO to settings.py")
        print("   See RELWORX_SETUP_INSTRUCTIONS.md for details")
    elif passed == total:
        print("\n🎉 All tests passed! Your Relworx integration is ready!")
        print("   Remember to configure the webhook URL in Relworx dashboard")
    else:
        print("\n⚠️  Some tests failed. Check the errors above.")
    
    print()


if __name__ == '__main__':
    try:
        main()
    except Exception as e:
        print(f"\n❌ Error running tests: {str(e)}")
        import traceback
        traceback.print_exc()
