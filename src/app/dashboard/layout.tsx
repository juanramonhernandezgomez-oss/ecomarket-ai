import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard | ecomarket-ai',
  description: 'Tu panel de control financiero con IA',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
