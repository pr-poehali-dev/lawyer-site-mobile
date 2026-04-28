import { useState } from 'react';
import Icon from '@/components/ui/icon';

const cases = [
  {
    id: 1,
    category: 'Уголовное дело',
    tag: 'Оправдан',
    tagColor: 'hsl(142,60%,45%)',
    title: 'Дело о мошенничестве в крупном размере',
    result: 'Оправдательный приговор',
    description: 'Клиент обвинялся в мошенничестве на сумму 18 млн рублей. Благодаря детальному анализу доказательств удалось доказать невиновность.',
    year: '2024',
    article: 'ст. 159 УК РФ',
  },
  {
    id: 2,
    category: 'Апелляция',
    tag: 'Пересмотр',
    tagColor: 'hsl(43,74%,52%)',
    title: 'Переквалификация статьи обвинения',
    result: 'Срок снижен с 7 до 2 лет',
    description: 'Благодаря обжалованию приговора удалось добиться переквалификации с тяжкой на менее тяжкую статью.',
    year: '2023',
    article: 'ст. 111 → ст. 112 УК РФ',
  },
  {
    id: 3,
    category: 'Уголовное дело',
    tag: 'Условный срок',
    tagColor: 'hsl(200,70%,55%)',
    title: 'Условное осуждение вместо реального',
    result: 'Условный срок 1.5 года',
    description: 'По делу о наркотиках клиенту грозило до 10 лет. Удалось добиться условного осуждения.',
    year: '2023',
    article: 'ст. 228 УК РФ',
  },
  {
    id: 4,
    category: 'Досудебное',
    tag: 'Прекращено',
    tagColor: 'hsl(142,60%,45%)',
    title: 'Прекращение дела на этапе следствия',
    result: 'Дело прекращено',
    description: 'Дело о превышении должностных полномочий прекращено ещё до передачи в суд.',
    year: '2024',
    article: 'ст. 286 УК РФ',
  },
];

export default function CasesSection() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>('Все');

  const filters = ['Все', 'Уголовное дело', 'Апелляция', 'Досудебное'];
  const filtered = filter === 'Все' ? cases : cases.filter(c => c.category === filter);

  return (
    <section id="cases" className="px-5 pb-16 pt-8">
      <div className="max-w-lg mx-auto">
        <div className="mb-6">
          <p className="text-xs text-gold font-golos tracking-widest uppercase mb-1">Портфолио</p>
          <h2 className="font-cormorant text-4xl font-semibold text-foreground">Дела</h2>
        </div>

        {/* Filter chips */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-golos font-medium transition-all ${
                filter === f
                  ? 'text-background'
                  : 'glass text-muted-foreground'
              }`}
              style={filter === f ? {
                background: 'linear-gradient(135deg, hsl(45,85%,65%), hsl(43,74%,45%))',
              } : {}}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Cases list */}
        <div className="flex flex-col gap-3">
          {filtered.map((c, i) => (
            <div
              key={c.id}
              className="rounded-2xl overflow-hidden cursor-pointer transition-all active:scale-[0.98]"
              style={{
                background: 'hsl(20,8%,10%)',
                border: expanded === c.id ? '1px solid hsla(43,74%,52%,0.3)' : '1px solid hsla(43,74%,52%,0.08)',
                boxShadow: expanded === c.id ? '0 8px 32px hsla(43,74%,52%,0.12)' : 'none',
                animationDelay: `${i * 80}ms`,
              }}
              onClick={() => setExpanded(expanded === c.id ? null : c.id)}
            >
              <div className="p-4">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-[10px] text-muted-foreground font-golos">{c.article}</span>
                      <span className="text-[10px] text-muted-foreground font-golos">·</span>
                      <span className="text-[10px] text-muted-foreground font-golos">{c.year}</span>
                    </div>
                    <h3 className="font-cormorant text-lg font-semibold text-foreground leading-tight">
                      {c.title}
                    </h3>
                  </div>
                  <div className="flex-shrink-0 flex flex-col items-end gap-2">
                    <span
                      className="text-[10px] font-golos font-semibold px-2.5 py-1 rounded-full"
                      style={{
                        background: `${c.tagColor}22`,
                        color: c.tagColor,
                        border: `1px solid ${c.tagColor}44`,
                      }}
                    >
                      {c.tag}
                    </span>
                    <Icon
                      name={expanded === c.id ? "ChevronUp" : "ChevronDown"}
                      size={14}
                      className="text-muted-foreground"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: c.tagColor }} />
                  <span className="text-xs font-golos font-medium" style={{ color: c.tagColor }}>
                    {c.result}
                  </span>
                </div>
              </div>

              {/* Expanded */}
              {expanded === c.id && (
                <div className="px-4 pb-4" style={{ borderTop: '1px solid hsla(43,74%,52%,0.1)' }}>
                  <p className="text-sm text-muted-foreground font-golos leading-relaxed pt-3">
                    {c.description}
                  </p>
                  <button
                    className="mt-3 text-xs text-gold font-golos font-medium flex items-center gap-1"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Обсудить похожую ситуацию
                    <Icon name="ArrowRight" size={12} />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-center">
          <button className="glass px-6 py-3 rounded-xl font-golos text-sm text-muted-foreground flex items-center gap-2 transition-all active:scale-95">
            <Icon name="Archive" size={16} />
            Все дела в архиве
          </button>
        </div>
      </div>
    </section>
  );
}
