import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, HeartPulse, BrainCircuit, Pizza } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const heroImage = PlaceHolderImages.find(p => p.id === 'landing-hero');

const features = [
  {
    icon: <BrainCircuit className="w-8 h-8 text-primary" />,
    title: 'AI-Powered Mood Analysis',
    description: 'Our advanced AI analyzes your journal entries to understand your emotional state.',
  },
  {
    icon: <Pizza className="w-8 h-8 text-primary" />,
    title: 'Personalized Food Suggestions',
    description: 'Get food recommendations tailored to improve your mood and well-being.',
  },
  {
    icon: <HeartPulse className="w-8 h-8 text-primary" />,
    title: 'Holistic Nutrition Planning',
    description: 'Adjust your calorie and macro goals based on your mood and activity levels.',
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Logo />
        <nav className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/login">Log In</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Get Started</Link>
          </Button>
        </nav>
      </header>
      <main className="flex-grow">
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-headline font-bold text-foreground">
                Eat right for your mind.
              </h1>
              <p className="text-lg text-muted-foreground">
                NutriMind is your personal guide to emotional well-being through nutrition. Understand your moods and get AI-driven food suggestions to feel your best, every day.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link href="/signup">Start Your Journey</Link>
                </Button>
              </div>
            </div>
            <div className="relative h-80 w-full md:h-full rounded-lg overflow-hidden shadow-2xl">
              {heroImage && (
                <Image
                  src={heroImage.imageUrl}
                  alt={heroImage.description}
                  fill
                  style={{ objectFit: 'cover' }}
                  data-ai-hint={heroImage.imageHint}
                  priority
                />
              )}
            </div>
          </div>
        </section>

        <section id="features" className="bg-secondary py-20 md:py-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-headline font-bold">A smarter way to approach wellness</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Discover the connection between your mind and your meals.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="bg-card text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardHeader className="items-center">
                    <div className="bg-secondary rounded-full p-4 mb-4">
                      {feature.icon}
                    </div>
                    <CardTitle className="font-headline text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="bg-accent/50 rounded-lg p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-headline font-bold">Ready to transform your well-being?</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Join NutriMind today and start aligning your nutrition with your emotional health. It's free to get started.
            </p>
            <Button size="lg" className="mt-8" asChild>
              <Link href="/signup">Create Your Account Now</Link>
            </Button>
          </div>
        </section>
      </main>
      <footer className="bg-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} NutriMind. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
