import React, { useState, useEffect } from 'react';
import { Search, Apple, ArrowRight, Loader2 } from 'lucide-react';

interface Nutrition {
  calories: number;
  fat: number;
  sugar: number;
  carbohydrates: number;
  protein: number;
}

interface Fruit {
  name: string;
  id: number;
  family: string;
  order: string;
  genus: string;
  nutritions: Nutrition;
}

function FruitNutrition() {
  const [fruits, setFruits] = useState<Fruit[]>([]);
  const [selectedFruit, setSelectedFruit] = useState<Fruit | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAllFruits();
  }, []);

  const fetchAllFruits = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/fruityvice?fruit=all`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
        }
      );
      const data = await response.json();
      setFruits(data);
    } catch (err) {
      setError('Failed to load fruits. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const fetchFruitDetails = async (fruitName: string) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/fruityvice?fruit=${fruitName}`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
        }
      );
      const data = await response.json();
      setSelectedFruit(data);
    } catch (err) {
      setError('Failed to load fruit details. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-red-100 rounded-xl">
            <Apple className="w-6 h-6 text-red-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Fruit Nutrition Facts</h2>
        </div>
        {loading && <Loader2 className="w-6 h-6 text-gray-400 animate-spin" />}
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Fruit Selection */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              onChange={(e) => fetchFruitDetails(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="">Select a fruit...</option>
              {fruits.map((fruit) => (
                <option key={fruit.id} value={fruit.name.toLowerCase()}>
                  {fruit.name}
                </option>
              ))}
            </select>
          </div>

          {selectedFruit && (
            <div className="mt-4">
              <h3 className="font-medium text-gray-900 mb-2">{selectedFruit.name}</h3>
              <div className="space-y-1 text-sm text-gray-600">
                <p>Family: {selectedFruit.family}</p>
                <p>Genus: {selectedFruit.genus}</p>
                <p>Order: {selectedFruit.order}</p>
              </div>
            </div>
          )}
        </div>

        {/* Nutrition Facts */}
        {selectedFruit && (
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h3 className="font-medium text-gray-900 mb-4">
              Nutrition Facts (per 100g)
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-2 bg-red-50 rounded-lg">
                <span className="text-red-700">Calories</span>
                <span className="font-medium text-red-700">
                  {selectedFruit.nutritions.calories} kcal
                </span>
              </div>
              <div className="flex items-center justify-between p-2 bg-blue-50 rounded-lg">
                <span className="text-blue-700">Carbohydrates</span>
                <span className="font-medium text-blue-700">
                  {selectedFruit.nutritions.carbohydrates}g
                </span>
              </div>
              <div className="flex items-center justify-between p-2 bg-yellow-50 rounded-lg">
                <span className="text-yellow-700">Sugar</span>
                <span className="font-medium text-yellow-700">
                  {selectedFruit.nutritions.sugar}g
                </span>
              </div>
              <div className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
                <span className="text-green-700">Protein</span>
                <span className="font-medium text-green-700">
                  {selectedFruit.nutritions.protein}g
                </span>
              </div>
              <div className="flex items-center justify-between p-2 bg-purple-50 rounded-lg">
                <span className="text-purple-700">Fat</span>
                <span className="font-medium text-purple-700">
                  {selectedFruit.nutritions.fat}g
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Fun Facts */}
      {selectedFruit && (
        <div className="bg-gradient-to-br from-red-400 to-orange-400 rounded-xl p-6 text-white">
          <h3 className="font-medium mb-2">Fun Facts about {selectedFruit.name}</h3>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <ArrowRight className="w-4 h-4" />
              {selectedFruit.name} belongs to the {selectedFruit.family} family
            </li>
            <li className="flex items-center gap-2">
              <ArrowRight className="w-4 h-4" />
              It's a great source of energy with {selectedFruit.nutritions.calories} calories per 100g
            </li>
            {selectedFruit.nutritions.sugar > 5 && (
              <li className="flex items-center gap-2">
                <ArrowRight className="w-4 h-4" />
                It's naturally sweet with {selectedFruit.nutritions.sugar}g of sugar
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default FruitNutrition;