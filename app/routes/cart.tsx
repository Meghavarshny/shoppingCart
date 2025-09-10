import { useCart } from "../contexts/cart-context";
import type { Route } from "./+types/cart";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Shopping Cart" },
    { name: "description", content: "View and manage your shopping cart" },
  ];
}

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, getCartTotal, getCartTotalWithDiscount } = useCart();

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 dark:text-white">Your Shopping Cart</h1>
        <div className="text-center py-12">
          <div className="text-5xl mb-4">🛒</div>
          <p className="text-gray-500 dark:text-gray-400 text-xl mb-6">Your cart is empty</p>
          <a 
            href="/" 
            className="mt-4 inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-300"
          >
            Continue Shopping
          </a>
        </div>
      </div>
    );
  }

  const subtotal = getCartTotal();
  const discount = subtotal * 0.1;
  const total = getCartTotalWithDiscount();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 dark:text-white">Your Shopping Cart ({cart.reduce((acc, item) => acc + item.quantity, 0)} items)</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            {cart.map((item) => (
              <div 
                key={item.id} 
                className="flex items-center p-4 border-b border-gray-200 dark:border-gray-700"
              >
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-20 h-20 object-contain"
                />
                <div className="ml-4 flex-1">
                  <h2 className="font-semibold dark:text-white">{item.title}</h2>
                  <p className="text-gray-600 dark:text-gray-400">${item.price.toFixed(2)}</p>
                </div>
                
                <div className="flex items-center">
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-3 py-1 rounded-l hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-200"
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="bg-gray-100 dark:bg-gray-700 px-4 py-1 dark:text-white">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-3 py-1 rounded-r hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-200"
                  >
                    +
                  </button>
                </div>
                
                <div className="ml-4 w-24 text-right">
                  <p className="font-semibold dark:text-white">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
                
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="ml-4 text-red-500 hover:text-red-700 dark:hover:text-red-400 transition duration-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 h-fit">
          <h2 className="text-xl font-bold mb-4 dark:text-white">Order Summary</h2>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
              <span className="dark:text-white">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Discount (10%)</span>
              <span className="text-red-500 dark:text-red-400">-${discount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between border-t border-gray-200 dark:border-gray-700 pt-3 mt-3">
              <span className="font-bold text-lg dark:text-white">Total</span>
              <span className="font-bold text-lg dark:text-white">${total.toFixed(2)}</span>
            </div>
          </div>
          
          <a 
            href="/checkout" 
            className="mt-6 block text-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg text-lg transition duration-300"
          >
            Proceed to Checkout
          </a>
          
          <a 
            href="/" 
            className="mt-4 block text-center text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition duration-200"
          >
            Continue Shopping
          </a>
        </div>
      </div>
    </div>
  );
}