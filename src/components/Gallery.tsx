import { motion } from "motion/react";

const photos = [
  { url: "https://picsum.photos/seed/mem1/800/1000", span: "row-span-2" },
  { url: "https://picsum.photos/seed/mem2/800/600", span: "row-span-1" },
  { url: "https://picsum.photos/seed/mem3/800/600", span: "row-span-1" },
  { url: "https://picsum.photos/seed/mem4/800/1000", span: "row-span-2" },
  { url: "https://picsum.photos/seed/mem5/800/600", span: "row-span-1" },
  { url: "https://picsum.photos/seed/mem6/800/600", span: "row-span-1" },
];

export default function Gallery() {
  return (
    <section className="py-24 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-16 space-y-4">
        <h2 className="font-serif text-4xl md:text-6xl italic">Memories from the Journey</h2>
        <div className="h-[1px] w-24 bg-accent/30 mx-auto" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {photos.map((photo, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.8 }}
            className={`${photo.span} overflow-hidden rounded-3xl relative group cursor-pointer`}
          >
            <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
            <img 
              src={photo.url} 
              alt="Memory" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
