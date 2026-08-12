'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Leaf, Bird, Phone, Mail, MapPin, Globe, Building2, FileText, Briefcase,
  ArrowRight, ArrowLeft, CheckCircle2, Target, Eye, Heart, Users, Award,
  ShieldCheck, TrendingUp, Sparkles, Download, MessageCircle, Handshake,
  Linkedin, Facebook, Instagram, Youtube, ExternalLink, Copy, Menu, X,
  Landmark, Factory, Wheat
} from 'lucide-react';

const COMPANY = {
  name: 'AKBS Poultry Farming Pvt. Ltd.',
  cin: 'U01463MP2026PTC083191',
  registeredOffice: '01, Rajaram House, Kundali, Bamhori, Raisen, M.P.',
  projectLocation: 'Kundali, Bamhori, District Raisen (M.P.)',
  businessType: 'Poultry Farming & Agro Business',
  emails: ['akbspoultryfarming@gmail.com', 'info@akbspoultry.com'],
  website: 'www.akbspoultry.com',
  phone: '+91 9893345906',
  md: {
    name: 'Balram Singh Ahirwar',
    role: 'Managing Director',
    image: 'https://customer-assets-0z36b82j.emergentagent.net/job_akbs-corporate-site/artifacts/r46tm9lk_image.png',
    phone: '+91 9893345906',
    email: 'info@akbspoultry.com',
  },
};

const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Our Farm', href: '/#farm' },
  { name: 'Feed Plant', href: '/#feed' },
  { name: 'Projects', href: '/#projects' },
  { name: 'Management', href: '/#management' },
  { name: 'Contact', href: '/#contact' },
];

const VALUES = [
  { icon: Target, title: 'Our Mission', desc: 'To become a leading integrated poultry enterprise delivering premium quality broilers, feed and infrastructure through scientific farming and unwavering biosecurity standards.' },
  { icon: Eye, title: 'Our Vision', desc: 'To build a sustainable, profitable poultry ecosystem that empowers farmers, feeds families and sets new benchmarks for the Indian agri-business industry.' },
  { icon: Heart, title: 'Our Values', desc: 'Quality first, farmer partnership, scientific approach, ethical operations and long-term commitment to every stakeholder we serve.' },
];

const MILESTONES = [
  { year: '2026', title: 'AKBS Incorporated', desc: 'AKBS Poultry Farming Pvt. Ltd. registered under CIN U01463MP2026PTC083191.' },
  { year: '2026', title: 'Farm Commissioning', desc: '20,000+ bird capacity environment-controlled broiler farm operational at Kundali, Bamhori.' },
  { year: '2026', title: 'Feed Unit Launch', desc: 'Modern feed manufacturing unit with laboratory-tested batches begins production.' },
  { year: 'Future', title: 'Expansion Roadmap', desc: '100,000+ bird capacity, integrated hatchery, and multi-district expansion across Madhya Pradesh.' },
];

const WHY_US = [
  { icon: ShieldCheck, text: 'Uncompromising biosecurity across all facilities' },
  { icon: Factory, text: 'Modern environment-controlled farm infrastructure' },
  { icon: Wheat, text: 'Premium in-house feed manufacturing capability' },
  { icon: Award, text: 'Laboratory-tested feed with balanced nutrition' },
  { icon: Users, text: 'Experienced leadership and technical team' },
  { icon: TrendingUp, text: 'Clear expansion roadmap to 100,000+ birds' },
];

