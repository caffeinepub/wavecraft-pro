import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import { useInternetIdentity } from './hooks/useInternetIdentity';
import LandingPage from './pages/LandingPage';
import CreatorDashboard from './pages/CreatorDashboard';
import { SharedProjectView } from './pages/SharedProjectView';
import { ErrorBoundary } from './features/errors/ErrorBoundary';
import { getUrlParameter } from './utils/urlParams';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;
  
  // Check if this is a shared project view
  const shareProjectId = getUrlParameter('share');

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <ErrorBoundary>
          {shareProjectId ? (
            <SharedProjectView />
          ) : isAuthenticated ? (
            <CreatorDashboard />
          ) : (
            <LandingPage />
          )}
          <Toaster />
        </ErrorBoundary>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
