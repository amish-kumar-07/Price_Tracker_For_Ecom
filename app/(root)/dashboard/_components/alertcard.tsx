/* components/ProductCard.tsx */
"use client";
import { useCallback , useEffect } from "react";
import { DrawerDemo } from "../_components/alert";
import { DropdownMenuDemo } from "../_components/dropdown";
import { useRouter } from "next/navigation";

export type Product = {
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
};

interface ProductCardProps {
  product: Product;
  trackingFrequency: number | string;
  onDeleted: (asin: string, url: string) => void;
}

export default function ProductCard({
  product,
  trackingFrequency,
  onDeleted
}: ProductCardProps) {
    const router = useRouter();
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
    }, [product.asin, product.url, onDeleted]); // include 'product' as a dependency
 
  return (
    <div className="mt-6 w-[80%] min-h-[30vh] bg-blue-100 dark:bg-zinc-800 rounded-lg border-2 border-blue-300 p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        {/* Product Info */}
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold text-blue-900 dark:text-white">
            {product.name}
          </h2>
          <p className="text-sm text-blue-800 dark:text-zinc-300">
            Current&nbsp;Price:&nbsp;₹{product.currentPrice}
          </p>

          {/* Price‑change drawer */}
          <div className="mt-2 w-fit px-4 py-2 rounded-md text-sm transition-colors">
            <DrawerDemo />
          </div>

          {/* Tracking frequency */}
          <p className="text-sm text-green-700 dark:text-green-400 font-medium mt-1">
            Tracking&nbsp;Frequency:&nbsp;{trackingFrequency}&nbsp;Hrs/Every&nbsp;Day
          </p>
        </div>

        {/* Status + actions */}
        <div className="flex items-center gap-4 self-end md:self-center">
          <div className="flex flex-col gap-6">
            <button className="px-4 py-2 bg-green-200 text-green-900 rounded-md text-sm dark:bg-green-700 dark:text-white">
              Tracking&nbsp;Active
            </button>
            <DropdownMenuDemo />
          </div>

          {/* Delete button */}
          <button className="p-2 rounded-full bg-black hover:bg-red-600 transition-colors" onClick={deleteProduct}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-trash-2"
            >
              <path d="M3 6h18" />
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
              <line x1="10" x2="10" y1="11" y2="17" />
              <line x1="14" x2="14" y1="11" y2="17" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
