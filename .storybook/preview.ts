/**
 * @file preview.ts
 * @description Storybook preview configuration with Tailwind CSS support
 * 
 * @author Crafted By Jedar-Agency.com Tech Team
 */

import type { Preview } from '@storybook/react';
import '../app/index.css'; // Import Tailwind CSS

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'dark',
          value: '#111827',
        },
        {
          name: 'light',
          value: '#ffffff',
        },
      ],
    },
  },
};

export default preview;