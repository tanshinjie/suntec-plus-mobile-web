"use client";
import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import { IDetectedBarcode, Scanner } from "@yudiel/react-qr-scanner";
import { Link } from "next-view-transitions";
import { useState } from "react";

const PayPage = () => {
  const [value, setValue] = useState<IDetectedBarcode[]>();

  return (
    <>
      <header className="fixed top-0 left-0 right-0 flex justify-around p-4 bg-white border-t m-auto">
        <Link href="/">
          <button className="text-gray-600">
            <ArrowLeftIcon className="size-4" />
          </button>
        </Link>
        <h1 className="flex-grow text-center text-xl font-semibold">
          Scan Merchant
        </h1>
      </header>
      <main>
        <Scanner
          onScan={(result: IDetectedBarcode[]) => {
            console.log(result);
            setValue(result);
          }}
        />
        <div>QR value:</div>
        <div>
          <pre className="w-full text-wrap break-words">
            {JSON.stringify(value, null, 2)}
          </pre>
        </div>
      </main>
    </>
  );
};

export default PayPage;
