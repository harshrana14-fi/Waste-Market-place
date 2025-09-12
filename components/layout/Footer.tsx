import Link from "next/link";
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">W</span>
              </div>
              <div>
                <span className="font-bold text-xl">Waste→Resource</span>
                <div className="text-xs text-gray-400 -mt-1">Marketplace</div>
              </div>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Transforming industrial waste into valuable resources through our AI-powered marketplace. 
              Connecting producers, recyclers, and corporates for a sustainable future.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-green-600 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-green-600 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-green-600 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-green-600 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/marketplace" className="text-gray-300 hover:text-white transition-colors">
                  Browse Marketplace
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-gray-300 hover:text-white transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-gray-300 hover:text-white transition-colors">
                  Pricing Plans
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Services</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/services/waste-trading" className="text-gray-300 hover:text-white transition-colors">
                  Waste Trading
                </Link>
              </li>
              <li>
                <Link href="/services/ai-matching" className="text-gray-300 hover:text-white transition-colors">
                  AI Matching
                </Link>
              </li>
              <li>
                <Link href="/services/green-credits" className="text-gray-300 hover:text-white transition-colors">
                  Green Credits
                </Link>
              </li>
              <li>
                <Link href="/services/analytics" className="text-gray-300 hover:text-white transition-colors">
                  Analytics & Reporting
                </Link>
              </li>
              <li>
                <Link href="/services/compliance" className="text-gray-300 hover:text-white transition-colors">
                  Compliance Tracking
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">Email</p>
                  <a href="mailto:info@wasteresource.com" className="text-white hover:text-green-400 transition-colors">
                    info@wasteresource.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">Phone</p>
                  <a href="tel:+1-555-0123" className="text-white hover:text-green-400 transition-colors">
                    +1 (555) 012-3456
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">Address</p>
                  <p className="text-white">
                    123 Green Street<br />
                    San Francisco, CA 94105
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 pt-8 border-t border-gray-800">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
            <p className="text-gray-300 mb-6">
              Get the latest news about waste management innovations and sustainability trends.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-white placeholder-gray-400"
              />
              <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center justify-center gap-2">
                Subscribe
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-gray-400 text-sm">
              © 2024 Waste→Resource Marketplace. All rights reserved.
            </div>
            <div className="flex items-center gap-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-white transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}