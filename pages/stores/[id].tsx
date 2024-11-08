import { _directories, placeholderImage } from "@/data";
import Image from "next/image";
import { useRouter } from "next/router";
import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import { fallbackUrl } from "@/lib/utils";

export default function StorePage() {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  let store;

  for (let i = 0; i < _directories.Result.length; i++) {
    for (let j = 0; j < _directories.Result[i].Merchants.length; j++) {
      if (_directories.Result[i].Merchants[j].MerchantID === router.query.id) {
        store = _directories.Result[i].Merchants[j];
        break;
      }
    }
  }

  if (!store) {
    return <div>Store not found</div>;
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
          {store.StoreName}
        </h1>
      </header>
      <main className="pt-16">
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
