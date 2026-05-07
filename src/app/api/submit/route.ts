import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/lib/models/User";
import { questions } from "@/lib/questions";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { name, rollNumber, answers } = await req.json();

    if (!name || !rollNumber || !answers || answers.length !== questions.length) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if roll number already exists
    const existingUser = await User.findOne({ rollNumber });
    if (existingUser) {
      return NextResponse.json(
        { 
          success: false, 
          message: "Roll number already submitted", 
          rollNumber,
          existingResult: existingUser.result 
        },
        { status: 409 }
      );
    }

    // Calculate scores
    let snakeScore = 0;
    let loyaltyScore = 0;

    answers.forEach((ansIndex: number, qIndex: number) => {
      const option = questions[qIndex].options[ansIndex];
      if (option.type === "snake") snakeScore += option.points;
      if (option.type === "slight_snake") snakeScore += option.points;
      if (option.type === "loyal") loyaltyScore += option.points;
    });

    const result = snakeScore > loyaltyScore ? "Certified Snake 😈" : "Loyal Legend 💙";

    // Save to database
    const newUser = await User.create({
      name,
      rollNumber,
      answers,
      snakeScore,
      loyaltyScore,
      result,
    });

    return NextResponse.json(
      { 
        success: true, 
        data: {
          name: newUser.name,
          rollNumber: newUser.rollNumber,
          snakeScore: newUser.snakeScore,
          loyaltyScore: newUser.loyaltyScore,
          result: newUser.result,
        }
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Submission error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
