import CameraFeed from "@/components/CameraFeed";
import { ModeToggle } from "@/components/modetoggle";

export default function LivePage() {
  return (
    <main className="p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-4">The Watcher</h1>
        <ModeToggle />
      </div>
      <CameraFeed />
    </main>
  );
}
