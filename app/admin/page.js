'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Inbox, Search, LogOut, Mail, Phone, Calendar, Trash2, Archive, CheckCircle2,
  Reply, MailOpen, Filter, X, Loader2, Leaf, Bird, RefreshCw, AlertCircle,
  MessageSquare, TrendingUp, Users, Clock, ExternalLink, Copy
} from 'lucide-react';

const STATUS_META = {
  new: { label: 'New', color: 'bg-blue-100 text-blue-700 border-blue-200', dot: 'bg-blue-500' },
  read: { label: 'Read', color: 'bg-yellow-100 text-yellow-700 border-yellow-200', dot: 'bg-yellow-500' },
  replied: { label: 'Replied', color: 'bg-emerald-100 text-emerald-700 border-emerald-200', dot: 'bg-emerald-500' },
  archived: { label: 'Archived', color: 'bg-slate-100 text-slate-600 border-slate-200', dot: 'bg-slate-400' },
};

function AdminDashboard() {
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [inquiries, setInquiries] = useState([]);
  const [stats, setStats] = useState({ total: 0, new: 0, read: 0, replied: 0, archived: 0, thisWeek: 0 });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selected, setSelected] = useState(null);
  const [noteDraft, setNoteDraft] = useState('');
  const [error, setError] = useState('');

  // Guard
  useEffect(() => {
    const t = typeof window !== 'undefined' ? localStorage.getItem('akbs_admin_token') : null;
    if (!t) { router.replace('/admin/login'); return; }
    setToken(t);
  }, [router]);

  const authHeaders = useMemo(() => (token ? { Authorization: `Bearer ${token}` } : {}), [token]);

  const loadInquiries = async () => {
    if (!token) return;
    setRefreshing(true);
    setError('');
    try {
      const res = await fetch('/api/admin/inquiries', { headers: authHeaders });
      if (res.status === 401) {
        localStorage.removeItem('akbs_admin_token');
        router.replace('/admin/login');
        return;
      }
      const data = await res.json();
      setInquiries(data.inquiries || []);
      setStats(data.stats || { total: 0, new: 0, read: 0, replied: 0, archived: 0, thisWeek: 0 });
    } catch (e) {
      setError('Failed to load inquiries');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => { if (token) loadInquiries(); }, [token]);

  const updateInquiry = async (id, patch) => {
    try {
      const res = await fetch(`/api/admin/inquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', ...authHeaders },
        body: JSON.stringify(patch),
      });
      if (!res.ok) throw new Error();
      setInquiries((prev) => prev.map((i) => (i.id === id ? { ...i, ...patch } : i)));
      if (selected?.id === id) setSelected((s) => ({ ...s, ...patch }));
      // refresh stats silently
      loadInquiries();
    } catch { setError('Update failed'); }
  };

  const removeInquiry = async (id) => {
    if (!confirm('Delete this inquiry permanently?')) return;
    try {
      const res = await fetch(`/api/admin/inquiries/${id}`, { method: 'DELETE', headers: authHeaders });
      if (!res.ok) throw new Error();
      setInquiries((prev) => prev.filter((i) => i.id !== id));
      if (selected?.id === id) setSelected(null);
      loadInquiries();
    } catch { setError('Delete failed'); }
  };

  const logout = () => {
    localStorage.removeItem('akbs_admin_token');
    router.replace('/admin/login');
  };

  const filtered = useMemo(() => {
    return inquiries.filter((i) => {
      const okStatus = statusFilter === 'all' || i.status === statusFilter;
      const q = search.trim().toLowerCase();
      const okSearch = !q ||
        i.name?.toLowerCase().includes(q) ||
        i.email?.toLowerCase().includes(q) ||
        i.phone?.includes(q) ||
        i.message?.toLowerCase().includes(q);
      return okStatus && okSearch;
    });
  }, [inquiries, statusFilter, search]);

  const openInquiry = (inq) => {
    setSelected(inq);
    setNoteDraft(inq.note || '');
    if (inq.status === 'new') updateInquiry(inq.id, { status: 'read' });
  };

  const formatDate = (iso) => {
    try {
      const d = new Date(iso);
      return d.toLocaleString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true });
    } catch { return iso; }
  };

  const copy = (text) => { navigator.clipboard?.writeText(text); };

  const STAT_CARDS = [
    { label: 'Total Inquiries', value: stats.total, icon: Inbox, color: 'from-akbs-green to-akbs-dark' },
    { label: 'New / Unread', value: stats.new, icon: AlertCircle, color: 'from-blue-500 to-blue-700' },
    { label: 'Replied', value: stats.replied, icon: CheckCircle2, color: 'from-emerald-500 to-emerald-700' },
    { label: 'This Week', value: stats.thisWeek, icon: TrendingUp, color: 'from-akbs-gold to-amber-600' },
  ];

  const FILTERS = [
    { key: 'all', label: 'All', count: stats.total },
    { key: 'new', label: 'New', count: stats.new },
    { key: 'read', label: 'Read', count: stats.read },
    { key: 'replied', label: 'Replied', count: stats.replied },
    { key: 'archived', label: 'Archived', count: stats.archived },
  ];

  if (!token || loading) {
    return (
      <main className="min-h-screen bg-akbs-bg flex items-center justify-center">
        <div className="flex items-center gap-3 text-akbs-green">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span className="font-semibold">Loading admin panel...</span>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-akbs-bg">
      {/* Top Bar */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-xl border-b border-black/5 shadow-sm">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 rounded-xl btn-gradient-green flex items-center justify-center">
              <Leaf className="h-5 w-5 text-akbs-gold" strokeWidth={2.5} />
              <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-akbs-gold flex items-center justify-center">
                <Bird className="h-2.5 w-2.5 text-akbs-dark" strokeWidth={3} />
              </div>
            </div>
            <div className="leading-tight">
              <div className="font-heading font-extrabold text-akbs-dark">AKBS Admin</div>
              <div className="text-[10px] font-semibold tracking-widest text-akbs-green/70 uppercase">Inquiry Control Panel</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={loadInquiries} className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-akbs-bg text-akbs-ink text-sm font-semibold hover:bg-akbs-green/10 transition" title="Refresh">
              <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
              <span className="hidden md:inline">Refresh</span>
            </button>
            <a href="/" className="hidden md:inline-flex items-center gap-2 px-3 py-2 rounded-full bg-akbs-bg text-akbs-ink text-sm font-semibold hover:bg-akbs-green/10 transition">
              <ExternalLink className="h-4 w-4" /> View Site
            </a>
            <button onClick={logout} className="inline-flex items-center gap-2 px-3 py-2 rounded-full btn-gradient-green text-white text-sm font-semibold shadow-md hover:scale-105 transition-transform">
              <LogOut className="h-4 w-4" /> <span className="hidden md:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-6 md:py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6">
          {STAT_CARDS.map((c, i) => (
            <motion.div key={c.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
              className="bg-white rounded-2xl p-5 shadow-luxury border border-black/5 relative overflow-hidden">
              <div className={`absolute -top-8 -right-8 h-24 w-24 rounded-full bg-gradient-to-br ${c.color} opacity-15 blur-2xl`} />
              <div className="relative">
                <div className={`inline-flex h-11 w-11 rounded-xl bg-gradient-to-br ${c.color} items-center justify-center mb-3 shadow-md`}>
                  <c.icon className="h-5 w-5 text-white" strokeWidth={2.5} />
                </div>
                <div className="font-heading font-extrabold text-3xl text-akbs-dark leading-none">{c.value}</div>
                <div className="text-xs text-akbs-ink/60 font-medium mt-1">{c.label}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Filters + Search */}
        <div className="bg-white rounded-2xl border border-black/5 p-4 mb-4 flex flex-col md:flex-row md:items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-akbs-ink/40" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email, phone, or message…"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-akbs-bg border border-transparent focus:border-akbs-green focus:bg-white outline-none transition text-sm font-medium"
            />
          </div>
          <div className="flex flex-wrap gap-1.5">
            {FILTERS.map((f) => (
              <button key={f.key} onClick={() => setStatusFilter(f.key)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition ${statusFilter === f.key ? 'btn-gradient-green text-white border-transparent shadow-md' : 'bg-white border-akbs-bg text-akbs-ink hover:border-akbs-green/40'}`}>
                {f.label}
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${statusFilter === f.key ? 'bg-white/20' : 'bg-akbs-bg'}`}>{f.count}</span>
              </button>
            ))}
          </div>
        </div>

        {error && <div className="mb-4 px-4 py-2 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">{error}</div>}

        {/* Table + Detail */}
        <div className="grid lg:grid-cols-5 gap-4">
          <div className={`bg-white rounded-2xl border border-black/5 shadow-sm overflow-hidden ${selected ? 'lg:col-span-3' : 'lg:col-span-5'}`}>
            {filtered.length === 0 ? (
              <div className="p-16 text-center">
                <div className="h-16 w-16 rounded-2xl bg-akbs-bg mx-auto mb-4 flex items-center justify-center">
                  <Inbox className="h-8 w-8 text-akbs-ink/30" />
                </div>
                <div className="font-heading font-bold text-akbs-dark text-lg mb-1">No inquiries found</div>
                <div className="text-sm text-akbs-ink/60">Submissions from the contact form will appear here.</div>
              </div>
            ) : (
              <div className="divide-y divide-akbs-bg">
                {filtered.map((inq) => {
                  const meta = STATUS_META[inq.status] || STATUS_META.new;
                  const isActive = selected?.id === inq.id;
                  return (
                    <button key={inq.id} onClick={() => openInquiry(inq)}
                      className={`w-full text-left p-4 md:p-5 hover:bg-akbs-bg/60 transition-all group ${isActive ? 'bg-akbs-green/5 border-l-4 border-akbs-green' : 'border-l-4 border-transparent'}`}>
                      <div className="flex items-start gap-3">
                        <div className="h-10 w-10 rounded-full btn-gradient-green flex items-center justify-center shrink-0 shadow-md">
                          <span className="font-heading font-extrabold text-white text-sm">{(inq.name || '?').charAt(0).toUpperCase()}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <span className="font-heading font-bold text-akbs-dark truncate">{inq.name}</span>
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border ${meta.color}`}>
                              <span className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} />{meta.label}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 text-xs text-akbs-ink/60 mb-2 flex-wrap">
                            {inq.email && <span className="inline-flex items-center gap-1"><Mail className="h-3 w-3" />{inq.email}</span>}
                            {inq.phone && <span className="inline-flex items-center gap-1"><Phone className="h-3 w-3" />{inq.phone}</span>}
                            <span className="inline-flex items-center gap-1"><Calendar className="h-3 w-3" />{formatDate(inq.createdAt)}</span>
                          </div>
                          <p className="text-sm text-akbs-ink/70 line-clamp-2">{inq.message}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Detail Pane */}
          <AnimatePresence>
            {selected && (
              <motion.aside
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="lg:col-span-2 bg-white rounded-2xl border border-black/5 shadow-luxury p-5 md:p-6 lg:sticky lg:top-24 lg:self-start"
              >
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="h-12 w-12 rounded-full btn-gradient-green flex items-center justify-center shadow-md shrink-0">
                      <span className="font-heading font-extrabold text-white">{(selected.name || '?').charAt(0).toUpperCase()}</span>
                    </div>
                    <div className="min-w-0">
                      <div className="font-heading font-extrabold text-akbs-dark text-lg truncate">{selected.name}</div>
                      <div className="text-xs text-akbs-ink/50">{formatDate(selected.createdAt)}</div>
                    </div>
                  </div>
                  <button onClick={() => setSelected(null)} className="h-8 w-8 rounded-full bg-akbs-bg hover:bg-akbs-green/10 flex items-center justify-center shrink-0">
                    <X className="h-4 w-4 text-akbs-ink/60" />
                  </button>
                </div>

                <div className="space-y-2.5 mb-5 text-sm">
                  {selected.email && (
                    <div className="flex items-center justify-between gap-2 p-3 rounded-xl bg-akbs-bg">
                      <div className="flex items-center gap-2 min-w-0"><Mail className="h-4 w-4 text-akbs-green shrink-0" /><a href={`mailto:${selected.email}`} className="font-semibold text-akbs-dark truncate hover:text-akbs-green">{selected.email}</a></div>
                      <button onClick={() => copy(selected.email)} className="text-akbs-ink/40 hover:text-akbs-green shrink-0"><Copy className="h-3.5 w-3.5" /></button>
                    </div>
                  )}
                  {selected.phone && (
                    <div className="flex items-center justify-between gap-2 p-3 rounded-xl bg-akbs-bg">
                      <div className="flex items-center gap-2 min-w-0"><Phone className="h-4 w-4 text-akbs-green shrink-0" /><a href={`tel:${selected.phone}`} className="font-semibold text-akbs-dark truncate hover:text-akbs-green">{selected.phone}</a></div>
                      <div className="flex items-center gap-1 shrink-0">
                        <a href={`https://wa.me/${selected.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="text-xs px-2 py-1 rounded-full bg-[#25D366] text-white font-semibold hover:opacity-90">WhatsApp</a>
                        <button onClick={() => copy(selected.phone)} className="text-akbs-ink/40 hover:text-akbs-green"><Copy className="h-3.5 w-3.5" /></button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mb-5">
                  <div className="text-[10px] font-bold tracking-widest text-akbs-green uppercase mb-2">Message</div>
                  <div className="p-4 rounded-xl bg-akbs-bg/60 border border-akbs-bg text-sm text-akbs-ink/80 leading-relaxed whitespace-pre-wrap">{selected.message}</div>
                </div>

                <div className="mb-5">
                  <div className="text-[10px] font-bold tracking-widest text-akbs-green uppercase mb-2">Internal Note</div>
                  <textarea
                    rows={3}
                    value={noteDraft}
                    onChange={(e) => setNoteDraft(e.target.value)}
                    onBlur={() => { if (noteDraft !== (selected.note || '')) updateInquiry(selected.id, { note: noteDraft }); }}
                    placeholder="Add follow-up notes (auto-saves on blur)..."
                    className="w-full px-3 py-2.5 rounded-xl bg-akbs-bg border border-transparent focus:border-akbs-green focus:bg-white outline-none transition text-sm resize-none"
                  />
                </div>

                <div className="mb-5">
                  <div className="text-[10px] font-bold tracking-widest text-akbs-green uppercase mb-2">Status</div>
                  <div className="grid grid-cols-2 gap-2">
                    {['new', 'read', 'replied', 'archived'].map((s) => {
                      const meta = STATUS_META[s];
                      const active = selected.status === s;
                      return (
                        <button key={s} onClick={() => updateInquiry(selected.id, { status: s })}
                          className={`inline-flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-bold uppercase transition ${active ? 'btn-gradient-green text-white shadow-md' : 'bg-akbs-bg text-akbs-ink hover:bg-akbs-green/10'}`}>
                          <span className={`h-2 w-2 rounded-full ${meta.dot}`} /> {meta.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-akbs-bg">
                  {selected.email && (
                    <a href={`mailto:${selected.email}?subject=Re: Your inquiry to AKBS Poultry&body=Dear ${selected.name},%0D%0A%0D%0AThank you for reaching out to AKBS Poultry.%0D%0A%0D%0A`}
                      onClick={() => updateInquiry(selected.id, { status: 'replied' })}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full btn-gradient-green text-white text-xs font-bold shadow-md hover:scale-105 transition-transform">
                      <Reply className="h-3.5 w-3.5" /> Reply via Email
                    </a>
                  )}
                  <button onClick={() => updateInquiry(selected.id, { status: 'archived' })} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-akbs-bg text-akbs-ink text-xs font-bold hover:bg-slate-200 transition">
                    <Archive className="h-3.5 w-3.5" /> Archive
                  </button>
                  <button onClick={() => removeInquiry(selected.id)} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 text-red-700 text-xs font-bold hover:bg-red-100 transition">
                    <Trash2 className="h-3.5 w-3.5" /> Delete
                  </button>
                </div>
              </motion.aside>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}

export default AdminDashboard;
