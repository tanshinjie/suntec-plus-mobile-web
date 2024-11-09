"use client";
import {
  BuildingStorefrontIcon,
  CameraIcon,
  ChevronDoubleRightIcon,
  HomeIcon,
  ShoppingBagIcon,
  TicketIcon,
  TruckIcon,
  WalletIcon,
} from "@heroicons/react/16/solid";
import { Link } from "next-view-transitions";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export function Footer() {
  const pathname = usePathname();
  return (
    <footer className="fixed bottom-0 left-0 right-0 flex justify-around p-4 bg-white border-t sm:w-screen m-auto">
      <Link href="/">
        <HomeIcon
          className={`w-6 h-6 text-gray-600 ${
            pathname === "/" ? "text-orange-400" : ""
          }`}
        />
      </Link>
      <Link href="/scan">
        <WalletIcon
          className={`w-6 h-6 text-gray-600 ${
            pathname === "/scan" ? "text-orange-400" : ""
          }`}
        />
      </Link>
      <div />
      <Link
        href="/receipts"
        className="absolute bg-white rounded-full p-4 -top-8 border-8"
      >
        <CameraIcon className="w-6 h-6 text-gray-600" />
      </Link>
      <Link href="/directories">
        <BuildingStorefrontIcon
          className={`w-6 h-6 text-gray-600 ${
            pathname === "/directories" ? "text-orange-400" : ""
          }`}
        />
      </Link>
      <Link href="/e-wallet/carpark">
        <TruckIcon
          className={`w-6 h-6 text-gray-600 ${
            pathname === "/e-wallet/carpark" ? "text-orange-400" : ""
          }`}
        />
      </Link>
    </footer>
  );
}

export function QuickLinks() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (pathname && pathname.includes("#more")) {
      alert("Not implemented");
      router.replace("/");
      return;
    }
  }, [router, pathname]);
  const tabs = [
    {
      icon: WalletIcon,
      label: "e-Wallet",
      link: "/e-wallet/vouchers",
    },
    {
      icon: ShoppingBagIcon,
      label: "Transactions",
      link: "/transactions",
    },
    {
      icon: TicketIcon,
      label: "Promo code",
      link: "/e-wallet/promo-code",
    },
    {
      icon: TicketIcon,
      label: "yuu Rewards",
      link: "/#more",
    },
    {
      icon: ChevronDoubleRightIcon,
      label: "More",
      link: "#more",
    },
  ];

  return (
    <div className="flex justify-between overflow-x-auto p-4 pb-8 no-scrollbar">
      {tabs.map((tab) => (
        <Link key={tab.label} href={tab.link}>
          <div className="flex flex-col items-center text-xs text-slate-600 w-24 space-y-2">
            <div className="size-14 shadow-md border-[1px] border-slate-100 shadow-orange-200 rounded-full mb-1 flex justify-center items-center">
              <tab.icon className="size-6 text-orange-400" />
            </div>
            <span>{tab.label}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
