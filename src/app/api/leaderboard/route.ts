import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/lib/models/User";

export async function GET() {
  try {
    await dbConnect();

    // Get total count
    const totalParticipants = await User.countDocuments();
    
    // Get snake vs loyal counts
    const snakesCount = await User.countDocuments({ result: "Certified Snake 😈" });
    const loyalsCount = await User.countDocuments({ result: "Loyal Legend 💙" });

    // Get top 10 snakes (highest snakeScore)
    const topSnakes = await User.find({ result: "Certified Snake 😈" })
      .sort({ snakeScore: -1, createdAt: -1 })
      .limit(10)
      .select("name rollNumber snakeScore result");

    // Get top 10 loyals (highest loyaltyScore)
    const topLoyals = await User.find({ result: "Loyal Legend 💙" })
      .sort({ loyaltyScore: -1, createdAt: -1 })
      .limit(10)
      .select("name rollNumber loyaltyScore result");

    return NextResponse.json({
      success: true,
      totalParticipants,
      stats: {
        snakesCount,
        loyalsCount,
      },
      topSnakes,
      topLoyals,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
