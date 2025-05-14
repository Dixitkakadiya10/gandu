
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useLocation } from "@/context/LocationContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const ProfileSetupModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const { setUserAddress } = useLocation();
  const [userRole, setUserRole] = useState(""); // To store the user role
  const [kitchenCert, setKitchenCert] = useState<string | null>(null); // Kitchen certificate
  const [hygieneCert, setHygieneCert] = useState<string | null>(null); // Hygiene certificate


  // Load existing profile data if available
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    
    if (userData.name) setName(userData.name);
    if (userData.phone) setPhone(userData.phone);
    if (userData.role) setUserRole(userData.role);


    const address = JSON.parse(localStorage.getItem("userAddress") || "{}");
    if (address.street) setStreet(address.street);
    if (address.city) setCity(address.city);
    if (address.state) setState(address.state);
    if (address.zip) setZip(address.zip);

    const savedProfilePicture = localStorage.getItem("profilePicture");
    if (savedProfilePicture) setProfilePicture(savedProfilePicture);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setProfilePicture(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const convertToBase64 = (file: File, callback: (result: string) => void) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        callback(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleCertFileChange = (e: React.ChangeEvent<HTMLInputElement>, setter: (value: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;
    convertToBase64(file, setter);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulate geocoding (in real app, would use a geocoding service)
    const fakeCoordinates = {
      lat: 40 + Math.random() * 10,
      lng: -74 + Math.random() * 10
    };

    // Save profile data
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    const updatedUserData = {
      ...userData,
      name,
      phone
    };
    localStorage.setItem("user", JSON.stringify(updatedUserData));

    // Save address with coordinates
    const addressData = {
      street,
      city,
      state,
      zip,
      coordinates: fakeCoordinates
    };
    localStorage.setItem("userAddress", JSON.stringify(addressData));
    setUserAddress(addressData);

    // Save profile picture if available
    if (profilePicture) {
      localStorage.setItem("profilePicture", profilePicture);
    }

    if (userRole === "chef") {
      if (kitchenCert) localStorage.setItem("kitchenCert", kitchenCert);
      if (hygieneCert) localStorage.setItem("hygieneCert", hygieneCert);
    }

    toast.success("Profile updated successfully!");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Complete Your Profile</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col items-center mb-4">
            <div className="relative">
              <div className="h-24 w-24 rounded-full overflow-hidden bg-gray-200 mb-2">
                {profilePicture ? (
                  <img
                    src={profilePicture}
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-gray-400">
                    No Photo
                  </div>
                )}
              </div>
              <Input
                type="file"
                id="profilePicture"
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="w-full mt-2"
                onClick={() => document.getElementById("profilePicture")?.click()}
              >
                {profilePicture ? "Change Photo" : "Upload Photo"}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Full Name</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Phone</label>
            <Input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Address</label>
            <Input
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              placeholder="Street address"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">City</label>
              <Input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">State</label>
              <Input
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">ZIP CODE</label>
            <Input
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              required
            />
          </div>

          {userRole === "chef" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Kitchen Certificate (PDF/Image)</label>
                <Input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => handleCertFileChange(e, setKitchenCert)}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Hygiene Certificate (PDF/Image)</label>
                <Input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => handleCertFileChange(e, setHygieneCert)}
                  required
                />
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-bistro-600 hover:bg-bistro-700">
              Save Profile
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileSetupModal;
