import { useState, useEffect } from "react";
import { motion } from "motion/react";

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const targetDate = new Date("June 24, 2026 16:00:00").getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const items = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Min", value: timeLeft.minutes },
    { label: "Sec", value: timeLeft.seconds }
  ];

  return (
    <section className="bg-primary py-20 px-6 text-white overflow-hidden relative">
      {/* Decorative large text background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-serif text-[20vw] opacity-[0.03] whitespace-nowrap pointer-events-none select-none italic">
        The Countdown Begins
      </div>

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <h2 className="font-serif text-3xl md:text-5xl italic font-light mb-12">Waiting for the moment...</h2>
        
        <div className="grid grid-cols-4 gap-4 md:gap-8">
          {items.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center"
            >
              <div className="font-serif text-4xl md:text-7xl font-bold tracking-tighter text-accent">
                {String(item.value).padStart(2, '0')}
              </div>
              <div className="font-sans uppercase text-[10px] md:text-xs tracking-[0.2em] font-semibold opacity-40 mt-2">
                {item.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
