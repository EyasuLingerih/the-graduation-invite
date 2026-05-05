export default function Footer() {
  return (
    <footer className="py-20 px-6 border-t border-accent/10 text-center space-y-8">
      <div className="space-y-2">
        <h2 className="font-serif text-3xl font-light italic">Julian Roberts</h2>
        <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-accent font-semibold">Class of 2026</p>
      </div>

      <div className="flex justify-center items-center gap-8 text-[11px] font-sans uppercase tracking-widest text-primary/40">
        <a href="#" className="hover:text-accent transition-colors">Digital Evite</a>
        <div className="w-1 h-1 rounded-full bg-accent" />
        <a href="#" className="hover:text-accent transition-colors">By Roberts Family</a>
        <div className="w-1 h-1 rounded-full bg-accent" />
        <a href="#" className="hover:text-accent transition-colors">Est. 2026</a>
      </div>

      <div className="pt-20 opacity-30">
        <p className="font-sans text-[9px] uppercase tracking-widest">Designed with Joy for a Bright Future</p>
      </div>
    </footer>
  );
}
