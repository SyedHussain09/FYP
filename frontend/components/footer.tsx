'use client';

import { Heart, Github, Linkedin, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative mt-auto border-t border-white/10 bg-slate-950/50 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Social Links - Centered */}
        <div className="flex items-center justify-center gap-4 mb-4">
          <a
            href="https://github.com/SyedHussain09"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
            aria-label="GitHub"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/syedhussain014/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href="mailto:syedsajjadhussain014@gmail.com"
            className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
            aria-label="Email"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>

        {/* Copyright */}
        <div className="pt-4 border-t border-white/5 text-center text-xs sm:text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Career Compass. All rights reserved.</p>
          <p className="mt-1">Developed by ~Syed Sajjad Hussain</p>
        </div>
      </div>
    </footer>
  );
}
