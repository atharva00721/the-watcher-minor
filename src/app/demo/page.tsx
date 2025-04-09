import CameraFeed from "@/components/CameraFeed";
import { ModeToggle } from "@/components/modetoggle";

export default function LivePage() {
  return (
    <main className="p-6">
      <nav className="w-[70%] p-4 bg-gradient-to-r from-zinc-300/70 to-zinc-300/70 dark:from-zinc-800/70 dark:to-zinc-800/30 backdrop-blur-lg border border-zinc-300/50 dark:border-zinc-700/50 flex justify-between items-center rounded-xl shadow-2xl absolute top-5 left-1/2 -translate-x-1/2 z-[9999]">
        <div className="flex items-baseline">
          <h1 className="text-2xl doto-black text-glowtracking-widest text-primary glow-text">
            The Watcher
          </h1>
          <span className="jetbrains-mono h-fit text-xs font-light tracking-tight text-muted-light duration-200 group-hover:text-white">
            <span>/ </span>
            <span className="text-xxs">@</span>
            <span>demo</span>
          </span>
        </div>
        <ModeToggle />
      </nav>
      <div className="mt-20">
        <CameraFeed />
      </div>
    </main>
  );
}
