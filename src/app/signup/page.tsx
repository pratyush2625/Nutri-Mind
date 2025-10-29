import Link from 'next/link';
import { SignUpForm } from '@/components/auth/SignUpForm';
import { Logo } from '@/components/Logo';

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-secondary/50 p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
            <Logo />
        </div>
        <SignUpForm />
        <p className="mt-8 text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link href="/login" className="font-medium text-primary hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
