"use client"

import React from 'react';
import Image from 'next/image';

interface PrizeScreenProps {
  onExit: () => void;
}

export default function PrizeScreen({ onExit }: PrizeScreenProps) {
  // Generar un código único (en producción, esto podría venir del backend)
  const discountCode = `EVRLST-${Math.floor(Math.random() * 90000) + 10000}`;
  // Generar fecha de expiración (30 días a partir de hoy)
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + 30);
  const formattedDate = `${expiryDate.getDate().toString().padStart(2, '0')}/${(expiryDate.getMonth() + 1).toString().padStart(2, '0')}/${expiryDate.getFullYear()}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
      <div className="relative w-full max-w-md rounded-xl bg-black p-8 text-white">
        {/* Background Image */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="/media/boxing-background.jpg"
            alt="Boxing background"
            fill
            className="rounded-xl object-cover object-center brightness-[0.15] blur-[1px]"
          />
        </div>

        {/* Title */}
        <h2 className="mb-2 text-center text-3xl font-bold text-white">
          YOUR KNOCKOUT
        </h2>
        <h3 className="mb-6 text-center text-4xl font-bold italic text-white">
          DISCOUNT! <span className="ml-2 inline-block">🥊</span>
        </h3>

        {/* Prize Card */}
        <div className="mb-6 rounded-xl bg-black/80 p-6 text-center shadow-xl">
          <h3 className="mb-1 text-2xl font-bold text-white">
            YOU&apos;RE A
          </h3>
          <h4 className="mb-6 text-3xl font-bold italic text-white">
            A CHAMPION!
          </h4>

          <p className="mb-4 text-lg">Prize: 20% OFF Everlast Gear</p>

          {/* Discount Code */}
          <div className="mb-6 rounded-md bg-yellow-400 py-3 px-4 text-center text-xl font-bold text-black">
            Code: {discountCode}
          </div>

          <p className="mb-6 text-sm text-gray-300">
            &ldquo;Your punch crushed the competition! Redeem at everlast.com with your code.&rdquo;
          </p>

          <div className="border-t border-yellow-500/30 pt-4 text-center">
            <p className="text-sm">Valid until: [{formattedDate}]</p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-gray-400">
          <p>
            ✓ Discount details will be sent to your email within 24 hours. Check your inbox!
          </p>
        </div>

        {/* Exit Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={onExit}
            className="rounded-full border-2 border-yellow-500 bg-transparent px-10 py-2 font-bold text-white transition-colors hover:bg-yellow-500 hover:text-black"
          >
            Exit
          </button>
        </div>
      </div>
    </div>
  );
} 