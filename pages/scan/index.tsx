import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import { Scanner } from "@yudiel/react-qr-scanner";
import { useRouter } from "next/router";

const PayPage = () => {
  const router = useRouter();
  return (
    <div>
      <header className="flex items-center p-4 border-b shadow-sm">
        <button className="text-gray-600" onClick={() => router.back()}>
          <ArrowLeftIcon className="size-4" />
        </button>
        <h1 className="flex-grow text-center text-xl font-semibold">
          Scan Merchant
        </h1>
      </header>
      <Scanner onScan={(result) => console.log(result)} />;
    </div>
  );
};

export default PayPage;
