
import { ShoppingCart, ChefHat, FileText } from "lucide-react";

const features = [
  {
    icon: ShoppingCart,
    name: 'Customers',
    description: 'Browse menus from local home chefs, place orders, and enjoy authentic homemade meals delivered to your doorstep.'
  },
  {
    icon: ChefHat,
    name: 'Chefs',
    description: 'Showcase your cooking skills, manage your menu, and connect with food lovers in your community.'
  },
  {
    icon: FileText,
    name: 'Administrators',
    description: 'Oversee platform operations, manage users, and ensure quality control for a seamless experience.'
  }
];

const FeaturesSection = () => {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-bistro-600 font-semibold tracking-wide uppercase">Our Platform</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            A Better Way to Connect Through Food
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Our three-panel system brings together food lovers, talented home chefs, and dedicated administrators.
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                <div>
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-bistro-500 text-white">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 text-lg font-medium text-gray-900">{feature.name}</h3>
                  <p className="mt-2 text-base text-gray-500">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
