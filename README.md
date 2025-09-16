# CreativeQuest - Interactive Learning Platform

A comprehensive learning platform designed to make education engaging and interactive for children. CreativeQuest combines creative activities, coding challenges, language learning, and organizational tools to provide a well-rounded educational experience.

## ✨ Features

### 🎨 Creative Modules
- **Art Studio** - Digital art creation with inspiration gallery and weekly challenges
- **Beat Lab** - Music creation with sound library, beat pads, and voice recording
- **Digital Design** - Design tutorials, project management, and inspiration board
- **Coding Playground** - Interactive coding environment with Scratch integration

### 📚 Learning Modules
- **Language Lab** - Spanish learning with Duolingo integration, flashcards, and word of the day
- **Typing Quest** - Typing speed tests with multiple difficulty levels and progress tracking
- **Library** - Book tracking, reading goals, and recommendations

### 📋 Organization Tools
- **Task Master** - Goal and task management with star rewards
- **Email Explorer** - Email communication learning environment
- **CoinQuest** - Financial education with virtual rewards system
- **Calendar** - Event management and scheduling

### 💪 Wellness
- **Fitness Module** - Daily yoga, nutrition tips, mindfulness, and healthy eating guides

## 🚀 Quick Start

### Prerequisites

- Node.js 18 or higher
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd creative-quest
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your Supabase credentials (optional for basic functionality)
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🏗️ Architecture

### Frontend
- **React 18** with TypeScript/JSX
- **CSS Modules** with design tokens
- **React Router** for navigation
- **Lucide React** for icons

### Backend (Optional)
- **Supabase** for authentication and database
- **Edge Functions** for API integrations
- **Local Storage** for offline functionality

### Key Technologies
- Vite for fast development and building
- Modern CSS with custom properties
- Responsive design with mobile support
- Accessibility features (WCAG 2.1 AA)

## 📁 Project Structure

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

## 🎯 Core Features

### Gamification System
- Star rewards for completing tasks
- Achievement badges
- Progress tracking
- Virtual coin economy

### Educational Content
- Interactive learning modules
- Progress visualization
- Skill development tracking
- Personalized challenges

### Creative Tools
- Digital art creation
- Music composition
- Design projects
- Coding challenges

## 🔧 Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Environment Variables

Create a `.env` file based on `.env.example`:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### CSS Architecture

The project uses CSS Modules with a design token system:

- `src/styles/root.css` - Global CSS variables and design tokens
- `*.module.css` - Component-specific styles
- Consistent spacing, colors, and typography
- Dark mode support with `prefers-color-scheme`

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: 640px, 768px, 1024px, 1280px, 1536px
- Touch-friendly interfaces
- Optimized for tablets and phones

## ♿ Accessibility

- WCAG 2.1 AA compliance
- Keyboard navigation support
- Screen reader compatibility
- High contrast color schemes
- Focus management

## 🚀 Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy Options

1. **Netlify** - Connect GitHub repo, auto-deploy on push
2. **Vercel** - Zero-config deployment with GitHub integration
3. **Static Hosting** - Build and upload `dist` folder

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Development Workflow

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with love for educational purposes
- Inspired by modern learning platforms
- Uses open-source libraries and tools
- Stock photos from Unsplash
- Icons from Lucide React

## 📞 Support

For questions, issues, or suggestions:

1. Check existing [GitHub Issues](../../issues)
2. Create a new issue with detailed information
3. Join our [GitHub Discussions](../../discussions)

---

**Made with ❤️ for creative learning**