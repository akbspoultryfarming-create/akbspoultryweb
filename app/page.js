'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
import {
  Phone, MapPin, Mail, Menu, X, ChevronLeft, ChevronRight, ArrowUp, MessageCircle,
  Leaf, Bird, Factory, Wheat, ShieldCheck, Users, Sparkles, ArrowRight, Download,
  Building2, Handshake, Lightbulb, Wrench, Cog, HeartHandshake, Headphones,
  Facebook, Instagram, Linkedin, Youtube, ChevronDown, Play, CheckCircle2, Award,
  Zap, Droplets, Wind, Thermometer, Activity, PackageOpen, TestTube2, Warehouse,
  Send, Star, Quote, Briefcase, Calendar, Clock, MapPinned, ChevronsRight,
  Newspaper, ScrollText, Egg, Beaker, Utensils, ShoppingBag, ArrowUpRight, TrendingUp
} from 'lucide-react';

/* ============ DATA ============ */
const NAV_LINKS = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Farm', href: '#farm' },
  { name: 'Products', href: '#products' },
  { name: 'Infrastructure', href: '#infrastructure' },
  { name: 'Projects', href: '#projects' },
  { name: 'Gallery', href: '#gallery' },
  { name: 'News', href: '#news' },
  { name: 'Careers', href: '#careers' },
  { name: 'Contact', href: '#contact' },
];

const HERO_SLIDES = [
  {
    image: 'https://images.unsplash.com/photo-1630090374791-c9eb7bab3935?auto=format&fit=crop&w=2000&q=80',
    tag: 'Integrated Poultry Farming',
    title: ['AKBS POULTRY', 'FARMING', 'PRIVATE LIMITED'],
    subtitle: 'Integrated Poultry Farming  •  Feed Manufacturing  •  Modern Poultry Infrastructure',
    description: 'Delivering quality poultry products through modern technology, scientific farming and strong biosecurity standards.',
  },
  {
    image: 'https://images.pexels.com/photos/17064389/pexels-photo-17064389.jpeg?auto=compress&cs=tinysrgb&w=2000',
    tag: 'Environment Controlled Sheds',
    title: ['MODERN', 'ENVIRONMENT CONTROLLED', 'BROILER FARM'],
    subtitle: 'Automatic Feeding  •  Climate Control  •  Bio-Secure Environment',
    description: 'State-of-the-art poultry sheds delivering optimal growth, uniformity, and world-class farm efficiency.',
  },
  {
    image: 'https://images.unsplash.com/photo-1627920768537-8f71c0c8dc44?auto=format&fit=crop&w=2000&q=80',
    tag: 'Feed Manufacturing Unit',
    title: ['AKBS FEED', 'MANUFACTURING', 'UNIT'],
    subtitle: 'Premium Poultry Feed  •  Laboratory Tested  •  Continuous Production',
    description: 'Manufacturing high-quality, nutritionally balanced poultry feed with modern machinery and quality raw materials.',
  },
];

const STATS = [
  { icon: Bird, value: '20,000+', label: 'Birds Capacity' },
  { icon: Factory, value: '100,000+', label: 'Future Expansion' },
  { icon: Wheat, value: 'Premium Feed', label: 'Quality Nutrition' },
  { icon: ShieldCheck, value: '100%', label: 'Bio Secure Farm' },
  { icon: Users, value: 'Experienced', label: 'Management Team' },
];

const FARM_FEATURES = [
  { icon: Building2, text: 'Environment Controlled Sheds' },
  { icon: Cog, text: 'Automatic Feeding System' },
  { icon: Droplets, text: 'Automatic Drinking System' },
  { icon: Wind, text: 'Cooling Pad & Tunnel Ventilation' },
  { icon: Thermometer, text: 'Climate Control & Bio Security' },
  { icon: Activity, text: 'Healthy Bird Management' },
];

const FEED_FEATURES = [
  { icon: Award, text: 'Premium Quality Poultry Feed' },
  { icon: Factory, text: 'Modern Feed Manufacturing Plant' },
  { icon: Leaf, text: 'Quality Raw Materials' },
  { icon: TestTube2, text: 'Quality Control Laboratory' },
  { icon: Warehouse, text: 'Efficient Storage & Production' },
  { icon: PackageOpen, text: 'Feed for Broilers & Growers' },
];

const PROJECTS = [
  { title: 'Commercial Broiler Farm', subtitle: 'Modern Poultry Operations', image: 'https://images.pexels.com/photos/16667124/pexels-photo-16667124.jpeg?auto=compress&cs=tinysrgb&w=1200', icon: Bird },
  { title: 'Environment Controlled Farm', subtitle: 'Climate Managed Sheds', image: 'https://images.pexels.com/photos/17064389/pexels-photo-17064389.jpeg?auto=compress&cs=tinysrgb&w=1200', icon: Wind },
  { title: 'Feed Plant', subtitle: 'Manufacturing Excellence', image: 'https://images.unsplash.com/photo-1582055871659-2fcf2e4d3bd3?auto=format&fit=crop&w=1200&q=80', icon: Factory },
  { title: 'Future Hatchery Project', subtitle: 'Chick Production', image: 'https://images.pexels.com/photos/33520448/pexels-photo-33520448.jpeg?auto=compress&cs=tinysrgb&w=1200', icon: Sparkles },
  { title: 'Integrated Poultry Expansion', subtitle: 'Growth Vision 2030', image: 'https://images.unsplash.com/photo-1627920768537-8f71c0c8dc44?auto=format&fit=crop&w=1200&q=80', icon: Building2 },
];

const SERVICES = [
  { icon: Bird, title: 'Broiler Farming' },
  { icon: Wheat, title: 'Feed Manufacturing' },
  { icon: Building2, title: 'Farm Development' },
  { icon: Handshake, title: 'Contract Farming' },
  { icon: Lightbulb, title: 'Poultry Consultancy' },
  { icon: Sparkles, title: 'Project Consultancy' },
  { icon: Wrench, title: 'Farm Equipment Supply' },
  { icon: Cog, title: 'Farm Automation' },
  { icon: HeartHandshake, title: 'Technical Guidance' },
  { icon: Headphones, title: 'After Sales Support' },
];

const MANAGEMENT = [
  { name: 'Balram Singh Ahirwar', role: 'Managing Director', image: 'https://customer-assets-0z36b82j.emergentagent.net/job_akbs-corporate-site/artifacts/r46tm9lk_image.png', description: 'Leading corporate strategy, poultry operations, farm management and integrated business development ensuring world-class production standards at AKBS Poultry.' },
  { name: 'Shailendra Choudhary', role: 'Project Coordinator  •  CEO, Savrdh Financial Services Pvt Ltd', image: 'https://customer-assets-0z36b82j.emergentagent.net/job_akbs-corporate-site/artifacts/uf1ldk6w_image.png', description: 'Driving project coordination, financial planning and expansion at AKBS Poultry. Also serves as CEO of Savrdh Financial Services Private Limited.' },
  { name: 'Kirti', role: 'Director', image: 'https://customer-assets-0z36b82j.emergentagent.net/job_akbs-corporate-site/artifacts/5cuw2g4u_image.png', description: 'Responsible for administration, compliance and overall company operations ensuring smooth day-to-day execution across all AKBS Poultry facilities.' },
];

