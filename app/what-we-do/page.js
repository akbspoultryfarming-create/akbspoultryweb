'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Leaf, Bird, Phone, ArrowLeft, ArrowRight, MessageCircle, Menu, X,
  CheckCircle2, ShieldCheck, TrendingUp, Award, Sparkles, Factory, Building2,
  Cog, ThermometerSun, Wind, Droplets, Zap, Ruler, Wrench, HardHat,
  Users, Handshake, Lightbulb, ClipboardCheck, MapPin, Truck, LineChart,
  HeartHandshake, Beaker, PackageOpen, Landmark, FileCheck, Target,
  Compass, Layers, ArrowUpRight, Star, Rocket, Search, Home
} from 'lucide-react';

const PHONE = '+91 9893345906';
const WA = '919893345906';

const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'What We Do', href: '/what-we-do' },
  { name: 'Our Farm', href: '/farm' },
  { name: 'Products', href: '/products' },
  { name: 'Projects', href: '/#projects' },
  { name: 'Contact', href: '/#contact' },
];

const CORE_SERVICES = [
  { icon: Compass, title: 'Farm Consultancy', points: ['Site Survey & Feasibility', 'Farm Planning & Design', 'Layout Design & 3D Views', 'DPR Preparation'] },
  { icon: Landmark, title: 'Loan Assistance', points: ['Bank Loan Assistance', 'NABARD / AHIDF Guidance', 'CGTMSE Guidance', 'Agriculture Loan Consultancy'] },
  { icon: HardHat, title: 'Shed Construction', points: ['Civil Construction', 'Steel Fabrication', 'EC & Semi-EC Sheds', 'Water & Drainage Planning'] },
  { icon: Cog, title: 'Equipment Supply', points: ['Automatic Feeding System', 'Nipple Drinking System', 'Cooling Pad System', 'Exhaust Fans, Brooding & Control Panels'] },
  { icon: Wrench, title: 'Installation & Commissioning', points: ['Complete Installation', 'Testing & Trial Run', 'Farm Commissioning', 'Operator Training'] },
  { icon: HeartHandshake, title: 'Technical Support', points: ['Farm Management', 'Biosecurity Planning', 'Batch Planning & Monitoring', 'Veterinary Guidance'] },
];

const TURNKEY_BREAKDOWN = [
  { icon: Building2, label: 'Civil Construction', desc: 'Foundations, flooring & site development' },
  { icon: Factory, label: 'Structural & Roofing', desc: 'ISMC columns, trusses & GI roof sheet' },
  { icon: Cog, label: 'EC Equipment', desc: 'Fans, cooling pads, feed & drinker lines' },
  { icon: Zap, label: 'Utilities & Infra', desc: 'Power, water, drainage & boundary works' },
];

const INTEGRATION_PARTNERS = [
  { name: 'IB Group', tag: 'Integration Partner', desc: 'Contract farming partnership with structured buyback and technical support.' },
  { name: 'Suguna Foods', tag: 'Integration Partner', desc: 'Established contract farming ecosystem with feed, chicks and marketing support.' },
  { name: "Venky's", tag: 'Chick Supply Partner', desc: 'Premium Vencobb 400 / 400Y day-old chick supply with 100% healthy chicks.' },
  { name: 'Other Leading Integrators', tag: 'Multi-Company Access', desc: 'Access to multiple integration companies for the best market opportunity.' },
];

const PROCESS_STEPS = [
  { icon: Users, title: 'Consultation', desc: 'Free consultation to understand your goals, land, capacity and budget.' },
  { icon: MapPin, title: 'Site Visit & Survey', desc: 'Detailed on-ground survey for soil, layout, water and utilities feasibility.' },
  { icon: ClipboardCheck, title: 'DPR & Planning', desc: 'Detailed Project Report with technical specs, cost estimate and timeline.' },
  { icon: Landmark, title: 'Loan Assistance', desc: 'End-to-end support for bank loans, NABARD, AHIDF and CGTMSE schemes.' },
  { icon: Layers, title: 'Farm Design & Layout', desc: 'Complete architectural, structural and equipment layout drawings.' },
  { icon: HardHat, title: 'Construction & Fabrication', desc: 'Civil work, steel structure, roofing and site development.' },
  { icon: Truck, title: 'Equipment Supply', desc: 'Delivery of all EC equipment, controls, feed lines and cooling systems.' },
  { icon: Wrench, title: 'Installation & Commissioning', desc: 'Complete installation, testing, trial run and full commissioning.' },
  { icon: HeartHandshake, title: 'Integration & Support', desc: 'Onboarding into contract farming with IB / Suguna / Venky\'s and ongoing tech support.' },
];

