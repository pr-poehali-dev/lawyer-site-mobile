import { useState, useRef, useEffect } from 'react';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import CasesSection from '@/components/CasesSection';
import BlogSection from '@/components/BlogSection';
import ContactSection from '@/components/ContactSection';
import BottomNav from '@/components/BottomNav';

type Tab = 'home' | 'services' | 'cases' | 'contact';

const SECTION_IDS: Record<Tab, string> = {
  home: 'hero',
  services: 'services',
  cases: 'cases',
  contact: 'contact',
};

export default function Index() {
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const isScrolling = useRef(false);

  const scrollToSection = (tab: Tab) => {
    setActiveTab(tab);
    const el = document.getElementById(SECTION_IDS[tab]);
    if (el) {
      isScrolling.current = true;
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(() => { isScrolling.current = false; }, 800);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (isScrolling.current) return;
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
            const id = entry.target.id;
            const tab = Object.entries(SECTION_IDS).find(([, v]) => v === id)?.[0] as Tab;
            if (tab) setActiveTab(tab);
          }
        });
      },
      { threshold: 0.3 }
    );

    Object.values(SECTION_IDS).forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="noise-bg min-h-screen" style={{ background: 'hsl(20,10%,6%)' }}>
      {/* Top accent line */}
      <div className="fixed top-0 left-0 right-0 z-40 h-[1px]"
        style={{ background: 'linear-gradient(90deg, transparent, hsla(43,74%,52%,0.5) 40%, hsla(43,74%,52%,0.5) 60%, transparent)' }} />

      <div id="hero"><HeroSection /></div>

      <div className="h-[1px] mx-8"
        style={{ background: 'linear-gradient(90deg, transparent, hsla(43,74%,52%,0.2), transparent)' }} />

      <div id="services"><ServicesSection /></div>

      <div className="h-[1px] mx-8"
        style={{ background: 'linear-gradient(90deg, transparent, hsla(43,74%,52%,0.2), transparent)' }} />

      <div id="cases"><CasesSection /></div>

      <div className="h-[1px] mx-8"
        style={{ background: 'linear-gradient(90deg, transparent, hsla(43,74%,52%,0.2), transparent)' }} />

      <BlogSection />

      <div className="h-[1px] mx-8"
        style={{ background: 'linear-gradient(90deg, transparent, hsla(43,74%,52%,0.2), transparent)' }} />

      <div id="contact"><ContactSection /></div>

      <BottomNav active={activeTab} onChange={scrollToSection} />
    </div>
  );
}
