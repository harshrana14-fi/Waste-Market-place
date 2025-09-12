"use client";
import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle, Users, Zap, Shield, TrendingUp, Star, Globe, Factory, Recycle, Building, Play, Award, Target, Leaf, BarChart3, Lightbulb, ChevronDown, Menu, X, Link } from "lucide-react";

export default function EnhancedHomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  
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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen">
      

      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 pt-16 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-2000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-2">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full text-green-800 text-sm font-semibold">
                <Award className="w-4 h-4 mr-2" />
                #1 AI-Powered Waste Platform
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
                Transform 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">
                  Waste
                </span>
                <br />Into Valuable <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Resources</span>
              
                
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                Join the world's leading AI-powered waste marketplace. Connect producers, recyclers, 
                and corporates to create a sustainable circular economy that generates real value.
              </p>

              {/* Stats Row */}
              <div className="grid grid-cols-2 gap-6 py-4">
                <div>
                  <div className="text-3xl font-bold text-gray-900">$2.5M+</div>
                  <div className="text-gray-600">Revenue Generated</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900">85%</div>
                  <div className="text-gray-600">Waste Reduction</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="/auth/register" className="group px-8 py-4 bg-gradient-to-r from-green-600 to-blue-600 text-white font-bold rounded-2xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
                  Get Started Free
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a href="/marketplace" className="px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-2xl hover:border-green-500 hover:bg-green-50 transition-all duration-300 flex items-center justify-center gap-2">
                  <Globe className="w-5 h-5" />
                  Browse Marketplace
                </a>
              </div>
            </div>
          
    

            {/* Right Column - Visual */}
            <div className="relative">
              {/* Main Image Container */}
              <div className="relative bg-white rounded-3xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="bg-gradient-to-br from-green-100 to-blue-100 rounded-2xl p-6 h-80">
                  {/* Mock Dashboard */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-800">Waste Analytics</h3>
                      <div className="flex gap-1">
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white rounded-lg p-3">
                        <div className="text-2xl font-bold text-green-600">47.2K</div>
                        <div className="text-sm text-gray-600">Tons Processed</div>
                      </div>
                      <div className="bg-white rounded-lg p-3">
                        <div className="text-2xl font-bold text-blue-600">$1.8M</div>
                        <div className="text-sm text-gray-600">Revenue</div>
                      </div>
                    </div>
                    
                    {/* Mock Chart */}
                    <div className="bg-white rounded-lg p-4 h-32">
                      <div className="flex items-end justify-between h-full">
                        {[40, 70, 45, 80, 60, 90, 75].map((height, i) => (
                          <div 
                            key={i} 
                            className="bg-gradient-to-t from-green-400 to-blue-400 rounded-t w-4"
                            style={{ height: `${height}%` }}
                          ></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -left-4 bg-white rounded-2xl shadow-xl p-4 animate-bounce">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-semibold">Live Matching</span>
                </div>
              </div>

              <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-xl p-4">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm font-semibold">AI Powered</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-6 h-6 text-gray-400" />
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-2">500+</div>
              <div className="text-gray-600">Verified Partners</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-2">50K+</div>
              <div className="text-gray-600">Tons Processed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-2">$2M+</div>
              <div className="text-gray-600">Value Created</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-2">95%</div>
              <div className="text-gray-600">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-800 text-sm font-semibold mb-4">
              <Lightbulb className="w-4 h-4 mr-2" />
              Simple Process
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI-powered platform makes waste trading simple, efficient, and profitable for everyone involved.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative text-center p-8 bg-white rounded-3xl shadow-lg hover:shadow-xl transition-shadow border border-orange-100">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-3xl flex items-center justify-center mx-auto mb-6 transform hover:scale-110 transition-transform">
                <Factory className="w-10 h-10 text-white" />
              </div>
              <div className="absolute top-4 right-4 bg-orange-100 text-orange-600 text-sm font-bold px-3 py-1 rounded-full">
                Step 1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">List Your Waste</h3>
              <p className="text-gray-600 mb-6">
                Producers list their waste materials with detailed specifications, volume, and location through our intelligent form system.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span>AI-powered quality assessment</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span>Real-time market pricing</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span>Instant verification</span>
                </div>
              </div>
            </div>

            <div className="relative text-center p-8 bg-white rounded-3xl shadow-lg hover:shadow-xl transition-shadow border border-green-100">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-3xl flex items-center justify-center mx-auto mb-6 transform hover:scale-110 transition-transform">
                <Zap className="w-10 h-10 text-white" />
              </div>
              <div className="absolute top-4 right-4 bg-green-100 text-green-600 text-sm font-bold px-3 py-1 rounded-full">
                Step 2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">AI Smart Matching</h3>
              <p className="text-gray-600 mb-6">
                Our advanced AI algorithm finds optimal matches based on type, quality, location, capacity, and sustainability goals.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span>Machine learning algorithms</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span>Geographic optimization</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span>Quality compatibility scoring</span>
                </div>
              </div>
            </div>

            <div className="relative text-center p-8 bg-white rounded-3xl shadow-lg hover:shadow-xl transition-shadow border border-blue-100">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-3xl flex items-center justify-center mx-auto mb-6 transform hover:scale-110 transition-transform">
                <Recycle className="w-10 h-10 text-white" />
              </div>
              <div className="absolute top-4 right-4 bg-blue-100 text-blue-600 text-sm font-bold px-3 py-1 rounded-full">
                Step 3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Process & Profit</h3>
              <p className="text-gray-600 mb-6">
                Recyclers process materials efficiently while earning revenue and generating verified green credits for sustainability reporting.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span>Guaranteed revenue streams</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span>Verified carbon credits</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span>Real-time impact tracking</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">  Why Choose Our Platform </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive solutions designed for every stakeholder in the waste management ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Zap, title: "AI-Powered Matching", desc: "Advanced algorithms ensure optimal matches between waste producers and recyclers, maximizing efficiency and value.", color: "green" },
              { icon: Shield, title: "Verified Network", desc: "All partners are thoroughly verified and rated, ensuring quality and reliability in every transaction.", color: "blue" },
              { icon: BarChart3, title: "Real-Time Analytics", desc: "Comprehensive dashboards and reporting tools help you track performance and optimize operations.", color: "purple" },
              { icon: Globe, title: "Global Marketplace", desc: "Connect with partners worldwide and access international markets for your waste materials.", color: "orange" },
              { icon: Users, title: "24/7 Expert Support", desc: "Our dedicated support team is available around the clock to help you succeed on our platform.", color: "green" },
              { icon: Building, title: "Enterprise Solutions", desc: "Scalable solutions designed for large corporations with complex waste management needs.", color: "blue" }
            ].map((feature, index) => (
              <div key={index} className="group bg-gray-50 rounded-2xl p-8 hover:bg-white hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className={`w-14 h-14 bg-${feature.color}-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`w-7 h-7 text-${feature.color}-600`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 mb-6">{feature.desc}</p>
                <div className={`flex items-center text-${feature.color}-600 font-semibold group-hover:gap-3 transition-all cursor-pointer`}>
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full text-green-800 text-sm font-semibold mb-4">
              <Star className="w-4 h-4 mr-2" />
              Customer Stories
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Partners Say</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join thousands of satisfied companies transforming their waste management.
            </p>
          </div>

          <div className="relative">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 relative">
              {/* Subtle Background Pattern */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-green-50 to-blue-50 rounded-full -translate-y-4 translate-x-4 opacity-40"></div>
              
              {/* Content */}
              <div className="relative z-10">
                {/* Stars */}
                <div className="flex justify-center mb-6">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                
                {/* Testimonial Text */}
                <blockquote className="text-lg text-gray-700 mb-6 leading-relaxed text-center max-w-2xl mx-auto">
                  "{testimonials[currentTestimonial].quote}"
                </blockquote>
                
                {/* Author Info */}
                <div className="flex items-center justify-center gap-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${testimonials[currentTestimonial].gradient} rounded-xl flex items-center justify-center`}>
                    <span className="text-white font-semibold text-sm">{testimonials[currentTestimonial].initials}</span>
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-gray-900">{testimonials[currentTestimonial].author}</div>
                    <div className="text-gray-600 text-sm">{testimonials[currentTestimonial].title}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              {/* Previous Arrow */}
              <button
                onClick={() => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:border-green-500 hover:bg-green-50 transition-all group"
              >
                <svg className="w-4 h-4 text-gray-400 group-hover:text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Dots Indicator */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentTestimonial 
                        ? 'bg-green-500 w-6' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>

              {/* Next Arrow */}
              <button
                onClick={() => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)}
                className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:border-green-500 hover:bg-green-50 transition-all group"
              >
                <svg className="w-4 h-4 text-gray-400 group-hover:text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-5xl font-bold mb-6">Ready to Transform Your Waste Into Wealth?</h2>
          <p className="text-xl text-green-100 mb-12 max-w-2xl mx-auto">
            Join the circular economy revolution. Start trading waste as a valuable resource today and contribute to a sustainable future.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
            <button className="group px-10 py-4 bg-white text-green-600 font-bold rounded-2xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center justify-center gap-2">
              Start Free Trial
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-10 py-4 border-2 border-white text-white font-semibold rounded-2xl hover:bg-white/10 transition-all duration-300">
              Schedule Demo
            </button>
          </div>

          <div className="text-sm text-green-100">
            No credit card required • Free 30-day trial • Cancel anytime
          </div>
        </div>
      </section>

    </div>
  );
}