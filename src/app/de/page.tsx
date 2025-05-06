// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
//   CardDescription,
// } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import { Loader2, Copy, Link, Settings } from "lucide-react";
// import { CCTVStream } from "@/components/CCTVStream";

// export default function CCTVPage() {
//   const [streamUrl, setStreamUrl] = useState<string>("");
//   const [activeStreams, setActiveStreams] = useState<
//     Array<{ id: string; url: string; name: string }>
//   >([]);
//   const [isConnecting, setIsConnecting] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [activeTab, setActiveTab] = useState<string>("add");

//   // Example streams for testing
//   const exampleStreams = [
//     {
//       name: "Test HLS Stream",
//       url: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
//     },
//     {
//       name: "Test MJPEG Stream",
//       url: "https://webcams.windy.com/webcams/stream/1309214857",
//     },
//     {
//       name: "Sample Video",
//       url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
//     },
//   ];

//   // Add a new camera stream
//   const addCameraStream = async () => {
//     try {
//       setIsConnecting(true);
//       setError(null);

//       // Validate URL
//       if (!streamUrl.trim()) {
//         setError("Please enter a valid stream URL");
//         return;
//       }

//       // Check if URL is already added
//       if (activeStreams.some((stream) => stream.url === streamUrl)) {
//         setError("This stream is already added");
//         return;
//       }

//       // Add stream to active streams
//       const newStream = {
//         id: `stream-${Date.now()}`,
//         url: streamUrl,
//         name: `Camera ${activeStreams.length + 1}`,
//       };

//       setActiveStreams((prev) => [...prev, newStream]);
//       setStreamUrl("");
//     } catch (err) {
//       console.error("Failed to connect to camera:", err);
//       setError("Failed to connect to camera stream. Please check the URL.");
//     } finally {
//       setIsConnecting(false);
//     }
//   };

//   // Add an example stream
//   const addExampleStream = (stream: (typeof exampleStreams)[0]) => {
//     if (activeStreams.some((s) => s.url === stream.url)) {
//       setError("This example stream is already added");
//       return;
//     }

//     const newStream = {
//       id: `stream-${Date.now()}`,
//       url: stream.url,
//       name: stream.name,
//     };

//     setActiveStreams((prev) => [...prev, newStream]);
//     setError(null);
//   };

//   // Remove a camera stream
//   const removeCameraStream = (id: string) => {
//     setActiveStreams((prev) => prev.filter((stream) => stream.id !== id));
//   };

//   return (
//     <div className="container mx-auto py-8">
//       <h1 className="text-3xl font-bold mb-6">CCTV Camera Integration</h1>

//       <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
//         <TabsList className="w-full max-w-md mx-auto mb-4">
//           <TabsTrigger value="add" className="flex-1">
//             Add Camera
//           </TabsTrigger>
//           <TabsTrigger value="examples" className="flex-1">
//             Test Streams
//           </TabsTrigger>
//           <TabsTrigger value="settings" className="flex-1">
//             Settings
//           </TabsTrigger>
//         </TabsList>

//         <TabsContent value="add">
//           <Card>
//             <CardHeader>
//               <CardTitle>Add Camera Feed</CardTitle>
//               <CardDescription>
//                 Enter the URL of your CCTV camera feed. Supports HTTP/HTTPS
//                 video streams and HLS streams.
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="flex gap-4">
//                 <Input
//                   placeholder="Enter camera stream URL (http://, https://, or HLS .m3u8)"
//                   value={streamUrl}
//                   onChange={(e) => setStreamUrl(e.target.value)}
//                   className="flex-1"
//                 />
//                 <Button
//                   onClick={addCameraStream}
//                   disabled={isConnecting || !streamUrl.trim()}
//                 >
//                   {isConnecting ? (
//                     <>
//                       <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                       Connecting...
//                     </>
//                   ) : (
//                     "Add Camera"
//                   )}
//                 </Button>
//               </div>

//               {error && (
//                 <Alert variant="destructive" className="mt-4">
//                   <AlertDescription>{error}</AlertDescription>
//                 </Alert>
//               )}

//               <div className="mt-4">
//                 <h3 className="text-sm font-medium mb-2">Supported Formats:</h3>
//                 <ul className="text-sm text-muted-foreground space-y-1">
//                   <li>
//                     • HLS Streams (.m3u8):
//                     http://192.168.1.100/stream/index.m3u8
//                   </li>
//                   <li>• MP4/WebM Direct: http://192.168.1.100/video.mp4</li>
//                   <li>
//                     • MJPEG (some cameras): http://192.168.1.100/video.mjpg
//                   </li>
//                   <li className="text-amber-500">
//                     • RTSP streams require a proxy server to work in browsers
//                   </li>
//                 </ul>
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>

