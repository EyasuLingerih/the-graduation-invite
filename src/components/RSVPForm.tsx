import { useState, type ChangeEvent, type FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";

const API_URL = import.meta.env.VITE_RSVP_API_URL || "/api/rsvp";

export default function RSVPForm() {
  const [attending, setAttending] = useState<"yes" | "no" | null>(null);
  const [form, setForm] = useState({ name: "", email: "", guests: "1", phone: "", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((current) => ({ ...current, [name]: value }));

    if (name === "guests" && value === "0") {
      setAttending("no");
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!attending) {
      setErrorMessage("Please select whether you will attend.");
      return;
    }

    setStatus("submitting");

    const payload = {
      name: form.name,
      email: form.email,
      guests: Number(form.guests),
      phone: form.phone,
      message: form.message,
      attending: attending === "yes",
    };

    try {
      if (API_URL) {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          const data = await response.json().catch(() => null);
          throw new Error(data?.error || "Submission failed.");
        }
      } else {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong.");
    }
  };

  return (
    <section className="py-32 px-6 bg-white" id="rsvp">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl mb-4">RSVP</h2>
          <p className="font-sans text-sm text-primary/60 font-light italic">Please kindly respond by June 1st.</p>
        </div>

        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-12 border border-accent/20 rounded-3xl text-center flex flex-col items-center justify-center space-y-6"
            >
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
                <span className="text-3xl">🎉</span>
              </div>
              <div className="space-y-2">
                <h3 className="font-serif text-2xl italic">Thank You!</h3>
                <p className="font-sans text-sm text-primary/60">
                  {attending === "yes"
                    ? "Your RSVP is confirmed. We can't wait to celebrate with you."
                    : "Thank you for letting us know. We will miss you at the celebration."}
                </p>
              </div>
              <button
                onClick={() => setStatus("idle")}
                className="text-xs uppercase tracking-widest text-accent font-semibold hover:underline"
              >
                Submit another response
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onSubmit={handleSubmit}
              className="space-y-8"
            >
              <div className="space-y-6">
                <div>
                  <label className="block font-sans text-xs uppercase tracking-widest font-semibold text-primary/60 mb-3">Will you attend?</label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setAttending("yes")}
                      className={`py-4 rounded-2xl font-semibold border transition-all ${
                        attending === "yes"
                          ? "bg-primary text-white border-primary"
                          : "bg-white text-primary border-primary/10 hover:border-accent"
                      }`}
                    >
                      Yes, I will be there
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setAttending("no")
                        setForm((current) => ({ ...current, guests: "0" }))
                      }}
                      className={`py-4 rounded-2xl font-semibold border transition-all ${
                        attending === "no"
                          ? "bg-red-500/10 text-red-600 border-red-400"
                          : "bg-white text-primary border-primary/10 hover:border-red-400/40"
                      }`}
                    >
                      No, I cannot attend
                    </button>
                  </div>
                </div>

                {attending !== null && (
                  <div className="space-y-6">
                    <div>
                      <label className="block font-sans text-xs uppercase tracking-widest font-semibold text-primary/60 mb-3">Full Name *</label>
                      <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        type="text"
                        placeholder="Enter your full name"
                        className="w-full bg-white border border-primary/10 rounded-2xl px-4 py-3 font-sans text-sm focus:outline-none focus:border-accent transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block font-sans text-xs uppercase tracking-widest font-semibold text-primary/60 mb-3">Email Address *</label>
                      <input
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        type="email"
                        placeholder="your@email.com"
                        className="w-full bg-white border border-primary/10 rounded-2xl px-4 py-3 font-sans text-sm focus:outline-none focus:border-accent transition-colors"
                      />
                    </div>

                    {attending === "yes" && (
                      <div>
                        <label className="block font-sans text-xs uppercase tracking-widest font-semibold text-primary/60 mb-3">Phone (optional)</label>
                        <input
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          type="tel"
                          placeholder="+1 (000) 000-0000"
                          className="w-full bg-white border border-primary/10 rounded-2xl px-4 py-3 font-sans text-sm focus:outline-none focus:border-accent transition-colors"
                        />
                      </div>
                    )}

                    <div>
                      <label className="block font-sans text-xs uppercase tracking-widest font-semibold text-primary/60 mb-3">Number of Guests *</label>
                      <select
                        name="guests"
                        value={form.guests}
                        onChange={handleChange}
                        required
                        className="w-full bg-white border border-primary/10 rounded-2xl px-4 py-3 font-sans text-sm focus:outline-none focus:border-accent transition-colors"
                      >
                        <option value="0">0 — Not attending</option>
                        {[1, 2, 3, 4, 5, 6].map((num) => (
                          <option key={num} value={String(num)}>{num}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block font-sans text-xs uppercase tracking-widest font-semibold text-primary/60 mb-3">
                        {attending === "no" ? "Leave a message (optional)" : "Message (optional)"}
                      </label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        rows={4}
                        placeholder={attending === "no" ? "We'll be thinking of you..." : "Share a warm message..."}
                        className="w-full bg-white border border-primary/10 rounded-2xl px-4 py-3 font-sans text-sm focus:outline-none focus:border-accent transition-colors resize-none"
                      />
                    </div>

                    {status === "error" && (
                      <p className="text-red-500 text-sm">{errorMessage}</p>
                    )}
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full bg-primary text-white font-sans uppercase tracking-[0.3em] text-xs font-semibold py-5 rounded-2xl hover:bg-accent transition-all duration-500 disabled:opacity-50"
              >
                {status === "submitting"
                  ? "Sending..."
                  : attending === "yes"
                  ? "Confirm Attendance"
                  : "Submit Response"}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
