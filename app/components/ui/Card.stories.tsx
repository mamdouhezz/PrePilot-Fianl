/**
 * @file Card.stories.tsx
 * @description Storybook stories for the Card component
 * 
 * @author Crafted By Jedar-Agency.com Tech Team
 */

import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './Card';
import { Button } from './Button';
import { FiBarChart, FiTrendingUp, FiUsers } from 'react-icons/fi';

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'مكون بطاقة مرن قابل للتكوين مع دعم للرأس والمحتوى والتذييل.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: { type: 'text' },
      description: 'فئات CSS مخصصة',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * @story Basic Card
 * @description بطاقة أساسية بسيطة
 */
export const Basic: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>عنوان البطاقة</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-400">
          هذا محتوى البطاقة الأساسي. يمكن أن يحتوي على أي نص أو عناصر أخرى.
        </p>
      </CardContent>
    </Card>
  ),
};

/**
 * @story Card with Footer
 * @description بطاقة مع تذييل
 */
export const WithFooter: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>بطاقة مع تذييل</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-400">
          محتوى البطاقة مع تذييل يحتوي على أزرار أو عناصر إضافية.
        </p>
      </CardContent>
      <CardFooter>
        <Button variant="primary" size="sm">إجراء</Button>
        <Button variant="ghost" size="sm">إلغاء</Button>
      </CardFooter>
    </Card>
  ),
};

/**
 * @story Card with Icon
 * @description بطاقة مع أيقونة في الرأس
 */
export const WithIcon: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/20 rounded-lg">
            <FiBarChart className="w-5 h-5 text-blue-400" />
          </div>
          <CardTitle>إحصائيات الأداء</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-400">
          عرض إحصائيات مفصلة عن أداء الحملة الإعلانية.
        </p>
      </CardContent>
    </Card>
  ),
};

/**
 * @story Metrics Card
 * @description بطاقة مقاييس الأداء
 */
export const MetricsCard: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <FiTrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <CardTitle>العائد على الإنفاق</CardTitle>
          </div>
          <span className="text-sm text-gray-500">+12%</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="text-3xl font-bold text-white">4.2x</div>
          <p className="text-sm text-gray-400">زيادة بنسبة 12% عن الشهر الماضي</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" fullWidth>
          عرض التفاصيل
        </Button>
      </CardFooter>
    </Card>
  ),
};

/**
 * @story User Card
 * @description بطاقة مستخدم
 */
export const UserCard: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
            <FiUsers className="w-6 h-6 text-white" />
          </div>
          <div>
            <CardTitle>أحمد محمد</CardTitle>
            <p className="text-sm text-gray-400">مدير التسويق</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-400">
          خبير في التسويق الرقمي مع أكثر من 5 سنوات من الخبرة في إدارة الحملات الإعلانية.
        </p>
      </CardContent>
      <CardFooter>
        <Button variant="primary" size="sm">تواصل</Button>
        <Button variant="ghost" size="sm">الملف الشخصي</Button>
      </CardFooter>
    </Card>
  ),
};

/**
 * @story Loading Card
 * @description بطاقة في حالة التحميل
 */
export const LoadingCard: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>جاري التحميل...</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="h-4 bg-gray-700 rounded animate-pulse"></div>
          <div className="h-4 bg-gray-700 rounded animate-pulse w-3/4"></div>
          <div className="h-4 bg-gray-700 rounded animate-pulse w-1/2"></div>
        </div>
      </CardContent>
    </Card>
  ),
};

/**
 * @story Card Grid
 * @description شبكة من البطاقات
 */
export const CardGrid: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>الميزانية</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">50,000 ريال</div>
          <p className="text-sm text-gray-400">ميزانية الحملة</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>الانطباعات</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">2.5M</div>
          <p className="text-sm text-gray-400">إجمالي المشاهدات</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>النقرات</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white">125K</div>
          <p className="text-sm text-gray-400">إجمالي النقرات</p>
        </CardContent>
      </Card>
    </div>
  ),
};
