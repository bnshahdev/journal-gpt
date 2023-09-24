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

const analysisData = [
  { title: "Subject", value: "" },
  { title: "Summary", value: "" },
];
const EntryEditor = async ({ params }) => {
  const entry = await fetchEntry(params.id);
  return (
    <div className="w-full h-full grid grid-cols-3">
      <div className="col-span-2">
        <Editor entry={entry} />
      </div>
      <div className="border-l-white">
        <div className="p-10 bg-blue-300">
          <h2 className="text-2xl border-b m-5">Analysis</h2>
          <div>
            <ul>
              {analysisData.map((data) => {
                return (
                  <li key={data.id}>
                    <span className="text-lg font-semibold">{data.title}</span>
                    <span>{data.value}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntryEditor;
