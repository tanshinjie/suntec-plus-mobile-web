import { RewardContent } from "./component";
import { Link } from "next-view-transitions";
import { ArrowLeftIcon } from "@heroicons/react/16/solid";

async function fetchData() {
  const res = await fetch("https://sunteccity.com.sg/Prod/v1/rewards", {
    headers: {
      "implementation-id": "sg-suntec-city",
    },
    method: "POST",
  });
  const data = await res.json();
  return data;
}

async function RewardsPage() {
  const _rewards = await fetchData();

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">
      <header className="z-10 fixed top-0 left-0 right-0 flex justify-around p-4 bg-white border-t m-auto">
        <Link href="/">
          <button className="text-gray-600">
            <ArrowLeftIcon className="size-4" />
          </button>
        </Link>
        <h1 className="flex-grow text-center text-xl font-semibold">Rewards</h1>
      </header>
      <main>
        <div className="rounded-xl bg-gradient-to-tl from-orange-600 to-orange-400 text-white text-center m-4 p-4">
          <h4 className="font-medium text-xl">Available Points</h4>
          <h3 className="font-bold text-2xl">2,000</h3>
          <p>200 Points will expire on 31 Dec 2024</p>
        </div>
        <RewardContent _rewards={_rewards} />
      </main>
    </div>
  );
}

export default RewardsPage;
