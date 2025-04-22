import React, { useState } from 'react';
import { Coins, Sparkles, Star, History } from 'lucide-react';
import EarnChores from '../../components/FinanceFun/EarnChores';
import SpendCoins from '../../components/FinanceFun/SpendCoins';
import BankHistory from '../../components/FinanceFun/BankHistory';

function FinanceFun() {
  const [activeTab, setActiveTab] = useState('earn');
  const [balance, setBalance] = useState(() => {
    const saved = localStorage.getItem('bankBalance');
    return saved ? parseInt(saved) : 0;
  });

  const updateBalance = (amount: number) => {
    const newBalance = balance + amount;
    setBalance(newBalance);
    localStorage.setItem('bankBalance', newBalance.toString());
  };

  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold text-emerald-600">CoinQuest</h1>
        <p className="mt-2 text-emerald-600/80">Earn rewards and learn! 💰</p>
      </header>

      {/* Balance Card */}
      <div className="bg-gradient-to-br from-emerald-400 to-teal-500 rounded-3xl p-8 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
              <Coins className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">My Coins</h2>
              <p className="text-white/90">Keep earning!</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold">{balance}</div>
            <div className="text-white/90">coins</div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-2 p-1 bg-white rounded-xl shadow-sm">
        {[
          { id: 'earn', label: 'Earn Coins', icon: Star },
          { id: 'spend', label: 'Spend Coins', icon: Sparkles },
          { id: 'history', label: 'Bank History', icon: History }
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex-1 py-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
              activeTab === id
                ? 'bg-emerald-100 text-emerald-700'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="mt-6">
        {activeTab === 'earn' && <EarnChores onEarn={updateBalance} />}
        {activeTab === 'spend' && <SpendCoins balance={balance} onSpend={updateBalance} />}
        {activeTab === 'history' && <BankHistory />}
      </div>
    </div>
  );
}

export default FinanceFun;