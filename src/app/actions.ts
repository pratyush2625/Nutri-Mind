'use server';

import { moodBasedFoodRecommendation } from '@/ai/flows/mood-based-food-recommendation';
import { adjustCalorieGoals } from '@/ai/flows/calorie-adjustment';

export async function getMoodAndFood(journalEntry: string) {
  try {
    if (!journalEntry.trim()) {
      return { error: 'Journal entry cannot be empty.' };
    }
    const result = await moodBasedFoodRecommendation({ journalEntry });
    return { data: result };
  } catch (error) {
    console.error(error);
    return { error: 'Failed to analyze mood and recommend food.' };
  }
}

export type CalorieAdjustmentServerInput = {
    mood: string;
    activityLevel: string;
    currentCalories: number;
    currentProtein: number;
    currentCarbs: number;
    currentFat: number;
}

export async function getCalorieAdjustment(input: CalorieAdjustmentServerInput) {
    try {
        const result = await adjustCalorieGoals(input);
        return { data: result };
    } catch (error) {
        console.error(error);
        return { error: 'Failed to adjust calorie goals.' };
    }
}
