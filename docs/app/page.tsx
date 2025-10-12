import Hero from '@/components/sections/Hero';
import InstallSection from '@/components/sections/InstallSection';
import QuickStartSection from '@/components/sections/QuickStartSection';
import DownloadsSection from '@/components/sections/DownloadsSection';
import Footer from '@/components/sections/Footer';

export default function Home() {
  return (
    <main className="bg-background text-foreground">
      <Hero />
      <InstallSection />
      <QuickStartSection />
      <DownloadsSection />
      <Footer />
    </main>
  );
}
