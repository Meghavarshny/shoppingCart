import { Link } from "react-router";
import { CartIcon } from "./cart-icon";

export function Navigation() {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold text-gray-800">
            ShopCart
          </Link>
          <div className="flex space-x-4 items-center">
            <CartIcon />
          </div>
        </div>
      </div>
    </nav>
  );
}