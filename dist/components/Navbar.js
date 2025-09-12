"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Navbar = void 0;
const component_1 = require("../core/component");
exports.Navbar = (0, component_1.createComponent)(() => {
    const nav = document.createElement('nav');
    nav.className = 'navbar glassmorphic';
    const container = document.createElement('div');
    container.className = 'navbar-container';
    const left = document.createElement('div');
    left.className = 'navbar-left';
    const logoImg = document.createElement('img');
    logoImg.src = 'logo-transparent.png';
    logoImg.alt = 'UnReact.js Logo';
    logoImg.onerror = () => { logoImg.src = 'logo.png'; };
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
exports.default = exports.Navbar;

