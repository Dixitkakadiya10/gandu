
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CustomerPanel from "./pages/CustomerPanel";
import ChefPanel from "./pages/ChefPanel";
import AdminPanel from "./pages/AdminPanel";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import { CartProvider } from "./context/CartContext";
import { LocationProvider } from "./context/LocationContext";
import { AdminSettingsProvider } from "./context/AdminSettingsContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AdminSettingsProvider>
        <LocationProvider>
          <CartProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/customer" element={
                  <ProtectedRoute>
                    <CustomerPanel />
                  </ProtectedRoute>
                } />
                <Route path="/chef" element={
                  <ProtectedRoute allowedRole="chef">
                    <ChefPanel />
                  </ProtectedRoute>
                } />
                <Route path="/admin" element={
                  <ProtectedRoute allowedRole="admin">
                    <AdminPanel />
                  </ProtectedRoute>
                } />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </CartProvider>
        </LocationProvider>
      </AdminSettingsProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
