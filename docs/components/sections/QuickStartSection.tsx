import { Card, CardContent } from '@/components/ui/card';

const quickStart = [
  {
    title: 'Choose your starter',
    description:
      'Pick from React (Vite), Vite + React + Tailwind v4, Next.js, Vue, Node.js Express, or Python starters that include sensible defaults and project structure.',
  },
  {
    title: 'Answer guided prompts',
    description:
      'Provide the project name, choose JavaScript or TypeScript when available, and decide whether to run git init.',
  },
  {
    title: 'Start building',
    description:
      'InitGen generates the folder, writes documentation, and installs dependencies where possible so you can run the project immediately.',
  },
];

export default function QuickStartSection() {
  return (
    <section className="border-t border-border bg-background">
      <div className="container grid gap-10 py-16">
        <div className="mx-auto max-w-2xl space-y-3 text-center">
          <h2 className="text-2xl font-semibold text-gray-800">Quick start</h2>
          <p className="text-base text-muted-foreground text-gray-700">
            InitGen keeps the CLI flow focused. Choose your stack, fill in the
            basics, confirm TypeScript when prompted, and finish with a git
            decision to ship a repository ready for your first PR.
          </p>
        </div>

        <Card className="mx-auto w-full max-w-3xl">
          <CardContent className="space-y-6">
            {quickStart.map((step, index) => (
              <div
                key={step.title}
                className="flex flex-col gap-2 text-left text-gray-800"
              >
                <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground text-gray-800">
                  Step {index + 1}
                </span>
                <h3 className="text-lg font-semibold text-gray-800">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground text-gray-700">
                  {step.description}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
