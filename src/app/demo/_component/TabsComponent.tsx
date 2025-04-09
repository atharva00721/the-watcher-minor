import { ModelSelector } from "@/components/ModelSelector";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";

interface TabsComponentProps {
  modelUrl: string;
  setModelUrl: (url: string) => void;
  session: boolean;
}

export function TabsComponent({
  modelUrl,
  setModelUrl,
  session,
}: TabsComponentProps) {
  return (
    <div className="w-full rounded-lg bg-background/20 backdrop-blur-sm  border border-border/30 ">
      <Tabs defaultValue="analytics" className="w-full">
        {/* Tab Navigation */}
        <TabsList className="flex justify-center w-full bg-background/40 rounded-md mb-3 p-1">
          <TabsTrigger
            value="analytics"
            className="flex-1 data-[state=active]:bg-primary/20 data-[state=active]:text-primary data-[state=active]:shadow-[0_0_10px_rgba(var(--primary),0.3)] text-foreground/70 hover:text-foreground transition-all duration-200"
          >
            Analytics
          </TabsTrigger>
          <TabsTrigger
            value="frames"
            className="flex-1 data-[state=active]:bg-primary/20 data-[state=active]:text-primary data-[state=active]:shadow-[0_0_10px_rgba(var(--primary),0.3)] text-foreground/70 hover:text-foreground transition-all duration-200"
          >
            Frames
          </TabsTrigger>
          <TabsTrigger
            value="settings"
            className="flex-1 data-[state=active]:bg-primary/20 data-[state=active]:text-primary data-[state=active]:shadow-[0_0_10px_rgba(var(--primary),0.3)] text-foreground/70 hover:text-foreground transition-all duration-200"
          >
            Settings
          </TabsTrigger>
        </TabsList>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <TabsContent value="analytics" asChild>
            <motion.div
              key="analytics"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="focus-visible:outline-none focus-visible:ring-0"
            >
              <Card className="bg-card/70 border border-border/50 rounded-lg overflow-hidden">
                {/* <div className="p-5">
                  <h3 className="text-base font-medium text-foreground">
                    Analytics
                  </h3>
                  
                </div> */}
                <div className="text-muted-foreground p-5">
                  Real-time monitoring statistics and data visualization.
                </div>
              </Card>
            </motion.div>
          </TabsContent>
          <TabsContent value="frames" asChild>
            <motion.div
              key="frames"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="focus-visible:outline-none focus-visible:ring-0"
            >
              <Card className="bg-card/70 border border-border/50 rounded-lg overflow-hidden">
                <div className="text-muted-foreground p-5">
                  Real-time monitoring statistics and data visualization.
                </div>
              </Card>
            </motion.div>
          </TabsContent>
          <TabsContent value="settings" asChild>
            <motion.div
              key="settings"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="focus-visible:outline-none focus-visible:ring-0"
            >
              <Card className="bg-card/70 border border-border/50 rounded-lg overflow-hidden">
                <div className="p-5">
                  <ModelSelector
                    modelUrl={modelUrl}
                    setModelUrl={setModelUrl}
                    session={session}
                  />
                </div>
              </Card>
            </motion.div>
          </TabsContent>
        </AnimatePresence>
      </Tabs>
    </div>
  );
}
