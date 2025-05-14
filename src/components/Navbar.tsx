
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, ChefHat, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState<{ name: string, role: string } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication status on component mount and when localStorage changes
    const checkAuth = () => {
      const authStatus = localStorage.getItem("isAuthenticated") === "true";
      setIsAuthenticated(authStatus);
      
      const userDataString = localStorage.getItem("user");
      if (userDataString) {
        try {
          const parsedUserData = JSON.parse(userDataString);
          setUserData(parsedUserData);
        } catch (e) {
          setUserData(null);
        }
      } else {
        setUserData(null);
      }
    };
    
    checkAuth();
    
    // Set up event listener for localStorage changes
    window.addEventListener("storage", checkAuth);
    
    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignIn = () => {
    navigate("/login");
  };

  const handleSignUp = () => {
    navigate("/signup");
  };
  
  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUserData(null);
    toast.success("Logged out successfully!");
    navigate("/");
  };
  
  const getUserDashboard = () => {
    if (!userData) return "/";
    
    switch (userData.role) {
      case "chef":
        return "/chef";
      case "admin":
        return "/admin";
      default:
        return "/customer";
    }
  };

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and brand */}
          <Link to="/" className="flex items-center">
            <ChefHat className="h-8 w-8 text-bistro-600" />
            <span className="ml-2 text-xl font-bold text-gray-900 font-['Poppins']">
              Taste of Home
            </span>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:text-bistro-600">
              Home
            </Link>
            {isAuthenticated ? (
              <>
                <Link to={getUserDashboard()} className="px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-bistro-600">
                  My Dashboard
                </Link>
                <div className="px-3 py-2 rounded-md text-sm font-medium text-bistro-600">
                  Welcome, {userData?.name || "User"}!
                </div>
                <Button variant="outline" className="ml-4 flex items-center" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" className="ml-4" onClick={handleSignIn}>Sign In</Button>
                <Button className="ml-2 bg-bistro-600 hover:bg-bistro-700" onClick={handleSignUp}>Sign Up</Button>
              </>
            )}
          </nav>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              type="button"
              className="text-gray-500 hover:text-gray-900"
              onClick={toggleMenu}
            >
              <span className="sr-only">Open menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-md">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-bistro-600"
              onClick={toggleMenu}
            >
              Home
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link
                  to={getUserDashboard()}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-bistro-600"
                  onClick={toggleMenu}
                >
                  My Dashboard
                </Link>
                <div className="block px-3 py-2 rounded-md text-base font-medium text-bistro-600">
                  Welcome, {userData?.name || "User"}!
                </div>
                <Button 
                  variant="outline" 
                  className="w-full justify-start mt-2" 
                  onClick={() => {
                    handleLogout();
                    toggleMenu();
                  }}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
              </>
            ) : (
              <div className="pt-4 pb-2 space-y-2">
                <Button variant="outline" className="w-full" onClick={() => { handleSignIn(); toggleMenu(); }}>Sign In</Button>
                <Button className="w-full bg-bistro-600 hover:bg-bistro-700" onClick={() => { handleSignUp(); toggleMenu(); }}>Sign Up</Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
