# Glamcart Frontend

Next.js 15 + React 19 application for the Glamcart virtual try-on platform. Features product browsing, virtual lipstick try-on with image upload, and shopping cart management.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Backend API running on `http://localhost:5000`

### Setup

```bash
# Install dependencies
npm install

# Development
npm run dev
# Open http://localhost:3000

# Build & Production
npm run build
npm start

# Type checking
npm run typecheck
```

## 📁 Project Structure

```
src/
├── app/              # Next.js App Router pages
│   ├── page.tsx      # Home/catalog
│   ├── products/     # Product listing & details
│   ├── try-on/       # Virtual try-on interface
│   └── cart/         # Shopping cart
├── components/       # React components
│   ├── layout/       # Header, Footer
│   ├── product/      # Product cards, filters
│   └── ui/           # shadcn/ui components
├── context/          # React Context (cart state)
├── hooks/            # Custom React hooks
└── lib/              # Utilities & helpers
```

## 🎨 Key Features

- **Product Catalog**: Browse lipsticks, filter by brand/color
- **Virtual Try-On**: Upload photo → apply lipstick color with real-time preview
- **Shopping Cart**: Add/remove products, persist to localStorage
- **Responsive Design**: Mobile-first with Tailwind CSS + shadcn/ui
- **TypeScript**: Full type safety

## 🔗 Backend Integration

Frontend communicates with backend API at `http://localhost:5000`:
- `GET /api/products` - Product catalog
- `POST /api/try-on/apply` - Image processing for try-on
- `GET/POST /api/cart/:userId` - Cart operations

## 🐳 Docker

```bash
# Build
docker build -t glamcart-frontend:latest .

# Run
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_API_URL=http://localhost:5000 \
  glamcart-frontend:latest
```

## 📦 Tech Stack
- **Next.js 15** (React 19)
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui components**
- **React Context** for state
- **Axios** for API calls

## 🚢 Deployment

- **Platform**: DigitalOcean App Platform
- **CI/CD**: GitHub Actions (automatic deployment on push to main)
- **Environment Variables**: Set in DigitalOcean dashboard

See the main README for full setup instructions.