function AboutHeader() {
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
        <a href="/" className="flex items-center gap-3 group shrink-0">
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
            <a key={l.name} href={l.href} className={`px-3 py-2 text-sm font-semibold rounded-full transition ${l.name === 'About' ? (scrolled ? 'text-akbs-green' : 'text-akbs-gold') : (scrolled ? 'text-akbs-ink hover:text-akbs-green' : 'text-white/90 hover:text-white')}`}>
              {l.name}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a href={`tel:${COMPANY.phone.replace(/\s/g, '')}`} className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full btn-gradient-green text-white font-semibold text-sm shadow-luxury hover:scale-105 transition-transform">
            <Phone className="h-4 w-4" /> {COMPANY.phone}
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

function AboutFooter() {
  return (
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
            <div className="font-heading font-extrabold">AKBS</div>
            <div className="text-[9px] font-semibold tracking-[0.15em] text-white/70">POULTRY FARMING<br/>PRIVATE LIMITED</div>
          </div>
        </div>
        <div className="text-sm text-white/60 mb-4">CIN: {COMPANY.cin}</div>
        <div className="text-xs text-white/50">© 2026 AKBS Poultry Farming Private Limited. All Rights Reserved.</div>
      </div>
    </footer>
  );
}

function CopyRow({ label, value, icon: Icon, href }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard?.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div className="flex items-start gap-4 p-5 rounded-2xl bg-akbs-bg hover:bg-akbs-green/5 border border-transparent hover:border-akbs-gold/30 transition-all group">
      <div className="h-11 w-11 rounded-xl btn-gradient-green flex items-center justify-center shrink-0 shadow-md">
        <Icon className="h-5 w-5 text-akbs-gold" strokeWidth={2} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[10px] font-bold tracking-widest text-akbs-green uppercase mb-1">{label}</div>
        {href ? (
          <a href={href} className="font-heading font-bold text-akbs-dark break-words hover:text-akbs-green transition">{value}</a>
        ) : (
          <div className="font-heading font-bold text-akbs-dark break-words">{value}</div>
        )}
      </div>
      <button onClick={copy} className="opacity-0 group-hover:opacity-100 h-8 w-8 rounded-lg bg-white flex items-center justify-center text-akbs-ink/50 hover:text-akbs-green transition-all shrink-0" title="Copy">
        {copied ? <CheckCircle2 className="h-4 w-4 text-akbs-green" /> : <Copy className="h-4 w-4" />}
      </button>
    </div>
  );
}

