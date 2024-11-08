import React from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import Image from "next/image";
import { _rewards, placeholderImage } from "@/data";

export default function Transactions() {
  const router = useRouter();
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
          Transactions
        </h1>
      </header>

      <div className="">
        <Tabs.Root className="flex w-full flex-col p-4">
          <Tabs.List
            className="w-full overflow-x-scroll flex shadow-md border rounded-md no-scrollbar font-bold"
            defaultValue={"receipts"}
          >
            <Tabs.Trigger
              className="m-2 rounded-md flex h-[45px] flex-1 cursor-default select-none items-center justify-center bg-white px-5 text-[15px] leading-none outline-none  data-[state=active]:relative data-[state=active]:bg-orange-400 data-[state=active]:text-white"
              value="receipts"
            >
              Receipts
            </Tabs.Trigger>
            <Tabs.Trigger
              className="m-2 rounded-md flex h-[45px] flex-1 cursor-default select-none items-center justify-center bg-white px-5 text-[15px] leading-none outline-none data-[state=active]:relative data-[state=active]:bg-orange-400 data-[state=active]:text-white"
              value="redemption"
            >
              Redemption
            </Tabs.Trigger>
            <Tabs.Trigger
              className="m-2 rounded-md flex h-[45px] flex-1 cursor-default select-none items-center justify-center bg-white px-5 text-[15px] leading-none outline-none  data-[state=active]:relative data-[state=active]:bg-orange-400 data-[state=active]:text-white"
              value="utilisation"
            >
              Utilisation
            </Tabs.Trigger>
            <Tabs.Trigger
              className="m-2 rounded-md flex h-[45px] flex-1 cursor-default select-none items-center justify-center bg-white px-5 text-[15px] leading-none outline-none  data-[state=active]:relative data-[state=active]:bg-orange-400 data-[state=active]:text-white"
              value="purchased"
            >
              Purchased
            </Tabs.Trigger>
            <Tabs.Trigger
              className="m-2 rounded-md flex h-[45px] flex-1 cursor-default select-none items-center justify-center bg-white px-5 text-[15px] leading-none outline-none  data-[state=active]:relative data-[state=active]:bg-orange-400 data-[state=active]:text-white"
              value="expired"
            >
              Expired
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content
            className="space-y-4 grow rounded-b-md bg-white mt-4 outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
            value="receipts"
          >
            <div></div>
          </Tabs.Content>
          <Tabs.Content
            className="space-y-4 grow rounded-b-md bg-white mt-4 outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
            value="redemption"
          >
            {redemptions.map((redemption) => (
              <div
                key={redemption.id}
                className="grid grid-cols-3 p-4 rounded-md border border-slate-200 text-center"
              >
                <Image
                  src={placeholderImage}
                  alt="Promotion Banner"
                  className="w-full h-12 object-cover"
                  width={160}
                  height={160}
                />
                <div>
                  <p>{redemption.rewardId}</p>
                </div>
                <div className="font-bold">
                  <p>{dayjs(redemption.date).format("DD MMM YYYY")}</p>
                  <p>{redemption.value} Points</p>
                </div>
              </div>
            ))}
          </Tabs.Content>
          <Tabs.Content
            className="space-y-4 grow rounded-b-md bg-white p-5 outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
            value="purchased"
          >
            <div className="text-center">
              <select className="p-4 rounded-md border border-slate-300">
                <option value="all">All Categories</option>
                <option value="flash-slae">Flash Sale</option>
              </select>
            </div>
          </Tabs.Content>
          <Tabs.Content
            className="space-y-4 grow rounded-b-md bg-white mt-4 outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
            value="expired"
          >
            {_rewards.Result.rewards.map((reward) => (
              <div
                key={reward.id}
                className="grid grid-cols-4 p-2 items-center rounded-md border border-slate-200 text-center"
              >
                <Image
                  src={reward.imageUrl}
                  alt="Promotion Banner"
                  className="size-12 object-cover rounded-full"
                  width={160}
                  height={160}
                />
                <div className="text-xs col-span-2">
                  <p>{reward.id}</p>
                  <p className="text-left">{reward.name}</p>
                </div>
                <div className="font-bold text-red-700">
                  <p>Expired</p>
                </div>
              </div>
            ))}
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </div>
  );
}

const redemptions = [
  {
    id: 1,
    date: "2022-01-01",
    rewardId: "0032178153",
    value: 0,
  },
  {
    id: 2,
    date: "2022-01-02",
    rewardId: 2,
    value: 0,
  },
  {
    id: 3,
    date: "2022-01-03",
    rewardId: 3,
    value: 0,
  },
  {
    id: 4,
    date: "2022-01-04",
    rewardId: 4,
    value: 0,
  },
  {
    id: 5,
    date: "2022-01-05",
    rewardId: 5,
    value: 0,
  },
  {
    id: 6,
    date: "2022-01-06",
    rewardId: 6,
    value: 0,
  },
  {
    id: 7,
    date: "2022-01-07",
    rewardId: 7,
    value: 0,
  },
];
