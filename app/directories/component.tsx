"use client";
import { DirectoryCategory } from "@/data/type";
import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import { Link } from "next-view-transitions";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { _directories as fallback, placeholderImage } from "@/data";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetFooter,
} from "@/components/ui/sheet";
import { fallbackUrl } from "@/lib/utils";

function CategoryList({
  title,
  stores,
  onClick,
}: {
  title: string;
  stores: (typeof fallback.Result)[0]["Merchants"];
  onClick: () => void;
}) {
  return (
    <div className="p-4 py-6">
      <div className="flex justify-between">
        <h2 className="text-lg font-bold">{title}</h2>
        <button className="w-20" onClick={onClick}>
          See more
        </button>
      </div>
      <div className="flex overflow-x-scroll no-scrollbar gap-2">
        {stores.map((store) => (
          <Link href={`/stores/${store.MerchantID}`} key={store.MerchantID}>
            <div className="min-w-[200px] flex" key={store.MerchantID}>
              <div className="w-full bg-white rounded-lg shadow-md p-2 mb-4">
                <Image
                  src={
                    fallbackUrl(store.PromotionalImage) ||
                    fallbackUrl(store.DetailImage) ||
                    fallbackUrl(store.MerchantLogo) ||
                    placeholderImage
                  }
                  alt="Placeholder"
                  className="w-full h-24 object-cover rounded"
                  width={160}
                  height={160}
                />
                <p className="mt-2 text-xs font-semibold text-ellipsis line-clamp-1">
                  {store.StoreName}
                </p>
                <p className="text-sm font-bold line-clamp-1">
                  {store.UnitNumber}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function StoreGrid({
  stores,
  isHalal,
  isEVoucher,
  isPayWithPoints,
}: {
  stores: (typeof fallback.Result)[0]["Merchants"];
  isHalal?: boolean;
  isEVoucher?: boolean;
  isPayWithPoints?: boolean;
}) {
  return (
    <div className="p-4 grid grid-cols-2 gap-4">
      {stores.map((store) => {
        if (isHalal && store.isHalalCertified !== "1") return null;
        if (isEVoucher && store.acceptVouchers !== "1") return null;
        if (isPayWithPoints && store.canPayWithPoints !== "1") return null;

        return (
          <Link href={`/stores/${store.MerchantID}`} key={store.MerchantID}>
            <div className="min-w-[160px] mt-2 flex" key={store.MerchantID}>
              <div className="w-full bg-white rounded-lg shadow-md p-2">
                <Image
                  src={
                    fallbackUrl(store.PromotionalImage) ||
                    fallbackUrl(store.DetailImage) ||
                    fallbackUrl(store.MerchantLogo) ||
                    placeholderImage
                  }
                  alt="Placeholder"
                  className="w-full h-24 object-cover rounded"
                  width={160}
                  height={160}
                />
                <p className="mt-2 text-xs font-semibold">{store.StoreName}</p>
                <p className="text-sm font-bold">{store.UnitNumber}</p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

function groupBy<T>(items: T[], key: keyof T): Record<string, T[]> {
  return items.reduce((result, item) => {
    const groupKey = item[key] as string;
    return {
      ...result,
      [groupKey]: [...(result[groupKey] || []), item],
    };
  }, {} as Record<string, T[]>);
}

function capitalizeFirstLetter(str: string) {
  return str
    .split(" ") // Split the string into an array of words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize the first letter of each word
    .join(" "); // Join the words back into a single string
}

export function DirectoryList({ data }: { data: typeof fallback }) {
  const _directories = data;
  let stores = _directories.Result;
  const router = useRouter();
  const [categoryId, setCategoryId] = useState<number>(0);
  const [subCategoryId, setSubCategoryId] = useState<number>(-1);
  const [filter, setFilter] = useState<number[]>([]);
  const [open, setOpen] = useState<boolean>(false);

  let grouped = {} as {
    [key: number]: {
      CategoryID: number;
      SubCategoryID: number;
      SubCategoryName: string;
      Merchants: (typeof stores)[0]["Merchants"];
      participatingMerchants: (typeof stores)[0]["Merchants"];
    }[];
  };

  const directories = { ..._directories };

  if (categoryId > -1) {
    stores = directories.Result.filter((store) => {
      if (categoryId === 0) {
        return true;
      }
      return store.CategoryID === categoryId;
    });
    grouped = groupBy(stores, "SubCategoryName") as {
      [key: number]: {
        CategoryID: number;
        SubCategoryID: number;
        SubCategoryName: string;
        Merchants: (typeof stores)[0]["Merchants"];
        participatingMerchants: (typeof stores)[0]["Merchants"];
      }[];
    };
  }
  if (subCategoryId > -1) {
    stores = directories.Result.filter((store) => {
      return store.SubCategoryID === subCategoryId;
    });
    grouped = groupBy(stores, "SubCategoryName") as {
      [key: number]: {
        CategoryID: number;
        SubCategoryID: number;
        SubCategoryName: string;
        Merchants: (typeof stores)[0]["Merchants"];
        participatingMerchants: (typeof stores)[0]["Merchants"];
      }[];
    };
  }

  const shouldRenderCategoryView = categoryId >= 0 && subCategoryId === -1;

  const renderCategoryView = () => {
    return (
      <>
        <header className="fixed top-0 left-0 right-0 flex justify-around p-4 bg-white border-t m-auto">
          <button
            className="text-gray-600"
            onClick={() => {
              if (shouldRenderCategoryView) {
                router.back();
              }
              if (shouldRenderSubCategoryView) {
                setSubCategoryId(-1);
                setCategoryId(0);
              }
            }}
          >
            <ArrowLeftIcon className="size-4" />
          </button>
          {shouldRenderCategoryView && (
            <h1 className="flex-grow text-center text-xl font-semibold">
              Directory
            </h1>
          )}
          {shouldRenderSubCategoryView && (
            <h1 className="flex-grow text-center text-xl font-semibold">
              {Object.keys(grouped)[0]}
            </h1>
          )}
        </header>
        <main>
          <div className="flex gap-2 m-2">
            {Object.values(DirectoryCategory).map((category) => (
              <button
                key={category.id}
                className={`font-semibold rounded-full w-full px-4 py-2 ${
                  categoryId === category.id ? "bg-black text-white" : ""
                }`}
                onClick={() => setCategoryId(category.id)}
              >
                <span>{capitalizeFirstLetter(category.name)}</span>
              </button>
            ))}
          </div>
          {Object.entries(grouped).map((group) => (
            <CategoryList
              key={group[0]}
              title={group[0]}
              stores={group[1][0].Merchants}
              onClick={() => {
                setSubCategoryId(group[1][0].SubCategoryID);
                setCategoryId(-1);
              }}
            />
          ))}
        </main>
      </>
    );
  };
  const shouldRenderSubCategoryView = categoryId <= -1 && subCategoryId >= 0;
  const renderSubCategoryView = () => {
    return (
      <>
        <header className="fixed top-0 left-0 right-0 flex justify-around p-4 bg-white border-t m-auto">
          <button
            className="text-gray-600"
            onClick={() => {
              if (shouldRenderCategoryView) {
                router.back();
              }
              if (shouldRenderSubCategoryView) {
                setSubCategoryId(-1);
                setCategoryId(0);
              }
            }}
          >
            <ArrowLeftIcon className="size-4" />
          </button>
          {shouldRenderCategoryView && (
            <h1 className="flex-grow text-center text-xl font-semibold">
              Directory
            </h1>
          )}
          {shouldRenderSubCategoryView && (
            <h1 className="flex-grow text-center text-xl font-semibold">
              {Object.keys(grouped)[0]}
            </h1>
          )}
        </header>
        <main>
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
                    label: "Pay with points",
                  },
                  {
                    value: 1,
                    label: "Halal Certified",
                  },
                  {
                    value: 2,
                    label: "e-vouchers accepted",
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
              <SheetFooter className="grid grid-cols-2 gap-2">
                <button
                  className="rounded-lg text-bold py-2 text-orange-500 border border-orange-500"
                  onClick={() => {
                    setFilter([]);
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
          {Object.entries(grouped).map((group) => (
            <StoreGrid
              key={group[0]}
              stores={group[1][0].Merchants}
              isHalal={filter.includes(1)}
              isEVoucher={filter.includes(2)}
              isPayWithPoints={filter.includes(0)}
            />
          ))}
        </main>
      </>
    );
  };

  return (
    <>
      {shouldRenderCategoryView && renderCategoryView()}
      {shouldRenderSubCategoryView && renderSubCategoryView()}
    </>
  );
}
