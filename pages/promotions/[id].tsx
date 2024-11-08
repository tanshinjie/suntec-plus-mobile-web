import { _directories, _promotions } from "@/data";
import Image from "next/image";
import { placeholder } from "../directory";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import {
  ArrowLeftIcon,
  BuildingStorefrontIcon,
  CalendarIcon,
  ChevronDownIcon,
  MapPinIcon,
} from "@heroicons/react/16/solid";
import dayjs from "dayjs";
import { PromotionCard } from ".";
import Link from "next/link";
import * as Accordion from "@radix-ui/react-accordion";
import { useRef, useState } from "react";

export default function PromotionPage() {
  const params = useParams();
  const router = useRouter();
  const ref = useRef();

  let promotion;

  for (let i = 0; i < _promotions.Result.length; i++) {
    if (String(_promotions.Result[i].HappeningID) === params.id) {
      promotion = _promotions.Result[i];
      break;
    }
  }

  if (!promotion) {
    return <div>Promotion not found</div>;
  }

  return (
    <div>
      <header className="flex items-center p-4 border-b shadow-sm">
        <button
          className="text-gray-600"
          onClick={() => {
            router.back();
          }}
        >
          <ArrowLeftIcon className="size-4" />
        </button>
        <h1 className="flex-grow text-center text-xl font-semibold">
          {promotion.StoreName}
        </h1>
      </header>
      <div className="p-4 space-y-4">
        <Image
          src={promotion.ImagePath || placeholder}
          alt="Placeholder"
          className="w-full h-72 object-contain rounded-md"
          width={160}
          height={160}
        />
        <div className="border-[1px] border-slate-300 rounded-md p-4 space-y-4">
          <h5 className="font-bold text-2xl">{promotion.Title}</h5>
          <div className="p-4 border-[1px] rounded-md border-slate-300">
            <p className="space-x-2">
              <BuildingStorefrontIcon className="size-4 inline" />
              <span>{promotion.StoreName}</span>
            </p>
            <p className="space-x-2">
              <CalendarIcon className="size-4 inline" />
              <span>{`${dayjs(promotion.StartDate).format(
                "DD MMM YY"
              )} - ${dayjs(promotion.EndDate).format("DD MMM YY")}`}</span>
            </p>
            <p className="space-x-2">
              <MapPinIcon className="size-4 inline" />
              <span>{promotion.Location}</span>
            </p>
          </div>
          <div dangerouslySetInnerHTML={{ __html: promotion.Content }}></div>
        </div>
        <div>
          <Accordion.Root type="single" collapsible>
            <Accordion.Item value="toc">
              <Accordion.AccordionTrigger className="flex w-full justify-between items-center">
                <span className="text-lg font-bold">Terms & Conditions</span>
                <ChevronDownIcon className="size-6" />
              </Accordion.AccordionTrigger>
              <Accordion.AccordionContent>
                <div className="p-4 bg-white" dangerouslySetInnerHTML={{ __html: promotion.TOC }}></div>
              </Accordion.AccordionContent>
            </Accordion.Item>
          </Accordion.Root>
        </div>

        {promotion.morePromotions.length > 0 && (
          <>
            <h3 className="text-lg font-bold">More like this</h3>
            <div className="flex gap-4">
              {promotion.morePromotions.map((promotion) => (
                <Link href={`/promotion/${promotion.HappeningID}`}>
                  <PromotionCard
                    key={promotion.HappeningID}
                    title={promotion.Title}
                    dateRange={`${dayjs(promotion.StartDate).format(
                      "DD MMM YY"
                    )} - ${dayjs(promotion.EndDate).format("DD MMM YY")}`}
                    location={"Location unavailable"}
                    imageUrl={promotion.ImagePath}
                  />
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
