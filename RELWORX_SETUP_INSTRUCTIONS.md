# ========================================
# RELWORX PAYMENT INTEGRATION - SETUP
# ========================================

## IMPORTANT: Add your Relworx Account Number

You need to add your Relworx business account number to complete the setup.

### Option 1: Add to backend/somasave_backend/settings.py (line ~270)

Replace this line:
```python
RELWORX_ACCOUNT_NO = os.getenv('RELWORX_ACCOUNT_NO', '')  # Add your account number here
```

With your actual account number:
```python
RELWORX_ACCOUNT_NO = os.getenv('RELWORX_ACCOUNT_NO', 'YOUR_ACCOUNT_NUMBER_HERE')
```

### Option 2: Add to Environment Variables (Railway or .env)

Add this variable:
```
RELWORX_ACCOUNT_NO=YOUR_ACCOUNT_NUMBER_HERE
```

## Relworx Credentials Summary

- **API Key**: 55cbd4454b75ef.4MsHHl_YCvRQnCYdF0ybmA (already configured)
- **Webhook Signing Key**: 191dc8aec53073d24fbd357368 (already configured)
- **Account Number**: ??? (YOU NEED TO ADD THIS)

## Getting Your Account Number

1. Log in to your Relworx dashboard at https://payments.relworx.com
2. Go to "Accounts" or "Business Accounts"
3. Your account number should look like: `RELJH012BV45P`
4. Copy and add it to the settings as shown above

## Required Environment Variables (Railway)

Add these to your Railway environment variables:

```
RELWORX_API_KEY=55cbd4454b75ef.4MsHHl_YCvRQnCYdF0ybmA
RELWORX_ACCOUNT_NO=YOUR_ACCOUNT_NUMBER_HERE
RELWORX_WEBHOOK_KEY=191dc8aec53073d24fbd357368
```

## Webhook Configuration in Relworx Dashboard

Once deployed, configure your webhook URL in the Relworx dashboard:

**Webhook URL**: `https://your-backend-url.railway.app/api/payments/relworx-webhook/`

Example:
```
https://soma-save-sacco-website-production.up.railway.app/api/payments/relworx-webhook/
```

## Database Migration Required

After adding the account number, run this migration:

```bash
cd backend
python manage.py makemigrations
python manage.py migrate
```

## Testing the Integration

After setup, test the deposit flow:

1. Log in to the member portal
2. Click "Make Deposit"
3. Enter an amount (minimum UGX 500)
4. Enter your Mobile Money number
5. Click "Continue to Payment"
6. You should receive a payment prompt on your phone
7. Complete the payment
8. The system will automatically update your balance

## Supported Payment Methods

- **Uganda**: MTN Mobile Money, Airtel Money (UGX 500 - 5,000,000)
- **Kenya**: Safaricom MPESA, Airtel Money (KES 10 - 70,000)
- **Tanzania**: Airtel, Tigo, Vodacom, Halopesa (TZS 500 - 5,000,000)
- **Rwanda**: MTN Mobile Money, Airtel Money (RWF 100 - 5,000,000)

## Implementation Details

### Backend Files Updated/Created:
- ✅ `backend/somasave_backend/settings.py` - Added Relworx configuration
- ✅ `backend/api/relworx.py` - Created Relworx API wrapper
- ✅ `backend/api/views.py` - Updated InitiateDepositView, VerifyDepositView, added RelworxWebhookView
- ✅ `backend/api/urls.py` - Added webhook endpoint
- ✅ `backend/api/models.py` - Added transaction_id field to Deposit model

### Frontend Files Updated:
- ✅ `src/components/DepositModal.jsx` - Updated to use backend API integration with polling

### How It Works:

1. **User Initiates Deposit**
   - Frontend sends amount and phone number to backend
   
2. **Backend Calls Relworx API**
   - Creates pending deposit record
   - Calls Relworx `request-payment` endpoint
   - Relworx sends payment prompt to user's phone
   
3. **User Completes Payment**
   - User receives Mobile Money prompt on their phone
   - User enters PIN to complete payment
   
4. **Status Verification** (Two Methods)
   - **Method 1 (Webhook)**: Relworx sends webhook to backend when payment completes
   - **Method 2 (Polling)**: Frontend polls backend every 3 seconds to check status
   
5. **Balance Update**
   - Backend updates deposit status to COMPLETED
   - Updates user's savings account balance
   - Frontend displays success message

### Security Features:

- ✅ Webhook signature verification using HMAC-SHA256
- ✅ Transaction reference validation
- ✅ Duplicate payment prevention
- ✅ Atomic database transactions
- ✅ CSRF protection exemption for webhooks

## Troubleshooting

### Payment Not Working

1. **Check Account Number**: Make sure RELWORX_ACCOUNT_NO is set correctly
2. **Check Phone Format**: Phone must be in international format (e.g., +256701234567)
3. **Check Minimum Amount**: UGX 500 minimum for Uganda
4. **Check Logs**: Look for errors in backend logs

### Webhook Not Being Called

1. **Verify URL**: Make sure webhook URL is configured in Relworx dashboard
2. **Check URL Format**: Must be exact URL including trailing slash
3. **Test Manually**: Use a tool like Postman to test the webhook endpoint
4. **Check Signature**: Webhook signature verification must pass

### Balance Not Updating

1. **Check Webhook**: Verify webhook is configured and being called
2. **Check Logs**: Look for errors in webhook processing
3. **Manual Verification**: User can click "Check Status" to manually verify

## Next Steps

1. ⚠️ **ADD YOUR RELWORX ACCOUNT NUMBER** (see above)
2. Run database migrations
3. Deploy to Railway
4. Configure webhook URL in Relworx dashboard
5. Test with a small amount (UGX 500-1000)
6. Monitor logs for any issues

## Support

- **Relworx Documentation**: https://docs.relworx.com/
- **Relworx Support**: support@relworx.com

---

**Status**: ✅ Integration Complete - Awaiting Account Number Configuration
