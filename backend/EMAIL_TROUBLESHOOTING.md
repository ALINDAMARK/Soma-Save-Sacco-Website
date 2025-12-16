# Password Reset Email Troubleshooting Guide

## Issue: "Failed to send password reset email"

### Root Causes & Solutions

#### 1. Missing EMAIL_HOST_PASSWORD in Railway (Most Common)

**Check Railway Environment Variables:**
1. Go to your Railway project
2. Click on your backend service
3. Go to **Variables** tab
4. Look for `EMAIL_HOST_PASSWORD`

**If missing, add it:**
- Variable name: `EMAIL_HOST_PASSWORD`
- Value: Your Zoho app-specific password (NOT your account password)

**To generate Zoho app password:**
1. Go to: https://accounts.zoho.com/home#security/app-passwords
2. Click "Generate New Password"
3. Select "Mail" permission
4. Copy the generated password
5. Paste it in Railway as `EMAIL_HOST_PASSWORD`

#### 2. Verify Other Email Settings in Railway

Make sure these are set:
```env
EMAIL_HOST=smtp.zoho.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=info@somasave.com
EMAIL_HOST_PASSWORD=[your-app-specific-password]
DEFAULT_FROM_EMAIL=SomaSave SACCO <info@somasave.com>
```

#### 3. Check Railway Logs

View Railway logs to see the actual error:
```bash
# In Railway dashboard, go to your backend service → Logs
# Look for error messages containing "password reset email"
```

Common error messages and their meanings:

**"authentication failed" or "535"**
- ❌ EMAIL_HOST_PASSWORD is wrong or not set
- ✅ Solution: Set correct Zoho app password in Railway

**"Connection timeout" or "Connection refused"**
- ❌ Network/firewall issue or wrong EMAIL_HOST
- ✅ Solution: Verify EMAIL_HOST=smtp.zoho.com, EMAIL_PORT=587

**"Domain not verified"**
- ❌ Email domain (@somasave.com) not verified in Zoho
- ✅ Solution: Verify domain in Zoho admin console

#### 4. Test Email Configuration

After setting environment variables, test by:

1. **Redeploy the backend** (Railway should auto-deploy when you change env vars)
2. **Try password reset** from your frontend
3. **Check Railway logs** for errors

#### 5. Verify Zoho Account Settings

1. Login to Zoho Mail: https://mail.zoho.com
2. Check that info@somasave.com exists and is active
3. Verify SMTP access is enabled:
   - Go to Settings → Mail Accounts → info@somasave.com
   - Check "POP/IMAP Access" is enabled
   - SMTP should be automatically enabled

#### 6. Alternative: Test with Console Email Backend (Temporary)

To temporarily bypass email issues and see if everything else works:

**In Railway, set:**
```env
EMAIL_BACKEND=django.core.mail.backends.console.EmailBackend
```

This will print emails to Railway logs instead of sending them (for debugging only).

**Remember to switch back to SMTP for production:**
```env
EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend
```

### Quick Fix Checklist

- [ ] EMAIL_HOST_PASSWORD set in Railway
- [ ] Value is Zoho app password (not account password)
- [ ] Other email variables (HOST, PORT, USER) set correctly
- [ ] Railway backend redeployed after setting variables
- [ ] Zoho account info@somasave.com is active
- [ ] SMTP access enabled in Zoho
- [ ] Checked Railway logs for specific error message

### Test Commands

**Check if email settings are loaded (add to views.py temporarily):**
```python
from django.conf import settings
print(f"EMAIL_HOST: {settings.EMAIL_HOST}")
print(f"EMAIL_PORT: {settings.EMAIL_PORT}")
print(f"EMAIL_HOST_USER: {settings.EMAIL_HOST_USER}")
print(f"EMAIL_HOST_PASSWORD: {'SET' if settings.EMAIL_HOST_PASSWORD else 'NOT SET'}")
```

**Test email directly in Railway console:**
```python
from django.core.mail import send_mail
send_mail(
    'Test',
    'Test message',
    'info@somasave.com',
    ['your-test-email@example.com'],
    fail_silently=False
)
```

### Next Steps

1. **Set EMAIL_HOST_PASSWORD in Railway** (most likely fix)
2. **Check Railway logs** for the actual error
3. **Test password reset again**
4. **If still failing**, try console backend temporarily to isolate the issue
5. **Contact Railway support** if network issues persist

### Support

If you've tried all the above and still have issues:
- Check Railway status: https://status.railway.app
- Railway Discord: https://discord.gg/railway
- Email me the Railway logs showing the error

---

**Most Common Solution**: Just set `EMAIL_HOST_PASSWORD` in Railway environment variables with your Zoho app-specific password!
