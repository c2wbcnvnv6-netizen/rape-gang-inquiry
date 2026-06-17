import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-5 text-center">
      <h1 className="font-serif text-2xl text-white/90">Page not found</h1>
      <Link
        href="/"
        className="mt-6 text-sm text-white/50 underline-offset-4 hover:text-white/70 hover:underline"
      >
        Return to testimony
      </Link>
    </div>
  );
}
