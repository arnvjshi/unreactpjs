#!/usr/bin/env node
const { program } = require('commander');
const fs = require('fs-extra');
const path = require('path');
const inquirer = require('inquirer');

program
  .version('1.2.3')
  .description('A command-line tool to quickly set up a new UnReact.js project.')
  .argument('[app-name]', 'The name of the app to create')
  .action(async (appName) => {
    if (!appName) {
      const answers = await inquirer.prompt([
        {
          type: 'input',
          name: 'appName',
          message: 'Enter the name of the app:',
          validate: (input) => {
            if (!input) {
              return 'App name cannot be empty.';
            }
            return true;
          },
        },
      ]);
      appName = answers.appName;
    }

    const appPath = path.resolve(process.cwd(), appName);

    if (fs.existsSync(appPath)) {
      console.error(`Folder ${appName} already exists!`);
      process.exit(1);
    }

    console.log(`Creating a new UnReact.js app in ${appPath}`);

    try {
      await fs.ensureDir(appPath);
      await fs.ensureDir(path.join(appPath, 'app'));
      await fs.ensureDir(path.join(appPath, 'app', 'components'));
      await fs.ensureDir(path.join(appPath, 'public'));

      const packageJson = {
        name: appName,
        version: '0.1.0',
        main: 'app/index.pjs',
        scripts: {
          start: 'npx esbuild app/index.pjs --bundle --servedir=public --outfile=public/bundle.js --loader:.pjs=ts --resolve-extensions=.pjs,.ts,.js',
          dev: 'npx esbuild app/index.pjs --bundle --servedir=public --outfile=public/bundle.js --watch --loader:.pjs=ts --resolve-extensions=.pjs,.ts,.js',
          arnv: 'npx esbuild app/index.pjs --bundle --servedir=public --outfile=public/bundle.js --watch --loader:.pjs=ts --resolve-extensions=.pjs,.ts,.js',
          build: 'npx esbuild app/index.pjs --bundle --outfile=dist/bundle.js --loader:.pjs=ts --resolve-extensions=.pjs,.ts,.js',
        },
        dependencies: {
          unreactpjs: 'latest',
        },
        devDependencies: {
          esbuild: '^0.19.0',
        },
      };

      await fs.writeJson(path.join(appPath, 'package.json'), packageJson, { spaces: 2 });

      const indexHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>UnReact.js - Modern Framework by Arnav Joshi</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="styles.css">
    <style>
      body { position: relative; }
      #root { position: relative; z-index: 2; }
      .vanta-canvas { position: fixed !important; top: 0; left: 0; width: 100%; height: 100%; z-index: 1; }
    </style>
</head>
<body>
    <div id="root"></div>
    <script src="bundle.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js" integrity="sha512-0Qb0O1aQO8x8G2xHjWZyZrX8n9l4lT7n2v8Jw7r3Xy6fU6g0Z8sVxJcQm3g0r8nP7g1e9G5kqk0C2y0WQ7zNwQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="https://unpkg.com/vanta@latest/dist/vanta.waves.min.js"></script>
    <script>
      window.addEventListener('load', function() {
        if (window.VANTA && window.VANTA.WAVES) {
          window.VANTA.WAVES({
            el: document.body,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            color: 0x4ecdc4,
            shininess: 50,
            waveHeight: 20,
            waveSpeed: 0.75,
            zoom: 1
          });
        }
      });
    </script>
</body>
</html>
`;
      await fs.writeFile(path.join(appPath, 'public', 'index.html'), indexHtml);

      const indexTs = `
import { createComponent } from 'unreactpjs';
import { RootLayout } from './layout';
import { HomePage } from './page';

const App = createComponent(() => {
    return RootLayout({
        title: 'UnReact.js - Modern Framework',
        children: HomePage({})
    });
});

document.getElementById('root')?.appendChild(App({}));
`;
      await fs.writeFile(path.join(appPath, 'app', 'index.pjs'), indexTs);

      const layoutTs = `
import { createComponent } from 'unreactpjs';

export interface LayoutProps {
  children: any;
  title?: string;
}

export const RootLayout = createComponent((props: LayoutProps) => {
  const layout = document.createElement('div');
  layout.className = 'app-layout';
  
  // Add meta tags and title
  if (props.title) {
    document.title = props.title;
  }
  
  // Add children
  if (props.children) {
    if (Array.isArray(props.children)) {
      props.children.forEach(child => layout.appendChild(child));
    } else {
      layout.appendChild(props.children);
    }
  }
  
  return layout;
});

export default RootLayout;
`;
      await fs.writeFile(path.join(appPath, 'app', 'layout.pjs'), layoutTs);

      const pageTs = `
import { createComponent } from 'unreactpjs';
import { RootLayout } from './layout';

const HeroSection = createComponent(() => {
  const hero = document.createElement('section');
  hero.className = 'hero-section';
  
  const container = document.createElement('div');
  container.className = 'hero-container';
  
  const logo = document.createElement('img');
  logo.src = 'logo.png';
  logo.alt = 'UnReact.js Logo';
  logo.style.maxWidth = '120px';
  logo.style.marginBottom = '1rem';

  const banner = document.createElement('img');
  banner.src = 'banner.png';
  banner.alt = 'UnReact.js Banner';
  banner.style.maxWidth = '100%';
  banner.style.borderRadius = '12px';
  banner.style.margin = '0 auto 1.25rem';

  const title = document.createElement('h1');
  title.className = 'hero-title';
  title.innerHTML = 'Welcome to <span class="gradient-text">UnReact.js</span>';
  
  const subtitle = document.createElement('p');
  subtitle.className = 'hero-subtitle';
  subtitle.textContent = 'A modern framework combining the best of Angular and React';
  
  const author = document.createElement('div');
  author.className = 'author-info';
  author.innerHTML = \`
    <p>Created by <span class="author-name">Arnav Joshi</span></p>
    <a href="https://github.com/arnvjshi" target="_blank" class="github-link">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
      github.com/arnvjshi
    </a>
  \`;
  
  const ctaButton = document.createElement('button');
  ctaButton.className = 'cta-button neumorphic';
  ctaButton.textContent = 'Get Started';
  
  container.appendChild(title);
  container.appendChild(subtitle);
  container.appendChild(author);
  container.appendChild(ctaButton);
  container.insertBefore(banner, title);
  container.insertBefore(logo, banner);
  hero.appendChild(container);
  
  return hero;
});

const FeatureCard = createComponent((props: { title: string; description: string; icon: string }) => {
  const card = document.createElement('div');
  card.className = 'feature-card glassmorphic';
  
  const icon = document.createElement('div');
  icon.className = 'feature-icon';
  icon.innerHTML = props.icon;
  
  const title = document.createElement('h3');
  title.className = 'feature-title';
  title.textContent = props.title;
  
  const description = document.createElement('p');
  description.className = 'feature-description';
  description.textContent = props.description;
  
  card.appendChild(icon);
  card.appendChild(title);
  card.appendChild(description);
  
  return card;
});

const FeaturesSection = createComponent(() => {
  const section = document.createElement('section');
  section.className = 'features-section';
  
  const container = document.createElement('div');
  container.className = 'features-container';
  
  const title = document.createElement('h2');
  title.className = 'section-title';
  title.textContent = 'Why Choose UnReact.js?';
  
  const featuresGrid = document.createElement('div');
  featuresGrid.className = 'features-grid';
  
  const features = [
    {
      title: 'Component-Based',
      description: 'Build reusable components with enhanced communication patterns',
      icon: '🧩'
    },
    {
      title: 'TypeScript First',
      description: 'Full TypeScript support with excellent developer experience',
      icon: '⚡'
    },
    {
      title: 'Modern Architecture',
      description: 'Next.js-like app directory structure for better organization',
      icon: '🏗️'
    },
    {
      title: 'Performance Focused',
      description: 'Optimized for speed and efficiency with minimal overhead',
      icon: '🚀'
    }
  ];
  
  features.forEach(feature => {
    featuresGrid.appendChild(FeatureCard(feature));
  });
  
  container.appendChild(title);
  container.appendChild(featuresGrid);
  section.appendChild(container);
  
  return section;
});

const Footer = createComponent(() => {
  const footer = document.createElement('footer');
  footer.className = 'footer';
  
  footer.innerHTML = \`
    <div class="footer-content">
      <p>&copy; 2024 UnReact.js by <a href="https://github.com/arnvjshi" target="_blank">Arnav Joshi</a></p>
      <p>MIT License - Made with ❤️ for the developer community</p>
    </div>
  \`;
  
  return footer;
});

export const HomePage = createComponent(() => {
  const page = document.createElement('div');
  page.className = 'home-page';
  
  page.appendChild(HeroSection({}));
  page.appendChild(FeaturesSection({}));
  page.appendChild(Footer({}));
  
  return page;
});

export default HomePage;
`;
      await fs.writeFile(path.join(appPath, 'app', 'page.pjs'), pageTs);

      const sampleComponent = `
import { createComponent } from 'unreactpjs';

export interface ButtonProps {
  text: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

export const Button = createComponent((props: ButtonProps) => {
  const button = document.createElement('button');
  button.className = \`button \${props.variant || 'primary'}\`;
  button.textContent = props.text;
  
  if (props.onClick) {
    button.addEventListener('click', props.onClick);
  }
  
  return button;
});

export default Button;
`;
      await fs.writeFile(path.join(appPath, 'app', 'components', 'Button.pjs'), sampleComponent);

      const componentsIndex = `
// Export all components from this file for easy importing
export { Button } from './Button';
export { Navbar } from './Navbar';
export { Footer } from './Footer';

// Add more component exports here as you create them
`;
      await fs.writeFile(path.join(appPath, 'app', 'components', 'index.pjs'), componentsIndex);

      const stylesCss = `/* Reset and base styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  color: #333;
  overflow-x: hidden;
}

/* App Layout */
.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Home Page */
.home-page {
  flex: 1;
  display: flex;
  flex-direction: column;
}

/* Hero Section */
.hero-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;
  overflow: hidden;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="rgba(255,255,255,0.1)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
  opacity: 0.3;
  z-index: 1;
}

.hero-container {
  text-align: center;
  max-width: 800px;
  z-index: 2;
  position: relative;
}

.hero-title {
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 800;
  margin-bottom: 1.5rem;
  line-height: 1.1;
  color: white;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.gradient-text {
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4);
  background-size: 300% 300%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradient-shift 3s ease-in-out infinite;
}

@keyframes gradient-shift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.hero-subtitle {
  font-size: clamp(1.2rem, 3vw, 1.8rem);
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 2rem;
  font-weight: 300;
  line-height: 1.6;
}

.author-info {
  margin-bottom: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.author-info p {
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.1rem;
}

.author-name {
  color: #4ecdc4;
  font-weight: 600;
  text-shadow: 0 2px 10px rgba(78, 205, 196, 0.3);
}

.github-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-size: 1rem;
  transition: all 0.3s ease;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.github-link:hover {
  color: white;
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

/* CTA Button - Neumorphic */
.cta-button {
  font-size: 1.2rem;
  font-weight: 600;
  padding: 1rem 2.5rem;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  background: linear-gradient(145deg, #667eea, #764ba2);
  color: white;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.cta-button.neumorphic {
  box-shadow: 
    20px 20px 60px rgba(0, 0, 0, 0.3),
    -20px -20px 60px rgba(255, 255, 255, 0.1);
}

.cta-button:hover {
  transform: translateY(-3px);
  box-shadow: 
    25px 25px 75px rgba(0, 0, 0, 0.4),
    -25px -25px 75px rgba(255, 255, 255, 0.15);
}

.cta-button:active {
  transform: translateY(-1px);
  box-shadow: 
    15px 15px 45px rgba(0, 0, 0, 0.3),
    -15px -15px 45px rgba(255, 255, 255, 0.1);
}

/* Features Section */
.features-section {
  padding: 5rem 2rem;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.features-container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  text-align: center;
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 700;
  margin-bottom: 4rem;
  color: white;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

/* Feature Cards - Glassmorphic */
.feature-card {
  padding: 2.5rem 2rem;
  border-radius: 20px;
  text-align: center;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
}

.feature-card.glassmorphic {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.feature-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transition: left 0.5s;
}

.feature-card:hover::before {
  left: 100%;
}

.feature-card:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  background: rgba(255, 255, 255, 0.15);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1.5rem;
  display: block;
}

.feature-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: white;
}

.feature-description {
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  font-size: 1rem;
}

/* Footer */
.footer {
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(20px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 2rem;
  text-align: center;
}

.footer-content {
  max-width: 600px;
  margin: 0 auto;
}

.footer-content p {
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.footer-content a {
  color: #4ecdc4;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.footer-content a:hover {
  color: #45b7d1;
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-section {
    padding: 1rem;
  }
  
  .features-section {
    padding: 3rem 1rem;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .feature-card {
    padding: 2rem 1.5rem;
  }
  
  .cta-button {
    padding: 0.8rem 2rem;
    font-size: 1rem;
  }
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-container,
.feature-card {
  animation: fadeInUp 0.8s ease-out;
}

.feature-card:nth-child(1) { animation-delay: 0.1s; }
.feature-card:nth-child(2) { animation-delay: 0.2s; }
.feature-card:nth-child(3) { animation-delay: 0.3s; }
.feature-card:nth-child(4) { animation-delay: 0.4s; }

/* Scrollbar Styling */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
}

::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}`;
      await fs.writeFile(path.join(appPath, 'public', 'styles.css'), stylesCss);

      // Copy branding assets (prefer transparent logo) from the package assets
      const logoTransparentSrc = path.resolve(__dirname, '..', 'assets', 'logo-transparent.png');
      const logoSrc = path.resolve(__dirname, '..', 'assets', 'logo.png');
      try {
        if (fs.existsSync(logoTransparentSrc)) {
          await fs.copyFile(logoTransparentSrc, path.join(appPath, 'public', 'logo-transparent.png'));
          await fs.copyFile(logoTransparentSrc, path.join(appPath, 'public', 'favicon.png'));
        } else if (fs.existsSync(logoSrc)) {
          await fs.copyFile(logoSrc, path.join(appPath, 'public', 'logo-transparent.png'));
          await fs.copyFile(logoSrc, path.join(appPath, 'public', 'favicon.png'));
        }
      } catch (_) {}

      // Create a branded 404 page with Vanta background
      const notFoundHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Page Not Found - UnReact.js</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap" rel="stylesheet">
  <link rel="icon" type="image/png" href="favicon.png">
  <style>
    html, body { height: 100%; }
    body { margin: 0; font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; color: #fff; overflow: hidden; background:#0b0b0f; }
    .vanta-canvas { position: fixed !important; top: 0; left: 0; width: 100%; height: 100%; z-index: 1; }
    .container { position: relative; z-index: 2; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; text-align: center; padding: 2rem; }
    .logo { max-width: 120px; margin-bottom: 1rem; }
    .title { font-size: clamp(2rem, 6vw, 4rem); font-weight: 800; margin: 0.5rem 0; }
    .subtitle { opacity: 0.9; margin-bottom: 1.5rem; }
    .home-btn { background: linear-gradient(145deg, #7c3aed, #4c1d95); color: #fff; border: none; padding: 0.85rem 1.25rem; border-radius: 10px; cursor: pointer; font-weight: 600; }
  </style>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"></script>
  <script src="https://unpkg.com/vanta@latest/dist/vanta.waves.min.js"></script>
</head>
<body>
  <div class="container">
    <img class="logo" src="logo-transparent.png" alt="UnReact.js Logo" onerror="this.src='logo.png'" />
    <h1 class="title">404</h1>
    <p class="subtitle">Sorry, the page you are looking for does not exist.</p>
    <a href="/"><button class="home-btn">Go Home</button></a>
  </div>
  <script>
    window.addEventListener('load', function() {
      if (window.VANTA && window.VANTA.WAVES) {
        window.VANTA.WAVES({
          el: document.body,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          color: 0x7c3aed,
          shininess: 50,
          waveHeight: 20,
          waveSpeed: 0.75,
          zoom: 1
        });
      }
    });
  </script>
</body>
</html>
`;
      await fs.writeFile(path.join(appPath, 'public', '404.html'), notFoundHtml);

      console.log(`UnReact app created in ${appPath}`);
      console.log(`Run:
  cd ${appName}
  npm install
  npm run dev    # Start development server with watch mode
  npm arnv       # Alternative command to start development server
  npm start      # Build and serve once
  npm run build  # Build for production`);
    } catch (error) {
      console.error('Error creating the app:', error);
      process.exit(1);
    }
  });

program.parse(process.argv);
