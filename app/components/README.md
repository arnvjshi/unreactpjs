# Components

This folder contains reusable components for your UnReact.js application.

## Usage

### Importing Components

```typescript
// Import individual components
import { Button } from './components/Button';

// Or import from the index file
import { Button } from './components';
```

### Using the Button Component

```typescript
import { createComponent } from 'unreactpjs';
import { Button } from './components';

const MyPage = createComponent(() => {
  const container = document.createElement('div');
  
  const primaryButton = Button({
    text: 'Click Me!',
    variant: 'primary',
    onClick: () => alert('Button clicked!')
  });
  
  const secondaryButton = Button({
    text: 'Secondary',
    variant: 'secondary',
    onClick: () => console.log('Secondary clicked')
  });
  
  container.appendChild(primaryButton);
  container.appendChild(secondaryButton);
  
  return container;
});
```

## Creating New Components

1. Create a new `.ts` file in this folder
2. Export your component using `createComponent`
3. Add the export to `index.ts`
4. Use TypeScript interfaces for props

### Example Component Structure

```typescript
import { createComponent } from 'unreactpjs';

export interface MyComponentProps {
  title: string;
  children?: HTMLElement;
}

export const MyComponent = createComponent((props: MyComponentProps) => {
  const element = document.createElement('div');
  element.className = 'my-component';
  
  const title = document.createElement('h2');
  title.textContent = props.title;
  element.appendChild(title);
  
  if (props.children) {
    element.appendChild(props.children);
  }
  
  return element;
});

export default MyComponent;
```

## Author

Created by **Arnav Joshi** - [github.com/arnvjshi](https://github.com/arnvjshi)
