import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import { IDetectedBarcode, Scanner } from "@yudiel/react-qr-scanner";
import { useRouter } from "next/router";
import { useState } from "react";

const PayPage = () => {
  const router = useRouter();
  const [value, setValue] = useState<IDetectedBarcode[]>();

  return (
    <>
      <header className="fixed top-0 left-0 right-0 flex justify-around p-4 bg-white border-t max-w-96 m-auto">
        <button className="text-gray-600" onClick={() => router.back()}>
          <ArrowLeftIcon className="size-4" />
        </button>
        <h1 className="flex-grow text-center text-xl font-semibold">
          Scan Merchant
        </h1>
      </header>
      <main className="pt-16">
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
