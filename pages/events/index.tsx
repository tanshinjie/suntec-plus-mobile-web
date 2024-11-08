import { _events } from "@/data";
import {
  ArrowLeftIcon,
  CalendarIcon,
  MapPinIcon,
} from "@heroicons/react/16/solid";
import { useRouter } from "next/router";
import React from "react";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";

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
    <div className="bg-gradient-to-t from-orange-400 to-orange-500 rounded-lg shadow-md text-white min-h-80">
      <Image
        src={imageUrl}
        alt={title}
        className="w-full h-40 object-cover rounded-t-lg"
        width={160}
        height={160}
      />
      <div className="p-4">
        <h3 className="text-md font-semibold leading-5 mb-4">{title}</h3>
        <p className="text-sm space-x-2">
          <CalendarIcon className="size-4 inline" />
          <span>{dateRange}</span>
        </p>
        <p className="text-sm space-x-2 line-clamp-1">
          <MapPinIcon className="size-4 inline" />
          <span>{location}</span>
        </p>
      </div>
    </div>
  );
};

const CategoryFilter: React.FC = () => {
  return (
    <div className="flex items-center justify-between my-4 p-4">
      <h2 className="text-xl font-bold">All Categories</h2>
      <button className="flex items-center space-x-1 text-gray-600">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M3 5h14v2H3V5zm2 5h10v2H5v-2zm3 5h4v2H8v-2z" />
        </svg>
        <span>Filter</span>
      </button>
    </div>
  );
};

const EventList: React.FC = () => {
  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {_events.Result.map((event) => (
        <Link href={`/events/${event.EventID}`} key={event.EventID}>
          <EventCard
            title={event.Title}
            dateRange={`${dayjs(event.StartDate).format("DD MMM YY")} - ${dayjs(
              event.EndDate
            ).format("DD MMM YY")}`}
            location={event.Location}
            imageUrl={event.Images.length > 0 ? event.Images[0] : ""}
          />
        </Link>
      ))}
    </div>
  );
};

const EventsPage: React.FC = () => {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">
      <header className="flex items-center p-4 border-b shadow-sm">
        <button className="text-gray-600" onClick={() => router.back()}>
          <ArrowLeftIcon className="size-4" />
        </button>
        <h1 className="flex-grow text-center text-xl font-semibold">Events</h1>
      </header>
      <CategoryFilter />
      <EventList />
    </div>
  );
};

export default EventsPage;
