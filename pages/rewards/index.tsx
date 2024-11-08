import { _rewards as fallback } from "@/data";
import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";

interface RewardCardProps {
  title: string;
  imageUrl: string;
  value: number;
}

const RewardCard: React.FC<RewardCardProps> = ({ title, imageUrl, value }) => {
  return (
    <div className="bg-gradient-to-t from-orange-400 to-orange-500 rounded-lg shadow-md text-white min-h-42 text-sm relative">
      <Image
        src={imageUrl}
        alt={title}
        className="w-full h-24 object-cover rounded-t-lg"
        width={160}
        height={160}
      />
      <span className="bg-gradient-to-t from-orange-400 to-orange-500 p-2 text-xs absolute right-0 top-6 rounded-l-md min-w-24 font-bold">
        {value} Points
      </span>
      <div className="p-3">
        <h3 className="text-md font-semibold leading-5 mb-4 line-clamp-2">
          {title}
        </h3>
      </div>
    </div>
  );
};

const RewardList = ({ data }: { data: typeof fallback }) => {
  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {data.Result.rewards.map((reward) => (
        <Link href={`/rewards/${reward.id}`} key={reward.id}>
          <RewardCard
            title={reward.name}
            imageUrl={reward.imageUrl}
            value={reward.intouchPoints}
          />
        </Link>
      ))}
    </div>
  );
};

const RewardsPage: React.FC = () => {
  const router = useRouter();
  const [filter, setFilter] = useState<number[]>([]);
  const [sort, setSort] = useState<number>(-1);
  const [open, setOpen] = useState<boolean>(false);
  const [_rewards, setRewards] = useState(fallback);

  useEffect(() => {
    fetch("/api/rewards")
      .then((res) => res.json())
      .then((data) => setRewards(data));
  }, []);

  const rewards = JSON.parse(JSON.stringify(_rewards)) as typeof fallback;

  if (filter.length > 0) {
    if (filter.includes(0) || (filter.includes(1) && filter.includes(2))) {
      rewards.Result.rewards = rewards.Result.rewards;
    } else {
      if (filter.includes(1)) {
        rewards.Result.rewards = rewards.Result.rewards.filter(
          (reward) => reward.subcategory === "evoucher",
        );
      }
      if (filter.includes(2)) {
        rewards.Result.rewards = rewards.Result.rewards.filter(
          (reward) => reward.subcategory === "carpark",
        );
      }
    }
  }

  if (sort !== -1) {
    switch (sort) {
      case 0:
        rewards.Result.rewards.sort((a, b) => {
          return new Date(a.endTime).getTime() - new Date(b.endTime).getTime();
        });
        break;
      case 1:
        rewards.Result.rewards.sort((a, b) => {
          return new Date(b.endTime).getTime() - new Date(a.endTime).getTime();
        });
        break;
      case 2:
        rewards.Result.rewards.sort((a, b) => {
          return b.intouchPoints - a.intouchPoints;
        });
        break;
      case 3:
        rewards.Result.rewards.sort((a, b) => {
          return a.intouchPoints - b.intouchPoints;
        });
        break;
    }
  }

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">
      <header className="fixed top-0 left-0 right-0 flex justify-around p-4 bg-white border-t max-w-96 m-auto">
        <button className="text-gray-600" onClick={() => router.back()}>
          <ArrowLeftIcon className="size-4" />
        </button>
        <h1 className="flex-grow text-center text-xl font-semibold">Rewards</h1>
      </header>
      <main className="pt-16">
        <div className="rounded-xl bg-gradient-to-tl from-orange-600 to-orange-400 text-white text-center m-4 p-4">
          <h4 className="font-medium text-xl">Available Points</h4>
          <h3 className="font-bold text-2xl">2,000</h3>
          <p>200 Points will expire on 31 Dec 2024</p>
        </div>
        <div className="flex items-center justify-between my-4 p-4">
          <h2 className="text-xl font-bold">All Categories</h2>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <div className="p-4">
                <button className="flex items-center space-x-1 text-gray-600 px-6 py-2 w-full border boder-gray-600 rounded-lg">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M3 5h14v2H3V5zm2 5h10v2H5v-2zm3 5h4v2H8v-2z" />
                  </svg>
                  <span>Filter</span>
                </button>
              </div>
            </SheetTrigger>
            <SheetContent side="bottom" className="bg-white space-y-4">
              <div className="space-y-2">
                <h3>Filter By</h3>
                <hr />
                {[
                  {
                    value: 0,
                    label: "All Categories",
                  },
                  {
                    value: 1,
                    label: "Rewards - Evoucher",
                  },
                  {
                    value: 2,
                    label: "Rewards - Carpark",
                  },
                ].map((item) => (
                  <div key={item.value} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={item.label}
                      checked={filter.includes(item.value)}
                      onChange={() => {
                        if (filter.includes(item.value)) {
                          setFilter([
                            ...filter.filter((value) => value !== item.value),
                          ]);
                        } else {
                          setFilter([...filter, item.value]);
                        }
                      }}
                    />
                    <label htmlFor={item.label}>{item.label}</label>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <h3>Sort By</h3>
                <hr />
                {[
                  {
                    value: 0,
                    label: "Newest to Oldest",
                  },
                  {
                    value: 1,
                    label: "Oldest to Newest",
                  },
                  {
                    value: 2,
                    label: "Highest to Lowest",
                  },
                  {
                    value: 3,
                    label: "Lowest to Highest",
                  },
                ].map((item) => (
                  <div key={item.value} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id={item.label}
                      checked={sort === item.value}
                      onChange={() => {
                        setSort(item.value);
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
                    setFilter([]);
                    setSort(-1);
                  }}
                >
                  Reset
                </button>
                <button
                  className="rounded-lg py-2 text-bold text-white bg-orange-500"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  Apply
                </button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
        <RewardList data={rewards} />
      </main>
    </div>
  );
};

export default RewardsPage;
