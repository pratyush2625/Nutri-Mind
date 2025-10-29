import { NutritionPlannerClient } from '@/components/dashboard/NutritionPlannerClient';

export default function PlannerPage() {
    return (
        <div>
            <div className="mb-8 space-y-2">
                <h1 className="text-3xl font-headline font-bold tracking-tight">
                    AI Nutrition Planner
                </h1>
                <p className="text-muted-foreground">
                    Adjust your daily nutrition goals based on your mood and activity level.
                </p>
            </div>
            <NutritionPlannerClient />
        </div>
    );
}
