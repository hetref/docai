import { db } from "@/app/utils/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// TODO: Get Document using the id
export async function GET({ params }: { params: { docId: string } }) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("User Not Authenticated", { status: 401 });
    }

    // const { title, description } = await req.json();

    const getDocument = await db.document.findUnique({
      where: {
        id: params.docId,
        userId: userId,
      },
    });

    return new NextResponse(JSON.stringify(getDocument), { status: 200 });
  } catch (error) {
    return new NextResponse("GET Error", { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { docId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("User Not Authenticated", { status: 401 });
    }

    const { title, description } = await req.json();

    const updateDocument = await db.document.update({
      where: {
        id: params.docId,
        userId: userId,
      },
      data: {
        title: title,
        description: description,
      },
    });

    return new NextResponse("Succesfully updated data", { status: 200 });
  } catch (error) {
    return new NextResponse("PUT Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { docId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("User Not Authenticated", { status: 401 });
    }

    const deleteDocument = await db.document.delete({
      where: {
        id: params.docId,
        userId: userId,
      },
    });
    return new NextResponse("Succesfully Deleted data", { status: 200 });
  } catch (error) {
    return new NextResponse("DELETE Error", { status: 500 });
  }
}
