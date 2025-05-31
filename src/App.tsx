
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import BlogDetail from "./pages/BlogDetail";
import CategoryPage from "./pages/CategoryPage";
import AuthorProfile from "./pages/AuthorProfile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";
import CreateBlog from "./pages/CreateBlog";
import MyBlogs from "./pages/MyBlogs";
import Festivals from "./pages/Festivals";
import Kundli from "./pages/Kundli";
import Panchang from "./pages/Panchang";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/blog/:id" element={<BlogDetail />} />
              <Route path="/category/:category" element={<CategoryPage />} />
              <Route path="/author/:authorId" element={<AuthorProfile />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/change-password" element={<ChangePassword />} />
              <Route path="/create-blog" element={<CreateBlog />} />
              <Route path="/my-blogs" element={<MyBlogs />} />
              <Route path="/festivals" element={<Festivals />} />
              <Route path="/kundli" element={<Kundli />} />
              <Route path="/panchang" element={<Panchang />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
