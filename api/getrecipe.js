import Groq from "groq-sdk";

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page
no tables just lists and headings.
make ingredients in list format
make headings bold 
add emojis relevant to the recipe
`;

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  const { ingredients } = req.body;

  // Check if API key exists
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    console.error("GROQ_API_KEY is missing!");
    return res.status(500).json({ error: "API key is missing" });
  }

  try {
    const groq = new Groq({
      apiKey: apiKey,
    });

    const response = await groq.chat.completions.create({
      model: "mixtral-8x7b-32768",
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
    return res
      .status(500)
      .json({ error: "Failed to generate recipe: " + err.message });
  }
}
