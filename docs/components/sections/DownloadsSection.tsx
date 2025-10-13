'use client';

import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';

type DataPoint = {
  day: string;
  downloads: number;
  date: string;
};

type DownloadSummary = {
  weekly: string;
  monthly: string;
};

type DownloadStatus = 'loading' | 'success' | 'error';

// Custom tooltip component for better styling
const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3">
        <p className="text-sm font-medium text-gray-900">
          {label
            ? new Date(label).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })
            : ''}
        </p>
        <p className="text-sm text-blue-600">
          Downloads:{' '}
          <span className="font-semibold">
            {payload[0].value.toLocaleString()}
          </span>
        </p>
      </div>
    );
  }
  return null;
};

export default function DownloadsSection() {
  const [downloadTrend, setDownloadTrend] = useState<DataPoint[]>([]);
  const [downloadSummary, setDownloadSummary] = useState<DownloadSummary>({
    weekly: '0',
    monthly: '0',
  });
  const [downloadStatus, setDownloadStatus] =
    useState<DownloadStatus>('loading');

  useEffect(() => {
    const fetchDownloadData = async () => {
      try {
        setDownloadStatus('loading');

        const response = await fetch(
          'https://api.npmjs.org/downloads/range/last-month/initgen'
        );
        const data = await response.json();

        if (data && data.downloads) {
          // Transform API data to our format
          const transformedData = data.downloads.map((item: any) => ({
            day: item.day,
            downloads: item.downloads,
            date: item.day,
          }));

          setDownloadTrend(transformedData);

          // Calculate summaries
          const weekData = transformedData.slice(-7);
          const weeklyTotal = weekData.reduce(
            (sum: number, item: DataPoint) => sum + item.downloads,
            0
          );
          const monthlyTotal = transformedData.reduce(
            (sum: number, item: DataPoint) => sum + item.downloads,
            0
          );

          setDownloadSummary({
            weekly: weeklyTotal.toLocaleString(),
            monthly: monthlyTotal.toLocaleString(),
          });

          setDownloadStatus('success');
        } else {
          throw new Error('No download data found');
        }
      } catch (error) {
        console.error('Error fetching download data:', error);
        setDownloadStatus('error');

        // Fallback data
        const fallbackData = [
          { day: '2024-01-15', downloads: 150, date: '2024-01-15' },
          { day: '2024-01-16', downloads: 200, date: '2024-01-16' },
          { day: '2024-01-17', downloads: 180, date: '2024-01-17' },
          { day: '2024-01-18', downloads: 220, date: '2024-01-18' },
          { day: '2024-01-19', downloads: 190, date: '2024-01-19' },
          { day: '2024-01-20', downloads: 240, date: '2024-01-20' },
          { day: '2024-01-21', downloads: 280, date: '2024-01-21' },
          { day: '2024-01-22', downloads: 320, date: '2024-01-22' },
          { day: '2024-01-23', downloads: 290, date: '2024-01-23' },
          { day: '2024-01-24', downloads: 350, date: '2024-01-24' },
          { day: '2024-01-25', downloads: 380, date: '2024-01-25' },
          { day: '2024-01-26', downloads: 420, date: '2024-01-26' },
          { day: '2024-01-27', downloads: 390, date: '2024-01-27' },
          { day: '2024-01-28', downloads: 450, date: '2024-01-28' },
        ];

        setDownloadTrend(fallbackData);
        const weekData = fallbackData.slice(-7);
        const weeklyTotal = weekData.reduce(
          (sum: number, item: DataPoint) => sum + item.downloads,
          0
        );
        const monthlyTotal = fallbackData.reduce(
          (sum: number, item: DataPoint) => sum + item.downloads,
          0
        );

        setDownloadSummary({
          weekly: weeklyTotal.toLocaleString(),
          monthly: monthlyTotal.toLocaleString(),
        });
      }
    };

    fetchDownloadData();
  }, []);

  const downloadsMessage = {
    loading: 'Loading download statistics...',
    success: 'Live npm download data',
    error: 'Unable to load live data (showing sample)',
  }[downloadStatus];

  return (
    <section className="container mx-auto py-16">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Download Statistics
          </h2>
          <p className="text-lg text-muted-foreground mb-2">
            Join thousands of developers using InitGen CLI
          </p>
          <p className="text-sm text-gray-500">{downloadsMessage}</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Summary Cards */}
          <Card>
            <CardHeader>
              <CardTitle>Downloads Summary</CardTitle>
              <CardDescription>
                Recent download statistics for InitGen CLI
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                <span className="block text-gray-800">This week</span>
                <span className="text-lg font-semibold text-gray-800">
                  {downloadSummary.weekly}
                </span>
              </div>
              <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                <span className="block text-gray-800">This month</span>
                <span className="text-lg font-semibold text-gray-800">
                  {downloadSummary.monthly}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Interactive Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Download Trend</CardTitle>
              <CardDescription>
                Interactive chart showing daily downloads over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={downloadTrend}>
                    <defs>
                      <linearGradient
                        id="colorDownloads"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#3B82F6"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="#3B82F6"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis
                      dataKey="day"
                      tickFormatter={(value: string) => {
                        const date = new Date(value);
                        return date.toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        });
                      }}
                      tick={{ fontSize: 12 }}
                      stroke="#666"
                    />
                    <YAxis
                      tickFormatter={(value: number) => value.toLocaleString()}
                      tick={{ fontSize: 12 }}
                      stroke="#666"
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="downloads"
                      stroke="#3B82F6"
                      fillOpacity={1}
                      fill="url(#colorDownloads)"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <p className="text-sm text-muted-foreground text-center mt-4">
                Hover over the chart to see detailed download numbers for each
                day
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
