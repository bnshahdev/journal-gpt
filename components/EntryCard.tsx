const EntryCard = ({ entry }) => {
  const date = new Date(entry.createdAt).toDateString();
  return (
    <div className="rounded-lg overflow-hidden shadow divide-y">
      <div className="p-4">{date}</div>
      <div className="p-4">{"summary"}</div>
      <div className="p-4">{"mood"}</div>
    </div>
  );
};

export default EntryCard;
