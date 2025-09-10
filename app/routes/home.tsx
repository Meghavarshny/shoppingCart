import { useState, useEffect } from "react";
import type { Route } from "./+types/home";
import { useCart } from "../contexts/cart-context";

// Define types for our product data
interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "ShopCart - Online Shopping" },
    { name: "description", content: "Welcome to ShopCart, your one-stop destination for online shopping!" },
  ];
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart, cart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        
        // Fetch all products
        const productsResponse = await fetch('https://fakestoreapi.com/products');
        if (!productsResponse.ok) {
          throw new Error('Failed to fetch products');
        }
        const productsData = await productsResponse.json();
        
        // Fetch categories
        const categoriesResponse = await fetch('https://fakestoreapi.com/products/categories');
        if (!categoriesResponse.ok) {
          throw new Error('Failed to fetch categories');
        }
        const categoriesData = await categoriesResponse.json();
        
        setProducts(productsData);
        setFilteredProducts(productsData);
        setCategories(categoriesData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products by category
  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.category === selectedCategory));
    }
  }, [selectedCategory, products]);

  // Check if a product is already in the cart
  const isInCart = (productId: number) => {
    return cart.some(item => item.id === productId);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-gray-100"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-red-500 bg-red-100 dark:bg-red-900/30 p-4 rounded">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-700 dark:to-purple-800 rounded-xl p-8 mb-12 text-center text-white shadow-lg">
        <h1 className="text-4xl font-bold mb-4">Welcome to ShopCart</h1>
        <p className="text-xl mb-6">Your one-stop destination for online shopping</p>
        <p className="text-lg opacity-90">{products.length} amazing products waiting for you</p>
      </div>
      
      {/* Category Filter */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 dark:text-white">Shop by Category</h2>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-full transition duration-200 ${
              selectedCategory === 'all'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            All Products
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full capitalize transition duration-200 ${
                selectedCategory === category
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      
      {/* Products Section */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold dark:text-white">
          {selectedCategory === 'all' ? 'All Products' : selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} available
        </p>
      </div>
      
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 text-xl">No products found in this category</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div 
              key={product.id} 
              className="border dark:border-gray-700 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow bg-white dark:bg-gray-800"
            >
              <img 
                src={product.image} 
                alt={product.title} 
                className="w-full h-48 object-contain p-4"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2 line-clamp-2 dark:text-white">{product.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2 capitalize">{product.category}</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg dark:text-white">${product.price.toFixed(2)}</span>
                  <button 
                    onClick={() => addToCart({
                      id: product.id,
                      title: product.title,
                      price: product.price,
                      image: product.image
                    })}
                    className={`font-bold py-2 px-4 rounded transition duration-200 ${
                      isInCart(product.id)
                        ? "bg-green-500 hover:bg-green-600 text-white"
                        : "bg-blue-500 hover:bg-blue-600 text-white"
                    }`}
                  >
                    {isInCart(product.id) ? "Added" : "Add to Cart"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
