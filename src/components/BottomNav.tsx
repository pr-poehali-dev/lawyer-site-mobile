import Icon from '@/components/ui/icon';

type Tab = 'home' | 'services' | 'cases' | 'contact';

interface BottomNavProps {
  active: Tab;
  onChange: (tab: Tab) => void;
}

const tabs: { id: Tab; label: string; icon: string }[] = [
  { id: 'home', label: 'Дом', icon: 'Home' },
  { id: 'services', label: 'Услуги', icon: 'Briefcase' },
  { id: 'cases', label: 'Дела', icon: 'Scale' },
  { id: 'contact', label: 'Контакт', icon: 'Phone' },
];

export default function BottomNav({ active, onChange }: BottomNavProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 pb-safe">
      <div className="mx-4 mb-4">
        <div
          className="rounded-2xl flex items-stretch"
          style={{
            background: 'hsla(40,30%,98%,0.92)',
            backdropFilter: 'blur(30px)',
            WebkitBackdropFilter: 'blur(30px)',
            border: '1px solid hsla(36,72%,40%,0.15)',
            boxShadow: '0 -4px 40px hsla(25,25%,12%,0.1), 0 0 0 0.5px hsla(36,72%,40%,0.08)',
          }}
        >
          {tabs.map((tab, i) => {
            const isActive = active === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onChange(tab.id)}
                className="flex-1 flex flex-col items-center justify-center py-3 gap-1 relative transition-all active:scale-90"
                style={{ minHeight: '60px' }}
              >
                {/* Active indicator */}
                {isActive && (
                  <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 rounded-full"
                    style={{
                      width: '32px',
                      height: '2px',
                      background: 'linear-gradient(90deg, hsl(40,80%,48%), hsl(36,72%,34%))',
                    }}
                  />
                )}

                {/* Active background glow */}
                {isActive && (
                  <div
                    className="absolute inset-1 rounded-xl pointer-events-none"
                    style={{ background: 'hsla(36,72%,40%,0.07)' }}
                  />
                )}

                {/* Divider */}
                {i > 0 && !isActive && active !== tabs[i - 1].id && (
                  <div
                    className="absolute left-0 top-1/4 bottom-1/4 w-[1px]"
                    style={{ background: 'hsla(36,72%,40%,0.1)' }}
                  />
                )}

                <div
                  className="relative z-10 w-6 h-6 flex items-center justify-center transition-all"
                  style={{ transform: isActive ? 'scale(1.1)' : 'scale(1)' }}
                >
                  <Icon
                    name={tab.icon}
                    fallback="Home"
                    size={20}
                    style={{ color: isActive ? 'hsl(36,72%,36%)' : 'hsl(25,12%,55%)' }}
                  />
                </div>

                <span
                  className="relative z-10 text-[10px] font-golos font-medium transition-all"
                  style={{ color: isActive ? 'hsl(36,72%,32%)' : 'hsl(25,12%,55%)' }}
                >
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}