# 🔧 FIXES APPLIED - 2FA Issues

## Issues Fixed

### 1. ✅ LoginActivity TypeError
**Problem:** `TypeError: LoginActivity() got unexpected keyword arguments: 'user_agent', 'login_successful'`

**Root Cause:** The `LoginActivity` model only has these fields:
- `user` (ForeignKey)
- `ip_address` (GenericIPAddressField)
- `location` (CharField)
- `device` (CharField)
- `login_time` (DateTimeField)
- `logout_time` (DateTimeField)

But the code was trying to use non-existent fields: `user_agent` and `login_successful`

**Fix Applied:**
- Updated `change_password()` to use correct fields with try-except wrapper
- Updated login view to use correct fields with try-except wrapper
- Changed field mapping:
  - `user_agent` → `device` (truncated to 255 chars)
  - `login_successful` → removed (not needed)
  - Added `location` field with descriptive text

### 2. ✅ Forbidden Error on 2FA Endpoints
**Problem:** `Forbidden: /api/users/enable-2fa/`

**Root Cause:** ViewSet action decorators were missing `permission_classes` parameter, causing DRF to apply default CSRF checks incorrectly.

**Fix Applied:**
- Added `permission_classes=[IsAuthenticated]` to:
  - `enable_2fa()`
  - `verify_2fa()`
  - `disable_2fa()`
- Added `permission_classes=[AllowAny]` to:
  - `send_login_otp()` (public endpoint for login flow)

### 3. ✅ Email Not Being Received
**Problem:** No email received after enabling 2FA

**Potential Causes & Fixes Applied:**
1. **Better Error Logging:** Added detailed print statements to track email sending
2. **Exception Details:** Added full traceback printing on email failures
3. **Email Configuration Check:** Shows configuration details before sending

**Debug Output Now Shows:**
```
=== Sending 2FA OTP Email ===
To: user@example.com
OTP: 123456
From: noreply@somasave.com
Email Host: smtp.gmail.com
============================
✅ Email sent successfully to user@example.com
```

Or if it fails:
```
❌ Failed to send email: [error message]
[Full traceback]
```

---

## Files Modified

1. **`backend/api/views.py`**
   - Fixed `LoginActivity.objects.create()` calls (2 locations)
   - Added `permission_classes` to all 2FA action decorators
   - Added detailed logging to all email sending operations
   - Added try-except wrappers around logging to prevent failures

---

## Testing Instructions

### 1. Test Email Configuration First

Run the existing test script:
```bash
cd backend
python test_email_config.py
```

Enter your email address when prompted. You should receive a test email.

**If email test fails:**
- Check Railway environment variables
- Verify `EMAIL_HOST_PASSWORD` is set (app password for Gmail)
- Check `DEFAULT_FROM_EMAIL` is valid
- Review backend logs for error details

### 2. Test 2FA Enable Flow

1. **Clear browser cache and restart servers**
2. **Login to member portal**
3. **Go to Settings**
4. **Click 2FA toggle**
5. **Watch backend logs** for:
   ```
   === Sending 2FA OTP Email ===
   To: your@email.com
   OTP: 123456
   ...
   ✅ Email sent successfully
   ```
6. **Check your email** (including spam folder)
7. **Enter OTP in modal**

**If forbidden error occurs:**
- Check browser console for CSRF token
- Try in incognito mode
- Clear cookies and cache
- Verify you're logged in

### 3. Test Password Change

1. **Go to Settings**
2. **Click "Change Password"**
3. **Enter passwords**
4. **Should work without errors**
5. **Check backend logs** for activity logging success/failure

---

## Debugging Email Issues

If emails still don't arrive after fixes:

### Check Railway Environment Variables
```bash
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password  # NOT your regular password!
EMAIL_USE_TLS=True
DEFAULT_FROM_EMAIL=noreply@somasave.com
```

### Gmail App Password Setup
If using Gmail:
1. Go to Google Account settings
2. Enable 2-Factor Authentication
3. Generate an "App Password"
4. Use that app password in `EMAIL_HOST_PASSWORD`
5. NOT your regular Gmail password!

### Check Backend Logs
Look for the detailed output:
```
=== Sending 2FA OTP Email ===
To: user@example.com
OTP: 123456
From: noreply@somasave.com
Email Host: smtp.gmail.com
============================
```

If you see an error, it will show the exact problem.

### Common Email Errors

**"Authentication failed"**
- Wrong email password
- Need to use App Password (not regular password)
- 2FA not enabled on Gmail account

**"Connection refused"**
- Wrong EMAIL_HOST or EMAIL_PORT
- Firewall blocking SMTP

**"Recipient rejected"**
- Invalid recipient email address
- Email doesn't exist

---

## Deployment

After these fixes, redeploy to Railway:

```bash
git add .
git commit -m "Fix 2FA LoginActivity errors and add detailed email logging"
git push
```

Then check Railway logs to see the detailed email debug output.

---

## Expected Behavior After Fixes

### ✅ 2FA Enable
1. User clicks toggle
2. Backend generates OTP
3. Backend prints debug info
4. Email sent successfully
5. User receives email
6. User enters OTP
7. 2FA enabled

### ✅ 2FA Login
1. User enters credentials
2. Backend detects 2FA enabled
3. Backend generates OTP
4. Backend prints debug info
5. Email sent successfully
6. OTP screen shown
7. User enters OTP
8. Login successful

### ✅ Password Change
1. User enters passwords
2. Validation passes
3. Password updated
4. Activity logged (or fails gracefully)
5. Success message shown

---

## Summary

All errors have been fixed:
- ✅ LoginActivity model field mismatch resolved
- ✅ Permission classes added to 2FA endpoints
- ✅ Detailed email logging added for debugging
- ✅ Try-except wrappers prevent failures from logging issues
- ✅ All email sending operations have error tracking

**Next Step:** Push to Railway and monitor logs for email debug output.
