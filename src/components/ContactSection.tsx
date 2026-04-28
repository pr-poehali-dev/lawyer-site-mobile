import { useState } from 'react';
import Icon from '@/components/ui/icon';

export default function ContactSection() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="contact" className="px-5 pb-32 pt-8">
      <div className="max-w-lg mx-auto">
        <div className="mb-6">
          <p className="text-xs text-gold font-golos tracking-widest uppercase mb-1">Связь</p>
          <h2 className="font-cormorant text-4xl font-semibold text-foreground">Контакт</h2>
        </div>

        {/* Contact cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {[
            { icon: 'Phone', label: 'Позвонить', value: '+7 (999) 000-00-00', color: 'hsl(142,60%,45%)' },
            { icon: 'MessageCircle', label: 'WhatsApp', value: 'Написать', color: 'hsl(142,60%,45%)' },
            { icon: 'Send', label: 'Telegram', value: '@morozov_adv', color: 'hsl(200,70%,55%)' },
            { icon: 'MapPin', label: 'Офис', value: 'Москва, Тверская 1', color: 'hsl(43,74%,52%)' },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-xl p-4 cursor-pointer active:scale-95 transition-all"
              style={{
                background: '#ffffff',
                border: '1px solid hsla(36,72%,40%,0.12)',
                boxShadow: '0 2px 8px hsla(25,25%,12%,0.05)',
              }}
            >
              <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-3"
                style={{ background: `${item.color}18` }}>
                <Icon name={item.icon} fallback="Phone" size={16} style={{ color: item.color }} />
              </div>
              <p className="text-xs text-muted-foreground font-golos">{item.label}</p>
              <p className="text-sm font-golos font-medium text-foreground mt-0.5 truncate">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Working hours */}
        <div className="rounded-xl p-4 mb-6 flex items-center gap-3"
          style={{ background: 'hsla(36,72%,40%,0.07)', border: '1px solid hsla(36,72%,40%,0.2)' }}>
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <div>
            <p className="text-sm font-golos font-medium text-foreground">Принимаем звонки 24/7</p>
            <p className="text-xs text-muted-foreground font-golos">В экстренных ситуациях — немедленно</p>
          </div>
        </div>

        {/* Form */}
        {!sent ? (
          <div className="rounded-2xl p-5"
            style={{
              background: '#ffffff',
              border: '1px solid hsla(36,72%,40%,0.14)',
              boxShadow: '0 4px 20px hsla(25,25%,12%,0.07)',
            }}>
            <h3 className="font-cormorant text-xl font-semibold text-foreground mb-4">
              Оставить заявку
            </h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div>
                <input
                  type="text"
                  placeholder="Ваше имя"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl font-golos text-sm text-foreground outline-none transition-all"
                  style={{
                    background: 'hsl(40,25%,96%)',
                    border: '1px solid hsla(36,72%,40%,0.15)',
                  }}
                  onFocus={e => e.target.style.borderColor = 'hsla(36,72%,40%,0.5)'}
                  onBlur={e => e.target.style.borderColor = 'hsla(36,72%,40%,0.15)'}
                />
              </div>
              <div>
                <input
                  type="tel"
                  placeholder="Номер телефона"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl font-golos text-sm text-foreground outline-none transition-all"
                  style={{
                    background: 'hsl(40,25%,96%)',
                    border: '1px solid hsla(36,72%,40%,0.15)',
                  }}
                  onFocus={e => e.target.style.borderColor = 'hsla(36,72%,40%,0.5)'}
                  onBlur={e => e.target.style.borderColor = 'hsla(36,72%,40%,0.15)'}
                />
              </div>
              <div>
                <textarea
                  placeholder="Кратко опишите ситуацию..."
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl font-golos text-sm text-foreground outline-none transition-all resize-none"
                  style={{
                    background: 'hsl(40,25%,96%)',
                    border: '1px solid hsla(36,72%,40%,0.15)',
                  }}
                  onFocus={e => e.target.style.borderColor = 'hsla(36,72%,40%,0.5)'}
                  onBlur={e => e.target.style.borderColor = 'hsla(36,72%,40%,0.15)'}
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 rounded-xl font-golos font-semibold text-sm tracking-wide transition-all active:scale-95"
                style={{
                  background: 'linear-gradient(135deg, hsl(40,80%,48%), hsl(36,72%,34%))',
                  color: '#ffffff',
                  boxShadow: '0 8px 24px hsla(36,72%,40%,0.3)',
                }}
              >
                Отправить заявку
              </button>
              <p className="text-[10px] text-muted-foreground font-golos text-center">
                Конфиденциальность гарантирована. Ответим в течение 30 минут.
              </p>
            </form>
          </div>
        ) : (
          <div className="rounded-2xl p-8 text-center animate-scale-in"
            style={{
              background: 'hsla(142,50%,40%,0.08)',
              border: '1px solid hsla(142,50%,40%,0.25)',
            }}>
            <div className="text-5xl mb-3">✓</div>
            <h3 className="font-cormorant text-2xl font-semibold text-foreground mb-2">
              Заявка отправлена
            </h3>
            <p className="text-sm text-muted-foreground font-golos">
              Мы свяжемся с вами в течение 30 минут
            </p>
          </div>
        )}
      </div>
    </section>
  );
}