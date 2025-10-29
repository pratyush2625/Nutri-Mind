'use server';
/**
 * @fileOverview Analyzes journal entries to determine mood and recommends foods to improve it.
 *
 * - moodBasedFoodRecommendation - A function that handles the mood analysis and food recommendation process.
 * - MoodBasedFoodRecommendationInput - The input type for the moodBasedFoodRecommendation function.
 * - MoodBasedFoodRecommendationOutput - The return type for the moodBasedFoodRecommendation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MoodBasedFoodRecommendationInputSchema = z.object({
  journalEntry: z.string().describe('The user’s journal entry for mood analysis.'),
});
export type MoodBasedFoodRecommendationInput = z.infer<typeof MoodBasedFoodRecommendationInputSchema>;

const FoodDetailSchema = z.object({
  name: z.string().describe('The name of the food item.'),
  nutritionalValues: z.string().describe('Key nutritional values (e.g., Calories, Protein, Carbs, Fat).'),
  healthBenefits: z.string().describe('The primary health benefits of consuming this food.'),
  bestTimeToEat: z.string().describe('The recommended time of day to eat this food.'),
  moodSupport: z.string().describe('How this food helps support the user’s mood or energy levels.'),
});

const MoodBasedFoodRecommendationOutputSchema = z.object({
  mood: z.string().describe('The detected mood from the journal entry.'),
  foodRecommendations: z.array(FoodDetailSchema).describe('A list of detailed food recommendations to improve the user’s mood.'),
});
export type MoodBasedFoodRecommendationOutput = z.infer<typeof MoodBasedFoodRecommendationOutputSchema>;

export async function moodBasedFoodRecommendation(input: MoodBasedFoodRecommendationInput): Promise<MoodBasedFoodRecommendationOutput> {
  return moodBasedFoodRecommendationFlow(input);
}

const analyzeMoodTool = ai.defineTool({
  name: 'analyzeMood',
  description: 'Analyzes the sentiment of a text and returns the mood.',
  inputSchema: z.object({
    text: z.string().describe('The text to analyze.'),
  }),
  outputSchema: z.string().describe('The detected mood (e.g., happy, sad, angry).'),
}, async (input) => {
  // Basic implementation (replace with actual sentiment analysis logic)
  // This could involve calling an external sentiment analysis API.
  if (input.text.includes('happy')) {
    return 'happy';
  } else if (input.text.includes('sad')) {
    return 'sad';
  } else {
    return 'neutral';
  }
});

const foodRecommendationTool = ai.defineTool({
  name: 'foodRecommendation',
  description: 'Recommends foods based on a given mood.',
  inputSchema: z.object({
    mood: z.string().describe('The mood for which to recommend foods.'),
  }),
  outputSchema: z.array(z.string()).describe('A list of food recommendations.'),
}, async (input) => {
  // Basic implementation (replace with a more sophisticated recommendation system)
  switch (input.mood.toLowerCase()) {
    case 'happy':
      return ['Paneer Tikka', 'Thali', 'Masala Chai'];
    case 'sad':
      return ['Idli Sambar', 'Poha', 'Seasonal Fruits'];
    case 'angry':
      return ['Masala Chai', 'Mixed Veg Curry', 'Seasonal Fruits'];
    default:
      return ['Thali', 'Seasonal Fruits', 'Mixed Veg Curry'];
  }
});

const prompt = ai.definePrompt({
  name: 'moodBasedFoodRecommendationPrompt',
  tools: [analyzeMoodTool, foodRecommendationTool],
  input: {schema: MoodBasedFoodRecommendationInputSchema},
  output: {schema: MoodBasedFoodRecommendationOutputSchema},
  prompt: `Analyze the journal entry below to determine the user's mood.
Then, for each recommended food, provide a detailed dashboard of information including nutritional values, health benefits, best time to eat, and how it supports the mood.

Journal Entry: {{{journalEntry}}}

1.  First, use the analyzeMood tool to determine the mood.
2.  Then, use the foodRecommendation tool to get a list of food names.
3.  For each food name, generate the detailed information required by the output schema (nutritionalValues, healthBenefits, bestTimeToEat, moodSupport).
4.  Return the mood and the detailed food recommendations in the output.
`,
});

const moodBasedFoodRecommendationFlow = ai.defineFlow(
  {
    name: 'moodBasedFoodRecommendationFlow',
    inputSchema: MoodBasedFoodRecommendationInputSchema,
    outputSchema: MoodBasedFoodRecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
