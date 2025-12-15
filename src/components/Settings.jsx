import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

export default function Settings({ user }) {
  const { theme, toggleTheme } = useTheme();
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    transactionAlerts: true,
    loanReminders: true,
    marketingEmails: false,
    language: 'en',
    currency: 'UGX',
    twoFactorAuth: false,
  });
  const [message, setMessage] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);

  const handleToggle = (setting) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleSelect = (setting, value) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      setMessage({ type: '', text: '' });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setMessage({ type: 'success', text: 'Settings saved successfully!' });
      
      // Clear message after 3 seconds
      setTimeout(() => {
        setMessage({ type: '', text: '' });
      }, 3000);
    } catch (err) {
      console.error('Failed to save settings:', err);
      setMessage({ type: 'error', text: 'Failed to save settings. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Settings Header */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 p-8 animate-fadeInUp">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Settings</h2>
        <p className="text-gray-600 dark:text-gray-400">Manage your account preferences and settings</p>

        {message.text && (
          <div className={`mt-6 p-4 rounded-lg ${
            message.type === 'success' 
              ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400'
              : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400'
          }`}>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined">
                {message.type === 'success' ? 'check_circle' : 'error'}
              </span>
              <p className="font-semibold">{message.text}</p>
            </div>
          </div>
        )}
      </div>

      {/* Appearance */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 p-8 animate-fadeInUp">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Appearance</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">dark_mode</span>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">Dark Mode</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Current theme: {theme === 'dark' ? 'Dark' : 'Light'}
                </p>
              </div>
            </div>
            <button
              onClick={toggleTheme}
              className={`relative w-14 h-8 rounded-full transition-colors ${
                theme === 'dark' ? 'bg-primary' : 'bg-gray-300'
              }`}
            >
              <div className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-white transition-transform ${
                theme === 'dark' ? 'translate-x-6' : 'translate-x-0'
              }`} />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">language</span>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">Language</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Choose your preferred language</p>
              </div>
            </div>
            <select
              value={settings.language}
              onChange={(e) => handleSelect('language', e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:border-primary"
            >
              <option value="en">English</option>
              <option value="sw">Swahili</option>
              <option value="lg">Luganda</option>
            </select>
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">payments</span>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">Currency</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Display currency</p>
              </div>
            </div>
            <select
              value={settings.currency}
              onChange={(e) => handleSelect('currency', e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:border-primary"
            >
              <option value="UGX">UGX (Ugandan Shilling)</option>
              <option value="USD">USD (US Dollar)</option>
              <option value="EUR">EUR (Euro)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 p-8 animate-fadeInUp">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Notifications</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">email</span>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">Email Notifications</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Receive updates via email</p>
              </div>
            </div>
            <button
              onClick={() => handleToggle('emailNotifications')}
              className={`relative w-14 h-8 rounded-full transition-colors ${
                settings.emailNotifications ? 'bg-primary' : 'bg-gray-300'
              }`}
            >
              <div className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-white transition-transform ${
                settings.emailNotifications ? 'translate-x-6' : 'translate-x-0'
              }`} />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">sms</span>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">SMS Notifications</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Receive updates via SMS</p>
              </div>
            </div>
            <button
              onClick={() => handleToggle('smsNotifications')}
              className={`relative w-14 h-8 rounded-full transition-colors ${
                settings.smsNotifications ? 'bg-primary' : 'bg-gray-300'
              }`}
            >
              <div className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-white transition-transform ${
                settings.smsNotifications ? 'translate-x-6' : 'translate-x-0'
              }`} />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">notifications</span>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">Transaction Alerts</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Get notified of all transactions</p>
              </div>
            </div>
            <button
              onClick={() => handleToggle('transactionAlerts')}
              className={`relative w-14 h-8 rounded-full transition-colors ${
                settings.transactionAlerts ? 'bg-primary' : 'bg-gray-300'
              }`}
            >
              <div className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-white transition-transform ${
                settings.transactionAlerts ? 'translate-x-6' : 'translate-x-0'
              }`} />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">event</span>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">Loan Reminders</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Reminders for loan payments</p>
              </div>
            </div>
            <button
              onClick={() => handleToggle('loanReminders')}
              className={`relative w-14 h-8 rounded-full transition-colors ${
                settings.loanReminders ? 'bg-primary' : 'bg-gray-300'
              }`}
            >
              <div className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-white transition-transform ${
                settings.loanReminders ? 'translate-x-6' : 'translate-x-0'
              }`} />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">campaign</span>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">Marketing Emails</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Receive promotional content</p>
              </div>
            </div>
            <button
              onClick={() => handleToggle('marketingEmails')}
              className={`relative w-14 h-8 rounded-full transition-colors ${
                settings.marketingEmails ? 'bg-primary' : 'bg-gray-300'
              }`}
            >
              <div className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-white transition-transform ${
                settings.marketingEmails ? 'translate-x-6' : 'translate-x-0'
              }`} />
            </button>
          </div>
        </div>
      </div>

      {/* Security */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 p-8 animate-fadeInUp">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Security</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">shield</span>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">Two-Factor Authentication</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Add extra security to your account</p>
              </div>
            </div>
            <button
              onClick={() => handleToggle('twoFactorAuth')}
              className={`relative w-14 h-8 rounded-full transition-colors ${
                settings.twoFactorAuth ? 'bg-primary' : 'bg-gray-300'
              }`}
            >
              <div className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-white transition-transform ${
                settings.twoFactorAuth ? 'translate-x-6' : 'translate-x-0'
              }`} />
            </button>
          </div>

          <button className="w-full flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-primary hover:bg-primary/5 transition-all">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">lock</span>
              <div className="text-left">
                <p className="font-semibold text-gray-900 dark:text-white">Change Password</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Update your password</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-gray-400">chevron_right</span>
          </button>

          <button className="w-full flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-primary hover:bg-primary/5 transition-all">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">devices</span>
              <div className="text-left">
                <p className="font-semibold text-gray-900 dark:text-white">Active Sessions</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Manage your logged-in devices</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-gray-400">chevron_right</span>
          </button>
        </div>
      </div>

      {/* Privacy */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 p-8 animate-fadeInUp">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Privacy & Data</h3>
        
        <div className="space-y-4">
          <button className="w-full flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-primary hover:bg-primary/5 transition-all">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">download</span>
              <div className="text-left">
                <p className="font-semibold text-gray-900 dark:text-white">Download Your Data</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Export your account data</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-gray-400">chevron_right</span>
          </button>

          <button className="w-full flex items-center justify-between p-4 rounded-lg border border-red-200 dark:border-red-800 hover:border-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all text-red-600">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined">delete</span>
              <div className="text-left">
                <p className="font-semibold">Delete Account</p>
                <p className="text-sm">Permanently delete your account</p>
              </div>
            </div>
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </div>

      {/* Save Button */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 p-8 animate-fadeInUp">
        <button
          onClick={handleSave}
          disabled={loading}
          className="w-full px-6 py-4 rounded-lg bg-primary text-gray-900 font-bold text-lg hover:opacity-90 transition-all disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save Settings'}
        </button>
      </div>
    </div>
  );
}
