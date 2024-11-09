import { PromotionList } from "./component";
import { Link } from "next-view-transitions";
import { ArrowLeftIcon } from "@heroicons/react/16/solid";

async function fetchData() {
  const res = await fetch("https://sunteccity.com.sg/Prod/v1/promotions", {
    headers: {
      "implementation-id": "sg-suntec-city",
    },
    method: "POST",
  });
  const data = await res.json();
  return data;
}

async function RewardsPage() {
  const data = await fetchData();

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">
      <header className="z-50 fixed top-0 left-0 right-0 flex justify-around p-4 bg-white border-t m-auto">
        <Link href="/">
          <button className="text-gray-600">
            <ArrowLeftIcon className="size-4" />
          </button>
        </Link>
        <h1 className="flex-grow text-center text-xl font-semibold">
          Promotions
        </h1>
      </header>
      <main>
        <div className="flex my-4 p-4">
          <button className="font-semibold rounded-full text-white bg-black w-full py-2">
            <span>On Going</span>
          </button>
          <button className="font-semibold rounded-full w-full py-2">
            <span>Upcoming</span>
          </button>
        </div>
        <PromotionList data={data} />
      </main>
    </div>
  );
}

export default RewardsPage;
