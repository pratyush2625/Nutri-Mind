import { config } from 'dotenv';
config();

import '@/ai/flows/mood-analysis-from-journal.ts';
import '@/ai/flows/mood-based-food-recommendation.ts';
import '@/ai/flows/calorie-adjustment.ts';