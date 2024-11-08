// pages/carpark-dollars.tsx
import {
  ArrowLeftIcon,
  ReceiptPercentIcon,
  TicketIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import { useRouter } from "next/router"; // Usage: Page router
import Link from "next/link";
import { QrCodeIcon } from "@heroicons/react/16/solid";

export default function PromoCode() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">
      {/* Header */}
      <header className="flex items-center p-4 border-b shadow-sm">
        <button className="text-gray-600" onClick={() => router.back()}>
          <ArrowLeftIcon className="size-4" />
        </button>
        <h1 className="flex-grow text-center text-xl font-semibold">
          e-Wallet
        </h1>
      </header>

      {/* Navigation Tabs */}
      <div className="flex justify-around p-4 bg-gray-100">
        <Link href="/e-wallet/vouchers">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
              <ReceiptPercentIcon className="size-6" />
            </div>
            <span className="mt-2 text-sm">e-Vouchers</span>
          </div>
        </Link>
        <Link href="/e-wallet/carpark">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
              <TruckIcon className="size-6" />
            </div>
            <span className="mt-2 text-sm">Carpark Dollars</span>
          </div>
        </Link>
        <Link href="/e-wallet/promo-code">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center">
              <TicketIcon className="size-6" />
            </div>
            <span className="mt-2 text-sm">Promo Code</span>
          </div>
        </Link>
      </div>

      <main className="p-3 space-y-4">
        <h2 className="text-lg font-semibold">Enter promo code</h2>
        <div className="bg-white mt-4 flex gap-2 items-center py-4 rounded-lg">
          <input
            className="px-6 py-2 w-2/3  rounded-md border-[1px] border-slate-500"
            placeholder="Enter promo code"
          />
          <button className="bg-yellow-500 text-white font-semibold px-6 py-2 rounded-lg">
            Go
          </button>
          <button className="text-black font-semibold py-2 rounded-lg">
            <QrCodeIcon className="size-6" />
          </button>
        </div>

        <h2 className="text-lg font-semibold">Enter yuu promo code</h2>
        <div className="bg-white mt-4 flex gap-2 items-center py-4 rounded-lg">
          <input
            className="px-6 py-2 w-2/3 rounded-md border-[1px] border-slate-500"
            placeholder="Enter yuu promo code"
          />
          <button className="bg-yellow-500 text-white font-semibold px-6 py-2 rounded-lg">
            Go
          </button>
        </div>
      </main>
    </div>
  );
}
