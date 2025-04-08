"use client";
import Link from "next/link";
import { Home, Github, Play } from "lucide-react";
import { usePathname } from "next/navigation";
import { ModeToggle } from "../modetoggle";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="fixed left-0 top-1/2 -translate-y-1/2 w-16 bg-transparent flex flex-col items-center py-8 rounded-r-xl shadow-xl">
      <div className="flex flex-col items-center space-y-6">
        <SidebarLink
          href="/"
          icon={<Home className="w-5 h-5" />}
          isActive={pathname === "/"}
          label="Home"
        />
        <SidebarLink
          href="/demo"
          icon={<Play className="w-5 h-5" />}
          label="Demo"
        />
        <SidebarLink
          href="https://github.com/atharva00721"
          icon={<Github className="w-5 h-5" />}
          label="GitHub"
        />
        <ModeToggle />
      </div>
    </div>
  );
}

type SidebarLinkProps = {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
};

function SidebarLink({
  href,
  icon,
  label,
  isActive = false,
}: SidebarLinkProps) {
  return (
    <Link
      href={href}
      className={`p-3 rounded-lg transition-all duration-200 group ${
        isActive ? "text-white" : "text-zinc-400 hover:text-white"
      }`}
    >
      <div className="transition-transform duration-200 group-hover:scale-125">
        {icon}
      </div>
      <span className="sr-only">{label}</span>
    </Link>
  );
}
