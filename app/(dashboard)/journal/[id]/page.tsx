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
  const { subject, summary, mood, negative } = entry?.analysis;
  const analysisData = [
    { title: "Subject", value: subject },
    { title: "Summary", value: summary },
    { title: "Mood", value: mood },
    { title: "Negative", value: negative ? "Yes" : "No" },
  ];
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
                  <li key={data.id} className="flex justify-between">
                    <span className="text-lg font-semibold">{data.title}</span>
                    <br />
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
