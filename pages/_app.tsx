// ...existing code...
import './globals.css';
import MainLayout from '../src/components/layout/MainLayout';
import type { AppProps } from 'next/app';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
  );
}
// ...existing code...
