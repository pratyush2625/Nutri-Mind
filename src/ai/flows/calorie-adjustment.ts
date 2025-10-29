'use server';
/**
 * @fileOverview Adjusts the user’s daily calorie and macronutrient goals depending on their mood and activity level.
 *
 * - adjustCalorieGoals - A function that handles the calorie adjustment process.
 * - CalorieAdjustmentInput - The input type for the adjustCalorieGoals function.
 * - CalorieAdjustmentOutput - The return type for the adjustCalorieGoals function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CalorieAdjustmentInputSchema = z.object({
  mood: z.string().describe('The current mood of the user.'),
  activityLevel: z.string().describe('The activity level of the user (e.g., sedentary, light, moderate, active).'),
  currentCalories: z.number().describe('The current daily calorie goal of the user.'),
  currentProtein: z.number().describe('The current daily protein goal of the user, in grams.'),
  currentCarbs: z.number().describe('The current daily carbohydrate goal of the user, in grams.'),
  currentFat: z.number().describe('The current daily fat goal of the user, in grams.'),
});
export type CalorieAdjustmentInput = z.infer<typeof CalorieAdjustmentInputSchema>;

const CalorieAdjustmentOutputSchema = z.object({
  adjustedCalories: z.number().describe('The adjusted daily calorie goal for the user.'),
  adjustedProtein: z.number().describe('The adjusted daily protein goal for the user, in grams.'),
  adjustedCarbs: z.number().describe('The adjusted daily carbohydrate goal for the user, in grams.'),
  adjustedFat: z.number().describe('The adjusted daily fat goal for the user, in grams.'),
  reasoning: z.string().describe('The reasoning behind the calorie and macronutrient adjustments.'),
});
export type CalorieAdjustmentOutput = z.infer<typeof CalorieAdjustmentOutputSchema>;

export async function adjustCalorieGoals(input: CalorieAdjustmentInput): Promise<CalorieAdjustmentOutput> {
  return adjustCalorieGoalsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'adjustCalorieGoalsPrompt',
  input: {schema: CalorieAdjustmentInputSchema},
  output: {schema: CalorieAdjustmentOutputSchema},
  prompt: `You are an expert nutritionist who adjusts daily calorie and macronutrient goals based on a user's mood and activity level.

  Based on the user's mood ({{{mood}}}) and activity level ({{{activityLevel}}}), adjust their calorie and macronutrient goals.

  Here are the user's current goals:
  - Calories: {{{currentCalories}}}
  - Protein: {{{currentProtein}}}g
  - Carbs: {{{currentCarbs}}}g
  - Fat: {{{currentFat}}}g

  Provide the adjusted calorie and macronutrient goals, along with a clear explanation of why you made these adjustments. Ensure that the adjusted values are numbers, do not add units such as 'g' or 'calories'.

  Adhere to the output schema strictly.
  `,
});

const adjustCalorieGoalsFlow = ai.defineFlow(
  {
    name: 'adjustCalorieGoalsFlow',
    inputSchema: CalorieAdjustmentInputSchema,
    outputSchema: CalorieAdjustmentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
