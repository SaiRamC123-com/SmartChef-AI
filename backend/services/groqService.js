 const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateRecipes = async (ingredients, goal, servings) => {
  const prompt = `You are a professional chef AI. Generate exactly 3 recipes.

User has these ingredients: ${ingredients.join(", ")}
Servings: ${servings}
Health goal: ${goal}

You MUST respond with ONLY this JSON structure, no extra text:

{
  "recipes": [
    {
      "id": "1",
      "name": "Recipe Name",
      "description": "Short description",
      "prepTime": "10 mins",
      "cookTime": "20 mins",
      "difficulty": "Easy",
      "servings": ${servings},
      "ingredients": [
        { "name": "Chicken", "amount": "500g" },
        { "name": "Oil", "amount": "2 tbsp (30ml)" },
        { "name": "Salt", "amount": "1 tsp (5g)" }
      ],
      "steps": [
        {
          "stepNumber": 1,
          "title": "Prepare ingredients",
          "instruction": "Cut 500g chicken into 2cm cubes. Season with 1 tsp salt and mix well.",
          "duration": 5,
          "tip": "Equal sized pieces cook evenly"
        },
        {
          "stepNumber": 2,
          "title": "Cook chicken",
          "instruction": "Heat 2 tbsp oil in pan at 180°C. Add chicken pieces and cook for 8 minutes turning every 2 minutes until golden brown.",
          "duration": 8,
          "tip": "Do not overcrowd the pan"
        }
      ],
      "nutrition": {
        "calories": 450,
        "protein": "35g",
        "carbs": "20g",
        "fat": "15g",
        "fiber": "3g"
      }
    }
  ]
}

STRICT RULES:
- Use ONLY the ingredients the user listed
- Every ingredient MUST have exact gram/kg/ml/tbsp amount for ${servings} servings
- Every step MUST have stepNumber, title, instruction, duration (in minutes), tip
- instruction must be detailed with exact amounts and temperatures
- nutrition must have calories as number, others as strings with g unit
- Return ONLY valid JSON. No markdown, no explanation, no extra text before or after`;

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const result = await model.generateContent(prompt);
const text = result.response.text();
  console.log("Raw AI response:", text.substring(0, 500));
  
  const clean = text.replace(/```json/g, "").replace(/```/g, "").trim();
  
  let parsed;
  try {
    parsed = JSON.parse(clean);
  } catch (e) {
    console.error("JSON parse failed:", e.message);
    // Try to extract JSON from response
    const match = clean.match(/\{[\s\S]*\}/);
    if (match) {
      parsed = JSON.parse(match[0]);
    } else {
      throw new Error("Could not parse AI response as JSON");
    }
  }

  console.log("Parsed recipes count:", parsed.recipes?.length);
  console.log("First recipe steps:", parsed.recipes?.[0]?.steps?.length);
  console.log("First recipe ingredients:", parsed.recipes?.[0]?.ingredients?.length);

  return parsed;
};

module.exports = { generateRecipes };