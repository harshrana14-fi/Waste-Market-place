"use client";
import React, { useState, useEffect } from 'react';
import Header from "@/components/layout/Header";
import Hero from "@/components/home/Hero";
import OurSolutions from "@/components/home/OurSolutions";
import HowItWorks from "@/components/home/HowItWorks";
import Testimonials from "@/components/home/Testimonials";
import VideoTeaser from "@/components/home/VideoTeaser";
import ContactSection from "@/components/home/ContactSection";
import { ArrowRight, CheckCircle, Users, Zap, Shield, TrendingUp, Star, Globe, Factory, Recycle, Building, Play, Award, Target, Leaf, BarChart3, Lightbulb, ChevronDown, Menu, X, Link, Phone, Mail, MapPin, ChevronLeft, ChevronRight, Truck, Package, Clock, ShieldCheck, DollarSign, TrendingUp as TrendingUpIcon, Award as AwardIcon, CheckCircle2, ArrowUpRight } from "lucide-react";
import Footer from '@/components/layout/Footer';

export default function EnhancedHomePage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [currentFeature, setCurrentFeature] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  
  const testimonials = [
    {
      quote: "The AI matching system has revolutionized our waste management. We've increased our recycling rate by 40% and generated significant revenue.",
      author: "Krish V",
      title: "CEO, GreenTech Industries",
      initials: "JD",
      gradient: "from-orange-500 to-red-500"
    },
    {
      quote: "As a recycler, the platform has connected us with high-quality materials and reliable suppliers. Our processing efficiency has improved dramatically.",
      author: "Riya G",
      title: "Operations Director, EcoRecycle Co.",
      initials: "SM",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      quote: "The ESG reporting features have been invaluable for our sustainability goals. We've reduced our waste footprint by 60% this year.",
      author: "Rahul",
      title: "Sustainability Manager, GlobalCorp",
      initials: "MR",
      gradient: "from-blue-500 to-indigo-500"
    }
  ];

  const materialCategories = [
    { name: "Metal", icon: "🔧", color: "from-gray-600 to-gray-800", count: "2,500+ listings" },
    { name: "Plastic", icon: "♻️", color: "from-blue-500 to-blue-700", count: "3,200+ listings" },
    { name: "Paper", icon: "📄", color: "from-amber-500 to-amber-700", count: "1,800+ listings" },
    { name: "E-Waste", icon: "💻", color: "from-purple-500 to-purple-700", count: "950+ listings" }
  ];

  const features = [
    {
      title: "AI-Matched Connections",
      description: "Smartly connect waste producers with qualified recyclers. Chat, negotiate, and finalize deals directly on the platform.",
      image: "/images/match1.webp",
      icon: "🤝"
    },
    {
      title: "Quality & Compliance Signals",
      description: "Make informed decisions with profiles, documents, and community ratings—no operational QC or logistics provided by us.",
      image: "/images/second.webp",
      icon: "🔍"
    },
    {
      title: "Deal Tracking & Documentation",
      description: "Track conversation status, agreements, and documentation in one place. Logistics and delivery are handled between parties.",
      image: "/images/deal.webp",
      icon: "🗂️"
    }
  ];

  

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <Hero materialCategories={materialCategories as any} />

      <OurSolutions features={features as any} currentFeature={currentFeature} setCurrentFeature={setCurrentFeature} />

      <HowItWorks />

      <Testimonials testimonials={testimonials as any} currentIndex={currentTestimonial} setCurrentIndex={setCurrentTestimonial} />


      <VideoTeaser />

      {/* Price Trends & Industry Updates */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Price trends, Industry updates and more...</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "How to ensure quality while purchasing plastic scrap",
                category: "Plastic Recycling",
                readTime: "5 min read",
                image: "📊"
              },
              {
                title: "Post Consumer Recycled Plastic vs Virgin Plastic: A Sustainable Choice",
                category: "Sustainability",
                readTime: "7 min read",
                image: "♻️"
              },
              {
                title: "Factors Affecting Plastic Scrap Prices in India",
                category: "Market Analysis",
                readTime: "6 min read",
                image: "📈"
              },
              {
                title: "How sustainability-focussed brands can source their raw materials",
                category: "Brand Strategy",
                readTime: "8 min read",
                image: "🏢"
              },
              {
                title: "Which industries are set to become sustainable in the coming decade",
                category: "Future Trends",
                readTime: "9 min read",
                image: "🔮"
              },
              {
                title: "How to Find Reputable Sellers and Avoid Scams When Buying Plastic Scrap Online?",
                category: "Safety Tips",
                readTime: "4 min read",
                image: "🛡️"
              }
            ].map((article, index) => (
              <div key={index} className="group bg-gray-50 rounded-2xl p-6 hover:bg-white hover:shadow-xl transition-all duration-300 border border-gray-100 cursor-pointer">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{article.image}</div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm font-medium text-green-600">{article.category}</span>
                  <span className="text-sm text-gray-400">•</span>
                  <span className="text-sm text-gray-500">{article.readTime}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                  {article.title}
                </h3>
                <div className="flex items-center text-green-600 font-medium group-hover:gap-2 transition-all">
                  Read More
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      <ContactSection />
      {/* <Footer /> */}
      <Footer />
    </div>
  );
}