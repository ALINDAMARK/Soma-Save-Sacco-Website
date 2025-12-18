# 🧪 TESTING CHECKLIST

Use this checklist to verify all features work correctly.

---

## Prerequisites

- [ ] Backend server running (`python manage.py runserver`)
- [ ] Frontend dev server running (`npm run dev`)
- [ ] Email configuration verified
- [ ] Test user account created

---

## 🔐 Two-Factor Authentication Tests

### Enable 2FA
- [ ] Login to member portal
- [ ] Navigate to Settings tab
- [ ] Find "Two-Factor Authentication" in Security section
- [ ] Click toggle switch to enable
- [ ] Modal appears with information
- [ ] Click "Send Verification Code" button
- [ ] Receive email with 6-digit code
- [ ] Enter code in modal
- [ ] Click "Verify & Enable"
- [ ] See success message
- [ ] Toggle shows as enabled
- [ ] Click "Save Settings"

### Login with 2FA
- [ ] Logout from portal
- [ ] Go to login page
- [ ] Enter email and password
- [ ] Click "Login to My Account"
- [ ] OTP screen appears automatically
- [ ] Check email for login verification code
- [ ] Enter 6-digit code
- [ ] Click "Verify & Login"
- [ ] Successfully logged into portal
- [ ] Dashboard loads correctly

### Resend OTP (Login)
- [ ] Logout and start login again
- [ ] Enter credentials to trigger OTP
- [ ] Click "Didn't receive the code? Resend"
- [ ] New OTP sent to email
- [ ] Enter new OTP
- [ ] Successfully login

### Back to Login
- [ ] Logout and start login
- [ ] Enter credentials to trigger OTP
- [ ] Click "← Back to login"
- [ ] Returns to login form
- [ ] Can enter credentials again

### Disable 2FA
- [ ] Login to portal (with 2FA)
- [ ] Go to Settings
- [ ] Click toggle to disable 2FA
- [ ] Modal appears with warning
- [ ] Enter your password
- [ ] Click "Disable 2FA"
- [ ] See success message
- [ ] Toggle shows as disabled
- [ ] Click "Save Settings"

### Verify 2FA Disabled
- [ ] Logout
- [ ] Login with credentials
- [ ] No OTP screen appears
- [ ] Directly logged in

---

## 🔑 Password Change Tests

### Valid Password Change
- [ ] Login to portal
- [ ] Go to Settings tab
- [ ] Click "Change Password" button
- [ ] Modal appears
- [ ] Enter current password
- [ ] Enter new valid password (e.g., `NewPass123`)
- [ ] Confirm new password
- [ ] Click "Change Password"
- [ ] See success message
- [ ] Modal closes

### Verify New Password
- [ ] Logout
- [ ] Try login with OLD password
- [ ] Login fails (correct)
- [ ] Login with NEW password
- [ ] Login succeeds

### Password Validation Tests

#### Test: Password Too Short
- [ ] Click "Change Password"
- [ ] Enter current password
- [ ] Enter new password: `Short1`
- [ ] Confirm password: `Short1`
- [ ] Click "Change Password"
- [ ] See error: "Password must be at least 8 characters long"

#### Test: No Letters
- [ ] Click "Change Password"
- [ ] Enter current password
- [ ] Enter new password: `12345678`
- [ ] Confirm password: `12345678`
- [ ] Click "Change Password"
- [ ] See error: "Password must contain at least one letter"

#### Test: No Numbers
- [ ] Click "Change Password"
- [ ] Enter current password
- [ ] Enter new password: `abcdefgh`
- [ ] Confirm password: `abcdefgh`
- [ ] Click "Change Password"
- [ ] See error: "Password must contain at least one number"

#### Test: Passwords Don't Match
- [ ] Click "Change Password"
- [ ] Enter current password
- [ ] Enter new password: `ValidPass123`
- [ ] Confirm password: `DifferentPass456`
- [ ] Click "Change Password"
- [ ] See error: "New passwords do not match"

#### Test: Wrong Current Password
- [ ] Click "Change Password"
- [ ] Enter wrong current password
- [ ] Enter new password: `ValidPass123`
- [ ] Confirm password: `ValidPass123`
- [ ] Click "Change Password"
- [ ] See error: "Current password is incorrect"

