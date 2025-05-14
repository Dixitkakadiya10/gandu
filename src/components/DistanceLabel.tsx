
import { useLocation } from "@/context/LocationContext";
import { useAdminSettings } from "@/context/AdminSettingsContext";
import { MapPin } from "lucide-react";
import { Address } from "@/context/LocationContext";

interface DistanceLabelProps {
  chefAddress: Address;
}

const DistanceLabel = ({ chefAddress }: DistanceLabelProps) => {
  const { userAddress, calculateDistance } = useLocation();
  const { settings } = useAdminSettings();
  
  if (!userAddress || !userAddress.coordinates || !chefAddress || !chefAddress.coordinates) {
    return (
      <div className="flex items-center text-sm text-orange-500">
        <MapPin className="h-4 w-4 mr-1" />
        <span>Address needed</span>
      </div>
    );
  }

  const distance = calculateDistance(userAddress, chefAddress);
  const isWithinRange = distance <= settings.maxDeliveryDistance;
  
  return (
    <div className={`flex items-center text-sm ${isWithinRange ? 'text-green-600' : 'text-red-500'}`}>
      <MapPin className="h-4 w-4 mr-1" />
      <span>{distance.toFixed(1)} km away</span>
      {!isWithinRange && (
        <span className="ml-1 text-xs">(Outside delivery range)</span>
      )}
    </div>
  );
};

export default DistanceLabel;
