import Link from 'next/link';
import { LoginForm } from '@/components/auth/LoginForm';
import { Logo } from '@/components/Logo';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-secondary/50 p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
            <Logo />
        </div>
        <LoginForm />
        <p className="mt-8 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="font-medium text-primary hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
