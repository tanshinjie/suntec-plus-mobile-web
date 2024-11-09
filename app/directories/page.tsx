import { DirectoryList } from "./component";

async function fetchData() {
  const res = await fetch("https://sunteccity.com.sg/Prod/v1/directories", {
    headers: {
      "implementation-id": "sg-suntec-city",
    },
    method: "POST",
  });
  const data = await res.json();
  return data;
}

async function DirectoryPage() {
  const _directories = await fetchData();

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">
      <DirectoryList data={_directories} />
    </div>
  );
}

export default DirectoryPage;
