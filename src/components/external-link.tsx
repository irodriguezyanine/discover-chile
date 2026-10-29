import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";

export function ExternalLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center gap-1 font-medium text-terracotta hover:text-terracotta-deep",
        className,
      )}
    >
      {children}
      <ArrowUpRight size={14} />
    </a>
  );
}
