import { useState, useEffect } from 'react';

export default function LoanApplication() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    idNumber: '',
    memberNumber: '',
    loanType: '',
    loanAmount: '',
    purpose: '',
    employmentStatus: '',
    monthlyIncome: '',
    loanTerm: '',
    collateral: '',
    additionalInfo: ''
  });

  useEffect(() => {
    const scrollRevealElements = document.querySelectorAll('.scroll-reveal');
    
    const scrollReveal = () => {
      scrollRevealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight * 0.85) {
          element.classList.add('revealed');
        }
      });
    };
    
    window.addEventListener('scroll', scrollReveal);
    window.addEventListener('load', scrollReveal);
    scrollReveal();
    
    return () => {
      window.removeEventListener('scroll', scrollReveal);
      window.removeEventListener('load', scrollReveal);
    };
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Loan application submitted:', formData);
    alert('Thank you for your loan application! We will review it and get back to you within 2-3 business days.');
    // Reset form
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      idNumber: '',
      memberNumber: '',
      loanType: '',
      loanAmount: '',
      purpose: '',
      employmentStatus: '',
      monthlyIncome: '',
      loanTerm: '',
      collateral: '',
      additionalInfo: ''
    });
  };

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="py-20 md:py-32 scroll-reveal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-black leading-tight tracking-tighter text-gray-900 dark:text-white sm:text-5xl md:text-6xl animate-fadeInUp">
              Loan Application
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-lg leading-normal text-gray-600 dark:text-gray-400 animate-fadeInUp stagger-1">
              Complete the form below to apply for a loan. Our team will review your application and contact you shortly.
            </p>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-16 scroll-reveal">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 p-8 md:p-12 animate-scaleIn">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Application Form</h2>
              <p className="text-gray-600 dark:text-gray-400">Please provide accurate information to help us process your application quickly.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="border-b border-gray-200 dark:border-gray-800 pb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-800 bg-background-light dark:bg-background-dark text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-800 bg-background-light dark:bg-background-dark text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-800 bg-background-light dark:bg-background-dark text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                      placeholder="+256 700 123 456"
                    />
                  </div>

                  <div>
                    <label htmlFor="idNumber" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      National ID Number *
                    </label>
                    <input
                      type="text"
                      id="idNumber"
                      name="idNumber"
                      required
                      value={formData.idNumber}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-800 bg-background-light dark:bg-background-dark text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                      placeholder="CM12345678901234"
                    />
                  </div>

                  <div>
                    <label htmlFor="memberNumber" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Member Number
                    </label>
                    <input
                      type="text"
                      id="memberNumber"
                      name="memberNumber"
                      value={formData.memberNumber}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-800 bg-background-light dark:bg-background-dark text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                      placeholder="SS123456 (if existing member)"
                    />
                  </div>
                </div>
              </div>

              {/* Loan Details */}
              <div className="border-b border-gray-200 dark:border-gray-800 pb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Loan Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="loanType" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Loan Type *
                    </label>
                    <select
                      id="loanType"
                      name="loanType"
                      required
                      value={formData.loanType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-800 bg-background-light dark:bg-background-dark text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    >
                      <option value="">Select loan type</option>
                      <option value="business">Business Development Loan</option>
                      <option value="home">Home Improvement Loan</option>
                      <option value="education">Education Loan</option>
                      <option value="emergency">Emergency Loan</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="loanAmount" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Loan Amount (UGX) *
                    </label>
                    <input
                      type="number"
                      id="loanAmount"
                      name="loanAmount"
                      required
                      value={formData.loanAmount}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-800 bg-background-light dark:bg-background-dark text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                      placeholder="5000000"
                    />
                  </div>

                  <div>
                    <label htmlFor="loanTerm" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Loan Term (Months) *
                    </label>
                    <select
                      id="loanTerm"
                      name="loanTerm"
                      required
                      value={formData.loanTerm}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-800 bg-background-light dark:bg-background-dark text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    >
                      <option value="">Select term</option>
                      <option value="6">6 months</option>
                      <option value="12">12 months</option>
                      <option value="18">18 months</option>
                      <option value="24">24 months</option>
                      <option value="36">36 months</option>
                      <option value="48">48 months</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="purpose" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Purpose of Loan *
                    </label>
                    <input
                      type="text"
                      id="purpose"
                      name="purpose"
                      required
                      value={formData.purpose}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-800 bg-background-light dark:bg-background-dark text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                      placeholder="e.g., Expand retail business"
                    />
                  </div>
                </div>
              </div>

              {/* Financial Information */}
              <div className="border-b border-gray-200 dark:border-gray-800 pb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Financial Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="employmentStatus" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Employment Status *
                    </label>
                    <select
                      id="employmentStatus"
                      name="employmentStatus"
                      required
                      value={formData.employmentStatus}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-800 bg-background-light dark:bg-background-dark text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    >
                      <option value="">Select status</option>
                      <option value="employed">Employed</option>
                      <option value="self-employed">Self-Employed</option>
                      <option value="business">Business Owner</option>
                      <option value="retired">Retired</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="monthlyIncome" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Monthly Income (UGX) *
                    </label>
                    <input
                      type="number"
                      id="monthlyIncome"
                      name="monthlyIncome"
                      required
                      value={formData.monthlyIncome}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-800 bg-background-light dark:bg-background-dark text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                      placeholder="1000000"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="collateral" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Collateral (if applicable)
                    </label>
                    <input
                      type="text"
                      id="collateral"
                      name="collateral"
                      value={formData.collateral}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-800 bg-background-light dark:bg-background-dark text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                      placeholder="e.g., Land title, vehicle, guarantor"
                    />
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div>
                <label htmlFor="additionalInfo" className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  Additional Information
                </label>
                <textarea
                  id="additionalInfo"
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-800 bg-background-light dark:bg-background-dark text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none"
                  placeholder="Any additional information you'd like to share..."
                ></textarea>
              </div>

              {/* Terms and Submit */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="terms"
                    required
                    className="mt-1 w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <label htmlFor="terms" className="text-sm text-gray-600 dark:text-gray-400">
                    I confirm that the information provided is accurate and I agree to the SACCO's terms and conditions for loan applications. *
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center rounded-full h-14 px-8 bg-primary text-gray-900 text-lg font-bold leading-normal hover:opacity-90 hover-glow transform hover:scale-105 transition-all"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>

          {/* Help Section */}
          <div className="mt-8 p-6 rounded-xl bg-primary/10 dark:bg-primary/20 border border-primary/20 animate-fadeInUp">
            <div className="flex items-start gap-4">
              <span className="material-symbols-outlined text-primary text-3xl">info</span>
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Need Help?</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  If you have questions about the loan application process, please contact us:
                </p>
                <p className="text-gray-900 dark:text-white font-semibold">
                  Phone: +256 700 123 456 | Email: loans@somasave.co.ug
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
