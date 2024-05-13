"use server";

import OpenAI from "openai";

export async function generateTrivia(topic, count) {
  try {

    // console.log(topic);

    const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY })

    // const prompt_text = `Generate ${count} short multi-choice question about topic: ${topic} with four options and one correct answer and do not repeat same question. \n`;

    const prompt_text = `Generate a short multiple-choice trivia quiz with ${count} questions and 4 options for each question about ${topic},
    the output should be expressed in JSON as an array of questions, each question should be an object with key named "question", "options" and "correctOption" \n`;

    const completion = await openai.completions.create({
      model: "gpt-3.5-turbo-instruct",
      prompt: prompt_text,
      max_tokens: 2048,
      n: 1,
      top_p: 1,
      // stop: ['\n'],
      temperature: 0.5,
      frequency_penalty: 0,
      presence_penalty: 0.3
    });

    const jsonText = completion.choices[0].text.trim();
    const quiz = JSON.parse(jsonText);

    if (quiz.length > 0) {
      return {
        success: true,
        message: "Quiz Generated",
        statusCode: 201,
        data: jsonText
      }
    }
    else {
      return {
        success: false,
        message: "Something went wrong, Please try again later !",
        statusCode: 500,
      }
    }

  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: error.message,
      statusCode: 500,
      message: "Internal Server Error"
    }
  }
}