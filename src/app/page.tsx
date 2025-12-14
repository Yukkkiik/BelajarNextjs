"use client";
import {useQuery} from '@tanstack/react-query';
import Image from 'next/image';
import { useEffect,useState } from 'react';
import {Loading} from '@/app/components/loading';

interface product  {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image : string;
}

export default function Home() {
  const [showToast,setShowToast] =  useState(false);
  const {data, isLoading, isError,isSuccess} = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await fetch("https://fakestoreapi.com/products",{
        cache: 'no-store',
      })
      return res.json();
    },
    enabled: true
  });

  useEffect(()=>{
    if(isSuccess) {
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }
  },[isSuccess]); 

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50"> 
    {showToast && (
      <div className="fixed top-5 right-5 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-slide-in">
        Products loaded successfully!
      </div>
    )}
     {isLoading ? (
      <Loading message="Fetching Products..." />
     ):(
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-white">
        {isError ? (
          <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
          <p className="text-red-600 font-semibold text-lg">Error loading products</p>
        </div>
        ): (
                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">
            Our Products
          </h1>
          <p className="text-gray-600 text-lg">Discover amazing products at great prices</p>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data?.map((product: product) => (
            <div 
              key={product.id} 
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-indigo-200 hover:-translate-y-2"
            >
              {/* Image Container */}
              <div className="relative bg-gray-50 p-6 h-64 flex items-center justify-center overflow-hidden">
                <Image 
                  src={product.image} 
                  alt={product.title}
                  width={200}
                  height={200}
                  className="object-contain h-full w-full group-hover:scale-110 transition-transform duration-300"
                />
                {/* Category Badge */}
                <div className="absolute top-4 right-4 bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                  {product.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                  {product.title}
                </h2>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {product.description}
                </p>
                
                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Price</p>
                    <p className="text-2xl font-bold text-indigo-600">
                      ${product.price}
                    </p>
                  </div>
                  <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300">
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
        )}
      </div>
     )}
    </div>
  );
}