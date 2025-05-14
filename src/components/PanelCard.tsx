
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface PanelCardProps {
  title: string;
  description: string;
  image: string;
  link: string;
  ctaText: string;
  features: string[];
  icon: React.ReactNode;
}

const PanelCard = ({
  title,
  description,
  image,
  link,
  ctaText,
  features,
  icon,
}: PanelCardProps) => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate(link);
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
      <div className="relative h-48">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
          <div className="p-6 flex items-center">
            <div className="bg-white p-2 rounded-full mr-3">
              {icon}
            </div>
            <h3 className="text-2xl font-bold text-white">{title}</h3>
          </div>
        </div>
      </div>
      <div className="p-6 flex-grow">
        <p className="text-gray-600 mb-4">{description}</p>
        <h4 className="font-medium text-gray-900 mb-2">Key Features:</h4>
        <ul className="space-y-1 mb-6 text-sm text-gray-700">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <span className="h-1.5 w-1.5 rounded-full bg-bistro-500 mr-2"></span>
              {feature}
            </li>
          ))}
        </ul>
      </div>
      <div className="px-6 pb-6 mt-auto">
        <Button 
          className="w-full bg-bistro-600 hover:bg-bistro-700 flex items-center justify-center"
          onClick={handleNavigation}
        >
          {ctaText}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default PanelCard;
