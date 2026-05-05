import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check } from "lucide-react";
import confetti from "canvas-confetti";

export default function RSVPForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [attendees, setAttendees] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    
    // Simulate submission
    setTimeout(() => {
      setStatus("success");
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#c4a47c', '#1a1a1a', '#ffffff']
      });
    }, 1500);
  };

  return (
    <section className="py-32 px-6 bg-white" id="rsvp">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl mb-4">Are you coming?</h2>
          <p className="font-sans text-sm text-primary/60 font-light italic">Please kindly respond by June 1st</p>
        </div>

        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-12 border border-accent/20 rounded-3xl text-center flex flex-col items-center justify-center space-y-6"
            >
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
                <Check className="w-8 h-8 text-accent" />
              </div>
              <div className="space-y-2">
                <h3 className="font-serif text-2xl italic">Thank You!</h3>
                <p className="font-sans text-sm text-primary/60">Your response has been recorded. We can't wait to see you there!</p>
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onSubmit={handleSubmit}
              className="space-y-8"
            >
              <div className="space-y-6">
                <div>
                  <label className="block font-sans text-xs uppercase tracking-widest font-semibold text-primary/60 mb-3">Full Name</label>
                  <input 
                    required
                    type="text"
                    className="w-full bg-white border-b border-primary/10 py-3 font-serif text-lg focus:outline-none focus:border-accent transition-colors"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label className="block font-sans text-xs uppercase tracking-widest font-semibold text-primary/60 mb-3">Number of Guests</label>
                  <div className="flex gap-4">
                    {[1, 2, 3, 4].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setAttendees(num)}
                        className={`flex-1 py-3 rounded-xl border text-sm font-sans transition-all ${
                          attendees === num 
                            ? "bg-primary text-white border-primary" 
                            : "bg-white text-primary border-primary/10 hover:border-accent"
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block font-sans text-xs uppercase tracking-widest font-semibold text-primary/60 mb-3">Special Message</label>
                  <textarea 
                    rows={4}
                    className="w-full bg-white border border-primary/10 rounded-2xl p-4 font-sans text-sm focus:outline-none focus:border-accent transition-colors resize-none"
                    placeholder="Wishes for the graduate..."
                  />
                </div>
              </div>

              <button
                disabled={status === "submitting"}
                type="submit"
                className="w-full bg-primary text-white font-sans uppercase tracking-[0.3em] text-xs font-semibold py-5 rounded-2xl hover:bg-accent transition-all duration-500 disabled:opacity-50"
              >
                {status === "submitting" ? "Sending..." : "Confirm Attendance"}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
