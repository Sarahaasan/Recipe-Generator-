import Groq from "groq-sdk";


const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
  // dangerouslyAllowBrowser: true,
});

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page
no tables just lists and headings.
make ingredients in list format
make headings bold 
add emojis relevant to the recipe
`
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  const { ingredients } = req.body;

  try {
    const response = await groq.chat.completions.create({
      model: "openai/gpt-oss-120b",
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: `I have these ingredients: ${ingredients.join(", ")}. Please suggest a recipe.`,
        },
      ],
      max_tokens: 1024,
    });

    return res.status(200).json({ recipe: response.choices[0].message.content });
  } catch (err) {
    console.error("Error:", err.message);
    return res.status(500).json({ error: "Failed to generate recipe: " + err.message });
  }
}