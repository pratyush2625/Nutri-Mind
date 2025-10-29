import type { FoodDetail } from '@/ai/flows/mood-based-food-recommendation';

export type JournalEntry = {
  id: string;
  timestamp: string;
  entry: string;
  mood: string;
  foodRecommendations: FoodDetail[];
};

export type FoodDetail = FoodDetail;
