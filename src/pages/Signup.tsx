
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import ProfileSetupModal from "@/components/ProfileSetupModal";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer");
  const [loading, setLoading] = useState(false);
  const [showProfileSetup, setShowProfileSetup] = useState(false);
  const navigate = useNavigate();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Store user info in localStorage
    const userData = {
      name,
      email,
      role
    };
    
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("isAuthenticated", "true");

    setTimeout(() => {
      toast.success("Account created successfully!");
      setLoading(false);
      // Show profile setup instead of redirecting
      setShowProfileSetup(true);
    }, 1000);
  };

  const handleProfileSetupComplete = () => {
    setShowProfileSetup(false);
    
    // Redirect based on role
    if (role === "chef") {
      navigate("/chef");
    } else if (role === "admin") {
      navigate("/admin");
    } else {
      navigate("/customer");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md">
          <CardHeader>
            <h1 className="text-2xl font-bold text-center text-gray-900">Create an Account</h1>
            <p className="mt-2 text-center text-gray-600">
              Join our platform to discover amazing home-cooked meals
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
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
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  I want to join as:
                </label>
                <RadioGroup value={role} onValueChange={setRole} className="flex gap-4 pt-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="customer" id="customer" />
                    <Label htmlFor="customer">Customer</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="chef" id="chef" />
                    <Label htmlFor="chef">Chef</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="admin" id="admin" />
                    <Label htmlFor="admin">Admin</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="flex items-center">
                <input
                  id="agree-terms"
                  name="agree-terms"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-bistro-600 focus:ring-bistro-500"
                  required
                />
                <label htmlFor="agree-terms" className="ml-2 block text-sm text-gray-700">
                  I agree to the{" "}
                  <a href="#" className="text-bistro-600 hover:text-bistro-500">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-bistro-600 hover:text-bistro-500">
                    Privacy Policy
                  </a>
                </label>
              </div>
              <Button
                type="submit"
                className="w-full bg-bistro-600 hover:bg-bistro-700"
                disabled={loading}
              >
                {loading ? "Creating account..." : "Sign Up"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center border-t p-6">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-bistro-600 hover:text-bistro-500">
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

export default Signup;
