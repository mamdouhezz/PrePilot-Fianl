import React from 'react';

const CardRoot = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={`bg-gray-900 border border-gray-800 rounded-2xl shadow-lg shadow-black/20 print:bg-white print:border-gray-200 print:shadow-md ${className}`}
            {...props}
        />
    )
);
CardRoot.displayName = 'CardRoot';

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={`flex flex-col space-y-1.5 p-6 ${className}`}
            {...props}
        />
    )
);
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
    ({ className, ...props }, ref) => (
        <h3
            ref={ref}
            className={`text-xl font-bold leading-none tracking-tight text-gray-200 print:text-purple-800 ${className}`}
            {...props}
        />
    )
);
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
    ({ className, ...props }, ref) => (
        <p ref={ref} className={`text-sm text-gray-400 print:text-gray-600 ${className}`} {...props} />
    )
);
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div ref={ref} className={`p-6 pt-0 ${className}`} {...props} />
    )
);
CardContent.displayName = 'CardContent';

const Card = ({ title, children, className = '' }: { title: string, children?: React.ReactNode, className?: string }) => (
    <CardRoot className={className}>
        <CardHeader>
            <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
            {children}
        </CardContent>
    </CardRoot>
);

export { Card, CardRoot, CardHeader, CardTitle, CardDescription, CardContent };
export default Card;