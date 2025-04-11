import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import PasswordGeneratorPage from "./pages/PasswordGeneratorPage";
import WordlistGeneratorPage from "./pages/WordlistGeneratorPage";
import NotFound from "./pages/NotFound";


const App = () => (

    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/password-generator" element={<PasswordGeneratorPage />} />
          <Route path="/wordlist-generator" element={<WordlistGeneratorPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
);

export default App;
