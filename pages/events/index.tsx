import { _events as fallback, placeholderImage } from "@/data";
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
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";

interface EventCardProps {
  title: string;
  dateRange: string;
  location: string;
  imageUrl: string;
}

const EventCard: React.FC<EventCardProps> = ({
  title,
  dateRange,
  location,
  imageUrl,
}) => {
  return (
    <div className="bg-gradient-to-t from-orange-400 to-orange-500 rounded-lg shadow-md text-white h-52">
      <Image
        src={imageUrl}
        alt={title}
        className="w-full h-24 object-cover rounded-t-lg"
        width={160}
        height={160}
      />
      <div className="p-2 text-xs">
        <h3 className="text-md font-semibold leading-4 mb-4">{title}</h3>
        <p className="space-x-1">
          <CalendarIcon className="size-4 inline" />
          <span className="text-[11px]">{dateRange}</span>
        </p>
        {location && (
          <p className="space-x-1 line-clamp-1">
            <MapPinIcon className="size-4 inline" />
            <span>{location}</span>
          </p>
        )}
      </div>
    </div>
  );
};

const EventList = ({ data }: { data: typeof fallback }) => {
  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {data.Result.map((event) => {
        return (
          <Link href={`/events/${event.EventID}`} key={event.EventID}>
            <EventCard
              title={event.Title}
              dateRange={`${dayjs(event.StartDate).format(
                "DD MMM YY",
              )} - ${dayjs(event.EndDate).format("DD MMM YY")}`}
              location={event.Location}
              imageUrl={event.EventImage ?? placeholderImage}
            />
          </Link>
        );
      })}
    </div>
  );
};

const EventsPage: React.FC = () => {
  const router = useRouter();
  const [_events, setEvents] = useState(fallback);
  const [priceFilter, setPriceFilter] = useState<number[]>([]);
  const [typeFilter, setTypeFilter] = useState<number[]>([]);
  const [open, setOpen] = useState<boolean>();

  useEffect(() => {
    fetch("/api/events")
      .then((res) => res.json())
      .then((data) => setEvents(data));
  }, []);

  const events = { ..._events };
  if (priceFilter.length) {
    const pFilter = priceFilter.toSorted();
    if ((pFilter.includes(1) && pFilter.includes(2)) || pFilter.includes(0)) {
      events.Result = _events.Result;
    } else {
      const isFree = pFilter.includes(1);
      if (isFree) {
        // Show free events
        events.Result = [...events.Result].filter(
          (event) => event.Cost === null,
        );
      }
      const isPaid = pFilter.includes(2);
      if (isPaid) {
        // Show paid events
        events.Result = [...events.Result].filter(
          (event) => event.Cost !== null,
        );
      }
    }
  }

  if (typeFilter.length) {
    const tFilter = typeFilter.toSorted();
    if ((tFilter.includes(1) && tFilter.includes(2)) || tFilter.includes(0)) {
      events.Result = _events.Result;
    } else {
      const isGeneral = tFilter.includes(1);
      if (isGeneral) {
        // Show general events
        events.Result = [...events.Result].filter(
          (event) => event.EventCategory === "General",
        );
      }
      const isWorkshop = tFilter.includes(2);
      if (isWorkshop) {
        // Show workshop events
        events.Result = [...events.Result].filter(
          (event) => event.EventCategory === "Workshop",
        );
      }
    }
  }

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">
      <header className="fixed top-0 left-0 right-0 flex justify-around p-4 bg-white border-t max-w-96 m-auto">
        <button className="text-gray-600" onClick={() => router.back()}>
          <ArrowLeftIcon className="size-4" />
        </button>
        <h1 className="flex-grow text-center text-xl font-semibold">Events</h1>
      </header>
      <main className="pt-16">
        <div className="flex items-center justify-between my-4 p-4">
          <h2 className="text-xl font-bold">All Categories</h2>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button className="flex items-center space-x-1 text-gray-600">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M3 5h14v2H3V5zm2 5h10v2H5v-2zm3 5h4v2H8v-2z" />
                </svg>
                <span>Filter</span>
              </button>
            </SheetTrigger>
            <SheetContent side="bottom" className="bg-white space-y-4">
              <div className="space-y-2">
                <h3>Filter By</h3>
                <hr />
                {[
                  {
                    value: 0,
                    label: "All",
                  },
                  {
                    value: 1,
                    label: "Free",
                  },
                  {
                    value: 2,
                    label: "Paid",
                  },
                ].map((item) => (
                  <div key={item.value} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={item.label}
                      checked={priceFilter.includes(item.value)}
                      onChange={() => {
                        if (priceFilter.includes(item.value)) {
                          setPriceFilter([
                            ...priceFilter.filter(
                              (value) => value !== item.value,
                            ),
                          ]);
                        } else {
                          setPriceFilter([...priceFilter, item.value]);
                        }
                      }}
                    />
                    <label htmlFor={item.label}>{item.label}</label>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <h3>Categories</h3>
                <hr />
                {[
                  {
                    value: 0,
                    label: "All",
                  },
                  {
                    value: 1,
                    label: "General",
                  },
                  {
                    value: 2,
                    label: "Workshop",
                  },
                ].map((item) => (
                  <div key={item.value} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={item.label}
                      checked={typeFilter.includes(item.value)}
                      onChange={() => {
                        if (typeFilter.includes(item.value)) {
                          setTypeFilter([
                            ...typeFilter.filter(
                              (value) => value !== item.value,
                            ),
                          ]);
                        } else {
                          setTypeFilter([...typeFilter, item.value]);
                        }
                      }}
                    />
                    <label htmlFor={item.label}>{item.label}</label>
                  </div>
                ))}
              </div>
              <SheetFooter className="grid grid-cols-2 gap-2">
                <button
                  className="rounded-lg text-bold py-2 text-orange-500 border border-orange-500"
                  onClick={() => {
                    setPriceFilter([]);
                    setTypeFilter([]);
                  }}
                >
                  Reset
                </button>
                <button
                  className="rounded-lg py-2 text-bold text-white bg-orange-500"
                  onClick={() => setOpen(false)}
                >
                  Apply
                </button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </main>
      <EventList data={events} />
    </div>
  );
};

export default EventsPage;
