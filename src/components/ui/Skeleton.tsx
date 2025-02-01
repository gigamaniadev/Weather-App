/**
 * Interface defining the props for the Skeleton component
 * @property {string} className - Optional CSS classes to apply to the skeleton
 * @property {boolean} isDark - Optional flag to toggle dark mode styling
 */
interface SkeletonProps {
  className?: string;
  isDark?: boolean;
}

/**
 * Skeleton component for displaying loading state placeholders
 * Renders an animated div with customizable appearance
 * @param {SkeletonProps} props - Component props
 * @param {string} props.className - Additional CSS classes (default: "")
 * @param {boolean} props.isDark - Dark mode toggle (default: false)
 * @returns {JSX.Element} Animated skeleton div
 */
export function Skeleton({ className = "", isDark = false }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse ${
        isDark ? "bg-[#3A3A3C]" : "bg-gray-200"
      } rounded ${className}`}
    />
  );
}
