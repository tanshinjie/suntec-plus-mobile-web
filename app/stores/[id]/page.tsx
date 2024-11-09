import { placeholderImage } from "@/data";
import { fallbackUrl } from "@/lib/utils";
import { ArrowLeftIcon } from "lucide-react";
import { Link } from "next-view-transitions";
import Image from "next/image";

async function fetchData(id: string) {
  const res = await fetch("https://sunteccity.com.sg/Prod/v1/directories", {
    headers: {
      "implementation-id": "sg-suntec-city",
    },
    method: "POST",
  });
  const data = await res.json();

  let store;

  for (let i = 0; i < data.Result.length; i++) {
    for (let j = 0; j < data.Result[i].Merchants.length; j++) {
      if (data.Result[i].Merchants[j].MerchantID === id) {
        store = data.Result[i].Merchants[j];
        break;
      }
    }
  }

  return store;
}

export default async function StoreDetailPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const store = await fetchData(id);

  if (!store) {
    return <div>Store not found</div>;
  }

  return (
    <div>
      <header className="fixed top-0 left-0 right-0 flex justify-around p-4 bg-white border-t m-auto items-center">
        <Link href="/directories">
          <button className="text-gray-600">
            <ArrowLeftIcon className="size-4" />
          </button>
        </Link>
        <h1 className="flex-grow text-center text-xl font-semibold">
          {store.StoreName}
        </h1>
      </header>
      <main>
        <Image
          src={
            fallbackUrl(store.PromotionalImage) ||
            fallbackUrl(store.DetailImage) ||
            fallbackUrl(store.MerchantLogo) ||
            placeholderImage
          }
          alt="Placeholder"
          className="w-full h-72 object-contain rounded"
          width={800}
          height={400}
        />
        <div className="border-[1px] border-slate-300 rounded-md p-4 space-y-4">
          <div className="flex gap-2 text-white">
            {store.acceptVouchers === "1" && (
              <span className="rounded-full px-4 py-2 bg-slate-900">
                e-Voucher accepted
              </span>
            )}
            {store.isParticipating === "1" && (
              <span className="rounded-full px-4 py-2 bg-orange-500">
                Earn points
              </span>
            )}
          </div>
          <h5 className="font-bold text-2xl">{store.StoreName}</h5>
          <p>{store.UnitNumber}</p>
          <Link href={"/map"}>
            <button className="py-4 text-orange-400 border-2 border-orange-400 w-full rounded-md font-semibold">
              Locate Store
            </button>
          </Link>
          <h5 className="font-medium">Description</h5>
          <p>{store.AboutStore}</p>
        </div>
      </main>
    </div>
  );
}
