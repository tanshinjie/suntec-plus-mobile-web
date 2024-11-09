import { placeholderImage } from "@/data";
import {
  ArrowLeftIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  MapPinIcon,
} from "@heroicons/react/16/solid";
import * as Accordion from "@radix-ui/react-accordion";
import dayjs from "dayjs";
import Image from "next/image";
import { Link } from "next-view-transitions";

async function fetchData(id: string) {
  const res = await fetch("https://sunteccity.com.sg/Prod/v1/events", {
    headers: {
      "implementation-id": "sg-suntec-city",
    },
    method: "POST",
  });
  const data = await res.json();

  let event;
  for (let i = 0; i < data.Result.length; i++) {
    if (String(data.Result[i].EventID) === id) {
      event = data.Result[i];
      break;
    }
  }

  return event;
}

export default async function EventDetailPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const event = await fetchData(id);

  if (!event) {
    return <div>Reward not found</div>;
  }

  return (
    <div>
      <header className="fixed top-0 left-0 right-0 flex justify-around p-4 bg-white border-t m-auto">
        <Link href="/events">
          <button className="text-gray-600">
            <ArrowLeftIcon className="size-4" />
          </button>
        </Link>
        <h1 className="flex-grow text-center text-xl font-semibold">
          {event.Title}
        </h1>
      </header>
      <main>
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
            <p>{`${dayjs(event.StartDate).format(
              "DD MMM YY, hh:MM A"
            )} - ${dayjs(event.EndDate).format("DD MMM YY, hh:MM A")}`}</p>
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
