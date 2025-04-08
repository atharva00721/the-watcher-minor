export default function TechStack() {
  return (
    <div className="mb-12 sm:mb-16">
      <h2 className=" text-2xl font-semibold  doto-black mb-6 sm:mb-6">
        Technology Stack
      </h2>
      <div className="bg-card rounded-md p-4 sm:p-8">
        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2">
          <div>
            <h3 className="text-base sm:text-lg font-medium mb-3 sm:mb-4">
              AI & Machine Learning
            </h3>
            <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base">
              <li className="flex items-center">
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-purple-500 rounded-full mr-2 sm:mr-3"></div>
                <span>Google Gemini for advanced reasoning</span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-purple-500 rounded-full mr-2 sm:mr-3"></div>
                <span>Custom computer vision models</span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-purple-500 rounded-full mr-2 sm:mr-3"></div>
                <span>Behavioral pattern recognition</span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-purple-500 rounded-full mr-2 sm:mr-3"></div>
                <span>Anomaly detection algorithms</span>
              </li>
            </ul>
          </div>
          <div className="mt-6 sm:mt-0">
            <h3 className="text-base sm:text-lg font-medium mb-3 sm:mb-4">
              Infrastructure
            </h3>
            <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base">
              <li className="flex items-center">
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-500 rounded-full mr-2 sm:mr-3"></div>
                <span>Edge computing for real-time processing</span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-500 rounded-full mr-2 sm:mr-3"></div>
                <span>Cloud-based model training</span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-500 rounded-full mr-2 sm:mr-3"></div>
                <span>Encrypted data transmission</span>
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-blue-500 rounded-full mr-2 sm:mr-3"></div>
                <span>Scalable deployment architecture</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-border">
          <h3 className="text-base sm:text-lg font-medium mb-3 sm:mb-4 text-center">
            Performance Metrics
          </h3>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
            <div className="bg-muted p-3 sm:p-4 rounded-md text-center">
              <div className="text-xl sm:text-2xl font-bold mb-1">99.8%</div>
              <div className="text-xs sm:text-sm text-muted-foreground">
                Detection Accuracy
              </div>
            </div>
            <div className="bg-muted p-3 sm:p-4 rounded-md text-center">
              <div className="text-xl sm:text-2xl font-bold mb-1">50ms</div>
              <div className="text-xs sm:text-sm text-muted-foreground">
                Response Time
              </div>
            </div>
            <div className="bg-muted p-3 sm:p-4 rounded-md text-center">
              <div className="text-xl sm:text-2xl font-bold mb-1">24/7</div>
              <div className="text-xs sm:text-sm text-muted-foreground">
                Monitoring
              </div>
            </div>
            <div className="bg-muted p-3 sm:p-4 rounded-md text-center">
              <div className="text-xl sm:text-2xl font-bold mb-1">95%</div>
              <div className="text-xs sm:text-sm text-muted-foreground">
                Threat Prevention
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
