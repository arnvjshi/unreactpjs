import { createComponent } from '../core/component';

export const Navbar = createComponent(() => {
  const nav = document.createElement('nav');
  nav.className = 'navbar glassmorphic';

  const container = document.createElement('div');
  container.className = 'navbar-container';

  const left = document.createElement('div');
  left.className = 'navbar-left';

  const logoImg = document.createElement('img');
  logoImg.src = 'logo-transparent.png';
  logoImg.alt = 'UnReact.js Logo';
  (logoImg as any).onerror = () => { logoImg.src = 'logo.png'; };
  logoImg.className = 'navbar-logo';

  const brand = document.createElement('span');
  brand.className = 'navbar-brand';
  brand.textContent = 'UnReact.js';

  left.appendChild(logoImg);
  left.appendChild(brand);

  const right = document.createElement('div');
  right.className = 'navbar-right';
  right.innerHTML = `
    <a href="https://arnavjoshi.vercel.app/" target="_blank">Website</a>
    <a href="https://github.com/arnvjshi/unreactpjs" target="_blank">Docs</a>
  `;

  container.appendChild(left);
  container.appendChild(right);
  nav.appendChild(container);
  return nav;
});

export default Navbar;

