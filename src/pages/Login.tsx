
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { toast } from "sonner";
import ProfileSetupModal from "@/components/ProfileSetupModal";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showProfileSetup, setShowProfileSetup] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // For demo purposes, we'll simulate different user roles
    let role = "customer";
    if (email.includes("chef")) {
      role = "chef";
    } else if (email.includes("admin")) {
      role = "admin";
    }

    // Store user info in localStorage
    const userData = {
      name: email.split("@")[0],
      email,
      role
    };

    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("isAuthenticated", "true");

    setTimeout(() => {
      toast.success("Login successful!");
      setLoading(false);
      
      // Check if user has completed profile setup
      const hasAddress = localStorage.getItem("userAddress");
      if (!hasAddress) {
        setShowProfileSetup(true);
      } else {
        redirectBasedOnRole(role);
      }
    }, 1000);
  };

  const redirectBasedOnRole = (role: string) => {
    // Redirect based on role
    if (role === "chef") {
      navigate("/chef");
    } else if (role === "admin") {
      navigate("/admin");
    } else {
      navigate("/customer");
    }
  };

  const handleProfileSetupComplete = () => {
    setShowProfileSetup(false);
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    redirectBasedOnRole(userData.role || "customer");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md">
          <CardHeader>
            <h1 className="text-2xl font-bold text-center text-gray-900">Sign In</h1>
            <p className="mt-2 text-center text-gray-600">
              Welcome back! Please enter your details
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <p className="text-xs text-gray-500">
                  Hint: Use emails containing "chef" or "admin" to login as those roles
                </p>
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-bistro-600 focus:ring-bistro-500"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                <div>
                  <a href="#" className="text-sm font-medium text-bistro-600 hover:text-bistro-500">
                    Forgot password?
                  </a>
                </div>
              </div>
              <Button
                type="submit"
                className="w-full bg-bistro-600 hover:bg-bistro-700"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center border-t p-6">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/signup" className="font-medium text-bistro-600 hover:text-bistro-500">
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </main>
      <Footer />

      {/* Profile Setup Modal */}
      <ProfileSetupModal 
        open={showProfileSetup} 
        onClose={handleProfileSetupComplete} 
      />
    </div>
  );
};

export default Login;
