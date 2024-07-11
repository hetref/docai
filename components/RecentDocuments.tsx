import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { BookText } from "lucide-react";
import { db } from "@/app/utils/db";

const RecentDocuments = async () => {
  const { userId } = auth();

  if (!userId) {
    return null;
  }

  const userDocuments = await db.document.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="py-6">
      <h1 className="font-medium text-sm mb-4">Recent Document</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 2xl:grid-cols-8 text-center gap-6">
        {userDocuments.length > 0 &&
          userDocuments.map((document) => (
            <div key={document.id} className="w-full">
              <Link href={`/document/${document.id}`}>
                <Card className="hover:border hover:border-blue-500 hover:cursor-pointer">
                  <CardHeader></CardHeader>
                  <CardContent className="flex justify-center mx-auto">
                    <BookText size={60} />
                  </CardContent>
                  <CardFooter></CardFooter>
                </Card>
              </Link>
              {/* I want the title of the document to be of at max 16 letters */}
              <p className="text-sm mt-2 text-center">
                {document?.title && document?.title.length > 60
                  ? document?.title.slice(0, 16) + "..."
                  : document.title}
              </p>
            </div>
          ))}
      </div>
      {userDocuments.length === 0 && (
        <p className="text-sm">
          Once you start writing your recent document will go here...
        </p>
      )}
    </div>
  );
};

export default RecentDocuments;
