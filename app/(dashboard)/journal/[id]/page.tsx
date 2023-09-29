import Editor from "@/components/Editor";
import { aiAnalyze } from "@/utils/ai";
import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";

const fetchEntry = async (id) => {
  const user = await getUserByClerkId();

  const entry = await prisma.journalEntry.findUnique({
    where: {
      userId_id: {
        userId: user.id,
        id,
      },
    },
    include: {
      analysis: true,
    },
  });

  return entry;
};

const EntryEditor = async ({ params }) => {
  const entry = await fetchEntry(params.id);

  return (
    <div className="w-full h-full">
      <div>
        <Editor entry={entry} />
      </div>
    </div>
  );
};

export default EntryEditor;
