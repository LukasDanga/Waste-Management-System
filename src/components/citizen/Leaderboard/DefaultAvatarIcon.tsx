import { cn } from '@/components/ui/utils';

export interface DefaultAvatarIconProps {
  className?: string;
  size?: number;
}

/**
 * Default avatar: circle outline with head & shoulders silhouette (black on white),
 * matching the standard default user avatar style.
 */
export function DefaultAvatarIcon({ className, size = 40 }: DefaultAvatarIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('rounded-full', className)}
      aria-hidden
    >
      {/* Circle outline */}
      <circle cx="20" cy="20" r="19" stroke="currentColor" strokeWidth="1.5" fill="white" />
      {/* Head */}
      <circle cx="20" cy="14" r="6" fill="currentColor" />
      {/* Shoulders (arc shape) */}
      <path
        d="M8 28c0-6 5.5-10 12-10s12 4 12 10v2H8v-2z"
        fill="currentColor"
      />
    </svg>
  );
}