const WHY_AKBS = [
  { icon: Sparkles, title: 'Complete Turnkey Solutions' },
  { icon: Zap, title: 'Modern Technology & Design' },
  { icon: Award, title: 'High Quality Equipment' },
  { icon: LineChart, title: 'Transparent Project Cost' },
  { icon: Landmark, title: 'Bank Loan Assistance' },
  { icon: Rocket, title: 'Timely Project Execution' },
  { icon: HeartHandshake, title: 'Technical After-Sales Support' },
  { icon: Handshake, title: 'Long-Term Partnership' },
];

const COMMITMENTS = [
  { icon: Award, text: 'Quality in Every Project' },
  { icon: ShieldCheck, text: 'Transparency in Every Deal' },
  { icon: Lightbulb, text: 'Innovation & Technology' },
  { icon: Star, text: 'Customer Satisfaction First' },
  { icon: Leaf, text: 'Sustainable & Profitable Farming' },
];

function WWDHeader() {
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
            <a key={l.name} href={l.href} className={`px-3 py-2 text-sm font-semibold rounded-full transition ${l.name === 'What We Do' ? (scrolled ? 'text-akbs-green' : 'text-akbs-gold') : (scrolled ? 'text-akbs-ink hover:text-akbs-green' : 'text-white/90 hover:text-white')}`}>
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

function WhatWeDoPage() {
  return (
    <main className="bg-akbs-bg">
      <WWDHeader />

      {/* Hero */}
      <section className="relative pt-32 pb-16 md:pb-20 overflow-hidden bg-gradient-to-br from-akbs-dark via-akbs-green to-akbs-dark">
        <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-akbs-gold/20 blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-akbs-green/40 blur-3xl" />
        <div className="absolute inset-0 opacity-15">
          <img src="https://customer-assets-0z36b82j.emergentagent.net/job_akbs-corporate-site/artifacts/kwz2nxcs_Pasted%20Graphic%2020.jpg" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative container mx-auto z-10">
          <a href="/" className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-dark text-white text-xs font-semibold mb-6 hover:scale-105 transition-transform">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Home
          </a>
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-dark mb-5">
                <Sparkles className="h-4 w-4 text-akbs-gold" />
                <span className="text-akbs-gold text-xs font-semibold tracking-[0.2em] uppercase">What We Do</span>
              </div>
              <h1 className="font-heading font-black text-white text-4xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight mb-4">
                From Farm Planning to <span className="text-gradient-gold">Profitable Poultry</span>
              </h1>
              <p className="text-akbs-gold text-lg md:text-xl font-semibold mb-4">DESIGN • BUILD • EQUIP • SUPPORT</p>
              <p className="text-white/85 text-base md:text-lg max-w-2xl leading-relaxed mb-8">
                AKBS is your complete turnkey partner for modern EC poultry farming. We design, construct, equip and integrate your farm with leading contract farming companies — under one roof.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="#services" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full btn-gradient-gold text-akbs-dark font-semibold shadow-luxury hover:scale-105 transition-transform">
                  <ClipboardCheck className="h-4 w-4" /> Explore Our Services
                </a>
                <a href={`https://wa.me/${WA}?text=Hello%20AKBS%2C%20I%20want%20to%20set%20up%20a%20turnkey%20poultry%20farm.`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#25D366] text-white font-semibold shadow-luxury hover:scale-105 transition-transform">
                  <MessageCircle className="h-4 w-4" /> Free Consultation
                </a>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: Users, top: 'Experienced', label: 'Team' },
                  { icon: ShieldCheck, top: 'Quality', label: 'Assured' },
                  { icon: Handshake, top: 'Trust &', label: 'Transparency' },
                  { icon: Truck, top: 'On-Time', label: 'Delivery' },
                ].map((s, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                    className="glass-dark rounded-2xl p-5 border border-akbs-gold/20">
                    <s.icon className="h-6 w-6 text-akbs-gold mb-3" />
                    <div className="font-heading font-black text-white text-xl leading-tight">{s.top}</div>
                    <div className="text-akbs-gold text-sm font-semibold">{s.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Turnkey Investment Highlight */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-12 gap-8 items-center bg-gradient-to-br from-akbs-bg to-white rounded-[32px] p-8 md:p-12 border border-black/5 shadow-luxury">
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 mb-3">
                  <div className="h-[2px] w-8 bg-akbs-gold" />
                  <span className="text-xs font-bold tracking-[0.25em] text-akbs-green uppercase">Turnkey Investment</span>
                </div>
                <h2 className="font-heading font-extrabold text-3xl md:text-5xl text-akbs-dark leading-tight mb-4">
                  Complete <span className="text-gradient-gold">20,000 Chicks EC Farm</span> — Built for You
                </h2>
                <p className="text-akbs-ink/70 leading-relaxed mb-6">
                  We deliver a fully automated, environment-controlled broiler poultry farm ready for production. From civil work to commissioning and integration onboarding — every step managed by our experts.
                </p>

                <div className="grid grid-cols-2 gap-3 mb-6">
                  {TURNKEY_BREAKDOWN.map((t) => (
                    <div key={t.label} className="bg-white rounded-2xl p-4 border border-black/5">
                      <div className="h-10 w-10 rounded-xl btn-gradient-green flex items-center justify-center mb-2 shadow-md">
                        <t.icon className="h-5 w-5 text-akbs-gold" strokeWidth={2} />
                      </div>
                      <div className="font-heading font-extrabold text-sm text-akbs-dark">{t.label}</div>
                      <div className="text-[11px] text-akbs-ink/60">{t.desc}</div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3">
                  <a href="/farm" className="inline-flex items-center gap-2 px-5 py-3 rounded-full btn-gradient-green text-white font-semibold text-sm shadow-luxury hover:scale-105 transition-transform">
                    View Detailed Project <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="bg-akbs-dark rounded-[28px] p-8 relative overflow-hidden text-white">
                  <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-akbs-gold/20 blur-3xl" />
                  <div className="relative">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-akbs-gold/20 border border-akbs-gold/40 mb-4">
                      <Sparkles className="h-3 w-3 text-akbs-gold" />
                      <span className="text-akbs-gold text-[10px] font-bold tracking-widest uppercase">Turnkey Package</span>
                    </div>
                    <div className="text-akbs-gold text-sm font-semibold mb-1">Minimum Requirement</div>
                    <div className="font-heading font-black text-white text-5xl md:text-6xl leading-none mb-2">₹1.20 Cr<span className="text-akbs-gold">*</span></div>
                    <div className="text-white/70 text-sm mb-5">for a complete 20,000 Chicks EC Poultry Farm</div>
                    <ul className="space-y-2.5 text-sm">
                      <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-akbs-gold shrink-0 mt-0.5" /><span className="text-white/90">Civil construction & flooring</span></li>
                      <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-akbs-gold shrink-0 mt-0.5" /><span className="text-white/90">Steel structure, roofing & bracing</span></li>
                      <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-akbs-gold shrink-0 mt-0.5" /><span className="text-white/90">EC equipment — fans, cooling pad, feeding & drinking</span></li>
                      <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-akbs-gold shrink-0 mt-0.5" /><span className="text-white/90">Utilities, drainage, boundary & power backup</span></li>
                      <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-akbs-gold shrink-0 mt-0.5" /><span className="text-white/90">Commissioning, testing & operator training</span></li>
                    </ul>
                    <div className="mt-4 text-[10px] text-white/50 italic">*Indicative fixed-asset estimate. Final cost may vary based on site, market rates and finishes.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Services */}
      <section id="services" className="py-16 md:py-24 bg-akbs-bg">
        <div className="container mx-auto">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-3">
              <div className="h-[2px] w-8 bg-akbs-gold" />
              <span className="text-xs font-bold tracking-[0.25em] text-akbs-green uppercase">Our Services</span>
            </div>
            <h2 className="font-heading font-extrabold text-3xl md:text-5xl text-akbs-dark mb-4">
              Complete <span className="text-gradient-gold">Poultry Farm Solutions</span>
            </h2>
            <p className="text-akbs-ink/60">Every step from farm planning to profitable production — handled by our expert team.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {CORE_SERVICES.map((s, i) => (
              <motion.div key={s.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} whileHover={{ y: -6 }}
                className="bg-white rounded-3xl p-7 border border-black/5 hover:border-akbs-gold/40 hover:shadow-luxury transition-all group">
                <div className="h-14 w-14 rounded-2xl btn-gradient-green flex items-center justify-center mb-5 shadow-md group-hover:scale-110 transition-transform">
                  <s.icon className="h-7 w-7 text-akbs-gold" strokeWidth={2} />
                </div>
                <h3 className="font-heading font-extrabold text-xl text-akbs-dark mb-3">{s.title}</h3>
                <ul className="space-y-2">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-sm text-akbs-ink/70">
                      <CheckCircle2 className="h-4 w-4 text-akbs-green shrink-0 mt-0.5" /><span>{p}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contract Farming Integration */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-akbs-dark via-akbs-green to-akbs-dark relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-akbs-gold/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-akbs-green/40 blur-3xl" />
        <div className="container mx-auto relative">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-3">
              <div className="h-[2px] w-8 bg-akbs-gold" />
              <span className="text-xs font-bold tracking-[0.25em] text-akbs-gold uppercase">Contract Farming Integration</span>
            </div>
            <h2 className="font-heading font-extrabold text-3xl md:text-5xl text-white mb-4">
              Onboarding with <span className="text-gradient-gold">India's Top Integrators</span>
            </h2>
            <p className="text-white/80 leading-relaxed">
              AKBS bridges farmers and India's leading poultry integration companies. We handle end-to-end onboarding into structured contract farming — including chick supply, feed, medication, technical support and buyback arrangements.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {INTEGRATION_PARTNERS.map((p, i) => (
              <motion.div key={p.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ y: -6 }}
                className="glass-dark rounded-3xl p-6 border border-akbs-gold/20 hover:border-akbs-gold/60 transition-all group">
                <div className="h-14 w-14 rounded-2xl btn-gradient-gold flex items-center justify-center mb-4 shadow-md">
                  <Handshake className="h-7 w-7 text-akbs-dark" strokeWidth={2.2} />
                </div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-akbs-gold/20 border border-akbs-gold/30 text-akbs-gold text-[9px] font-bold uppercase tracking-widest mb-2">
                  {p.tag}
                </div>
                <h3 className="font-heading font-extrabold text-white text-xl mb-2">{p.name}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 grid md:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {[
              { icon: PackageOpen, text: 'Day-old chicks supply through our integration partners' },
              { icon: Beaker, text: 'Feed, medication & vaccine sourcing supported' },
              { icon: LineChart, text: 'Structured buyback and technical support arrangements' },
            ].map((b, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="h-10 w-10 rounded-xl bg-akbs-gold/20 border border-akbs-gold/40 flex items-center justify-center shrink-0">
                  <b.icon className="h-5 w-5 text-akbs-gold" />
                </div>
                <div className="text-white/85 text-sm font-medium leading-snug pt-1.5">{b.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Execution Process */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-3">
              <div className="h-[2px] w-8 bg-akbs-gold" />
              <span className="text-xs font-bold tracking-[0.25em] text-akbs-green uppercase">Our Project Execution Process</span>
            </div>
            <h2 className="font-heading font-extrabold text-3xl md:text-5xl text-akbs-dark mb-4">
              From <span className="text-gradient-gold">Consultation to Commissioning</span>
            </h2>
            <p className="text-akbs-ink/60">A proven 9-step process that transforms your land into a profitable poultry farm.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 max-w-6xl mx-auto">
            {PROCESS_STEPS.map((s, i) => (
              <motion.div key={s.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} whileHover={{ y: -4 }}
                className="bg-akbs-bg rounded-2xl p-5 border border-black/5 hover:border-akbs-gold/40 transition-all relative overflow-hidden">
                <div className="absolute top-4 right-4 font-heading font-black text-akbs-green/10 text-5xl leading-none">0{i + 1}</div>
                <div className="relative">
                  <div className="h-11 w-11 rounded-xl btn-gradient-green flex items-center justify-center mb-3 shadow-md">
                    <s.icon className="h-5 w-5 text-akbs-gold" strokeWidth={2.2} />
                  </div>
                  <h3 className="font-heading font-extrabold text-akbs-dark text-base mb-1">{s.title}</h3>
                  <p className="text-xs text-akbs-ink/70 leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why AKBS */}
      <section className="py-16 md:py-20 bg-akbs-bg">
        <div className="container mx-auto">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-3">
              <div className="h-[2px] w-8 bg-akbs-gold" />
              <span className="text-xs font-bold tracking-[0.25em] text-akbs-green uppercase">Why Choose AKBS</span>
            </div>
            <h2 className="font-heading font-extrabold text-3xl md:text-5xl text-akbs-dark mb-4">
              Building Better Farms • <span className="text-gradient-gold">Better Birds • Better Returns</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {WHY_AKBS.map((w, i) => (
              <motion.div key={w.title} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} whileHover={{ y: -4 }}
                className="bg-white rounded-2xl p-5 text-center border border-black/5 hover:border-akbs-gold/40 hover:shadow-luxury transition-all">
                <div className="h-14 w-14 mx-auto rounded-2xl btn-gradient-green flex items-center justify-center mb-3 shadow-md">
                  <w.icon className="h-6 w-6 text-akbs-gold" strokeWidth={2} />
                </div>
                <div className="font-heading font-extrabold text-sm text-akbs-dark leading-snug">{w.title}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Commitment */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto max-w-5xl">
          <div className="bg-gradient-to-br from-akbs-dark via-akbs-green to-akbs-dark rounded-[32px] p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-akbs-gold/20 blur-3xl" />
            <div className="relative">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 mb-3">
                  <div className="h-[2px] w-8 bg-akbs-gold" />
                  <span className="text-xs font-bold tracking-[0.25em] text-akbs-gold uppercase">Our Commitment</span>
                </div>
                <h2 className="font-heading font-extrabold text-white text-3xl md:text-4xl">
                  Promises We <span className="text-gradient-gold">Never Break</span>
                </h2>
              </div>
              <div className="grid md:grid-cols-5 gap-3">
                {COMMITMENTS.map((c, i) => (
                  <motion.div key={c.text} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                    className="glass-dark rounded-2xl p-4 border border-akbs-gold/20 text-center">
                    <div className="h-10 w-10 mx-auto rounded-xl bg-akbs-gold/20 flex items-center justify-center mb-2">
                      <c.icon className="h-5 w-5 text-akbs-gold" />
                    </div>
                    <div className="text-white text-xs font-heading font-extrabold leading-tight">{c.text}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-20 bg-akbs-bg">
        <div className="container mx-auto max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="h-[2px] w-8 bg-akbs-gold" />
            <span className="text-xs font-bold tracking-[0.25em] text-akbs-green uppercase">Ready to Get Started?</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl md:text-5xl text-akbs-dark leading-tight mb-4">
            Let's Build Your <span className="text-gradient-gold">Turnkey Poultry Farm</span>
          </h2>
          <p className="text-akbs-ink/60 mb-8 max-w-2xl mx-auto">
            Free consultation, custom project report, transparent pricing, and full integration support. Talk to us today.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href={`https://wa.me/${WA}?text=Hello%20AKBS%2C%20I%20want%20a%20free%20consultation%20for%20a%20turnkey%20poultry%20farm.`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#25D366] text-white font-semibold shadow-luxury hover:scale-105 transition-transform">
              <MessageCircle className="h-4 w-4" /> Free Consultation
            </a>
            <a href={`tel:${PHONE.replace(/\s/g, '')}`} className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full btn-gradient-green text-white font-semibold shadow-luxury hover:scale-105 transition-transform">
              <Phone className="h-4 w-4" /> {PHONE}
            </a>
            <a href="/#contact" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full btn-gradient-gold text-akbs-dark font-semibold shadow-luxury hover:scale-105 transition-transform">
              <ArrowUpRight className="h-4 w-4" /> Request Project Report
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-akbs-dark text-white py-10">
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
              <div className="text-[9px] font-semibold tracking-[0.15em] text-white/70">PRIVATE LIMITED — Complete Poultry Solutions Under One Roof</div>
            </div>
          </div>
          <div className="text-xs text-white/50">© 2026 AKBS Poultry Farming Private Limited. All Rights Reserved.</div>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <a href={`https://wa.me/${WA}?text=Hello%20AKBS%2C%20I%20visited%20your%20What%20We%20Do%20page.`} target="_blank" rel="noreferrer"
        className="group fixed bottom-6 right-6 z-40 flex items-center gap-3">
        <span className="hidden md:inline-block bg-white text-akbs-dark text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all">Chat on WhatsApp</span>
        <span className="relative h-14 w-14 rounded-full bg-[#25D366] shadow-luxury-lg flex items-center justify-center hover:scale-110 transition-transform animate-float">
          <MessageCircle className="h-6 w-6 text-white" fill="currentColor" />
          <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
          <span className="absolute -top-1 -right-1 bg-akbs-gold text-akbs-dark text-[8px] font-black px-1.5 py-0.5 rounded-full shadow-md">BIZ</span>
        </span>
      </a>
    </main>
  );
}

export default WhatWeDoPage;
