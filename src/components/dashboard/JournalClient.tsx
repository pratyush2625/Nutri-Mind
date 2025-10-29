'use client';

import { useState } from 'react';
import { getMoodAndFood } from '@/app/actions';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Lightbulb, Smile, Frown, Meh, Utensils, Sparkles, Brain, Leaf, Clock } from 'lucide-react';
import type { MoodBasedFoodRecommendationOutput } from '@/ai/flows/mood-based-food-recommendation';
import { useJournalHistory } from '@/context/JournalHistoryContext';

const MoodIcon = ({ mood }: { mood: string }) => {
  const lowerMood = mood.toLowerCase();
  if (lowerMood.includes('happy') || lowerMood.includes('joy') || lowerMood.includes('positive')) {
    return <Smile className="w-12 h-12 text-green-500" />;
  }
  if (lowerMood.includes('sad') || lowerMood.includes('negative') || lowerMood.includes('depressed')) {
    return <Frown className="w-12 h-12 text-blue-500" />;
  }
  return <Meh className="w-12 h-12 text-yellow-500" />;
};


export function JournalClient() {
  const [journalEntry, setJournalEntry] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<MoodBasedFoodRecommendationOutput | null>(null);
  const { toast } = useToast();
  const { addEntry } = useJournalHistory();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setResult(null);

    const response = await getMoodAndFood(journalEntry);

    if (response.error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: response.error,
      });
    } else if (response.data) {
      setResult(response.data);
      addEntry({
        id: new Date().toISOString(),
        entry: journalEntry,
        timestamp: new Date().toISOString(),
        mood: response.data.mood,
        foodRecommendations: response.data.foodRecommendations,
      })
    }

    setIsLoading(false);
  };

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline">
            <Lightbulb className="w-5 h-5 text-primary" />
            Your Journal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Textarea
              placeholder="Start writing here... the more detail, the better the analysis."
              value={journalEntry}
              onChange={(e) => setJournalEntry(e.target.value)}
              rows={10}
              className="resize-none"
              disabled={isLoading}
            />
            <Button type="submit" className="w-full" disabled={isLoading || !journalEntry}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Analyze My Mood
            </Button>
          </form>
        </CardContent>
      </Card>
      
      <div className="space-y-8">
        {isLoading && (
            <Card className="flex flex-col items-center justify-center p-8 min-h-[300px] animate-pulse">
                <Sparkles className="w-16 h-16 text-primary mb-4" />
                <p className="text-muted-foreground">Analyzing your entry...</p>
            </Card>
        )}
        {result && (
          <>
            <Card className="shadow-lg animate-fade-in">
              <CardHeader className="text-center">
                <CardTitle className="font-headline">Your Mood</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center gap-4">
                <MoodIcon mood={result.mood} />
                <p className="text-2xl font-bold capitalize text-foreground">{result.mood}</p>
              </CardContent>
            </Card>

            <Card className="shadow-lg animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline">
                    <Utensils className="w-5 h-5 text-primary"/>
                    Food Recommendations Dashboard
                </CardTitle>
                <CardDescription>
                    AI-powered insights for your suggested foods.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {result.foodRecommendations.map((food, index) => (
                    <AccordionItem value={`item-${index}`} key={index}>
                      <AccordionTrigger className="font-medium text-base">{food.name}</AccordionTrigger>
                      <AccordionContent className="space-y-4 pt-2 text-muted-foreground">
                        <div className="flex items-start gap-3">
                            <Brain className="w-5 h-5 text-primary mt-1" />
                            <div>
                                <h4 className="font-semibold text-foreground">Mood Support</h4>
                                <p>{food.moodSupport}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Leaf className="w-5 h-5 text-primary mt-1" />
                            <div>
                                <h4 className="font-semibold text-foreground">Health Benefits</h4>
                                <p>{food.healthBenefits}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Clock className="w-5 h-5 text-primary mt-1" />
                            <div>
                                <h4 className="font-semibold text-foreground">Best Time to Eat</h4>
                                <p>{food.bestTimeToEat}</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Utensils className="w-5 h-5 text-primary mt-1" />
                            <div>
                                <h4 className="font-semibold text-foreground">Nutritional Info</h4>
                                <p>{food.nutritionalValues}</p>
                            </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
