import { _rewards, rewards } from "@/data";
import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import { useRouter } from "next/router";
import React from "react";
import Image from "next/image";
import Link from "next/link";

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
      <span className="bg-gradient-to-t from-orange-400 to-orange-500 p-2 text-xs absolute right-0 top-6 rounded-l-md min-w-24 font-bold">{value} Points</span>
      <div className="p-3">
        <h3 className="text-md font-semibold leading-5 mb-4 line-clamp-2">{title}</h3>
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
const RewardList: React.FC = () => {
  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {_rewards.Result.rewards.map((reward, index) => (
        <Link href={`/rewards/${reward.id}`}>
          <RewardCard
            key={index}
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
  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">
      <header className="flex items-center p-4 border-b shadow-sm">
        <button className="text-gray-600" onClick={() => router.back()}>
          <ArrowLeftIcon className="size-4" />
        </button>
        <h1 className="flex-grow text-center text-xl font-semibold">Rewards</h1>
      </header>
      <div className="rounded-xl bg-gradient-to-tl from-orange-600 to-orange-400 text-white text-center m-4 p-4">
        <h4 className="font-medium text-xl">Available Points</h4>
        <h3 className="font-bold text-2xl">2,000</h3>
        <p>200 Points will expire on 31 Dec 2024</p>
      </div>
      <CategoryFilter />
      <RewardList />
    </div>
  );
};

export default RewardsPage;
