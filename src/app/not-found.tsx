import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-sand px-6 text-center">
      <p className="text-sm uppercase tracking-[0.3em] text-terracotta">404</p>
      <h1 className="mt-4 font-display text-4xl">This route does not exist.</h1>
      <Link href="/en" className="mt-6 rounded-full bg-terracotta px-5 py-3 text-cream">
        Discover Chile
      </Link>
    </div>
  );
}
