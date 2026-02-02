export const getRecipeFromGroq = async (ingrediants) => {
  try {
    const response = await fetch("/api/getrecipe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ingredients: ingrediants,
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.recipe;
  } catch (error) {
    console.error("Error fetching recipe:", error);
    throw error;
  }
};