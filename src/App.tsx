import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import FeedPage from "./pages/FeedPage";
import ProfilePage from "./pages/ProfilePage";
import CompanyPage from "./pages/CompanyPage";
import HackathonsPage from "./pages/HackathonsPage";
import JobsPage from "./pages/JobsPage";
import MessagesPage from "./pages/MessagesPage";
import NetworkPage from "./pages/NetworkPage";
import NotificationsPage from "./pages/NotificationsPage";
import AboutPage from "./pages/AboutPage";
import BusinessPage from "./pages/BusinessPage";
import NotFound from "./pages/NotFound";
import TopNav from "./components/TopNav";
import MobileNav from "./components/MobileNav";
import ChatWidget from "./components/ChatWidget";

const queryClient = new QueryClient();

const AppShell = () => {
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();
  const isLanding = location.pathname === "/" || location.pathname === "/business";

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <>
      {!isLanding && <TopNav darkMode={darkMode} toggleDark={() => setDarkMode(!darkMode)} />}
      {!isLanding && <MobileNav />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/profile/:handle" element={<ProfilePage />} />
        <Route path="/company/:id" element={<CompanyPage />} />
        <Route path="/hackathons" element={<HackathonsPage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/messages" element={<MessagesPage />} />
        <Route path="/network" element={<NetworkPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/business" element={<BusinessPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {/* Global floating chat widget for all non-landing pages */}
      {!isLanding && <ChatWidget />}
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppShell />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