const TESTIMONIALS = [
  { name: 'Rajesh Kumar', role: 'Poultry Distributor', quote: 'AKBS delivers consistent bird quality and uniform weight. Their bio-security discipline is truly best in class.' },
  { name: 'Anita Verma', role: 'Feed Buyer', quote: 'The feed quality is exceptional. Our FCR improved dramatically after switching to AKBS premium feed.' },
  { name: 'Dr. Suresh Patel', role: 'Veterinary Consultant', quote: 'Their scientific approach and modern infrastructure set a benchmark for the poultry industry in central India.' },
];

const FAQS = [
  { q: 'What services does AKBS Poultry offer?', a: 'AKBS offers integrated poultry farming, feed manufacturing, farm development, contract farming, poultry & project consultancy, farm equipment supply, automation, technical guidance and after-sales support.' },
  { q: 'Where are your farms located?', a: 'Our operations are located in Silwani, District Raisen, Madhya Pradesh, India, with plans for expansion across central India.' },
  { q: 'Do you supply feed to external clients?', a: 'Yes, our premium poultry feed is available for broilers, growers and layer birds with laboratory-tested nutritional balance.' },
  { q: 'Do you offer contract farming opportunities?', a: 'Absolutely. We partner with farmers under structured contract farming arrangements including birds, feed, medication and technical support.' },
];

const PRODUCTS = [
  { icon: Egg, name: 'Broiler Pre-Starter', tag: 'Day 1 - 10', protein: '23%', energy: '3050 Kcal', desc: 'High-protein crumbles for optimal early growth and immune development.', color: 'from-akbs-gold/20 to-akbs-gold/5' },
  { icon: Utensils, name: 'Broiler Starter', tag: 'Day 11 - 21', protein: '21%', energy: '3100 Kcal', desc: 'Balanced pellets designed for accelerated weight gain and skeletal strength.', color: 'from-akbs-green/20 to-akbs-green/5' },
  { icon: Wheat, name: 'Broiler Finisher', tag: 'Day 22 - Market', protein: '19%', energy: '3200 Kcal', desc: 'High-energy formula to maximize FCR and market-ready body weight.', color: 'from-akbs-gold/20 to-akbs-gold/5' },
  { icon: Beaker, name: 'Layer Feed Premium', tag: 'Layer Birds', protein: '17%', energy: '2750 Kcal', desc: 'Calcium-fortified feed for sustained egg production and shell quality.', color: 'from-akbs-green/20 to-akbs-green/5' },
  { icon: ShoppingBag, name: 'Grower Special', tag: 'Growing Stage', protein: '20%', energy: '2900 Kcal', desc: 'Complete nutrition for uniform growth and healthy development.', color: 'from-akbs-gold/20 to-akbs-gold/5' },
  { icon: PackageOpen, name: 'Custom Blends', tag: 'On-Demand', protein: 'Custom', energy: 'Custom', desc: 'Tailored feed formulations built for specific farm goals and species.', color: 'from-akbs-green/20 to-akbs-green/5' },
];

const NEWS_ITEMS = [
  { date: 'May 28, 2026', category: 'Company News', image: 'https://images.unsplash.com/photo-1630090374791-c9eb7bab3935?auto=format&fit=crop&w=1200&q=80', title: 'AKBS Announces 100,000 Bird Capacity Expansion Roadmap', excerpt: 'Strategic five-year plan approved for major infrastructure scale-up across central India.' },
  { date: 'May 15, 2026', category: 'Industry', image: 'https://images.pexels.com/photos/17064389/pexels-photo-17064389.jpeg?auto=compress&cs=tinysrgb&w=1200', title: 'Environment Controlled Sheds: The New Poultry Standard', excerpt: 'How climate-controlled infrastructure is transforming broiler productivity metrics.' },
  { date: 'Apr 30, 2026', category: 'Feed Plant', image: 'https://images.unsplash.com/photo-1627920768537-8f71c0c8dc44?auto=format&fit=crop&w=1200&q=80', title: 'New Feed Plant Achieves Full Production Milestone', excerpt: 'Continuous production with laboratory-tested batches now serving regional partners.' },
];

const CAREERS = [
  { role: 'Poultry Farm Supervisor', dept: 'Farm Operations', type: 'Full-time', location: 'Silwani, MP', experience: '3-5 yrs' },
  { role: 'Feed Plant Operator', dept: 'Feed Manufacturing', type: 'Full-time', location: 'Silwani, MP', experience: '2-4 yrs' },
  { role: 'Poultry Veterinarian', dept: 'Bird Health', type: 'Full-time', location: 'Silwani, MP', experience: '2+ yrs' },
  { role: 'Quality Lab Technician', dept: 'Quality Assurance', type: 'Full-time', location: 'Silwani, MP', experience: '1-3 yrs' },
  { role: 'Business Development Manager', dept: 'Sales & Growth', type: 'Full-time', location: 'MP / Remote', experience: '5+ yrs' },
];

/* ============ COUNTER ============ */
function Counter({ value }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const [display, setDisplay] = useState('0');
  useEffect(() => {
    if (!inView) return;
    const match = value.match(/([\d,]+)/);
    if (!match) { setDisplay(value); return; }
    const target = parseInt(match[1].replace(/,/g, ''));
    const suffix = value.replace(match[1], '');
    let start = 0;
    const dur = 1600;
    const step = 20;
    const inc = target / (dur / step);
    const t = setInterval(() => {
      start += inc;
      if (start >= target) { setDisplay(target.toLocaleString() + suffix); clearInterval(t); }
      else setDisplay(Math.floor(start).toLocaleString() + suffix);
    }, step);
    return () => clearInterval(t);
  }, [inView, value]);
  return <span ref={ref}>{display}</span>;
}