//         <TabsContent value="examples">
//           <Card>
//             <CardHeader>
//               <CardTitle>Test Streams</CardTitle>
//               <CardDescription>
//                 Use these example streams to test the functionality without a
//                 real camera
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 {exampleStreams.map((stream, index) => (
//                   <div
//                     key={index}
//                     className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
//                   >
//                     <div>
//                       <p className="font-medium">{stream.name}</p>
//                       <p className="text-xs text-muted-foreground truncate max-w-[300px]">
//                         {stream.url}
//                       </p>
//                     </div>
//                     <Button
//                       variant="outline"
//                       size="sm"
//                       onClick={() => addExampleStream(stream)}
//                     >
//                       Add Stream
//                     </Button>
//                   </div>
//                 ))}
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>

//         <TabsContent value="settings">
//           <Card>
//             <CardHeader>
//               <CardTitle>Camera Settings</CardTitle>
//               <CardDescription>
//                 Configure advanced settings for camera integration
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 <div className="border-b pb-4">
//                   <h3 className="font-medium mb-2">RTSP Support</h3>
//                   <p className="text-sm text-muted-foreground mb-4">
//                     RTSP streams require a proxy server to work in web browsers.
//                     For full RTSP support, consider setting up one of these
//                     options:
//                   </p>
//                   <ul className="text-sm space-y-2">
//                     <li className="flex items-start">
//                       <span className="text-primary mr-2">•</span>
//                       <span>
//                         Use{" "}
//                         <a
//                           href="https://github.com/aler9/rtsp-simple-server"
//                           target="_blank"
//                           rel="noopener"
//                           className="text-primary underline"
//                         >
//                           RTSP Simple Server
//                         </a>{" "}
//                         to convert RTSP to HLS or WebRTC
//                       </span>
//                     </li>
//                     <li className="flex items-start">
//                       <span className="text-primary mr-2">•</span>
//                       <span>
//                         Install{" "}
//                         <a
//                           href="https://github.com/deepch/RTSPtoWeb"
//                           target="_blank"
//                           rel="noopener"
//                           className="text-primary underline"
//                         >
//                           RTSPtoWeb
//                         </a>{" "}
//                         as a proxy service
//                       </span>
//                     </li>
//                   </ul>
//                 </div>

//                 <div>
//                   <h3 className="font-medium mb-2">Camera Discovery</h3>
//                   <p className="text-sm text-muted-foreground">
//                     Automatic camera discovery on the local network isn't
//                     currently available in browser environments. IP cameras need
//                     to be added manually using their stream URLs.
//                   </p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>
//       </Tabs>

//       {activeStreams.length > 0 ? (
//         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//           {activeStreams.map((stream) => (
//             <CCTVCameraFeed
//               key={stream.id}
//               stream={stream}
//               onRemove={() => removeCameraStream(stream.id)}
//             />
//           ))}
//         </div>
//       ) : (
//         <div className="text-center py-12 bg-muted/30 rounded-lg">
//           <h2 className="text-xl font-medium mb-2">No cameras connected</h2>
//           <p className="text-muted-foreground">
//             Add a camera stream or select a test stream to get started
//           </p>
//         </div>
//       )}
//     </div>
//   );
// }

// // Component for each individual camera feed
// function CCTVCameraFeed({
//   stream,
//   onRemove,
// }: {
//   stream: { id: string; url: string; name: string };
//   onRemove: () => void;
// }) {
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<Error | null>(null);
//   const [isAnalyzing, setIsAnalyzing] = useState(false);

//   // Handle stream loading
//   const handleStreamLoad = () => {
//     setIsLoading(false);
//   };

//   // Handle stream error
//   const handleStreamError = (err: Error) => {
//     setIsLoading(false);
//     setError(err);
//   };

//   // Toggle analysis mode
//   const toggleAnalysis = () => {
//     setIsAnalyzing(!isAnalyzing);
//     // Here you would integrate with your existing model/inference code
//   };

//   return (
//     <Card>
//       <CardHeader className="pb-2">
//         <div className="flex justify-between items-start">
//           <div>
//             <CardTitle className="text-base">{stream.name}</CardTitle>
//             <CardDescription className="text-xs truncate max-w-[250px]">
//               {stream.url}
//             </CardDescription>
//           </div>
//           <Button variant="outline" size="sm" onClick={onRemove}>
//             Disconnect
//           </Button>
//         </div>
//       </CardHeader>
//       <CardContent>
//         <div className="relative aspect-video bg-black rounded-md overflow-hidden">
//           <CCTVStream
//             streamUrl={stream.url}
//             onLoad={handleStreamLoad}
//             onError={handleStreamError}
//           />
//         </div>

//         <div className="flex justify-between items-center mt-4">
//           <div>
//             <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
//               {isLoading ? "Connecting..." : "Live"}
//             </span>
//           </div>
//           <div className="flex gap-2">
//             <Button
//               size="sm"
//               variant="outline"
//               onClick={() => navigator.clipboard.writeText(stream.url)}
//             >
//               <Copy className="h-4 w-4 mr-1" />
//               Copy URL
//             </Button>
//             <Button
//               size="sm"
//               variant={isAnalyzing ? "primary" : "outline"}
//               onClick={toggleAnalysis}
//             >
//               {isAnalyzing ? "Stop Analysis" : "Analyze Feed"}
//             </Button>
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }
