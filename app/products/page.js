'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Leaf, Bird, Phone, Mail, ArrowLeft, ArrowRight, MessageCircle, Menu, X,
  CheckCircle2, ShieldCheck, TrendingUp, Award, Sparkles, Egg, Wheat, Utensils,
  Factory, Beaker, Package, FlaskConical, Droplets, Sun, Wind, Sprout,
  Building2, Cog, Handshake, Users, Clock, ThermometerSun, HeartPulse,
  Zap, Target, FileCheck, HardHat, Truck, LineChart, Star, Download,
  MapPin, ShoppingBag
} from 'lucide-react';

const PHONE = '+91 9893345906';
const WA_NUMBER = '919893345906';
const MANUFACTURING_ADDRESS = 'Vill. Jam, Kundali Bamhori, Tehsil Silwani, Dist. Raisen (M.P.) - 464226';

const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Products', href: '/products' },
  { name: 'Our Farm', href: '/#farm' },
  { name: 'Projects', href: '/#projects' },
  { name: 'Management', href: '/#management' },
  { name: 'Contact', href: '/#contact' },
];

const PRODUCTS = [
  {
    id: 'pre-starter',
    name: 'AKBS Pre-Starter Feed',
    hindi: 'प्रि-स्टार्टर फीड',
    age: '0-10 Days',
    tagline: 'सही शुरुआत, मजबूत भविष्य',
    subTagline: 'Right Start, Stronger Future',
    accent: '#0D4D2C',
    accentLight: '#E6F0EA',
    gradient: 'from-emerald-600 via-emerald-700 to-emerald-900',
    bgSoft: 'bg-emerald-50',
    ring: 'ring-emerald-500/30',
    image: 'https://customer-assets-0z36b82j.emergentagent.net/job_akbs-corporate-site/artifacts/lqi2hl7a_PRE-STARTER.png',
    weight: '50 kg',
    description: 'Specially formulated for early chick growth (0-10 days) delivering strong immunity, superior digestion and uniform weight gain from day one.',
    hindiDescription: 'यह फीड चूजों की शुरुआती वृद्धि, बेहतर पाचन, मजबूत प्रतिरोधक क्षमता और समान वृद्धि के लिए विशेष रूप से तैयार किया गया है।',
    benefits: [
      { icon: Leaf, title: 'High Quality', hindi: 'उत्तम गुणवत्ता' },
      { icon: ShieldCheck, title: 'Balanced Nutrition', hindi: 'संतुलित पोषण' },
      { icon: HeartPulse, title: 'Strong Immunity', hindi: 'मजबूत रोग प्रतिरोधक क्षमता' },
      { icon: TrendingUp, title: 'Better Growth', hindi: 'बेहतर वृद्धि' },
    ],
    keyPoints: [
      'उच्च गुणवत्ता वाले कच्चे माल से निर्मित',
      'पाचन में आसान और पोषक तत्वों से भरपूर',
      'रोग प्रतिरोधक क्षमता को बढ़ाए',
      'बेहतर वजन वृद्धि के लिए सहायक',
      'कम मृत्यु दर, अधिक लाभ',
    ],
    nutrition: [
      { label: 'Crude Protein (Min.)', value: '22.00%' },
      { label: 'Crude Fat (Min.)', value: '5.00%' },
      { label: 'Crude Fiber (Max.)', value: '4.00%' },
      { label: 'Moisture (Max.)', value: '10.00%' },
      { label: 'Calcium (Min.)', value: '1.00%' },
      { label: 'Phosphorus (Min.)', value: '0.45%' },
    ],
    feedingMethod: '0-10 दिन तक चूजों को दिन में 24 घंटे स्वच्छ फीड उपलब्ध कराएं। साथ में हमेशा साफ और ठंडा पानी रखें।',
  },
  {
    id: 'starter',
    name: 'AKBS Starter Feed',
    hindi: 'स्टार्टर फीड',
    age: '11-25 Days',
    tagline: 'तेज़ ग्रोथ, बेहतर सेहत',
    subTagline: 'Faster Growth, Better Health',
    accent: '#B91C1C',
    accentLight: '#FEE2E2',
    gradient: 'from-red-600 via-red-700 to-red-900',
    bgSoft: 'bg-red-50',
    ring: 'ring-red-500/30',
    image: 'https://customer-assets-0z36b82j.emergentagent.net/job_akbs-corporate-site/artifacts/1fm8s15f_STARTER.png',
    weight: '50 kg',
    description: 'Balanced feed for the critical 11-25 day growth phase delivering optimum FCR, superior digestion and healthy weight gain.',
    hindiDescription: 'यह फीड 11 से 25 दिन की उम्र के चूजों के लिए विशेष रूप से तैयार किया गया है। यह संपूर्ण और संतुलित पोषण प्रदान करता है, जिससे चूजों की बेहतर वृद्धि, पाचन शक्ति और रोग प्रतिरोधक क्षमता मजबूत होती है।',
    benefits: [
      { icon: Leaf, title: 'High Quality', hindi: 'उत्तम गुणवत्ता' },
      { icon: ShieldCheck, title: 'Balanced Nutrition', hindi: 'संतुलित पोषण' },
      { icon: Utensils, title: 'Better Digestion', hindi: 'बेहतर पाचन' },
      { icon: HeartPulse, title: 'Strong Immunity', hindi: 'मजबूत रोग प्रतिरोधक क्षमता' },
    ],
    keyPoints: [
      'तेज और समान वृद्धि में सहायक',
      'पाचन में सुधार और पोषक तत्वों का बेहतर अवशोषण',
      'फीड कन्वर्जन रेश्यो (FCR) में सुधार',
      'रोग प्रतिरोधक क्षमता को बढ़ाए',
      'स्वस्थ आंत, बेहतर वजन और अधिक मुनाफा',
    ],
    nutrition: [
      { label: 'Crude Protein (Min.)', value: '20.00%' },
      { label: 'Crude Fat (Min.)', value: '5.00%' },
      { label: 'Crude Fiber (Max.)', value: '4.00%' },
      { label: 'Moisture (Max.)', value: '10.00%' },
      { label: 'Calcium (Min.)', value: '1.00%' },
      { label: 'Phosphorus (Min.)', value: '0.45%' },
    ],
    feedingMethod: '11 से 25 दिन तक चूजों को दिन में 24 घंटे स्वच्छ फीड और साफ पानी उपलब्ध कराएं। हमेशा फीड और पानी ताजा रखें।',
  },
  {
    id: 'finisher',
    name: 'AKBS Finisher Feed',
    hindi: 'फिनिशर फीड',
    age: '26 Days to Market',
    tagline: 'ज़्यादा वजन, ज़्यादा मुनाफा',
    subTagline: 'More Weight, More Profit',
    accent: '#1E40AF',
    accentLight: '#DBEAFE',
    gradient: 'from-blue-700 via-blue-800 to-blue-950',
    bgSoft: 'bg-blue-50',
    ring: 'ring-blue-500/30',
    image: 'https://customer-assets-0z36b82j.emergentagent.net/job_akbs-corporate-site/artifacts/jl7lq9ne_POULTRY%20FEED-.png',
    weight: '50 kg',
    description: 'High-energy finisher feed for 26 days to market delivering maximum body weight, premium FCR and top-grade market-ready broilers.',
    hindiDescription: 'यह फीड 26 दिन के बाद से बाजार तक की अवधि के लिए विशेष रूप से तैयार किया गया है। यह तेजी से वजन बढ़ाने, बेहतर फीड कन्वर्जन और मांस की गुणवत्ता सुधारने में मदद करता है।',
    benefits: [
      { icon: Leaf, title: 'High Quality', hindi: 'उत्तम गुणवत्ता' },
      { icon: TrendingUp, title: 'Maximum Growth', hindi: 'अधिकतम वृद्धि' },
      { icon: LineChart, title: 'Better Feed Conversion', hindi: 'बेहतर फीड रूपांतरण' },
      { icon: Star, title: 'Premium Results', hindi: 'उत्कृष्ट परिणाम' },
    ],
    keyPoints: [
      'तेजी से वजन वृद्धि और बेहतर बॉडी डेवलपमेंट',
      'फीड का सर्वोत्तम उपयोग (FCR) में सुधार',
      'मजबूत इम्युनिटी और स्वस्थ पक्षी',
      'बाजार तक पहुंचने के समय अधिक मुनाफा',
    ],
    nutrition: [
      { label: 'Crude Protein (Min.)', value: '18.00%' },
      { label: 'Crude Fat (Min.)', value: '4.50%' },
      { label: 'Crude Fiber (Max.)', value: '5.00%' },
      { label: 'Moisture (Max.)', value: '10.00%' },
      { label: 'Calcium (Min.)', value: '1.00%' },
      { label: 'Phosphorus (Min.)', value: '0.45%' },
    ],
    feedingMethod: '26 दिन के बाद से बाजार तक पक्षियों को दिन में 2-3 बार फीड दें। हमेशा साफ और ताजा पानी उपलब्ध रखें।',
  },
];