function AboutPage() {
  return (
    <main className="bg-akbs-bg">
      <AboutHeader />

      {/* Hero */}
      <section className="relative min-h-[80vh] pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://customer-assets-0z36b82j.emergentagent.net/job_akbs-corporate-site/artifacts/rbnwe0mb_image.png" alt="AKBS Farm" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-akbs-dark/95 via-akbs-dark/70 to-akbs-dark/30" />
          <div className="absolute inset-0 bg-gradient-to-b from-akbs-dark/20 via-transparent to-akbs-dark/80" />
        </div>
        <div className="relative container mx-auto z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl">
            <a href="/" className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-dark text-white text-xs font-semibold mb-6 hover:scale-105 transition-transform">
              <ArrowLeft className="h-3.5 w-3.5" /> Back to Home
            </a>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-dark mb-6">
              <Sparkles className="h-4 w-4 text-akbs-gold" />
              <span className="text-akbs-gold text-xs font-semibold tracking-[0.2em] uppercase">About Our Company</span>
            </div>
            <h1 className="font-heading font-black text-white text-4xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight mb-5">
              Build a <span className="text-gradient-gold">Profitable, Sustainable</span> Poultry Enterprise
            </h1>
            <p className="text-white/85 text-lg md:text-xl leading-relaxed mb-8 max-w-2xl">
              Your trusted partner for expert consulting, premium machinery, and turn-key environmental solutions. Let AKBS guide you to success in integrated poultry farming.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#profile" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full btn-gradient-gold text-akbs-dark font-semibold shadow-luxury hover:scale-105 transition-transform">
                <FileText className="h-4 w-4" /> Company Profile
              </a>
              <a href="#md-contact" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full btn-gradient-green text-white font-semibold shadow-luxury hover:scale-105 transition-transform">
                <Briefcase className="h-4 w-4" /> Inquiry & Investment
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Company Profile Card */}
      <section id="profile" className="py-16 md:py-24 relative">
        <div className="container mx-auto">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-3">
              <div className="h-[2px] w-8 bg-akbs-gold" />
              <span className="text-xs font-bold tracking-[0.25em] text-akbs-green uppercase">Corporate Details</span>
            </div>
            <h2 className="font-heading font-extrabold text-3xl md:text-5xl text-akbs-dark mb-4">Company <span className="text-gradient-gold">Profile</span></h2>
            <p className="text-akbs-ink/60">Verified corporate information for AKBS Poultry Farming Private Limited.</p>
          </div>

          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto bg-white rounded-[32px] shadow-luxury-lg border border-black/5 overflow-hidden">
            <div className="btn-gradient-green px-8 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-2xl bg-white/15 backdrop-blur flex items-center justify-center border border-akbs-gold/40">
                  <Landmark className="h-7 w-7 text-akbs-gold" strokeWidth={2} />
                </div>
                <div>
                  <div className="text-akbs-gold text-[10px] font-bold tracking-[0.25em] uppercase mb-0.5">Registered Company</div>
                  <div className="font-heading font-extrabold text-white text-xl md:text-2xl leading-tight">{COMPANY.name}</div>
                </div>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-akbs-gold/20 border border-akbs-gold/40 text-akbs-gold text-xs font-bold">
                <ShieldCheck className="h-3.5 w-3.5" /> Verified Corporate Entity
              </div>
            </div>

            <div className="p-6 md:p-10 grid md:grid-cols-2 gap-4">
              <CopyRow label="Company Name" value={COMPANY.name} icon={Building2} />
              <CopyRow label="CIN (Corporate ID)" value={COMPANY.cin} icon={FileText} />
              <div className="md:col-span-2">
                <CopyRow label="Registered Office" value={COMPANY.registeredOffice} icon={MapPin} />
              </div>
              <div className="md:col-span-2">
                <CopyRow label="Project Location" value={COMPANY.projectLocation} icon={Factory} />
              </div>
              <CopyRow label="Business Type" value={COMPANY.businessType} icon={Briefcase} />
              <CopyRow label="Phone" value={COMPANY.phone} icon={Phone} href={`tel:${COMPANY.phone.replace(/\s/g, '')}`} />
              <CopyRow label="Primary Email" value={COMPANY.emails[0]} icon={Mail} href={`mailto:${COMPANY.emails[0]}`} />
              <CopyRow label="Corporate Email" value={COMPANY.emails[1]} icon={Mail} href={`mailto:${COMPANY.emails[1]}`} />
              <div className="md:col-span-2">
                <CopyRow label="Website" value={COMPANY.website} icon={Globe} href={`https://${COMPANY.website}`} />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission / Vision / Values */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-3">
              <div className="h-[2px] w-8 bg-akbs-gold" />
              <span className="text-xs font-bold tracking-[0.25em] text-akbs-green uppercase">Who We Are</span>
            </div>
            <h2 className="font-heading font-extrabold text-3xl md:text-5xl text-akbs-dark mb-4">Mission, Vision & <span className="text-gradient-gold">Values</span></h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {VALUES.map((v, i) => (
              <motion.div key={v.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ y: -6 }}
                className="bg-akbs-bg rounded-3xl p-8 border border-black/5 hover:border-akbs-gold/40 hover:shadow-luxury transition-all">
                <div className="h-14 w-14 rounded-2xl btn-gradient-green flex items-center justify-center mb-5 shadow-md">
                  <v.icon className="h-7 w-7 text-akbs-gold" strokeWidth={2} />
                </div>
                <h3 className="font-heading font-extrabold text-xl text-akbs-dark mb-3">{v.title}</h3>
                <p className="text-sm text-akbs-ink/70 leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why AKBS */}
      <section className="py-16 md:py-20 bg-akbs-bg">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="inline-flex items-center gap-2 mb-3">
                <div className="h-[2px] w-8 bg-akbs-gold" />
                <span className="text-xs font-bold tracking-[0.25em] text-akbs-green uppercase">Why AKBS</span>
              </div>
              <h2 className="font-heading font-extrabold text-3xl md:text-5xl text-akbs-dark leading-tight mb-5">
                Six Reasons <span className="text-gradient-gold">Farmers Trust Us</span>
              </h2>
              <p className="text-akbs-ink/70 leading-relaxed mb-6">
                From scientific broiler farming to premium in-house feed and modern infrastructure, AKBS delivers a full-stack poultry ecosystem built for reliability, profitability and long-term partnership.
              </p>
              <a href="/#services" className="inline-flex items-center gap-2 px-6 py-3 rounded-full btn-gradient-green text-white font-semibold shadow-luxury hover:scale-105 transition-transform">
                Explore Our Services <ArrowRight className="h-4 w-4" />
              </a>
            </motion.div>
            <div className="grid sm:grid-cols-2 gap-3">
              {WHY_US.map((w, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                  className="bg-white rounded-2xl p-4 flex items-start gap-3 shadow-md border border-black/5 hover:border-akbs-gold/40 transition-all">
                  <div className="h-10 w-10 rounded-xl bg-akbs-green/10 flex items-center justify-center shrink-0">
                    <w.icon className="h-5 w-5 text-akbs-green" strokeWidth={2.2} />
                  </div>
                  <div className="text-sm font-semibold text-akbs-dark leading-snug pt-2">{w.text}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-3">
              <div className="h-[2px] w-8 bg-akbs-gold" />
              <span className="text-xs font-bold tracking-[0.25em] text-akbs-green uppercase">Journey</span>
            </div>
            <h2 className="font-heading font-extrabold text-3xl md:text-5xl text-akbs-dark mb-4">Our <span className="text-gradient-gold">Milestones</span></h2>
          </div>
          <div className="max-w-4xl mx-auto relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-akbs-gold via-akbs-green to-transparent -translate-x-1/2" />
            <div className="space-y-6">
              {MILESTONES.map((m, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className={`relative flex gap-4 md:gap-0 md:items-center ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className="absolute left-4 md:left-1/2 h-4 w-4 rounded-full btn-gradient-gold border-4 border-white shadow-md -translate-x-1/2 z-10" />
                  <div className={`w-full md:w-1/2 pl-10 md:pl-0 ${i % 2 === 0 ? 'md:pr-10 md:text-right' : 'md:pl-10'}`}>
                    <div className="bg-akbs-bg rounded-2xl p-5 border border-black/5 hover:border-akbs-gold/40 transition inline-block max-w-md">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full btn-gradient-gold text-akbs-dark text-[10px] font-bold uppercase tracking-wider mb-2">{m.year}</div>
                      <h3 className="font-heading font-extrabold text-akbs-dark text-lg mb-1">{m.title}</h3>
                      <p className="text-sm text-akbs-ink/70 leading-relaxed">{m.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MD Inquiry & Investment */}
      <section id="md-contact" className="py-16 md:py-24 bg-gradient-to-br from-akbs-dark via-akbs-green to-akbs-dark relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-akbs-gold/20 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-akbs-green/40 blur-3xl" />
        <div className="container mx-auto relative">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-3">
              <div className="h-[2px] w-8 bg-akbs-gold" />
              <span className="text-xs font-bold tracking-[0.25em] text-akbs-gold uppercase">Direct Contact</span>
            </div>
            <h2 className="font-heading font-extrabold text-3xl md:text-5xl text-white mb-4">
              Inquiry & <span className="text-gradient-gold">Investment</span>
            </h2>
            <p className="text-white/70">
              For business inquiries, partnerships, distribution or investment opportunities, connect directly with our Managing Director.
            </p>
          </div>

          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="max-w-4xl mx-auto bg-white rounded-[32px] shadow-luxury-lg overflow-hidden grid md:grid-cols-5">
            <div className="md:col-span-2 bg-gradient-to-b from-akbs-bg via-white to-akbs-bg p-8 flex flex-col items-center justify-center relative">
              <div className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full btn-gradient-gold text-akbs-dark text-[10px] font-bold uppercase tracking-wider">
                <Sparkles className="h-3 w-3" /> MD
              </div>
              <div className="w-48 h-64 rounded-2xl overflow-hidden bg-akbs-bg mb-5 shadow-md">
                <img src={COMPANY.md.image} alt={COMPANY.md.name} className="w-full h-full object-cover object-top" />
              </div>
              <div className="text-center">
                <h3 className="font-heading font-extrabold text-akbs-dark text-xl">{COMPANY.md.name}</h3>
                <div className="text-akbs-gold text-sm font-semibold">{COMPANY.md.role}</div>
              </div>
            </div>

            <div className="md:col-span-3 p-8 md:p-10">
              <div className="text-[10px] font-bold tracking-widest text-akbs-green uppercase mb-2">Direct Line</div>
              <h3 className="font-heading font-extrabold text-2xl text-akbs-dark mb-2">Get in touch with our MD</h3>
              <p className="text-sm text-akbs-ink/60 mb-6 leading-relaxed">
                Reach out directly for contract farming, feed supply agreements, project consultancy, distribution partnerships, and investment opportunities in AKBS Poultry.
              </p>

              <div className="space-y-3 mb-6">
                <a href={`tel:${COMPANY.md.phone.replace(/\s/g, '')}`} className="flex items-center gap-4 p-4 rounded-2xl bg-akbs-bg hover:bg-akbs-green/5 hover:border-akbs-gold/40 border border-transparent transition-all group">
                  <div className="h-11 w-11 rounded-xl btn-gradient-green flex items-center justify-center shrink-0"><Phone className="h-5 w-5 text-akbs-gold" /></div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] font-bold tracking-widest text-akbs-green uppercase">Call MD Directly</div>
                    <div className="font-heading font-bold text-akbs-dark group-hover:text-akbs-green">{COMPANY.md.phone}</div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-akbs-ink/30 group-hover:text-akbs-green group-hover:translate-x-1 transition-all" />
                </a>
                <a href={`mailto:${COMPANY.md.email}?subject=Business Inquiry / Investment - AKBS Poultry&body=Dear ${COMPANY.md.name},%0D%0A%0D%0A`} className="flex items-center gap-4 p-4 rounded-2xl bg-akbs-bg hover:bg-akbs-green/5 hover:border-akbs-gold/40 border border-transparent transition-all group">
                  <div className="h-11 w-11 rounded-xl btn-gradient-green flex items-center justify-center shrink-0"><Mail className="h-5 w-5 text-akbs-gold" /></div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] font-bold tracking-widest text-akbs-green uppercase">Email MD</div>
                    <div className="font-heading font-bold text-akbs-dark group-hover:text-akbs-green truncate">{COMPANY.md.email}</div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-akbs-ink/30 group-hover:text-akbs-green group-hover:translate-x-1 transition-all" />
                </a>
                <a href={`https://wa.me/${COMPANY.md.phone.replace(/[^0-9]/g, '')}?text=Hello%20AKBS%20Poultry%2C%20I%20am%20interested%20in%20knowing%20more%20about%20your%20business.`} target="_blank" rel="noreferrer"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 hover:border-[#25D366] transition-all group">
                  <div className="h-11 w-11 rounded-xl bg-[#25D366] flex items-center justify-center shrink-0"><MessageCircle className="h-5 w-5 text-white" fill="currentColor" /></div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] font-bold tracking-widest text-[#128C7E] uppercase">WhatsApp MD</div>
                    <div className="font-heading font-bold text-akbs-dark">Chat instantly on WhatsApp</div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-akbs-ink/30 group-hover:text-[#128C7E] group-hover:translate-x-1 transition-all" />
                </a>
              </div>

              <div className="flex flex-wrap gap-2 pt-4 border-t border-akbs-bg">
                <a href="/#contact" className="inline-flex items-center gap-2 px-4 py-2 rounded-full btn-gradient-gold text-akbs-dark text-xs font-bold shadow-md hover:scale-105 transition-transform">
                  <Handshake className="h-3.5 w-3.5" /> Send Business Inquiry
                </a>
                <a href="/#contact" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-akbs-bg text-akbs-dark text-xs font-bold hover:bg-akbs-green/10 transition">
                  <TrendingUp className="h-3.5 w-3.5" /> Investment Interest
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="py-16 bg-white">
        <div className="container mx-auto">
          <div className="bg-gradient-to-r from-akbs-dark via-akbs-green to-akbs-dark rounded-[32px] p-8 md:p-14 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-akbs-gold/20 blur-3xl" />
            <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <div className="text-akbs-gold text-[10px] font-bold tracking-[0.25em] uppercase mb-2">Ready to Partner With AKBS?</div>
                <h3 className="font-heading font-extrabold text-white text-2xl md:text-4xl leading-tight max-w-xl">
                  Let&apos;s build the future of Indian poultry <span className="text-gradient-gold">together.</span>
                </h3>
              </div>
              <div className="flex flex-wrap gap-3">
                <a href="/#contact" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full btn-gradient-gold text-akbs-dark font-semibold shadow-luxury hover:scale-105 transition-transform">
                  <Mail className="h-4 w-4" /> Contact Us
                </a>
                <a href={`tel:${COMPANY.phone.replace(/\s/g, '')}`} className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/10 backdrop-blur border border-white/30 text-white font-semibold hover:bg-white/20 transition-all">
                  <Phone className="h-4 w-4" /> {COMPANY.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AboutFooter />

      {/* Floating WhatsApp Business */}
      <a href={`https://wa.me/${COMPANY.phone.replace(/[^0-9]/g, '')}?text=Hello%20AKBS%20Poultry%2C%20I%20visited%20your%20About%20page%20and%20would%20like%20to%20connect.`} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp Business"
        className="group fixed bottom-6 right-6 z-40 flex items-center gap-3">
        <span className="hidden md:inline-block bg-white text-akbs-dark text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0">
          Chat on WhatsApp
        </span>
        <span className="relative h-14 w-14 rounded-full bg-[#25D366] shadow-luxury-lg flex items-center justify-center hover:scale-110 transition-transform animate-float">
          <MessageCircle className="h-6 w-6 text-white" fill="currentColor" />
          <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
          <span className="absolute -top-1 -right-1 bg-akbs-gold text-akbs-dark text-[8px] font-black px-1.5 py-0.5 rounded-full shadow-md">BIZ</span>
        </span>
      </a>
    </main>
  );
}

export default AboutPage;
