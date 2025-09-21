"use client"

import React from 'react';
import clsx from 'clsx';

interface ImagePlaceholderProps {
  className?: string;
  width: number;
  height: number;
  children?: React.ReactNode;
}

const ImagePlaceholder = React.forwardRef<HTMLDivElement, ImagePlaceholderProps>(
  ({ className, width, height, children, ...otherProps }, ref) => (
    <div className={clsx('relative', className)} ref={ref} {...otherProps}>
      <img
        className="w-full h-auto"
        src={`data:image/svg+xml;charset=utf-8,%3Csvg width='${width}' height='${height}' xmlns='http://www.w3.org/2000/svg' version='1.1'%3E%3C/svg%3E`}
        alt=""
        aria-hidden
      />
      <div className="absolute top-0 left-0 h-full w-full">{children}</div>
    </div>
  )
);

ImagePlaceholder.displayName = 'ImagePlaceholder';

export default ImagePlaceholder;