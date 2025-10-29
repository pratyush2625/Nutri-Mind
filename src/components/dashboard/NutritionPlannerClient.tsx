'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { getCalorieAdjustment } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Sparkles, Zap, Brain, Fish, Wheat } from 'lucide-react';

const formSchema = z.object({
    mood: z.string().min(1, 'Please select a mood.'),
    activityLevel: z.string().min(1, 'Please select an activity level.'),
    currentCalories: z.coerce.number().min(0, 'Calories must be a positive number.'),
    currentProtein: z.coerce.number().min(0, 'Protein must be a positive number.'),
    currentCarbs: z.coerce.number().min(0, 'Carbs must be a positive number.'),
    currentFat: z.coerce.number().min(0, 'Fat must be a positive number.'),
});

type FormValues = z.infer<typeof formSchema>;

type AdjustmentResult = {
    adjustedCalories: number;
    adjustedProtein: number;
    adjustedCarbs: number;
    adjustedFat: number;
    reasoning: string;
};

export function NutritionPlannerClient() {
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<AdjustmentResult | null>(null);
    const { toast } = useToast();

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            mood: 'Neutral',
            activityLevel: 'Sedentary',
            currentCalories: 2000,
            currentProtein: 150,
            currentCarbs: 200,
            currentFat: 60,
        },
    });

    const onSubmit = async (values: FormValues) => {
        setIsLoading(true);
        setResult(null);

        const response = await getCalorieAdjustment(values);

        if (response.error) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: response.error,
            });
        } else if(response.data) {
            setResult(response.data);
        }
        setIsLoading(false);
    };

    return (
        <div className="grid gap-8 md:grid-cols-2">
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="font-headline">Your Current Goals</CardTitle>
                    <CardDescription>Enter your current state and nutrition targets.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <FormField control={form.control} name="mood" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Current Mood</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl><SelectTrigger><SelectValue placeholder="Select mood" /></SelectTrigger></FormControl>
                                            <SelectContent>
                                                <SelectItem value="Happy">Happy</SelectItem>
                                                <SelectItem value="Sad">Sad</SelectItem>
                                                <SelectItem value="Angry">Angry</SelectItem>
                                                <SelectItem value="Neutral">Neutral</SelectItem>
                                                <SelectItem value="Stressed">Stressed</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}/>
                                <FormField control={form.control} name="activityLevel" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Activity Level</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl><SelectTrigger><SelectValue placeholder="Select activity" /></SelectTrigger></FormControl>
                                            <SelectContent>
                                                <SelectItem value="Sedentary">Sedentary</SelectItem>
                                                <SelectItem value="Light">Light</SelectItem>
                                                <SelectItem value="Moderate">Moderate</SelectItem>
                                                <SelectItem value="Active">Active</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}/>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                <FormField control={form.control} name="currentCalories" render={({ field }) => (<FormItem><FormLabel>Calories</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                                <FormField control={form.control} name="currentProtein" render={({ field }) => (<FormItem><FormLabel>Protein (g)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                                <FormField control={form.control} name="currentCarbs" render={({ field }) => (<FormItem><FormLabel>Carbs (g)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                                <FormField control={form.control} name="currentFat" render={({ field }) => (<FormItem><FormLabel>Fat (g)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                            </div>
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Adjust My Goals
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>

            <div className="space-y-8">
            {isLoading && (
                 <Card className="flex flex-col items-center justify-center p-8 min-h-[300px] animate-pulse">
                     <Sparkles className="w-16 h-16 text-primary mb-4" />
                     <p className="text-muted-foreground">Calculating your new goals...</p>
                 </Card>
            )}
            {result && (
                <>
                    <Card className="shadow-lg animate-fade-in">
                        <CardHeader>
                            <CardTitle className="font-headline">Your Adjusted Goals</CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                            <div className="flex flex-col items-center p-4 bg-secondary rounded-lg">
                                <Zap className="w-6 h-6 mb-2 text-primary"/>
                                <span className="text-2xl font-bold">{Math.round(result.adjustedCalories)}</span>
                                <span className="text-sm text-muted-foreground">Calories</span>
                            </div>
                            <div className="flex flex-col items-center p-4 bg-secondary rounded-lg">
                                <Fish className="w-6 h-6 mb-2 text-primary"/>
                                <span className="text-2xl font-bold">{Math.round(result.adjustedProtein)}g</span>
                                <span className="text-sm text-muted-foreground">Protein</span>
                            </div>
                             <div className="flex flex-col items-center p-4 bg-secondary rounded-lg">
                                <Wheat className="w-6 h-6 mb-2 text-primary"/>
                                <span className="text-2xl font-bold">{Math.round(result.adjustedCarbs)}g</span>
                                <span className="text-sm text-muted-foreground">Carbs</span>
                            </div>
                             <div className="flex flex-col items-center p-4 bg-secondary rounded-lg">
                                <Brain className="w-6 h-6 mb-2 text-primary"/>
                                <span className="text-2xl font-bold">{Math.round(result.adjustedFat)}g</span>
                                <span className="text-sm text-muted-foreground">Fat</span>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="shadow-lg animate-fade-in">
                        <CardHeader>
                            <CardTitle className="font-headline">AI Reasoning</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">{result.reasoning}</p>
                        </CardContent>
                    </Card>
                </>
            )}
            </div>
        </div>
    );
}
