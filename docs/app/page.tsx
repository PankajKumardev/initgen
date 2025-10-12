'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Check, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

type DataPoint = {
  label: string;
  value: number;
};

type DownloadSummary = {
  weekly: string;
  monthly: string;
};

const installCommands = [
  {
    title: 'Install globally',
    description:
      'Install InitGen once so the initgen command is ready in every shell.',
    command: 'npm install -g initgen',
  },
  {
    title: 'Run instantly',
    description:
      'Use NPX to test the generator without adding a global package.',
    command: 'npx initgen',
  },
];

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

function CopyButton({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (error) {
      setCopied(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-md -white/30 bg-white/10 px-3 py-1.5 text-xs font-medium text-white transition duration-150 hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60',
        className
      )}
      aria-label={
        copied ? 'Command copied to clipboard' : 'Copy command to clipboard'
      }
    >
      {copied ? (
        <Check className="h-3.5 w-3.5" aria-hidden="true" />
      ) : (
        <Copy className="h-3.5 w-3.5" aria-hidden="true" />
      )}
      <span>{copied ? 'Copied' : 'Copy'}</span>
    </button>
  );
}

function formatCount(value: number) {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value);
}

function buildLinePath(data: DataPoint[]) {
  if (data.length === 0) {
    return '';
  }

  const max = Math.max(...data.map((d) => d.value));
  const min = Math.min(...data.map((d) => d.value));
  const range = Math.max(max - min, 1);

  return data
    .map((point, index) => {
      const x = (index / Math.max(data.length - 1, 1)) * 100;
      const y = 100 - ((point.value - min) / range) * 80 - 10;
      return `${index === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(' ');
}

function buildAreaPath(data: DataPoint[]) {
  if (data.length === 0) {
    return '';
  }

  const line = buildLinePath(data).replace(/^M\s?/, '');
  const points = line.split(' L ');
  if (points.length === 0) {
    return '';
  }

  const firstPoint = points[0]?.split(' ') ?? ['0', '90'];
  const lastPoint = points[points.length - 1]?.split(' ') ?? ['100', '90'];

  const areaPoints = [
    `M ${firstPoint[0]} 90`,
    ...points.map((pt) => `L ${pt}`),
    `L ${lastPoint[0]} 90`,
    'Z',
  ];

  return areaPoints.join(' ');
}

export default function Home() {
  const [downloadTrend, setDownloadTrend] = useState<DataPoint[]>([]);
  const [downloadSummary, setDownloadSummary] = useState<DownloadSummary>(
    () => ({ weekly: '0', monthly: '0' })
  );
  const [downloadStatus, setDownloadStatus] = useState<
    'loading' | 'ready' | 'empty' | 'error'
  >('loading');

  useEffect(() => {
    async function loadDownloads() {
      try {
        const [weeklyRes, monthlyRes] = await Promise.all([
          fetch('https://api.npmjs.org/downloads/range/last-week/initgen'),
          fetch('https://api.npmjs.org/downloads/point/last-month/initgen'),
        ]);

        if (!weeklyRes.ok || !monthlyRes.ok) {
          throw new Error('Failed to fetch npm downloads');
        }

        const weeklyJson = await weeklyRes.json();
        const monthlyJson = await monthlyRes.json();

        if (weeklyJson.error || monthlyJson.error) {
          throw new Error(weeklyJson.error || monthlyJson.error);
        }

        const weeklyDownloads = Array.isArray(weeklyJson.downloads)
          ? weeklyJson.downloads
          : [];

        const trend: DataPoint[] = weeklyDownloads.map(
          (item: { day: string; downloads: number }) => ({
            label: new Date(item.day).toLocaleDateString('en-US', {
              month: 'short',
              day: '2-digit',
            }),
            value: item.downloads ?? 0,
          })
        );

        const weeklyTotal = trend.reduce((sum, item) => sum + item.value, 0);
        const monthlyTotal = Number(monthlyJson.downloads ?? 0);

        setDownloadTrend(trend);
        setDownloadSummary({
          weekly: formatCount(weeklyTotal),
          monthly: formatCount(monthlyTotal),
        });

        setDownloadStatus(weeklyTotal > 0 ? 'ready' : 'empty');
      } catch (error) {
        setDownloadStatus('error');
      }
    }

    loadDownloads();
  }, []);

  const linePath = buildLinePath(downloadTrend);
  const areaPath = buildAreaPath(downloadTrend);

  const downloadsMessage = {
    loading: 'Fetching npm download data...',
    empty:
      'No npm downloads recorded yet. Once installs land, this chart updates automatically.',
    ready: 'Weekly npm downloads pulled directly from the npm registry.',
    error:
      'Could not load npm download data right now. Try again after a refresh.',
  }[downloadStatus];

  return (
    <main className="bg-background text-foreground">
      <section className="container flex min-h-[80vh] flex-col items-center justify-center gap-6 py-24 text-center">
        <div className="space-y-6">
          <h1 className="text-5xl font-semibold tracking-tight sm:text-7xl text-blue-500">
            InitGen CLI
          </h1>
          <div className="space-y-4">
            <p className="mx-auto max-w-2xl text-2xl font-semibold text-foreground sm:text-3xl text-gray-800">
              Ship production-ready starters faster.
            </p>
            <p className="mx-auto max-w-2xl text-base text-muted-foreground sm:text-lg text-gray-700">
              InitGen scaffolds React, Next.js, Vue, Node.js Express, and Python
              starters with interactive prompts. It installs dependencies when
              possible, writes the README, and leaves you with a clean
              repository ready for your first commit.
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

      <section className="border-t border-border bg-card/50">
        <div className="container grid gap-10 py-16">
          <div className="mx-auto max-w-2xl space-y-3 text-center">
            <h2 className="text-2xl font-semibold  text-gray-800">Install</h2>
            <p className="text-base  text-gray-700">
              Two straightforward commands cover every workflow. Install
              globally to keep InitGen ready, or run it instantly when you want
              to prototype.
            </p>
          </div>

          <div className="grid gap-6">
            {installCommands.map((item) => (
              <Card
                key={item.title}
                className="mx-auto w-full max-w-3xl text-gray-800 "
              >
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-800">
                    {item.title}
                  </CardTitle>
                  <CardDescription className="text-gray-800">
                    {item.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3 rounded-xl bg-foreground px-4 py-3">
                    <div className="flex-1 overflow-x-auto">
                      <code className="whitespace-nowrap text-sm text-background">
                        {item.command}
                      </code>
                    </div>
                    <CopyButton value={item.command} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-background">
        <div className="container grid gap-10 py-16">
          <div className="mx-auto max-w-2xl space-y-3 text-center">
            <h2 className="text-2xl font-semibold text-gray-800">
              Quick start
            </h2>
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

      <section className="border-t border-border bg-card/50">
        <div className="container grid gap-10 py-16">
          <div className="mx-auto max-w-2xl space-y-3 text-center">
            <h2 className="text-2xl font-semibold text-gray-800">Downloads</h2>
            <p className="text-base text-muted-foreground text-gray-700">
              {downloadsMessage}
            </p>
          </div>

          <Card className="mx-auto w-full max-w-4xl">
            <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="space-y-1">
                <CardTitle className="text-xl font-semibold text-gray-800">
                  Weekly installs
                </CardTitle>
                <CardDescription className="text-gray-700">
                  Pulling data straight from npm download metrics.
                </CardDescription>
              </div>
              <div className="flex flex-wrap gap-6 text-sm">
                <div className="text-left">
                  <span className="block text-muted-foreground text-gray-800">
                    This week
                  </span>
                  <span className="text-lg font-semibold text-foreground  text-gray-800">
                    {downloadSummary.weekly}
                  </span>
                </div>
                <div className="text-left">
                  <span className="block text-muted-foreground  text-gray-800">
                    Rolling 30 days
                  </span>
                  <span className="text-lg font-semibold text-foreground  text-gray-800">
                    {downloadSummary.monthly}
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative overflow-hidden rounded-2xl border border-border bg-background p-6">
                <svg
                  viewBox="0 0 100 100"
                  className="h-48 w-full"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M 0 90 L 100 90"
                    stroke="rgba(15,23,42,0.06)"
                    strokeWidth="1"
                  />
                  <path
                    d={areaPath}
                    fill="rgba(37, 99, 235, 0.1)"
                    stroke="none"
                  />
                  <path
                    d={linePath}
                    fill="none"
                    stroke="rgb(37, 99, 235)"
                    strokeWidth="2.5"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                </svg>
                {downloadStatus !== 'ready' && (
                  <div className="absolute inset-0 flex items-center justify-center bg-background/80 text-xs text-muted-foreground backdrop-blur-sm">
                    {downloadStatus === 'loading'
                      ? 'Loading download data...'
                      : downloadStatus === 'empty'
                      ? 'No downloads yet'
                      : 'Data unavailable'}
                  </div>
                )}
                <div className="absolute inset-x-6 bottom-6 flex justify-between text-xs text-muted-foreground text-gray-700">
                  {downloadTrend.map((point) => (
                    <span key={point.label}>{point.label}</span>
                  ))}
                </div>
              </div>
              <p className="text-sm text-muted-foreground text-center text-gray-700">
                {downloadsMessage}
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

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
    </main>
  );
}
