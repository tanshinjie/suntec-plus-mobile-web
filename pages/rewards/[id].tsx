import { _rewards, placeholderImage } from "@/data";
import Image from "next/image";
import { useRouter } from "next/router";
import { ArrowLeftIcon, ChevronDownIcon } from "@heroicons/react/16/solid";
import dayjs from "dayjs";
import * as Accordion from "@radix-ui/react-accordion";

export default function RewardDetailPage() {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  let reward;

  for (let i = 0; i < _rewards.Result.rewards.length; i++) {
    if (String(_rewards.Result.rewards[i].id) === router.query.id) {
      reward = _rewards.Result.rewards[i];
      break;
    }
  }

  if (!reward) {
    return <div>reward not found</div>;
  }

  return (
    <div>
      <header className="fixed top-0 left-0 right-0 flex justify-around p-4 bg-white border-t max-w-96 m-auto">
        <button
          className="text-gray-600"
          onClick={() => {
            router.back();
          }}
        >
          <ArrowLeftIcon className="size-4" />
        </button>
        <h1 className="flex-grow text-center text-xl font-semibold">
          {reward.merchantName}
        </h1>
      </header>
      <main className="pt-16">
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
