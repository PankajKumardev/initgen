import Hero from '@/components/sections/Hero';
import InstallSection from '@/components/sections/InstallSection';
import QuickStartSection from '@/components/sections/QuickStartSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import DownloadsSection from '@/components/sections/DownloadsSection';
import Footer from '@/components/sections/Footer';

export default function Home() {
  return (
    <main className="bg-background text-foreground">
      <Hero />

      <div className="bg-gray-50">
        <InstallSection />
      </div>

      <QuickStartSection />

      <div className="bg-blue-50">
        <FeaturesSection />
      </div>

      <div className="bg-gray-50">
        <DownloadsSection />
      </div>

      <Footer />
    </main>
  );
}
