
import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useAdminSettings } from "@/context/AdminSettingsContext";
import { toast } from "sonner";

const AdminDeliverySettings = () => {
  const { settings, updateSettings } = useAdminSettings();
  const [maxDistance, setMaxDistance] = useState(settings.maxDeliveryDistance);

  const handleSave = () => {
    updateSettings({ maxDeliveryDistance: maxDistance });
    toast.success("Delivery settings updated!");
  };

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold">Delivery Distance Settings</h3>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Maximum delivery distance (km)
          </label>
          <div className="grid grid-cols-[1fr,auto] gap-4 items-center">
            <Slider
              value={[maxDistance]}
              min={1}
              max={50}
              step={1}
              onValueChange={(values) => setMaxDistance(values[0])}
              className="mr-2"
            />
            <Input
              type="number"
              value={maxDistance}
              onChange={(e) => setMaxDistance(Number(e.target.value))}
              className="w-20"
              min={1}
              max={50}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Customers will only see meals from chefs within this distance
          </p>
        </div>
        <Button 
          onClick={handleSave} 
          className="bg-bistro-600 hover:bg-bistro-700"
        >
          Save Settings
        </Button>
      </CardContent>
    </Card>
  );
};

export default AdminDeliverySettings;
