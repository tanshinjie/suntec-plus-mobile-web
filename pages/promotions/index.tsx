import { _promotions as fallback } from "@/data";
import {
  ArrowLeftIcon,
  CalendarIcon,
  MapPinIcon,
} from "@heroicons/react/16/solid";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";

interface PromotionCardProps {
  title: string;
  dateRange: string;
  location: string;
  imageUrl: string;
}

export const PromotionCard: React.FC<PromotionCardProps> = ({
  title,
  dateRange,
  location,
  imageUrl,
}) => {
  return (
    <div className="bg-cyan-500 rounded-lg shadow-md text-white min-h-60">
      <Image
        src={imageUrl}
        alt={title}
        className="w-full h-24 object-cover rounded-t-lg"
        width={160}
        height={160}
      />
      <div className="p-3 text-xs">
        <h3 className="text-sm font-semibold leading-5 mb-4 line-clamp-2">
          {title}
        </h3>
        <p className="space-x-1">
          <CalendarIcon className="size-4 inline" />
          <span>{dateRange}</span>
        </p>
        {location && (
          <p className="space-x-1">
            <MapPinIcon className="size-4 inline" />
            <span>{location}</span>
          </p>
        )}
      </div>
    </div>
  );
};

const PromotionList = ({ data }: { data: typeof fallback }) => {
  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {data.Result.map((promotion) => (
        <Link
          href={`/promotions/${promotion.HappeningID}`}
          key={promotion.HappeningID}
        >
          <PromotionCard
            title={promotion.Title}
            dateRange={`${dayjs(promotion.StartDate).format(
              "DD MMM YY",
            )} - ${dayjs(promotion.EndDate).format("DD MMM YY")}`}
            location={promotion.Location ?? ""}
            imageUrl={promotion.ImagePath}
          />
        </Link>
      ))}
    </div>
  );
};

const PromotionsPage: React.FC = () => {
  const router = useRouter();
  const [_promotions, setPromotions] = useState(fallback);

  useEffect(() => {
    fetch("/api/promotions")
      .then((res) => res.json())
      .then((data) => setPromotions(data));
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">
      <header className="fixed top-0 left-0 right-0 flex justify-around p-4 bg-white border-t max-w-96 m-auto">
        <button className="text-gray-600" onClick={() => router.back()}>
          <ArrowLeftIcon className="size-4" />
        </button>
        <h1 className="flex-grow text-center text-xl font-semibold">
          Promotions
        </h1>
      </header>
      <main className="pt-16">
        <div className="flex my-4 p-4">
          <button className="font-semibold rounded-full text-white bg-black w-full py-2">
            <span>On Going</span>
          </button>
          <button className="font-semibold rounded-full w-full py-2">
            <span>Upcoming</span>
          </button>
        </div>
        <PromotionList data={_promotions} />
      </main>
    </div>
  );
};

export default PromotionsPage;
