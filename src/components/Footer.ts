import { createComponent } from '../core/component';

export const Footer = createComponent(() => {
  const footer = document.createElement('footer');
  footer.className = 'footer';
  footer.innerHTML = `
    <div class="footer-content">
      <p>\u00A9 2025 UnReact.js by <a href="https://arnavjoshi.vercel.app/" target="_blank">Arnav Joshi</a></p>
      <p>License: CC0-1.0 · <a href="https://github.com/arnvjshi/unreactpjs" target="_blank">GitHub (Docs)</a></p>
    </div>
  `;
  return footer;
});

export default Footer;

