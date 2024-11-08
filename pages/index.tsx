import { _events, _promotions, _rewards } from "@/data";
import {} from "@heroicons/react/16/solid";
import {
  TicketIcon,
  BellIcon,
  QrCodeIcon,
  ChevronDoubleRightIcon,
  ShoppingBagIcon,
  WalletIcon,
} from "@heroicons/react/24/outline";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

const placeholder = "https://sunteccity.com.sg/imgs/suntec-plus-image.jpeg";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // TODO: open menu
    console.log(router.asPath);
  }, [router.asPath]);

  return (
    <div className="min-h-screen pb-16">
      <Header />
      <Image
        src={placeholder}
        alt="Promotion Banner"
        className="w-full h-48 object-cover"
        width={800}
        height={200}
      />
      <NavTabs />
      <Rewards />
      <Promotions />
      <Events />
    </div>
  );
}

function Header() {
  return (
    <div className="flex items-center justify-between p-4 bg-white shadow-md">
      <div className="text-sm">
        <p className="font-bold">Hi, John Wick</p>
        <p>
          2,000 points <span className="text-gray-500">Silver</span>
        </p>
      </div>
      <div className="flex items-center space-x-4">
        <QrCodeIcon className="w-6 h-6 text-gray-600" />
        <BellIcon className="w-6 h-6 text-gray-600" />
      </div>
    </div>
  );
}

function Rewards() {
  return (
    <div className="p-4">
      <div className="flex justify-between">
        <h2 className="text-lg font-bold">Rewards</h2>
        <Link href="/rewards">View all</Link>
      </div>
      <div className="flex overflow-x-scroll space-x-4 overflow-y-hidden pb-8">
        {_rewards.Result.rewards.slice(0, 3).map((reward) => (
          <Link href={`/rewards/${reward.id}`} key={reward.id}>
            <div className="min-w-72 min-h-40 mt-2 w-full bg-white shadow-md relative">
              <Image
                src={reward.imageUrl}
                alt="Placeholder"
                className="w-full h-48 object-cover rounded-t-lg"
                width={160}
                height={160}
              />
              <p className="text-sm absolute top-8 right-0 rounded-l-md bg-gradient-to-t from-orange-400 to-orange-500 min-w-24 p-2 text-white font-bold">
                {reward.intouchPoints} Points
              </p>
              <div className="p-2 bg-gradient-to-t h-full from-orange-400 to-orange-500 text-white rounded-b-lg">
                <p className="line-clamp-2 text-xs font-semibold">
                  {reward.name}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function Promotions() {
  return (
    <div className="p-4">
      <div className="flex justify-between">
        <h2 className="text-lg font-bold">Promotions</h2>
        <Link href="/promotions">View all</Link>
      </div>
      <div className="flex overflow-x-scroll overflow-y-hidden space-x-4 pb-8">
        {_promotions.Result.slice(0, 3).map((promotion) => (
          <Link
            href={`/promotions/${promotion.HappeningID}`}
            key={promotion.HappeningID}
          >
            <div className="min-w-72 min-h-40 mt-2 w-full bg-white shadow-md relative">
              <Image
                src={promotion.ImagePath}
                alt="Placeholder"
                className="w-full h-48 object-cover rounded-t-lg"
                width={160}
                height={160}
              />
              <p className="text-xs p-2 absolute top-8 right-0 rounded-l-md bg-cyan-500 min-w-24 text-white font-bold">
                {`${dayjs(promotion.StartDate).format("DD MMM YY")} - ${dayjs(
                  promotion.EndDate
                ).format("DD MMM YY")}`}
              </p>
              <div className="p-2 bg-gradient-to-t h-full  bg-cyan-500 text-white rounded-b-lg">
                <p className="text-xs font-semibold line-clamp-2">
                  {promotion.Title}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function Events() {
  return (
    <div className="p-4">
      <div className="flex justify-between">
        <h2 className="text-lg font-bold">Events</h2>
        <Link href="/events">View all</Link>
      </div>
      <div className="flex overflow-x-scroll overflow-y-hidden space-x-4 pb-8">
        {_events.Result.slice(4).map((event) => (
          <Link href={`/events/${event.EventID}`} key={event.EventID}>
            <div className="min-w-72 min-h-40 mt-2 w-full bg-white shadow-md relative">
              <Image
                src={event.EventImage}
                alt="Placeholder"
                className="w-full h-48 object-cover rounded-t-lg"
                width={160}
                height={160}
              />
              <p className="text-xs p-2 absolute top-8 right-0 rounded-l-md bg-gradient-to-t from-orange-500 to-orange-700 min-w-24 text-white font-bold">
                {`${dayjs(event.StartDate).format("DD MMM YY")} - ${dayjs(
                  event.EndDate
                ).format("DD MMM YY")}`}
              </p>
              <div className="p-2 bg-gradient-to-t h-full from-orange-500 to-orange-700 text-white rounded-b-lg">
                <p className="text-xs font-semibold line-clamp-1">
                  {event.Title}
                </p>
                <p className="text-xs">{event.Location}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function NavTabs() {
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
      link: "/yuu",
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
          <div className="flex flex-col items-center text-xs text-gray-600 w-24 space-y-2">
            <div className="size-14 shadow-md border-[1px] border-slate-200 shadow-orange-200 rounded-full mb-1 flex justify-center items-center">
              <tab.icon className="size-6 text-orange-400" />
            </div>
            <span>{tab.label}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
