"use client";

import { createNewEntry } from "@/utils/api";
import { useRouter } from "next/navigation";

const NewEntryCard = () => {
  const router = useRouter();

  const handleOnClick = async () => {
    const data = await createNewEntry();
    router.push(`journal/${data.id}`);
  };

  return (
    <div className="cursor-pointer" onClick={handleOnClick}>
      <span className="text-xl rounded-lg p-4 bg-blue-400">New Entry</span>
    </div>
  );
};

export default NewEntryCard;
