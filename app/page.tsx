"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { _events, _promotions, _rewards } from "@/data";
import { BellIcon, QrCodeIcon } from "@heroicons/react/24/outline";
import dayjs from "dayjs";
import Image from "next/image";
import { Link } from "next-view-transitions";
import Autoplay from "embla-carousel-autoplay";
import { QuickLinks } from "./component";

export default function Home() {
  return (
    <div className="min-h-screen pb-16">
      <Header />
      <div className="pt-4 relative">
        <Carousel
          plugins={[
            Autoplay({
              delay: 2000,
            }),
          ]}
        >
          <CarouselContent>
            <CarouselItem>
              <Image
                src={
                  "https://d2mp9k8h4rf7ge.cloudfront.net/uploads/medium_1500_X790_1_b9d37c078c_420060e9e8.jpg"
                }
                alt="Promotion Banner"
                className="w-full h-60 object-cover"
                width={800}
                height={400}
              />
            </CarouselItem>
            <CarouselItem>
              <Image
                src={
                  "https://d2mp9k8h4rf7ge.cloudfront.net/uploads/medium_Suntec_Website_Opening_Promo_1500_x_790_px_1_1ee21daf06.jpg"
                }
                alt="Promotion Banner"
                className="w-full h-60 object-cover"
                width={800}
                height={400}
              />
            </CarouselItem>
            <CarouselItem>
              <Image
                src={
                  "https://d2mp9k8h4rf7ge.cloudfront.net/uploads/medium_24_FW_STC_In_Mall_Artwork_Website_1500x790_3e8f97856c.jpg"
                }
                alt="Promotion Banner"
                className="w-full h-60 object-cover"
                width={800}
                height={400}
              />
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </div>
      <QuickLinks />
      <Rewards />
      <Promotions />
      <Events />
    </div>
  );
}

function Header() {
  return (
    <div className="z-10 fixed top-0 left-0 right-0 flex justify-between p-4 bg-white border-t m-auto">
      <div className="text-sm">
        <p className="font-bold text-xl">Hi, John Wick</p>
        <p>
          2,000 points{" "}
          <span className="text-white rounded-full bg-gradient-to-t from-slate-500 to-slate-400 px-2 py-1">
            Silver
          </span>
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
      <div className="flex overflow-x-scroll no-scrollbar space-x-4 overflow-y-hidden pb-8">
        {_rewards.Result.rewards.slice(0, 3).map((reward) => (
          <Link href={`/rewards/${reward.id}`} key={reward.id}>
            <div className="min-w-72 min-h-64 rounded-lg mt-2 w-full bg-gradient-to-t from-orange-400 to-orange-500 shadow-md relative">
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
              <div className="p-2 text-white rounded-b-lg">
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
      <div className="flex overflow-x-scroll no-scrollbar overflow-y-hidden space-x-4 pb-8">
        {_promotions.Result.slice(0, 3).map((promotion) => (
          <Link
            href={`/promotions/${promotion.HappeningID}`}
            key={promotion.HappeningID}
          >
            <div className="min-w-72 min-h-64 rounded-lg bg-cyan-500 mt-2 w-full shadow-md relative">
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
              <div className="p-2 text-white rounded-b-lg">
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
      <div className="flex overflow-x-scroll no-scrollbar overflow-y-hidden space-x-4 pb-8">
        {_events.Result.slice(4).map((event) => (
          <Link href={`/events/${event.EventID}`} key={event.EventID}>
            <div className="min-w-72 min-h-64 mt-2 w-full rounded-lg shadow-md relative bg-gradient-to-t from-orange-500 to-orange-700">
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
              <div className="p-2 text-white rounded-b-lg">
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
