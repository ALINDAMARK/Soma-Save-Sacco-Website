# Relworx Payment Integration - Make Deposit Feature

## Overview
This document describes the integration of Relworx payment gateway for handling deposits in the SomaSave SACCO platform.

## Integration Components

### 1. Backend API Endpoints

#### **POST /api/payments/initiate-deposit/**
Initiates a new deposit transaction.

**Request Body:**
```json
{
  "amount": 10000,
  "phone_number": "256700000000"
}
```

**Response:**
```json
{
  "tx_ref": "DEPOSIT_1_ABC12345_1234567890",
  "amount": 10000,
  "phone_number": "256700000000",
  "user": {
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Features:**
- Generates unique transaction reference
- Creates pending deposit record in database
- Returns payment details for frontend processing

#### **POST /api/payments/verify-deposit/**
Verifies and processes completed payment.

**Request Body:**
```json
{
  "tx_ref": "DEPOSIT_1_ABC12345_1234567890",
  "status": "successful",
  "transaction_id": "RELWORX123456"
}
```

**Response:**
```json
{
  "message": "Deposit successful",
  "tx_ref": "DEPOSIT_1_ABC12345_1234567890",
  "amount": 10000,
  "new_balance": 50000,
  "status": "COMPLETED"
}
```

**Features:**
- Validates transaction reference
- Updates deposit status to COMPLETED
- Creates or updates user's savings account
- Updates account balance atomically
- Handles failed/cancelled payments

### 2. Frontend Components

#### **DepositModal Component** (`src/components/DepositModal.jsx`)

A modal component that handles the complete deposit flow:

**Features:**
- Two-step deposit process:
  1. Amount entry with phone number
  2. Payment processing status
- Quick amount selection buttons (5K, 10K, 20K, 50K, 100K, 200K)
- Mobile Money number input
- Relworx payment popup window
- Real-time payment status updates
- Toast notifications for success/error

**Integration Points:**
- Opens Relworx payment page in popup window
- Listens for postMessage from payment window
- Verifies payment with backend
- Refreshes dashboard on success

**Usage:**
```jsx
<DepositModal 
  isOpen={showDepositModal}
  onClose={() => setShowDepositModal(false)}
  user={user}
  onSuccess={handleDepositSuccess}
/>
```

### 3. Payment Flow

1. **User clicks "Make Deposit" button**
   - Modal opens with amount entry form
   
2. **User enters amount and phone number**
   - Quick select buttons available (5K-200K UGX)
   - Phone number pre-filled from user profile
   
3. **User clicks "Continue to Payment"**
   - Backend creates pending deposit record
   - Returns transaction reference
   - Frontend builds Relworx payment URL with parameters
   
4. **Relworx payment popup opens**
   - User completes Mobile Money payment
   - Relworx sends postMessage to parent window
   
5. **Payment verification**
   - Frontend receives payment status
   - Sends verification request to backend
   - Backend updates deposit status and account balance
   
6. **Success notification**
   - User sees success message with new balance
   - Dashboard refreshes to show updated data
   - Modal closes automatically

### 4. Database Updates

When payment is successful:

1. **Deposit Record**
   - Status updated from PENDING to COMPLETED
   - Transaction reference stored

2. **Account Balance**
   - User's savings account is created if doesn't exist
   - Account balance is incremented by deposit amount
   - All updates are atomic (using Django transaction.atomic())

### 5. Security Features

- CSRF token validation on all API requests
- Authentication required for all endpoints
- Transaction reference validation
- Duplicate transaction prevention
- Origin validation for postMessage
- Atomic database transactions

### 6. Error Handling

**Backend:**
- Invalid amount validation
- Phone number validation
- Transaction not found errors
- Duplicate processing prevention
- Database transaction rollback on errors

**Frontend:**
- Popup blocker detection
- Payment window close detection
- Network error handling
- Toast notifications for all errors
- Automatic modal state reset

### 7. Testing Instructions

1. **Start Backend:**
   ```bash
   cd backend
   python manage.py runserver
   ```

2. **Start Frontend:**
   ```bash
   npm run dev
   ```

3. **Test Deposit Flow:**
   - Login to member portal
   - Click any "Make Deposit" button (mobile or desktop)
   - Enter amount (minimum 1000 UGX)
   - Enter or verify phone number
   - Click "Continue to Payment"
   - Complete payment in Relworx popup
   - Verify balance updates

### 8. Relworx Payment URL Parameters

The frontend constructs the Relworx payment URL with these parameters:

```
https://payments.relworx.com/pay?
  amount=10000
  &phone=256700000000
  &tx_ref=DEPOSIT_1_ABC12345_1234567890
  &customer_name=John Doe
  &customer_email=john@example.com
  &description=SomaSave SACCO Deposit
  &callback_url=https://somasave.com/member-portal
```

### 9. Payment Status Flow

```
PENDING → (Payment Success) → COMPLETED → Account Balance Updated
        → (Payment Failed) → FAILED
```

### 10. Files Modified/Created

**Backend:**
- `backend/api/views.py` - Added InitiateDepositView, VerifyDepositView
- `backend/api/urls.py` - Added payment endpoint routes

**Frontend:**
- `src/components/DepositModal.jsx` - New component
- `src/services/api.js` - Added payments.initiateDeposit, payments.verifyDeposit
- `src/pages/MemberPortal.jsx` - Integrated modal with Make Deposit buttons

### 11. Environment Variables

No additional environment variables needed. Uses existing:
- Django CSRF settings
- Database configuration
- API_BASE_URL in frontend

## Notes

- Minimum deposit: 1000 UGX
- Payment processing typically takes 10-30 seconds
- User can close payment window to cancel
- Dashboard auto-refreshes after successful deposit
- All monetary values use Django DecimalField for precision
- Transaction references are unique and include timestamp

## Future Enhancements

- Transaction history in modal
- Recurring deposits/scheduled payments
- Multiple payment methods (cards, bank transfer)
- SMS notifications on successful deposit
- Email receipts
- Deposit limits and daily caps
- Promotional codes/discount system
