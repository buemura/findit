import { cn } from '@/lib/utils/cn';
import { User } from 'lucide-react';

interface AvatarProps {
  src?: string | null;
  alt?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function Avatar({ src, alt, size = 'md', className }: AvatarProps) {
  const sizes = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-14 w-14',
    xl: 'h-20 w-20',
  };

  const iconSizes = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-7 w-7',
    xl: 'h-10 w-10',
  };

  return (
    <div
      className={cn(
        'relative rounded-full overflow-hidden bg-gray-200 flex items-center justify-center',
        sizes[size],
        className
      )}
    >
      {src ? (
        <img src={src} alt={alt || 'Avatar'} className="h-full w-full object-cover" />
      ) : (
        <User className={cn('text-gray-400', iconSizes[size])} />
      )}
    </div>
  );
}
