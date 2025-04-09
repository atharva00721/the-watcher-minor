import Model350Icon from "@/Icon/model350Icon";
import { ArrowRight, Github, Lock } from "lucide-react";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="mt-16">
      <div className="mb-16">
        <h2 className="text-xl font-semibold mb-6 text-center doto-black">Get Started</h2>
        <div className="bg-card rounded-md p-8 flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0 md:mr-8">
            <h3 className="text-lg  font-medium mb-2">
              Ready to enhance your security?
            </h3>
            <p className="text-muted-foreground mb-4">
              Deploy The Watcher in your environment and experience
              next-generation AI surveillance.
            </p>
            <button className="bg-primary text-primary-foreground px-6 py-3 rounded-md flex items-center hover:bg-primary/90 transition-colors">
              Request Access <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
          <div className="w-full md:w-1/3">
            <div className="bg-accent p-6 rounded-md">
              <h4 className="text-md font-medium mb-4">Enterprise Solutions</h4>
              <ul className="space-y-2 text-accent-foreground">
                <li className="flex items-center">
                  <Lock className="w-4 h-4 mr-2 text-muted-foreground" /> Custom
                  deployment
                </li>
                <li className="flex items-center">
                  <Lock className="w-4 h-4 mr-2 text-muted-foreground" />{" "}
                  Dedicated support
                </li>
                <li className="flex items-center">
                  <Lock className="w-4 h-4 mr-2 text-muted-foreground" /> Model
                  customization
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center text-muted-foreground mb-8 ">
        <div className="mb-4">
          <Model350Icon width={100} height={100} className="inline-block  " />
        </div>
        <p className="mb-2">The Watcher — Intelligent Surveillance</p>
        <p className="mb-4">© 2025 The Watcher AI. All rights reserved.</p>
        <div className="flex justify-center space-x-4">
          <Link
            href="https://github.com/atharva00721"
            target="_blank"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github className="w-5 h-5" />
          </Link>
          <Link
            href="#"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            href="#"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
