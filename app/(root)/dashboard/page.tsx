"use client";
import { useState } from 'react';
import { NavigationMenuDemo } from './_components/navbar';
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import React from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { MultiStepLoader as Loader } from "@/components/ui/multi-step-loader";
import { IconSquareRoundedX } from "@tabler/icons-react";
import { useUser } from "@/app/context/UserContext"; // ✅ correct


// type Product = {
//   name: string;
//   image: string;
//   stars: number;
//   total_reviews: number;
//   price_string: string;
//   price: number;
//   original_price?: {
//     price_string: string;
//   } | null; // Make sure this can be null
//   asin: string;
//   url: string;
//   has_prime?: boolean;
//   is_best_seller?: boolean;
//   is_amazon_choice?: boolean;
// };

type Product = {
  name: string;
  url: string;
  image?: string;
  asin: string;
  price: number | string;
  original_price?: number | string;
  price_string?: string;
  stars?: number | string;
  total_reviews?: number;
  has_prime?: boolean;
  is_best_seller?: boolean;
  is_amazon_choice?: boolean;
};

const loadingStates = [
  { text: "Buying a condo" },
  { text: "Travelling in a flight" },
  { text: "Meeting Tyler Durden" },
  { text: "He makes soap" },
  { text: "We go to a bar" },
  { text: "Start a fight" },
  { text: "We like it" },
  { text: "Welcome to F**** C***" },
];

export default function Page() {
  const [item, setItem] = useState('');
  const [products, setProduct] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const { userId , userEmail } = useUser();
  
  const placeholders = [
    "What's the first rule of Fight Club?",
    "Alert will be sent on respective email registered?",
    "Where is Andrew Laeddis hiding?",
    "Write a JavaScript method to reverse a string",
    "How to assemble your own PC?",
  ];
 
  // Updated handleclick function
  const handleclick = async (product: Product) => {
    if (!userId || !userEmail) {
      alert("⚠️ User not found. Please log in.");
      return;
    }

    // Debug: Log the raw product details
    console.log("Product received:", product);
    console.log("Original price:", product.original_price);
    console.log("Price string:", product.price_string);

    // Prepare the payload with fallbacks
    const payload = {
      userId: userId,
      email: userEmail,
      name: product.name,
      url: product.url,
      image: product.image ?? "",
      asin: product.asin,
      platform: "amazon",
      platformProductId: product.asin,
      currentPrice: product.price ?? 0,
      originalPrice: product.original_price ?? null,
      priceString: product.price_string ?? null,
      stars: product.stars ?? null,
      totalReviews: product.total_reviews ?? null,
      hasPrime: product.has_prime ?? false,
      isBestSeller: product.is_best_seller ?? false,
      isAmazonChoice: product.is_amazon_choice ?? false,
      isFkAssured: false,
    };

    // Debug: Show final payload
    console.log("Final payload being sent to /api/product:", payload);

    try {
      const response = await fetch("/api/product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("❌ Failed to add product:", data.message);
        alert(`❌ Error: ${data.message}`);
        return;
      }

      if (data.message.includes("already in your tracking list")) {
        alert("📝 This product is already in your tracking list!");
      } else {
        alert("🔔 Product added to your tracking list successfully!");
      }

    } catch (error) {
      console.error("🔥 Unexpected error:", error);
      alert("⚠️ Something went wrong. Please try again.");
    }
  };



  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true); // Show loader
    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ item }),
      });
      const data = await response.json();
      if (response.ok) {
        setProduct(data.products);
        console.log("Product API response:", data.products);
      } else {
        console.error("API Error:", data.message);
      }
    } catch (error) {
      console.error("Error during fetch:", error);
    } finally {
      setTimeout(() => setLoading(false), 2000); // Wait for loader duration to end
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-white dark:bg-black relative">
      {/* Loader */}
      {loading && (
        <>
          <Loader loadingStates={loadingStates} loading={loading} duration={2000} />
          <button
            className="fixed top-4 right-4 text-black dark:text-white z-[120]"
            onClick={() => setLoading(false)}
          >
            <IconSquareRoundedX className="h-10 w-10" />
          </button>
        </>
      )}

      {/* Navigation */}
      <div className="w-full flex justify-evenly items-center">
        <NavigationMenuDemo />
      </div>

      {/* Search Section */}
      <div className="w-full flex flex-col items-center px-4 mt-10">
        <h2 className="mb-10 text-xl text-center sm:text-5xl dark:text-white text-black">
          Search Your Product Here
        </h2>
        <PlaceholdersAndVanishInput
          placeholders={placeholders}
          onChange={(e) => setItem(e.target.value)}
          onSubmit={onSubmit}
        />
      </div>

      {/* Product Results */}
      {products.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 w-full px-4 pb-10">
          {products.map((product, index) => (
            <CardContainer key={index} className="inter-var">
              <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full h-auto rounded-xl p-6 border">
                <CardItem
                  translateZ="50"
                  className="text-lg font-semibold text-neutral-600 dark:text-white h-14 overflow-hidden text-ellipsis line-clamp-2"
                >
                  {product.name}
                </CardItem>
                <CardItem
                  as="p"
                  translateZ="60"
                  className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                >
                  ⭐ {product.stars} ({product.total_reviews} reviews)
                </CardItem>
                <CardItem translateZ="100" className="w-full mt-4">
                  <img
                    src={product.image}
                    height="1000"
                    width="1000"
                    className="h-60 w-full object-contain rounded-xl group-hover/card:shadow-xl"
                    alt={product.name}
                  />
                </CardItem>
                <div className="flex items-center mt-6 justify-between">
                  {/* Left side: Price and View link */}
                  <div className="flex flex-col">
                    <CardItem
                      translateZ={20}
                      as="div"
                      className="px-4 py-2 ml-5 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold mb-1"
                    >
                      {product.price_string}
                    </CardItem>
                    <CardItem
                      translateZ={20}
                      as="a"
                      href={product.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white underline"
                    >
                      View on Amazon →
                    </CardItem>
                  </div>

                  {/* Notification bell button */}
                  <CardItem
                    as="button"
                    onClick={() => handleclick(product)}
                    className="p-2 text-gray-700 hover:text-blue-500 transition-colors duration-300"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-bell-ring-icon lucide-bell-ring"
                    >
                      <path d="M10.268 21a2 2 0 0 0 3.464 0" />
                      <path d="M22 8c0-2.3-.8-4.3-2-6" />
                      <path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" />
                      <path d="M4 2C2.8 3.7 2 5.7 2 8" />
                    </svg>
                  </CardItem>
                </div>
              </CardBody>
            </CardContainer>
          ))}
        </div>
      )}
    </div>
  );
}
