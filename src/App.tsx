import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import type { ReactNode } from "react";
import Index from "./pages/Index";
import SugarCravingAssessment from "./pages/SugarCravingAssessment";
import StopSugarCravingsWithoutWillpower from "./pages/StopSugarCravingsWithoutWillpower";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

/** Providers shared by the browser app and the build-time prerender (src/entry-server.tsx). */
export const AppProviders = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      {children}
    </TooltipProvider>
  </QueryClientProvider>
);

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/sugar-craving-assessment" element={<SugarCravingAssessment />} />
    <Route
      path="/stop-sugar-cravings-without-willpower"
      element={<StopSugarCravingsWithoutWillpower />}
    />
    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE, and add the route to src/seo/routes.ts */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <AppProviders>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </AppProviders>
);

export default App;
