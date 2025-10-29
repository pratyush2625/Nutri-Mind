'use client';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from '@/components/ui/card';
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from '@/components/ui/table';
  import { Badge } from '@/components/ui/badge';
  import { formatDate } from '@/lib/utils';
  import { useJournalHistory } from '@/context/JournalHistoryContext';
  
  const moodVariantMap: { [key: string]: 'default' | 'secondary' | 'destructive' | 'outline' } = {
      'Happy': 'default',
      'Sad': 'secondary',
      'Angry': 'destructive',
      'Neutral': 'outline'
  }
  
  export default function HistoryPage() {
    const { history } = useJournalHistory();
  
    return (
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Your Wellness History</CardTitle>
          <CardDescription>
            A log of your past journal entries, moods, and food recommendations.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {history.length === 0 ? (
             <div className="text-center py-12">
                <p className="text-muted-foreground">You don&apos;t have any journal entries yet.</p>
                <p className="text-sm text-muted-foreground">Go to the Journal tab to write your first one.</p>
             </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[160px]">Date</TableHead>
                  <TableHead>Journal Entry</TableHead>
                  <TableHead className="w-[100px]">Mood</TableHead>
                  <TableHead>Recommendations</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {history.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{formatDate(item.timestamp)}</TableCell>
                    <TableCell className="max-w-xs truncate text-muted-foreground">{item.entry}</TableCell>
                    <TableCell>
                      <Badge variant={moodVariantMap[item.mood] || 'outline'}>{item.mood}</Badge>
                    </TableCell>
                    <TableCell>{item.foodRecommendations.map(f => f.name).join(', ')}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    );
  }
  