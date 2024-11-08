import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import Image from "next/image";
import { useRouter } from "next/router";

const ScanPage = () => {
  const router = useRouter();
  return (
    <div>
      <header className="fixed top-0 left-0 right-0 flex justify-around p-4 bg-white border-t max-w-96 m-auto">
        <button className="text-gray-600" onClick={() => router.back()}>
          <ArrowLeftIcon className="size-4" />
        </button>
        <h1 className="flex-grow text-center text-xl font-semibold">
          Upload Receipt
        </h1>
      </header>
      <main className="pt-16">
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
