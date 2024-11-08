import { _rewards } from "@/data";
import Image from "next/image";
import { placeholder } from "../directory";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import {
  ArrowLeftIcon, ChevronDownIcon
} from "@heroicons/react/16/solid";
import dayjs from "dayjs";
import * as Accordion from "@radix-ui/react-accordion";

export default function RewardDetailPage() {
  const params = useParams();
  const router = useRouter();

  let reward;

  for (let i = 0; i < _rewards.Result.rewards.length; i++) {
    if (String(_rewards.Result.rewards[i].id) === params.id) {
      reward = _rewards.Result.rewards[i];
      break;
    }
  }

  if (!reward) {
    return <div>reward not found</div>;
  }

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
          {reward.merchantName}
        </h1>
      </header>
      <div className="p-4 space-y-4">
        <Image
          src={reward.imageUrl || placeholder}
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
                  dangerouslySetInnerHTML={{ __html: reward.termAndConditions }}
                ></div>
              </Accordion.AccordionContent>
            </Accordion.Item>
          </Accordion.Root>
        </div>

        <button className="rounded-md font-bold text-xl bg-orange-400 text-white w-full py-4">
          Redeem
        </button>
      </div>
    </div>
  );
}
