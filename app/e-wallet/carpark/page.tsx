// pages/carpark-dollars.tsx
import {
  ArrowLeftIcon,
  ReceiptPercentIcon,
  TicketIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import { Link } from "next-view-transitions";

export default function CarPark() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 flex justify-around p-4 bg-white border-t m-auto">
        <Link href="/">
          <button className="text-gray-600">
            <ArrowLeftIcon className="size-4" />
          </button>
        </Link>
        <h1 className="flex-grow text-center text-xl font-semibold">
          e-Wallet
        </h1>
      </header>

      {/* Navigation Tabs */}
      <main>
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
              <div className="w-12 h-12 bg-orange-500 text-white rounded-lg flex items-center justify-center">
                <TruckIcon className="size-6" />
              </div>
              <span className="mt-2 text-sm">Carpark Dollars</span>
            </div>
          </Link>
          <Link href="/e-wallet/promo-code">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                <TicketIcon className="size-6" />
              </div>
              <span className="mt-2 text-sm">Promo Code</span>
            </div>
          </Link>
        </div>

        {/* Carpark Dollars Card */}
        <main className="p-6 space-y-4">
          <h2 className="text-lg font-semibold">Carpark Dollars</h2>
          <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg p-6 text-white shadow-md">
            <p className="mt-1 text-sm">Your Carpark Dollars</p>
            <p className="mt-2 text-2xl font-bold">S$0</p>
            <div className="bg-white mt-4 flex justify-between items-center p-4 rounded-lg">
              <span className="text-sm text-black">
                Redeem more Carpark Dollars
              </span>
              <button className="text-orange-500 font-semibold px-4 py-2 rounded-lg border-[1px] border-orange-500">
                Redeem
              </button>
            </div>
          </div>

          {/* No Vehicle Section */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">You currently have no IU number</p>
            <button className="mt-4 bg-orange-500 text-white font-semibold px-6 py-2 rounded-lg">
              Add vehicle details
            </button>
          </div>
        </main>
      </main>
    </div>
  );
}
