# 🚨 Railway SMTP Port Blocking - SendGrid Solution

## The Problem

Railway **blocks outbound SMTP connections** on ports 587 and 465 to prevent spam. This is why your password reset emails work on localhost but fail in production with timeout errors.

## ✅ Solution: Use SendGrid

SendGrid is a free transactional email service that works on Railway because it uses HTTP APIs instead of blocked SMTP ports.

### Step 1: Get SendGrid API Key (Free - 100 emails/day)

1. **Sign up for SendGrid:**
   - Go to: https://signup.sendgrid.com/
   - Create free account with your email

2. **Verify your Sender Identity:**
   - Go to Settings → Sender Authentication
   - Click "Verify a Single Sender"
   - Enter: `info@somasave.com` as the sender email
   - Fill in your details
   - Verify the email they send to info@somasave.com

3. **Create API Key:**
   - Go to Settings → API Keys
   - Click "Create API Key"
   - Name: `Railway-Production`
   - Permission: `Full Access` (or at least Mail Send)
   - Click "Create & View"
   - **COPY THE API KEY** (you'll only see it once!)
   - It looks like: `SG.xxxxxxxxxxxxxxxxxxxx.yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy`

### Step 2: Update Railway Environment Variables

Go to Railway dashboard → Your backend service → Variables:

**Remove these (Zoho won't work on Railway):**
```
❌ Remove or comment: EMAIL_HOST
❌ Remove or comment: EMAIL_PORT
❌ Remove or comment: EMAIL_HOST_PASSWORD (the vcvFuYXnRn0R one)
❌ Remove or comment: EMAIL_HOST_USER
```

**Add these (SendGrid config):**
```
USE_SENDGRID=True
SENDGRID_API_KEY=SG.your_actual_api_key_here
DEFAULT_FROM_EMAIL=SomaSave SACCO <info@somasave.com>
SERVER_EMAIL=info@somasave.com
FRONTEND_URL=https://somasave.com
```

### Step 3: Deploy Changes

```bash
# Already committed and ready to push:
git add -A
git commit -m "Add SendGrid support for Railway SMTP port blocking"
git push
```

Railway will automatically rebuild and use SendGrid!

### Step 4: Test

1. Wait for Railway to finish deploying (~2 minutes)
2. Try forgot password with your email
3. Check Railway logs for: `✅✅✅ SUCCESS! Password reset email sent`
4. Check your inbox (and spam folder)

## 📋 Complete Railway Environment Variables

```bash
# Django Core
SECRET_KEY=your-secret-key
DEBUG=False
ALLOWED_HOSTS=your-domain.com,railway.app

# Database
DB_NAME=your-db-name
DB_USER=your-db-user
DB_PASSWORD=your-db-password
DB_HOST=your-db-host
DB_PORT=5432

# Email (SendGrid for Production)
USE_SENDGRID=True
SENDGRID_API_KEY=SG.your_sendgrid_api_key_here
DEFAULT_FROM_EMAIL=SomaSave SACCO <info@somasave.com>
SERVER_EMAIL=info@somasave.com
FRONTEND_URL=https://somasave.com
```

## 🏠 Local Development (Localhost)

For localhost, you can still use Zoho SMTP. Create `.env` in backend folder:

```bash
# Leave USE_SENDGRID unset (defaults to False)
EMAIL_HOST=smtp.zoho.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=info@somasave.com
EMAIL_HOST_PASSWORD=vcvFuYXnRn0R
DEFAULT_FROM_EMAIL=SomaSave SACCO <info@somasave.com>
FRONTEND_URL=http://localhost:5173
```

## 🔍 Troubleshooting

### "Invalid API Key" error
- Double-check the API key is copied correctly
- Make sure there are no spaces before/after
- Regenerate API key in SendGrid if needed

### "Sender not verified" error
- Go to SendGrid → Sender Authentication
- Make sure info@somasave.com is verified (green checkmark)
- Check the verification email they sent

### Still getting timeout errors
- Make sure `USE_SENDGRID=True` is set in Railway
- Check Railway logs for "Using email backend: django.core.mail.backends.smtp.EmailBackend"
- Should show "Email host: smtp.sendgrid.net:587"

## 💰 SendGrid Free Tier Limits

- **100 emails per day** (plenty for password resets)
- If you need more, upgrade plans start at $15/month for 40,000 emails

## 🔐 Security

- Never commit API keys to git
- `.gitignore` already excludes `.env` files
- Store API keys only in Railway environment variables
- If leaked, revoke and regenerate in SendGrid dashboard

## Alternative Solutions (if SendGrid doesn't work)

1. **Mailgun** - Similar to SendGrid, free tier: 1,000 emails/month
2. **AWS SES** - Very cheap, but requires AWS account
3. **Brevo (Sendinblue)** - Free tier: 300 emails/day
4. **Railway Pro** - Might not block SMTP ports (unconfirmed)

---

**Next Step:** Get your SendGrid API key and add it to Railway! 🚀
