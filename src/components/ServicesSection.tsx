import { useState, useRef } from 'react';
import Icon from '@/components/ui/icon';

const services = [
  {
    id: 1,
    icon: 'Shield',
    title: 'Уголовная защита',
    subtitle: 'На всех стадиях',
    description: 'Защита подозреваемых, обвиняемых и подсудимых от предъявленных обвинений. Выстраивание стратегии защиты с первых минут.',
    color: 'from-amber-900/40 to-yellow-900/20',
    accent: 'hsl(43,74%,52%)',
  },
  {
    id: 2,
    icon: 'Scale',
    title: 'Представительство в суде',
    subtitle: 'Все инстанции',
    description: 'Профессиональное представление интересов в районных, городских судах, апелляции и кассации.',
    color: 'from-stone-800/60 to-stone-900/40',
    accent: 'hsl(45,60%,60%)',
  },
  {
    id: 3,
    icon: 'FileText',
    title: 'Обжалование приговоров',
    subtitle: 'Апелляция · Кассация',
    description: 'Обжалование незаконных или несправедливых приговоров. Подготовка жалоб в вышестоящие инстанции вплоть до ВС РФ.',
    color: 'from-zinc-800/60 to-zinc-900/40',
    accent: 'hsl(38,65%,50%)',
  },
  {
    id: 4,
    icon: 'UserCheck',
    title: 'Досудебное соглашение',
    subtitle: 'Смягчение наказания',
    description: 'Содействие в заключении досудебного соглашения о сотрудничестве для смягчения наказания.',
    color: 'from-neutral-800/60 to-neutral-900/40',
    accent: 'hsl(43,74%,52%)',
  },
  {
    id: 5,
    icon: 'Lock',
    title: 'Меры пресечения',
    subtitle: 'Залог · Домашний арест',
    description: 'Защита от незаконного содержания под стражей. Ходатайства о залоге, домашнем аресте, запрете определённых действий.',
    color: 'from-stone-800/50 to-amber-950/30',
    accent: 'hsl(45,75%,58%)',
  },
];

type DragState = {
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
  isDragging: boolean;
};

