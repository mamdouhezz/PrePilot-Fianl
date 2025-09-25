import React from 'react';

const buttonVariants = (variant: 'primary' | 'secondary' | 'ghost' | 'destructive' | 'link' = 'primary', size: 'default' | 'sm' | 'lg' | 'icon' = 'default') => {
    const base = 'inline-flex items-center justify-center rounded-lg text-sm font-bold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950 focus-visible:ring-purple-500 disabled:opacity-50 disabled:pointer-events-none';
    const variants = {
        primary: 'bg-purple-600 text-white hover:bg-purple-700 shadow-md hover:shadow-lg transform hover:-translate-y-0.5',
        secondary: 'bg-gray-800 text-gray-200 hover:bg-gray-700 border border-gray-700',
        ghost: 'bg-transparent text-gray-300 hover:bg-gray-800 hover:text-white',
        destructive: 'bg-red-800 text-red-100 hover:bg-red-700 shadow-md',
        link: 'text-purple-400 underline-offset-4 hover:underline'
    } as const;
    const sizes = {
        default: 'h-10 py-2 px-6',
        sm: 'h-9 px-4',
        lg: 'h-12 px-8 text-base',
        icon: 'h-10 w-10',
    } as const;
    return `${base} ${variants[variant]} ${sizes[size]}`;
};

type ButtonOwnProps = {
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
};

export type ButtonProps =
  | (ButtonOwnProps & { as?: 'button'; } & React.ButtonHTMLAttributes<HTMLButtonElement>)
  | (ButtonOwnProps & { as: 'a'; } & React.AnchorHTMLAttributes<HTMLAnchorElement>);

const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>((props, ref) => {
  const { variant = 'primary', size, className, as, ...rest } = props;
  const allClassNames = `${buttonVariants(variant, size)} ${className || ''}`;
  if (as === 'a') {
    return (
      <a ref={ref as React.Ref<HTMLAnchorElement>} className={allClassNames} {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)} />
    );
  }
  return (
    <button ref={ref as React.Ref<HTMLButtonElement>} className={allClassNames} {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)} />
  );
});
Button.displayName = 'Button';

export default Button;

