import type { Metadata } from 'next';
import { LoginForm } from '@/components/LoginForm';

export const metadata: Metadata = {
  title: 'Login | ecomarket-ai',
  description: 'Accede a tu cuenta ecomarket-ai',
};

export default function LoginPage() {
  return <LoginForm />;
}
