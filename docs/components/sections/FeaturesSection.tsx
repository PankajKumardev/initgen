export default function FeaturesSection() {
  const features = [
    {
      title: 'shadcn/ui Integration',
      description:
        'Built-in shadcn/ui support with automatic component setup, Tailwind v4 compatibility, and pre-installed dependencies.',
    },
    {
      title: 'Interactive CLI',
      description:
        'Beautiful command-line interface with intuitive prompts and real-time feedback.',
    },
    {
      title: 'Lightning Fast',
      description:
        'Generate complete projects in seconds with optimized templates and zero configuration.',
    },
    {
      title: '10 Tech Stacks',
      description:
        'Support for React, Next.js + shadcn/ui, Vue, Node.js, Python Flask/Django, and specialized component libraries.',
    },
    {
      title: 'Smart File Extensions',
      description:
        'Automatically creates .jsx files for JavaScript projects and .tsx for TypeScript with proper component structure.',
    },
    {
      title: 'Tailwind CSS v4',
      description:
        'Modern utility-first CSS framework with CSS variables and enhanced theming across all templates.',
    },
  ];

  return (
    <section className="container mx-auto py-16">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Features
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to bootstrap modern projects
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-lg border border-gray-200 bg-white"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
