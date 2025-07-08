# Stackstore

Stackstore is a mobile-first Angular app for browsing and buying skincare products. Users can explore a product catalog, view details, manage a cart, and complete a mock checkout. Data is stored in localStorage so it stays after reloads.

## Live Demo

🔗 [Live Site](https://stack-store.netlify.app)  
📁 [GitHub Repo](https://github.com/Juliet-niki/StackStore)

## Tech Stack

- Angular 17 with standalone components
- Tailwind CSS 3
- Angular Material 17
- RxJS BehaviorSubject for cart state
- Netlify for hosting

## Features

- Product listing from local JSON file (16 products)
- Product detail with Add to Cart
- Cart with quantity updates, remove, and totals
- Checkout flow with order confirmation
- Data stored and loaded from localStorage

## Design

- Mobile-first with Tailwind
- Responsive layout using grid and flex
- No dark mode or animation
- Semantic HTML with alt text

## SEO & Performance

- Used ngOptimizedImage for faster image loading
- Product data is local for quick access

## Error Handling

Basic only. Global handler and feedback UI not yet added.

## Testing

Unit testing not implemented yet. Suggested for future update.

## Setup

```bash
npm install
ng serve
```
