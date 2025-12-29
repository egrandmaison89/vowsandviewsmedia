# Vows and Views Media Website

A cinematic, video-first wedding videographer website built with Eleventy (11ty) and Decap CMS, designed to convert warm traffic into inquiries while showcasing video work in an emotional, premium way.

## Features

- **Cinematic Design**: Full-bleed video hero, generous whitespace, elegant typography
- **Video-First**: Optimized Vimeo embeds with lazy loading and responsive aspect ratios
- **Content Management**: Git-backed Decap CMS for easy content updates
- **Performance**: Mobile-first, lazy-loaded videos, optimized assets
- **Accessibility**: Semantic HTML, ARIA labels, keyboard navigation
- **SEO**: Open Graph tags, structured data, proper meta tags

## Tech Stack

- **Static Site Generator**: Eleventy (11ty)
- **CMS**: Decap CMS (formerly Netlify CMS)
- **Deployment**: Netlify
- **Video Hosting**: Vimeo
- **Styling**: Vanilla CSS with custom properties
- **JavaScript**: Vanilla JS (no frameworks)

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git
- A Netlify account (for deployment)
- A Vimeo account (for video hosting)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd vowsandviewsmedia
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

The site will be available at `http://localhost:8080`

### Build for Production

```bash
npm run build
```

The built site will be in the `_site` directory.

## Project Structure

```
vowsandviewsmedia/
├── src/
│   ├── _data/              # Data files (CMS content)
│   │   ├── hero.json       # Hero section content
│   │   ├── valueStatement.json
│   │   ├── about.json
│   │   ├── site.json       # Site settings
│   │   ├── films/          # Individual film entries
│   │   └── testimonials/   # Testimonial entries
│   ├── _includes/          # Reusable templates
│   │   ├── base.njk        # Base HTML layout
│   │   ├── header.njk      # Site header
│   │   ├── footer.njk      # Site footer
│   │   └── video-embed.njk # Vimeo embed component
│   ├── _layouts/           # Page layouts
│   │   └── default.njk
│   ├── index.html          # Homepage
│   ├── films.html          # Films/Portfolio page
│   ├── about.html          # About page
│   ├── contact.html        # Contact page
│   ├── css/                # Stylesheets
│   │   ├── reset.css
│   │   └── main.css
│   └── js/                 # JavaScript
│       └── main.js
├── admin/                  # Decap CMS
│   ├── index.html
│   └── config.yml
├── public/                 # Static assets
│   └── images/
├── .eleventy.js            # Eleventy configuration
├── netlify.toml           # Netlify configuration
└── package.json
```

## Content Management

### Accessing the CMS

1. Deploy the site to Netlify
2. Navigate to `https://yoursite.com/admin`
3. Log in with Netlify Identity (Git Gateway)

### Editing Content

The CMS is configured with the following collections:

#### Hero Section
- **Location**: `src/_data/hero.json`
- **Fields**: Headline, Subheadline, Vimeo Video ID

#### Value Statement
- **Location**: `src/_data/valueStatement.json`
- **Fields**: Text

#### Films
- **Location**: `src/_data/films/` (individual JSON files)
- **Fields**: Title, Couple Names, Location, Year, Vimeo Video ID, Description, Featured (boolean)
- **Featured Films**: Films with `featured: true` appear on the homepage (max 6)

#### Testimonials
- **Location**: `src/_data/testimonials/` (individual JSON files)
- **Fields**: Quote, Author, Location

#### About Page
- **Location**: `src/_data/about.json`
- **Fields**: Heading, Photo, Intro, Philosophy, Working Together

#### Site Settings
- **Location**: `src/_data/site.json`
- **Fields**: Site Title, Description, URL, Author, Social Links

### Adding a Vimeo Video

1. Upload your video to Vimeo
2. Copy the video ID from the Vimeo URL (e.g., `https://vimeo.com/123456789` → ID is `123456789`)
3. Paste the ID into the "Vimeo Video ID" field in the CMS

### Adding Images

1. Upload images through the CMS (they'll be saved to `public/images/`)
2. Reference them in content using `/images/filename.jpg`

## Deployment to Netlify

### Initial Setup

1. **Push to Git Repository**
   - Push your code to GitHub, GitLab, or Bitbucket

2. **Connect to Netlify**
   - Log in to [Netlify](https://app.netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect your Git repository

3. **Configure Build Settings**
   - Build command: `npm run build`
   - Publish directory: `_site`
   - These are already configured in `netlify.toml`

4. **Enable Netlify Identity**
   - Go to Site settings → Identity
   - Click "Enable Identity"
   - Under "Registration preferences", set to "Invite only" or "Open"
   - Enable "Git Gateway" under Services

5. **Configure Decap CMS**
   - The CMS is already configured in `admin/config.yml`
   - After enabling Identity, you can access `/admin` to log in

6. **Set Up Form Handling**
   - Netlify automatically handles forms with `data-netlify="true"`
   - View submissions in Netlify dashboard → Forms

### Custom Domain

1. Go to Site settings → Domain management
2. Add your custom domain
3. Follow Netlify's DNS configuration instructions

## Local Development Workflow

1. Make changes to templates, styles, or scripts
2. Run `npm run dev` to see changes live
3. Test locally before pushing to Git
4. Push to Git → Netlify automatically rebuilds and deploys

## Content Update Workflow

1. Log into `/admin` on the live site
2. Make content changes in the CMS
3. Changes are committed to Git automatically
4. Netlify rebuilds and deploys automatically
5. Changes go live in 1-2 minutes

## Performance Optimization

The site includes several performance optimizations:

- **Lazy Loading**: Videos load only when in viewport
- **Responsive Embeds**: Vimeo embeds maintain aspect ratio
- **Asset Caching**: Static assets cached for 1 year
- **Preconnect**: DNS prefetching for external resources
- **Minimal JavaScript**: Vanilla JS, no heavy frameworks

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Graceful degradation for older browsers

## Troubleshooting

### Videos Not Loading
- Verify Vimeo video IDs are correct
- Check that videos are set to "Public" or "Unlisted" on Vimeo
- Ensure Vimeo embed settings allow embedding

### CMS Not Accessible
- Verify Netlify Identity is enabled
- Check that Git Gateway is enabled
- Ensure you're logged in with a Netlify account

### Forms Not Submitting
- Verify `data-netlify="true"` is on the form
- Check Netlify Forms is enabled in site settings
- Ensure form has `name="contact"` attribute

### Build Errors
- Run `npm install` to ensure dependencies are installed
- Check Node.js version (should be 18+)
- Verify all required data files exist

## Customization

### Colors
Edit CSS custom properties in `src/css/main.css`:
```css
:root {
  --color-black: #0a0a0a;
  --color-white: #fafafa;
  --color-accent: #d4af37;
}
```

### Typography
Change fonts in `src/_includes/base.njk` and update CSS variables in `main.css`.

### Layout
Modify templates in `src/_includes/` and `src/_layouts/`.

## Support

For issues or questions:
1. Check this README
2. Review Eleventy documentation: https://www.11ty.dev/
3. Review Decap CMS documentation: https://decapcms.org/
4. Review Netlify documentation: https://docs.netlify.com/

## License

MIT License - feel free to use this project as a starting point for your own wedding videographer website.

