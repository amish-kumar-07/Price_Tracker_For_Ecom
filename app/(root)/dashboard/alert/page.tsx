"use client";

import { useState, useEffect, useCallback } from "react";
import { NavbarDemo } from "../_components/navbar";
import { useUser } from "@/app/context/UserContext";
import ProductCard, { Product } from "../_components/alertcard";

function Page() {
  const { Tracking_Frequency, userEmail, loading } = useUser();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');

  const fetchData = useCallback(async () => {
    try {
      if (!userEmail) return;
      setIsLoading(true);
      const res = await fetch(`http://localhost:3000/api/setups/fetchdata?email=${userEmail}`);
      const result = await res.json();
      if (res.ok) setProducts(result.data || []);
      else console.error("Fetch failed:", result.message);
    } catch (err) {
      console.log("Error found:", err);
    } finally {
      setIsLoading(false);
    }
  }, [userEmail]);

  const handleDeleted = useCallback((asin: string, url: string) => {
    setProducts(prev => prev.filter(p => !(p.asin === asin && p.url === url)));
  }, []);

  const handletracking = useCallback((asin: string, status: boolean) => {
    setProducts(prev => prev.map(p => p.asin === asin ? { ...p, status } : p));
  }, []);

  useEffect(() => {
    if (!loading && userEmail) fetchData();
  }, [fetchData, loading, userEmail]);

  const filteredProducts = products.filter(product => {
    const matchStatus = filterStatus === 'all' || (filterStatus === 'active' && product.status) || (filterStatus === 'inactive' && !product.status);
    return matchStatus;
  });

  const activeCount = products.filter(p => p.status).length;
  const inactiveCount = products.filter(p => !p.status).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-gray-900 dark:to-slate-800">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full opacity-10 animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full opacity-10 animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 shadow-sm">
        <div className="w-full px-4 sm:px-6 lg:px-8 flex justify-center py-4">
          <NavbarDemo />
        </div>
      </header>

      <main className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <section className="text-center space-y-4">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium animate-fadeIn">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Product Tracking Dashboard
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white animate-slideUp">
            Your <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Watchlist</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-4xl mx-auto animate-slideUp" style={{ animationDelay: '0.2s' }}>
            Stay ahead of the market with real-time price tracking and smart notifications
          </p>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 lg:p-8 rounded-xl border shadow-sm text-center">
            <div className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">{products.length}</div>
            <div className="text-sm lg:text-base text-gray-600 dark:text-gray-400 mt-2">Total Products</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 lg:p-8 rounded-xl border shadow-sm text-center">
            <div className="text-3xl lg:text-4xl font-bold text-green-600 dark:text-green-400">{activeCount}</div>
            <div className="text-sm lg:text-base text-gray-600 dark:text-gray-400 mt-2">Active Tracking</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 lg:p-8 rounded-xl border shadow-sm text-center">
            <div className="text-3xl lg:text-4xl font-bold text-gray-500 dark:text-gray-500">{inactiveCount}</div>
            <div className="text-sm lg:text-base text-gray-600 dark:text-gray-400 mt-2">Paused</div>
          </div>
        </section>

        {products.length > 0 && (
          <section className="bg-white dark:bg-gray-800 p-6 lg:p-8 rounded-xl border shadow-sm">
            <div className="flex justify-center">
              <div className="inline-flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                {['all', 'active', 'inactive'].map(status => (
                  <button
                    key={status}
                    onClick={() => setFilterStatus(status as typeof filterStatus)}
                    className={`px-6 py-3 text-sm lg:text-base rounded-md font-medium transition-all ${
                      filterStatus === status 
                        ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm' 
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)} ({status === 'all' ? products.length : status === 'active' ? activeCount : inactiveCount})
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        {isLoading ? (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin h-16 w-16 border-4 border-blue-200 dark:border-blue-800 border-t-blue-600 rounded-full"></div>
          </div>
        ) : filteredProducts.length > 0 ? (
          <section className="space-y-6">
            <div className="flex justify-center">
              <div className="w-full max-w-none" style={{ width: '70%' }}>
                <div className="space-y-6">
                  {filteredProducts.map((product, i) => (
                    <div key={product.asin + product.url} className="w-full">
                      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:scale-[1.01] overflow-hidden">
                        <div className="p-6 lg:p-8">
                          <ProductCard
                            product={product}
                            trackingFrequency={Tracking_Frequency}
                            onDeleted={handleDeleted}
                            onTracking={handletracking}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        ) : (
          <div className="text-center text-gray-500 dark:text-gray-400 py-16">
            {products.length === 0 ? (
              <div className="space-y-4">
                <div className="text-6xl">📦</div>
                <p className="text-xl">Add your first product to start tracking prices!</p>
                <p className="text-sm">Get notified when prices drop on your favorite items</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-6xl">🔍</div>
                <p className="text-xl">No products match your current filter.</p>
                <p className="text-sm">Try selecting a different filter option</p>
              </div>
            )}
          </div>
        )}
      </main>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.8s ease-out; }
        .animate-slideUp { animation: slideUp 0.6s ease-out forwards; opacity: 0; }
      `}</style>
    </div>
  );
}

export default Page;