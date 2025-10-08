import Link from "next/link";
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, ArrowRight, ChevronUp, Sparkles, Zap, Globe, Shield } from "lucide-react";

export default function Footer() {
  return (
    <>
      <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
        

        {/* Main Footer Content */}
        <div className="relative max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center group hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-xl">W</span>
                <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </div>
              <div>
                <span className="font-bold text-2xl bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                  Waste→Resource
                </span>
                <div className="text-sm text-gray-400 -mt-1 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  AI-Powered Marketplace
                </div>
              </div>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Transforming industrial waste into valuable resources through our AI-powered marketplace. 
              Connecting producers, recyclers, and corporates for a sustainable future.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                <div className="flex items-center gap-2 mb-1">
                  <Zap className="w-4 h-4 text-green-400" />
                  <span className="text-sm font-semibold">AI Matching</span>
                </div>
                <p className="text-xs text-gray-400">Smart connections</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-3 border border-white/10">
                <div className="flex items-center gap-2 mb-1">
                  <Globe className="w-4 h-4 text-blue-400" />
                  <span className="text-sm font-semibold">Global Reach</span>
                </div>
                <p className="text-xs text-gray-400">Worldwide network</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <a href="#" className="group w-11 h-11 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-green-500 hover:scale-110 transition-all duration-300 border border-white/20">
                <Facebook className="w-5 h-5 group-hover:animate-bounce" />
              </a>
              <a href="#" className="group w-11 h-11 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-blue-500 hover:scale-110 transition-all duration-300 border border-white/20">
                <Twitter className="w-5 h-5 group-hover:animate-bounce" />
              </a>
              <a href="#" className="group w-11 h-11 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-blue-600 hover:scale-110 transition-all duration-300 border border-white/20">
                <Linkedin className="w-5 h-5 group-hover:animate-bounce" />
              </a>
              <a href="#" className="group w-11 h-11 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-pink-500 hover:scale-110 transition-all duration-300 border border-white/20">
                <Instagram className="w-5 h-5 group-hover:animate-bounce" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-xl mb-6 flex items-center gap-2">
              <Zap className="w-5 h-5 text-green-400" />
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/marketplace" className="group flex items-center gap-2 text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-1">
                  <div className="w-1 h-1 bg-green-400 rounded-full group-hover:scale-150 transition-transform"></div>
                  Browse Marketplace
                </Link>
              </li>
              <li>
                <Link href="/about" className="group flex items-center gap-2 text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-1">
                  <div className="w-1 h-1 bg-green-400 rounded-full group-hover:scale-150 transition-transform"></div>
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="group flex items-center gap-2 text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-1">
                  <div className="w-1 h-1 bg-green-400 rounded-full group-hover:scale-150 transition-transform"></div>
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="group flex items-center gap-2 text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-1">
                  <div className="w-1 h-1 bg-green-400 rounded-full group-hover:scale-150 transition-transform"></div>
                  Pricing Plans
                </Link>
              </li>
              <li>
                <Link href="/contact" className="group flex items-center gap-2 text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-1">
                  <div className="w-1 h-1 bg-green-400 rounded-full group-hover:scale-150 transition-transform"></div>
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-xl mb-6 flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-400" />
              Services
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/services/waste-trading" className="group flex items-center gap-2 text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-1">
                  <div className="w-1 h-1 bg-blue-400 rounded-full group-hover:scale-150 transition-transform"></div>
                  Waste Trading
                </Link>
              </li>
              <li>
                <Link href="/services/ai-matching" className="group flex items-center gap-2 text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-1">
                  <div className="w-1 h-1 bg-blue-400 rounded-full group-hover:scale-150 transition-transform"></div>
                  AI Matching
                </Link>
              </li>
              <li>
                <Link href="/services/green-credits" className="group flex items-center gap-2 text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-1">
                  <div className="w-1 h-1 bg-blue-400 rounded-full group-hover:scale-150 transition-transform"></div>
                  Green Credits
                </Link>
              </li>
              <li>
                <Link href="/services/analytics" className="group flex items-center gap-2 text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-1">
                  <div className="w-1 h-1 bg-blue-400 rounded-full group-hover:scale-150 transition-transform"></div>
                  Analytics & Reporting
                </Link>
              </li>
              <li>
                <Link href="/services/compliance" className="group flex items-center gap-2 text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-1">
                  <div className="w-1 h-1 bg-blue-400 rounded-full group-hover:scale-150 transition-transform"></div>
                  Compliance Tracking
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-xl mb-6 flex items-center gap-2">
              <Globe className="w-5 h-5 text-purple-400" />
              Contact Info
            </h3>
            <div className="space-y-4">
              <div className="group flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-all duration-300">
                <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <p className="text-gray-300 text-sm">Email</p>
                  <a href="mailto:info@wasteresource.com" className="text-white hover:text-green-400 transition-colors font-medium">
                    info@wasteresource.com
                  </a>
                </div>
              </div>
              <div className="group flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-all duration-300">
                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Phone className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-gray-300 text-sm">Phone</p>
                  <a href="tel:+1-555-0123" className="text-white hover:text-blue-400 transition-colors font-medium">
                    +91 XXXXXXXXXX
                  </a>
                </div>
              </div>
              <div className="group flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-all duration-300">
                <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <MapPin className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-gray-300 text-sm">Address</p>
                  <p className="text-white font-medium">
                    MAIT Rohini<br />
                    New Delhi, Delhi
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="max-w-2xl mx-auto text-center">
            <div className="relative">
              <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                Stay Updated
              </h3>
            </div>
            <p className="text-gray-300 mb-8 text-lg">
              Get the latest news about waste management innovations and sustainability trends.
            </p>
            <div className="relative">
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300 hover:bg-white/15"
                />
                <button className="group px-8 py-4 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-xl hover:from-green-600 hover:to-blue-700 transition-all duration-300 font-medium flex items-center justify-center gap-2 hover:scale-105 shadow-lg hover:shadow-xl">
                  Subscribe
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-xl blur-xl -z-10"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-gray-400 text-sm flex items-center gap-2">
              <span>© 2025 Waste→Resource Marketplace. All rights reserved.</span>
              <div className="hidden md:flex items-center gap-1">
                <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
                <div className="w-1 h-1 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                <div className="w-1 h-1 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-green-400 transition-colors hover:scale-105 transform duration-300">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-blue-400 transition-colors hover:scale-105 transform duration-300">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-purple-400 transition-colors hover:scale-105 transform duration-300">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
    </>
  );
}