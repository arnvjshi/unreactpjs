# UnReact.js App Directory

This directory follows the Next.js app directory convention for better organization and structure.

## Structure

```
app/
├── layout.ts      # Root layout component
├── page.ts        # Main page component
├── index.ts       # Entry point
├── components/    # Reusable components
│   ├── Button.ts  # Sample button component
│   └── index.ts   # Component exports
└── README.md      # This file
```

## Files

### `layout.ts`
The root layout component that wraps all pages. It handles:
- Document title management
- Meta tags
- Global layout structure
- Children component rendering

### `page.ts`
The main page component containing:
- Hero section with glassmorphic effects
- Feature cards with neumorphic design
- Footer with author information
- Responsive design

### `index.ts`
The entry point that:
- Imports the layout and page components
- Renders the app with proper structure
- Mounts to the DOM

### `components/`
A folder for reusable components:
- `Button.ts` - Sample button component with variants
- `index.ts` - Export all components for easy importing
- Add your own components here for reusability

## Features

- **Glassmorphism**: Beautiful glass-like effects with backdrop blur
- **Neumorphism**: Soft UI elements with depth and shadows
- **Responsive Design**: Mobile-first approach
- **TypeScript**: Full type safety
- **Modern CSS**: CSS Grid, Flexbox, and animations
- **Performance**: Optimized for speed and efficiency

## Author

Created by **Arnav Joshi** - [github.com/arnvjshi](https://github.com/arnvjshi)

## License

MIT License - Made with ❤️ for the developer community
