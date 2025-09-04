import { createComponent } from '../src';

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
