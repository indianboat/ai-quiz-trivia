import { NextResponse, NextRequest } from "next/server";
import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";

export const dynamic = 'force-dynamic' // defaults to auto;

export async function POST(request) {
  try {

    const { topic, count } = await request.json();

    const prompt_text = `Generate a short multiple-choice trivia quiz with ${count} questions and 4 options for each question about ${topic},
    the output should be expressed in JSON as an array of questions, each question should be an object with key named "question", "options" and "correctOption" \n`;

    const { object: quiz } = await generateObject({
      model: openai("gpt-4o-2024-05-13"),
      prompt: prompt_text,
      schema: z.object({
        quiz: z.array(
          z.object({
            question: z.string(),
            options: z.array(z.string()),
            correctOption: z.string()
          })
        )
      })
    });

    if (quiz) {
      return NextResponse.json({
        success: true,
        message: "Quiz Generated",
        data: quiz
      }, { status: 200 })
    }

  } catch (error) {

    console.log(error);

    return NextResponse.json({
      success: false,
      message: "Internal Server Error",
    }, {
      status: 500
    })
  }
}