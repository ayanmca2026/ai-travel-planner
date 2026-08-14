import { cn } from '@/utils/cn';

interface AvatarProps {
  src?: string;
  alt?: string;
  initials?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function Avatar({ src, alt, initials = 'U', size = 'md', className }: AvatarProps) {
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-lg',
  };

  return (
    <div className={cn("relative inline-flex items-center justify-center overflow-hidden rounded-full bg-primary-100 dark:bg-primary-900/50", sizes[size], className)}>
      {src ? (
        <img src={src} alt={alt || 'Avatar'} className="w-full h-full object-cover" />
      ) : (
        <span className="font-medium text-primary-700 dark:text-primary-400">
          {initials.substring(0, 2).toUpperCase()}
        </span>
      )}
    </div>
  );
}
