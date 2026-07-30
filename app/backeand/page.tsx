"use client";

import { useState, useEffect } from "react";
import { Users, Activity, Globe, Monitor, Smartphone, Tablet, Clock, Filter, Search, Settings } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from "recharts";

const FILTERS = ["Live", "Today", "Last 7 Days", "Last 30 Days", "This Month", "All Time"];
const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"];

export default function AdminDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All Time");
  const [activeCountry, setActiveCountry] = useState("All");

  const fetchAnalytics = async () => {
    try {
      const res = await fetch(`/api/admin/analytics?filter=${activeFilter}&country=${activeCountry}`);
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch (err) {
      console.error("Failed to fetch analytics", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchAnalytics();
    
    // Poll every 10 seconds for real-time updates
    const interval = setInterval(fetchAnalytics, 10000);
    return () => clearInterval(interval);
  }, [activeFilter, activeCountry]);

  if (loading && !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#090D16]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 w-full h-screen h-[100dvh] overflow-y-auto bg-slate-50 dark:bg-[#090D16] text-slate-900 dark:text-slate-100 p-6 lg:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-[#0F172A] p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
          <div>
            <h1 className="text-2xl font-bold">Visitor Analytics</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Real-time overview of your website traffic.</p>
          </div>
          
          <div className="flex flex-col sm:flex-row flex-wrap items-center gap-3 w-full md:w-auto">
            {/* Filter Dropdown */}
            <div className="relative group w-full sm:w-auto">
              <div className="flex items-center gap-2 bg-slate-100 dark:bg-[#1E293B] px-4 py-3 sm:py-2 rounded-xl cursor-pointer w-full">
                <Clock className="w-4 h-4 text-slate-500" />
                <select 
                  value={activeFilter}
                  onChange={(e) => setActiveFilter(e.target.value)}
                  className="bg-transparent border-none outline-none text-sm font-medium cursor-pointer appearance-none pr-4"
                >
                  {FILTERS.map(f => <option key={f} value={f}>{f}</option>)}
                </select>
              </div>
            </div>

            {/* Country Dropdown */}
            <div className="relative group w-full sm:w-auto">
              <div className="flex items-center gap-2 bg-slate-100 dark:bg-[#1E293B] px-4 py-3 sm:py-2 rounded-xl cursor-pointer w-full">
                <Globe className="w-4 h-4 text-slate-500" />
                <select 
                  value={activeCountry}
                  onChange={(e) => setActiveCountry(e.target.value)}
                  className="bg-transparent border-none outline-none text-sm font-medium cursor-pointer appearance-none pr-4 max-w-[120px] truncate"
                >
                  <option value="All">All Countries</option>
                  {data?.availableCountries?.map((c: string) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            title="Total Visitors" 
            value={data?.totalVisitors || 0} 
            icon={<Users className="w-6 h-6 text-blue-500" />} 
            bg="bg-blue-50 dark:bg-blue-500/10"
          />
          <StatCard 
            title="Live Visitors" 
            value={data?.liveVisitors || 0} 
            icon={<Activity className="w-6 h-6 text-emerald-500 animate-pulse" />} 
            bg="bg-emerald-50 dark:bg-emerald-500/10"
          />
          <StatCard 
            title="Countries Reached" 
            value={data?.countries?.length || 0} 
            icon={<Globe className="w-6 h-6 text-amber-500" />} 
            bg="bg-amber-50 dark:bg-amber-500/10"
          />
          <StatCard 
            title="Top Device" 
            value={data?.devices ? [...data.devices].sort((a: any, b: any) => b.value - a.value)?.[0]?.name : "N/A"} 
            icon={<Smartphone className="w-6 h-6 text-purple-500" />} 
            bg="bg-purple-50 dark:bg-purple-500/10"
          />
        </div>

        {/* Site Settings Section */}
        <SiteSettingsSection />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Charts Area */}
          <div className="lg:col-span-2 space-y-6">
            
            <div className="bg-white dark:bg-[#0F172A] rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
              <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <Globe className="w-5 h-5 text-primary" /> Traffic by Country
              </h2>
              <div className="space-y-4">
                {data?.countries?.length > 0 ? (
                  data.countries.slice(0, 5).map((c: any, i: number) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{c.country}</span>
                      <div className="flex-1 mx-4 h-2 bg-slate-100 dark:bg-[#1E293B] rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full" 
                          style={{ width: `${(c.count / data.totalVisitors) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm text-slate-500">{c.count}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-500 text-sm text-center py-4">No data available.</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-[#0F172A] rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Monitor className="w-5 h-5 text-primary" /> Devices
                </h2>
                <div className="h-48">
                  {data?.devices?.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={data.devices} innerRadius={40} outerRadius={70} paddingAngle={5} dataKey="value">
                          {data.devices.map((entry: any, index: number) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <RechartsTooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : <p className="text-slate-500 text-sm text-center py-10">No data</p>}
                </div>
              </div>

              <div className="bg-white dark:bg-[#0F172A] rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-primary" /> Browsers
                </h2>
                <div className="h-48">
                   {data?.browsers?.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={data.browsers} innerRadius={40} outerRadius={70} paddingAngle={5} dataKey="value">
                          {data.browsers.map((entry: any, index: number) => (
                            <Cell key={`cell-${index}`} fill={COLORS[(index + 2) % COLORS.length]} />
                          ))}
                        </Pie>
                        <RechartsTooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : <p className="text-slate-500 text-sm text-center py-10">No data</p>}
                </div>
              </div>
            </div>
            
          </div>

          {/* Recent Visitors Table/List */}
          <div className="bg-white dark:bg-[#0F172A] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col h-full">
            <div className="p-6 border-b border-slate-100 dark:border-slate-800">
              <h2 className="text-lg font-semibold">Recent Visitors</h2>
            </div>
            <div className="flex-1 overflow-y-auto p-2" style={{ maxHeight: '600px' }}>
              {data?.recentVisitors?.length > 0 ? (
                <ul className="divide-y divide-slate-100 dark:divide-slate-800/50">
                  {data.recentVisitors.map((v: any, i: number) => (
                    <li key={i} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/30 rounded-xl transition-colors">
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-medium text-sm truncate max-w-[150px]" title={v.ipAddress || 'Unknown IP'}>
                          {v.ipAddress || "Unknown IP"}
                        </span>
                        <span className="text-xs text-slate-500 whitespace-nowrap">
                          {formatDistanceToNow(new Date(v.lastVisit), { addSuffix: true })}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {v.country && (
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-[10px] font-medium text-slate-600 dark:text-slate-300">
                            <Globe className="w-3 h-3" /> {v.country}
                          </span>
                        )}
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-[10px] font-medium text-slate-600 dark:text-slate-300">
                          {v.device === 'Mobile' ? <Smartphone className="w-3 h-3" /> : v.device === 'Tablet' ? <Tablet className="w-3 h-3" /> : <Monitor className="w-3 h-3" />}
                          {v.device || "Unknown"}
                        </span>
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-[10px] font-medium text-slate-600 dark:text-slate-300">
                           {v.browser || "Unknown"}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="p-8 text-center text-slate-500 text-sm">
                  No recent visitors found.
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, bg }: { title: string, value: string | number, icon: React.ReactNode, bg: string }) {
  return (
    <div className="bg-white dark:bg-[#0F172A] p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 flex items-center gap-4">
      <div className={`p-4 rounded-2xl ${bg}`}>
        {icon}
      </div>
      <div>
        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{title}</p>
        <p className="text-2xl font-bold text-slate-900 dark:text-white">{value}</p>
      </div>
    </div>
  );
}

function SiteSettingsSection() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/settings")
      .then(res => res.json())
      .then(data => {
        setUrl(data.telegramUrl || "");
        setLoading(false);
      });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ telegramUrl: url }),
      });
      if (res.ok) {
        setMessage("Settings saved successfully!");
      } else {
        setMessage("Failed to save settings.");
      }
    } catch (err) {
      setMessage("Error saving settings.");
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <div className="bg-white dark:bg-[#0F172A] rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Settings className="w-5 h-5 text-primary" /> Global Site Settings
      </h2>
      <form onSubmit={handleSave} className="max-w-xl space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Telegram Support URL
          </label>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            disabled={loading}
            placeholder="https://t.me/your_channel"
            className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#1E293B] text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
            required
          />
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <button
            type="submit"
            disabled={saving || loading}
            className="w-full sm:w-auto px-6 py-3 sm:py-2 bg-primary hover:bg-primary/90 text-white rounded-xl font-medium shadow-sm transition-all disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {saving ? "Saving..." : "Save Settings"}
          </button>
          {message && (
            <span className={`text-sm ${message.includes("success") ? "text-emerald-500" : "text-red-500"}`}>
              {message}
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
