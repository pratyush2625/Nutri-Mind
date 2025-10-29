'use server';

/**
 * @fileOverview Analyzes user journal entries to determine their mood using AI sentiment analysis.
 *
 * - analyzeMoodFromJournal - A function that analyzes the mood from a journal entry.
 * - MoodAnalysisInput - The input type for the analyzeMoodFromJournal function.
 * - MoodAnalysisOutput - The return type for the analyzeMoodFromJournal function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MoodAnalysisInputSchema = z.object({
  journalEntry: z.string().describe('The journal entry to analyze.'),
});
export type MoodAnalysisInput = z.infer<typeof MoodAnalysisInputSchema>;

const MoodAnalysisOutputSchema = z.object({
  mood: z.string().describe('The detected mood from the journal entry.'),
  sentimentScore: z
    .number()
    .describe('A numerical score indicating the sentiment of the journal entry.'),
});
export type MoodAnalysisOutput = z.infer<typeof MoodAnalysisOutputSchema>;

export async function analyzeMoodFromJournal(
  input: MoodAnalysisInput
): Promise<MoodAnalysisOutput> {
  return analyzeMoodFromJournalFlow(input);
}

const prompt = ai.definePrompt({
  name: 'moodAnalysisPrompt',
  input: {schema: MoodAnalysisInputSchema},
  output: {schema: MoodAnalysisOutputSchema},
  prompt: `You are a sentiment analysis expert. Analyze the following journal entry and determine the user's mood. Also, provide a sentiment score between -1 (negative) and 1 (positive).\n\nJournal Entry: {{{journalEntry}}}`,
});

const analyzeMoodFromJournalFlow = ai.defineFlow(
  {
    name: 'analyzeMoodFromJournalFlow',
    inputSchema: MoodAnalysisInputSchema,
    outputSchema: MoodAnalysisOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
