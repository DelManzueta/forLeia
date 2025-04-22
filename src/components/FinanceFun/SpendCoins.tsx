import React, { useState } from 'react';
import { ShoppingBag, Star, Gift, AlertCircle, CheckCircle, DollarSign, Wallet, ArrowRight } from 'lucide-react';

interface Reward {
  id: string;
  title: string;
  description: string;
  cost: number;
  image: string;
  category: 'toys' | 'activities' | 'privileges' | 'cash';
}

interface SpendCoinsProps {
  balance: number;
  onSpend: (amount: number) => void;
}

const WITHDRAWAL_FEE_PERCENTAGE = 10; // 10% fee

const rewards: Reward[] = [
  {
    id: '1',
    title: 'Extra Screen Time',
    description: '30 minutes of additional screen time',
    cost: 20,
    image: 'https://images.unsplash.com/photo-1594735812909-09165574c706?auto=format&fit=crop&w=300&h=200',
    category: 'privileges'
  },
  {
    id: '2',
    title: 'Choose Dinner',
    description: 'Pick what\'s for dinner tonight!',
    cost: 30,
    image: 'https://images.unsplash.com/photo-1576866206061-0ea8ec25fbcd?auto=format&fit=crop&w=300&h=200',
    category: 'privileges'
  },
  {
    id: '3',
    title: 'Art Supplies',
    description: 'New coloring books and markers',
    cost: 50,
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=300&h=200',
    category: 'toys'
  },
  {
    id: '4',
    title: 'Movie Night',
    description: 'Special movie night with snacks',
    cost: 40,
    image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=300&h=200',
    category: 'activities'
  },
  {
    id: '5',
    title: 'Board Game',
    description: 'Pick a new board game',
    cost: 60,
    image: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&w=300&h=200',
    category: 'toys'
  },
  {
    id: '6',
    title: 'Park Visit',
    description: 'Special trip to the park',
    cost: 25,
    image: 'https://images.unsplash.com/photo-1597534458220-9fb4969f2df5?auto=format&fit=crop&w=300&h=200',
    category: 'activities'
  },
  {
    id: '7',
    title: '$5 Cash Out',
    description: `Convert coins to real money (${WITHDRAWAL_FEE_PERCENTAGE}% fee applies)`,
    cost: 100,
    image: 'https://images.unsplash.com/photo-1580519542036-c47de6196ba5?auto=format&fit=crop&w=300&h=200',
    category: 'cash'
  },
  {
    id: '8',
    title: '$10 Cash Out',
    description: `Convert coins to real money (${WITHDRAWAL_FEE_PERCENTAGE}% fee applies)`,
    cost: 200,
    image: 'https://images.unsplash.com/photo-1580519542036-c47de6196ba5?auto=format&fit=crop&w=300&h=200',
    category: 'cash'
  },
  {
    id: '9',
    title: '$20 Cash Out',
    description: `Convert coins to real money (${WITHDRAWAL_FEE_PERCENTAGE}% fee applies)`,
    cost: 400,
    image: 'https://images.unsplash.com/photo-1580519542036-c47de6196ba5?auto=format&fit=crop&w=300&h=200',
    category: 'cash'
  }
];

function SpendCoins({ balance, onSpend }: SpendCoinsProps) {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'toys' | 'activities' | 'privileges' | 'cash'>('all');
  const [showConfirm, setShowConfirm] = useState<string | null>(null);
  const [showCashoutModal, setShowCashoutModal] = useState(false);
  const [selectedCashout, setSelectedCashout] = useState<Reward | null>(null);

  const filteredRewards = selectedCategory === 'all'
    ? rewards
    : rewards.filter(reward => reward.category === selectedCategory);

  const handlePurchase = (reward: Reward) => {
    if (balance >= reward.cost) {
      if (reward.category === 'cash') {
        setSelectedCashout(reward);
        setShowCashoutModal(true);
      } else {
        onSpend(-reward.cost);
        setShowConfirm(reward.id);
        setTimeout(() => setShowConfirm(null), 2000);
      }
    }
  };

  const handleCashout = () => {
    if (selectedCashout && balance >= selectedCashout.cost) {
      const fee = Math.floor(selectedCashout.cost * (WITHDRAWAL_FEE_PERCENTAGE / 100));
      const totalCost = selectedCashout.cost + fee;
      onSpend(-totalCost);
      setShowCashoutModal(false);
      setShowConfirm(selectedCashout.id);
      setTimeout(() => setShowConfirm(null), 2000);
    }
  };

  return (
    <div className="space-y-8">
      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {[
          { id: 'all', label: 'All Rewards', icon: Gift },
          { id: 'toys', label: 'Toys', icon: ShoppingBag },
          { id: 'activities', label: 'Activities', icon: Star },
          { id: 'privileges', label: 'Privileges', icon: Star },
          { id: 'cash', label: 'Cash Out', icon: DollarSign }
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setSelectedCategory(id as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              selectedCategory === id
                ? 'bg-emerald-100 text-emerald-700'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      {/* Rewards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRewards.map((reward) => (
          <div
            key={reward.id}
            className="group bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all"
          >
            <div className="relative rounded-2xl overflow-hidden mb-4">
              <img
                src={reward.image}
                alt={reward.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
              />
              <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full">
                <div className="flex items-center gap-1">
                  {reward.category === 'cash' ? (
                    <DollarSign className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <Star className="w-4 h-4 text-amber-500" />
                  )}
                  <span className="font-medium text-amber-600">{reward.cost}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-bold text-gray-900">{reward.title}</h3>
              <p className="text-sm text-gray-600">{reward.description}</p>

              {showConfirm === reward.id ? (
                <div className="flex items-center gap-2 text-emerald-600 font-medium">
                  <CheckCircle className="w-5 h-5" />
                  {reward.category === 'cash' ? 'Cash out processed!' : 'Reward claimed!'}
                </div>
              ) : (
                <button
                  onClick={() => handlePurchase(reward)}
                  disabled={balance < reward.cost}
                  className={`w-full py-2 rounded-lg text-sm font-medium transition-colors ${
                    balance >= reward.cost
                      ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {balance >= reward.cost ? (
                    reward.category === 'cash' ? 'Cash Out' : 'Claim Reward'
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      Need {reward.cost - balance} more coins
                    </div>
                  )}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Cash Out Confirmation Modal */}
      {showCashoutModal && selectedCashout && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full mx-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-emerald-100 rounded-xl">
                <Wallet className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Confirm Cash Out</h3>
            </div>
            
            <div className="space-y-4">
              <p className="text-gray-600">
                You're about to cash out {selectedCashout.title} with a {WITHDRAWAL_FEE_PERCENTAGE}% processing fee.
              </p>
              
              <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Amount:</span>
                  <span className="font-medium">{selectedCashout.cost} coins</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Fee ({WITHDRAWAL_FEE_PERCENTAGE}%):</span>
                  <span className="font-medium">{Math.floor(selectedCashout.cost * (WITHDRAWAL_FEE_PERCENTAGE / 100))} coins</span>
                </div>
                <div className="border-t border-gray-200 pt-2 flex justify-between font-medium">
                  <span>Total Cost:</span>
                  <span>{selectedCashout.cost + Math.floor(selectedCashout.cost * (WITHDRAWAL_FEE_PERCENTAGE / 100))} coins</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleCashout}
                  className="flex-1 bg-emerald-500 text-white py-2 rounded-lg hover:bg-emerald-600 transition-colors font-medium"
                >
                  Confirm
                </button>
                <button
                  onClick={() => setShowCashoutModal(false)}
                  className="flex-1 bg-gray-100 text-gray-600 py-2 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SpendCoins;