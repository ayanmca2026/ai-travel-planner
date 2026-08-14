import { cn } from '@/utils/cn';

interface SkeletonProps {
  variant?: 'text' | 'circle' | 'card' | 'paragraph';
  className?: string;
}

export function Skeleton({ variant = 'text', className }: SkeletonProps) {
  const baseClass = "animate-pulse bg-slate-200 dark:bg-slate-800";
  
  switch (variant) {
    case 'circle':
      return <div className={cn(baseClass, "rounded-full w-12 h-12", className)} />;
    case 'card':
      return <div className={cn(baseClass, "rounded-xl w-full h-48", className)} />;
    case 'paragraph':
      return (
        <div className="space-y-2">
          <div className={cn(baseClass, "h-4 w-full rounded", className)} />
          <div className={cn(baseClass, "h-4 w-5/6 rounded", className)} />
          <div className={cn(baseClass, "h-4 w-4/6 rounded", className)} />
        </div>
      );
    case 'text':
    default:
      return <div className={cn(baseClass, "h-4 w-24 rounded", className)} />;
  }
}
