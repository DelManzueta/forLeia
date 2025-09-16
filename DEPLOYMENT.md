# Deployment Guide

## Prerequisites

Before deploying CreativeQuest, ensure you have:

1. **Node.js 18+** installed
2. **Supabase account** for backend services
3. **Domain** (optional, for custom domain setup)

## Environment Setup

### 1. Supabase Configuration

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Go to Settings > API to get your project credentials
3. Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 2. Database Setup

Run the migration files in your Supabase SQL editor:

1. Navigate to the SQL Editor in your Supabase dashboard
2. Copy and paste the contents of `supabase/migrations/20250415153314_gentle_frost.sql`
3. Execute the migration to create the necessary tables

### 3. Edge Functions (Optional)

If you want to use the API integrations:

1. Deploy the edge functions to your Supabase project
2. The functions are located in `supabase/functions/`
3. Available functions:
   - `dictionary` - English word of the day
   - `fruityvice` - Fruit nutrition data
   - `duolingo` - Language learning progress (mock data)

## Build and Deploy

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Production Build

```bash
# Create production build
npm run build

# Preview production build locally
npm run preview
```

### Deployment Options

#### Option 1: Netlify
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables in Netlify dashboard

#### Option 2: Vercel
1. Connect your GitHub repository to Vercel
2. Vercel will auto-detect Vite configuration
3. Add environment variables in Vercel dashboard

#### Option 3: Static Hosting
1. Run `npm run build`
2. Upload the `dist` folder to any static hosting service
3. Ensure environment variables are configured

## Environment Variables

Required environment variables for production:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Post-Deployment Checklist

- [ ] Verify all pages load correctly
- [ ] Test user authentication (if implemented)
- [ ] Confirm database connections work
- [ ] Check that all API integrations function
- [ ] Validate responsive design on mobile devices
- [ ] Test all interactive features
- [ ] Verify edge functions are working (if deployed)

## Troubleshooting

### Common Issues

1. **Environment Variables Not Loading**
   - Ensure variables start with `VITE_`
   - Restart development server after adding variables
   - Check deployment platform environment variable settings

2. **Supabase Connection Issues**
   - Verify project URL and API key are correct
   - Check if RLS policies are properly configured
   - Ensure database migrations have been run

3. **Build Failures**
   - Check for TypeScript errors: `npm run lint`
   - Ensure all dependencies are installed
   - Verify import paths are correct

4. **404 Errors on Deployed Site**
   - Configure redirects for SPA routing
   - For Netlify: add `_redirects` file with `/* /index.html 200`
   - For Vercel: configure `vercel.json` with rewrites

## Performance Optimization

### Recommended Optimizations

1. **Image Optimization**
   - Use WebP format where possible
   - Implement lazy loading for images
   - Optimize image sizes for different screen densities

2. **Code Splitting**
   - Implement route-based code splitting
   - Lazy load heavy components
   - Use dynamic imports for large libraries

3. **Caching Strategy**
   - Configure proper cache headers
   - Use service workers for offline functionality
   - Implement data caching for API responses

## Monitoring

### Analytics Setup

1. **Performance Monitoring**
   - Add Google Analytics or similar
   - Monitor Core Web Vitals
   - Track user engagement metrics

2. **Error Tracking**
   - Implement error boundary components
   - Use services like Sentry for error monitoring
   - Monitor console errors and warnings

## Security Considerations

1. **Environment Variables**
   - Never commit `.env` files to version control
   - Use different keys for development and production
   - Regularly rotate API keys

2. **Content Security Policy**
   - Implement CSP headers
   - Restrict external resource loading
   - Validate all user inputs

3. **Authentication**
   - Use Supabase's built-in authentication
   - Implement proper session management
   - Add rate limiting for API calls

## Maintenance

### Regular Tasks

1. **Dependency Updates**
   - Update dependencies monthly
   - Test thoroughly after updates
   - Monitor for security vulnerabilities

2. **Database Maintenance**
   - Regular backups
   - Monitor query performance
   - Clean up unused data

3. **Content Updates**
   - Update learning content regularly
   - Add new challenges and activities
   - Refresh stock images and assets