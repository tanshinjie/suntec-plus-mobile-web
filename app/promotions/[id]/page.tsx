import { _promotions, placeholderImage } from "@/data";
import Image from "next/image";
import {
  ArrowLeftIcon,
  BuildingStorefrontIcon,
  CalendarIcon,
  ChevronDownIcon,
  MapPinIcon,
} from "@heroicons/react/16/solid";
import dayjs from "dayjs";
import { Link } from "next-view-transitions";
import * as Accordion from "@radix-ui/react-accordion";
import { PromotionCard } from "../component";

export default function PromotionPage({
  params: { id },
}: {
  params: { id: string };
}) {
  let promotion;

  for (let i = 0; i < _promotions.Result.length; i++) {
    if (String(_promotions.Result[i].HappeningID) === id) {
      promotion = _promotions.Result[i];
      break;
    }
  }

  if (!promotion) {
    return <div>Promotion not found</div>;
  }

  return (
    <div>
      <header className="z-50 fixed top-0 left-0 right-0 flex justify-around p-4 bg-white border-t m-auto">
        <Link href="/promotions">
          <button className="text-gray-600">
            <ArrowLeftIcon className="size-4" />
          </button>
        </Link>
        <h1 className="flex-grow text-center text-xl font-semibold">
          {promotion.StoreName}
        </h1>
      </header>
      <main>
        <div className="p-4 space-y-4">
          <Image
            src={promotion.ImagePath || placeholderImage}
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
                  <div
                    className="p-4 bg-white"
                    dangerouslySetInnerHTML={{ __html: promotion.TOC }}
                  ></div>
                </Accordion.AccordionContent>
              </Accordion.Item>
            </Accordion.Root>
          </div>

          {promotion.morePromotions.length > 0 && (
            <>
              <h3 className="text-lg font-bold">More like this</h3>
              <div className="flex gap-4">
                {promotion.morePromotions.map((promotion) => (
                  <Link
                    href={`/promotion/${promotion.HappeningID}`}
                    key={promotion.HappeningID}
                  >
                    <PromotionCard
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
      </main>
    </div>
  );
}
