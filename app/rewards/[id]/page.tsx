import { placeholderImage } from "@/data";
import { ArrowLeftIcon, ChevronDownIcon } from "@heroicons/react/16/solid";
import * as Accordion from "@radix-ui/react-accordion";
import dayjs from "dayjs";
import Image from "next/image";
import { Link } from "next-view-transitions";

async function fetchData(id: string) {
  const res = await fetch("https://sunteccity.com.sg/Prod/v1/rewards", {
    headers: {
      "implementation-id": "sg-suntec-city",
    },
    method: "POST",
  });
  const data = await res.json();

  let reward;
  for (let i = 0; i < data.Result.rewards.length; i++) {
    if (String(data.Result.rewards[i].id) === id) {
      reward = data.Result.rewards[i];
      break;
    }
  }

  return reward;
}

export default async function RewardDetailPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const reward = await fetchData(id);

  if (!reward) {
    return <div>Reward not found</div>;
  }

  return (
    <div>
      <header className="fixed top-0 left-0 right-0 flex justify-around p-4 bg-white border-t m-auto">
        <Link href="/rewards">
          <button className="text-gray-600">
            <ArrowLeftIcon className="size-4" />
          </button>
        </Link>
        <h1 className="flex-grow text-center text-xl font-semibold">
          {reward.merchantName}
        </h1>
      </header>
      <main>
        <div className="p-4 space-y-4">
          <Image
            src={reward.imageUrl || placeholderImage}
            alt="Placeholder"
            className="w-full h-72 object-contain rounded-md"
            width={160}
            height={160}
          />
          <div className="border-[1px] border-slate-300 rounded-md p-4 space-y-4">
            <h2 className="text-xl font-bold">{reward.name}</h2>
            <hr />
            <p>{reward.merchantName}</p>
            <hr />
            <div>
              <h3 className="text-2xl font-bold">
                {reward.intouchPoints} Points
              </h3>
              <p className="mb-4">
                Redeem before{" "}
                {dayjs(reward.endTime).format("DD MMM YYYY, hh:MM A")}
              </p>
              <p className="text-slate-700">{reward.description}</p>
            </div>
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
                    dangerouslySetInnerHTML={{
                      __html: reward.termAndConditions,
                    }}
                  ></div>
                </Accordion.AccordionContent>
              </Accordion.Item>
            </Accordion.Root>
          </div>

          <button className="rounded-md font-bold text-xl bg-orange-500 text-white w-full py-4">
            Redeem
          </button>
        </div>
      </main>
    </div>
  );
}
