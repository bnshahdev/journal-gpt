import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";
import EntryCard from "@/components/EntryCard";
import NewEntryCard from "@/components/NewEntryCard";
import Link from "next/link";
import AskQuestion from "@/components/AskQuestion";

const getEntries = async () => {
  const user = await getUserByClerkId();

  const entries = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      analysis: true,
      createdAt: true,
      id: true,
    },
  });

  return entries;
};

const JournalPage = async () => {
  const entries = await getEntries();

  return (
    <div className="p-10">
      <div className="grid grid-cols-2 gap-10">
        <NewEntryCard />
        <AskQuestion />
      </div>
      <div className="grid grid-cols-1 gap-2 w-[450px]">
        {entries.map((entry) => (
          <Link key={entry.id} href={`/journal/${entry.id}`}>
            <EntryCard entry={entry} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default JournalPage;
