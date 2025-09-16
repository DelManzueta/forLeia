# Contributing to CreativeQuest

Thank you for your interest in contributing to CreativeQuest! This document provides guidelines for contributing to the project.

## Development Setup

### Prerequisites

- Node.js 18 or higher
- npm or yarn package manager
- Git for version control

### Getting Started

1. **Fork the repository**
   ```bash
   git clone https://github.com/your-username/creative-quest.git
   cd creative-quest
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your Supabase credentials
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

## Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── shared/        # Common components (Navbar, Footer)
│   ├── ArtStudio/     # Art creation components
│   ├── BeatLab/       # Music creation tools
│   ├── Calendar/      # Calendar functionality
│   ├── Dashboard/     # Dashboard widgets
│   └── ...
├── pages/             # Page components
├── data/              # Static data and configurations
├── lib/               # Utility functions and services
├── styles/            # CSS files and design tokens
└── utils/             # Helper functions
```

## Code Style Guidelines

### General Principles

1. **Component Organization**
   - Keep components small and focused
   - Use descriptive names
   - Follow the single responsibility principle

2. **File Naming**
   - Use PascalCase for component files
   - Use camelCase for utility files
   - Use kebab-case for data files

3. **Import Organization**
   ```tsx
   // External libraries
   import React from 'react';
   import { Link } from 'react-router-dom';
   
   // Internal components
   import Navbar from '../shared/Navbar';
   
   // Utilities and data
   import { formatDate } from '../../utils/dateUtils';
   import soundLibrary from '../../data/soundLibrary.json';
   ```

### CSS Guidelines

1. **Use CSS Modules**
   - Each component should have its own `.module.css` file
   - Use CSS variables from `root.css`
   - Follow BEM-like naming conventions

2. **Design Tokens**
   - Use CSS variables defined in `src/styles/root.css`
   - Maintain consistent spacing, colors, and typography
   - Follow the 8px spacing system

3. **Responsive Design**
   - Mobile-first approach
   - Use CSS Grid and Flexbox
   - Test on multiple screen sizes

### TypeScript Guidelines

1. **Type Definitions**
   - Define interfaces for all data structures
   - Use proper typing for props and state
   - Avoid `any` type unless absolutely necessary

2. **Component Props**
   ```tsx
   interface ComponentProps {
     title: string;
     items: Item[];
     onSelect?: (item: Item) => void;
   }
   
   function Component({ title, items, onSelect }: ComponentProps) {
     // Component implementation
   }
   ```

## Adding New Features

### 1. Learning Modules

When adding a new learning module:

1. Create a new page component in `src/pages/ModuleName/`
2. Add supporting components in `src/components/ModuleName/`
3. Update the navigation in `src/components/shared/Navbar.tsx`
4. Add route in `src/App.tsx`
5. Create corresponding CSS modules

### 2. Interactive Components

For interactive components:

1. Use React hooks for state management
2. Implement proper loading and error states
3. Add accessibility features (ARIA labels, keyboard navigation)
4. Include hover and focus states

### 3. Data Integration

When adding data features:

1. Create JSON files in `src/data/` for static data
2. Use Supabase for dynamic data
3. Implement proper error handling
4. Add loading states

## Testing Guidelines

### Component Testing

1. **Test User Interactions**
   - Click events
   - Form submissions
   - Navigation

2. **Test Edge Cases**
   - Empty states
   - Error conditions
   - Loading states

3. **Accessibility Testing**
   - Keyboard navigation
   - Screen reader compatibility
   - Color contrast

### Manual Testing

1. **Cross-Browser Testing**
   - Chrome, Firefox, Safari, Edge
   - Mobile browsers

2. **Responsive Testing**
   - Mobile (320px+)
   - Tablet (768px+)
   - Desktop (1024px+)

3. **Performance Testing**
   - Page load times
   - Animation smoothness
   - Memory usage

## Submitting Changes

### Pull Request Process

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Follow the code style guidelines
   - Add tests if applicable
   - Update documentation

3. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add new learning module"
   ```

4. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create a Pull Request**
   - Provide a clear description
   - Include screenshots for UI changes
   - Reference any related issues

### Commit Message Format

Use conventional commits format:

```
type(scope): description

[optional body]

[optional footer]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

Examples:
- `feat(art-studio): add new drawing tools`
- `fix(beat-lab): resolve sound library loading issue`
- `docs(readme): update installation instructions`

## Code Review Guidelines

### For Reviewers

1. **Check Code Quality**
   - Follows project conventions
   - Proper error handling
   - Performance considerations

2. **Test Functionality**
   - Feature works as expected
   - No regressions introduced
   - Responsive design maintained

3. **Review Documentation**
   - Code is well-commented
   - README updated if needed
   - API changes documented

### For Contributors

1. **Self-Review**
   - Test your changes thoroughly
   - Check for console errors
   - Verify responsive design

2. **Documentation**
   - Update relevant documentation
   - Add comments for complex logic
   - Include usage examples

## Getting Help

### Resources

1. **Project Documentation**
   - README.md - Project overview
   - PROJECT.md - Detailed architecture
   - CSS_MODULES.md - Styling guidelines

2. **External Resources**
   - [React Documentation](https://react.dev)
   - [Supabase Documentation](https://supabase.com/docs)
   - [CSS Modules Guide](https://github.com/css-modules/css-modules)

### Communication

1. **Issues**
   - Use GitHub issues for bug reports
   - Provide detailed reproduction steps
   - Include screenshots when relevant

2. **Discussions**
   - Use GitHub discussions for questions
   - Share ideas and suggestions
   - Help other contributors

## Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes for significant contributions
- Project documentation

Thank you for contributing to CreativeQuest! 🚀