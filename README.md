# Virtual City 360° Tours

A platform for creating, sharing, and exploring immersive 360° virtual tours of cities around the world. Built with Nuxt 3, this application enables users to upload 360° videos, organize them into interactive tours, and share experiences with a global community.

## Features

- **360° Video Playback** - Immersive 360° video experience with interactive controls and VR support using Video.js and videojs-vr
- **Interactive Maps** - Explore tours with interactive maps showing locations and routes using Leaflet
- **Tour Management** - Create, edit, and manage virtual tours with rich metadata (location, time of day, descriptions)
- **User Authentication** - Secure authentication system powered by Supabase
- **Profile Management** - User profiles with tour management dashboard
- **Search & Filtering** - Filter tours by time of day (day/night), location, and search functionality
- **View Tracking** - Track tour views and analytics
- **Image Optimization** - Optimized image delivery with Nuxt Image

## Tech Stack

- **Framework**: Nuxt 3 with Vue 3 and TypeScript
- **State Management**: Pinia with persisted state plugin
- **Backend**: Supabase (PostgreSQL database, authentication, storage)
- **Styling**: Tailwind CSS with custom SCSS
- **Video Player**: Video.js with videojs-vr plugin for 360° playback
- **Maps**: Leaflet for interactive maps
- **Form Validation**: Vuelidate
- **Utilities**: VueUse, Nuxt Toast
- **Image Processing**: Nuxt Image

## Prerequisites

- Node.js 18+ 
- npm package manager
- A Supabase account and project

## Setup

### 1. Clone the repository

```bash
git clone <repository-url>
cd view-360-nuxt-3
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env` file in the project root with your Supabase credentials:

```env
SUPABASE_URL="https://your-project-id.supabase.co"
SUPABASE_KEY="your-public-anon-key"
```

You can find these values in your Supabase project settings under API.

### 4. Start the development server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

**Note**: Restart the dev server whenever you change environment variables.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build the application for production
- `npm run generate` - Generate static site
- `npm run preview` - Preview production build locally
- `npm run lint:fix` - Fix linting issues with ESLint

## Project Structure

```
view-360-nuxt-3/
├── src/
│   ├── assets/          # Images, fonts, global styles
│   ├── components/      # Reusable Vue components
│   │   ├── app/         # App-level components (Header, Modal)
│   │   ├── auth/        # Authentication components
│   │   ├── profile/     # Profile management components
│   │   └── tour/        # Tour-related components
│   ├── composables/     # Vue composition utilities
│   ├── interfaces/      # TypeScript type definitions
│   ├── layouts/         # Page layout templates
│   ├── middleware/      # Route middleware (auth guards)
│   ├── pages/           # Route-level pages
│   ├── plugins/         # Nuxt plugins
│   ├── stores/          # Pinia stores
│   └── types/           # Additional TypeScript types
├── server/
│   └── api/             # Server-side API routes
│       ├── auth/        # Authentication endpoints
│       ├── profile/     # Profile endpoints
│       ├── tours/       # Tour management endpoints
│       └── users/       # User-related endpoints
├── public/              # Static assets
├── nuxt.config.ts       # Nuxt configuration
└── package.json         # Dependencies and scripts
```

## Key Components

- **Video360Player** - 360° video player component with VR support
- **TourCard** - Tour preview card component
- **CreateEditForm** - Tour creation/editing form
- **MiniMap** - Interactive map component for tour routes

## API Endpoints

The application includes server-side API routes for:

- Authentication (`/api/auth/me`)
- Profile management (`/api/profile`)
- Tour CRUD operations (`/api/tours`)
- Tour view tracking (`/api/tours/[id]/view`)
- Image proxy (`/api/image-proxy`)

## Database Schema

The application uses Supabase PostgreSQL database with the following main entities:

- **users** - User accounts and profiles
- **tours** - Virtual tour records with metadata (name, description, location, video URL, etc.)

## Development

### Code Style

- **Linter**: ESLint with Nuxt ESLint configuration
- **Formatter**: Prettier (double quotes, semicolons, 2 spaces, 100 cols)
- **Type Safety**: TypeScript throughout the application

### Architecture Principles

- Feature-oriented structure
- Composables over mixins
- Service layer for API calls
- Pinia stores for state management
- Thin components (UI + minimal glue logic)

## Deployment

Build the application for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

For deployment options, see the [Nuxt deployment documentation](https://nuxt.com/docs/getting-started/deployment).

## License

[Add your license information here]
