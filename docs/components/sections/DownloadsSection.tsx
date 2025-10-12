'use client';

import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

type DataPoint = {
  label: string;
  value: number;
};

type DownloadSummary = {
  weekly: string;
  monthly: string;
};

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

export default function DownloadsSection() {
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
                <span className="block text-gray-800">This week</span>
                <span className="text-lg font-semibold text-gray-800">
                  {downloadSummary.weekly}
                </span>
              </div>
              <div className="text-left">
                <span className="block text-muted-foreground  text-gray-800">
                  Rolling 30 days
                </span>
                <span className="text-lg font-semibold text-gray-800">
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
  );
}
