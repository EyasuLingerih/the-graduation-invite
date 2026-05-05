import { Calendar, Clock, MapPin } from "lucide-react";
import { motion } from "motion/react";

const details = [
  {
    icon: <Calendar className="w-5 h-5 text-accent" />,
    label: "The Date",
    value: "June 24th, 2026",
    sub: "Wednesday afternoon"
  },
  {
    icon: <Clock className="w-5 h-5 text-accent" />,
    label: "The Time",
    value: "4:00 PM Sharp",
    sub: "Ceremony followed by dinner"
  },
  {
    icon: <MapPin className="w-5 h-5 text-accent" />,
    label: "The Venue",
    value: "The Grand Atrium",
    sub: "452 Academic Plaza, Suite 10"
  }
];

export default function EventDetails() {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {details.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2, duration: 0.8 }}
            className="p-8 border border-accent/10 rounded-2xl bg-white hover:bg-[#fcfbf9] transition-colors duration-500 group text-center"
          >
            <div className="mb-6 flex justify-center">
               <div className="p-4 rounded-full bg-accent/5 group-hover:bg-accent/10 transition-colors duration-500">
                {item.icon}
               </div>
            </div>
            <h3 className="font-sans uppercase text-[10px] tracking-widest font-semibold text-accent/60 mb-2">
              {item.label}
            </h3>
            <p className="font-serif text-2xl mb-1 text-primary">
              {item.value}
            </p>
            <p className="font-sans text-xs text-primary/40 italic">
              {item.sub}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
