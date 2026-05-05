import { useState, useEffect, type FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Download, LogOut, Users, CheckCircle, XCircle, Search } from "lucide-react";

interface RSVP {
  id: string;
  name: string;
  email: string;
  guests: number;
  phone: string;
  message: string;
  attending: boolean;
  status: string;
  submittedAt: string;
}

export default function AdminDashboard() {
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [rsvps, setRsvps] = useState<RSVP[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    localStorage.setItem("admin_password", password);
    setIsLoggedIn(true);
    fetchRSVPs(password);
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_password");
    setIsLoggedIn(false);
    setRsvps([]);
  };

  const fetchRSVPs = async (pass: string) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/rsvp", {
        headers: {
          Authorization: `Bearer ${pass}`,
        },
      });

      if (!response.ok) {
        throw new Error(response.status === 401 ? "Invalid password" : "Failed to fetch RSVPs");
      }

      const data = await response.json();
      setRsvps(data.rsvps || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      if (err instanceof Error && err.message === "Invalid password") {
        setIsLoggedIn(false);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const savedPass = localStorage.getItem("admin_password");
    if (savedPass) {
      setPassword(savedPass);
      setIsLoggedIn(true);
      fetchRSVPs(savedPass);
    }
  }, []);

  const downloadCSV = () => {
    const headers = ["Name", "Email", "Guests", "Phone", "Attending", "Message", "Submitted At"];
    const rows = rsvps.map((r) => [
      r.name,
      r.email,
      r.guests,
      r.phone,
      r.attending ? "Yes" : "No",
      r.message.replace(/,/g, " "),
      new Date(r.submittedAt).toLocaleString(),
    ]);

    const csvContent = [headers, ...rows].map((e) => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "rsvps.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredRSVPs = rsvps.filter((r) =>
    r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: rsvps.length,
    attending: rsvps.filter((r) => r.attending).length,
    declined: rsvps.filter((r) => !r.attending).length,
    totalGuests: rsvps.reduce((acc, curr) => acc + (curr.attending ? curr.guests : 0), 0),
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-3xl shadow-xl border border-slate-200 w-full max-w-md"
        >
          <div className="text-center mb-8">
            <h2 className="font-serif text-3xl mb-2">Admin Access</h2>
            <p className="text-slate-500 text-sm">Please enter the administrative password.</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-accent transition-colors"
              required
            />
            {error && <p className="text-red-500 text-xs text-center">{error}</p>}
            <button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:bg-accent transition-colors"
            >
              Login
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <div>
            <h1 className="font-serif text-4xl md:text-5xl mb-2">RSVP Dashboard</h1>
            <p className="text-slate-500">Manage your graduation guest list and attendance.</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={downloadCSV}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold hover:bg-slate-50 transition-colors shadow-sm"
            >
              <Download size={16} />
              Export CSV
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-xl text-sm font-semibold hover:bg-red-100 transition-colors"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {[
            { label: "Total Responses", value: stats.total, icon: <Users className="text-blue-500" /> },
            { label: "Total Guests", value: stats.totalGuests, icon: <Users className="text-purple-500" /> },
            { label: "Attending", value: stats.attending, icon: <CheckCircle className="text-green-500" /> },
            { label: "Declined", value: stats.declined, icon: <XCircle className="text-red-500" /> },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-500 text-xs uppercase tracking-wider font-bold">{stat.label}</span>
                {stat.icon}
              </div>
              <div className="text-3xl font-serif">{stat.value}</div>
            </motion.div>
          ))}
        </div>

        {/* Search and Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-accent/20 transition-all outline-none text-sm"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 text-slate-500 text-xs uppercase tracking-wider font-bold">
                  <th className="px-6 py-4">Guest</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Guests</th>
                  <th className="px-6 py-4">Message</th>
                  <th className="px-6 py-4 text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-slate-400">Loading RSVPs...</td>
                  </tr>
                ) : filteredRSVPs.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-slate-400">No RSVPs found.</td>
                  </tr>
                ) : (
                  filteredRSVPs.map((rsvp) => (
                    <tr key={rsvp.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-slate-900">{rsvp.name}</div>
                        <div className="text-xs text-slate-500">{rsvp.email}</div>
                        {rsvp.phone && <div className="text-[10px] text-slate-400">{rsvp.phone}</div>}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                          rsvp.attending 
                            ? "bg-green-100 text-green-700" 
                            : "bg-red-100 text-red-700"
                        }`}>
                          {rsvp.attending ? <CheckCircle size={12} /> : <XCircle size={12} />}
                          {rsvp.attending ? "Attending" : "Declined"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-mono text-slate-600">{rsvp.guests}</span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-xs text-slate-600 max-w-xs truncate" title={rsvp.message}>
                          {rsvp.message || <span className="text-slate-300 italic">No message</span>}
                        </p>
                      </td>
                      <td className="px-6 py-4 text-right text-slate-400 text-[10px]">
                        {new Date(rsvp.submittedAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
