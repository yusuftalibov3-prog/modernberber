/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Scissors, 
  Clock, 
  MapPin, 
  Phone, 
  Instagram, 
  Menu, 
  X, 
  ChevronRight,
  MessageCircle,
  Calendar,
  User,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const SERVICES = [
  {
    id: 1,
    title: 'Saç Kesimi',
    duration: '30 dk',
    description: 'Profesyonel ekip, net çizgiler ve modern dokunuşlar.',
    icon: <Scissors className="w-6 h-6" />
  },
  {
    id: 2,
    title: 'Sakal Tıraşı',
    duration: '20 dk',
    description: 'Yüz hatlarınıza uygun, titiz sakal şekillendirme.',
    icon: <User className="w-6 h-6" />
  },
  {
    id: 3,
    title: 'Fade Kesim',
    duration: '40 dk',
    description: 'Kusursuz geçişler ve keskin hatlar için uzman dokunuşu.',
    icon: <Scissors className="w-6 h-6" />
  },
  {
    id: 4,
    title: 'Çocuk Tıraşı',
    duration: '25 dk',
    description: 'Minik misafirlerimiz için eğlenceli ve sabırlı hizmet.',
    icon: <Scissors className="w-6 h-6" />
  }
];

const HOURS = [
  '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', 
  '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', 
  '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', 
  '19:00', '19:30', '20:00'
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    date: '',
    time: ''
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.service || !formData.date || !formData.time) {
      alert('Lütfen tüm alanları doldurunuz.');
      return;
    }

    const message = `Merhaba, randevu almak istiyorum.
İsim: ${formData.name}
Telefon: ${formData.phone}
Hizmet: ${formData.service}
Tarih: ${formData.date}
Saat: ${formData.time}`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/905XXXXXXXXX?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-dark-bg text-text-light selection:bg-gold selection:text-dark-bg">
      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass-nav py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <a href="#" className="text-2xl font-bold tracking-tighter flex items-center gap-2 group">
            <div className="w-10 h-10 bg-gold rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform">
              <Scissors className="text-dark-bg w-6 h-6" />
            </div>
            <span className="gold-text-gradient">MODERN BARBER</span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#hizmetler" className="text-sm font-medium hover:text-gold transition-colors">Hizmetler</a>
            <a href="#randevu" className="text-sm font-medium hover:text-gold transition-colors">Randevu</a>
            <a href="#konum" className="text-sm font-medium hover:text-gold transition-colors">Konum</a>
            <a href="#iletisim" className="text-sm font-medium hover:text-gold transition-colors">İletişim</a>
            <a href="#randevu" className="px-6 py-2.5 bg-gold text-dark-bg rounded-full text-sm font-bold hover:scale-105 active:scale-95 transition-all shadow-lg shadow-gold/20">
              Randevu Al
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-gold" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 right-0 bg-card-bg border-b border-white/5 p-6 md:hidden"
            >
              <div className="flex flex-col gap-4">
                <a href="#hizmetler" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium py-2 border-b border-white/5">Hizmetler</a>
                <a href="#randevu" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium py-2 border-b border-white/5">Randevu</a>
                <a href="#konum" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium py-2 border-b border-white/5">Konum</a>
                <a href="#iletisim" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium py-2 border-b border-white/5">İletişim</a>
                <a href="#randevu" onClick={() => setIsMenuOpen(false)} className="mt-4 w-full py-4 bg-gold text-dark-bg rounded-xl text-center font-bold">
                  Randevu Al
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 bg-gold/10 text-gold rounded-full text-xs font-bold tracking-widest uppercase mb-6 border border-gold/20">
              Premium Barbershop Deneyimi
            </span>
            <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] mb-6 tracking-tight">
              Modern Kesim.<br />
              <span className="gold-text-gradient">Net Stil.</span>
            </h1>
            <p className="text-lg text-text-light/60 mb-10 max-w-lg leading-relaxed">
              Saç • Sakal • Fade — Profesyonel barber ekibimizle tarzınızı yenileyin. Online randevu alın, sıra beklemeden koltuğunuza geçin.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#randevu" className="px-8 py-4 bg-gold text-dark-bg rounded-xl font-bold flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-gold/20">
                <Calendar size={20} />
                Randevu Al
              </a>
              <a href="https://wa.me/905XXXXXXXXX" target="_blank" className="px-8 py-4 bg-white/5 border border-white/10 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-white/10 transition-all">
                <MessageCircle size={20} />
                WhatsApp
              </a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative group">
              <img 
                src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=1000" 
                alt="Barber Shop" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent opacity-60"></div>
            </div>
            {/* Floating Stats */}
            <div className="absolute -bottom-6 -left-6 bg-card-bg border border-white/10 p-6 rounded-2xl shadow-2xl hidden lg:block">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="text-gold" />
                </div>
                <div>
                  <p className="text-2xl font-bold">100%</p>
                  <p className="text-xs text-text-light/50 uppercase tracking-wider">Müşteri Memnuniyeti</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="hizmetler" className="py-24 bg-dark-bg relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Hizmetlerimiz</h2>
            <div className="w-20 h-1 bg-gold mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 bg-card-bg rounded-3xl border border-white/5 hover:border-gold/50 transition-all group hover:-translate-y-2"
              >
                <div className="w-14 h-14 bg-gold/10 rounded-2xl flex items-center justify-center text-gold mb-6 group-hover:bg-gold group-hover:text-dark-bg transition-colors">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <div className="flex items-center gap-2 text-gold/60 text-sm mb-4">
                  <Clock size={14} />
                  <span>{service.duration}</span>
                </div>
                <p className="text-text-light/50 text-sm leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-card-bg relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <Scissors className="absolute top-10 -left-20 w-96 h-96 rotate-12" />
          <Scissors className="absolute bottom-10 -right-20 w-96 h-96 -rotate-12" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto bg-dark-bg p-10 md:p-16 rounded-[3rem] border border-white/10 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Şeffaf Fiyat Politikası</h2>
            <p className="text-lg text-text-light/60 mb-10">
              Kaliteli hizmet, adil fiyatlandırma. Başlangıç fiyatlarımız <span className="text-gold font-bold">250₺</span>'den itibaren. Net fiyat bilgisi ve özel talepleriniz için bize ulaşabilirsiniz.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="https://wa.me/905XXXXXXXXX" target="_blank" className="px-10 py-4 bg-gold text-dark-bg rounded-xl font-bold hover:scale-105 transition-all shadow-xl shadow-gold/20">
                Fiyat Sor
              </a>
              <a href="#randevu" className="px-10 py-4 bg-white/5 border border-white/10 rounded-xl font-bold hover:bg-white/10 transition-all">
                Hizmetleri İncele
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Appointment Section */}
      <section id="randevu" className="py-24 bg-dark-bg">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
                Zamanınız Değerli.<br />
                <span className="gold-text-gradient">Hemen Randevu Alın.</span>
              </h2>
              <ul className="space-y-6">
                {[
                  'Sıra beklemeden hızlı hizmet',
                  'İstediğiniz barberı seçme imkanı',
                  'Konforlu ve modern bekleme alanı',
                  'Ücretsiz içecek ikramı'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-lg text-text-light/70">
                    <div className="w-6 h-6 bg-gold/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 size={14} className="text-gold" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-card-bg p-8 md:p-10 rounded-[2.5rem] border border-white/10 shadow-2xl"
            >
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-text-light/40 ml-1">Ad Soyad</label>
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Örn: Ahmet Yılmaz"
                      className="w-full bg-dark-bg border border-white/10 rounded-xl px-4 py-3.5 focus:border-gold focus:outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-text-light/40 ml-1">Telefon</label>
                    <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="05XX XXX XX XX"
                      className="w-full bg-dark-bg border border-white/10 rounded-xl px-4 py-3.5 focus:border-gold focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-text-light/40 ml-1">Hizmet Seçin</label>
                  <select 
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className="w-full bg-dark-bg border border-white/10 rounded-xl px-4 py-3.5 focus:border-gold focus:outline-none transition-all appearance-none"
                  >
                    <option value="">Hizmet Seçiniz</option>
                    {SERVICES.map(s => <option key={s.id} value={s.title}>{s.title}</option>)}
                  </select>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-text-light/40 ml-1">Tarih</label>
                    <input 
                      type="date" 
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="w-full bg-dark-bg border border-white/10 rounded-xl px-4 py-3.5 focus:border-gold focus:outline-none transition-all [color-scheme:dark]"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-text-light/40 ml-1">Saat</label>
                    <select 
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      className="w-full bg-dark-bg border border-white/10 rounded-xl px-4 py-3.5 focus:border-gold focus:outline-none transition-all appearance-none"
                    >
                      <option value="">Saat Seçiniz</option>
                      {HOURS.map(h => <option key={h} value={h}>{h}</option>)}
                    </select>
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full py-4 bg-gold text-dark-bg rounded-xl font-bold flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-gold/20 mt-4"
                >
                  <MessageCircle size={20} />
                  Randevuyu WhatsApp'a Gönder
                </button>
                <p className="text-[10px] text-center text-text-light/30 uppercase tracking-widest">
                  Randevunuz WhatsApp üzerinden onaylanacaktır.
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section id="konum" className="py-24 bg-card-bg">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 rounded-[2.5rem] overflow-hidden border border-white/10 h-[450px] relative">
              {/* Google Maps Placeholder */}
              <div className="absolute inset-0 bg-dark-bg flex flex-col items-center justify-center text-center p-10">
                <MapPin size={48} className="text-gold mb-4 animate-bounce" />
                <h3 className="text-2xl font-bold mb-2">Konumumuz</h3>
                <p className="text-text-light/50 max-w-sm mb-6">
                  Merkez Mah. İstiklal Cad. No:123, Modern Plaza Kat:1, İstanbul
                </p>
                <button className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl font-bold hover:bg-white/10 transition-all">
                  Yol Tarifi Al
                </button>
              </div>
              {/* In a real app, you'd use an iframe here */}
              {/* <iframe src="..." className="w-full h-full border-0 grayscale invert contrast-125 opacity-80"></iframe> */}
            </div>

            <div className="flex flex-col justify-center space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <Clock className="text-gold" />
                  Çalışma Saatleri
                </h3>
                <div className="space-y-3">
                  {[
                    { day: 'Pazartesi - Cumartesi', hours: '10:00 – 21:00' },
                    { day: 'Pazar', hours: '11:00 – 19:00' }
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center py-3 border-b border-white/5">
                      <span className="text-text-light/70">{item.day}</span>
                      <span className="font-bold text-gold">{item.hours}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div id="iletisim">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <Phone className="text-gold" />
                  İletişim
                </h3>
                <div className="space-y-4">
                  <a href="tel:+905XXXXXXXXX" className="block text-xl font-medium hover:text-gold transition-colors">
                    +90 (5XX) XXX XX XX
                  </a>
                  <p className="text-text-light/50">
                    Sorularınız ve özel randevu talepleriniz için bizi arayabilirsiniz.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-dark-bg border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <Scissors className="text-gold w-6 h-6" />
              <span className="font-bold tracking-tighter text-xl">MODERN BARBER</span>
            </div>
            
            <div className="flex items-center gap-6">
              <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-gold hover:text-dark-bg transition-all">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-gold hover:text-dark-bg transition-all">
                <MessageCircle size={20} />
              </a>
            </div>

            <p className="text-text-light/30 text-sm">
              © 2026 Modern Barber – Demo Taslak
            </p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button (Mobile) */}
      <a 
        href="https://wa.me/905XXXXXXXXX" 
        target="_blank"
        className="fixed bottom-6 right-6 w-14 h-14 bg-green-500 text-white rounded-full flex items-center justify-center shadow-2xl md:hidden z-40 animate-pulse"
      >
        <MessageCircle size={28} />
      </a>
    </div>
  );
}
