
import { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface AdminSettings {
  maxDeliveryDistance: number; // in kilometers
}

interface AdminSettingsContextType {
  settings: AdminSettings;
  updateSettings: (newSettings: Partial<AdminSettings>) => void;
}

const defaultSettings: AdminSettings = {
  maxDeliveryDistance: 10, // Default to 10km
};

const AdminSettingsContext = createContext<AdminSettingsContextType | undefined>(undefined);

export const AdminSettingsProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<AdminSettings>(() => {
    const savedSettings = localStorage.getItem("adminSettings");
    return savedSettings ? JSON.parse(savedSettings) : defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem("adminSettings", JSON.stringify(settings));
  }, [settings]);

  const updateSettings = (newSettings: Partial<AdminSettings>) => {
    setSettings(prevSettings => ({
      ...prevSettings,
      ...newSettings
    }));
  };

  return (
    <AdminSettingsContext.Provider value={{ 
      settings, 
      updateSettings
    }}>
      {children}
    </AdminSettingsContext.Provider>
  );
};

export const useAdminSettings = () => {
  const context = useContext(AdminSettingsContext);
  if (context === undefined) {
    throw new Error("useAdminSettings must be used within an AdminSettingsProvider");
  }
  return context;
};
