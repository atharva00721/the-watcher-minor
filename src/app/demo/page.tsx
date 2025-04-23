"use client";

import { useState, useEffect } from "react";
import CameraFeed from "@/components/CameraFeed";
import { ModeToggle } from "@/components/modetoggle";
import { TelegramChatIdModal } from "@/components/telegram-chat-id-modal";
import { Button } from "@/components/ui/button";
import { BellRing } from "lucide-react";
import { toast } from "sonner";

export default function LivePage() {
  const [isTelegramConfigured, setIsTelegramConfigured] = useState(false);
  const [showTelegramModal, setShowTelegramModal] = useState(false);

  // Check if Telegram chat ID exists in session storage on mount
  useEffect(() => {
    const checkTelegramConfig = () => {
      const chatId = sessionStorage.getItem("telegram_chat_id");
      if (chatId) {
        setIsTelegramConfigured(true);
      } else {
        // Show modal on first page load if not configured
        setShowTelegramModal(true);
      }
    };

    // Check after a short delay to allow hydration
    const timer = setTimeout(checkTelegramConfig, 500);
    return () => clearTimeout(timer);
  }, []);

  // Handle check for chat ID when user clicks to open camera feed
  const handleChatIdCheck = () => {
    const chatId = sessionStorage.getItem("telegram_chat_id");
    if (!chatId) {
      toast.error("Please link your Telegram Chat ID first", {
        description: "This is required to receive alerts",
        icon: <BellRing className="h-4 w-4" />,
        action: {
          label: "Setup",
          onClick: () => setShowTelegramModal(true),
        },
      });
      setShowTelegramModal(true);
      return false;
    }
    return true;
  };

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
        <div className="flex gap-2 items-center">
          <TelegramChatIdModal
            isOpen={showTelegramModal}
            setIsOpen={setShowTelegramModal}
            onSave={() => setIsTelegramConfigured(true)}
          />
          <ModeToggle />
        </div>
      </nav>

      <div className="mt-20">
        {/* Sleek minimal notification for Telegram connection */}
        {!isTelegramConfigured && (
          <div className="mb-6 flex justify-center">
            <div
              onClick={() => setShowTelegramModal(true)}
              className="bg-background/50 backdrop-blur-sm px-4 py-2.5 rounded-full border border-border/50 shadow-sm hover:shadow-md transition-all flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-foreground/80">
                Telegram connection required
              </span>
              <Button
                variant="ghost"
                size="sm"
                className="py-1 h-auto opacity-60 group-hover:opacity-100 transition-opacity"
              >
                <BellRing className="h-3.5 w-3.5 mr-1" />
                Connect
              </Button>
            </div>
          </div>
        )}
        <CameraFeed onBeforeCameraStart={handleChatIdCheck} />
      </div>

      {/* <div className="mt-8 bg-card/50 border border-border rounded-lg p-6 max-w-xl mx-auto">
        <div className="flex items-center gap-2 mb-3">
          <BellRing className="h-4 w-4 text-muted-foreground" />
          <h2 className="text-base font-medium">
            Telegram Notification System
          </h2>
        </div>
        <div className="bg-muted/50 p-3 rounded-md text-sm text-muted-foreground">
          <p className="mb-2">
            The Watcher uses your Telegram Chat ID to send instant alerts when:
          </p>
          <ul className="list-disc ml-5 space-y-0.5 text-xs">
            <li>Violence is detected in the video feed</li>
            <li>Reports are generated based on suspicious activity</li>
            <li>System requires your attention</li>
          </ul>
        </div>
      </div> */}
    </main>
  );
}
