import Editor from "@/components/Editor";
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
  });

  return entry;
};

const EntryEditor = async ({ params }) => {
  const entry = await fetchEntry(params.id);
  return (
    <div>
      <Editor entry={entry} />
    </div>
  );
};

export default EntryEditor;
