# Deployment Checklist

## Pre-Deployment Tasks

### ✅ Completed
- [x] Personalize all content (name, bio, projects, skills)
- [x] Update page title
- [x] Create custom favicon
- [x] Add meta description
- [x] Update contact information (email, LinkedIn, GitHub, website)

### ⚠️ Before Deploying

1. **Build & Test Production Build**
   ```bash
   npm run build
   npm run preview
   ```
   - Test all sections work correctly
   - Check responsive design on mobile/tablet
   - Verify all links work (GitHub, LinkedIn, email)
   - Test project modals open/close correctly
   - Ensure Three.js animations work smoothly

2. **Verify All Content**
   - [ ] All projects have correct information
   - [ ] All GitHub links are correct (only public repos)
   - [ ] Email address is correct
   - [ ] Social links are correct
   - [ ] Stats numbers are accurate
   - [ ] Skills list is complete

3. **Performance Check**
   - [ ] Run lighthouse audit
   - [ ] Check bundle size (should be reasonable)
   - [ ] Test loading times
   - [ ] Ensure images/assets are optimized

4. **SEO & Meta Tags** (if needed)
   - [ ] Add Open Graph tags for social sharing
   - [ ] Add Twitter Card meta tags
   - [ ] Verify meta description is set

5. **Browser Testing**
   - [ ] Test in Chrome
   - [ ] Test in Firefox
   - [ ] Test in Safari (if possible)
   - [ ] Test in Edge

6. **Mobile Responsiveness**
   - [ ] Test on mobile device (iPhone/Android)
   - [ ] Test on tablet
   - [ ] Check navigation works on mobile
   - [ ] Verify Three.js works on mobile (may need to disable on low-end devices)

7. **Deployment Setup**
   - [ ] Choose hosting platform (Vercel, Netlify, GitHub Pages, etc.)
   - [ ] Set up build command: `npm run build`
   - [ ] Set up output directory: `dist`
   - [ ] Configure custom domain (if needed)
   - [ ] Set up environment variables (if any)

8. **Final Checks**
   - [ ] Remove any console.logs or debug code
   - [ ] Check for any placeholder text
   - [ ] Verify no broken links
   - [ ] Test form submissions (if contact form is added later)

## GitHub Pages Deployment (if using)

If deploying to GitHub Pages at `clock.github.io/site/`, you may need to:

1. Update `vite.config.ts` base path:
   ```ts
   export default defineConfig({
     base: '/site/',
     // ... rest of config
   })
   ```

2. Or deploy to root `clock.github.io`:
   - Create `gh-pages` branch
   - Build and push dist folder to gh-pages branch

## Recommended: Vercel/Netlify

For easiest deployment:
- Connect your GitHub repo
- Auto-deploys on push
- Custom domain support
- HTTPS automatically

