import React from 'react'
import { twMerge } from 'tailwind-merge';

/**
 * Here we have made a reusable box componenet with set 
 * features but we have also added the ability to pass
 * in anoter className via the props incase we want to
 * be able to customize it for certain areas down the
 * line
 */
interface BoxProps {
  children: React.ReactNode;
  className?: string;
}

const Box: React.FC<BoxProps> = ({ children, className }) => {
  return (
    <div className={twMerge(`
      bg-neutral-900
      rounded-lg
      h-fit
      w-full  
    `,
      className
    )}
    >
      {children}
    </div>
  )
}

export default Box