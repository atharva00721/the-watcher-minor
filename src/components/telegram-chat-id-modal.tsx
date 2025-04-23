"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Check, Bell, AlertCircle, Copy, CheckCircle, Bot } from "lucide-react";

interface TelegramChatIdModalProps {
  isOpen?: boolean;
  setIsOpen?: (open: boolean) => void;
  onSave?: () => void;
}

export function TelegramChatIdModal({
  isOpen,
  setIsOpen,
  onSave,
}: TelegramChatIdModalProps = {}) {
  // For uncontrolled usage (backwards compatibility)
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const [chatId, setChatId] = useState("");
  const [isLinked, setIsLinked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [step, setStep] = useState(1);

  // Determine if this is a controlled or uncontrolled component
  const isControlled = isOpen !== undefined && setIsOpen !== undefined;
  const open = isControlled ? isOpen : uncontrolledOpen;
  const setOpen = isControlled ? setIsOpen : setUncontrolledOpen;

  useEffect(() => {
    const storedChatId = sessionStorage.getItem("telegram_chat_id");
    if (storedChatId) {
      setChatId(storedChatId);
      setIsLinked(true);
    }
  }, []);

  const handleSave = () => {
    if (!chatId) return;

    sessionStorage.setItem("telegram_chat_id", chatId);
    setIsLinked(true);
    toast.success("Telegram successfully linked", {
      description: "You'll now receive security alerts on your Telegram",
      icon: <Bell className="h-4 w-4" />,
      duration: 3000,
    });
    setOpen(false);
    setStep(1);

    if (onSave) {
      onSave();
    }
  };

  const copyCommand = () => {
    navigator.clipboard.writeText("/start");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(newOpen) => {
        setOpen(newOpen);
        if (!newOpen) setStep(1);
      }}
    >
      <DialogTrigger asChild>
        <Button variant={isLinked ? "minimal" : "primary"} size="sm">
          {isLinked ? (
            <span className="flex items-center gap-1">
              <Check className="w-3.5 h-3.5" />
              Linked
            </span>
          ) : (
            <span className="flex items-center gap-1">
              <Bell className="w-3.5 h-3.5" />
              Link Telegram
            </span>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm sm:max-w-md rounded-xl border-border/60 shadow-xl">
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-blue-600 rounded-full p-3 border-4 border-background shadow-lg">
          <svg
            className="h-6 w-6 text-white"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22.2647 2.42C21.98 2.19633 21.6364 2.07317 21.2824 2.06903C20.9284 2.06489 20.5824 2.17995 20.2929 2.39598L2.69298 14.336C2.37339 14.5679 2.14299 14.8984 2.04113 15.2728C1.93927 15.6471 1.97241 16.0429 2.13486 16.3954C2.28875 16.7319 2.55328 17.0062 2.88577 17.1723C3.21826 17.3384 3.59907 17.3864 3.96398 17.308L8.61898 16.346L10.397 20.025C10.5643 20.3581 10.8225 20.6359 11.1418 20.8292C11.461 21.0224 11.8282 21.1236 12.203 21.12C12.5854 21.1113 12.9566 21.0006 13.2783 20.7996C13.6 20.5986 13.8602 20.3144 14.033 19.976L15.459 17.115L19.67 18.322C20.0085 18.4154 20.3698 18.4085 20.7043 18.3023C21.0388 18.1961 21.3293 17.9961 21.5349 17.7296C21.7405 17.4631 21.8507 17.1437 21.8499 16.8148C21.8491 16.4858 21.7373 16.167 21.53 15.902L18.059 10.196L22.66 3.53C22.8888 3.18916 22.9655 2.77395 22.8745 2.37723C22.7835 1.98051 22.5322 1.63523 22.1799 1.418L22.2647 2.42Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8.5 16.5L15 8"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <DialogHeader className="pt-6">
          <DialogTitle className="text-xl font-display text-center">
            Connect Telegram
          </DialogTitle>
          <DialogDescription className="text-center max-w-sm mx-auto">
            Link your Telegram to receive instant security alerts when incidents
            are detected
          </DialogDescription>
        </DialogHeader>

        <div className="relative mt-6 mb-4">
          {/* Progress steps */}
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center w-full max-w-xs">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex-1 flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 transition-colors ${
                      step === i
                        ? "bg-blue-600 text-white"
                        : step > i
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 text-gray-500 dark:bg-gray-800"
                    }`}
                  >
                    {step > i ? <Check className="h-4 w-4" /> : i}
                  </div>
                  {i < 3 && (
                    <div
                      className={`h-1 w-full ${
                        step > i
                          ? "bg-green-500"
                          : "bg-gray-200 dark:bg-gray-800"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {step === 1 && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 bg-blue-50 dark:bg-blue-950/30 p-3 rounded-lg border border-blue-100 dark:border-blue-900/50">
                <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-full">
                  <Bot className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="text-sm">
                  <p className="font-medium text-blue-800 dark:text-blue-300">
                    Open The Watcher bot
                  </p>
                  <p className="text-blue-700/80 dark:text-blue-400/80 text-xs mt-0.5">
                    This bot will send you security alerts
                  </p>
                </div>
                <a
                  href="https://t.me/YourBot"
                  target="_blank"
                  className="ml-auto bg-blue-600 hover:bg-blue-700 text-white py-1.5 px-3 rounded-md text-sm transition-colors font-medium flex items-center gap-1.5"
                  onClick={() => setTimeout(() => setStep(2), 500)}
                >
                  Open Bot
                  <svg
                    className="h-3.5 w-3.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 17L17 7M17 7H7M17 7V17"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
              <div className="text-center pt-4">
                <Button
                  onClick={() => setStep(2)}
                  variant="ghost"
                  className="text-sm text-muted-foreground"
                >
                  I've opened the bot
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="bg-muted rounded-lg p-4 border border-border flex items-start gap-3">
                <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-full mt-0.5">
                  <svg
                    className="h-4.5 w-4.5 text-blue-600 dark:text-blue-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium mb-2">
                    Send this command to the bot
                  </p>
                  <div className="bg-background flex items-center justify-between p-2 rounded-md border border-border">
                    <code className="font-mono text-sm font-medium">
                      /start
                    </code>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={copyCommand}
                    >
                      {copied ? (
                        <CheckCircle className="h-3.5 w-3.5 text-green-500" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex space-x-2 justify-end pt-2">
                <Button variant="ghost" onClick={() => setStep(1)} size="sm">
                  Back
                </Button>
                <Button onClick={() => setStep(3)} size="sm">
                  I sent the command
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="bg-muted/60 rounded-lg p-4 border border-border">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <label
                      htmlFor="chat-id"
                      className="text-sm font-medium flex items-center gap-1.5"
                    >
                      <span className="bg-blue-100 dark:bg-blue-900/50 p-1.5 rounded-full">
                        <svg
                          className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M15.8 12H3M12 20L20 12L12 4"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      Your Telegram Chat ID
                    </label>
                    {chatId && (
                      <span className="text-xs text-muted-foreground">
                        {chatId.length} characters
                      </span>
                    )}
                  </div>
                  <Input
                    id="chat-id"
                    placeholder="Paste your Chat ID here"
                    value={chatId}
                    onChange={(e) => setChatId(e.target.value)}
                    className="focus-visible:ring-blue-500"
                  />
                  {!chatId && (
                    <p className="text-xs text-amber-600 dark:text-amber-400 flex items-center gap-1 mt-1.5">
                      <AlertCircle className="h-3 w-3" />
                      Copy the Chat ID from bot's response and paste it here
                    </p>
                  )}
                </div>

                <div className="mt-4 bg-background/50 p-3 rounded-md text-xs space-y-2 border border-border/50">
                  <div className="flex items-start gap-2">
                    <svg
                      className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 9V13M12 17H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="text-muted-foreground">
                      The bot will send you a message with your Chat ID. It
                      usually looks like{" "}
                      <span className="font-mono bg-muted p-0.5 rounded">
                        123456789
                      </span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex space-x-2 justify-between pt-2">
                <Button variant="ghost" onClick={() => setStep(2)} size="sm">
                  Back
                </Button>
                <Button
                  onClick={handleSave}
                  disabled={!chatId}
                  className={
                    chatId
                      ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                      : ""
                  }
                  size="sm"
                >
                  Save & Connect
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