/* ============ HEADER ============ */
function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-white/95 backdrop-blur-xl shadow-lg py-3' : 'bg-transparent py-5'}`}
    >
      <div className="container mx-auto flex items-center justify-between gap-4">
        <a href="#home" className="flex items-center gap-3 group shrink-0">
          <div className={`relative h-12 w-12 rounded-full flex items-center justify-center transition-all ${scrolled ? 'bg-akbs-green' : 'bg-white/95'}`}>
            <Leaf className={`h-6 w-6 ${scrolled ? 'text-akbs-gold' : 'text-akbs-green'}`} strokeWidth={2.5} />
            <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-akbs-gold flex items-center justify-center">
              <Bird className="h-2.5 w-2.5 text-akbs-dark" strokeWidth={3} />
            </div>
          </div>
          <div className="hidden sm:block leading-tight">
            <div className={`font-heading font-extrabold text-xl tracking-tight ${scrolled ? 'text-akbs-dark' : 'text-white'}`}>AKBS</div>
            <div className={`text-[9px] font-semibold tracking-[0.15em] ${scrolled ? 'text-akbs-green/80' : 'text-white/85'}`}>POULTRY FARMING<br/>PRIVATE LIMITED</div>
          </div>
        </a>
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((l) => (
            <a key={l.name} href={l.href}
              className={`relative px-3 py-2 text-sm font-semibold rounded-full transition-all group ${scrolled ? 'text-akbs-ink hover:text-akbs-green' : 'text-white/90 hover:text-white'}`}>
              {l.name}
              <span className="absolute left-1/2 -translate-x-1/2 bottom-0.5 h-0.5 w-0 bg-akbs-gold transition-all group-hover:w-6" />
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a href="tel:+919893345906" className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full btn-gradient-green text-white font-semibold text-sm shadow-luxury hover:scale-105 transition-transform">
            <Phone className="h-4 w-4" /> +91 9893345906
          </a>
          <button onClick={() => setMobileOpen(!mobileOpen)} className={`lg:hidden p-2 rounded-full ${scrolled ? 'bg-akbs-green text-white' : 'bg-white/20 text-white backdrop-blur'}`}>
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="lg:hidden bg-white/98 backdrop-blur-xl border-t border-black/5 overflow-hidden">
            <div className="container mx-auto py-4 flex flex-col gap-1">
              {NAV_LINKS.map((l) => (
                <a key={l.name} href={l.href} onClick={() => setMobileOpen(false)} className="px-4 py-3 rounded-xl text-akbs-ink font-semibold hover:bg-akbs-green/5 hover:text-akbs-green transition-all">{l.name}</a>
              ))}
              <a href="tel:+919893345906" className="mt-2 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full btn-gradient-green text-white font-semibold"><Phone className="h-4 w-4" /> +91 9893345906</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

/* ============ HERO ============ */
function Hero() {
  const [idx, setIdx] = useState(0);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  useEffect(() => {
    const t = setInterval(() => setIdx((p) => (p + 1) % HERO_SLIDES.length), 7000);
    return () => clearInterval(t);
  }, []);
  const slide = HERO_SLIDES[idx];
  const prev = () => setIdx((p) => (p - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  const next = () => setIdx((p) => (p + 1) % HERO_SLIDES.length);

  return (
    <section id="home" ref={ref} className="relative h-screen min-h-[780px] w-full overflow-hidden">
      <AnimatePresence mode="sync">
        <motion.div key={idx} initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.5, ease: 'easeOut' }} style={{ y }} className="absolute inset-0">
          <img src={slide.image} alt={slide.tag} className="w-full h-full object-cover" />
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-r from-akbs-dark/95 via-akbs-dark/70 to-akbs-dark/30" />
      <div className="absolute inset-0 bg-gradient-to-b from-akbs-dark/40 via-transparent to-akbs-dark/80" />
      <div className="absolute inset-0 noise-bg opacity-40" />

      <motion.div style={{ opacity }} className="relative z-10 container mx-auto h-full flex items-center pt-24 pb-40">
        <div className="max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div key={idx} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.7 }}>
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-dark mb-6">
                <Sparkles className="h-4 w-4 text-akbs-gold" />
                <span className="text-akbs-gold text-xs font-semibold tracking-[0.2em] uppercase">{slide.tag}</span>
              </motion.div>
              <h1 className="font-heading font-black text-white text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight mb-6">
                {slide.title.map((line, i) => (
                  <motion.span key={i} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }} className="block">{line}</motion.span>
                ))}
              </h1>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="text-gradient-gold text-lg md:text-xl font-semibold mb-4">{slide.subtitle}</motion.p>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="text-white/85 text-base md:text-lg max-w-xl mb-8 leading-relaxed">{slide.description}</motion.p>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="flex flex-wrap gap-3">
                <a href="#farm" className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full btn-gradient-green text-white font-semibold shadow-luxury hover:scale-[1.03] transition-transform">
                  <Leaf className="h-4 w-4" /> Explore Farm <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
                <a href="#contact" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full btn-gradient-gold text-akbs-dark font-semibold shadow-luxury hover:scale-[1.03] transition-transform">
                  <Phone className="h-4 w-4" /> Contact Us
                </a>
                <a href="https://wa.me/919893345906" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/30 text-white font-semibold hover:bg-white/20 transition-all">
                  <MessageCircle className="h-4 w-4" /> WhatsApp
                </a>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      <div className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20">
        <button onClick={prev} className="h-12 w-12 rounded-full glass-dark text-white flex items-center justify-center hover:scale-110 transition-all"><ChevronLeft className="h-5 w-5" /></button>
      </div>
      <div className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20">
        <button onClick={next} className="h-12 w-12 rounded-full glass-dark text-white flex items-center justify-center hover:scale-110 transition-all"><ChevronRight className="h-5 w-5" /></button>
      </div>

      <div className="absolute bottom-56 md:bottom-60 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {HERO_SLIDES.map((_, i) => (
          <button key={i} onClick={() => setIdx(i)} className={`h-1.5 rounded-full transition-all ${i === idx ? 'w-10 bg-akbs-gold' : 'w-2 bg-white/40'}`} />
        ))}
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20 pb-6 md:pb-10">
        <div className="container mx-auto">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.8 }} className="glass rounded-3xl shadow-luxury-lg p-4 md:p-6 grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
            {STATS.map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 + i * 0.1 }} whileHover={{ y: -6 }} className="flex items-center gap-3 md:gap-4 px-2 md:px-3 py-2 rounded-2xl hover:bg-white/60 transition-all cursor-default">
                <div className="h-12 w-12 md:h-14 md:w-14 rounded-2xl bg-gradient-to-br from-akbs-green/10 to-akbs-gold/10 flex items-center justify-center shrink-0">
                  <s.icon className="h-6 w-6 md:h-7 md:w-7 text-akbs-green" strokeWidth={2} />
                </div>
                <div>
                  <div className="font-heading font-extrabold text-lg md:text-xl text-akbs-dark leading-tight"><Counter value={s.value} /></div>
                  <div className="text-xs md:text-sm text-akbs-ink/60 font-medium">{s.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ============ COMMON ============ */
function SectionEyebrow({ children }) {
  return (
    <div className="inline-flex items-center gap-2 mb-3">
      <div className="h-[2px] w-8 bg-akbs-gold" />
      <span className="text-xs font-bold tracking-[0.25em] text-akbs-green uppercase">{children}</span>
    </div>
  );
}

/* ============ ABOUT ROW ============ */
function AboutRow() {
  return (
    <section id="about" className="py-20 md:py-28 bg-akbs-bg relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-akbs-green/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-akbs-gold/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      <div className="container mx-auto relative">
        <div className="grid lg:grid-cols-3 gap-6">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="bg-white rounded-3xl p-8 shadow-luxury border border-black/5">
            <SectionEyebrow>About Company</SectionEyebrow>
            <h2 className="font-heading font-extrabold text-3xl md:text-4xl text-akbs-dark leading-tight mb-4">Quality Poultry Farming<br/><span className="text-gradient-gold">Our Commitment</span></h2>
            <p className="text-akbs-ink/70 leading-relaxed mb-6">AKBS Poultry Farming Private Limited is an integrated poultry company engaged in broiler farming, feed manufacturing, poultry infrastructure development and poultry consultancy using modern scientific farming techniques. We follow strict biosecurity to deliver quality and profitable solutions.</p>
            <a href="/about" className="inline-flex items-center gap-2 px-5 py-3 rounded-full btn-gradient-green text-white font-semibold text-sm shadow-luxury hover:scale-105 transition-transform">Read More <ArrowRight className="h-4 w-4" /></a>
          </motion.div>

          <motion.div id="farm" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="bg-white rounded-3xl shadow-luxury border border-black/5 overflow-hidden group">
            <div className="relative h-52 overflow-hidden">
              <img src="https://images.pexels.com/photos/17064389/pexels-photo-17064389.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="Modern shed" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-akbs-dark/80 to-transparent" />
              <div className="absolute bottom-4 left-6 right-6">
                <SectionEyebrow>Our Farm</SectionEyebrow>
                <h3 className="font-heading font-extrabold text-white text-2xl leading-tight">Modern & Environment<br/>Controlled Farm</h3>
              </div>
            </div>
            <div className="p-6">
              <ul className="space-y-2.5 mb-5">
                {FARM_FEATURES.map((f) => (
                  <li key={f.text} className="flex items-center gap-3 text-sm text-akbs-ink/80"><CheckCircle2 className="h-4 w-4 text-akbs-green shrink-0" /><span className="font-medium">{f.text}</span></li>
                ))}
              </ul>
              <a href="#projects" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full btn-gradient-green text-white font-semibold text-sm shadow-md hover:scale-105 transition-transform">View Farm Details <ArrowRight className="h-4 w-4" /></a>
            </div>
          </motion.div>

          <motion.div id="feed" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="bg-white rounded-3xl shadow-luxury border border-black/5 overflow-hidden group">
            <div className="relative h-52 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1627920768537-8f71c0c8dc44?auto=format&fit=crop&w=1200&q=80" alt="Feed plant" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-akbs-dark/80 to-transparent" />
              <div className="absolute bottom-4 left-6 right-6">
                <SectionEyebrow>Feed Plant</SectionEyebrow>
                <h3 className="font-heading font-extrabold text-white text-2xl leading-tight">AKBS Feed<br/>Manufacturing Unit</h3>
              </div>
            </div>
            <div className="p-6">
              <ul className="space-y-2.5 mb-5">
                {FEED_FEATURES.map((f) => (
                  <li key={f.text} className="flex items-center gap-3 text-sm text-akbs-ink/80"><CheckCircle2 className="h-4 w-4 text-akbs-gold shrink-0" /><span className="font-medium">{f.text}</span></li>
                ))}
              </ul>
              <a href="#projects" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full btn-gradient-green text-white font-semibold text-sm shadow-md hover:scale-105 transition-transform">View Feed Plant <ArrowRight className="h-4 w-4" /></a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ============ PROJECTS + SERVICES ============ */
function ProjectsAndServices() {
  return (
    <section id="projects" className="py-20 md:py-24 bg-white relative">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <SectionEyebrow>Our Projects</SectionEyebrow>
              <h2 className="font-heading font-extrabold text-3xl md:text-4xl text-akbs-dark mb-8">Building the Future of <span className="text-gradient-gold">Poultry</span></h2>
            </motion.div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {PROJECTS.map((p, i) => (
                <motion.div key={p.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} whileHover={{ y: -8 }} className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-luxury group cursor-pointer">
                  <img src={p.image} alt={p.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-akbs-dark via-akbs-dark/60 to-transparent" />
                  <div className="absolute top-4 left-4 h-10 w-10 rounded-xl bg-akbs-gold flex items-center justify-center"><p.icon className="h-5 w-5 text-akbs-dark" strokeWidth={2.5} /></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="font-heading font-extrabold text-white text-base leading-tight mb-1">{p.title}</h3>
                    <p className="text-white/70 text-xs mb-2">{p.subtitle}</p>
                    <div className="inline-flex items-center gap-1 text-xs text-akbs-gold font-semibold">View Details <ArrowRight className="h-3 w-3" /></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div id="services" className="lg:col-span-5">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <SectionEyebrow>Our Services</SectionEyebrow>
              <h2 className="font-heading font-extrabold text-3xl md:text-4xl text-akbs-dark mb-8">Comprehensive <span className="text-gradient-gold">Poultry Solutions</span></h2>
            </motion.div>
            <div className="grid grid-cols-2 gap-3">
              {SERVICES.map((s, i) => (
                <motion.div key={s.title} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} whileHover={{ y: -4, scale: 1.02 }} className="bg-white border-2 border-akbs-bg rounded-2xl p-4 flex flex-col items-center text-center gap-2 hover:border-akbs-gold hover:shadow-luxury transition-all group cursor-pointer">
                  <div className="h-12 w-12 rounded-xl border-2 border-akbs-gold/40 flex items-center justify-center group-hover:bg-akbs-gold/10 group-hover:border-akbs-gold transition-all">
                    <s.icon className="h-6 w-6 text-akbs-gold" strokeWidth={1.8} />
                  </div>
                  <div className="text-xs md:text-sm font-semibold text-akbs-dark leading-tight">{s.title}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============ INFRASTRUCTURE ============ */
function Infrastructure() {
  const items = [
    { icon: Building2, title: 'Modern Sheds', desc: 'Environment-controlled poultry sheds with premium construction.' },
    { icon: Cog, title: 'Automation Systems', desc: 'Fully automatic feeding, watering and climate control.' },
    { icon: ShieldCheck, title: 'Bio-Security Gates', desc: 'Multi-layer sanitation protocols for disease prevention.' },
    { icon: Warehouse, title: 'Storage Silos', desc: 'Large capacity feed and grain storage with quality control.' },
    { icon: Zap, title: 'Power Backup', desc: '24/7 operations with dedicated generator redundancy.' },
    { icon: Factory, title: 'Feed Manufacturing', desc: 'Modern machinery producing consistent premium feed.' },
  ];
  return (
    <section id="infrastructure" className="py-20 md:py-24 bg-akbs-bg relative overflow-hidden">
      <div className="container mx-auto">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <SectionEyebrow>Infrastructure</SectionEyebrow>
          <h2 className="font-heading font-extrabold text-3xl md:text-5xl text-akbs-dark mb-4">World-Class <span className="text-gradient-gold">Poultry Infrastructure</span></h2>
          <p className="text-akbs-ink/60">Built with precision engineering and international standards to deliver optimal poultry operations.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((it, i) => (
            <motion.div key={it.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} whileHover={{ y: -6 }} className="bg-white rounded-3xl p-7 shadow-luxury border border-black/5 hover:border-akbs-gold/40 transition-all">
              <div className="h-14 w-14 rounded-2xl btn-gradient-green flex items-center justify-center mb-4 shadow-md"><it.icon className="h-7 w-7 text-akbs-gold" strokeWidth={2} /></div>
              <h3 className="font-heading font-extrabold text-xl text-akbs-dark mb-2">{it.title}</h3>
              <p className="text-sm text-akbs-ink/60 leading-relaxed">{it.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ GALLERY ============ */
function Gallery() {
  const imgs = [
    'https://images.unsplash.com/photo-1630090374791-c9eb7bab3935?auto=format&fit=crop&w=1000&q=80',
    'https://images.pexels.com/photos/17064389/pexels-photo-17064389.jpeg?auto=compress&cs=tinysrgb&w=1000',
    'https://images.pexels.com/photos/16667124/pexels-photo-16667124.jpeg?auto=compress&cs=tinysrgb&w=1000',
    'https://images.unsplash.com/photo-1627920768537-8f71c0c8dc44?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1582055871659-2fcf2e4d3bd3?auto=format&fit=crop&w=1000&q=80',
    'https://images.pexels.com/photos/33520448/pexels-photo-33520448.jpeg?auto=compress&cs=tinysrgb&w=1000',
    'https://images.unsplash.com/photo-1530496216518-a53d24e99c31?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1685119166946-d4050647b0e3?auto=format&fit=crop&w=1000&q=80',
  ];
  const [active, setActive] = useState(null);
  return (
    <section id="gallery" className="py-20 md:py-24 bg-white">
      <div className="container mx-auto">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <SectionEyebrow>Gallery</SectionEyebrow>
          <h2 className="font-heading font-extrabold text-3xl md:text-5xl text-akbs-dark mb-4">A Glimpse of <span className="text-gradient-gold">AKBS Operations</span></h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {imgs.map((src, i) => (
            <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} onClick={() => setActive(src)} className={`relative overflow-hidden rounded-2xl cursor-pointer group aspect-square ${i === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}>
              <img src={src} alt="" loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-akbs-dark/0 group-hover:bg-akbs-dark/40 transition-all flex items-center justify-center">
                <div className="h-12 w-12 rounded-full bg-akbs-gold flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Play className="h-5 w-5 text-akbs-dark ml-0.5" fill="currentColor" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {active && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActive(null)} className="fixed inset-0 z-[100] bg-akbs-dark/90 backdrop-blur-lg flex items-center justify-center p-4 cursor-zoom-out">
            <motion.img initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} src={active} alt="" className="max-w-6xl max-h-[85vh] rounded-3xl shadow-2xl" />
            <button className="absolute top-6 right-6 h-12 w-12 rounded-full glass-dark text-white flex items-center justify-center"><X className="h-5 w-5" /></button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ============ MANAGEMENT ============ */
function Management() {
  return (
    <section id="management" className="py-20 md:py-28 bg-akbs-bg relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-akbs-green/5 via-transparent to-akbs-gold/5" />
      <div className="container mx-auto relative">
        <div className="max-w-2xl mx-auto text-center mb-14">
          <SectionEyebrow>Leadership</SectionEyebrow>
          <h2 className="font-heading font-extrabold text-3xl md:text-5xl text-akbs-dark mb-4">Our <span className="text-gradient-gold">Management Team</span></h2>
          <p className="text-akbs-ink/60">Experienced leaders driving AKBS Poultry to new frontiers of scientific poultry farming.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {MANAGEMENT.map((m, i) => (
            <motion.div key={m.name} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} whileHover={{ y: -8 }} className="bg-white rounded-[24px] overflow-hidden shadow-luxury border border-black/5 group">
              <div className="relative h-96 overflow-hidden bg-gradient-to-b from-akbs-bg via-white to-akbs-bg flex items-center justify-center">
                <img src={m.image} alt={m.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-akbs-dark/60 via-transparent to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="font-heading font-extrabold text-2xl text-akbs-dark mb-1">{m.name}</h3>
                <div className="text-akbs-gold font-semibold text-sm mb-3">{m.role}</div>
                <p className="text-akbs-ink/60 text-sm leading-relaxed mb-4">{m.description}</p>
                <div className="flex gap-2">
                  <a href="#" className="h-8 w-8 rounded-full bg-akbs-bg flex items-center justify-center text-akbs-green hover:btn-gradient-green hover:text-white transition-all"><Linkedin className="h-4 w-4" /></a>
                  <a href="#" className="h-8 w-8 rounded-full bg-akbs-bg flex items-center justify-center text-akbs-green hover:btn-gradient-green hover:text-white transition-all"><Facebook className="h-4 w-4" /></a>
                  <a href="#" className="h-8 w-8 rounded-full bg-akbs-bg flex items-center justify-center text-akbs-green hover:btn-gradient-green hover:text-white transition-all"><Instagram className="h-4 w-4" /></a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ TESTIMONIALS ============ */
function Testimonials() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((p) => (p + 1) % TESTIMONIALS.length), 5500);
    return () => clearInterval(t);
  }, []);
  return (
    <section className="py-20 md:py-24 bg-akbs-dark relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <img src="https://images.unsplash.com/photo-1630090374791-c9eb7bab3935?auto=format&fit=crop&w=2000&q=80" className="w-full h-full object-cover" alt="" />
      </div>
      <div className="absolute top-0 left-1/2 w-96 h-96 bg-akbs-gold/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="container mx-auto relative">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="h-[2px] w-8 bg-akbs-gold" />
            <span className="text-xs font-bold tracking-[0.25em] text-akbs-gold uppercase">Testimonials</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl md:text-5xl text-white">Trusted by <span className="text-gradient-gold">Partners</span></h2>
        </div>
        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="glass-dark rounded-3xl p-8 md:p-12 text-center">
              <Quote className="h-10 w-10 text-akbs-gold mx-auto mb-4" />
              <p className="text-white/90 text-lg md:text-xl leading-relaxed italic mb-6">&ldquo;{TESTIMONIALS[idx].quote}&rdquo;</p>
              <div className="flex items-center justify-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 text-akbs-gold" fill="currentColor" />)}
              </div>
              <div className="font-heading font-bold text-white text-lg">{TESTIMONIALS[idx].name}</div>
              <div className="text-akbs-gold text-sm">{TESTIMONIALS[idx].role}</div>
            </motion.div>
          </AnimatePresence>
          <div className="flex justify-center gap-2 mt-6">
            {TESTIMONIALS.map((_, i) => (
              <button key={i} onClick={() => setIdx(i)} className={`h-1.5 rounded-full transition-all ${i === idx ? 'w-10 bg-akbs-gold' : 'w-2 bg-white/30'}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============ FAQ ============ */
function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section className="py-20 md:py-24 bg-white">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-10">
          <SectionEyebrow>FAQs</SectionEyebrow>
          <h2 className="font-heading font-extrabold text-3xl md:text-5xl text-akbs-dark">Frequently <span className="text-gradient-gold">Asked Questions</span></h2>
        </div>
        <div className="space-y-3">
          {FAQS.map((f, i) => (
            <div key={i} className="bg-akbs-bg rounded-2xl border border-black/5 overflow-hidden">
              <button onClick={() => setOpen(open === i ? -1 : i)} className="w-full flex items-center justify-between gap-4 p-5 text-left">
                <span className="font-heading font-bold text-akbs-dark">{f.q}</span>
                <ChevronDown className={`h-5 w-5 text-akbs-green shrink-0 transition-transform ${open === i ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                    <div className="px-5 pb-5 text-akbs-ink/70 leading-relaxed">{f.a}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ LIVE FARM COUNTER ============ */
function LiveCounter() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: '-100px' });
  const [live, setLive] = useState({ birds: 18742, feed: 4820, eggs: 12530, batches: 47 });

  useEffect(() => {
    if (!inView) return;
    const t = setInterval(() => {
      setLive((p) => ({
        birds: p.birds + Math.floor(Math.random() * 3),
        feed: +(p.feed + Math.random() * 0.4).toFixed(1),
        eggs: p.eggs + Math.floor(Math.random() * 5 + 1),
        batches: p.batches,
      }));
    }, 1800);
    return () => clearInterval(t);
  }, [inView]);

  const items = [
    { icon: Bird, label: 'Birds Housed Today', value: live.birds.toLocaleString(), suffix: '', accent: 'from-emerald-400/20' },
    { icon: Wheat, label: 'Feed Produced (Tons)', value: live.feed.toFixed(1), suffix: 'T', accent: 'from-amber-400/20' },
    { icon: Egg, label: 'Eggs Handled Today', value: live.eggs.toLocaleString(), suffix: '', accent: 'from-orange-400/20' },
    { icon: TrendingUp, label: 'Active Farm Batches', value: live.batches.toString(), suffix: '', accent: 'from-teal-400/20' },
  ];

  return (
    <section ref={ref} className="py-20 md:py-24 bg-akbs-dark relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.07]">
        <img src="https://images.pexels.com/photos/17064389/pexels-photo-17064389.jpeg?auto=compress&cs=tinysrgb&w=2000" alt="" className="w-full h-full object-cover" />
      </div>
      <div className="absolute top-0 left-1/2 w-[600px] h-[600px] bg-akbs-gold/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="container mx-auto relative">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
            </span>
            <span className="text-xs font-bold tracking-[0.25em] text-akbs-gold uppercase">Live Farm Dashboard</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl md:text-5xl text-white mb-3">Real-Time <span className="text-gradient-gold">Production Metrics</span></h2>
          <p className="text-white/60 max-w-2xl mx-auto">Watch our farms in action &mdash; live operational data updated in real time from AKBS integrated facilities.</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {items.map((it, i) => (
            <motion.div
              key={it.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative group"
            >
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${it.accent} to-transparent blur-xl opacity-60 group-hover:opacity-100 transition-opacity`} />
              <div className="relative glass-dark rounded-3xl p-6 md:p-7 border border-akbs-gold/20 hover:border-akbs-gold/50 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-12 w-12 rounded-xl bg-akbs-gold/20 flex items-center justify-center">
                    <it.icon className="h-6 w-6 text-akbs-gold" strokeWidth={2} />
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /> LIVE
                  </div>
                </div>
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={it.value}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    className="font-heading font-black text-3xl md:text-4xl text-white leading-tight tracking-tight"
                  >
                    {it.value}<span className="text-akbs-gold text-2xl ml-1">{it.suffix}</span>
                  </motion.div>
                </AnimatePresence>
                <div className="text-xs md:text-sm text-white/60 font-medium mt-2">{it.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ PRODUCTS ============ */
function Products() {
  return (
    <section id="products" className="py-20 md:py-24 bg-white">
      <div className="container mx-auto">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <SectionEyebrow>Product Catalogue</SectionEyebrow>
          <h2 className="font-heading font-extrabold text-3xl md:text-5xl text-akbs-dark mb-4">Premium <span className="text-gradient-gold">Feed Products</span></h2>
          <p className="text-akbs-ink/60">Scientifically formulated feed products for every stage of poultry growth, laboratory-tested for consistency.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {PRODUCTS.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -8 }}
              className="relative bg-white rounded-3xl overflow-hidden shadow-luxury border border-black/5 hover:border-akbs-gold/40 transition-all group"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${p.color} opacity-60 group-hover:opacity-100 transition-opacity`} />
              <div className="relative p-7">
                <div className="flex items-start justify-between mb-5">
                  <div className="h-14 w-14 rounded-2xl bg-white shadow-md flex items-center justify-center">
                    <p.icon className="h-7 w-7 text-akbs-green" strokeWidth={2} />
                  </div>
                  <div className="px-3 py-1 rounded-full bg-akbs-dark text-white text-[10px] font-bold tracking-widest uppercase">{p.tag}</div>
                </div>
                <h3 className="font-heading font-extrabold text-xl text-akbs-dark mb-2">{p.name}</h3>
                <p className="text-sm text-akbs-ink/60 leading-relaxed mb-5">{p.desc}</p>
                <div className="grid grid-cols-2 gap-3 mb-5">
                  <div className="bg-white/70 backdrop-blur rounded-xl p-3">
                    <div className="text-[10px] font-bold text-akbs-green/70 tracking-widest uppercase mb-0.5">Protein</div>
                    <div className="font-heading font-extrabold text-akbs-dark text-lg">{p.protein}</div>
                  </div>
                  <div className="bg-white/70 backdrop-blur rounded-xl p-3">
                    <div className="text-[10px] font-bold text-akbs-green/70 tracking-widest uppercase mb-0.5">Energy</div>
                    <div className="font-heading font-extrabold text-akbs-dark text-lg">{p.energy}</div>
                  </div>
                </div>
                <a href="#contact" className="inline-flex items-center gap-2 text-sm font-semibold text-akbs-green group-hover:text-akbs-dark transition-colors">
                  Request Sample <ArrowUpRight className="h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ NEWS ============ */
function News() {
  return (
    <section id="news" className="py-20 md:py-24 bg-akbs-bg">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <SectionEyebrow>News & Insights</SectionEyebrow>
            <h2 className="font-heading font-extrabold text-3xl md:text-5xl text-akbs-dark">Latest from <span className="text-gradient-gold">AKBS</span></h2>
          </div>
          <a href="#" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-akbs-green/20 text-akbs-green font-semibold text-sm hover:btn-gradient-green hover:text-white hover:border-transparent transition-all shrink-0">
            View All Articles <ArrowRight className="h-4 w-4" />
          </a>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {NEWS_ITEMS.map((n, i) => (
            <motion.article
              key={n.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              whileHover={{ y: -8 }}
              className="bg-white rounded-3xl overflow-hidden shadow-luxury border border-black/5 group cursor-pointer"
            >
              <div className="relative h-52 overflow-hidden">
                <img src={n.image} alt={n.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-akbs-gold text-akbs-dark text-[10px] font-bold tracking-widest uppercase">{n.category}</div>
                <div className="absolute inset-0 bg-gradient-to-t from-akbs-dark/40 to-transparent" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 text-xs text-akbs-ink/50 font-medium mb-3">
                  <span className="inline-flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {n.date}</span>
                  <span>&bull;</span>
                  <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> 4 min read</span>
                </div>
                <h3 className="font-heading font-extrabold text-lg text-akbs-dark leading-tight mb-2 group-hover:text-akbs-green transition-colors">{n.title}</h3>
                <p className="text-sm text-akbs-ink/60 leading-relaxed mb-4">{n.excerpt}</p>
                <div className="inline-flex items-center gap-1 text-sm font-semibold text-akbs-green">
                  Read Story <ChevronsRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ CAREERS ============ */
function Careers() {
  return (
    <section id="careers" className="py-20 md:py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-akbs-green/5 blur-3xl" />
      <div className="container mx-auto relative">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <SectionEyebrow>Careers</SectionEyebrow>
            <h2 className="font-heading font-extrabold text-3xl md:text-5xl text-akbs-dark leading-tight mb-4">
              Build the <span className="text-gradient-gold">Future of Poultry</span> with Us
            </h2>
            <p className="text-akbs-ink/60 mb-6 leading-relaxed">
              Join a passionate team building world-class poultry infrastructure across central India. We hire for skill, character and a hunger to innovate.
            </p>
            <div className="space-y-3 mb-8">
              {[
                { icon: Award, text: 'Merit-based growth culture' },
                { icon: HeartHandshake, text: 'Family-first work environment' },
                { icon: Sparkles, text: 'Learning & mentorship opportunities' },
              ].map((b) => (
                <div key={b.text} className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl bg-akbs-green/10 flex items-center justify-center shrink-0">
                    <b.icon className="h-4 w-4 text-akbs-green" />
                  </div>
                  <span className="text-sm font-semibold text-akbs-dark">{b.text}</span>
                </div>
              ))}
            </div>
            <a href="mailto:careers@akbspoultry.com" className="inline-flex items-center gap-2 px-6 py-3 rounded-full btn-gradient-green text-white font-semibold shadow-luxury hover:scale-105 transition-transform">
              <Send className="h-4 w-4" /> Send Your Resume
            </a>
          </div>
          <div className="lg:col-span-8">
            <div className="space-y-3">
              {CAREERS.map((c, i) => (
                <motion.div
                  key={c.role}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ scale: 1.01 }}
                  className="bg-akbs-bg rounded-2xl p-5 md:p-6 flex flex-col md:flex-row md:items-center gap-4 border border-transparent hover:border-akbs-gold/40 hover:shadow-luxury transition-all group cursor-pointer"
                >
                  <div className="h-12 w-12 rounded-xl bg-white shadow-md flex items-center justify-center shrink-0 group-hover:btn-gradient-gold transition-all">
                    <Briefcase className="h-5 w-5 text-akbs-green group-hover:text-akbs-dark transition-colors" strokeWidth={2} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading font-extrabold text-lg text-akbs-dark leading-tight mb-1">{c.role}</h3>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-akbs-ink/60 font-medium">
                      <span className="inline-flex items-center gap-1"><ScrollText className="h-3 w-3" /> {c.dept}</span>
                      <span>&bull;</span>
                      <span className="inline-flex items-center gap-1"><MapPinned className="h-3 w-3" /> {c.location}</span>
                      <span>&bull;</span>
                      <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {c.experience}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="px-3 py-1 rounded-full bg-white text-akbs-green text-[10px] font-bold tracking-widest uppercase border border-akbs-green/20">{c.type}</div>
                    <a href="mailto:careers@akbspoultry.com" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full btn-gradient-green text-white font-semibold text-xs shadow-md group-hover:scale-105 transition-transform">
                      Apply <ArrowRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============ CONTACT ============ */
function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState({ loading: false, msg: '' });
  const submit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, msg: '' });
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      const data = await res.json();
      setStatus({ loading: false, msg: data.message || data.error });
      if (res.ok) setForm({ name: '', email: '', phone: '', message: '' });
    } catch {
      setStatus({ loading: false, msg: 'Something went wrong. Please try again.' });
    }
  };
  return (
    <section id="contact" className="py-20 md:py-28 bg-akbs-bg">
      <div className="container mx-auto">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <SectionEyebrow>Get in Touch</SectionEyebrow>
          <h2 className="font-heading font-extrabold text-3xl md:text-5xl text-akbs-dark mb-4">Let&apos;s Build Together</h2>
          <p className="text-akbs-ink/60">Reach out for consultations, contract farming or feed inquiries.</p>
        </div>
        <div className="grid lg:grid-cols-5 gap-6">
          <div className="lg:col-span-2 bg-akbs-dark rounded-3xl p-8 text-white relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-akbs-gold/20 blur-3xl" />
            <div className="relative">
              <h3 className="font-heading font-extrabold text-2xl mb-6">Contact Information</h3>
              <div className="space-y-5 mb-8">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-xl bg-akbs-gold/20 flex items-center justify-center shrink-0"><Phone className="h-5 w-5 text-akbs-gold" /></div>
                  <div><div className="text-xs text-white/60">Phone</div><a href="tel:+919893345906" className="font-semibold hover:text-akbs-gold transition">+91 9893345906</a></div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-xl bg-akbs-gold/20 flex items-center justify-center shrink-0"><Mail className="h-5 w-5 text-akbs-gold" /></div>
                  <div><div className="text-xs text-white/60">Email</div><a href="mailto:info@akbspoultry.com" className="font-semibold hover:text-akbs-gold transition">info@akbspoultry.com</a></div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-xl bg-akbs-gold/20 flex items-center justify-center shrink-0"><MapPin className="h-5 w-5 text-akbs-gold" /></div>
                  <div><div className="text-xs text-white/60">Address</div><div className="font-semibold leading-relaxed">Silwani, District Raisen<br/>Madhya Pradesh, India</div></div>
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden border border-white/10">
                <iframe src="https://maps.google.com/maps?q=Silwani%20Raisen%20Madhya%20Pradesh&t=&z=11&ie=UTF8&iwloc=&output=embed" width="100%" height="180" style={{ border: 0 }} loading="lazy" title="Silwani Raisen MP" />
              </div>
            </div>
          </div>
          <form onSubmit={submit} className="lg:col-span-3 bg-white rounded-3xl p-8 shadow-luxury border border-black/5">
            <h3 className="font-heading font-extrabold text-2xl text-akbs-dark mb-6">Send us a Message</h3>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-semibold text-akbs-ink/70 mb-1.5">Full Name *</label>
                <input required value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-akbs-bg border border-transparent focus:border-akbs-green focus:bg-white outline-none transition-all" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-akbs-ink/70 mb-1.5">Phone Number</label>
                <input value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-akbs-bg border border-transparent focus:border-akbs-green focus:bg-white outline-none transition-all" />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-xs font-semibold text-akbs-ink/70 mb-1.5">Email</label>
              <input type="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-akbs-bg border border-transparent focus:border-akbs-green focus:bg-white outline-none transition-all" />
            </div>
            <div className="mb-5">
              <label className="block text-xs font-semibold text-akbs-ink/70 mb-1.5">Message *</label>
              <textarea required rows={4} value={form.message} onChange={(e) => setForm({...form, message: e.target.value})} className="w-full px-4 py-3 rounded-xl bg-akbs-bg border border-transparent focus:border-akbs-green focus:bg-white outline-none transition-all resize-none" />
            </div>
            <div className="flex items-center gap-4 flex-wrap">
              <button type="submit" disabled={status.loading} className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full btn-gradient-green text-white font-semibold shadow-luxury hover:scale-105 transition-transform disabled:opacity-60">
                <Send className="h-4 w-4" /> {status.loading ? 'Sending...' : 'Send Message'}
              </button>
              {status.msg && <div className="text-sm font-medium text-akbs-green">{status.msg}</div>}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

/* ============ FOOTER ============ */
function Footer() {
  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About Company', href: '/about' },
    { name: 'Our Farm', href: '#farm' },
    { name: 'Feed Plant', href: '#feed' },
    { name: 'Infrastructure', href: '#infrastructure' },
    { name: 'Gallery', href: '#gallery' },
  ];
  const services = ['Broiler Farming', 'Feed Manufacturing', 'Farm Development', 'Contract Farming', 'Poultry Consultancy'];
  return (
    <footer className="bg-akbs-dark text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-akbs-green/30 blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-akbs-gold/10 blur-3xl translate-y-1/2 -translate-x-1/2" />
      <div className="container mx-auto py-16 relative">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-14 w-14 rounded-full bg-white flex items-center justify-center relative">
                <Leaf className="h-7 w-7 text-akbs-green" strokeWidth={2.5} />
                <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-akbs-gold flex items-center justify-center"><Bird className="h-3 w-3 text-akbs-dark" strokeWidth={3} /></div>
              </div>
              <div>
                <div className="font-heading font-extrabold text-xl">AKBS</div>
                <div className="text-[9px] font-semibold tracking-[0.15em] text-white/70">POULTRY FARMING<br/>PRIVATE LIMITED</div>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-5">Building a sustainable and profitable poultry ecosystem with quality, integrity and innovation.</p>
            <div className="flex gap-2">
              {[Facebook, Instagram, Linkedin, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="h-9 w-9 rounded-full bg-white/10 flex items-center justify-center hover:btn-gradient-gold hover:text-akbs-dark transition-all"><Icon className="h-4 w-4" /></a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-heading font-extrabold text-lg mb-4 relative pb-2">Quick Links<span className="absolute bottom-0 left-0 w-10 h-0.5 bg-akbs-gold" /></h4>
            <ul className="space-y-2">
              {quickLinks.map((l) => (
                <li key={l.name}><a href={l.href} className="text-white/70 hover:text-akbs-gold text-sm font-medium inline-flex items-center gap-2 group">
                  <ArrowRight className="h-3 w-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />{l.name}
                </a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-heading font-extrabold text-lg mb-4 relative pb-2">Our Services<span className="absolute bottom-0 left-0 w-10 h-0.5 bg-akbs-gold" /></h4>
            <ul className="space-y-2">
              {services.map((s) => (
                <li key={s}><a href="#services" className="text-white/70 hover:text-akbs-gold text-sm font-medium inline-flex items-center gap-2 group">
                  <ArrowRight className="h-3 w-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />{s}
                </a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-heading font-extrabold text-lg mb-4 relative pb-2">Contact Info<span className="absolute bottom-0 left-0 w-10 h-0.5 bg-akbs-gold" /></h4>
            <ul className="space-y-3 mb-5 text-sm text-white/70">
              <li className="flex items-start gap-2"><Phone className="h-4 w-4 text-akbs-gold mt-0.5" /><span>+91 9893345906</span></li>
              <li className="flex items-start gap-2"><Mail className="h-4 w-4 text-akbs-gold mt-0.5" /><span>info@akbspoultry.com</span></li>
              <li className="flex items-start gap-2"><MapPin className="h-4 w-4 text-akbs-gold mt-0.5" /><span>Silwani, District Raisen,<br/>Madhya Pradesh, India</span></li>
            </ul>
            <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full btn-gradient-gold text-akbs-dark font-semibold text-sm shadow-md hover:scale-105 transition-transform"><Download className="h-4 w-4" /> Company Profile</button>
          </div>
        </div>
        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-white/60">
          <div>© 2026 AKBS Poultry Farming Private Limited. All Rights Reserved.</div>
          <div className="flex gap-5">
            <a href="#" className="hover:text-akbs-gold">Privacy Policy</a>
            <a href="#" className="hover:text-akbs-gold">Terms of Service</a>
            <a href="#" className="hover:text-akbs-gold">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ============ FLOATING BUTTONS ============ */
function FloatingButtons() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 400);
    window.addEventListener('scroll', on);
    return () => window.removeEventListener('scroll', on);
  }, []);
  return (
    <>
      <a href="https://wa.me/919893345906" target="_blank" rel="noreferrer" className="fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full bg-[#25D366] shadow-luxury-lg flex items-center justify-center hover:scale-110 transition-transform animate-float">
        <MessageCircle className="h-6 w-6 text-white" fill="currentColor" />
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
      </a>
      <AnimatePresence>
        {show && (
          <motion.button initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0 }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="fixed bottom-24 right-6 z-40 h-12 w-12 rounded-full btn-gradient-green text-white flex items-center justify-center shadow-luxury hover:scale-110 transition-transform">
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}

/* ============ APP ============ */
function App() {
  return (
    <main className="bg-akbs-bg">
      <Header />
      <Hero />
      <AboutRow />
      <ProjectsAndServices />
      <LiveCounter />
      <Products />
      <Infrastructure />
      <Gallery />
      <Management />
      <Testimonials />
      <News />
      <Careers />
      <FAQ />
      <Contact />
      <Footer />
      <FloatingButtons />
    </main>
  );
}

export default App;