#### Test: Same as Current
- [ ] Click "Change Password"
- [ ] Enter current password
- [ ] Enter new password: (same as current)
- [ ] Confirm password: (same as current)
- [ ] Click "Change Password"
- [ ] See error: "New password must be different from current password"

---

## 🎨 UI/UX Tests

### 2FA Modal
- [ ] Enable 2FA modal displays correctly
- [ ] Information is clear and readable
- [ ] OTP input is large and centered
- [ ] Resend button works
- [ ] Close button works
- [ ] Modal dismisses on success

### Password Modal
- [ ] Change password modal displays correctly
- [ ] All three input fields visible
- [ ] Password requirements shown
- [ ] Cancel button works
- [ ] Submit button disabled when loading
- [ ] Modal dismisses on success

### Responsive Design
- [ ] Test on desktop (works)
- [ ] Test on tablet (works)
- [ ] Test on mobile (works)
- [ ] All modals fit screen
- [ ] Text is readable
- [ ] Buttons are clickable

---

## 📧 Email Tests

### 2FA Enable Email
- [ ] Receive email when enabling 2FA
- [ ] Email has subject: "SomaSave SACCO - Enable 2FA Verification Code"
- [ ] Email shows 6-digit code
- [ ] Email mentions 10-minute expiry
- [ ] Email has security warning

### Login 2FA Email
- [ ] Receive email during login with 2FA
- [ ] Email has subject: "SomaSave SACCO - Login Verification Code"
- [ ] Email shows 6-digit code
- [ ] Email mentions 10-minute expiry
- [ ] Email warns about unauthorized login

---

## ⏱️ Timing Tests

### OTP Expiry
- [ ] Enable 2FA and get OTP
- [ ] Wait 11 minutes
- [ ] Try to verify with expired OTP
- [ ] See error: "OTP has expired"
- [ ] Click resend to get new OTP
- [ ] New OTP works

---

## 🔒 Security Tests

### 2FA Security
- [ ] OTP is random each time
- [ ] OTP is 6 digits
- [ ] OTP expires after 10 minutes
- [ ] OTP cleared after successful verification
- [ ] Cannot verify with old OTP
- [ ] Cannot verify with wrong OTP

### Password Security
- [ ] Passwords not visible in forms (type="password")
- [ ] Password validation on backend too
- [ ] Current password required for change
- [ ] Password required to disable 2FA
- [ ] Activity logged in database

---

## 🐛 Error Handling Tests

### Network Errors
- [ ] Turn off backend server
- [ ] Try to enable 2FA
- [ ] See appropriate error message
- [ ] Try to change password
- [ ] See appropriate error message

### Invalid Data
- [ ] Enter letters in OTP field
- [ ] Only numbers accepted
- [ ] Enter OTP with less than 6 digits
- [ ] Submit button disabled

---

## ✅ Final Verification

- [ ] All 2FA features working
- [ ] All password change features working
- [ ] No console errors
- [ ] No backend errors
- [ ] Emails being delivered
- [ ] UI looks professional
- [ ] Responsive design works
- [ ] Error messages clear
- [ ] Success messages shown
- [ ] Data persists correctly

---

## 📊 Test Results

**Date Tested:** _________________

**Tested By:** _________________

**Total Tests:** 75+

**Tests Passed:** _____

**Tests Failed:** _____

**Notes:**
_____________________________________________________________
_____________________________________________________________
_____________________________________________________________
_____________________________________________________________

---

## 🎉 Sign Off

- [ ] All critical features tested
- [ ] No blocking issues found
- [ ] Ready for production deployment

**Approved By:** _________________

**Date:** _________________

---

## 📞 Support

If you encounter any issues:
1. Check browser console for errors
2. Check backend terminal for errors
3. Review error messages carefully
4. Check email configuration
5. Verify database migrations applied
6. Try in incognito/private mode
7. Clear browser cache and cookies

For detailed troubleshooting, see `2FA_AND_PASSWORD_IMPLEMENTATION.md`
