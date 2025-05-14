
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Star, User, MapPin, Edit } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useLocation } from "@/context/LocationContext";
import { useAdminSettings } from "@/context/AdminSettingsContext";
import CartDrawer from "@/components/CartDrawer";
import DistanceLabel from "@/components/DistanceLabel";
import ProfileSetupModal from "@/components/ProfileSetupModal";
import { Address } from "@/context/LocationContext";
import { toast } from "sonner";

// Default chef addresses in case no data in localStorage
const defaultChefsWithAddresses = [
  {
    id: 1,
    name: "Chef Maria",
    address: {
      street: "123 Culinary Lane",
      city: "Foodville",
      state: "CA",
      zip: "90001",
      coordinates: { lat: 40.7128, lng: -74.0060 }
    }
  },
  {
    id: 2, 
    name: "Chef Raj",
    address: {
      street: "456 Spice Avenue",
      city: "Flavor City",
      state: "CA",
      zip: "90002",
      coordinates: { lat: 40.7228, lng: -74.0160 }
    }
  },
  {
    id: 3,
    name: "Chef Lin",
    address: {
      street: "789 Wok Way",
      city: "Umami Town",
      state: "CA",
      zip: "90003",
      coordinates: { lat: 40.7328, lng: -74.0260 }
    }
  },
  {
    id: 4,
    name: "Chef Pierre",
    address: {
      street: "101 Croissant Street",
      city: "Pastry Village",
      state: "CA",
      zip: "90004",
      coordinates: { lat: 40.7428, lng: -74.0360 }
    }
  },
  {
    id: 5,
    name: "Chef Emma",
    address: {
      street: "202 Ocean Drive",
      city: "Seafood Harbor",
      state: "CA",
      zip: "90005",
      coordinates: { lat: 40.7528, lng: -74.0460 }
    }
  },
  {
    id: 6,
    name: "Chef Somchai",
    address: {
      street: "303 Noodle Road",
      city: "Spice Springs",
      state: "CA",
      zip: "90006",
      coordinates: { lat: 40.7628, lng: -74.0560 }
    }
  }
];

// Combine chef data with meal data
const meals = [
  {
    id: 1,
    name: "Homemade Lasagna",
    chef: "Chef Maria",
    chefId: 1,
    price: 15.99,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1619895092538-128341789043?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
  },
  {
    id: 2,
    name: "Chicken Tikka Masala",
    chef: "Chef Raj",
    chefId: 2,
    price: 14.99,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1071&q=80"
  },
  {
    id: 3,
    name: "Vegetable Stir Fry",
    chef: "Chef Lin",
    chefId: 3,
    price: 12.99,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
  },
  {
    id: 4,
    name: "Beef Bourguignon",
    chef: "Chef Pierre",
    chefId: 4,
    price: 18.99,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1534939561126-855b8675edd7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
  },
  {
    id: 5,
    name: "Grilled Salmon",
    chef: "Chef Emma",
    chefId: 5,
    price: 16.99,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
  },
  {
    id: 6,
    name: "Pad Thai",
    chef: "Chef Somchai",
    chefId: 6,
    price: 13.99,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
  }
];

