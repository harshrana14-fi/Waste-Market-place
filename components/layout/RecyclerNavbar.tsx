"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Search, Bell, User, Menu, X, Zap, Recycle, TrendingUp, BarChart3, Settings, LogOut } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

export default function RecyclerNavbar() {
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
          <Link href="/dashboard/recycler" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
              <Recycle className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-bold text-xl text-gray-900">Recycler Portal</span>
              <div className="text-xs text-green-600 -mt-1">Waste Processing</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            <Link href="/dashboard/recycler" className="flex items-center gap-2 text-gray-700 hover:text-green-600 transition-colors font-medium">
              <BarChart3 className="w-4 h-4" />
              Dashboard
            </Link>
            <Link href="/recycler/matches" className="flex items-center gap-2 text-gray-700 hover:text-green-600 transition-colors font-medium">
              <Zap className="w-4 h-4" />
              AI Matches
            </Link>
            <Link href="/recycler/transactions" className="flex items-center gap-2 text-gray-700 hover:text-green-600 transition-colors font-medium">
              <TrendingUp className="w-4 h-4" />
              Transactions
            </Link>
            <Link href="/marketplace" className="text-gray-700 hover:text-green-600 transition-colors font-medium">
              Browse Marketplace
            </Link>
          </nav>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search waste materials..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
              />
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                5
              </span>
            </button>

            {/* User Menu */}
            <div className="relative">
              <button 
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 p-2 text-gray-700 hover:text-gray-900 transition-colors"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
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
                    <span className="inline-block px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full mt-1">
                      Recycler
                    </span>
                  </div>
                  <Link 
                    href="/recycler/profile"
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
              {/* Mobile Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search waste materials..."
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                />
              </div>

              {/* Mobile Navigation */}
              <nav className="space-y-2">
                <Link 
                  href="/dashboard/recycler" 
                  className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:text-green-600 transition-colors font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <BarChart3 className="w-4 h-4" />
                  Dashboard
                </Link>
                <Link 
                  href="/recycler/matches" 
                  className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:text-green-600 transition-colors font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Zap className="w-4 h-4" />
                  AI Matches
                </Link>
                <Link 
                  href="/recycler/transactions" 
                  className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:text-green-600 transition-colors font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <TrendingUp className="w-4 h-4" />
                  Transactions
                </Link>
                <Link 
                  href="/marketplace" 
                  className="block px-3 py-2 text-gray-700 hover:text-green-600 transition-colors font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Browse Marketplace
                </Link>
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
