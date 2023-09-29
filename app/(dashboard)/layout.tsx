import { UserButton } from "@clerk/nextjs";

const DashboardLayout = ({ children }) => {
  return (
    <div className="h-screen w-screen relative bg-slate-200">
      <div className="absolute left-0 top-0 w-[200px] h-full border-r-2 bg-white">
        Sidebar
      </div>
      <div className="ml-[200px]">
        <div className="top-0 h-[60px] border-b-2 bg-white">
          <div className="h-full w-full px-6 flex items-center justify-end">
            <UserButton />
          </div>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
