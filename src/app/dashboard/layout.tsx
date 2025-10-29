import { Logo } from '@/components/Logo';
import { DashboardNav } from '@/components/dashboard/DashboardNav';
import { UserNav } from '@/components/dashboard/UserNav';
import { JournalHistoryProvider } from '@/context/JournalHistoryContext';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <JournalHistoryProvider>
      <div className="flex min-h-screen w-full flex-col">
        <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 md:px-6">
          <Logo />
          <DashboardNav className="mx-6 hidden md:flex" />
          <div className="ml-auto flex items-center gap-4">
            <UserNav />
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          {children}
        </main>
      </div>
    </JournalHistoryProvider>
  );
}