const COMMON_INGREDIENTS = 'Maize, Soybean Meal, Rice DDGS, Fish Meal, Wheat, Milk Products, Vegetable Oil, Minerals, Vitamins, Amino Acids, Enzymes, Antioxidants & Mycotoxin Binder.';

const QUALITY_PROMISES = [
  { icon: Leaf, label: '100% Natural', desc: 'Sourced from premium raw materials' },
  { icon: ShieldCheck, label: 'No Harmful Chemicals', desc: 'Safe formulation for healthy birds' },
  { icon: FlaskConical, label: 'Scientifically Formulated', desc: 'Laboratory-tested nutritional balance' },
  { icon: Package, label: 'Premium Quality Feed', desc: 'Consistent quality every batch' },
];

const TURNKEY_SOLUTIONS = [
  { icon: Building2, title: 'Farm Planning & Design' },
  { icon: Factory, title: 'EC & Semi-EC Poultry Sheds' },
  { icon: HardHat, title: 'Civil Construction' },
  { icon: Cog, title: 'Equipment Supply & Installation' },
  { icon: Droplets, title: 'Automatic Feeding & Drinking Systems' },
  { icon: ThermometerSun, title: 'Climate Control Systems' },
  { icon: FileCheck, title: 'Loan Assistance' },
  { icon: Handshake, title: 'Technical Support' },
  { icon: Users, title: 'Integration & Project Consultancy' },
];

