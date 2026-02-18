const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-slate-950/90 py-10 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
          <div>
            <p className="font-display text-2xl tracking-[0.2em]">MovieApp</p>
            <p className="text-sm text-slate-400">Crafted for film lovers everywhere.</p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs uppercase tracking-[0.25em] text-slate-400">
            <a href="#" className="transition hover:text-white">Privacy Policy</a>
            <span className="text-amber-400/60">•</span>
            <a href="#" className="transition hover:text-white">Terms of Service</a>
            <span className="text-amber-400/60">•</span>
            <a href="#" className="transition hover:text-white">Support</a>
          </div>
        </div>
        <div className="mt-8 text-center text-xs text-slate-500">
          &copy; {new Date().getFullYear()} MovieApp. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
