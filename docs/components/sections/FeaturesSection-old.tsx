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
      icon: <FileText className="h-6 w-6" />,
      title: 'Smart Configurations',
      description:
        'Automatic setup of development environments with tailored configurations.',
      badge: 'Automation',
    },
    {
      icon: <Settings className="h-6 w-6" />,
      title: 'Customizable',
      description:
        'Flexible options to customize project structure, dependencies, and settings.',
      badge: 'Flexible',
    },
    {
      icon: <GitBranch className="h-6 w-6" />,
      title: 'Git Integration',
      description:
        'Automatic Git initialization with proper .gitignore and initial commit setup.',
      badge: 'DevOps',
    },
    {
      icon: <Rocket className="h-6 w-6" />,
      title: 'Deploy Ready',
      description:
        'Built-in deployment configurations for Vercel, Netlify, and other platforms.',
      badge: 'Deployment',
    },
  ];

  return (
    <section className="container mx-auto py-16">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Features
          </h2>
          <p className="text-lg text-muted-foreground mb-2">
            Everything you need to bootstrap modern projects
          </p>
          <p className="text-sm text-gray-500">
            Built with developer experience in mind
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="relative group hover:shadow-lg transition-all duration-200"
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center justify-center w-10 h-10 bg-blue-50 rounded-lg text-blue-600 group-hover:bg-blue-100 transition-colors">
                    {feature.icon}
                  </div>
                  <Badge
                    variant="default"
                    className="bg-gray-100 text-gray-700 text-xs"
                  >
                    {feature.badge}
                  </Badge>
                </div>
                <CardTitle className="text-lg font-semibold text-gray-900">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm text-gray-600 leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full">
            <Zap className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">
              Zero configuration • Production ready • Developer friendly
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
