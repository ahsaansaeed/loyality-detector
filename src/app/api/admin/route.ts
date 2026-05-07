import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/lib/models/User";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const pass = searchParams.get("password");

    if (pass !== ADMIN_PASSWORD) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const allUsers = await User.find({}).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: allUsers });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const pass = searchParams.get("password");
    const id = searchParams.get("id");

    if (pass !== ADMIN_PASSWORD) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    if (!id) {
      return NextResponse.json({ success: false, message: "ID required" }, { status: 400 });
    }

    await dbConnect();
    await User.findByIdAndDelete(id);

    return NextResponse.json({ success: true, message: "Deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
