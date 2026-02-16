import { useInternetIdentity } from './hooks/useInternetIdentity';
import LandingPage from './pages/LandingPage';
import CreatorDashboard from './pages/CreatorDashboard';
import { ErrorBoundary } from './features/errors/ErrorBoundary';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from 'next-themes';

export default function App() {
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <ErrorBoundary>
        {isAuthenticated ? <CreatorDashboard /> : <LandingPage />}
      </ErrorBoundary>
      <Toaster />
    </ThemeProvider>
  );
}
