import { createComponent } from '../src';
import { RootLayout } from './layout';

const HeroSection = createComponent(() => {
  const hero = document.createElement('section');
  hero.className = 'hero-section';
  
  const container = document.createElement('div');
  container.className = 'hero-container';
  
  const title = document.createElement('h1');
  title.className = 'hero-title';
  title.innerHTML = 'Welcome to <span class="gradient-text">UnReact.js</span>';
  
  const subtitle = document.createElement('p');
  subtitle.className = 'hero-subtitle';
  subtitle.textContent = 'A modern framework combining the best of Angular and React';
  
  const author = document.createElement('div');
  author.className = 'author-info';
  author.innerHTML = `
    <p>Created by <span class="author-name">Arnav Joshi</span></p>
    <a href="https://github.com/arnvjshi" target="_blank" class="github-link">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
      github.com/arnvjshi
    </a>
  `;
  
  const ctaButton = document.createElement('button');
  ctaButton.className = 'cta-button neumorphic';
  ctaButton.textContent = 'Get Started';
  
  container.appendChild(title);
  container.appendChild(subtitle);
  container.appendChild(author);
  container.appendChild(ctaButton);
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
  
  footer.innerHTML = `
    <div class="footer-content">
      <p>&copy; 2024 UnReact.js by <a href="https://github.com/arnvjshi" target="_blank">Arnav Joshi</a></p>
      <p>MIT License - Made with ❤️ for the developer community</p>
    </div>
  `;
  
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
