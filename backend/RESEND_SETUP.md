# 🚀 Resend Setup - Simple Email Solution for Railway

## Why Resend?
- ✅ **3,000 free emails/month** (vs SendGrid's 100/day)
- ✅ **Super simple setup** - just 3 steps
- ✅ Works on Railway (HTTP API, no SMTP ports)
- ✅ No domain verification needed to start
- ✅ Modern, developer-friendly

---

## Setup Steps (5 minutes)

### Step 1: Get Resend API Key

1. **Sign up:** https://resend.com/signup
2. **Verify your email**
3. **Go to API Keys:** https://resend.com/api-keys
4. **Click "Create API Key"**
   - Name: `Railway Production`
   - Permission: `Sending access`
   - Click **Create**
5. **Copy the API key** - looks like: `re_xxxxxxxxxxxxxxxxxxxxxxxxxx`

### Step 2: Add to Railway

Go to Railway → Your backend service → **Variables** tab:

**Add these:**
```
USE_RESEND=True
RESEND_API_KEY=re_your_actual_api_key_here
DEFAULT_FROM_EMAIL=SomaSave SACCO <onboarding@resend.dev>
FRONTEND_URL=https://somasave.com
```

**Important:** For free tier, use `onboarding@resend.dev` as the FROM email. Once you verify your domain, you can use `info@somasave.com`.

### Step 3: Deploy

```bash
git add -A
git commit -m "Switch to Resend for email delivery"
git push
```

Railway will auto-deploy. That's it! ✅

---

## Test It

1. Wait for Railway deployment (~2 minutes)
2. Try forgot password
3. Check Railway logs for: `✅✅✅ SUCCESS! Resend API response`
4. Check your email inbox

---

## Using Your Own Domain (Optional - Later)

To send from `info@somasave.com` instead of `onboarding@resend.dev`:

1. Go to Resend → Domains
2. Add `somasave.com`
3. Add DNS records they provide
4. Once verified, update Railway:
   ```
   DEFAULT_FROM_EMAIL=SomaSave SACCO <info@somasave.com>
   ```

---

## Railway Environment Variables (Complete List)

```bash
# Django
SECRET_KEY=your-secret-key
DEBUG=False
ALLOWED_HOSTS=your-domains

# Database
DB_NAME=your-db
DB_USER=your-user
DB_PASSWORD=your-password
DB_HOST=your-host
DB_PORT=5432

# Email (Resend)
USE_RESEND=True
RESEND_API_KEY=re_your_api_key_here
DEFAULT_FROM_EMAIL=SomaSave SACCO <onboarding@resend.dev>
SERVER_EMAIL=onboarding@resend.dev
FRONTEND_URL=https://somasave.com
```

---

## Localhost Development

Create `backend/.env`:

```bash
# Leave USE_RESEND unset (defaults to False)
# Uses Zoho SMTP locally
EMAIL_HOST=smtp.zoho.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=info@somasave.com
EMAIL_HOST_PASSWORD=vcvFuYXnRn0R
DEFAULT_FROM_EMAIL=SomaSave SACCO <info@somasave.com>
FRONTEND_URL=http://localhost:5173
```

---

## Troubleshooting

### "API key invalid"
- Check the key is copied correctly (no spaces)
- Make sure it starts with `re_`
- Regenerate if needed

### Emails not arriving
- Check spam folder
- For free tier, must use `onboarding@resend.dev` as FROM address
- Check Railway logs for API response

### Still getting SMTP timeout
- Make sure `USE_RESEND=True` is set in Railway
- Check logs show "Using Resend API: True"

---

## Free Tier Limits

- **3,000 emails/month** - perfect for password resets
- **100 emails/day** max
- Must use `onboarding@resend.dev` until you verify your domain
- Upgrade anytime for custom domains and more emails

---

**Next:** Get your Resend API key and add it to Railway! 🎯
