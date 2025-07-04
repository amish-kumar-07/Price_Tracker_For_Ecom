/* components/ProductCard.tsx */
"use client";
import { useCallback , useState } from "react";
import { DrawerDemo } from "../_components/alert";
import { DropdownMenuDemo } from "../_components/dropdown";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/context/UserContext";

export type Product = {
  [x: string]: any;
  name: string;
  email: string;
  url: string;
  image?: string;
  asin: string;
  currentPrice: number | string;
  original_price?: number | string;
  price_string?: string;
  stars?: number | string;
  total_reviews?: number;
  has_prime?: boolean;
  is_best_seller?: boolean;
  is_amazon_choice?: boolean;
  status?:boolean;
  title?: string;
};

interface ProductCardProps {
  product: Product;
  trackingFrequency: number | string;
  onDeleted: (asin: string, url: string) => void;
  onTracking: (asin: string, status: boolean) => void;
}

export default function ProductCard({
  product,
  trackingFrequency,
  onDeleted,
  onTracking,
}: ProductCardProps) {
    const router = useRouter();
    const [trackingStatus, setTrackingStatus] = useState(product.status ?? false);
    const { userEmail } = useUser();

    const deleteProduct = useCallback(async () => {
    try {
        const response = await fetch("http://localhost:3000/api/setups/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            asin: product.asin,
            url: product.url,
        }),
        });

        const data = await response.json();

        if (!data.success) {
            console.error("Deletion failed:", data.message);
            alert(data.message || "Deletion failed.");
            return;
        }
        onDeleted(product.asin, product.url);
        alert("✅ Product deleted successfully!");
    } catch (err) {
        console.error("Error found:", err);
        alert("Process failed! Nothing was deleted.");
    }
  }, [product.asin, product.url, onDeleted]);
 
  const toggleTrackingStatus = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:3000/api/setups/tracking", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          asin: product.asin,
          email: userEmail,
          status: !trackingStatus,
        }),
      });

      const data = await response.json();
      if (!data.success) {
        console.error("Status toggle failed:", data.message);
        alert(data.message || "Status toggle failed.");
        return;
      }

      setTrackingStatus(prev => !prev);
      onTracking(product.asin, !trackingStatus);
    } catch (err) {
      console.error("Error toggling tracking:", err);
      alert("Something went wrong while changing tracking.");
    }
  }, [product.asin, trackingStatus, userEmail, onTracking]);

  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
      {/* Header with Status Indicator */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-800 px-6 py-4 border-b border-gray-200 dark:border-gray-600">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {trackingStatus ? (
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-green-700 dark:text-green-400">
                  Active Tracking
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Tracking Paused
                </span>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              ASIN: {product.asin}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Product Image */}
          <div className="flex-shrink-0">
            <div className="w-24 h-24 lg:w-32 lg:h-32 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center overflow-hidden">
              {product.image ? (
                <img 
                  src={product.image} 
                  alt={product.name || product.title || "Product"}
                  className="w-full h-full object-cover"
                />
              ) : (
                <svg className="w-8 h-8 lg:w-12 lg:h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                </svg>
              )}
            </div>
          </div>

          {/* Product Details */}
          <div className="flex-1 min-w-0">
            <div className="space-y-4">
              {/* Title */}
              <div>
                <h3 className="text-lg lg:text-xl font-semibold text-gray-900 dark:text-white leading-tight">
                  {product.name || product.title || "Product Name"}
                </h3>
                {product.url && (
                  <a 
                    href={product.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors inline-flex items-center gap-1 mt-1"
                  >
                    View on Amazon
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </a>
                )}
              </div>

              {/* Price Information */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Current Price</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      ₹{product.currentPrice}
                    </p>
                  </div>
                  
                  {product.original_price && product.original_price !== product.currentPrice && (
                    <div className="text-right">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Original Price</p>
                      <p className="text-lg text-gray-500 dark:text-gray-400 line-through">
                        ₹{product.original_price}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                {product.is_best_seller && (
                  <span className="px-3 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded-full dark:bg-orange-900 dark:text-orange-300">
                    Best Seller
                  </span>
                )}
                {product.is_amazon_choice && (
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full dark:bg-blue-900 dark:text-blue-300">
                    Amazon's Choice
                  </span>
                )}
                {product.has_prime && (
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full dark:bg-purple-900 dark:text-purple-300">
                    Prime
                  </span>
                )}
              </div>

              {/* Reviews */}
              {(product.stars || product.total_reviews) && (
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                  {product.stars && (
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span>{product.stars}</span>
                    </div>
                  )}
                  {product.total_reviews && (
                    <span>({product.total_reviews} reviews)</span>
                  )}
                </div>
              )}

              {/* Tracking Frequency */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                <p className="text-sm text-blue-800 dark:text-blue-300">
                  <svg className="w-4 h-4 inline mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  Tracking every {trackingFrequency} hours
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
          <div className="flex items-center gap-3 flex-1">
            <button
              onClick={toggleTrackingStatus}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                trackingStatus 
                  ? 'bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/50' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {trackingStatus ? 'Pause Tracking' : 'Resume Tracking'}
            </button>
            
            <DrawerDemo />
            <DropdownMenuDemo />
          </div>

          <button 
            onClick={deleteProduct}
            className="p-2 bg-red-100 hover:bg-red-200 text-red-600 hover:text-red-700 rounded-lg transition-colors dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}