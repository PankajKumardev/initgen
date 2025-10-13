export default function FeaturesSection() {
  const features = [
    {
      title: 'Interactive CLI',
      description: 'Beautiful command-line interface with intuitive prompts and real-time feedback.'
    },
    {
      title: 'Lightning Fast',
      description: 'Generate complete projects in seconds with optimized templates and zero configuration.'
    },
    {
      title: 'Multiple Frameworks',
      description: 'Support for React, Next.js, Vue, Node.js, Python Flask/Django, and more.'
    },
    {
      title: 'Production Ready',
      description: 'All templates include best practices, TypeScript, ESLint, and modern tooling.'
    },
    {
      title: 'Smart Configurations',
      description: 'Automatic setup of development environments with tailored configurations.'
    },
    {
      title: 'Customizable',
      description: 'Flexible options to customize project structure, dependencies, and settings.'
    }
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
            <div key={index} className="p-6 rounded-lg border border-gray-200 bg-white">
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