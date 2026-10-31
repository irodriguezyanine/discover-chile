/** Full-bleed Chile collage + sand wash — shared by welcome and home desk. */
export function ChileScreenBackdrop({
  priority = false,
  className = "fixed inset-0 z-0",
}: {
  priority?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`pointer-events-none overflow-hidden ${className}`}
      aria-hidden
    >
      {/* Plain <img>: avoids Next/Image decoding both desktop+mobile assets. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/welcome/chile-mobile.webp"
        alt=""
        decoding="async"
        fetchPriority={priority ? "high" : "low"}
        className="desk-bg-photo absolute inset-0 h-full w-full object-cover object-center md:hidden"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/welcome/chile-desktop.webp"
        alt=""
        decoding="async"
        fetchPriority={priority ? "high" : "low"}
        className="desk-bg-photo absolute inset-0 hidden h-full w-full object-cover object-center md:block"
      />
      <div className="desk-bg-wash absolute inset-0" />
    </div>
  );
}
