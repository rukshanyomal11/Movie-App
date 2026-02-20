const Loading = () => {
  return (
    <div className="flex items-center justify-center py-16">
      <div className="relative h-14 w-14">
        <div className="absolute inset-0 rounded-full border border-slate-900/10 dark:border-white/10"></div>
        <div className="absolute inset-0 rounded-full border-t-2 border-amber-400 animate-spin"></div>
      </div>
    </div>
  );
};

export default Loading;
