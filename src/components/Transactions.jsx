import { useState, useEffect } from 'react';
import api from '../services/api';

export default function Transactions({ user, recent_transactions }) {
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState(recent_transactions || []);
  const [filter, setFilter] = useState('all'); // all, deposits, withdrawals, loans
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState('all'); // all, week, month, year

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        const data = await api.auth.getDashboardStats();
        if (data.recent_transactions) {
          setTransactions(data.recent_transactions);
        }
      } catch (err) {
        console.error('Failed to fetch transactions:', err);
      } finally {
        setLoading(false);
      }
    };

    if (!recent_transactions) {
      fetchTransactions();
    } else {
      setLoading(false);
    }
  }, [recent_transactions]);

  const filterTransactions = () => {
    let filtered = [...transactions];

    // Filter by type
    if (filter !== 'all') {
      filtered = filtered.filter(t => 
        t.type.toLowerCase().includes(filter.toLowerCase())
      );
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(t =>
        t.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.amount.includes(searchTerm)
      );
    }

    return filtered;
  };

  const filteredTransactions = filterTransactions();

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <span className="material-symbols-outlined animate-spin text-4xl text-primary">progress_activity</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Transactions Header */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 p-8 animate-fadeInUp">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Transaction History</h2>
        
        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">search</span>
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:border-primary"
            />
          </div>
          
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:border-primary"
          >
            <option value="all">All Types</option>
            <option value="deposit">Deposits</option>
            <option value="withdrawal">Withdrawals</option>
            <option value="loan">Loans</option>
            <option value="payment">Payments</option>
          </select>

          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:border-primary"
          >
            <option value="all">All Time</option>
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="year">Last Year</option>
          </select>
        </div>

        {/* Transaction Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
            <div className="flex items-center gap-3 mb-2">
              <span className="material-symbols-outlined text-green-600">arrow_downward</span>
              <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">Total Deposits</span>
            </div>
            <p className="text-2xl font-bold text-green-600">
              UGX {filteredTransactions
                .filter(t => !t.amount.startsWith('-'))
                .reduce((sum, t) => sum + parseFloat(t.amount.replace(/[,+]/g, '')), 0)
                .toLocaleString()}
            </p>
          </div>

          <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
            <div className="flex items-center gap-3 mb-2">
              <span className="material-symbols-outlined text-red-600">arrow_upward</span>
              <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">Total Withdrawals</span>
            </div>
            <p className="text-2xl font-bold text-red-600">
              UGX {filteredTransactions
                .filter(t => t.amount.startsWith('-'))
                .reduce((sum, t) => sum + parseFloat(t.amount.replace(/[,-]/g, '')), 0)
                .toLocaleString()}
            </p>
          </div>

          <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
            <div className="flex items-center gap-3 mb-2">
              <span className="material-symbols-outlined text-blue-600">receipt_long</span>
              <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">Total Transactions</span>
            </div>
            <p className="text-2xl font-bold text-blue-600">{filteredTransactions.length}</p>
          </div>
        </div>
      </div>

      {/* Transactions List */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 p-8 animate-fadeInUp">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Recent Transactions</h3>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-primary hover:bg-primary/5 transition-all">
            <span className="material-symbols-outlined text-lg">download</span>
            <span className="text-sm font-semibold">Export</span>
          </button>
        </div>

        {filteredTransactions && filteredTransactions.length > 0 ? (
          <div className="space-y-3">
            {filteredTransactions.map((transaction, index) => {
              const isCredit = transaction.amount.startsWith('+') || !transaction.amount.startsWith('-');
              const amount = transaction.amount.replace(/[+-]/g, '');
              
              return (
                <div 
                  key={index}
                  className="flex items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-primary hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all cursor-pointer hover-lift"
                >
                  <div className="flex items-center gap-4">
                    <div className={`flex items-center justify-center w-12 h-12 rounded-full ${
                      isCredit 
                        ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' 
                        : 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
                    }`}>
                      <span className="material-symbols-outlined text-2xl">{transaction.icon || 'receipt'}</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white">
                        {transaction.type}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {transaction.date}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className={`text-xl font-bold ${
                      isCredit ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {isCredit ? '+' : '-'}UGX {amount}
                    </p>
                    <span className="inline-block mt-1 px-2 py-1 rounded text-xs font-semibold bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400">
                      {transaction.status || 'Completed'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <span className="material-symbols-outlined text-6xl text-gray-400 dark:text-gray-600 mb-4">receipt_long</span>
            <p className="text-gray-600 dark:text-gray-400 mb-2">No transactions found</p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              {searchTerm || filter !== 'all' 
                ? 'Try adjusting your filters' 
                : 'Your transactions will appear here'}
            </p>
          </div>
        )}
      </div>

      {/* Transaction Info */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 p-8 animate-fadeInUp">
        <div className="flex items-start gap-4">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 text-primary flex-shrink-0">
            <span className="material-symbols-outlined text-xl">info</span>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-2">Transaction Processing</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              All transactions are processed securely and typically reflect in your account within 24 hours. 
              For any discrepancies or questions, please contact our support team.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
// 