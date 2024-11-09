import { _promotions as fallback } from "@/data";
import { CalendarIcon, MapPinIcon } from "@heroicons/react/16/solid";
import React from "react";
import dayjs from "dayjs";
import Image from "next/image";
import { Link } from "next-view-transitions";

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

export const PromotionList = ({ data }: { data: typeof fallback }) => {
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
              "DD MMM YY"
            )} - ${dayjs(promotion.EndDate).format("DD MMM YY")}`}
            location={promotion.Location ?? ""}
            imageUrl={promotion.ImagePath}
          />
        </Link>
      ))}
    </div>
  );
};
