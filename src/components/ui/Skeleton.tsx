interface SkeletonProps {
  className?: string;
  isDark?: boolean;
}

export function Skeleton({ className = "", isDark = false }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse ${
        isDark ? "bg-[#3A3A3C]" : "bg-gray-200"
      } rounded ${className}`}
    />
  );
}
