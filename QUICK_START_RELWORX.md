# 🚀 QUICK START - Relworx Integration

## ⚠️ REQUIRED: Add Your Account Number

**Where**: `backend/somasave_backend/settings.py` (line ~271)

**Change this**:
```python
RELWORX_ACCOUNT_NO = os.getenv('RELWORX_ACCOUNT_NO', '')
```

**To this**:
```python
RELWORX_ACCOUNT_NO = os.getenv('RELWORX_ACCOUNT_NO', 'YOUR_ACCOUNT_NUMBER')
```

Get your account number from: https://payments.relworx.com → Accounts

---

## 🏃 Run These Commands

```bash
# 1. Install dependencies
cd backend
pip install requests

# 2. Run migrations
python manage.py makemigrations
python manage.py migrate

# 3. Test configuration
python test_relworx_integration.py

# 4. Start server
python manage.py runserver
```

---

## 🌐 Deploy to Railway

```bash
# 1. Add environment variable in Railway dashboard
RELWORX_ACCOUNT_NO=YOUR_ACCOUNT_NUMBER

# 2. Push to trigger deployment
git add .
git commit -m "Add Relworx payment integration"
git push
```

---

## 🔗 Configure Webhook

**In Relworx Dashboard**:
1. Go to Business Account Settings
2. Set Webhook URL to:
   ```
   https://your-backend-url.railway.app/api/payments/relworx-webhook/
   ```

**Example**:
```
https://soma-save-sacco-website-production.up.railway.app/api/payments/relworx-webhook/
```

---

## ✅ Test Deposit Flow

1. Log in to member portal
2. Click "Make Deposit"
3. Enter amount: **500** (minimum for UGX)
4. Enter phone: **+256701234567** (your number)
5. Click "Continue to Payment"
6. Check your phone for payment prompt
7. Enter PIN to complete
8. Balance should update automatically

---

## 📱 Your Credentials

- **API Key**: `55cbd4454b75ef.4MsHHl_YCvRQnCYdF0ybmA`
- **Webhook Key**: `191dc8aec53073d24fbd357368`
- **Account Number**: ⚠️ **ADD THIS**

---

## 🆘 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| "Account number not configured" | Add `RELWORX_ACCOUNT_NO` to settings.py |
| Payment not working | Run `test_relworx_integration.py` |
| Webhook not called | Configure webhook URL in Relworx dashboard |
| Balance not updating | Check webhook signature verification |

---

## 📚 Full Documentation

- **Setup Guide**: `RELWORX_SETUP_INSTRUCTIONS.md`
- **Complete Details**: `RELWORX_INTEGRATION_COMPLETE.md`
- **Original Docs**: `RELWORX_PAYMENT_INTEGRATION.md`

---

**Status**: ✅ Integration Ready - Just add account number!
