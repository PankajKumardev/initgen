import { Card, CardContent } from '@/components/ui/card';

const quickStart = [
  {
    title: 'Choose your starter',
    description:
      'Pick from React (Vite), Vite + shadcn/ui, Next.js + shadcn/ui, Vite + Tailwind v4, Vue, Node.js Express, or Python starters with sensible defaults and modern tooling.',
  },
  {
    title: 'Answer guided prompts',
    description:
      'Provide the project name, choose JavaScript or TypeScript (automatically creates .jsx/.tsx files), and decide whether to run git init.',
  },
  {
    title: 'Start building',
    description:
      'InitGen generates the folder with proper file extensions, installs all dependencies including shadcn components, and creates a production-ready project structure.',
  },
];

export default function QuickStartSection() {
  return (
    <section className="bg-background">
      <div className="container grid gap-10 py-16">
        <div className="mx-auto max-w-2xl space-y-3 text-center">
          <h2 className="text-2xl font-semibold text-gray-800">Quick start</h2>
          <p className="text-base text-muted-foreground text-gray-700">
            InitGen v2.0 keeps the CLI flow focused. Choose from 10 tech stacks
            including shadcn/ui options, fill in the basics, confirm
            JavaScript/TypeScript with smart file extensions, and finish with a
            git decision to ship a production-ready repository.
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
