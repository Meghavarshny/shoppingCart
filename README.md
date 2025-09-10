# Shopping Cart Application

A ReactJS e-commerce application with product listing and shopping cart functionality using the Fake Store API.

## Features

- 🛍️ Product listing from Fake Store API with category filtering
- 📱 Responsive product grid layout
- 🛒 Shopping cart with add/remove items
- ➕➖ Quantity adjustment for cart items
- 💰 Price calculation with 10% discount
- 🔄 Real-time cart updates with localStorage persistence
- 🌐 React Router for navigation
- 🎨 TailwindCSS for styling

## Getting Started

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

### Building for Production

Create a production build:

```bash
npm run build
```

## Application Structure

```
app/
├── components/
│   ├── cart-icon.tsx       # Shopping cart icon with item count
│   └── navigation.tsx      # Navigation bar component
├── contexts/
│   ├── cart-context.tsx    # Shopping cart state management
│   └── theme-context.tsx   # Theme context (dark/light mode)
├── routes/
│   ├── +types/             # Route type definitions
│   ├── cart.tsx            # Shopping cart page
│   ├── checkout.tsx        # Checkout page
│   └── home.tsx            # Home/Products page
├── root.tsx                # Root layout component
├── routes.ts               # Route configuration
└── app.css                 # Global styles
```

## Functionality

### Product Listing
- Fetches all products from Fake Store API (https://fakestoreapi.com/products)
- Displays product image, title, category, description, and price
- Category filtering to browse products by type
- "Add to Cart" button for each product
- Button changes to "Added" when product is in cart

### Shopping Cart
- Add/remove items from cart
- Increase/decrease quantity of items
- Automatic price calculation for each item (price × quantity)
- Subtotal calculation
- 10% discount applied to total
- Real-time updates to all calculations
- Cart persistence using localStorage

### Checkout
- Simple checkout form for billing and payment information
- Order summary with all cart items
- Order confirmation page

## Technologies Used

- ReactJS
- React Router v7
- TailwindCSS
- Fake Store API
- TypeScript
- Vite

## Styling

This project uses [Tailwind CSS](https://tailwindcss.com/) for styling. The responsive grid layout adapts to different screen sizes.

## License

MIT
