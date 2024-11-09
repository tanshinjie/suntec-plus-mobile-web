import { EventsPageContent } from "./component";

async function fetchData() {
  const res = await fetch("https://sunteccity.com.sg/Prod/v1/events", {
    headers: {
      "implementation-id": "sg-suntec-city",
    },
    method: "POST",
  });
  const data = await res.json();
  return data;
}

async function EventsPage() {
  const data = await fetchData();

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">
      <EventsPageContent data={data} />
    </div>
  );
}

export default EventsPage;
