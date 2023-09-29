import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

const DashboardLayout = ({ children }) => {
  return (
    <div className="h-screen w-screen relative bg-slate-200">
      <div className="absolute left-0 top-0 w-[200px] h-full border-r-2 bg-white">
        <ul className="px-4 my-5">
          <li>
            <Link href={"/journal"}>Home</Link>
          </li>
        </ul>
      </div>
      <div className="ml-[200px]">
        <div className="top-0 h-[60px] border-b-2 bg-white">
          <div className="h-full w-full px-6 py-4 flex items-center justify-between">
            <h2 className="text-3xl">Journal</h2>

            <UserButton />
          </div>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
