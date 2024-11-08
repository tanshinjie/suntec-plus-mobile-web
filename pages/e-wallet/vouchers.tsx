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

export default function Vouchers() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 flex justify-around p-4 bg-white border-t max-w-96 m-auto">
        <button className="text-gray-600" onClick={() => router.back()}>
          <ArrowLeftIcon className="size-4" />
        </button>
        <h1 className="flex-grow text-center text-xl font-semibold">
          e-Wallet
        </h1>
      </header>

      <main className="pt-16">
        {/* Navigation Tabs */}
        <div className="flex justify-around p-4 bg-gray-100">
          <Link href="/e-wallet/vouchers">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                <ReceiptPercentIcon className="size-6" />
              </div>
              <span className="mt-2 text-sm">e-Vouchers</span>
            </div>
          </Link>
          <Link href="/e-wallet/carpark">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12  bg-gray-200 rounded-lg flex items-center justify-center">
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

        <main className="p-6 space-y-4 text-center mt-40">
          <h2>You don&apos;t have any vouchers</h2>
          <button className="text-orange-500 font-semibold px-6 py-2 rounded-lg">
            Buy Vouchers
          </button>
        </main>
      </main>
    </div>
  );
}
