import { useState } from 'react';
import Icon from '@/components/ui/icon';

const posts = [
  {
    id: 1,
    category: 'Уголовный процесс',
    title: 'Что делать, если вас задержали: 7 правил',
    excerpt: 'Задержание — стрессовая ситуация. Знание своих прав значительно повышает шансы на благоприятный исход.',
    readTime: '4 мин',
    date: '15 апр',
    emoji: '🔒',
    hot: true,
  },
  {
    id: 2,
    category: 'Права обвиняемого',
    title: 'Статья 51 Конституции: когда молчать — мудро',
    excerpt: 'Право не свидетельствовать против себя — одно из ключевых конституционных прав. Как им правильно пользоваться.',
    readTime: '3 мин',
    date: '8 апр',
    emoji: '⚖️',
    hot: false,
  },
  {
    id: 3,
    category: 'Апелляция',
    title: 'Как обжаловать приговор суда: пошаговый гид',
    excerpt: 'Сроки подачи, необходимые документы и стратегия — всё, что нужно знать об апелляционном производстве.',
    readTime: '6 мин',
    date: '1 апр',
    emoji: '📋',
    hot: false,
  },
  {
    id: 4,
    category: 'Практика',
    title: 'Домашний арест вместо СИЗО: как добиться',
    excerpt: 'Разбираем условия и аргументы, которые суд принимает при решении вопроса о мере пресечения.',
    readTime: '5 мин',
    date: '22 мар',
    emoji: '🏠',
    hot: false,
  },
];

export default function BlogSection() {
  const [featured, ...rest] = posts;
  const [readIds, setReadIds] = useState<number[]>([]);

  const markRead = (id: number) => setReadIds(prev => [...prev, id]);

  return (
    <section id="blog" className="px-5 pb-16 pt-8">
      <div className="max-w-lg mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-xs text-gold font-golos tracking-widest uppercase mb-1">Публикации</p>
            <h2 className="font-cormorant text-4xl font-semibold text-foreground">Блог</h2>
          </div>
          <button className="text-xs text-muted-foreground font-golos flex items-center gap-1 transition-all hover:text-gold">
            Все статьи
            <Icon name="ArrowRight" size={12} />
          </button>
        </div>

        {/* Featured post */}
        <div
          className="rounded-2xl overflow-hidden mb-4 cursor-pointer active:scale-[0.98] transition-all"
          style={{
            background: 'linear-gradient(135deg, hsl(20,8%,12%), hsl(20,8%,9%))',
            border: '1px solid hsla(43,74%,52%,0.2)',
            boxShadow: '0 20px 40px hsla(20,10%,2%,0.5)',
          }}
          onClick={() => markRead(featured.id)}
        >
          {/* Top accent */}
          <div className="h-1" style={{ background: 'linear-gradient(90deg, hsl(45,85%,65%), hsl(43,74%,45%))' }} />

          <div className="p-5">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 text-3xl"
                style={{ background: 'hsla(43,74%,52%,0.12)' }}>
                {featured.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-golos font-semibold text-gold bg-gold/10 px-2 py-0.5 rounded-full">
                    {featured.category}
                  </span>
                  {featured.hot && (
                    <span className="text-[10px] font-golos font-semibold px-2 py-0.5 rounded-full"
                      style={{ background: 'hsla(0,70%,50%,0.15)', color: 'hsl(0,70%,65%)' }}>
                      🔥 Горячее
                    </span>
                  )}
                </div>
                <h3 className="font-cormorant text-xl font-semibold text-foreground leading-tight mb-2">
                  {featured.title}
                </h3>
                <p className="text-sm text-muted-foreground font-golos leading-relaxed">
                  {featured.excerpt}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4 pt-4"
              style={{ borderTop: '1px solid hsla(43,74%,52%,0.1)' }}>
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground font-golos flex items-center gap-1">
                  <Icon name="Clock" size={11} />
                  {featured.readTime}
                </span>
                <span className="text-xs text-muted-foreground font-golos">{featured.date}</span>
              </div>
              <button className="text-xs text-gold font-golos font-medium flex items-center gap-1">
                Читать
                <Icon name="ArrowRight" size={12} />
              </button>
            </div>
          </div>
        </div>

        {/* Other posts */}
        <div className="flex flex-col gap-2">
          {rest.map((post) => (
            <div
              key={post.id}
              className="rounded-xl overflow-hidden cursor-pointer active:scale-[0.98] transition-all"
              style={{
                background: readIds.includes(post.id) ? 'hsl(20,8%,8%)' : 'hsl(20,8%,10%)',
                border: '1px solid hsla(43,74%,52%,0.07)',
                opacity: readIds.includes(post.id) ? 0.7 : 1,
              }}
              onClick={() => markRead(post.id)}
            >
              <div className="p-4 flex items-center gap-3">
                <span className="text-2xl flex-shrink-0">{post.emoji}</span>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] text-muted-foreground font-golos">{post.category}</span>
                  <h4 className="font-cormorant text-base font-semibold text-foreground leading-tight truncate">
                    {post.title}
                  </h4>
                </div>
                <div className="flex flex-col items-end gap-1 flex-shrink-0">
                  <span className="text-[10px] text-muted-foreground font-golos">{post.readTime}</span>
                  <Icon name="ChevronRight" size={14} className="text-muted-foreground" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
