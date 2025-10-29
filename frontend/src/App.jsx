import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/queryClient';
import { ThemeProvider } from './contexts/ThemeContext';
import { ScrollToTop } from './components/ScrollToTop';
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { Articles } from './pages/Articles';
import { About } from './pages/About';
import { Privacy } from './pages/Privacy';
import { Terms } from './pages/Terms';
import { Contact } from './pages/Contact';
import { ApiDocs } from './pages/ApiDocs';
import { Roadmap } from './pages/Roadmap';
import { Support } from './pages/Support';

function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/api-docs" element={<ApiDocs />} />
            <Route path="/roadmap" element={<Roadmap />} />
            <Route path="/support" element={<Support />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
