import { cn } from "@/lib/cn";

const STAR =
  "3,1.35 3.59,2.72 5.12,2.82 3.92,3.76 4.35,5.25 3,4.4 1.65,5.25 2.08,3.76 0.88,2.82 2.41,2.72";

function FlagMarks() {
  return (
    <>
      <rect width="18" height="6" fill="#ffffff" />
      <rect y="6" width="18" height="6" fill="#D52B1E" />
      <rect width="6" height="6" fill="#0039A6" />
      <polygon fill="#ffffff" points={STAR} />
    </>
  );
}

export function ChileFlag({
  className,
  title = "Chile",
  variant = "rect",
}: {
  className?: string;
  title?: string;
  variant?: "rect" | "circle";
}) {
  if (variant === "circle") {
    return (
      <span
        className={cn("relative block overflow-hidden rounded-full", className)}
        role="img"
        aria-label={title}
      >
        <svg
          viewBox="0 0 18 12"
          className="absolute top-1/2 left-1/2 h-[158%] w-[158%] max-w-none -translate-x-1/2 -translate-y-1/2"
          aria-hidden
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>{title}</title>
          <FlagMarks />
        </svg>
      </span>
    );
  }

  return (
    <svg
      viewBox="0 0 18 12"
      className={className}
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{title}</title>
      <FlagMarks />
    </svg>
  );
}
