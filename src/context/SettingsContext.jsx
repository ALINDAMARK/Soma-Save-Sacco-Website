import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const SettingsContext = createContext();

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState({
    language: 'en',
    currency: 'UGX',
    emailNotifications: true,
    smsNotifications: false,
    transactionAlerts: true,
    loanReminders: true,
    marketingEmails: false,
    twoFactorAuth: false,
  });
  const [loading, setLoading] = useState(true);

  // Load settings on mount
  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      if (!isLoggedIn) {
        setLoading(false);
        return;
      }

      const data = await api.settings.get();
      setSettings({
        language: data.language || 'en',
        currency: data.currency || 'UGX',
        emailNotifications: data.email_notifications,
        smsNotifications: data.sms_notifications,
        transactionAlerts: data.transaction_alerts,
        loanReminders: data.loan_reminders,
        marketingEmails: data.marketing_emails,
        twoFactorAuth: data.two_factor_auth,
      });
    } catch (err) {
      console.error('Failed to load settings:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateSettings = (newSettings) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  // Currency formatting
  const formatCurrency = (amount) => {
    const numAmount = parseFloat(amount) || 0;
    
    switch (settings.currency) {
      case 'USD':
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(numAmount);
      case 'EUR':
        return new Intl.NumberFormat('de-DE', {
          style: 'currency',
          currency: 'EUR',
        }).format(numAmount);
      case 'UGX':
      default:
        return new Intl.NumberFormat('en-UG', {
          style: 'currency',
          currency: 'UGX',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(numAmount);
    }
  };

  // Get currency symbol
  const getCurrencySymbol = () => {
    switch (settings.currency) {
      case 'USD':
        return '$';
      case 'EUR':
        return '€';
      case 'UGX':
      default:
        return 'UGX';
    }
  };

  // Translation function
  const t = (key) => {
    return translations[settings.language]?.[key] || translations['en'][key] || key;
  };

  return (
    <SettingsContext.Provider
      value={{
        settings,
        updateSettings,
        loadSettings,
        formatCurrency,
        getCurrencySymbol,
        t,
        loading,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}

// Translations
const translations = {
  en: {
    // Navigation
    home: 'Home',
    about: 'About',
    services: 'Services',
    contact: 'Contact',
    login: 'Login',
    register: 'Register',
    logout: 'Logout',
    
    // Dashboard
    dashboard: 'Dashboard',
    overview: 'Overview',
    savings: 'My Savings',
    loans: 'My Loans',
    transactions: 'Transactions',
    profile: 'Profile',
    settings: 'Settings',
    
    // Stats
    totalSavings: 'Total Savings',
    activeLoans: 'Active Loans',
    dividends: 'Dividends',
    savingsGrowth: 'Savings Growth',
    
    // Actions
    save: 'Save',
    cancel: 'Cancel',
    apply: 'Apply',
    submit: 'Submit',
    edit: 'Edit',
    delete: 'Delete',
    
    // Messages
    loading: 'Loading...',
    savingChanges: 'Saving changes...',
    success: 'Success!',
    error: 'Error',
    
    // Loans
    applyForLoan: 'Apply for Loan',
    loanAmount: 'Loan Amount',
    loanPurpose: 'Loan Purpose',
    repaymentPeriod: 'Repayment Period',
    
    // Transactions
    recentTransactions: 'Recent Transactions',
    deposit: 'Deposit',
    withdrawal: 'Withdrawal',
    transfer: 'Transfer',
    
    // Profile
    personalInfo: 'Personal Information',
    contactInfo: 'Contact Information',
    studentInfo: 'Student Information',
    
    // Settings
    appearance: 'Appearance',
    notifications: 'Notifications',
    security: 'Security',
    privacy: 'Privacy & Data',
  },
  sw: {
    // Navigation (Swahili)
    home: 'Nyumbani',
    about: 'Kuhusu',
    services: 'Huduma',
    contact: 'Wasiliana',
    login: 'Ingia',
    register: 'Sajili',
    logout: 'Toka',
    
    // Dashboard
    dashboard: 'Dashibodi',
    overview: 'Muhtasari',
    savings: 'Akiba Zangu',
    loans: 'Mikopo Yangu',
    transactions: 'Miamala',
    profile: 'Wasifu',
    settings: 'Mipangilio',
    
    // Stats
    totalSavings: 'Jumla ya Akiba',
    activeLoans: 'Mikopo Hai',
    dividends: 'Gawio',
    savingsGrowth: 'Ukuaji wa Akiba',
    
    // Actions
    save: 'Hifadhi',
    cancel: 'Ghairi',
    apply: 'Omba',
    submit: 'Wasilisha',
    edit: 'Hariri',
    delete: 'Futa',
    
    // Messages
    loading: 'Inapakia...',
    savingChanges: 'Inahifadhi mabadiliko...',
    success: 'Imefanikiwa!',
    error: 'Hitilafu',
    
    // Loans
    applyForLoan: 'Omba Mkopo',
    loanAmount: 'Kiasi cha Mkopo',
    loanPurpose: 'Madhumuni ya Mkopo',
    repaymentPeriod: 'Muda wa Kulipa',
    
    // Transactions
    recentTransactions: 'Miamala ya Hivi Karibuni',
    deposit: 'Amana',
    withdrawal: 'Kutoa',
    transfer: 'Uhamisho',
    
    // Profile
    personalInfo: 'Maelezo Binafsi',
    contactInfo: 'Maelezo ya Mawasiliano',
    studentInfo: 'Maelezo ya Mwanafunzi',
    
    // Settings
    appearance: 'Muonekano',
    notifications: 'Arifa',
    security: 'Usalama',
    privacy: 'Faragha na Data',
  },
  lg: {
    // Navigation (Luganda)
    home: 'Eka',
    about: 'Ebikwata Ku Ffe',
    services: 'Obuweereza',
    contact: 'Tutukirire',
    login: 'Yingira',
    register: 'Weekwandiise',
    logout: 'Fuluma',
    
    // Dashboard
    dashboard: 'Ekipande',
    overview: 'Okwetegereza',
    savings: 'Ensimbi Zange',
    loans: 'Ebbanja Lyange',
    transactions: 'Enkolagana',
    profile: 'Ebikwata Ku Nze',
    settings: 'Enteekateeka',
    
    // Stats
    totalSavings: 'Ensimbi Zonna',
    activeLoans: 'Ebbanja Eririwo',
    dividends: 'Emigabo',
    savingsGrowth: 'Okweyongera kw\'Ensimbi',
    
    // Actions
    save: 'Tereka',
    cancel: 'Sazaamu',
    apply: 'Saba',
    submit: 'Sindika',
    edit: 'Kyusa',
    delete: 'Sangula',
    
    // Messages
    loading: 'Etegeka...',
    savingChanges: 'Etereka enkyukakyuka...',
    success: 'Kiwedde!',
    error: 'Waliwo Ensobi',
    
    // Loans
    applyForLoan: 'Saba Ebbanja',
    loanAmount: 'Omuwendo gw\'Ebbanja',
    loanPurpose: 'Ekigendererwa ky\'Ebbanja',
    repaymentPeriod: 'Ekiseera ky\'Okusasula',
    
    // Transactions
    recentTransactions: 'Enkolagana ez\'Obudde buno',
    deposit: 'Kuteeka',
    withdrawal: 'Okuggyamu',
    transfer: 'Okusindika',
    
    // Profile
    personalInfo: 'Ebikwata Ku Nze',
    contactInfo: 'Ebikwata ku Kutukirira',
    studentInfo: 'Ebikwata ku Muyizi',
    
    // Settings
    appearance: 'Endabika',
    notifications: 'Obubaka',
    security: 'Obukuumi',
    privacy: 'Ebyama n\'Ebikwata ku Data',
  },
};