const CustomerPanel = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [userProfile, setUserProfile] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [chefsWithAddresses, setChefsWithAddresses] = useState(defaultChefsWithAddresses);
  const { addToCart } = useCart();
  const { userAddress, setUserAddress, calculateDistance } = useLocation();
  const { settings } = useAdminSettings();

  // Get chef address by chef name
  const getChefAddress = (chefName: string): Address | null => {
    const chef = chefsWithAddresses.find(c => c.name === chefName);
    return chef ? chef.address : null;
  };

  // Load user profile, orders, and chef addresses
  useEffect(() => {
    // Load user data
    const userData = localStorage.getItem("user");
    if (userData) {
      setUserProfile(JSON.parse(userData));
    }

    // Load profile picture
    const savedProfilePicture = localStorage.getItem("profilePicture");
    if (savedProfilePicture) {
      setProfilePicture(savedProfilePicture);
    }

    // Load orders
    const savedOrders = localStorage.getItem("orders");
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
    
    // Load chef addresses
    const savedChefsWithAddresses = localStorage.getItem("chefsWithAddresses");
    if (savedChefsWithAddresses) {
      try {
        const parsedChefs = JSON.parse(savedChefsWithAddresses);
        if (Array.isArray(parsedChefs) && parsedChefs.length > 0) {
          setChefsWithAddresses(parsedChefs);
        }
      } catch (e) {
        console.error("Error parsing chef addresses:", e);
      }
    }
  }, []);

  // Handle tab switching
  const handleTabSwitch = (tab: string) => {
    const tabElement = document.querySelector(`[data-value="${tab}"]`);
    if (tabElement) {
      (tabElement as HTMLElement).click();
    }
  };

  // Filter meals based on search query and distance
  const filteredMeals = meals
    .filter(meal => {
      const matchesSearch = !searchQuery || 
        meal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        meal.chef.toLowerCase().includes(searchQuery.toLowerCase());
      
      // If we have user address and admin settings, filter by distance
      if (matchesSearch && userAddress && userAddress.coordinates) {
        const chefAddress = getChefAddress(meal.chef);
        if (chefAddress && chefAddress.coordinates) {
          // Calculate distance and check if within range
          const distance = calculateDistance(userAddress, chefAddress);
          return distance <= settings.maxDeliveryDistance;
        }
      }
      
      return matchesSearch;
    });

  // Handle adding to cart
  const handleAddToCart = (meal: any) => {
    addToCart({
      id: meal.id,
      name: meal.name,
      price: meal.price,
      chef: meal.chef,
      image: meal.image
    });
    toast.success(`${meal.name} added to cart!`);
  };

  // Handle viewing order details
  const handleViewOrderDetails = (orderId: number) => {
    toast.info(`Viewing details for order #${orderId}`);
    // In a real app, this would show a modal or navigate to an order details page
  };

  // Handle reordering
  const handleReorder = (order: any) => {
    toast.success("Items from this order have been added to your cart!");
    // In a real app, this would add the items from the order back to the cart
  };

  // Handle profile save
  const handleProfileSave = (formData: any) => {
    // In a real app, this would save the profile data to a database
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    const updatedUserData = {
      ...userData,
      ...formData
    };
    localStorage.setItem("user", JSON.stringify(updatedUserData));
    setUserProfile(updatedUserData);
    
    // Save address with coordinates if provided
    if (formData.address) {
      setUserAddress(formData.address);
      localStorage.setItem("userAddress", JSON.stringify(formData.address));
    }
    
    toast.success("Profile updated successfully!");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Customer Panel</h1>
        
        <Tabs defaultValue="browse">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="browse">Browse Meals</TabsTrigger>
            <TabsTrigger value="orders">My Orders</TabsTrigger>
            <TabsTrigger value="profile">My Profile</TabsTrigger>
          </TabsList>
          
          <TabsContent value="browse">
            <div className="mb-6 flex gap-2">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input 
                  placeholder="Search for meals or chefs" 
                  className="pl-10" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <CartDrawer />
            </div>
            
            {!userAddress && (
              <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                <p className="text-yellow-800 flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  Please set your delivery address in your profile to see meals available in your area.
                  <Button 
                    variant="link" 
                    className="ml-2 text-bistro-600"
                    onClick={() => setShowProfileModal(true)}
                  >
                    Set Address
                  </Button>
                </p>
              </div>
            )}
            
            {filteredMeals.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No meals found matching your search criteria</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMeals.map((meal) => {
                  const chefAddress = getChefAddress(meal.chef);
                  
                  return (
                    <Card key={meal.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative h-48">
                        <img 
                          src={meal.image} 
                          alt={meal.name} 
                          className="h-full w-full object-cover" 
                        />
                      </div>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-lg">{meal.name}</h3>
                            <p className="text-sm text-gray-600">by {meal.chef}</p>
                            
                            {/* Distance label */}
                            {chefAddress && (
                              <DistanceLabel chefAddress={chefAddress} />
                            )}
                          </div>
                          <div className="flex items-center bg-yellow-50 px-2 py-1 rounded">
                            <Star className="h-4 w-4 text-yellow-500 mr-1" fill="currentColor" />
                            <span className="text-sm font-medium">{meal.rating}</span>
                          </div>
                        </div>
                        <div className="mt-4 flex justify-between items-center">
                          <span className="font-bold text-lg">${meal.price}</span>
                          <Button 
                            className="bg-bistro-600 hover:bg-bistro-700"
                            onClick={() => handleAddToCart(meal)}
                          >
                            Add to Cart
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="orders">
            <h2 className="text-2xl font-semibold mb-4">Order History</h2>
            
            {orders.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">You don't have any orders yet</p>
                <Button 
                  variant="link" 
                  className="text-bistro-600 mt-2"
                  onClick={() => handleTabSwitch("browse")}
                >
                  Browse Meals
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <Card key={order.id} className="overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm text-gray-500">Order #{order.id}</p>
                          <p className="font-medium">{order.date}</p>
                          <div className="mt-2">
                            {order.items.map((item: string, index: number) => (
                              <p key={index} className="text-gray-700">{item}</p>
                            ))}
                          </div>
                        </div>
                        <div>
                          <div className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                            {order.status}
                          </div>
                          <p className="mt-2 text-right font-semibold">${order.total.toFixed(2)}</p>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-end space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleViewOrderDetails(order.id)}
                        >
                          View Details
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleReorder(order)}
                        >
                          Reorder
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="profile">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center sm:flex-row sm:items-start sm:space-x-6 mb-6">
                  <div className="relative">
                    <div className="bg-gray-100 rounded-full h-24 w-24 flex items-center justify-center mb-4 sm:mb-0 overflow-hidden">
                      {profilePicture ? (
                        <img 
                          src={profilePicture} 
                          alt="Profile" 
                          className="h-full w-full object-cover" 
                        />
                      ) : (
                        <User className="h-12 w-12 text-gray-400" />
                      )}
                    </div>
                    <Button 
                      variant="outline"
                      size="sm" 
                      className="absolute bottom-0 right-0 rounded-full p-1"
                      onClick={() => setShowProfileModal(true)}
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="text-center sm:text-left">
                    <h2 className="text-2xl font-semibold">{userProfile?.name || "User"}</h2>
                    <p className="text-gray-600">{userProfile?.email || "No email set"}</p>
                    <p className="text-gray-600">
                      {userAddress?.street ? (
                        <>
                          <MapPin className="inline-block h-4 w-4 mr-1 text-bistro-600" />
                          {userAddress.city}, {userAddress.state}
                        </>
                      ) : (
                        "No address set"
                      )}
                    </p>
                  </div>
                </div>
                
                <Button 
                  className="bg-bistro-600 hover:bg-bistro-700" 
                  onClick={() => setShowProfileModal(true)}
                >
                  Edit Profile
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
      
      {/* Profile Setup Modal */}
      <ProfileSetupModal 
        open={showProfileModal} 
        onClose={() => setShowProfileModal(false)} 
      />
    </div>
  );
};

export default CustomerPanel;
