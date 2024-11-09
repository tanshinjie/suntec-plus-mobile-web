import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import { Link } from "next-view-transitions";
import Image from "next/image";

const ScanPage = () => {
  return (
    <div>
      <header className="fixed top-0 left-0 right-0 flex justify-around p-4 bg-white border-t m-auto">
        <Link href="/">
          <button className="text-gray-600">
            <ArrowLeftIcon className="size-4" />
          </button>
        </Link>
        <h1 className="flex-grow text-center text-xl font-semibold">
          Upload Receipt
        </h1>
      </header>
      <main>
        <Image
          alt="Scan receipt"
          src="/scan-receipt.png"
          width={400}
          height={400}
        />
        <div className="px-4 mt-4 w-full">
          <label
            htmlFor="upload"
            className="w-full block text-center bg-green-500 text-bold text-white rounded-lg px-6 py-4 "
          >
            Continue
          </label>
          <input
            className="hidden"
            id="upload"
            type="file"
            accept="image/*;capture=camera"
          />
        </div>
      </main>
    </div>
  );
};

export default ScanPage;
