import { Badge } from '@/components/ui/badge';

export default function Hero() {
  return (
    <section className="container flex min-h-[80vh] flex-col items-center justify-center gap-6 py-24 text-center">
      <div className="space-y-6">
        <div className="flex items-center justify-center gap-3 mb-2">
          <h1 className="text-5xl font-semibold tracking-tight sm:text-7xl text-blue-500">
            InitGen CLI
          </h1>
          <span className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            v2.0
          </span>
        </div>
        <p className="mx-auto max-w-2xl text-2xl font-semibold text-foreground sm:text-3xl">
          Project Scaffolding Made Simple
        </p>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl">
          Generate project templates instantly with shadcn/ui integration,
          Tailwind v4, and enhanced Next.js support. Skip the boilerplate, focus
          on building.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Badge variant="default" className="bg-blue-100 text-blue-800">
            shadcn/ui
          </Badge>
          <Badge variant="default" className="bg-green-100 text-green-800">
            Tailwind v4
          </Badge>
          <Badge variant="default" className="bg-purple-100 text-purple-800">
            Next.js Enhanced
          </Badge>
          <Badge variant="default" className="bg-blue-100 text-blue-800">
            TypeScript
          </Badge>
          <Badge variant="default" className="bg-blue-100 text-blue-800">
            React
          </Badge>
          <Badge variant="default" className="bg-blue-100 text-blue-800">
            Node.js
          </Badge>
        </div>
      </div>
    </section>
  );
}
