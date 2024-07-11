import { db } from "@/app/utils/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();

    if (!userId)
      return new NextResponse("User Not Authenticated!", { status: 401 });

    const { title, description } = await req.json();
    const createNewDoc = await db.document.create({
      data: {
        userId,
        title,
        description,
      },
    });

    revalidatePath("/");
    return NextResponse.json(createNewDoc, { status: 200 });

    // Create the document here
  } catch (error) {
    return new NextResponse("Error Creating Document", { status: 500 });
  }
}
