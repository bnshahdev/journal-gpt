const EntryCard = ({ entry }) => {
  const date = new Date(entry.createdAt).toDateString();
  const { summary, mood } = entry.analysis || {};
  return (
    <div className="rounded-lg overflow-hidden shadow divide-y bg-white font-black">
      <div className="p-4">{date}</div>
      <div className="p-4">{summary}</div>
      <div className="p-4">{mood}</div>
    </div>
  );
};

export default EntryCard;
