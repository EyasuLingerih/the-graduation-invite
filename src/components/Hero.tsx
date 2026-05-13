import { motion } from "motion/react";
import confetti from "canvas-confetti";
import { useEffect } from "react";

export default function Hero() {
  useEffect(() => {
    // Initial burst of confetti
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden px-6 pt-20">
      {/* Background Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,rgba(196,164,124,0.05)_0%,transparent_70%)] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="text-center z-10 space-y-6 max-w-4xl"
      >
        <span className="font-sans uppercase tracking-[0.3em] text-[10px] md:text-xs font-semibold text-accent block">
          Class of 2026 Celebration
        </span>

        <h1 className="font-serif text-5xl md:text-8xl lg:text-9xl font-light leading-tight">
          The Graduation of <br />
          <span className="italic gradient-text">Julian Roberts</span>
        </h1>

        <p className="font-sans text-sm md:text-base font-light tracking-wide opacity-70 max-w-lg mx-auto">
          We invite you to celebrate a journey of hard work, growth, and the exciting beginning of a new chapter.
        </p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="relative mt-12 group"
        >
          <div className="absolute -inset-2 bg-accent/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="relative w-48 h-48 md:w-64 md:h-64 mx-auto rounded-full overflow-hidden border-2 border-accent/20 p-2 bg-white">
            <img
              src="/img/grad-02.jpg"
              alt="Julian Roberts"
              className="w-full h-full object-cover object-top rounded-full"
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Decorative Ornaments */}
      <div className="absolute bottom-10 left-10 pointer-events-none opacity-20">
        <div className="w-20 h-[1px] bg-accent" />
        <div className="mt-2 text-[10px] font-sans uppercase tracking-widest text-accent">Est. 2026</div>
      </div>
    </section>
  );
}
