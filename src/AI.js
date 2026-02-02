// import { HfInference } from "@huggingface/inference";

// // ✅ browser-safe env access
// // const hf = new HfInference(import.meta.env.VITE_HF_ACCESS_TOKEN);
// import { HF_ACCESS_TOKEN } from "../token.env";
// const hf = new HfInference(HF_ACCESS_TOKEN);
// console.log("HF token:", import.meta.env.VITE_HF_ACCESS_TOKEN);

// const SYSTEM_PROMPT = `
// You are an assistant that receives a list of ingredients and suggests a recipe.
// Format your response in markdown.
// `;      

// export async function getRecipeFromMistral(ingredientsArr) {
//   try {
//     const response = await hf.chatCompletion({
//       model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
//       messages: [
//         { role: "system", content: SYSTEM_PROMPT },
//         {
//           role: "user",
//           content: `I have ${ingredientsArr.join(", ")}. Please give me a recipe.`,
//         },
//       ],
//       max_tokens: 1024,
//     });

//     return response.choices[0].message.content;
//   } catch (err) {
//     console.error(err);
//     return "Error generating recipe.";
//   }
// }
