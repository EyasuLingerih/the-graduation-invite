import { Calendar, Clock, MapPin } from "lucide-react";
import { motion } from "motion/react";

const details = [
  {
    icon: <Calendar className="w-5 h-5 text-accent" />,
    label: "The Date",
    value: "June 7th, 2026",
    sub: "Sunday afternoon"
  },
  {
    icon: <Clock className="w-5 h-5 text-accent" />,
    label: "The Time",
    value: "3:00 PM Sharp",
    sub: "Ceremony followed by celebration"
  },
  {
    icon: <MapPin className="w-5 h-5 text-accent" />,
    label: "The Venue",
    value: "Osseo Community Center",
    sub: "415 Central Ave, Osseo, MN 55369",
    link: "https://maps.app.goo.gl/jtDLEPkK369fzcd26"
  }
];

export default function EventDetails() {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto space-y-12">
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
              {item.link ? (
                <a href={item.link} target="_blank" rel="noreferrer" className="hover:text-accent transition-colors">
                  {item.value}
                </a>
              ) : item.value}
            </p>
            <p className="font-sans text-xs text-primary/40 italic">
              {item.sub}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Map */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="rounded-3xl overflow-hidden border border-accent/10 shadow-sm"
      >
        <iframe
          title="Osseo Community Center"
          src="https://www.google.com/maps?q=415+Central+Ave,+Osseo,+MN+55369&output=embed"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <div className="bg-white px-6 py-4 flex items-center justify-between">
          <div>
            <p className="font-serif text-lg">Osseo Community Center</p>
            <p className="font-sans text-xs text-primary/40">415 Central Ave, Osseo, MN 55369</p>
          </div>
          <a
            href="https://maps.app.goo.gl/jtDLEPkK369fzcd26"
            target="_blank"
            rel="noreferrer"
            className="font-sans text-xs uppercase tracking-widest font-semibold text-accent hover:underline"
          >
            Open in Maps
          </a>
        </div>
      </motion.div>
    </section>
  );
}
