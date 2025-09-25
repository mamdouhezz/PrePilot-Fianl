import React from 'react';
import { Card as CardRoot, CardHeader, CardTitle, CardContent } from '../ui/Card';

const Section = ({ id, title, children }: { id?: string; title: string; children: React.ReactNode }) => {
  return (
    <div id={id} className="space-y-6">
      <CardRoot>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </CardRoot>
    </div>
  );
};

export default Section;
