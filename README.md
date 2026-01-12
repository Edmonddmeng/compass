# Compass - Lending Platform

Compass is an enterprise-grade fintech platform built for small to medium traditional lending firms. This platform streamlines loan management, risk assessment, and compliance operations.

## Features

- Modern React + TypeScript stack
- Tailwind CSS for responsive design
- Full type safety with TypeScript
- Comprehensive testing with Vitest
- API integration with React Query
- Form validation with React Hook Form + Zod
- Pre-commit hooks for code quality
- Enterprise-grade project structure

## Tech Stack

- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v7
- **State Management**: React Query (TanStack Query)
- **API Client**: Axios
- **Form Handling**: React Hook Form + Zod
- **Testing**: Vitest + React Testing Library
- **Code Quality**: ESLint + Prettier
- **Git Hooks**: Husky + lint-staged

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Edmonddmeng/compass.git
cd compass
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm test` - Run tests in watch mode
- `npm run test:ui` - Open Vitest UI
- `npm run test:coverage` - Generate test coverage report
- `npm run lint` - Lint code with ESLint
- `npm run lint:fix` - Fix linting issues automatically
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run type-check` - Run TypeScript type checking

## Project Structure

```
compass/
├── src/
│   ├── assets/          # Static assets (images, icons)
│   ├── components/      # React components
│   │   ├── common/      # Shared components
│   │   ├── features/    # Feature-specific components
│   │   └── layout/      # Layout components
│   ├── config/          # Configuration files
│   ├── context/         # React context providers
│   ├── hooks/           # Custom React hooks
│   ├── pages/           # Page components
│   ├── services/        # API services
│   ├── styles/          # Global styles
│   ├── test/            # Test setup and utilities
│   ├── types/           # TypeScript type definitions
│   ├── utils/           # Utility functions
│   ├── App.tsx          # Main App component
│   └── main.tsx         # Application entry point
├── .husky/              # Git hooks
├── .vscode/             # VS Code settings
├── index.html           # HTML entry point
├── vite.config.ts       # Vite configuration
├── tsconfig.json        # TypeScript configuration
├── tailwind.config.js   # Tailwind CSS configuration
└── package.json         # Project dependencies and scripts
```

## Code Quality

This project uses several tools to maintain code quality:

- **ESLint**: Enforces code style and catches common errors
- **Prettier**: Ensures consistent code formatting
- **TypeScript**: Provides static type checking
- **Husky**: Runs pre-commit hooks
- **lint-staged**: Runs linters on staged files

All checks run automatically before commits.

## Environment Variables

Create a `.env` file based on `.env.example`:

- `VITE_API_BASE_URL` - Backend API base URL
- `VITE_API_TIMEOUT` - API request timeout in milliseconds
- `VITE_APP_ENV` - Application environment (development/production)
- `VITE_ENABLE_ANALYTICS` - Enable analytics tracking
- `VITE_ENABLE_DEBUG` - Enable debug logging

## Contributing

1. Create a feature branch
2. Make your changes
3. Run tests and linting
4. Commit with descriptive messages
5. Push and create a pull request

## License

ISC
