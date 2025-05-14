
import { ShoppingCart, ChefHat, LayoutDashboard } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import PanelCard from "@/components/PanelCard";

const Index = () => {
  const panels = [
    {
      title: "Customer Panel",
      description: "Browse menus, place orders, and enjoy homemade meals delivered straight to your door.",
      image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=968&q=80",
      link: "/customer",
      ctaText: "Order Now",
      icon: <ShoppingCart className="h-5 w-5 text-bistro-600" />,
      features: [
        "User Registration and Profile Management",
        "Browse Meals by Category and Chef",
        "Online Ordering and Payment",
        "Order History and Tracking",
        "Reviews and Ratings"
      ]
    },
    {
      title: "Chef Panel",
      description: "Showcase your culinary talent and connect with customers who appreciate authentic home cooking.",
      image: "https://images.unsplash.com/photo-1507048331197-7d4ac70811cf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
      link: "/chef",
      ctaText: "Start Cooking",
      icon: <ChefHat className="h-5 w-5 text-bistro-600" />,
      features: [
        "Chef Profile and Portfolio",
        "Menu Management",
        "Order Management",
        "Earnings Dashboard",
        "Customer Feedback and Reviews"
      ]
    },
    {
      title: "Admin Panel",
      description: "Manage the entire platform, ensure quality, and facilitate seamless interactions between customers and chefs.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      link: "/admin",
      ctaText: "Manage Platform",
      icon: <LayoutDashboard className="h-5 w-5 text-bistro-600" />,
      features: [
        "User Management (Customers & Chefs)",
        "Meal Approval System",
        "Order Management and Monitoring",
        "Analytics and Reporting",
        "Content Management"
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <FeaturesSection />
        
        {/* Panel Cards Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">Explore Our Platform</h2>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                Our three-panel system brings together customers, chefs, and administrators to create
                a seamless home-cooked meal delivery experience.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {panels.map((panel) => (
                <PanelCard
                  key={panel.title}
                  title={panel.title}
                  description={panel.description}
                  image={panel.image}
                  link={panel.link}
                  ctaText={panel.ctaText}
                  icon={panel.icon}
                  features={panel.features}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="bg-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">What Our Users Say</h2>
              <div className="bg-gray-50 p-8 rounded-lg shadow-sm border border-gray-100">
                <p className="text-gray-600 italic text-lg mb-6">
                  "Taste of Home has transformed how I enjoy food. I can now order authentic, homemade meals from talented
                  chefs in my neighborhood. The quality is exceptional, and it feels like having a personal chef!"
                </p>
                <div className="flex items-center justify-center">
                  <img
                    className="h-12 w-12 rounded-full object-cover"
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                    alt="User"
                  />
                  <div className="ml-4 text-left">
                    <p className="font-medium text-gray-900">Sarah Johnson</p>
                    <p className="text-gray-500 text-sm">Satisfied Customer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
