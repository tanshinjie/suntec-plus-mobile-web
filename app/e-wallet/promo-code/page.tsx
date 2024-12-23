// pages/carpark-dollars.tsx
import {
  ArrowLeftIcon,
  ReceiptPercentIcon,
  TicketIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";
import { Link } from "next-view-transitions";
import { QrCodeIcon } from "@heroicons/react/16/solid";

export default function PromoCode() {
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

      <main>
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
              <div className="w-12 h-12 bg-orange-500 text-white rounded-lg flex items-center justify-center">
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
            <button className="bg-orange-500 text-white font-semibold px-6 py-2 rounded-lg">
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
            <button className="bg-orange-500 text-white font-semibold px-6 py-2 rounded-lg">
              Go
            </button>
          </div>
        </main>
      </main>
    </div>
  );
}
