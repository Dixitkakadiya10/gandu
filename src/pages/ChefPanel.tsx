import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DollarSign, 
  Book, 
  Clock, 
  Star, 
  ChefHat, 
  Plus, 
  Edit, 
  Trash,
  MapPin
} from "lucide-react";
import { toast } from "sonner";
import { Address } from "@/context/LocationContext";

const ChefPanel = () => {
  const [userData, setUserData] = useState<{ name: string } | null>(null);
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");

  // Load user data including address
  useEffect(() => {
    const userDataString = localStorage.getItem("user");
    if (userDataString) {
      try {
        const parsedUserData = JSON.parse(userDataString);
        setUserData(parsedUserData);
      } catch (e) {
        setUserData(null);
      }
    }

    // Load chef address
    const chefAddressString = localStorage.getItem("chefAddress");
    if (chefAddressString) {
      try {
        const chefAddress = JSON.parse(chefAddressString);
        setStreet(chefAddress.street || "");
        setCity(chefAddress.city || "");
        setState(chefAddress.state || "");
        setZip(chefAddress.zip || "");
      } catch (e) {
        console.error("Error loading chef address:", e);
      }
    }
  }, []);

  // Save chef address
  const saveChefAddress = () => {
    // Simulate geocoding (in real app, would use a geocoding service)
    const fakeCoordinates = { 
      lat: 40 + Math.random() * 10, 
      lng: -74 + Math.random() * 10 
    };
    
    const chefAddress: Address = {
      street,
      city,
      state,
      zip,
      coordinates: fakeCoordinates
    };
    
    localStorage.setItem("chefAddress", JSON.stringify(chefAddress));
    
    // Save chef name with the address in the chefsWithAddresses collection
    const chefName = userData?.name || "Chef";
    const chefsWithAddresses = JSON.parse(localStorage.getItem("chefsWithAddresses") || "[]");
    
    // Update or add this chef's address
    const existingChefIndex = chefsWithAddresses.findIndex(
      (chef: any) => chef.name === chefName
    );
    
    if (existingChefIndex >= 0) {
      chefsWithAddresses[existingChefIndex].address = chefAddress;
    } else {
      chefsWithAddresses.push({
        id: Date.now(),
        name: chefName,
        address: chefAddress
      });
    }
    
    localStorage.setItem("chefsWithAddresses", JSON.stringify(chefsWithAddresses));
    
    toast.success("Kitchen location updated successfully!");
  };

  const [meals, setMeals] = useState([
    {
      id: 1,
      name: "Homemade Lasagna",
      description: "Classic lasagna with layers of pasta, rich meat sauce, and creamy cheese.",
      price: 15.99,
      image: "https://images.unsplash.com/photo-1619895092538-128341789043?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      available: true
    },
    {
      id: 2,
      name: "Tiramisu",
      description: "Authentic Italian dessert with mascarpone cheese, espresso, and cocoa.",
      price: 7.99,
      image: "https://images.unsplash.com/photo-1571877899886-41e6e481c3ee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      available: true
    },
    {
      id: 3,
      name: "Margherita Pizza",
      description: "Traditional pizza with tomato sauce, fresh mozzarella, and basil.",
      price: 12.99,
      image: "https://images.unsplash.com/photo-1598023696416-0193a0bcd302?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1236&q=80",
      available: false
    }
  ]);

  const [orders, setOrders] = useState([
    {
      id: "ORD-10254",
      customer: "Sarah Johnson",
      items: ["Homemade Lasagna", "Tiramisu"],
      total: 23.98,
      status: "Processing",
      time: "2:15 PM",
      date: "Today"
    },
    {
      id: "ORD-10248",
      customer: "Michael Chen",
      items: ["Homemade Lasagna"],
      total: 15.99,
      status: "Ready",
      time: "12:30 PM",
      date: "Today"
    },
    {
      id: "ORD-10232",
      customer: "Jessica Smith",
      items: ["Homemade Lasagna", "Tiramisu"],
      total: 23.98,
      status: "Completed",
      time: "6:45 PM",
      date: "Yesterday"
    }
  ]);

  const [reviews, setReviews] = useState([
    {
      id: 1,
      customer: "Sarah Johnson",
      meal: "Homemade Lasagna",
      rating: 5,
      comment: "Amazing flavor! This tastes just like my grandmother used to make.",
      date: "3 days ago"
    },
    {
      id: 2,
      customer: "Michael Chen",
      meal: "Tiramisu",
      rating: 4,
      comment: "Delicious dessert, perfect sweetness level.",
      date: "1 week ago"
    },
    {
      id: 3,
      customer: "Jessica Smith",
      meal: "Homemade Lasagna",
      rating: 5,
      comment: "Absolutely perfect! Will order again.",
      date: "2 weeks ago"
    }
  ]);

  const earnings = {
    today: 39.97,
    week: 249.85,
    month: 1078.50,
    total: 5325.75
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Chef Panel</h1>
            <p className="text-gray-600">Welcome back, Chef {userData?.name || "Maria"}</p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center">
            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
              <div className="w-2 h-2 bg-green-600 rounded-full mr-2"></div>
              Available for Orders
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="bg-green-100 p-3 rounded-full">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Today's Earnings</p>
                  <p className="text-2xl font-semibold">€{earnings.today}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Book className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Total Orders</p>
                  <p className="text-2xl font-semibold">128</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="bg-purple-100 p-3 rounded-full">
                  <Clock className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Pending Orders</p>
                  <p className="text-2xl font-semibold">2</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="bg-yellow-100 p-3 rounded-full">
                  <Star className="h-6 w-6 text-yellow-600" fill="currentColor" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Average Rating</p>
                  <p className="text-2xl font-semibold">4.8</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="menu">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="menu">My Menu</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="earnings">Earnings</TabsTrigger>
            <TabsTrigger value="location">Location</TabsTrigger>
          </TabsList>
          
          <TabsContent value="menu">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">My Menu Items</h2>
              <Button className="bg-bistro-600 hover:bg-bistro-700">
                <Plus className="mr-2 h-4 w-4" /> Add New Item
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {meals.map((meal) => (
                <Card key={meal.id} className={`overflow-hidden €{!meal.available ? 'opacity-70' : ''}`}>
                  <div className="relative h-48">
                    <img 
                      src={meal.image} 
                      alt={meal.name} 
                      className="h-full w-full object-cover" 
                    />
                    {!meal.available && (
                      <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
                        <span className="bg-white px-3 py-1 rounded-full text-gray-800 font-medium">
                          Currently Unavailable
                        </span>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <div>
                      <h3 className="font-semibold text-lg">{meal.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{meal.description}</p>
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                      <span className="font-bold text-lg">€{meal.price}</span>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="p-2">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="p-2 text-red-500 hover:text-red-700">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="orders">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Current Orders</h2>
              <div>
                <Button variant="outline">View All Orders</Button>
              </div>
            </div>
            
            <div className="space-y-4">
              {orders.map((order) => (
                <Card key={order.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center">
                          <p className="font-medium">{order.customer}</p>
                          <p className="ml-2 text-sm text-gray-500">({order.id})</p>
                        </div>
                        <p className="text-sm text-gray-600">{order.time} • {order.date}</p>
                        <div className="mt-2">
                          {order.items.map((item, index) => (
                            <p key={index} className="text-gray-700">• {item}</p>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className={`px-3 py-1 rounded-full text-sm font-medium €{
                          order.status === 'Processing' ? 'bg-blue-50 text-blue-700' :
                          order.status === 'Ready' ? 'bg-yellow-50 text-yellow-700' :
                          'bg-green-50 text-green-700'
                        }`}>
                          {order.status}
                        </div>
                        <p className="mt-2 text-right font-semibold">€{order.total.toFixed(2)}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end space-x-2">
                      {order.status === 'Processing' && (
                        <Button className="bg-bistro-600 hover:bg-bistro-700">
                          Mark as Ready
                        </Button>
                      )}
                      {order.status === 'Ready' && (
                        <Button className="bg-green-600 hover:bg-green-700">
                          Complete Order
                        </Button>
                      )}
                      <Button variant="outline">View Details</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="reviews">
            <h2 className="text-2xl font-semibold mb-6">Customer Reviews</h2>
            
            <div className="space-y-4">
              {reviews.map((review) => (
                <Card key={review.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium">{review.customer}</p>
                        <p className="text-sm text-gray-600">{review.date} • {review.meal}</p>
                      </div>
                      <div className="flex items-center bg-yellow-50 px-2 py-1 rounded">
                        <Star className="h-4 w-4 text-yellow-500 mr-1" fill="currentColor" />
                        <span className="text-sm font-medium">{review.rating}.0</span>
                      </div>
                    </div>
                    <p className="mt-3 text-gray-700">{review.comment}</p>
                    <div className="mt-4 flex justify-end">
                      <Button variant="outline" size="sm">Reply</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="earnings">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-semibold mb-6">Earnings Summary</h2>
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      <div className="flex justify-between items-center pb-4 border-b">
                        <p className="text-gray-600">Today</p>
                        <p className="font-semibold">€{earnings.today}</p>
                      </div>
                      <div className="flex justify-between items-center pb-4 border-b">
                        <p className="text-gray-600">This Week</p>
                        <p className="font-semibold">€{earnings.week}</p>
                      </div>
                      <div className="flex justify-between items-center pb-4 border-b">
                        <p className="text-gray-600">This Month</p>
                        <p className="font-semibold">€{earnings.month}</p>
                      </div>
                      <div className="flex justify-between items-center pt-2">
                        <p className="text-gray-900 font-medium">Total Earnings</p>
                        <p className="text-2xl font-bold text-bistro-700">€{earnings.total}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <h2 className="text-2xl font-semibold mb-6">Banking Information</h2>
                <Card>
                  <CardContent className="p-6">
                    <form className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Account Holder Name
                        </label>
                        <Input defaultValue="Maria Rodriguez" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Bank Name
                        </label>
                        <Input defaultValue="First National Bank" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Account Number
                        </label>
                        <Input defaultValue="XXXX-XXXX-XXXX-1234" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Routing Number
                        </label>
                        <Input defaultValue="XXX-XXX-XXX" />
                      </div>
                      <div className="pt-4">
                        <Button className="bg-bistro-600 hover:bg-bistro-700 w-full">
                          Update Banking Information
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="location">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-semibold mb-6">Kitchen Location</h2>
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-1">
                          This address will be used to calculate delivery distance to customers.
                        </p>
                        <div className="flex items-center text-amber-600 mb-4">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span className="text-sm">Only customers within the delivery range will see your meals</span>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Street Address
                        </label>
                        <Input 
                          value={street}
                          onChange={(e) => setStreet(e.target.value)}
                          placeholder="123 Main Street"
                          className="mb-3"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            City
                          </label>
                          <Input 
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="City"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            State
                          </label>
                          <Input 
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            placeholder="State"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          ZIP Code
                        </label>
                        <Input 
                          value={zip}
                          onChange={(e) => setZip(e.target.value)}
                          placeholder="ZIP Code"
                          className="mb-3"
                        />
                      </div>
                      <div className="pt-4">
                        <Button 
                          onClick={saveChefAddress}
                          className="bg-bistro-600 hover:bg-bistro-700 w-full"
                        >
                          Update Kitchen Location
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <h2 className="text-2xl font-semibold mb-6">Location Information</h2>
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <p className="text-gray-600">
                        Your kitchen location is used to calculate the distance to customer delivery addresses. 
                        The app will only show your meals to customers within the maximum delivery distance 
                        set by the admin.
                      </p>
                      <div className="bg-amber-50 p-4 rounded-md border border-amber-200">
                        <h3 className="font-medium text-amber-800 mb-2">Important Distance Information</h3>
                        <p className="text-sm text-amber-700">
                          For accurate distance calculation, please make sure your address is correct. 
                          The system uses your address coordinates to calculate the distance to 
                          customer locations.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default ChefPanel;
