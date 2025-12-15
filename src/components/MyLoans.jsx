import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

export default function MyLoans({ user }) {
  const [loading, setLoading] = useState(true);
  const [loansData, setLoansData] = useState(null);

  useEffect(() => {
    const fetchLoansData = async () => {
      try {
        setLoading(true);
        const data = await api.auth.getDashboardStats();
        setLoansData(data);
      } catch (err) {
        console.error('Failed to fetch loans data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLoansData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <span className="material-symbols-outlined animate-spin text-4xl text-primary">progress_activity</span>
      </div>
    );
  }

  const activeLoansCount = loansData?.stats?.active_loans_count || 0;
  const totalLoanAmount = loansData?.stats?.total_loan_amount || 0;
  const outstandingBalance = loansData?.stats?.outstanding_balance || 0;

  // Mock loan data - replace with actual API data when available
  const loans = [
    // Example structure - populate from actual API
  ];

  return (
    <div className="space-y-6">
      {/* Loans Overview */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 p-8 animate-fadeInUp">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">My Loans</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="p-6 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-500/5 border border-blue-500/30">
            <div className="flex items-center justify-between mb-4">
              <span className="material-symbols-outlined text-blue-600 text-3xl">payments</span>
              <span className="text-sm font-semibold text-blue-600 bg-white dark:bg-gray-900 px-3 py-1 rounded-full">
                Active
              </span>
            </div>
            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">Active Loans</h3>
            <p className="text-4xl font-bold text-gray-900 dark:text-white">{activeLoansCount}</p>
          </div>

          <div className="p-6 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-500/5 border border-purple-500/30">
            <div className="flex items-center justify-between mb-4">
              <span className="material-symbols-outlined text-purple-600 text-3xl">account_balance</span>
            </div>
            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">Total Borrowed</h3>
            <p className="text-4xl font-bold text-gray-900 dark:text-white">
              UGX {parseFloat(totalLoanAmount).toLocaleString()}
            </p>
          </div>

          <div className="p-6 rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-500/5 border border-orange-500/30">
            <div className="flex items-center justify-between mb-4">
              <span className="material-symbols-outlined text-orange-600 text-3xl">hourglass_empty</span>
            </div>
            <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">Outstanding Balance</h3>
            <p className="text-4xl font-bold text-gray-900 dark:text-white">
              UGX {parseFloat(outstandingBalance).toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Active Loans */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 p-8 animate-fadeInUp">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Your Loans</h3>
        
        {loans && loans.length > 0 ? (
          <div className="space-y-4">
            {loans.map((loan, index) => (
              <div 
                key={index}
                className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-primary transition-all cursor-pointer hover-lift"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-500/20 text-blue-600">
                      <span className="material-symbols-outlined text-2xl">payments</span>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                        {loan.type || 'Student Loan'}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Loan ID: {loan.id || 'N/A'}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      UGX {parseFloat(loan.amount || 0).toLocaleString()}
                    </p>
                    <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold ${
                      loan.status === 'active' 
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                        : loan.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                        : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
                    }`}>
                      {loan.status || 'Pending'}
                    </span>
                  </div>
                </div>
                
                {loan.status === 'active' && (
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600 dark:text-gray-400">Repayment Progress</span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {loan.repayment_percentage || 0}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary transition-all"
                        style={{ width: `${loan.repayment_percentage || 0}%` }}
                      />
                    </div>
                    <div className="flex justify-between mt-2 text-sm">
                      <span className="text-gray-600 dark:text-gray-400">
                        Next payment: {loan.next_payment_date || 'N/A'}
                      </span>
                      <span className="font-semibold text-gray-900 dark:text-white">
                        UGX {parseFloat(loan.next_payment_amount || 0).toLocaleString()}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <span className="material-symbols-outlined text-6xl text-gray-400 dark:text-gray-600 mb-4">payments</span>
            <p className="text-gray-600 dark:text-gray-400 mb-6">No active loans</p>
            <Link to="/loan-application">
              <button className="px-6 py-3 rounded-full bg-primary text-gray-900 font-bold hover:opacity-90 transition-all">
                Apply for a Loan
              </button>
            </Link>
          </div>
        )}
      </div>

      {/* Loan Information */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 p-8 animate-fadeInUp">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Loan Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-start gap-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 text-primary flex-shrink-0">
              <span className="material-symbols-outlined text-xl">info</span>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">Eligibility</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Members with at least 3 months of active savings are eligible for loans up to 3x their savings balance.
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 text-primary flex-shrink-0">
              <span className="material-symbols-outlined text-xl">percent</span>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">Interest Rates</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Competitive interest rates starting from 12% per annum on reducing balance.
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 text-primary flex-shrink-0">
              <span className="material-symbols-outlined text-xl">schedule</span>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">Repayment Period</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Flexible repayment periods from 6 to 36 months depending on loan amount.
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 text-primary flex-shrink-0">
              <span className="material-symbols-outlined text-xl">support_agent</span>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-2">Support</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Need help? Contact our support team for loan inquiries and assistance.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 p-8 animate-fadeInUp">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Loan Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link to="/loan-application">
            <button className="w-full flex items-center gap-3 p-4 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-primary hover:bg-primary/5 transition-all">
              <span className="material-symbols-outlined text-primary text-2xl">add_circle</span>
              <span className="font-semibold text-gray-900 dark:text-white">New Application</span>
            </button>
          </Link>
          <button className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-primary hover:bg-primary/5 transition-all">
            <span className="material-symbols-outlined text-primary text-2xl">payments</span>
            <span className="font-semibold text-gray-900 dark:text-white">Make Payment</span>
          </button>
          <button className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-primary hover:bg-primary/5 transition-all">
            <span className="material-symbols-outlined text-primary text-2xl">download</span>
            <span className="font-semibold text-gray-900 dark:text-white">Download Statement</span>
          </button>
        </div>
      </div>
    </div>
  );
}
