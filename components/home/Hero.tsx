"use client";
import { Award, ArrowRight, TrendingUp, Recycle, DollarSign, Factory, Leaf, Package } from "lucide-react";
import { useState, useEffect } from "react";
import { FadeUpWhenVisible, StaggerContainer, itemVariants } from "@/components/ui/Motion";
import { motion } from "framer-motion";

type MaterialCategory = { name: string; icon: string; count: string };

export default function Hero({ materialCategories }: { materialCategories: MaterialCategory[] }) {
  const [tons, setTons] = useState(47200);
  const [revenue, setRevenue] = useState(1800000);

  useEffect(() => {
    const interval = setInterval(() => {
      setTons(prev => prev + Math.floor(Math.random() * 10));
      setRevenue(prev => prev + Math.floor(Math.random() * 1000));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-green-50 pt-6 md:pt-8 overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-20 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Recycling icons pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-40 left-1/4"><Recycle className="w-12 h-12 text-emerald-600" /></div>
        <div className="absolute top-60 right-1/3"><Leaf className="w-16 h-16 text-green-600" /></div>
        <div className="absolute bottom-40 left-1/3"><Package className="w-10 h-10 text-emerald-600" /></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-3 md:py-4">
        <StaggerContainer className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
          <motion.div variants={itemVariants} className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full text-green-800 text-sm font-semibold">
                <Award className="w-4 h-4 mr-2" />
                #1 AI-Powered Waste Platform
              </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-5xl lg:text-7xl font-black leading-tight">
              <span className="text-slate-900">Transform</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-600"> Waste</span>
              <br />
              <span className="text-slate-900">Into Valuable</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-emerald-600">
                Resources
              </span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-xl text-slate-700 leading-relaxed max-w-xl">
              Join the world's leading AI-powered waste marketplace. Connect producers, recyclers, and corporates to create a sustainable circular economy that generates real value.
            </motion.p>

            

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 pt-4">
              <a href="/auth/login"
              className="group px-8 py-4 bg-gradient-to-r from-emerald-600 to-green-600 text-white font-bold rounded-2xl hover:shadow-2xl hover:shadow-emerald-500/50 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
                Get Started Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </a>
              <a
                href="/marketplace"
                className="px-8 py-4 bg-white border-2 border-slate-300 text-slate-700 font-semibold rounded-2xl hover:border-emerald-500 hover:bg-emerald-50 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="currentColor"/>
                </svg>
                Browse Marketplace
              </a>
            </motion.div>
          </div>

          {/* Right Content - Video Showcase */}
          <FadeUpWhenVisible className="relative">
               {/* Main Video Container */}
               <div className="bg-white rounded-3xl p-3 shadow-2xl border border-slate-200 transform hover:scale-[1.02] transition-all duration-300">
              <div className="relative aspect-video bg-slate-900 rounded-2xl overflow-hidden">
                <video 
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  preload="auto"
                  className="w-full h-full object-cover"
                >
                  <source src="/videos/hero.mp4" type="video/mp4" />
                  <source src="https://assets.mixkit.co/videos/preview/mixkit-recycling-plant-machinery-sorting-waste-4273-large.mp4" type="video/mp4" />
                  {/* Fallback gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 to-green-600 flex items-center justify-center">
                    <Recycle className="w-20 h-20 text-white opacity-50 animate-spin" style={{ animationDuration: '3s' }} />
                  </div>
                </video>
                
                {/* Video Label */}
                <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <div className="text-white text-sm font-semibold">Waste Processing Facility</div>
                </div>
              </div>

              
            </div>

            {/* Secondary Auto-playing Videos */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl p-3 shadow-lg border border-slate-200 hover:shadow-xl transition-all group cursor-pointer">
                <div className="aspect-video bg-slate-900 rounded-lg mb-2 relative overflow-hidden">
                  <video 
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    className="w-full h-full object-cover"
                  >
                    <source src="/videos/plastic.mp4" type="video/mp4" />
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                      <Package className="w-12 h-12 text-white opacity-50" />
                    </div>
                  </video>
                  <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-white text-xs font-semibold">
                    Plastic Recycling
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-3 shadow-lg border border-slate-200 hover:shadow-xl transition-all group cursor-pointer">
                <div className="aspect-video bg-slate-900 rounded-lg mb-2 relative overflow-hidden">
                  <video 
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    className="w-full h-full object-cover"
                  >
                    <source src="https://assets.mixkit.co/videos/preview/mixkit-industrial-metal-recycling-plant-4274-large.mp4" type="video/mp4" />
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                      <Recycle className="w-12 h-12 text-white opacity-50" />
                    </div>
                  </video>
                  <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-white text-xs font-semibold">
                    Metal Trading
                  </div>
                </div>
              </div>
            </div>


            {/* AI Badge */}
            <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl px-6 py-3 shadow-xl border-4 border-white flex items-center gap-2">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="currentColor"/>
              </svg>
              <span className="text-white font-bold">AI Powered</span>
            </div>
          </FadeUpWhenVisible>
        </StaggerContainer>
      </div>
    </section>
  );
}