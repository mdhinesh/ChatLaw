import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import Qa from "@/models/qa"; // Import the Qa model
import { NextRequest, NextResponse } from "next/server";
import { parse } from 'url';
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { question, answer, userId } = reqBody;

    // Create a new QA document
    const qa = new Qa({
      question,
      answer,
      userid: userId,
    });

    await qa.save(); // Save the QA document

    // Update the User's qa field with the new QA document's reference
    const user = await User.findOne({ _id: userId });
    user.qa.push(qa._id); // Push the QA document's id to the user's qa field
    await user.save();

    return NextResponse.json({
      message: "QA created and linked to the user",
      success: true,
      qaId: qa._id,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

const getDataFromToken = (request: NextRequest) => {
    try {
        const token = request.cookies.get("token")?.value || '';
        const decodedToken:any = jwt.verify(token, process.env.TOKEN_SECRET!);
        return decodedToken.id;
    } catch (error: any) {
        throw new Error(error.message);
    }

}

export async function GET(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);
    
        // Find the user
        const user = await User.findOne({ _id: userId }).populate("qa"); // Populate the user's qa field with the QA documents

        console.log("user:", user);

        return NextResponse.json({
            message: "User's QA documents",
            success: true,
            user: user,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
