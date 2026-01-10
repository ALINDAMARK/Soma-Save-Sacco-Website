import { useState, useEffect } from 'react';
import api from '../services/api';

/**
 * Auto Push Notification Prompt
 * Automatically prompts users to enable notifications - MANDATORY
 */
const AutoPushPrompt = () => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [attemptingAuto, setAttemptingAuto] = useState(true);

  useEffect(() => {
    checkAndPrompt();
    
    // Failsafe: Clear loading after 5 seconds no matter what
    const timeout = setTimeout(() => {
      if (attemptingAuto) {
        console.warn('Auto-subscribe timeout, clearing loading state');
        setAttemptingAuto(false);
      }
    }, 5000);
    
    return () => clearTimeout(timeout);
  }, []);

  const checkAndPrompt = async () => {
    // Check if push is supported
    if (!('serviceWorker' in navigator && 'PushManager' in window)) {
      setAttemptingAuto(false);
      return;
    }

    try {
      // Check if already subscribed
      const registration = await navigator.serviceWorker.ready;
      const existingSubscription = await registration.pushManager.getSubscription();
      
      if (existingSubscription) {
        // Already subscribed, ensure it's in backend
        setAttemptingAuto(false);
        return;
      }

      // Check permission status
      const permission = Notification.permission;
      
      if (permission === 'granted') {
        // Permission already granted, auto-subscribe immediately
        await autoSubscribe();
      } else if (permission === 'default') {
        // Never asked, show mandatory prompt IMMEDIATELY
        setAttemptingAuto(false);
        setShow(true); // Show immediately, no delay
      } else {
        // Permission denied, can't do anything
        setAttemptingAuto(false);
      }
    } catch (error) {
      console.error('Error checking notification status:', error);
      setAttemptingAuto(false);
    }
  };

  const autoSubscribe = async () => {
    try {
      const registration = await navigator.serviceWorker.ready;
      const vapidPublicKey = import.meta.env.VITE_VAPID_PUBLIC_KEY;
      
      if (!vapidPublicKey) {
        console.error('VAPID public key not configured');
        setAttemptingAuto(false);
        return;
      }

      const applicationServerKey = urlBase64ToUint8Array(vapidPublicKey);
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: applicationServerKey,
      });

      const subscriptionData = {
        endpoint: subscription.endpoint,
        keys: {
          p256dh: btoa(String.fromCharCode(...new Uint8Array(subscription.getKey('p256dh')))),
          auth: btoa(String.fromCharCode(...new Uint8Array(subscription.getKey('auth')))),
        },
      };

      await api.post('/push-subscriptions/', subscriptionData);
      console.log('✅ Auto-subscribed to push notifications');
      setAttemptingAuto(false);
    } catch (error) {
      console.error('Auto-subscribe failed:', error);
      setAttemptingAuto(false);
      // Show prompt if auto-subscribe fails
      setShow(true);
    }
  };

  const urlBase64ToUint8Array = (base64String) => {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  };

  const enableNotifications = async () => {
    setLoading(true);

    try {
      const permission = await Notification.requestPermission();
      
      if (permission === 'granted') {
        const registration = await navigator.serviceWorker.ready;
        const vapidPublicKey = import.meta.env.VITE_VAPID_PUBLIC_KEY;
        
        if (!vapidPublicKey) {
          console.error('VAPID public key not configured');
          setShow(false);
          return;
        }

        const applicationServerKey = urlBase64ToUint8Array(vapidPublicKey);
        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: applicationServerKey,
        });

        const subscriptionData = {
          endpoint: subscription.endpoint,
          keys: {
            p256dh: btoa(String.fromCharCode(...new Uint8Array(subscription.getKey('p256dh')))),
            auth: btoa(String.fromCharCode(...new Uint8Array(subscription.getKey('auth')))),
          },
        };

        await api.post('/push-subscriptions/', subscriptionData);
        setShow(false);
      } else {
        setShow(false);
      }
    } catch (error) {
      console.error('Error enabling notifications:', error);
      setShow(false);
    } finally {
      setLoading(false);
    }
  };

  // Removed "Maybe Later" - notification is required
  if (!show && !attemptingAuto) return null;

  // Show loading while attempting auto-subscribe
  if (attemptingAuto) {
    return (
      <div className="fixed bottom-4 right-4 z-50 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 animate-fadeIn">
        <div className="flex items-center gap-3">
          <svg className="animate-spin h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="text-sm text-gray-700 dark:text-gray-300">Setting up notifications...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 animate-fadeIn">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md mx-4 p-8 animate-slideUp">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <span className="material-symbols-outlined text-4xl text-primary">notifications_active</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Enable Notifications
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Stay informed with real-time updates from SomaSave SACCO
          </p>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-green-500 mt-0.5">account_balance</span>
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">Deposit Confirmations</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Instant alerts when your savings are credited</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-blue-500 mt-0.5">payments</span>
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">Loan Payment Reminders</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Never miss a payment deadline</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-purple-500 mt-0.5">campaign</span>
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">Important Announcements</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Stay updated on SACCO events and notices</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-orange-500 mt-0.5">security</span>
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">Security Alerts</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Account activity and security notifications</p>
            </div>
          </div>
        </div>

        <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <p className="text-xs text-blue-800 dark:text-blue-200 flex items-start gap-2">
            <span className="material-symbols-outlined text-base flex-shrink-0 mt-0.5">info</span>
            <span><strong>Mandatory Requirement:</strong> All SomaSave members must enable notifications to receive critical financial updates and maintain active membership status.</span>
          </p>
        </div>

        <button
          onClick={enableNotifications}
          disabled={loading}
          className="w-full px-6 py-4 rounded-lg bg-primary hover:bg-primary-dark text-gray-900 text-base font-bold transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Activating Notifications...
            </>
          ) : (
            <>
              <span className="material-symbols-outlined">notifications_active</span>
              Enable Notifications
            </>
          )}
        </button>

        <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-4">
          🔒 Click "Allow" when your browser prompts for permission
        </p>
      </div>
    </div>
  );
};

export default AutoPushPrompt;
