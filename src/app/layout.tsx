import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '../context/AuthContext';

export const metadata: Metadata = {
  title: 'Mood Recipe Finder',
  description: 'Find the perfect recipe based on your mood',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-b from-white to-recipe-yellow/10">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
} 