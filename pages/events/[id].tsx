import { _events, placeholderImage } from "@/data";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  ArrowLeftIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@heroicons/react/16/solid";
import { MapPinIcon } from "@heroicons/react/24/outline";
import dayjs from "dayjs";
import * as Accordion from "@radix-ui/react-accordion";
import Link from "next/link";

export default function EventPage() {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  let event;

  for (let i = 0; i < _events.Result.length; i++) {
    if (String(_events.Result[i].EventID) === router.query.id) {
      event = _events.Result[i];
      break;
    }
  }

  if (!event) {
    return <div>event not found</div>;
  }

  return (
    <div>
      <header className="fixed top-0 left-0 right-0 flex justify-around p-4 bg-white border-t max-w-96 m-auto">
        <button
          className="text-gray-600"
          onClick={() => {
            router.back();
          }}
        >
          <ArrowLeftIcon className="size-4" />
        </button>
        <h1 className="flex-grow text-center text-xl font-semibold">
          {event.Title}
        </h1>
      </header>
      <main className="pt-16">
        <div className="p-4 space-y-4">
          <Image
            src={event.Images[0] || placeholderImage}
            alt="Placeholder"
            className="w-full h-72 object-contain rounded-md"
            width={800}
            height={400}
          />
          <div className="border-[1px] border-slate-300 rounded-md p-4 space-y-4">
            <h5 className="font-bold text-2xl">{event.Title}</h5>
            <Link
              href="#"
              className="text-blue-600 space-x-2 flex items-center"
            >
              <MapPinIcon className="size-6 inline" />
              <span>{event.Location}</span>
              <ChevronRightIcon className="size-4" />
            </Link>
            <p>{`${dayjs(event.StartDate).format("DD MMM YY, hh:MM A")} - ${dayjs(
              event.EndDate,
            ).format("DD MMM YY, hh:MM A")}`}</p>
            <div
              className="p-4"
              dangerouslySetInnerHTML={{ __html: event.DetailView }}
            ></div>
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
                    dangerouslySetInnerHTML={{ __html: event.TOC }}
                  ></div>
                </Accordion.AccordionContent>
              </Accordion.Item>
            </Accordion.Root>
          </div>
        </div>
      </main>
    </div>
  );
}
