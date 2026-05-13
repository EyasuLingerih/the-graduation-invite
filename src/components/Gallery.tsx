import { motion } from "motion/react";

const photos = [
  { url: "/img/grad-03.jpg", span: "row-span-2" },
  { url: "/img/grad-01.jpg", span: "row-span-2" },
  { url: "/img/grad-05.jpg", span: "row-span-2" },
  { url: "/img/grad-06.jpg", span: "row-span-2" },
  { url: "/img/grad-04.jpg", span: "row-span-2" },
  { url: "/img/grad-07.jpg", span: "row-span-2" },
  { url: "/img/grad-14.jpg", span: "row-span-2" },
  { url: "/img/grad-08.jpg", span: "row-span-2" },
];

export default function Gallery() {
  return (
    <section className="py-24 px-4 max-w-7xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[280px]">
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
