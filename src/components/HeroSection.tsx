import { useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/icon';

const LAWYER_PHOTO = "https://cdn.poehali.dev/projects/e6900dbb-5786-4595-974e-238f8f0f08ed/files/998d2b3c-ba4b-4300-b00e-d8bed51fb6e1.jpg";

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / rect.width;
    const dy = (e.clientY - cy) / rect.height;
    setTilt({ x: dy * 12, y: -dx * 12 });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden px-5 pt-16 pb-32">
      {/* Background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-20%] w-[500px] h-[500px] rounded-full"
          style={{ background: 'radial-gradient(circle, hsla(43,74%,52%,0.12) 0%, transparent 70%)' }} />
        <div className="absolute bottom-[10%] left-[-15%] w-[400px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(circle, hsla(43,74%,52%,0.07) 0%, transparent 70%)' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[1px]"
          style={{ background: 'linear-gradient(90deg, transparent, hsla(43,74%,52%,0.3), transparent)' }} />
      </div>

      {/* Decorative lines */}
      <div className="absolute top-0 left-0 right-0 h-[1px]"
        style={{ background: 'linear-gradient(90deg, transparent, hsla(43,74%,52%,0.4), transparent)' }} />

      <div className="relative z-10 max-w-lg mx-auto w-full">
        {/* Badge */}
        <div
          className={`inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full glass-gold transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <div className="w-2 h-2 rounded-full bg-gold animate-pulse-gold" />
          <span className="text-xs font-golos font-medium text-gold tracking-widest uppercase">
            Адвокат · Москва
          </span>
        </div>

        {/* Title */}
        <div className={`mb-4 transition-all duration-700 delay-100 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h1 className="font-cormorant font-light leading-[0.95] text-foreground"
            style={{ fontSize: 'clamp(3rem, 10vw, 5rem)' }}>
            Александр<br />
            <span className="gold-text font-semibold">Морозов</span>
          </h1>
        </div>

        {/* Subtitle */}
        <div className={`mb-8 transition-all duration-700 delay-200 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <p className="font-golos text-muted-foreground text-base leading-relaxed">
            Уголовная защита и представительство<br />
            в суде с 2009 года.
            <span className="text-gold font-medium"> Более 200 выигранных дел.</span>
          </p>
        </div>

        {/* 3D Photo Card */}
        <div
          className={`relative mb-8 transition-all duration-700 delay-300 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ perspective: '1000px' }}
        >
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{
              transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transition: 'transform 0.15s ease-out',
              transformStyle: 'preserve-3d',
              boxShadow: '0 40px 80px hsla(20,10%,2%,0.8), 0 0 0 1px hsla(43,74%,52%,0.15)',
            }}
          >
            <img
              src={LAWYER_PHOTO}
              alt="Адвокат Морозов"
              className="w-full object-cover"
              style={{ height: '55vw', maxHeight: '320px', objectPosition: 'top' }}
            />
            {/* Overlay */}
            <div className="absolute inset-0"
              style={{ background: 'linear-gradient(to top, hsl(20,10%,6%) 0%, transparent 60%)' }} />
            <div className="absolute inset-0"
              style={{ background: 'linear-gradient(135deg, hsla(43,74%,52%,0.08) 0%, transparent 50%)' }} />

            {/* Floating info */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-cormorant text-xl font-semibold text-foreground">15+ лет опыта</p>
                  <p className="text-xs text-muted-foreground font-golos">Адвокатский стаж</p>
                </div>
                <div className="text-right">
                  <p className="font-cormorant text-xl font-semibold text-gold">200+</p>
                  <p className="text-xs text-muted-foreground font-golos">Выигранных дел</p>
                </div>
              </div>
            </div>

            {/* Shine effect */}
            <div className="absolute inset-0 pointer-events-none"
              style={{
                background: `linear-gradient(${135 + tilt.y * 5}deg, hsla(255,255%,255%,0.05) 0%, transparent 60%)`,
                transition: 'background 0.15s',
              }} />
          </div>
        </div>

        {/* Stats */}
        <div className={`grid grid-cols-3 gap-3 mb-8 transition-all duration-700 delay-400 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {[
            { value: '98%', label: 'Довольных клиентов' },
            { value: '24/7', label: 'На связи' },
            { value: '1 день', label: 'Первая консультация' },
          ].map((stat) => (
            <div key={stat.label} className="glass rounded-xl p-3 text-center">
              <p className="font-cormorant text-2xl font-semibold text-gold">{stat.value}</p>
              <p className="text-[10px] text-muted-foreground font-golos leading-tight mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className={`flex gap-3 transition-all duration-700 delay-500 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <button className="flex-1 py-4 rounded-xl font-golos font-semibold text-sm tracking-wide transition-all active:scale-95"
            style={{
              background: 'linear-gradient(135deg, hsl(45,85%,65%), hsl(43,74%,45%))',
              color: 'hsl(20,10%,6%)',
              boxShadow: '0 8px 32px hsla(43,74%,52%,0.35)',
            }}>
            Получить консультацию
          </button>
          <button className="px-5 py-4 rounded-xl font-golos font-medium text-sm glass text-foreground flex items-center gap-2 transition-all active:scale-95">
            <Icon name="Phone" size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
