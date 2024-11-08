import "@/styles/globals.css";
import {
  HomeIcon,
  BuildingStorefrontIcon,
  WalletIcon,
  TruckIcon,
  CameraIcon,
} from "@heroicons/react/16/solid";
import type { AppProps } from "next/app";
import Link from "next/link";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className="max-w-96 m-auto min-h-screen pb-20 bg-white">
      <Component {...pageProps} />
      <Footer />
    </main>
  );
}

function Footer() {
  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-around p-4 bg-white border-t max-w-96 m-auto">
      <Link href="/">
        <HomeIcon className="w-6 h-6 text-gray-600" />
      </Link>
      <Link href="/scan">
        <WalletIcon className="w-6 h-6 text-gray-600" />
      </Link>
      <div />
      <Link
        href="/receipts"
        className="absolute bg-white rounded-full p-4 -top-8 border-8"
      >
        <CameraIcon className="w-6 h-6 text-gray-600" />
      </Link>
      <Link href="/directory">
        <BuildingStorefrontIcon className="w-6 h-6 text-gray-600" />
      </Link>
      <Link href="/e-wallet/carpark">
        <TruckIcon className="w-6 h-6 text-gray-600" />
      </Link>
    </div>
  );
}
