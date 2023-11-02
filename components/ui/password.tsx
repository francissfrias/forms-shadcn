import * as React from 'react';

import { cn } from '@/lib/utils';
import { Button } from './button';
import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Password = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    return (
      <div className='flex flex-col relative'>
        <input
          type={showPassword ? type : 'password'}
          className={cn(
            'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
            className
          )}
          ref={ref}
          {...props}
        />
        <Button
          onClick={() => setShowPassword(!showPassword)}
          variant='ghost'
          className='absolute w-7 h-7 rounded-full m-0 p-1 top-0 right-0 translate-x-[-25%] translate-y-[15%]'
          key='password'
        >
          {showPassword ? (
            <EyeOpenIcon className='w-full h-full' />
          ) : (
            <EyeClosedIcon className='w-full h-full' />
          )}
        </Button>
      </div>
    );
  }
);
Password.displayName = 'Password';

export { Password };
