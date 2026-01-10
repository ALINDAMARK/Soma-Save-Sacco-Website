"""
Quick test to send a professional notification to all subscribed users
"""
import os
import sys
import django

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'somasave_backend.settings')
django.setup()

from django.contrib.auth import get_user_model
from api.utils.push_notifications import send_bulk_notification

User = get_user_model()

def send_test_notification():
    """Send a professional test notification"""
    
    print("🔔 Sending Professional Test Notification")
    print("=" * 60)
    
    # Get users with active subscriptions
    users_with_subs = User.objects.filter(
        push_subscriptions__is_active=True
    ).distinct()
    
    if not users_with_subs.exists():
        print("❌ No users with active subscriptions found")
        print("\n💡 To receive notifications:")
        print("   1. Open the app on your phone")
        print("   2. Log in")
        print("   3. Click 'Enable Notifications' when prompted")
        print("   4. Click 'Allow' in browser")
        print("   5. Run this test again")
        return
    
    print(f"📊 Found {users_with_subs.count()} user(s) with active subscriptions")
    
    # Send professional notification
    results = send_bulk_notification(
        users=users_with_subs,
        title="💰 Deposit Confirmed",
        body="Your deposit of UGX 50,000 has been successfully credited to your savings account. Thank you for banking with SomaSave SACCO!",
        url="/member-portal/transactions",
        icon="/icon-192x192.png"
    )
    
    print("\n✅ Notification sent!")
    print(f"   - Total attempts: {results['total']}")
    print(f"   - Successfully sent: {results['sent']}")
    print(f"   - Failed: {results['failed']}")
    
    print("\n📱 Check your phone/browser for the notification!")
    print("   The notification should:")
    print("   ✓ Show title: '💰 Deposit Confirmed'")
    print("   ✓ Show message with full deposit details")
    print("   ✓ Display SomaSave icon")
    print("   ✓ Vibrate on mobile")
    print("   ✓ Make sound (not silent)")
    print("   ✓ Have 'Open App' and 'Dismiss' buttons")
    print("   ✓ Stay visible until you interact with it")

if __name__ == "__main__":
    send_test_notification()