export default function ServicesSection() {
  const [cards, setCards] = useState(services);
  const [animatingId, setAnimatingId] = useState<number | null>(null);
  const [animType, setAnimType] = useState<'folder' | 'left' | 'right' | null>(null);
  const [folderPulse, setFolderPulse] = useState(false);
  const dragState = useRef<DragState>({ startX: 0, startY: 0, currentX: 0, currentY: 0, isDragging: false });
  const cardRef = useRef<HTMLDivElement>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const removeTop = (dir: 'folder' | 'left' | 'right') => {
    if (cards.length === 0 || animatingId !== null) return;
    const topCard = cards[cards.length - 1];
    setAnimatingId(topCard.id);
    setAnimType(dir);
    if (dir === 'folder') setFolderPulse(true);

    setTimeout(() => {
      setCards(prev => prev.filter(c => c.id !== topCard.id));
      setAnimatingId(null);
      setAnimType(null);
      setFolderPulse(false);
    }, 600);
  };

  const resetCards = () => setCards(services);

  // Touch/Mouse drag
  const onPointerDown = (e: React.PointerEvent) => {
    dragState.current = {
      startX: e.clientX, startY: e.clientY,
      currentX: e.clientX, currentY: e.clientY,
      isDragging: true,
    };
    setIsDragging(true);
    setDragOffset({ x: 0, y: 0 });
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragState.current.isDragging) return;
    const dx = e.clientX - dragState.current.startX;
    const dy = e.clientY - dragState.current.startY;
    dragState.current.currentX = e.clientX;
    dragState.current.currentY = e.clientY;
    setDragOffset({ x: dx, y: dy });
  };

  const onPointerUp = () => {
    if (!dragState.current.isDragging) return;
    dragState.current.isDragging = false;
    setIsDragging(false);
    const dx = dragState.current.currentX - dragState.current.startX;
    const dy = dragState.current.currentY - dragState.current.startY;

    if (Math.abs(dx) > 80) {
      removeTop(dx > 0 ? 'right' : 'left');
    } else if (dy > 80) {
      removeTop('folder');
    }
    setDragOffset({ x: 0, y: 0 });
  };

  const topCard = cards[cards.length - 1];
  const secondCard = cards[cards.length - 2];

  const getAnimClass = (id: number) => {
    if (animatingId !== id) return '';
    if (animType === 'folder') return 'animate-swipe-folder';
    if (animType === 'left') return 'animate-swipe-left';
    if (animType === 'right') return 'animate-swipe-right';
    return '';
  };

  const getRotation = () => {
    if (!isDragging) return 0;
    return dragOffset.x * 0.08;
  };

  return (
    <section id="services" className="px-5 pb-16 pt-8">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="text-xs text-gold font-golos tracking-widest uppercase mb-1">Практика</p>
            <h2 className="font-cormorant text-4xl font-semibold text-foreground">Услуги</h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground font-golos">
              {cards.length} / {services.length}
            </span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground font-golos mb-8 leading-relaxed">
          Листайте карточки или перетаскивайте их — влево, вправо или в папку
        </p>

        {/* Card Stack */}
        <div className="relative flex justify-center" style={{ height: '340px' }}>
          {cards.length === 0 ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <div className="glass rounded-2xl p-8 text-center">
                <div className="text-5xl mb-3">📁</div>
                <p className="font-cormorant text-2xl text-foreground mb-1">Все изучено!</p>
                <p className="text-sm text-muted-foreground font-golos mb-4">Вы просмотрели все услуги</p>
                <button onClick={resetCards}
                  className="px-6 py-3 rounded-xl font-golos font-semibold text-sm"
                  style={{ background: 'linear-gradient(135deg, hsl(45,85%,65%), hsl(43,74%,45%))', color: 'hsl(20,10%,6%)' }}>
                  Посмотреть снова
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Back cards (decorative) */}
              {secondCard && (
                <div className="absolute inset-x-4 top-4"
                  style={{
                    height: '300px',
                    borderRadius: '1rem',
                    background: `linear-gradient(135deg, ${secondCard.color})`,
                    border: '1px solid hsla(43,74%,52%,0.1)',
                    transform: 'scale(0.95)',
                    opacity: 0.6,
                  }} />
              )}
              {cards.length > 2 && (
                <div className="absolute inset-x-6 top-6"
                  style={{
                    height: '280px',
                    borderRadius: '1rem',
                    background: 'hsl(20,8%,10%)',
                    border: '1px solid hsla(43,74%,52%,0.07)',
                    transform: 'scale(0.9)',
                    opacity: 0.4,
                  }} />
              )}

              {/* Top Card */}
              {topCard && (
                <div
                  ref={cardRef}
                  className={`absolute inset-x-0 top-0 draggable-card ${getAnimClass(topCard.id)}`}
                  style={{
                    height: '300px',
                    borderRadius: '1.25rem',
                    background: `linear-gradient(135deg, hsl(20,8%,12%), hsl(20,8%,9%))`,
                    border: '1px solid hsla(43,74%,52%,0.2)',
                    boxShadow: '0 20px 60px hsla(20,10%,2%,0.6), 0 0 0 1px hsla(43,74%,52%,0.08)',
                    transform: isDragging
                      ? `translateX(${dragOffset.x}px) translateY(${dragOffset.y * 0.3}px) rotate(${getRotation()}deg)`
                      : 'none',
                    transition: isDragging ? 'none' : 'transform 0.3s ease-out',
                    cursor: isDragging ? 'grabbing' : 'grab',
                    overflow: 'hidden',
                  }}
                  onPointerDown={onPointerDown}
                  onPointerMove={onPointerMove}
                  onPointerUp={onPointerUp}
                  onPointerCancel={onPointerUp}
                >
                  {/* Card inner glow */}
                  <div className="absolute inset-0 pointer-events-none"
                    style={{ background: `radial-gradient(ellipse at top left, ${topCard.accent}18 0%, transparent 60%)` }} />

                  {/* Swipe hint overlays */}
                  {isDragging && dragOffset.x > 30 && (
                    <div className="absolute inset-0 flex items-center justify-end pr-8 pointer-events-none"
                      style={{ background: 'linear-gradient(to left, hsla(120,40%,30%,0.3), transparent)', borderRadius: '1.25rem' }}>
                      <span className="text-2xl">👍</span>
                    </div>
                  )}
                  {isDragging && dragOffset.x < -30 && (
                    <div className="absolute inset-0 flex items-center justify-start pl-8 pointer-events-none"
                      style={{ background: 'linear-gradient(to right, hsla(0,40%,30%,0.3), transparent)', borderRadius: '1.25rem' }}>
                      <span className="text-2xl">✕</span>
                    </div>
                  )}

                  <div className="p-6 h-full flex flex-col">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ background: `${topCard.accent}22`, border: `1px solid ${topCard.accent}44` }}>
                        <Icon name={topCard.icon} fallback="Shield" size={22} style={{ color: topCard.accent }} />
                      </div>
                      <span className="text-xs text-muted-foreground font-golos glass px-3 py-1.5 rounded-full">
                        {topCard.subtitle}
                      </span>
                    </div>

                    <h3 className="font-cormorant text-2xl font-semibold text-foreground mb-3">
                      {topCard.title}
                    </h3>
                    <p className="text-sm text-muted-foreground font-golos leading-relaxed flex-1">
                      {topCard.description}
                    </p>

                    <div className="flex items-center gap-2 mt-4 pt-4"
                      style={{ borderTop: '1px solid hsla(43,74%,52%,0.1)' }}>
                      <span className="text-xs text-muted-foreground font-golos">Потяните карточку</span>
                      <div className="flex gap-1 ml-auto">
                        <span className="text-xs glass px-2 py-1 rounded-full">← отклонить</span>
                        <span className="text-xs glass-gold px-2 py-1 rounded-full text-gold">↓ в папку</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Controls */}
        {cards.length > 0 && (
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={() => removeTop('left')}
              className="w-14 h-14 rounded-full glass flex items-center justify-center text-muted-foreground transition-all active:scale-90 hover:border-red-500/30"
              style={{ border: '1px solid hsla(0,60%,50%,0.2)' }}>
              <Icon name="X" size={20} />
            </button>

            {/* Folder button */}
            <div className="relative">
              <button
                onClick={() => removeTop('folder')}
                className={`w-16 h-16 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all active:scale-90 ${folderPulse ? 'animate-pulse-gold' : ''}`}
                style={{
                  background: 'linear-gradient(135deg, hsl(43,74%,52%), hsl(38,60%,38%))',
                  boxShadow: '0 8px 24px hsla(43,74%,52%,0.4)',
                }}>
                <Icon name="FolderOpen" size={22} style={{ color: 'hsl(20,10%,6%)' }} />
              </button>
              {folderPulse && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gold rounded-full flex items-center justify-center">
                  <span className="text-[8px] font-bold" style={{ color: 'hsl(20,10%,6%)' }}>
                    {services.length - cards.length + 1}
                  </span>
                </div>
              )}
            </div>

            <button
              onClick={() => removeTop('right')}
              className="w-14 h-14 rounded-full glass flex items-center justify-center text-gold transition-all active:scale-90"
              style={{ border: '1px solid hsla(43,74%,52%,0.2)' }}>
              <Icon name="Check" size={20} />
            </button>
          </div>
        )}

        {/* Saved folder indicator */}
        {services.length - cards.length > 0 && (
          <div className="mt-4 flex items-center justify-center gap-2">
            <Icon name="Folder" size={14} className="text-gold" />
            <span className="text-xs text-muted-foreground font-golos">
              Сохранено в папке: <span className="text-gold">{services.length - cards.length}</span>
            </span>
          </div>
        )}
      </div>
    </section>
  );
}