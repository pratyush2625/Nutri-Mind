'use client';

import { useState } from 'react';
import { getMoodAndFood } from '@/app/actions';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Lightbulb, Smile, Frown, Meh, Utensils, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

type MoodAndFoodData = {
  mood: string;
  foodRecommendations: string[];
};

const foodImages = PlaceHolderImages.filter(p => p.id.startsWith('food-recommendation'));

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
  const [result, setResult] = useState<MoodAndFoodData | null>(null);
  const { toast } = useToast();

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
                    Food Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {result.foodRecommendations.map((food, index) => (
                    <div key={index} className="flex flex-col items-center text-center">
                        <div className="relative w-full h-32 rounded-lg overflow-hidden mb-2">
                            <Image src={foodImages[index % foodImages.length].imageUrl} alt={food} layout="fill" objectFit="cover" data-ai-hint={foodImages[index % foodImages.length].imageHint}/>
                        </div>
                        <p className="font-medium text-sm">{food}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
