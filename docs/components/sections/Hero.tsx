import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Hero() {
  return (
    <section className="container flex min-h-[80vh] flex-col items-center justify-center gap-6 py-24 text-center">
      <div className="space-y-6">
        <h1 className="text-5xl font-semibold tracking-tight sm:text-7xl text-blue-500">
          InitGen CLI
        </h1>
        <div className="space-y-4">
          <p className="mx-auto max-w-2xl text-2xl font-semibold text-gray-800 sm:text-3xl">
            Ship production-ready starters faster.
          </p>
          <p className="mx-auto max-w-2xl text-base text-gray-700 sm:text-lg">
            InitGen scaffolds React, Next.js, Vue, Node.js Express, and Python
            starters with interactive prompts. It installs dependencies when
            possible, writes the README, and leaves you with a clean repository
            ready for your first commit.
          </p>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button
          asChild
          className="px-7 bg-blue-500 hover:bg-blue-600 focus-visible:ring-blue-300"
        >
          <Link
            href="https://www.npmjs.com/package/initgen"
            target="_blank"
            rel="noreferrer"
          >
            Install from npm
          </Link>
        </Button>
        <Button
          asChild
          variant="outline"
          className="border-border bg-transparent text-foreground hover:bg-muted"
        >
          <Link
            href="https://github.com/PankajKumardev/initgen"
            target="_blank"
            rel="noreferrer"
          >
            View on GitHub
          </Link>
        </Button>
      </div>
    </section>
  );
}
