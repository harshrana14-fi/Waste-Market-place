"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Bell, User, Menu, X, ChevronDown, LogOut, Recycle } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
  };

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isUserMenuOpen || isMobileMenuOpen) {
        setIsUserMenuOpen(false);
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isUserMenuOpen, isMobileMenuOpen]);

  return (
    <>
      {/* Spacer to prevent content jump */}
     
      
      <header className={`fixed top-4 left-4 right-4 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'top-2' 
          : 'top-4'
      }`}>
        <div className={`max-w-7xl mx-auto transition-all duration-500 ${
          isScrolled 
            ? 'bg-white/90 backdrop-blur-xl shadow-2xl border border-gray-200/50 rounded-2xl' 
            : 'bg-white/95 backdrop-blur-md shadow-xl border border-gray-100 rounded-2xl'
        }`}>
          <div className="px-6 lg:px-8">
            <div className="h-16 flex items-center justify-between">
              {/* Enhanced Logo */}
              <Link href="/" className="flex items-center gap-3 group">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 via-green-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                    <Recycle className="w-6 h-6 text-white group-hover:rotate-180 transition-transform duration-500" />
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                </div>
                <div className="relative">
                  <h1 className="font-bold text-xl bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                    WasteFlow
                  </h1>
                  <div className="text-xs font-medium bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    Circular Economy Platform
                  </div>
                </div>
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center">
                <div className="flex items-center bg-gray-50/70 rounded-xl p-1 gap-1">
                  {[
                    { href: '/marketplace', label: 'Marketplace' },
                    { href: '/about', label: 'About' },
                    { href: '/how-it-works', label: 'How It Works' },
                    { href: '/pricing', label: 'Pricing' },
                    { href: '/contact', label: 'Contact' }
                  ].map((item) => (
                    <Link 
                      key={item.href}
                      href={item.href} 
                      className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-emerald-600 hover:bg-white rounded-lg transition-all duration-200 hover:shadow-sm relative group"
                    >
                      {item.label}
                      <div className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 rounded-full"></div>
                    </Link>
                  ))}
                </div>
              </nav>

              {/* Right Side Actions */}
              <div className="flex items-center gap-3">
                {session ? (
                  <>
                    {/* Notifications */}
                    <button className="relative p-2.5 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all duration-200 group">
                      <Bell className="w-5 h-5" />
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-full">
                        <div className="w-full h-full bg-red-500 rounded-full animate-ping"></div>
                      </div>
                      <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                        <span className="text-[10px] text-white font-bold">3</span>
                      </span>
                    </button>

                    {/* User Menu */}
                    <div className="relative" onClick={(e) => e.stopPropagation()}>
                      <button 
                        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                        className="flex items-center gap-3 p-2 pr-3 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all duration-200 border border-transparent hover:border-gray-200"
                      >
                        <div className="relative">
                          <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-md">
                            <User className="w-4 h-4 text-white" />
                          </div>
                          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
                        </div>
                        <div className="hidden sm:block text-left">
                          <div className="text-sm font-medium text-gray-900">{session.user?.name}</div>
                          <div className="text-xs text-gray-500 capitalize">{(session as any)?.role || 'User'}</div>
                        </div>
                        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                      </button>

                      {/* Enhanced User Dropdown */}
                      {isUserMenuOpen && (
                        <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-in slide-in-from-top-2 duration-200">
                          <div className="p-4 bg-gradient-to-br from-emerald-50 to-teal-50 border-b border-gray-100">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-md">
                                <User className="w-6 h-6 text-white" />
                              </div>
                              <div>
                                <p className="font-semibold text-gray-900">{session.user?.name}</p>
                                <p className="text-sm text-gray-600">{session.user?.email}</p>
                                <span className="inline-block px-3 py-1 text-xs font-medium bg-emerald-100 text-emerald-700 rounded-full mt-1">
                                  {(session as any)?.role || 'User'}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="p-2">
                            <Link 
                              href={`/dashboard/${(session as any)?.role || 'producer'}`}
                              className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-colors"
                              onClick={() => setIsUserMenuOpen(false)}
                            >
                              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                <User className="w-4 h-4 text-blue-600" />
                              </div>
                              Dashboard
                            </Link>
                            <Link 
                              href="/profile"
                              className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-colors"
                              onClick={() => setIsUserMenuOpen(false)}
                            >
                              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                                <User className="w-4 h-4 text-purple-600" />
                              </div>
                              Profile Settings
                            </Link>
                          </div>
                          <div className="p-2 border-t border-gray-100">
                            <button
                              onClick={handleSignOut}
                              className="flex items-center gap-3 w-full px-3 py-2.5 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl transition-colors"
                            >
                              <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                                <LogOut className="w-4 h-4 text-red-600" />
                              </div>
                              Sign Out
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="flex items-center gap-2">
                    <Link 
                      href="/auth/login" 
                      className="px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all duration-200"
                    >
                      Sign In
                    </Link>
                    <Link 
                      href="/auth/register" 
                      className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-medium text-sm rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
                    >
                      Get Started
                    </Link>
                  </div>
                )}

                {/* Mobile Menu Button */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMobileMenuOpen(!isMobileMenuOpen);
                  }}
                  className="lg:hidden p-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all duration-200"
                >
                  <div className="relative w-5 h-5">
                    <Menu className={`absolute inset-0 transition-all duration-200 ${isMobileMenuOpen ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'}`} />
                    <X className={`absolute inset-0 transition-all duration-200 ${isMobileMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'}`} />
                  </div>
                </button>
              </div>
            </div>

            {/* Enhanced Mobile Menu */}
            {isMobileMenuOpen && (
              <div className="lg:hidden border-t border-gray-100 bg-white/50 backdrop-blur-sm">
                <div className="p-4 space-y-2">
                  <nav className="space-y-1">
                    {[
                      { href: '/marketplace', label: 'Marketplace', icon: '🏪' },
                      { href: '/about', label: 'About', icon: '💡' },
                      { href: '/how-it-works', label: 'How It Works', icon: '⚙️' },
                      { href: '/pricing', label: 'Pricing', icon: '💰' },
                      { href: '/contact', label: 'Contact', icon: '📞' }
                    ].map((item) => (
                      <Link 
                        key={item.href}
                        href={item.href} 
                        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all duration-200 font-medium"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <span className="text-lg">{item.icon}</span>
                        {item.label}
                      </Link>
                    ))}
                  </nav>

                  {!session && (
                    <div className="pt-4 border-t border-gray-200 space-y-2">
                      <Link 
                        href="/auth/login"
                        className="block w-full px-4 py-3 text-center text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all duration-200 font-medium"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Sign In
                      </Link>
                      <Link 
                        href="/auth/register"
                        className="block w-full px-4 py-3 text-center bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-medium rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-200"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Get Started
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

  </>
  );
}