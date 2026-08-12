'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Leaf, Bird, Phone, ArrowLeft, ArrowRight, MessageCircle, Menu, X,
  CheckCircle2, ShieldCheck, TrendingUp, Award, Sparkles, Factory, Building2,
  Cog, ThermometerSun, Wind, Droplets, Zap, Ruler, Wrench, HardHat, MapPin,
  Activity, Lightbulb, Fan, Cpu, LineChart, DollarSign, Layers,
  ClipboardCheck, Home, Timer, Beaker, Maximize2
} from 'lucide-react';

const PHONE = '+91 9893345906';
const WA = '919893345906';

const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Our Farm', href: '/farm' },
  { name: 'Products', href: '/products' },
  { name: 'Projects', href: '/#projects' },
  { name: 'Management', href: '/#management' },
  { name: 'Contact', href: '/#contact' },
];

const INFOGRAPHIC = 'https://customer-assets-0z36b82j.emergentagent.net/job_akbs-corporate-site/artifacts/5sabwupq_20%2C000%20BIRDS%20EC%20BROILER%20POULTRY%20SHED.png';

const REAL_PHOTOS = [
  { src: 'https://customer-assets-0z36b82j.emergentagent.net/job_akbs-corporate-site/artifacts/jwbc8w8y_Pasted%20Graphic%2014.jpg', caption: 'Interior — Feed Line Installation', tag: 'Feeding System' },
  { src: 'https://customer-assets-0z36b82j.emergentagent.net/job_akbs-corporate-site/artifacts/kwz2nxcs_Pasted%20Graphic%2020.jpg', caption: 'Auto Feeders & Drinker Lines', tag: 'Automation' },
  { src: 'https://customer-assets-0z36b82j.emergentagent.net/job_akbs-corporate-site/artifacts/0qm6y83j_Pasted%20Graphic%2022.jpg', caption: 'Tunnel Ventilation View', tag: 'Ventilation' },
  { src: 'https://customer-assets-0z36b82j.emergentagent.net/job_akbs-corporate-site/artifacts/hwogetq4_Pasted%20Graphic%2019.jpg', caption: 'Climate Control Panel', tag: 'Control System' },
];

const PROJECT_SUMMARY = [
  { icon: Bird, label: 'Capacity', value: '20,000 Birds' },
  { icon: Ruler, label: 'Shed Size', value: '300 ft (L) × 40 ft (W)' },
  { icon: Maximize2, label: 'Covered Area', value: '12,000 Sq.ft.' },
  { icon: Layers, label: 'Side Wall Height', value: '8 ft' },
  { icon: Building2, label: 'Ridge Height', value: '14′-6″ ft' },
  { icon: Building2, label: 'Total Height (Approx.)', value: '14′-6″ ft' },
  { icon: Wind, label: 'Ventilation', value: 'Tunnel Ventilation (EC)' },
  { icon: ThermometerSun, label: 'Cooling System', value: 'C – Type Cooling Pad' },
  { icon: Fan, label: 'Exhaust Fans', value: '6 Nos. (50″)' },
  { icon: Cog, label: 'Feed Lines', value: '4 Automatic' },
  { icon: Droplets, label: 'Nipple Lines', value: '4 Automatic' },
  { icon: HardHat, label: 'Floor', value: 'PCC / RCC' },
  { icon: Cpu, label: 'Technology', value: 'Fully Automatic' },
];

const STRUCTURE_SPECS = [
  { item: 'Main Column', spec: 'ISMC 150' },
  { item: 'Column Spacing', spec: '20 ft C/C' },
  { item: 'Truss (Kaichi)', spec: '16 Nos.' },
  { item: 'Bottom Chord', spec: '2L 65 × 65 × 6 mm' },
  { item: 'Top Chord', spec: '2L 65 × 65 × 6 mm' },
  { item: 'Web Members', spec: 'L 50 × 50 × 5 mm' },
  { item: 'Purlin', spec: 'Z Purlin (1.6 mm / 2 mm)' },
  { item: 'Roof Sheet', spec: '0.50 mm TCT Colour Coated GI Sheet' },
  { item: 'Bracing', spec: 'L 50 × 50 × 5 mm' },
  { item: 'Sag Rod', spec: '16 mm Dia (Round Bar)' },
];

