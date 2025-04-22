import React from 'react';
import { History, TrendingUp, TrendingDown, Calendar } from 'lucide-react';

interface Transaction {
  id: string;
  type: 'earn' | 'spend';
  amount: number;
  description: string;
  date: string;
}

const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'earn',
    amount: 10,
    description: 'Completed daily chores',
    date: '2025-04-15'
  },
  {
    id: '2',
    type: 'spend',
    amount: 20,
    description: 'Extra screen time',
    date: '2025-04-14'
  },
  {
    id: '3',
    type: 'earn',
    amount: 15,
    description: 'Helped with dishes',
    date: '2025-04-14'
  },
  {
    id: '4',
    type: 'earn',
    amount: 25,
    description: 'Weekly room cleaning',
    date: '2025-04-13'
  },
  {
    id: '5',
    type: 'spend',
    amount: 30,
    description: 'New art supplies',
    date: '2025-04-12'
  }
];

function BankHistory() {
  const totalEarned = mockTransactions
    .filter(t => t.type === 'earn')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalSpent = mockTransactions
    .filter(t => t.type === 'spend')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="space-y-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-emerald-50 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-5 h-5 text-emerald-600" />
            <h3 className="font-medium text-emerald-900">Total Earned</h3>
          </div>
          <p className="text-2xl font-bold text-emerald-700">{totalEarned} coins</p>
        </div>

        <div className="bg-red-50 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <TrendingDown className="w-5 h-5 text-red-600" />
            <h3 className="font-medium text-red-900">Total Spent</h3>
          </div>
          <p className="text-2xl font-bold text-red-700">{totalSpent} coins</p>
        </div>

        <div className="bg-purple-50 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="w-5 h-5 text-purple-600" />
            <h3 className="font-medium text-purple-900">Net Savings</h3>
          </div>
          <p className="text-2xl font-bold text-purple-700">{totalEarned - totalSpent} coins</p>
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-white rounded-3xl p-6 shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <History className="w-6 h-6 text-gray-600" />
          <h2 className="text-xl font-bold text-gray-900">Transaction History</h2>
        </div>

        <div className="space-y-4">
          {mockTransactions.map(transaction => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-lg ${
                  transaction.type === 'earn'
                    ? 'bg-emerald-100 text-emerald-600'
                    : 'bg-red-100 text-red-600'
                }`}>
                  {transaction.type === 'earn' ? (
                    <TrendingUp className="w-5 h-5" />
                  ) : (
                    <TrendingDown className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{transaction.description}</h3>
                  <p className="text-sm text-gray-500">
                    {new Date(transaction.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className={`font-medium ${
                transaction.type === 'earn'
                  ? 'text-emerald-600'
                  : 'text-red-600'
              }`}>
                {transaction.type === 'earn' ? '+' : '-'}{transaction.amount} coins
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BankHistory;