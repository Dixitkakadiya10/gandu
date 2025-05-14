
import { ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const navigate = useNavigate();

  const handleBrowseMeals = () => {
    navigate("/customer");
  };

  const handleBecomeChef = () => {
    navigate("/chef");
  };

  return (
    <div className="bistro-hero-pattern relative overflow-hidden">
      <div className="container mx-auto px-4 py-16 sm:py-24 lg:py-32">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
              <span className="block">Authentic Home Cooking</span>
              <span className="block text-bistro-600">Delivered to You</span>
            </h1>
            <p className="mt-6 text-base text-gray-600 sm:text-lg md:text-xl lg:text-lg xl:text-xl">
              Connect with talented home chefs in your neighborhood and enjoy
              authentic homemade meals delivered right to your doorstep.
              Experience the taste of home without the hassle of cooking.
            </p>
            <div className="mt-10 sm:flex sm:justify-center lg:justify-start">
              <div className="rounded-md shadow">
                <Button 
                  onClick={handleBrowseMeals}
                  className="w-full px-8 py-6 bg-bistro-600 hover:bg-bistro-700 text-lg font-semibold flex items-center justify-center"
                  size="lg"
                >
                  Browse Meals
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-3">
                <Button 
                  onClick={handleBecomeChef}
                  variant="outline" 
                  className="w-full px-8 py-6 border border-bistro-600 text-bistro-600 hover:bg-bistro-50 text-lg font-semibold flex items-center justify-center"
                  size="lg"
                >
                  Become a Chef
                </Button>
              </div>
            </div>
          </div>
          <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
            <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
              <div className="relative block w-full h-64 sm:h-72 md:h-96 overflow-hidden rounded-lg bg-white">
                <img
                  className="w-full h-full object-cover"
                  src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                  alt="Home cooked meal"
                />
                <div className="absolute inset-0 bg-bistro-500 mix-blend-multiply opacity-20"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black opacity-30"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center">
                    <img
                      className="h-10 w-10 rounded-full border-2 border-white"
                      src="https://images.unsplash.com/photo-1581299894007-aaa50297cf16?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                      alt="Chef profile"
                    />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-white">
                        Chef Maria's Special
                      </p>
                      <p className="text-xs text-white opacity-90">
                        Homemade Lasagna
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
