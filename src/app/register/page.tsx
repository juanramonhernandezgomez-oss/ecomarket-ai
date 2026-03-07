import type { Metadata } from 'next';
import { RegisterForm } from '@/components/RegisterForm';

export const metadata: Metadata = {
  title: 'Registro | ecomarket-ai',
  description: 'Crea tu cuenta ecomarket-ai',
};

export default function RegisterPage() {
  return <RegisterForm />;
}
