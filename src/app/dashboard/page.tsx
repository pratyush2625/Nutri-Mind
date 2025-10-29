import { JournalClient } from '@/components/dashboard/JournalClient';

export default function DashboardPage() {
  return (
    <div>
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-headline font-bold tracking-tight">
          How are you feeling today?
        </h1>
        <p className="text-muted-foreground">
          Write a journal entry to analyze your mood and get personalized food recommendations.
        </p>
      </div>
      <JournalClient />
    </div>
  );
}
