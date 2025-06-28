# Nathan Behailu - Portfolio Website

A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS. Showcasing my skills, projects, and experience as a Computer Science student at NYU.

## 🚀 Features

- **Responsive Design**: Mobile-first approach with beautiful animations
- **Modern Tech Stack**: Built with Next.js 14, TypeScript, and Tailwind CSS
- **Smooth Animations**: Framer Motion for engaging user interactions
- **SEO Optimized**: Proper meta tags and structured data
- **Fast Performance**: Optimized for speed and accessibility
- **Contact Form**: Interactive contact form for easy communication
- **Project Showcase**: Detailed project cards with GitHub links
- **Skills Visualization**: Animated skill bars and categories

## 📋 Sections

1. **Hero Section**: Introduction and call-to-action
2. **About**: Detailed background and interests
3. **Experience**: Research and work experience
4. **Projects**: Portfolio of technical projects
5. **Skills**: Technical skills with proficiency levels
6. **Contact**: Contact information and form

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: Vercel (recommended)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Build & Deploy

### Build for Production

```bash
npm run build
# or
yarn build
```

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on push to main branch

### Manual Deployment

```bash
npm run build
npm run start
```

## 🎨 Customization

### Personal Information

Update the following files with your information:
- `components/Hero.tsx` - Main introduction
- `components/About.tsx` - About section content
- `components/Experience.tsx` - Work experience
- `components/Projects.tsx` - Project details
- `components/Skills.tsx` - Skills and proficiency levels
- `components/Contact.tsx` - Contact information

### Styling

- Colors: Modify `tailwind.config.js` for custom color schemes
- Fonts: Update `app/globals.css` for different fonts
- Layout: Adjust component spacing and grid layouts

### Adding Projects

Edit `components/Projects.tsx` to add or modify projects:

```typescript
{
  title: 'Project Name',
  description: 'Project description...',
  tech: ['Tech1', 'Tech2'],
  github: 'https://github.com/username/repo',
  demo: 'https://demo-link.com', // optional
  icon: IconComponent,
  category: 'Category'
}
```

## 📱 Responsive Design

The website is fully responsive and optimized for:
- Mobile devices (320px+)
- Tablets (768px+)
- Desktop (1024px+)
- Large screens (1280px+)

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file for any environment-specific variables:

```env
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

### SEO Configuration

Update `app/layout.tsx` with your meta information:

```typescript
export const metadata: Metadata = {
  title: 'Your Name - Portfolio',
  description: 'Your description...',
  // ... other meta tags
}
```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Contact

- **Email**: nathan.behailu@nyu.edu
- **GitHub**: [nathanbehailuz](https://github.com/nathanbehailuz)
- **LinkedIn**: [nathan-behailu](https://linkedin.com/in/nathan-behailu)

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS 