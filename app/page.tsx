import { auth } from "@clerk/nextjs";
import Link from "next/link";

export default async function Home() {
  const { userId } = await auth();
  const href = userId ? "/journal" : "/new-user";

  return (
    <div className="w-screen h-screen bg-black flex justify-center items-center text-slate-50	">
      <div className="w-full mx-auto max-w-[600px]">
        <h1 className="text-6xl mb-4">AI powered Journal.</h1>
        <p className="text-3xl test-white mb-8">
          {" "}
          Track your routine. AI take care rest.
        </p>
        <Link href={href}>
          <button className="bg-blue-600 px-4 py-2 rounded-lg">
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
}
