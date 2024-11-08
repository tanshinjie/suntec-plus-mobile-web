import { DirectoryCategory } from "@/data/type";
import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { useState } from "react";
import { _directories } from "@/data";

export const placeholder = "https://sunteccity.com.sg/imgs/logo-fallback.png";

function CategoryList({
  title,
  stores,
  onClick,
}: {
  title: string;
  stores: (typeof _directories.Result)[0]["Merchants"];
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
      <div className="flex overflow-x-scroll gap-2">
        {stores.map((store) => (
          <Link href={`/stores/${store.MerchantID}`} key={store.MerchantID}>
            <div className="min-w-[200px] flex" key={store.MerchantID}>
              <div className="w-full bg-white rounded-lg shadow-md p-2 mb-4">
                <Image
                  src={
                    store.PromotionalImage ||
                    store.DetailImage ||
                    store.MerchantLogo ||
                    placeholder
                  }
                  alt="Placeholder"
                  className="w-full h-24 object-cover rounded"
                  width={160}
                  height={160}
                />
                <p className="mt-2 text-xs font-semibold text-ellipsis line-clamp-1">
                  {store.StoreName}
                </p>
                <p className="text-sm font-bold line-clamp-1">{store.UnitNumber}</p>
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
  onClick,
}: {
  stores: (typeof _directories.Result)[0]["Merchants"];
  onClick: () => void;
}) {
  return (
    <div className="p-4 grid grid-cols-2 gap-4">
      {stores.map((store) => (
        <Link href={`/stores/${store.MerchantID}`} key={store.MerchantID}>
          <div className="min-w-[160px] mt-2 flex" key={store.MerchantID}>
            <div className="w-full bg-white rounded-lg shadow-md p-2">
              <Image
                src={
                  store.PromotionalImage ||
                  store.DetailImage ||
                  store.MerchantLogo ||
                  placeholder
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
      ))}
    </div>
  );
}

const groupBy = (items, key) =>
  items.reduce(
    (result, item) => ({
      ...result,
      [item[key]]: [...(result[item[key]] || []), item],
    }),
    {}
  );
const DirectoryPage: React.FC = () => {
  const router = useRouter();
  const [categoryId, setCategoryId] = useState<number>(0);
  const [subCategoryId, setSubCategoryId] = useState<number>(-1);

  let stores = _directories.Result;
  let grouped = {} as {
    [key: number]: {
      CategoryID: number;
      SubCategoryID: number;
      SubCategoryName: string;
      Merchants: (typeof stores)[0]["Merchants"];
      participatingMerchants: (typeof stores)[0]["Merchants"];
    }[];
  };

  if (categoryId > -1) {
    stores = _directories.Result.filter((store) => {
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
    stores = _directories.Result.filter((store) => {
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
      </>
    );
  };
  const shouldRenderSubCategoryView = categoryId <= -1 && subCategoryId >= 0;
  const renderSubCategoryView = () => {
    return (
      <>
        <div className="gap-4 p-4">
          <button>Filter</button>
        </div>
        {Object.entries(grouped).map((group) => (
          <StoreGrid
            key={group[0]}
            stores={group[1][0].Merchants}
            onClick={() => {
              console.log("clicked");
            }}
          />
        ))}
      </>
    );
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">
      <header className="flex items-center p-4 border-b shadow-sm">
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
      {shouldRenderCategoryView && renderCategoryView()}
      {shouldRenderSubCategoryView && renderSubCategoryView()}
    </div>
  );
};

export default DirectoryPage;

function capitalizeFirstLetter(str: string) {
  return str
    .split(" ") // Split the string into an array of words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize the first letter of each word
    .join(" "); // Join the words back into a single string
}
