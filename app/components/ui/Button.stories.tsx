/**
 * @file Button.stories.tsx
 * @description Storybook stories for the Button component
 * 
 * @author Crafted By Jedar-Agency.com Tech Team
 */

import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import { FiDownload, FiArrowRight, FiCheck } from 'react-icons/fi';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'مكون زر متعدد الاستخدامات مع دعم كامل للخصائص المختلفة والتخصيص.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'outline', 'ghost', 'danger'],
      description: 'نوع الزر (أساسي، ثانوي، مخطط، شفاف، خطر)',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'حجم الزر (صغير، متوسط، كبير)',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'حالة تعطيل الزر',
    },
    loading: {
      control: { type: 'boolean' },
      description: 'حالة التحميل مع spinner',
    },
    fullWidth: {
      control: { type: 'boolean' },
      description: 'عرض كامل للزر',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * @story Primary Button
 * @description الزر الأساسي للعمليات الرئيسية
 */
export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'زر أساسي',
  },
};

/**
 * @story Secondary Button
 * @description الزر الثانوي للعمليات الفرعية
 */
export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'زر ثانوي',
  },
};

/**
 * @story Outline Button
 * @description زر مخطط للعمليات البديلة
 */
export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'زر مخطط',
  },
};

/**
 * @story Ghost Button
 * @description زر شفاف للعمليات الخفيفة
 */
export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'زر شفاف',
  },
};

/**
 * @story Danger Button
 * @description زر خطر للعمليات الخطيرة
 */
export const Danger: Story = {
  args: {
    variant: 'danger',
    children: 'زر خطر',
  },
};

/**
 * @story Small Size
 * @description زر صغير الحجم
 */
export const Small: Story = {
  args: {
    size: 'sm',
    children: 'زر صغير',
  },
};

/**
 * @story Large Size
 * @description زر كبير الحجم
 */
export const Large: Story = {
  args: {
    size: 'lg',
    children: 'زر كبير',
  },
};

/**
 * @story With Icon
 * @description زر مع أيقونة
 */
export const WithIcon: Story = {
  args: {
    variant: 'primary',
    leftIcon: <FiDownload />,
    children: 'تحميل الملف',
  },
};

/**
 * @story With Right Icon
 * @description زر مع أيقونة على اليمين
 */
export const WithRightIcon: Story = {
  args: {
    variant: 'secondary',
    rightIcon: <FiArrowRight />,
    children: 'التالي',
  },
};

/**
 * @story Loading State
 * @description زر في حالة التحميل
 */
export const Loading: Story = {
  args: {
    variant: 'primary',
    loading: true,
    children: 'جاري التحميل...',
  },
};

/**
 * @story Disabled State
 * @description زر معطل
 */
export const Disabled: Story = {
  args: {
    variant: 'primary',
    disabled: true,
    children: 'زر معطل',
  },
};

/**
 * @story Full Width
 * @description زر بعرض كامل
 */
export const FullWidth: Story = {
  args: {
    variant: 'primary',
    fullWidth: true,
    children: 'زر بعرض كامل',
  },
};

/**
 * @story All Variants
 * @description عرض جميع أنواع الأزرار
 */
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="primary">أساسي</Button>
      <Button variant="secondary">ثانوي</Button>
      <Button variant="outline">مخطط</Button>
      <Button variant="ghost">شفاف</Button>
      <Button variant="danger">خطر</Button>
    </div>
  ),
};

/**
 * @story All Sizes
 * @description عرض جميع أحجام الأزرار
 */
export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="sm">صغير</Button>
      <Button size="md">متوسط</Button>
      <Button size="lg">كبير</Button>
    </div>
  ),
};