const INTEGRATION_SERVICES = [
  { icon: Handshake, title: 'Contract Farming Support', desc: 'End-to-end contract farming partnerships with birds, feed and technical support.' },
  { icon: Users, title: 'Company Integration', desc: 'Bridging farmers and poultry companies for seamless collaboration.' },
  { icon: FileCheck, title: 'Documentation & Legal Support', desc: 'Complete documentation, permits and compliance handling.' },
  { icon: Target, title: 'End-to-End Project Support', desc: 'From planning to production, we manage every project stage.' },
];

const WHY_AKBS = [
  { icon: Sparkles, title: 'Complete Turnkey Solutions' },
  { icon: Zap, title: 'Modern Technology & Automation' },
  { icon: Award, title: 'Premium Quality Feed' },
  { icon: Users, title: 'Expert Team & Technical Support' },
  { icon: Truck, title: 'On-Time Delivery & Transparency' },
  { icon: Handshake, title: 'Long-Term Partnership' },
];

function ProductHeader() {
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
            <a key={l.name} href={l.href} className={`px-3 py-2 text-sm font-semibold rounded-full transition ${l.name === 'Products' ? (scrolled ? 'text-akbs-green' : 'text-akbs-gold') : (scrolled ? 'text-akbs-ink hover:text-akbs-green' : 'text-white/90 hover:text-white')}`}>
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

function ProductCard({ p, idx }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <motion.div id={p.id} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
      className={`grid lg:grid-cols-12 gap-6 items-center ${idx % 2 === 1 ? 'lg:[direction:rtl]' : ''}`}>
      {/* Bag Image */}
      <div className="lg:col-span-5 lg:[direction:ltr]">
        <div className="relative">
          <div className={`absolute inset-0 rounded-[40px] blur-3xl opacity-30 bg-gradient-to-br ${p.gradient}`} />
          <div className="relative bg-white rounded-[32px] p-6 shadow-luxury-lg border border-black/5 overflow-hidden">
            <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${p.gradient}`} />
            <div className="flex items-center justify-between mb-4">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-white bg-gradient-to-r ${p.gradient} shadow-md`}>
                <Sparkles className="h-3 w-3" /> {p.age}
              </span>
              <span className="text-xs font-bold text-akbs-ink/40">{p.weight}</span>
            </div>
            <img src={p.image} alt={p.name} className="w-full h-auto object-contain max-h-[500px] mx-auto" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="lg:col-span-7 lg:[direction:ltr]">
        <div className="inline-flex items-center gap-2 mb-3">
          <div className="h-[2px] w-8 rounded-full" style={{ backgroundColor: p.accent }} />
          <span className="text-xs font-bold tracking-[0.25em] uppercase" style={{ color: p.accent }}>Product 0{idx + 1}</span>
        </div>
        <h2 className="font-heading font-extrabold text-3xl md:text-5xl text-akbs-dark leading-tight mb-2">{p.name}</h2>
        <div className="text-xl md:text-2xl font-heading font-bold mb-4" style={{ color: p.accent }}>{p.hindi} <span className="text-akbs-ink/60 text-base font-medium">({p.age})</span></div>

        <div className="mb-5 p-4 rounded-2xl border" style={{ backgroundColor: p.accentLight, borderColor: `${p.accent}30` }}>
          <div className="font-heading font-extrabold text-lg mb-0.5" style={{ color: p.accent }}>{p.tagline}</div>
          <div className="text-sm font-semibold text-akbs-ink/70">{p.subTagline}</div>
        </div>

        <p className="text-sm md:text-base text-akbs-ink/80 leading-relaxed mb-3">{p.description}</p>
        <p className="text-sm text-akbs-ink/60 leading-relaxed mb-6">{p.hindiDescription}</p>

        {/* Benefits */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mb-6">
          {p.benefits.map((b) => (
            <div key={b.title} className="bg-white rounded-2xl p-3 border border-black/5 hover:shadow-md transition-all">
              <div className="h-10 w-10 rounded-xl flex items-center justify-center mb-2" style={{ backgroundColor: p.accentLight }}>
                <b.icon className="h-5 w-5" style={{ color: p.accent }} strokeWidth={2.2} />
              </div>
              <div className="font-heading font-extrabold text-xs text-akbs-dark leading-tight">{b.title}</div>
              <div className="text-[10px] text-akbs-ink/60 font-medium leading-tight mt-0.5">{b.hindi}</div>
            </div>
          ))}
        </div>

        {/* Flip toggle - Key Points vs Nutrition Facts */}
        <div className="bg-akbs-bg rounded-2xl border border-black/5 overflow-hidden mb-5">
          <div className="flex">
            <button onClick={() => setFlipped(false)} className={`flex-1 px-4 py-3 text-xs font-bold uppercase tracking-wider transition ${!flipped ? 'text-white' : 'text-akbs-ink/60 hover:text-akbs-dark'}`}
              style={!flipped ? { backgroundColor: p.accent } : {}}>
              प्रमुख लाभ / Key Benefits
            </button>
            <button onClick={() => setFlipped(true)} className={`flex-1 px-4 py-3 text-xs font-bold uppercase tracking-wider transition ${flipped ? 'text-white' : 'text-akbs-ink/60 hover:text-akbs-dark'}`}
              style={flipped ? { backgroundColor: p.accent } : {}}>
              पोषक तत्व / Nutrition Facts
            </button>
          </div>
          <div className="p-5">
            {!flipped ? (
              <ul className="space-y-2">
                {p.keyPoints.map((k, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" style={{ color: p.accent }} />
                    <span className="text-sm text-akbs-ink/80 leading-relaxed">{k}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                {p.nutrition.map((n) => (
                  <div key={n.label} className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-black/5">
                    <span className="text-xs font-semibold text-akbs-ink/70">{n.label}</span>
                    <span className="font-heading font-extrabold text-sm" style={{ color: p.accent }}>{n.value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Feeding method */}
        <div className="p-4 rounded-2xl bg-white border border-black/5 mb-6">
          <div className="text-[10px] font-bold tracking-widest uppercase mb-1" style={{ color: p.accent }}>खिलाने का तरीका / Feeding Method</div>
          <div className="text-sm text-akbs-ink/70 leading-relaxed">{p.feedingMethod}</div>
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap gap-3">
          <a href={`https://wa.me/${WA_NUMBER}?text=Hello%20AKBS%2C%20I%20am%20interested%20in%20${encodeURIComponent(p.name)}.`} target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-semibold shadow-luxury hover:scale-105 transition-transform"
            style={{ background: `linear-gradient(135deg, ${p.accent}, ${p.accent}CC)` }}>
            <MessageCircle className="h-4 w-4" /> Enquire on WhatsApp
          </a>
          <a href="/#contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border-2 text-akbs-dark font-semibold hover:scale-105 transition-transform" style={{ borderColor: p.accent, color: p.accent }}>
            <Phone className="h-4 w-4" /> Request Quote
          </a>
        </div>
      </div>
    </motion.div>
  );
}

function ProductsPage() {
  return (
    <main className="bg-akbs-bg">
      <ProductHeader />

      {/* Hero */}
      <section className="relative pt-32 pb-16 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-akbs-dark via-akbs-green to-akbs-dark" />
        <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-akbs-gold/20 blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-akbs-green/40 blur-3xl" />
        <div className="absolute inset-0 opacity-15">
          <img src="https://images.pexels.com/photos/17064389/pexels-photo-17064389.jpeg?auto=compress&cs=tinysrgb&w=2000" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative container mx-auto z-10">
          <a href="/" className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-dark text-white text-xs font-semibold mb-6 hover:scale-105 transition-transform">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Home
          </a>
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-dark mb-5">
              <Sparkles className="h-4 w-4 text-akbs-gold" />
              <span className="text-akbs-gold text-xs font-semibold tracking-[0.2em] uppercase">AKBS Poultry Feed</span>
            </div>
            <h1 className="font-heading font-black text-white text-4xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight mb-4">
              <span className="text-gradient-gold">Complete Poultry</span><br/>
              Feed Range
            </h1>
            <p className="text-akbs-gold text-lg md:text-xl font-semibold mb-3">स्वस्थ मुर्गी • बेहतर अंडे • अधिक मुनाफा</p>
            <p className="text-white/85 text-base md:text-lg max-w-2xl leading-relaxed mb-8">
              Scientifically formulated poultry feed for every stage of broiler growth — from Pre-Starter through Finisher — designed to deliver better growth, better FCR, better health and better profit.
            </p>

            {/* Quality promises */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 max-w-3xl">
              {QUALITY_PROMISES.map((q) => (
                <div key={q.label} className="glass-dark rounded-2xl p-3.5 border border-akbs-gold/20">
                  <q.icon className="h-5 w-5 text-akbs-gold mb-2" strokeWidth={2} />
                  <div className="font-heading font-extrabold text-white text-sm leading-tight">{q.label}</div>
                  <div className="text-white/60 text-[10px] mt-0.5 leading-snug">{q.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Product Range Overview */}
      <section className="py-14 md:py-16 bg-white">
        <div className="container mx-auto">
          <div className="max-w-2xl mx-auto text-center mb-10">
            <div className="inline-flex items-center gap-2 mb-3">
              <div className="h-[2px] w-8 bg-akbs-gold" />
              <span className="text-xs font-bold tracking-[0.25em] text-akbs-green uppercase">Product Range</span>
            </div>
            <h2 className="font-heading font-extrabold text-3xl md:text-5xl text-akbs-dark mb-4">Three <span className="text-gradient-gold">Growth Stages</span>, One Trusted Brand</h2>
            <p className="text-akbs-ink/60">From day-old chicks to market-ready broilers, AKBS feed nourishes every stage of poultry life.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {PRODUCTS.map((p, i) => (
              <motion.a key={p.id} href={`#${p.id}`} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ y: -8 }}
                className="group bg-white rounded-3xl shadow-luxury border border-black/5 overflow-hidden cursor-pointer">
                <div className={`h-2 bg-gradient-to-r ${p.gradient}`} />
                <div className={`aspect-square p-6 flex items-center justify-center ${p.bgSoft} relative overflow-hidden`}>
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white shadow-md text-[10px] font-bold uppercase tracking-widest" style={{ color: p.accent }}>{p.age}</div>
                  <img src={p.image} alt={p.name} className="max-h-full w-auto object-contain group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <h3 className="font-heading font-extrabold text-xl text-akbs-dark mb-1">{p.name}</h3>
                  <div className="text-sm font-semibold mb-3" style={{ color: p.accent }}>{p.hindi}</div>
                  <div className="text-sm text-akbs-ink/70 leading-relaxed mb-4 line-clamp-2">{p.description}</div>
                  <div className="flex items-center justify-between pt-4 border-t border-akbs-bg">
                    <span className="text-xs font-bold text-akbs-ink/50">Protein {p.nutrition[0].value}</span>
                    <span className="inline-flex items-center gap-1 text-xs font-bold group-hover:gap-2 transition-all" style={{ color: p.accent }}>View Details <ArrowRight className="h-3.5 w-3.5" /></span>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Product Sections */}
      <section className="py-16 md:py-24 bg-akbs-bg">
        <div className="container mx-auto space-y-24">
          {PRODUCTS.map((p, i) => (
            <ProductCard key={p.id} p={p} idx={i} />
          ))}
        </div>
      </section>

      {/* Common Ingredients & Storage */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto">
          <div className="max-w-2xl mx-auto text-center mb-10">
            <div className="inline-flex items-center gap-2 mb-3">
              <div className="h-[2px] w-8 bg-akbs-gold" />
              <span className="text-xs font-bold tracking-[0.25em] text-akbs-green uppercase">Ingredients & Storage</span>
            </div>
            <h2 className="font-heading font-extrabold text-3xl md:text-5xl text-akbs-dark mb-4">Premium <span className="text-gradient-gold">Composition</span></h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <div className="bg-akbs-bg rounded-3xl p-8 border border-black/5">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 rounded-2xl btn-gradient-green flex items-center justify-center shadow-md">
                  <Wheat className="h-6 w-6 text-akbs-gold" strokeWidth={2} />
                </div>
                <h3 className="font-heading font-extrabold text-xl text-akbs-dark">Ingredients</h3>
              </div>
              <p className="text-sm text-akbs-ink/70 leading-relaxed">{COMMON_INGREDIENTS}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {['Maize', 'Soybean Meal', 'Rice DDGS', 'Fish Meal', 'Wheat', 'Vitamins', 'Enzymes', 'Antioxidants'].map((t) => (
                  <span key={t} className="px-2.5 py-1 rounded-full bg-white text-akbs-green text-[10px] font-bold border border-akbs-green/20">{t}</span>
                ))}
              </div>
            </div>

            <div className="bg-akbs-bg rounded-3xl p-8 border border-black/5">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 rounded-2xl btn-gradient-gold flex items-center justify-center shadow-md">
                  <Package className="h-6 w-6 text-akbs-dark" strokeWidth={2} />
                </div>
                <h3 className="font-heading font-extrabold text-xl text-akbs-dark">Storage & Precautions</h3>
              </div>
              <ul className="space-y-2.5 text-sm text-akbs-ink/70">
                <li className="flex items-start gap-2"><Sun className="h-4 w-4 text-akbs-gold shrink-0 mt-0.5" /><span>Store in a cool, dry and hygienic place. Keep away from direct sunlight.</span></li>
                <li className="flex items-start gap-2"><Clock className="h-4 w-4 text-akbs-gold shrink-0 mt-0.5" /><span>Use before 45 days after opening for optimum freshness.</span></li>
                <li className="flex items-start gap-2"><Droplets className="h-4 w-4 text-akbs-gold shrink-0 mt-0.5" /><span>पानी से दूर रखें and keep the bag sealed when not in use.</span></li>
                <li className="flex items-start gap-2"><ShieldCheck className="h-4 w-4 text-akbs-gold shrink-0 mt-0.5" /><span>Best before 45 days from the date of packing.</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Turnkey Poultry Farm Solutions */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-akbs-dark via-akbs-green to-akbs-dark relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-akbs-gold/20 blur-3xl" />
        <div className="container mx-auto relative">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-3">
              <div className="h-[2px] w-8 bg-akbs-gold" />
              <span className="text-xs font-bold tracking-[0.25em] text-akbs-gold uppercase">Turnkey Solutions</span>
            </div>
            <h2 className="font-heading font-extrabold text-3xl md:text-5xl text-white mb-4">Complete <span className="text-gradient-gold">Poultry Ecosystem</span></h2>
            <p className="text-white/70">From farm planning to premium feed — everything under one roof.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {TURNKEY_SOLUTIONS.map((t, i) => (
              <motion.div key={t.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} whileHover={{ y: -4 }}
                className="glass-dark rounded-2xl p-5 flex items-center gap-4 hover:border-akbs-gold/60 transition-all group">
                <div className="h-12 w-12 rounded-xl btn-gradient-gold flex items-center justify-center shrink-0 shadow-md">
                  <t.icon className="h-6 w-6 text-akbs-dark" strokeWidth={2.2} />
                </div>
                <div className="font-heading font-extrabold text-white text-sm leading-tight">{t.title}</div>
                <CheckCircle2 className="h-5 w-5 text-akbs-gold ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration & Support Services */}
      <section className="py-16 md:py-20 bg-akbs-bg">
        <div className="container mx-auto">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-3">
              <div className="h-[2px] w-8 bg-akbs-gold" />
              <span className="text-xs font-bold tracking-[0.25em] text-akbs-green uppercase">AKBS Integration & Support Services</span>
            </div>
            <h2 className="font-heading font-extrabold text-3xl md:text-5xl text-akbs-dark mb-4">Bridging Farmers & <span className="text-gradient-gold">Poultry Companies</span></h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {INTEGRATION_SERVICES.map((s, i) => (
              <motion.div key={s.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} whileHover={{ y: -6 }}
                className="bg-white rounded-3xl p-6 shadow-luxury border border-black/5 hover:border-akbs-gold/40 transition-all">
                <div className="h-14 w-14 rounded-2xl btn-gradient-green flex items-center justify-center mb-4 shadow-md">
                  <s.icon className="h-7 w-7 text-akbs-gold" strokeWidth={2} />
                </div>
                <h3 className="font-heading font-extrabold text-lg text-akbs-dark mb-2 leading-tight">{s.title}</h3>
                <p className="text-sm text-akbs-ink/60 leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose AKBS */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-3">
              <div className="h-[2px] w-8 bg-akbs-gold" />
              <span className="text-xs font-bold tracking-[0.25em] text-akbs-green uppercase">Why Choose AKBS</span>
            </div>
            <h2 className="font-heading font-extrabold text-3xl md:text-5xl text-akbs-dark mb-4">Building Better Farms • <span className="text-gradient-gold">Better Birds • Better Returns</span></h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
            {WHY_AKBS.map((w, i) => (
              <motion.div key={w.title} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} whileHover={{ y: -4 }}
                className="bg-akbs-bg rounded-2xl p-5 text-center border border-black/5 hover:border-akbs-gold/40 hover:shadow-md transition-all">
                <div className="h-14 w-14 mx-auto rounded-2xl border-2 border-akbs-gold/40 flex items-center justify-center mb-3 bg-white">
                  <w.icon className="h-6 w-6 text-akbs-gold" strokeWidth={1.8} />
                </div>
                <div className="font-heading font-extrabold text-xs text-akbs-dark leading-tight">{w.title}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Manufacturing Details */}
      <section className="py-16 md:py-20 bg-akbs-bg">
        <div className="container mx-auto max-w-5xl">
          <div className="bg-white rounded-[32px] shadow-luxury-lg overflow-hidden">
            <div className="btn-gradient-green px-8 py-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-xl bg-white/15 flex items-center justify-center border border-akbs-gold/40">
                  <Factory className="h-5 w-5 text-akbs-gold" />
                </div>
                <div>
                  <div className="text-akbs-gold text-[10px] font-bold tracking-widest uppercase">Manufactured & Marketed By</div>
                  <div className="font-heading font-extrabold text-white text-lg">AKBS Poultry Feed</div>
                </div>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-akbs-gold/20 border border-akbs-gold/40 text-akbs-gold text-[10px] font-bold">
                <ShieldCheck className="h-3 w-3" /> Made in India
              </div>
            </div>
            <div className="p-6 md:p-8 grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-xl bg-akbs-green/10 flex items-center justify-center shrink-0">
                  <MapPin className="h-5 w-5 text-akbs-green" />
                </div>
                <div>
                  <div className="text-[10px] font-bold tracking-widest text-akbs-green uppercase mb-1">Manufacturing Address</div>
                  <div className="font-heading font-bold text-akbs-dark text-sm leading-relaxed">{MANUFACTURING_ADDRESS}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-xl bg-akbs-green/10 flex items-center justify-center shrink-0">
                  <Phone className="h-5 w-5 text-akbs-green" />
                </div>
                <div>
                  <div className="text-[10px] font-bold tracking-widest text-akbs-green uppercase mb-1">Order & Inquiry</div>
                  <a href={`tel:${PHONE.replace(/\s/g, '')}`} className="font-heading font-bold text-akbs-dark text-sm hover:text-akbs-green">{PHONE}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto">
          <div className="bg-gradient-to-r from-akbs-dark via-akbs-green to-akbs-dark rounded-[32px] p-8 md:p-14 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-akbs-gold/20 blur-3xl" />
            <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <div className="text-akbs-gold text-[10px] font-bold tracking-[0.25em] uppercase mb-2">Ready to Order?</div>
                <h3 className="font-heading font-extrabold text-white text-2xl md:text-4xl leading-tight max-w-xl">
                  Feed your birds the <span className="text-gradient-gold">AKBS way.</span>
                </h3>
                <p className="text-white/70 mt-2 max-w-xl">Contact us for bulk orders, dealer opportunities and technical guidance.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a href={`https://wa.me/${WA_NUMBER}?text=Hello%20AKBS%2C%20I%20want%20to%20order%20AKBS%20Poultry%20Feed.`} target="_blank" rel="noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#25D366] text-white font-semibold shadow-luxury hover:scale-105 transition-transform">
                  <MessageCircle className="h-4 w-4" /> Order on WhatsApp
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
      <footer className="bg-akbs-dark text-white py-10 relative overflow-hidden">
        <div className="container mx-auto text-center relative">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center relative">
              <Leaf className="h-6 w-6 text-akbs-green" strokeWidth={2.5} />
              <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-akbs-gold flex items-center justify-center">
                <Bird className="h-2.5 w-2.5 text-akbs-dark" strokeWidth={3} />
              </div>
            </div>
            <div className="text-left leading-tight">
              <div className="font-heading font-extrabold">AKBS POULTRY FEED</div>
              <div className="text-[9px] font-semibold tracking-[0.15em] text-white/70">स्वस्थ मुर्गी • बेहतर अंडे • अधिक मुनाफा</div>
            </div>
          </div>
          <div className="text-xs text-white/50">© 2026 AKBS Poultry Farming Private Limited. All Rights Reserved.</div>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <a href={`https://wa.me/${WA_NUMBER}?text=Hello%20AKBS%2C%20I%20want%20to%20know%20more%20about%20AKBS%20Poultry%20Feed.`} target="_blank" rel="noreferrer"
        className="group fixed bottom-6 right-6 z-40 flex items-center gap-3">
        <span className="hidden md:inline-block bg-white text-akbs-dark text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all">Order on WhatsApp</span>
        <span className="relative h-14 w-14 rounded-full bg-[#25D366] shadow-luxury-lg flex items-center justify-center hover:scale-110 transition-transform animate-float">
          <MessageCircle className="h-6 w-6 text-white" fill="currentColor" />
          <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
          <span className="absolute -top-1 -right-1 bg-akbs-gold text-akbs-dark text-[8px] font-black px-1.5 py-0.5 rounded-full shadow-md">BIZ</span>
        </span>
      </a>
    </main>
  );
}

export default ProductsPage;
