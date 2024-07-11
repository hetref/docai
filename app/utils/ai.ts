"use server";
// import { GoogleGenerativeAI } from "@google/generative-ai";

const ai = async (title: string, description: string) => {
  try {
    let url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: title,
              },
              {
                text: description,
              },
            ],
          },
        ],
      }),
    });

    const data = await response.json();

    console.log("DATA", data, description);

    return data?.candidates[0].content.parts[0];
  } catch (error) {
    console.log("ERROR FETCHING FROM AI", error);
  }

  //   const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

  //   try {
  //     const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  //     const prompt =
  //       description +
  //       ". I need help writing about the description I provided, suggest me some ideas about the story unfolding or resume writing if resume details are provided.";

  //     const result = await model.generateContent(prompt);
  //     const response = await result.response;
  //     const code = await response.text();

  //     console.log("CODE", code);

  //     return code;
  //   } catch (error) {
  //     console.error(error);
  //   }
};

export default ai;
