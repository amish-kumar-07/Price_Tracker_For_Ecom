"use client";
import { useState, useEffect, useCallback } from "react";
import { NavigationMenuDemo } from "../_components/navbar";
import { useUser } from "@/app/context/UserContext";
import ProductCard, { Product } from "../_components/alertcard";


function Page() {
  const { Tracking_Frequency } = useUser();
  const [products, setProducts] = useState<Product[]>([]);
  
  const fetchData = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:3000/api/setups/fetchdata", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const result = await res.json();
      console.log("Fetched data:", result.data);
      if (res.ok) setProducts(result.data || []);
      else console.error("Fetch failed:", result.message);
    } catch (err) {
      console.log("Error found: ", err);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDeleted = useCallback(
    (asin: string, url: string) => {
      setProducts(prev =>
        prev.filter(p => !(p.asin === asin && p.url === url))
      );
    },
    []
  );

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-white dark:bg-black">
      {/* Centered navbar */}
      <div className="mt-6 flex justify-center w-full">
        <div className="w-fit">
          <NavigationMenuDemo />
        </div>
      </div>

      <h1 className="mt-10 text-2xl font-bold text-neutral-800 dark:text-neutral-200">
        Products You&apos;re Tracking
      </h1>

      {/* Render one card per product */}
      {products.map((product) => (
        <ProductCard
          key={product.asin}
          product={product}
          trackingFrequency={Tracking_Frequency}
          onDeleted={handleDeleted}
        />
      ))}

      {/* Optional empty‑state */}
      {products.length === 0 && (
        <p className="mt-12 text-neutral-600 dark:text-neutral-400">
          Nothing being tracked yet.
        </p>
      )}
    </div>
  );
}

export default Page;
