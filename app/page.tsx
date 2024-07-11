import NewDocument from "@/components/NewDocument";
import RecentDocuments from "@/components/RecentDocuments";
import { auth } from "@clerk/nextjs/server";

export default function Home() {
  const { userId } = auth();

  if (!userId)
    return (
      <div
        className="w-full flex justify-center items-center"
        style={{ height: "calc(100svh - 100px)" }}
      >
        <h2>Please sign in before getting started</h2>
      </div>
    );

  return (
    <div className="flex justify-center items-center">
      <div className="max-w-7xl w-full px-6">
        {/* New Document */}
        <NewDocument />

        {/* Recent Document */}
        <RecentDocuments />
      </div>
    </div>
  );
}