const COST_ESTIMATE = [
  { no: 1, particular: 'Civil Work', amount: 1700000 },
  { no: 2, particular: 'Structural Work', amount: 2700000 },
  { no: 3, particular: 'Roofing', amount: 800000 },
  { no: 4, particular: 'EC Equipment', amount: 2000000 },
  { no: 5, particular: 'Utilities & Infrastructure', amount: 2800000 },
  { no: 6, particular: 'Contingency & Pre-operative Exp.', amount: 2000000 },
];
const TOTAL_COST = COST_ESTIMATE.reduce((s, c) => s + c.amount, 0);
const SUB_TOTAL = COST_ESTIMATE.slice(0, 5).reduce((s, c) => s + c.amount, 0);

const KEY_HIGHLIGHTS = [
  { icon: Cpu, text: 'Fully Automatic EC Broiler Shed' },
  { icon: Wind, text: 'Tunnel Ventilation with C-Type Pad' },
  { icon: TrendingUp, text: 'High Performance & Uniform Growth' },
  { icon: LineChart, text: 'Low FCR & Better Profitability' },
  { icon: ShieldCheck, text: 'Lower Mortality & Better Bio-security' },
  { icon: ThermometerSun, text: 'Suitable for All Seasons' },
  { icon: Timer, text: 'Long Life, Low Maintenance' },
  { icon: Award, text: 'Best for Commercial Broiler Farming' },
];

const FEATURES = [
  { icon: Fan, title: 'Exhaust Fan Wall', desc: '6 heavy-duty 50″ exhaust fans creating powerful tunnel airflow across the length of the shed.' },
  { icon: Droplets, title: 'C-Type Cooling Pad', desc: 'Evaporative cooling pad wall maintains ideal temperature even in peak summer.' },
  { icon: Cog, title: 'Automatic Feeding', desc: '4 automatic feed lines deliver measured feed volume without labour, ensuring uniform bird growth.' },
  { icon: Beaker, title: 'Nipple Drinking Lines', desc: '4 automatic nipple lines provide continuous clean water access at every stage.' },
  { icon: Lightbulb, title: 'LED Lighting', desc: 'Energy-efficient LED lighting engineered for optimal bird activity, feeding and rest cycles.' },
  { icon: Cpu, title: 'Climate Control Panel', desc: 'Digital control system automates fans, cooling, feed, water, temperature and humidity — 24/7.' },
];

function FarmHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-white/95 backdrop-blur-xl shadow-lg py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto flex items-center justify-between gap-4">
        <a href="/" className="flex items-center gap-3 shrink-0">
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
            <a key={l.name} href={l.href} className={`px-3 py-2 text-sm font-semibold rounded-full transition ${l.name === 'Our Farm' ? (scrolled ? 'text-akbs-green' : 'text-akbs-gold') : (scrolled ? 'text-akbs-ink hover:text-akbs-green' : 'text-white/90 hover:text-white')}`}>
              {l.name}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a href={`tel:${PHONE.replace(/\s/g, '')}`} className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full btn-gradient-green text-white font-semibold text-sm shadow-luxury hover:scale-105 transition-transform">
            <Phone className="h-4 w-4" /> {PHONE}
          </a>
          <button onClick={() => setMobileOpen(!mobileOpen)} className={`lg:hidden p-2 rounded-full ${scrolled ? 'bg-akbs-green text-white' : 'bg-white/20 text-white backdrop-blur'}`}>
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {mobileOpen && (
        <div className="lg:hidden bg-white/98 backdrop-blur-xl border-t border-black/5">
          <div className="container mx-auto py-4 flex flex-col gap-1">
            {NAV_LINKS.map((l) => (
              <a key={l.name} href={l.href} onClick={() => setMobileOpen(false)} className="px-4 py-3 rounded-xl text-akbs-ink font-semibold hover:bg-akbs-green/5">{l.name}</a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

function FarmPage() {
  const [lightbox, setLightbox] = useState(null);
  return (
    <main className="bg-akbs-bg">
      <FarmHeader />

      {/* Hero */}
      <section className="relative pt-32 pb-14 md:pb-20 overflow-hidden bg-gradient-to-br from-akbs-dark via-akbs-green to-akbs-dark">
        <div className="absolute inset-0 opacity-15">
          <img src={REAL_PHOTOS[1].src} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-akbs-gold/20 blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-akbs-green/40 blur-3xl" />
        <div className="relative container mx-auto z-10">
          <a href="/" className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-dark text-white text-xs font-semibold mb-6 hover:scale-105 transition-transform">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Home
          </a>
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-dark mb-5">
                <Sparkles className="h-4 w-4 text-akbs-gold" />
                <span className="text-akbs-gold text-xs font-semibold tracking-[0.2em] uppercase">Environment Controlled Broiler Farm</span>
              </div>
              <h1 className="font-heading font-black text-white text-4xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight mb-4">
                20,000 Birds <span className="text-gradient-gold">EC Broiler</span> Poultry Shed
              </h1>
              <div className="text-akbs-gold text-lg md:text-xl font-semibold mb-4">SHED SIZE: 300′ × 40′  •  Fully Automatic  •  Tunnel Ventilated</div>
              <p className="text-white/85 text-base md:text-lg max-w-2xl leading-relaxed mb-6">
                Our flagship environment-controlled broiler shed is engineered for maximum bird performance — combining precision structural design, complete automation and world-class biosecurity across 12,000 sq.ft. of operational area.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="#specs" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full btn-gradient-gold text-akbs-dark font-semibold shadow-luxury hover:scale-105 transition-transform">
                  <ClipboardCheck className="h-4 w-4" /> View Project Details
                </a>
                <a href={`https://wa.me/${WA}?text=Hello%20AKBS%2C%20I%20want%20to%20know%20more%20about%20your%20EC%20Broiler%20Farm.`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#25D366] text-white font-semibold shadow-luxury hover:scale-105 transition-transform">
                  <MessageCircle className="h-4 w-4" /> Farm Consultation
                </a>
              </div>
            </div>
            <div className="lg:col-span-5">
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}
                className="grid grid-cols-2 gap-3">
                {[
                  { icon: Bird, top: '20K', label: 'Birds Capacity' },
                  { icon: Maximize2, top: '12K', label: 'Sq.ft. Covered' },
                  { icon: Fan, top: '6', label: 'Exhaust Fans (50″)' },
                  { icon: Cog, top: '100%', label: 'Automation' },
                ].map((s, i) => (
                  <div key={i} className="glass-dark rounded-2xl p-5 border border-akbs-gold/20">
                    <s.icon className="h-6 w-6 text-akbs-gold mb-3" />
                    <div className="font-heading font-black text-white text-3xl leading-none">{s.top}</div>
                    <div className="text-white/70 text-xs font-semibold mt-1">{s.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Real Photo Gallery */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto">
          <div className="max-w-2xl mx-auto text-center mb-10">
            <div className="inline-flex items-center gap-2 mb-3">
              <div className="h-[2px] w-8 bg-akbs-gold" />
              <span className="text-xs font-bold tracking-[0.25em] text-akbs-green uppercase">Real Farm Photos</span>
            </div>
            <h2 className="font-heading font-extrabold text-3xl md:text-5xl text-akbs-dark mb-4">Inside <span className="text-gradient-gold">AKBS Poultry Farm</span></h2>
            <p className="text-akbs-ink/60">Actual on-ground photographs from our operational EC broiler shed at Kundali, Bamhori, Silwani.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {REAL_PHOTOS.map((p, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                onClick={() => setLightbox(p.src)}
                className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-luxury cursor-pointer group border border-black/5">
                <img src={p.src} alt={p.caption} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-akbs-dark via-akbs-dark/40 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full btn-gradient-gold text-akbs-dark text-[10px] font-bold uppercase tracking-widest shadow-md">
                    <Sparkles className="h-3 w-3" /> {p.tag}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="font-heading font-extrabold text-white text-lg leading-tight">{p.caption}</div>
                  <div className="inline-flex items-center gap-1 mt-2 text-akbs-gold text-xs font-bold opacity-0 group-hover:opacity-100 transition">
                    Click to enlarge <ArrowRight className="h-3 w-3" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Summary */}
      <section id="specs" className="py-16 md:py-24 bg-akbs-bg">
        <div className="container mx-auto">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-3">
              <div className="h-[2px] w-8 bg-akbs-gold" />
              <span className="text-xs font-bold tracking-[0.25em] text-akbs-green uppercase">Project Summary</span>
            </div>
            <h2 className="font-heading font-extrabold text-3xl md:text-5xl text-akbs-dark mb-4">Complete <span className="text-gradient-gold">Farm Specifications</span></h2>
            <p className="text-akbs-ink/60">Every parameter engineered to deliver the best broiler farming performance.</p>
          </div>

          <div className="max-w-6xl mx-auto bg-white rounded-[32px] shadow-luxury-lg border border-black/5 overflow-hidden">
            <div className="btn-gradient-green px-8 py-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-xl bg-white/15 flex items-center justify-center border border-akbs-gold/40">
                  <ClipboardCheck className="h-5 w-5 text-akbs-gold" />
                </div>
                <div>
                  <div className="text-akbs-gold text-[10px] font-bold tracking-widest uppercase">Project Summary</div>
                  <div className="font-heading font-extrabold text-white text-lg">20,000 Birds EC Broiler Shed</div>
                </div>
              </div>
              <div className="hidden md:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-akbs-gold/20 border border-akbs-gold/40 text-akbs-gold text-[10px] font-bold">
                <ShieldCheck className="h-3 w-3" /> Fully Automated
              </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-akbs-bg">
              {PROJECT_SUMMARY.map((row, i) => (
                <div key={row.label} className={`flex items-center gap-4 px-6 py-4 hover:bg-akbs-bg/40 transition ${i > 2 ? 'md:border-t md:border-akbs-bg' : ''}`}>
                  <div className="h-10 w-10 rounded-xl bg-akbs-green/10 flex items-center justify-center shrink-0">
                    <row.icon className="h-5 w-5 text-akbs-green" strokeWidth={2} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] font-bold tracking-widest text-akbs-green uppercase mb-0.5">{row.label}</div>
                    <div className="font-heading font-bold text-akbs-dark text-sm">{row.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-3">
              <div className="h-[2px] w-8 bg-akbs-gold" />
              <span className="text-xs font-bold tracking-[0.25em] text-akbs-green uppercase">Farm Features</span>
            </div>
            <h2 className="font-heading font-extrabold text-3xl md:text-5xl text-akbs-dark mb-4">Advanced <span className="text-gradient-gold">EC Technology</span></h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} whileHover={{ y: -6 }}
                className="bg-akbs-bg rounded-3xl p-7 border border-black/5 hover:border-akbs-gold/40 hover:shadow-luxury transition-all">
                <div className="h-14 w-14 rounded-2xl btn-gradient-green flex items-center justify-center mb-5 shadow-md">
                  <f.icon className="h-7 w-7 text-akbs-gold" strokeWidth={2} />
                </div>
                <h3 className="font-heading font-extrabold text-lg text-akbs-dark mb-2">{f.title}</h3>
                <p className="text-sm text-akbs-ink/70 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Structure + Cost */}
      <section className="py-16 md:py-24 bg-akbs-bg">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Structure Specifications */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="bg-white rounded-[28px] shadow-luxury border border-black/5 overflow-hidden">
              <div className="btn-gradient-green px-6 py-4 flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-white/15 flex items-center justify-center border border-akbs-gold/40">
                  <HardHat className="h-5 w-5 text-akbs-gold" />
                </div>
                <div>
                  <div className="text-akbs-gold text-[10px] font-bold tracking-widest uppercase">Structural Design</div>
                  <div className="font-heading font-extrabold text-white text-lg">Shed Structure Specification</div>
                </div>
              </div>
              <div className="p-2">
                <table className="w-full">
                  <thead>
                    <tr className="text-left">
                      <th className="px-5 py-3 text-[10px] font-bold tracking-widest text-akbs-green uppercase">Item</th>
                      <th className="px-5 py-3 text-[10px] font-bold tracking-widest text-akbs-green uppercase">Specification</th>
                    </tr>
                  </thead>
                  <tbody>
                    {STRUCTURE_SPECS.map((row, i) => (
                      <tr key={row.item} className={`${i % 2 === 0 ? 'bg-akbs-bg/40' : 'bg-white'} hover:bg-akbs-green/5 transition`}>
                        <td className="px-5 py-3 font-semibold text-sm text-akbs-dark">{row.item}</td>
                        <td className="px-5 py-3 text-sm text-akbs-ink/80 font-medium">{row.spec}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* Cost Estimate */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="bg-white rounded-[28px] shadow-luxury border border-black/5 overflow-hidden">
              <div className="btn-gradient-green px-6 py-4 flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-white/15 flex items-center justify-center border border-akbs-gold/40">
                  <DollarSign className="h-5 w-5 text-akbs-gold" />
                </div>
                <div>
                  <div className="text-akbs-gold text-[10px] font-bold tracking-widest uppercase">Investment Breakdown</div>
                  <div className="font-heading font-extrabold text-white text-lg">Cost Estimate (Fixed Asset)</div>
                </div>
              </div>
              <div className="p-2">
                <table className="w-full">
                  <thead>
                    <tr className="text-left">
                      <th className="px-4 py-3 text-[10px] font-bold tracking-widest text-akbs-green uppercase w-10">#</th>
                      <th className="px-4 py-3 text-[10px] font-bold tracking-widest text-akbs-green uppercase">Particulars</th>
                      <th className="px-4 py-3 text-[10px] font-bold tracking-widest text-akbs-green uppercase text-right">Amount (₹)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {COST_ESTIMATE.slice(0, 5).map((row, i) => (
                      <tr key={row.no} className={`${i % 2 === 0 ? 'bg-akbs-bg/40' : 'bg-white'} hover:bg-akbs-green/5 transition`}>
                        <td className="px-4 py-3 text-akbs-ink/60 font-bold">{row.no}</td>
                        <td className="px-4 py-3 font-semibold text-sm text-akbs-dark">{row.particular}</td>
                        <td className="px-4 py-3 font-heading font-extrabold text-akbs-dark text-right">₹{row.amount.toLocaleString('en-IN')}</td>
                      </tr>
                    ))}
                    <tr className="bg-akbs-green/10 border-t-2 border-akbs-green/20">
                      <td></td>
                      <td className="px-4 py-3 font-heading font-extrabold text-akbs-green">SUB TOTAL</td>
                      <td className="px-4 py-3 font-heading font-extrabold text-akbs-green text-right">₹{SUB_TOTAL.toLocaleString('en-IN')}</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="px-4 py-3 text-akbs-ink/60 font-bold">6</td>
                      <td className="px-4 py-3 font-semibold text-sm text-akbs-dark">{COST_ESTIMATE[5].particular}</td>
                      <td className="px-4 py-3 font-heading font-extrabold text-akbs-dark text-right">₹{COST_ESTIMATE[5].amount.toLocaleString('en-IN')}</td>
                    </tr>
                    <tr className="btn-gradient-green">
                      <td></td>
                      <td className="px-4 py-4 font-heading font-black text-akbs-gold text-lg uppercase tracking-wide">Total Project Cost</td>
                      <td className="px-4 py-4 font-heading font-black text-akbs-gold text-2xl text-right">₹{TOTAL_COST.toLocaleString('en-IN')}</td>
                    </tr>
                  </tbody>
                </table>
                <div className="px-4 py-3 text-[10px] text-akbs-ink/50 italic">*Indicative fixed-asset estimate. Actual cost may vary based on site, material rates and finishings.</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Highlights */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-3">
              <div className="h-[2px] w-8 bg-akbs-gold" />
              <span className="text-xs font-bold tracking-[0.25em] text-akbs-green uppercase">Key Highlights</span>
            </div>
            <h2 className="font-heading font-extrabold text-3xl md:text-5xl text-akbs-dark mb-4">Why Our <span className="text-gradient-gold">EC Broiler Farm</span> Wins</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {KEY_HIGHLIGHTS.map((k, i) => (
              <motion.div key={k.text} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} whileHover={{ y: -4 }}
                className="bg-akbs-bg rounded-2xl p-5 border border-black/5 hover:border-akbs-gold/40 transition-all">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-xl btn-gradient-green flex items-center justify-center shrink-0 shadow-md">
                    <k.icon className="h-5 w-5 text-akbs-gold" strokeWidth={2} />
                  </div>
                  <div className="font-heading font-extrabold text-akbs-dark text-sm leading-snug pt-1">{k.text}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Full Blueprint Showcase */}
      <section className="py-16 md:py-20 bg-akbs-bg">
        <div className="container mx-auto">
          <div className="max-w-2xl mx-auto text-center mb-10">
            <div className="inline-flex items-center gap-2 mb-3">
              <div className="h-[2px] w-8 bg-akbs-gold" />
              <span className="text-xs font-bold tracking-[0.25em] text-akbs-green uppercase">Complete Project Blueprint</span>
            </div>
            <h2 className="font-heading font-extrabold text-3xl md:text-5xl text-akbs-dark mb-4">Engineering <span className="text-gradient-gold">at a Glance</span></h2>
            <p className="text-akbs-ink/60">Full technical infographic showing shed views, structure, foundation, cost estimate and key highlights.</p>
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="max-w-6xl mx-auto bg-white rounded-[32px] p-4 md:p-6 shadow-luxury-lg border border-black/5 cursor-zoom-in" onClick={() => setLightbox(INFOGRAPHIC)}>
            <img src={INFOGRAPHIC} alt="20,000 Birds EC Broiler Poultry Shed Complete Blueprint" className="w-full h-auto rounded-2xl" />
            <div className="mt-4 flex items-center justify-between px-2">
              <div className="text-xs font-semibold text-akbs-ink/60">Full Project Blueprint — 20,000 Birds EC Broiler Poultry Shed</div>
              <div className="inline-flex items-center gap-1 text-xs font-bold text-akbs-green">
                <Maximize2 className="h-3.5 w-3.5" /> Click to enlarge
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Manufacturing / Location */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto max-w-5xl">
          <div className="bg-akbs-dark rounded-[32px] p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-akbs-gold/20 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-akbs-green/40 blur-3xl" />
            <div className="relative grid md:grid-cols-3 gap-8 items-center">
              <div className="md:col-span-2">
                <div className="inline-flex items-center gap-2 mb-3">
                  <MapPin className="h-4 w-4 text-akbs-gold" />
                  <span className="text-akbs-gold text-xs font-bold tracking-[0.25em] uppercase">Farm Location</span>
                </div>
                <h3 className="font-heading font-extrabold text-white text-2xl md:text-4xl leading-tight mb-3">
                  AKBS Poultry Farm
                </h3>
                <p className="text-white/80 text-lg mb-2">Kundali, Bamhori, Tehsil Silwani</p>
                <p className="text-white/60 text-base">District Raisen, Madhya Pradesh (M.P.) — 464226</p>
              </div>
              <div className="flex flex-wrap gap-3 md:justify-end">
                <a href={`tel:${PHONE.replace(/\s/g, '')}`} className="inline-flex items-center gap-2 px-5 py-3 rounded-full btn-gradient-gold text-akbs-dark font-semibold shadow-luxury hover:scale-105 transition-transform">
                  <Phone className="h-4 w-4" /> Visit Farm
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-20 bg-akbs-bg">
        <div className="container mx-auto">
          <div className="bg-gradient-to-r from-akbs-dark via-akbs-green to-akbs-dark rounded-[32px] p-8 md:p-14 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-akbs-gold/20 blur-3xl" />
            <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <div className="text-akbs-gold text-[10px] font-bold tracking-[0.25em] uppercase mb-2">Want This Farm Built for You?</div>
                <h3 className="font-heading font-extrabold text-white text-2xl md:text-4xl leading-tight max-w-xl">
                  Turnkey EC Broiler Sheds • <span className="text-gradient-gold">Built by Experts</span>
                </h3>
                <p className="text-white/70 mt-2 max-w-xl">AKBS delivers complete farm design, construction, automation and commissioning — anywhere in India.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a href={`https://wa.me/${WA}?text=Hello%20AKBS%2C%20I%20want%20to%20build%20a%2020%2C000%20birds%20EC%20broiler%20shed.`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#25D366] text-white font-semibold shadow-luxury hover:scale-105 transition-transform">
                  <MessageCircle className="h-4 w-4" /> Chat with Us
                </a>
                <a href={`tel:${PHONE.replace(/\s/g, '')}`} className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full btn-gradient-gold text-akbs-dark font-semibold shadow-luxury hover:scale-105 transition-transform">
                  <Phone className="h-4 w-4" /> {PHONE}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-akbs-dark text-white py-10 relative">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center relative">
              <Leaf className="h-6 w-6 text-akbs-green" strokeWidth={2.5} />
              <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-akbs-gold flex items-center justify-center">
                <Bird className="h-2.5 w-2.5 text-akbs-dark" strokeWidth={3} />
              </div>
            </div>
            <div className="text-left leading-tight">
              <div className="font-heading font-extrabold">AKBS POULTRY FARMING</div>
              <div className="text-[9px] font-semibold tracking-[0.15em] text-white/70">PRIVATE LIMITED</div>
            </div>
          </div>
          <div className="text-xs text-white/50">© 2026 AKBS Poultry Farming Private Limited. All Rights Reserved.</div>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <a href={`https://wa.me/${WA}?text=Hello%20AKBS%2C%20I%20want%20to%20know%20more%20about%20your%20farm.`} target="_blank" rel="noreferrer"
        className="group fixed bottom-6 right-6 z-40 flex items-center gap-3">
        <span className="hidden md:inline-block bg-white text-akbs-dark text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all">Chat on WhatsApp</span>
        <span className="relative h-14 w-14 rounded-full bg-[#25D366] shadow-luxury-lg flex items-center justify-center hover:scale-110 transition-transform animate-float">
          <MessageCircle className="h-6 w-6 text-white" fill="currentColor" />
          <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
          <span className="absolute -top-1 -right-1 bg-akbs-gold text-akbs-dark text-[8px] font-black px-1.5 py-0.5 rounded-full shadow-md">BIZ</span>
        </span>
      </a>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="fixed inset-0 z-[100] bg-akbs-dark/95 backdrop-blur-lg flex items-center justify-center p-4 cursor-zoom-out overflow-auto">
            <motion.img initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} src={lightbox} alt="" className="max-w-full max-h-[95vh] w-auto h-auto rounded-2xl shadow-2xl" />
            <button className="absolute top-6 right-6 h-12 w-12 rounded-full glass-dark text-white flex items-center justify-center">
              <X className="h-5 w-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

export default FarmPage;
