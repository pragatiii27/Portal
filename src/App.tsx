import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import Projects from "./pages/Projects"; // keep this if you want a global list of projects
import Departments from "./pages/Departments";
import Finances from "./pages/Finances";
import Downloads from "./pages/Downloads";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import SubDepartments from "./pages/SubDepartments";
import SubProjects  from "./pages/SubProjects";
import ProjectDetails from "./pages/ProjectDetails";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/departments" element={<Departments />} />
          <Route path="/finances" element={<Finances />} />
          <Route path="/downloads" element={<Downloads />} />
          <Route path="/about" element={<About />} />

          {/* Hierarchy */}
          <Route path="/departments/:id" element={<SubDepartments />} />
          <Route path="/subdepartments/:id" element={<SubProjects />} />   {/* ✅ now using SubProjects */}
          <Route path="/projects/:id" element={<ProjectDetails />} />

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
