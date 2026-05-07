import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/lib/models/User";

export async function GET(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const rollNumber = searchParams.get("roll");

    if (!rollNumber) {
      return NextResponse.json(
        { success: false, message: "Roll number is required" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ rollNumber });

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Result not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        name: user.name,
        rollNumber: user.rollNumber,
        snakeScore: user.snakeScore,
        loyaltyScore: user.loyaltyScore,
        result: user.result,
        createdAt: user.createdAt,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
