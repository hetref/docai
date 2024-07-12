import { db } from "@/app/utils/db";
import EditorBlock from "@/components/EditorBlock";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

interface DocumentProps {
  id: string;
}

const Document = async ({ params }: { params: DocumentProps }) => {
  const { userId } = auth();

  if (!userId) redirect("/");

  const getDocument = await db.document.findUnique({
    where: {
      id: params.id,
    },
  });

  console.log("DOCUMENT", getDocument);

  return (
    <div className="flex justify-center w-full items-center">
      <div className="max-w-7xl w-full px-8 py-8">
        <EditorBlock document={getDocument} />
      </div>
    </div>
  );
};

export default Document;
