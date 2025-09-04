import { createComponent } from '../src';

export interface ButtonProps {
  text: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  className?: string;
}

export const Button = createComponent((props: ButtonProps) => {
  const button = document.createElement('button');
  button.className = `button ${props.variant || 'primary'} ${props.className || ''}`;
  button.textContent = props.text;
  
  if (props.onClick) {
    button.addEventListener('click', props.onClick);
  }
  
  return button;
});

export default Button;
