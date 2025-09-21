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

### Previewing the Build

Preview the production build locally:

```bash
npm run preview
```

## Deployment

### Netlify Deployment

This application is configured for deployment to Netlify with optimizations for static hosting. You can deploy it in two ways:

#### Deploy using Netlify CLI

1. Install the Netlify CLI:

   ```bash

   npm install -g netlify-cli
   ```

2. Initialize and deploy:
   ```bash
   netlify init
   netlify deploy
   ```

#### Deploy using Git with Netlify

1. Push your code to a Git repository (GitHub, GitLab, or BitBucket)
2. Connect your repository to Netlify:
   - Go to the [Netlify dashboard](https://app.netlify.com/)
   - Click "New site from Git"
   - Select your repository
   - Configure the build settings:
     - Build command: `npm run build`
     - Publish directory: `build/client`
3. Click "Deploy site"

The application is configured with the following Netlify settings:

- Build command: `npm run build`
- Publish directory: `build/client`
- SPA redirect rules to handle client-side routing
- Asset optimization (CSS/JS bundling and minification)
- Cache headers for static assets
- Security headers for enhanced protection

#### Netlify Configuration Details

The application includes several optimizations for Netlify deployment:

1. **Static Asset Optimization**: CSS and JavaScript files are bundled and minified automatically
2. **Cache Headers**: Long-term caching for static assets in the `assets` directory
3. **Security Headers**: Added security headers including XSS protection and content type sniffing prevention
4. **SPA Routing**: Proper redirect configuration to handle client-side routing
5. **Base Path Configuration**: Vite is configured with `base: "./"` for relative asset paths

### Docker Deployment

Alternatively, you can deploy using Docker:

```bash
docker build -t shopping-cart .
docker run -p 3000:3000 shopping-cart
```

## Application Structure

```
│   ├── components/           # Reusable UI components
│   │   ├── cart-icon.tsx    # Cart icon with item count
│   │   └── navigation.tsx   # Main navigation bar
│   ├── contexts/            # React context providers
│   │   └── cart-context.tsx # Shopping cart state management
│   └── routes/              # Page routes
│       ├── cart.tsx         # Shopping cart page
│       └── home.tsx         # Home page with products
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