'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

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

export default function InstallSection() {
  return (
    <section className="bg-card/50">
      <div className="container grid gap-10 py-16">
        <div className="mx-auto max-w-2xl space-y-3 text-center">
          <h2 className="text-2xl font-semibold  text-gray-800">Install</h2>
          <p className="text-base  text-gray-700">
            Two straightforward commands cover every workflow. Install globally
            to keep InitGen ready, or run it instantly when you want to
            prototype.
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
  );
}
