"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Search, Bell, User, Menu, X, Building, Leaf, BarChart3, Settings, LogOut, Target } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

export default function CorporateNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200' 
        : 'bg-white/90 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/dashboard/corporate" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
              <Building className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-bold text-xl text-gray-900">Corporate Portal</span>
              <div className="text-xs text-blue-600 -mt-1">Sustainability Hub</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            <Link href="/dashboard/corporate" className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors font-medium">
              <BarChart3 className="w-4 h-4" />
              Dashboard
            </Link>
            <Link href="/corporate/sustainability" className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors font-medium">
              <Leaf className="w-4 h-4" />
              Sustainability
            </Link>
            <Link href="/corporate/goals" className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors font-medium">
              <Target className="w-4 h-4" />
              ESG Goals
            </Link>
            <Link href="/corporate/suppliers" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Supplier Network
            </Link>
            <Link href="/marketplace" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Marketplace
            </Link>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                2
              </span>
            </button>

            {/* User Menu */}
            <div className="relative">
              <button 
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 p-2 text-gray-700 hover:text-gray-900 transition-colors"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className="hidden sm:block text-sm font-medium">{session?.user?.name}</span>
              </button>

              {/* User Dropdown */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">{session?.user?.name}</p>
                    <p className="text-xs text-gray-500">{session?.user?.email}</p>
                    <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full mt-1">
                      Corporate
                    </span>
                  </div>
                  <Link 
                    href="/corporate/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <Settings className="w-4 h-4 inline mr-2" />
                    Profile Settings
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="w-4 h-4 inline mr-2" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white/95 backdrop-blur-md">
            <div className="px-4 py-4 space-y-4">
              {/* Mobile Navigation */}
              <nav className="space-y-2">
                <Link 
                  href="/dashboard/corporate" 
                  className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <BarChart3 className="w-4 h-4" />
                  Dashboard
                </Link>
                <Link 
                  href="/corporate/sustainability" 
                  className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Leaf className="w-4 h-4" />
                  Sustainability
                </Link>
                <Link 
                  href="/corporate/goals" 
                  className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Target className="w-4 h-4" />
                  ESG Goals
                </Link>
                <Link 
                  href="/corporate/suppliers" 
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Supplier Network
                </Link>
                <Link 
                  href="/marketplace" 
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Marketplace
                </Link>
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
