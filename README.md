# CreativeQuest Learning Platform

A modern, interactive learning platform designed for children to explore creativity, coding, language, and more.

## Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── ArtStudio/     # Art creation components
│   ├── BeatLab/       # Music creation tools
│   ├── Calendar/      # Calendar functionality
│   ├── Dashboard/     # Dashboard widgets
│   ├── DigitalDesign/ # Design tools
│   ├── Fitness/       # Fitness tracking
│   ├── LanguageLab/   # Language learning
│   └── shared/        # Common components
├── pages/             # Page components
│   ├── ArtStudio/
│   ├── BeatLab/
│   ├── Dashboard/
│   └── ...
├── data/             # Static data and configurations
├── lib/             # Utility functions and services
└── utils/           # Helper functions

public/              # Static assets
supabase/           # Backend services
```

## Core Features

1. **Dashboard System**
   - Activity tracking
   - Progress visualization
   - Recent activities feed

2. **Learning Modules**
   - Art Studio
   - Coding Playground
   - Language Lab
   - Digital Design
   - Beat Lab
   - Finance Fun
   - Typing Quest
   - Library

3. **Progress Tracking**
   - Star rewards system
   - Achievement badges
   - Learning streaks

4. **Interactive Features**
   - Calendar events
   - Task management
   - Goal tracking

## Component Architecture

### Base Components
- `Navbar`: Main navigation
- `Footer`: Site footer
- `LocalCalendar`: Calendar functionality
- `GoalTracker`: Task and goal tracking

### Module-Specific Components
Each learning module has its own component directory with specialized features:

- `ArtStudio/`: Drawing and creative tools
- `BeatLab/`: Music creation components
- `LanguageLab/`: Language learning tools
- `DigitalDesign/`: Design interface components

## State Management

- Local state using React hooks
- localStorage for persistence
- Supabase for backend data

## Routing Structure

```javascript
/                     # Main dashboard
/creative             # Creative dashboard
/learning             # Learning dashboard
/organization         # Organization dashboard
/art-studio          # Art creation
/coding              # Coding playground
/language            # Language learning
/design              # Digital design
/music               # Beat lab
/finance             # Finance learning
/typing              # Typing practice
/library             # Digital library
/email               # Email learning
/tasks               # Task management
```

## Customization Guide

### Removing Tailwind

1. Remove Tailwind dependencies:
```bash
npm uninstall tailwindcss postcss autoprefixer
```

2. Delete Tailwind configuration files:
- `tailwind.config.js`
- `postcss.config.js`

3. Remove Tailwind directives from `src/index.css`:
```css
/* Delete these lines */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

4. Create your own CSS structure:
```
src/styles/
├── base/            # Reset and base styles
├── components/      # Component-specific styles
├── layouts/         # Layout styles
├── themes/          # Theme variations
└── utilities/       # Helper classes
```

### Key CSS Classes to Replace

#### Layout Classes
- `container`: Main content wrapper
- `flex`: Flexbox container
- `grid`: Grid container
- `space-y-*`: Vertical spacing
- `gap-*`: Grid/Flex gaps

#### Component Classes
- `rounded-*`: Border radius
- `shadow-*`: Box shadows
- `bg-*`: Background colors
- `text-*`: Text colors and sizes

#### Interactive Classes
- `hover:*`: Hover states
- `focus:*`: Focus states
- `active:*`: Active states
- `transition-*`: Transitions

### Theme Structure

Create a theme system with CSS variables:

```css
:root {
  /* Colors */
  --color-primary: #10B981;
  --color-secondary: #3B82F6;
  --color-accent: #8B5CF6;
  --color-background: #F3F4F6;
  --color-text: #1F2937;

  /* Typography */
  --font-primary: system-ui, sans-serif;
  --font-size-base: 16px;
  --line-height-base: 1.5;

  /* Spacing */
  --spacing-unit: 4px;
  --spacing-small: calc(var(--spacing-unit) * 2);
  --spacing-medium: calc(var(--spacing-unit) * 4);
  --spacing-large: calc(var(--spacing-unit) * 8);

  /* Borders */
  --border-radius: 8px;
  --border-width: 1px;
  --border-color: #E5E7EB;

  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);

  /* Transitions */
  --transition-fast: 150ms ease-in-out;
  --transition-normal: 300ms ease-in-out;
  --transition-slow: 500ms ease-in-out;
}
```

## Development

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Backend Integration

The project uses Supabase for backend services:

- Authentication
- Database
- Storage
- Edge Functions

### Database Schema

The database includes tables for:
- User progress
- Achievements
- Learning content
- Calendar events
- Task management

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License