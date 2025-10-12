import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background py-10">
      <div className="container flex flex-col items-center gap-2 text-center text-sm text-muted-foreground">
        <span className="font-medium text-foreground text-gray-800">
          InitGen CLI by{' '}
          <Link
            className="transition-colors hover:text-blue-500"
            href="https://www.pankajk.tech"
            target="_blank"
            rel="noreferrer"
          >
            Pankaj Kumar
          </Link>
        </span>
        <div className="flex gap-3 text-gray-700">
          <Link
            className="transition-colors hover:text-blue-500"
            href="https://github.com/PankajKumardev/initgen"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </Link>
          <span aria-hidden="true">•</span>
          <Link
            className="transition-colors hover:text-blue-500"
            href="https://www.npmjs.com/package/initgen"
            target="_blank"
            rel="noreferrer"
          >
            npm
          </Link>
        </div>
      </div>
    </footer>
  );
}
