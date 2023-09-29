import { currentUser } from "@clerk/nextjs";
import { prisma } from "@/utils/db";
import { redirect } from "next/navigation";

const createNewUser = async () => {
  const user = await currentUser();

  const match = await prisma.user.findUnique({
    where: {
      clerkId: user?.id as string,
    },
  });

  if (!match) {
    await prisma.user.create({
      data: {
        clerkId: user.id,
        email: user?.emailAddresses[0].emailAddress,
      },
    });
  }

  redirect("/journal");
};

const newUser = async () => {
  await createNewUser();
  return (
    <h1 className="w-screen h-screen flex justify-center items-center">
      Loading...
    </h1>
  );
};

export default newUser;
