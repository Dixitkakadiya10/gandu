
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

interface LocationContextType {
  userAddress: Address | null;
  setUserAddress: (address: Address) => void;
  calculateDistance: (address1: Address, address2: Address) => number;
  isWithinRange: (address1: Address, address2: Address, maxDistance: number) => boolean;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider = ({ children }: { children: ReactNode }) => {
  const [userAddress, setUserAddress] = useState<Address | null>(() => {
    const savedAddress = localStorage.getItem("userAddress");
    return savedAddress ? JSON.parse(savedAddress) : null;
  });

  useEffect(() => {
    if (userAddress) {
      localStorage.setItem("userAddress", JSON.stringify(userAddress));
    }
  }, [userAddress]);

  // Simple distance calculation using the Haversine formula
  const calculateDistance = (address1: Address, address2: Address): number => {
    if (!address1.coordinates || !address2.coordinates) return 999; // Return large distance if no coordinates
    
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(address2.coordinates.lat - address1.coordinates.lat);
    const dLng = deg2rad(address2.coordinates.lng - address1.coordinates.lng);
    
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(address1.coordinates.lat)) * Math.cos(deg2rad(address2.coordinates.lat)) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    
    return distance;
  };

  const deg2rad = (deg: number): number => {
    return deg * (Math.PI / 180);
  };

  const isWithinRange = (address1: Address, address2: Address, maxDistance: number): boolean => {
    if (!address1.coordinates || !address2.coordinates) return false;
    const distance = calculateDistance(address1, address2);
    return distance <= maxDistance;
  };

  return (
    <LocationContext.Provider value={{ 
      userAddress, 
      setUserAddress, 
      calculateDistance,
      isWithinRange
    }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
};
