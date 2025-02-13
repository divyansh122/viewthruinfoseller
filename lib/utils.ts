// Simple utility function for combining class names
export function cn(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}