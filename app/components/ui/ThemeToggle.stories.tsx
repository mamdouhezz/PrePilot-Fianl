/**
 * @file ThemeToggle.stories.tsx
 * @description Storybook stories for the ThemeToggle component
 * 
 * @author Crafted By Jedar-Agency.com Tech Team
 */

import type { Meta, StoryObj } from '@storybook/react';
import { ThemeToggle } from './ThemeToggle';
import { Card, CardContent, CardHeader, CardTitle } from './Card';

const meta: Meta<typeof ThemeToggle> = {
  title: 'UI/ThemeToggle',
  component: ThemeToggle,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'مكون تبديل السمة بين الوضع المظلم والفاتح مع رسوم متحركة سلسة.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'حجم مكون التبديل',
    },
    showLabel: {
      control: { type: 'boolean' },
      description: 'عرض تسمية السمة الحالية',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * @story Default Theme Toggle
 * @description مكون تبديل السمة الافتراضي
 */
export const Default: Story = {
  args: {},
};

/**
 * @story Small Size
 * @description مكون تبديل السمة بحجم صغير
 */
export const Small: Story = {
  args: {
    size: 'sm',
  },
};

/**
 * @story Large Size
 * @description مكون تبديل السمة بحجم كبير
 */
export const Large: Story = {
  args: {
    size: 'lg',
  },
};

/**
 * @story With Label
 * @description مكون تبديل السمة مع التسمية
 */
export const WithLabel: Story = {
  args: {
    showLabel: true,
  },
};

/**
 * @story In Card Context
 * @description مكون تبديل السمة في سياق بطاقة
 */
export const InCard: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>إعدادات العرض</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-white">السمة</h4>
            <p className="text-sm text-gray-400">اختر بين الوضع المظلم والفاتح</p>
          </div>
          <ThemeToggle />
        </div>
      </CardContent>
    </Card>
  ),
};

/**
 * @story Settings Panel
 * @description لوحة إعدادات كاملة مع تبديل السمة
 */
export const SettingsPanel: Story = {
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>الإعدادات</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-white">السمة</h4>
            <p className="text-sm text-gray-400">اختر مظهر التطبيق</p>
          </div>
          <ThemeToggle size="lg" showLabel />
        </div>
        
        <div className="border-t border-gray-700 pt-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-white">الإشعارات</h4>
              <p className="text-sm text-gray-400">تلقي إشعارات التحديثات</p>
            </div>
            <div className="w-12 h-6 bg-gray-600 rounded-full relative">
              <div className="w-4 h-4 bg-white rounded-full absolute top-1 left-1"></div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-white">اللغة</h4>
              <p className="text-sm text-gray-400">العربية</p>
            </div>
            <div className="text-sm text-gray-400">العربية</div>
          </div>
        </div>
      </CardContent>
    </Card>
  ),
};

/**
 * @story Header Integration
 * @description تكامل مكون التبديل في رأس الصفحة
 */
export const HeaderIntegration: Story = {
  render: () => (
    <div className="bg-gray-900 p-4 rounded-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">P</span>
          </div>
          <h1 className="text-xl font-bold text-white">PrePilot.Cloud</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
        </div>
      </div>
    </div>
  ),
};
