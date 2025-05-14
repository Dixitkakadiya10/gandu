
import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const CartDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { items, removeFromCart, updateQuantity, getTotal, getCount } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    
    // Store order in localStorage for demo purposes
    const orderId = Math.floor(Math.random() * 100000) + 10000;
    const newOrder = {
      id: orderId,
      date: new Date().toISOString().split('T')[0],
      items: items.map(item => item.name),
      total: getTotal(),
      status: "Pending"
    };
    
    const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    const updatedOrders = [newOrder, ...existingOrders];
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    
    // Clear cart
    localStorage.removeItem("cart");
    
    toast.success("Order placed successfully!");
    setIsOpen(false);
    navigate("/customer");
    // Force a refresh to update the orders list
    window.location.reload();
  };

  return (
    <>
      <Button 
        variant="outline" 
        className="flex items-center" 
        onClick={() => setIsOpen(true)}
      >
        <ShoppingCart className="h-4 w-4 mr-2" /> Cart ({getCount()})
      </Button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
          <div className="bg-white w-full max-w-md h-full flex flex-col overflow-hidden animate-in slide-in-from-right">
            <div className="border-b p-4 flex justify-between items-center">
              <h2 className="text-xl font-semibold">Your Cart</h2>
              <Button variant="ghost" onClick={() => setIsOpen(false)}>✕</Button>
            </div>
            
            <div className="flex-grow overflow-auto p-4">
              {items.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  Your cart is empty
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 border-b pb-4">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-600">by {item.chef}</p>
                        <p className="font-bold mt-1">${item.price.toFixed(2)}</p>
                        
                        <div className="flex items-center mt-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="mx-3">{item.quantity}</span>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="h-8 ml-auto text-red-500 hover:text-red-700"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="border-t p-4 space-y-4">
              <div className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>${getTotal().toFixed(2)}</span>
              </div>
              <Button 
                className="w-full bg-bistro-600 hover:bg-bistro-700"
                onClick={handleCheckout}
                disabled={items.length === 0}
              >
                Checkout
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CartDrawer;
