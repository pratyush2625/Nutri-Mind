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
  import type { JournalEntry } from '@/lib/types';
  import { formatDate } from '@/lib/utils';
  
  const mockHistory: JournalEntry[] = [
    {
      id: '1',
      date: '2023-10-26',
      timestamp: '2023-10-26T10:00:00.000Z',
      entry: 'Felt really productive today and finished a major project. The weather was beautiful, and I went for a long walk.',
      mood: 'Happy',
      foodRecommendations: ['Dark Chocolate', 'Salmon', 'Nuts'],
    },
    {
      id: '2',
      date: '2023-10-25',
      timestamp: '2023-10-25T14:30:00.000Z',
      entry: 'Struggled to focus at work and felt a bit overwhelmed. Didn\'t sleep well last night.',
      mood: 'Sad',
      foodRecommendations: ['Oatmeal', 'Bananas', 'Lentils'],
    },
    {
      id: '3',
      date: '2023-10-24',
      timestamp: '2023-10-24T09:15:00.000Z',
      entry: 'Traffic was terrible this morning, and I had a frustrating meeting. Feeling quite irritable.',
      mood: 'Angry',
      foodRecommendations: ['Chamomile Tea', 'Avocado', 'Almonds'],
    },
    {
      id: '4',
      date: '2023-10-23',
      timestamp: '2023-10-23T18:45:00.000Z',
      entry: 'Just a regular day. Nothing special happened, but feeling content and stable.',
      mood: 'Neutral',
      foodRecommendations: ['Balanced Meal', 'Fruits', 'Vegetables'],
    },
  ];
  
  const moodVariantMap: { [key: string]: 'default' | 'secondary' | 'destructive' | 'outline' } = {
      'Happy': 'default',
      'Sad': 'secondary',
      'Angry': 'destructive',
      'Neutral': 'outline'
  }
  
  export default function HistoryPage() {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Your Wellness History</CardTitle>
          <CardDescription>
            A log of your past journal entries, moods, and food recommendations.
          </CardDescription>
        </CardHeader>
        <CardContent>
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
              {mockHistory.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{formatDate(item.timestamp)}</TableCell>
                  <TableCell className="max-w-xs truncate text-muted-foreground">{item.entry}</TableCell>
                  <TableCell>
                    <Badge variant={moodVariantMap[item.mood] || 'outline'}>{item.mood}</Badge>
                  </TableCell>
                  <TableCell>{item.foodRecommendations.join(', ')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  }
  