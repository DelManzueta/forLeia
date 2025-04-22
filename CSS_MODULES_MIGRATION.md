# CSS Modules Migration Plan

## Pages

### Dashboard
- Convert gradient backgrounds to CSS variables
- Create module for dashboard grid layouts
- Extract card styles into reusable components
- Module needed: `Dashboard.module.css`

Key classes to migrate:
```css
.dashboardContainer {
  display: grid;
  gap: var(--spacing-8);
}

.statsGrid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: var(--spacing-6);
}

.featuredCard {
  background: linear-gradient(to right bottom, var(--color-emerald-400), var(--color-teal-500));
  border-radius: var(--radius-3xl);
  padding: var(--spacing-8);
}
```

### Art Studio
- Create module for canvas layout
- Style gallery grid
- Extract tool panel styles
- Module needed: `ArtStudio.module.css`

### Beat Lab
- Style beat pad grid
- Create module for audio controls
- Extract waveform visualizer styles
- Module needed: `BeatLab.module.css`

### Language Lab
- Create module for flashcard styles
- Style progress indicators
- Extract word list styles
- Module needed: `LanguageLab.module.css`

### Finance Fun
- Create module for coin animations
- Style reward cards
- Extract transaction list styles
- Module needed: `FinanceFun.module.css`

## Components

### Shared Components

#### Navbar
- Create module for navigation layout
- Style dropdown menus
- Extract mobile menu styles
- Module needed: `Navbar.module.css`

```css
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: var(--z-50);
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
}

.navLink {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  padding: var(--spacing-3) var(--spacing-4);
  border-radius: var(--radius-lg);
  transition: background-color var(--transition-duration-200) var(--ease-in-out);
}

.navLink:hover {
  background-color: var(--color-gray-50);
}

.navLinkActive {
  composes: navLink;
  color: var(--color-emerald-600);
  background-color: var(--color-emerald-50);
}
```

#### Footer
- Create module for footer layout
- Style link groups
- Module needed: `Footer.module.css`

### Feature Components

#### Calendar
- Create module for calendar grid
- Style date cells
- Extract event styles
- Module needed: `Calendar.module.css`

#### GoalTracker
- Create module for goal cards
- Style progress bars
- Extract completion indicators
- Module needed: `GoalTracker.module.css`

#### BeatPad
- Create module for pad grid
- Style sound buttons
- Extract animation effects
- Module needed: `BeatPad.module.css`

#### FlashcardDeck
- Create module for card flip animations
- Style progress indicators
- Extract navigation controls
- Module needed: `FlashcardDeck.module.css`

### Common Patterns to Extract

#### Cards
```css
.card {
  background-color: var(--color-surface);
  border-radius: var(--radius-3xl);
  padding: var(--spacing-6);
  box-shadow: var(--shadow-lg);
  transition: transform var(--transition-duration-300) var(--ease-out),
              box-shadow var(--transition-duration-300) var(--ease-out);
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-xl);
}
```

#### Buttons
```css
.button {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-2);
  padding: var(--spacing-2) var(--spacing-4);
  border-radius: var(--radius-lg);
  font-weight: var(--font-weight-medium);
  transition: all var(--transition-duration-200) var(--ease-in-out);
}

.buttonPrimary {
  composes: button;
  background-color: var(--color-primary-500);
  color: white;
}

.buttonPrimary:hover {
  background-color: var(--color-primary-600);
}
```

#### Grids
```css
.grid {
  display: grid;
  gap: var(--spacing-6);
}

.gridCols2 {
  composes: grid;
  grid-template-columns: repeat(2, 1fr);
}

.gridCols3 {
  composes: grid;
  grid-template-columns: repeat(3, 1fr);
}

@media (max-width: 768px) {
  .gridCols2,
  .gridCols3 {
    grid-template-columns: 1fr;
  }
}
```

#### Forms
```css
.input {
  width: 100%;
  padding: var(--spacing-2) var(--spacing-4);
  border: 1px solid var(--color-gray-200);
  border-radius: var(--radius-lg);
  transition: border-color var(--transition-duration-200) var(--ease-in-out);
}

.input:focus {
  outline: none;
  border-color: var(--color-primary-500);
  box-shadow: 0 0 0 2px var(--color-primary-100);
}
```

## Implementation Strategy

1. Start with shared components
   - Navbar
   - Footer
   - Common UI elements

2. Move to feature components
   - One module at a time
   - Test thoroughly after each conversion

3. Update pages
   - Convert page-specific styles
   - Ensure responsive layouts
   - Test interactions

4. Final cleanup
   - Remove Tailwind
   - Update documentation
   - Performance testing

## Testing Checklist

For each converted component:
- [ ] Visual comparison with Tailwind version
- [ ] Responsive behavior
- [ ] Hover/focus states
- [ ] Animations
- [ ] Dark mode support
- [ ] Cross-browser testing