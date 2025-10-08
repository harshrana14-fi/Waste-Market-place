"use client";
import { useState, useEffect } from "react";
import { FadeUpWhenVisible, StaggerContainer, itemVariants } from "@/components/ui/Motion";
import { motion } from "framer-motion";
import { Package, Zap, FileText, MessageSquare, ChevronRight, CheckCircle2, Play, ArrowRight, Sparkles, TrendingUp, ShieldCheck, Star } from "lucide-react";

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const steps = [
    {
      id: 0,
      icon: Package,
      title: "List Your Materials",
      shortTitle: "List",
      description: "Upload your inventory or post requirements instantly. Our AI-powered platform analyzes and categorizes your materials for optimal matching.",
      gradient: "from-blue-600 to-indigo-700",
      bgColor: "bg-blue-600",
      textColor: "text-blue-500",
      accentColor: "border-blue-500",
      features: ["Instant AI Cataloging", "Smart Pricing Suggestions", "Multi-format Support"],
      stat: "2M+",
      statLabel: "Active Listings"
    },
    {
      id: 1,
      icon: Zap,
      title: "Smart Matching",
      shortTitle: "Match",
      description: "Our intelligent algorithm scans 50,000+ verified businesses across India to find your perfect match in real-time.",
      gradient: "from-indigo-600 to-purple-700",
      bgColor: "bg-indigo-600",
      textColor: "text-indigo-500",
      accentColor: "border-indigo-500",
      features: ["AI-Powered Matching", "Real-time Negotiations", "Verified Partners Only"],
      stat: "15sec",
      statLabel: "Avg Match Time"
    },
    {
      id: 2,
      icon: MessageSquare,
      title: "Negotiate & Finalize",
      shortTitle: "Deal",
      description: "Chat directly with matched partners, agree on terms, and finalize the deal. Logistics are handled between the parties.",
      gradient: "from-purple-600 to-pink-700",
      bgColor: "bg-purple-600",
      textColor: "text-purple-500",
      accentColor: "border-purple-500",
      features: ["In-platform Chat", "Offer & Counter-offer", "Share Documents"],
      stat: "92%",
      statLabel: "Deals Concluded"
    }
  ];

  const ActiveIcon = steps[activeStep].icon;

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, steps.length]);

  const handleStepClick = (idx: number) => {
    setActiveStep(idx);
    setIsAutoPlaying(false);
  };

  return (
    <section className="relative py-32 bg-white overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgb(0 0 0) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Gradient Accents */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-purple-50 to-pink-50 rounded-full blur-3xl opacity-30"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <FadeUpWhenVisible className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full mb-6 border border-blue-100">
            <TrendingUp className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold text-blue-900">
              Trusted by 50,000+ Businesses
            </span>
          </div>
          <motion.h2 variants={itemVariants} className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
            How It Works
          </motion.h2>
          <motion.p variants={itemVariants} className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            A streamlined three-step process to connect buyers and sellers across India
          </motion.p>
        </FadeUpWhenVisible>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* LEFT: Interactive Step Cards */}
          <StaggerContainer className="space-y-6 order-2 lg:order-1">
            {steps.map((step, idx) => (
              <motion.button
                variants={itemVariants}
                key={step.id}
                onClick={() => handleStepClick(idx)}
                className={`w-full text-left transition-all duration-500 ${
                  activeStep === idx ? '' : 'hover:translate-x-1'
                }`}
              >
                <div className={`relative overflow-hidden rounded-2xl border-2 transition-all duration-500 bg-white ${
                  activeStep === idx
                    ? `${step.accentColor} shadow-2xl shadow-${step.bgColor}/10`
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-lg'
                }`}>
                  <div className="p-8">
                    <div className="flex items-start gap-6">
                      <div className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-500 ${
                        activeStep === idx
                          ? `${step.bgColor} shadow-lg`
                          : 'bg-gray-100'
                      }`}>
                        <step.icon className={`w-7 h-7 transition-all duration-500 ${
                          activeStep === idx ? 'text-white' : 'text-gray-600'
                        }`} />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <div className="text-sm font-semibold text-gray-500 mb-1">
                              Step {idx + 1}
                            </div>
                            <h3 className={`text-2xl font-bold transition-colors duration-500 ${
                              activeStep === idx ? 'text-gray-900' : 'text-gray-700'
                            }`}>
                              {step.title}
                            </h3>
                          </div>
                          <ArrowRight className={`w-6 h-6 transition-all duration-500 flex-shrink-0 ${
                            activeStep === idx
                              ? `${step.textColor} translate-x-0 opacity-100`
                              : 'text-gray-400 -translate-x-2 opacity-0'
                          }`} />
                        </div>
                        
                        <p className={`text-base leading-relaxed transition-colors duration-500 ${
                          activeStep === idx ? 'text-gray-600' : 'text-gray-500'
                        }`}>
                          {step.description}
                        </p>

                        {activeStep === idx && (
                          <div className="mt-6 space-y-3">
                            {step.features.map((feature, fIdx) => (
                              <div
                                key={fIdx}
                                className="flex items-center gap-3"
                                style={{
                                  animation: `slideInRight 0.4s ease-out ${fIdx * 0.1}s both`
                                }}
                              >
                                <CheckCircle2 className={`w-5 h-5 ${step.textColor} flex-shrink-0`} />
                                <span className="text-sm font-medium text-gray-700">{feature}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Progress Bar */}
                    {activeStep === idx && (
                      <div className="mt-6 h-1 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${step.bgColor} rounded-full`}
                          style={{
                            animation: isAutoPlaying ? 'progressBar 4s linear' : 'none',
                            width: isAutoPlaying ? '0%' : '100%'
                          }}
                        ></div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.button>
            ))}

            {/* CTA */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-8 text-white shadow-xl">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="text-2xl font-bold mb-2">Ready to Get Started?</h4>
                  <p className="text-blue-100 text-base">Join thousands of businesses trading smarter</p>
                </div>
                <Sparkles className="w-8 h-8 text-blue-200" />
              </div>
              <button className="w-full mt-6 px-8 py-4 bg-white text-blue-700 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 group">
                Start Trading Now
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </StaggerContainer>

          {/* RIGHT: iPhone Mockup */}
          <FadeUpWhenVisible className="flex justify-center lg:justify-end order-1 lg:order-2">
            <div className="relative">
              {/* iPhone Frame */}
              <div className="relative w-[380px] h-[690px] bg-gray-900 rounded-[3.5rem] p-3 shadow-2xl border-[14px] border-gray-900">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-36 h-7 bg-gray-900 rounded-b-3xl z-20"></div>
                
                {/* Screen */}
                <div className="relative w-full h-full bg-white rounded-[2.5rem] overflow-hidden">
                  {/* Status Bar */}
                  <div className="absolute top-0 left-0 right-0 h-12 flex items-center justify-between px-8 text-gray-900 text-xs font-semibold z-10 bg-white">
                    <span>9:41</span>
                    <div className="flex gap-1 items-center">
                      <svg className="w-4 h-3" fill="currentColor" viewBox="0 0 16 12">
                        <path d="M14 0H2C0.9 0 0 0.9 0 2v8c0 1.1 0.9 2 2 2h12c1.1 0 2-0.9 2-2V2c0-1.1-0.9-2-2-2zm0 10H2V2h12v8z"/>
                      </svg>
                      <span>100%</span>
                    </div>
                  </div>

                  {/* App Content */}
                  <div className="absolute inset-0 pt-12 bg-gray-50">
                    {steps.map((step, idx) => (
                      <div
                        key={step.id}
                        className={`absolute inset-0 transition-all duration-700 ${
                          activeStep === idx
                            ? 'opacity-100 translate-y-0'
                            : idx < activeStep
                            ? 'opacity-0 -translate-y-full'
                            : 'opacity-0 translate-y-full'
                        }`}
                      >
                        {/* Header Card */}
                        <div className="p-6">
                          <div className={`bg-gradient-to-br ${step.gradient} rounded-3xl p-8 shadow-xl relative overflow-hidden`}>
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
                            <div className="relative z-10 text-center">
                              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                                <step.icon className="w-8 h-8 text-white" />
                              </div>
                              <h3 className="text-2xl font-bold text-white mb-2">{step.shortTitle}</h3>
                              <div className="flex items-center justify-center gap-2 text-white/80 text-sm">
                                <span>Step {idx + 1} of 3</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="px-6 space-y-4">
                          <div className="bg-white rounded-2xl p-5 shadow-md border border-gray-100">
                            <p className="text-gray-700 text-sm leading-relaxed">{step.description}</p>
                          </div>

                          {/* Features */}
                          <div className="space-y-3">
                            {step.features.map((feature, fIdx) => (
                              <div
                                key={fIdx}
                                className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-3"
                                style={{
                                  animation: activeStep === idx ? `slideInLeft 0.4s ease-out ${fIdx * 0.1}s both` : 'none'
                                }}
                              >
                                <div className={`w-8 h-8 rounded-lg ${step.bgColor} flex items-center justify-center flex-shrink-0`}>
                                  <CheckCircle2 className="w-5 h-5 text-white" />
                                </div>
                                <span className="text-sm font-medium text-gray-700">{feature}</span>
                              </div>
                            ))}
                          </div>

                          {/* Stats Card */}
                          <div className={`bg-gradient-to-br ${step.gradient} rounded-2xl p-6 text-center shadow-xl`}>
                            <div className="text-5xl font-bold text-white mb-2">{step.stat}</div>
                            <div className="text-white/90 text-sm font-medium">{step.statLabel}</div>
                          </div>

                          {/* Step Indicators */}
                          <div className="flex justify-center gap-2 pt-2">
                            {steps.map((_, i) => (
                              <div
                                key={i}
                                className={`h-1.5 rounded-full transition-all duration-300 ${
                                  i === idx ? `w-8 ${step.bgColor}` : 'w-1.5 bg-gray-300'
                                }`}
                              ></div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Play/Pause Button */}
                  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20">
                    <button
                      onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                      className="w-12 h-12 bg-white rounded-full flex items-center justify-center border-2 border-gray-200 hover:border-gray-300 transition-all shadow-lg hover:shadow-xl"
                    >
                      {isAutoPlaying ? (
                        <div className="flex gap-1">
                          <div className="w-1 h-4 bg-gray-700 rounded-full"></div>
                          <div className="w-1 h-4 bg-gray-700 rounded-full"></div>
                        </div>
                      ) : (
                        <Play className="w-5 h-5 text-gray-700 ml-0.5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Side Buttons */}
                <div className="absolute -right-1 top-32 w-1 h-14 bg-gray-800 rounded-l"></div>
                <div className="absolute -right-1 top-52 w-1 h-12 bg-gray-800 rounded-l"></div>
                <div className="absolute -right-1 top-68 w-1 h-12 bg-gray-800 rounded-l"></div>
                <div className="absolute -left-1 top-36 w-1 h-8 bg-gray-800 rounded-r"></div>
              </div>

              {/* Subtle Glow */}
              <div className={`absolute inset-0 bg-gradient-to-br ${steps[activeStep].gradient} opacity-5 blur-3xl -z-10 transition-all duration-700 rounded-full`}></div>
            </div>
          </FadeUpWhenVisible>
        </div>

        {/* Key Features (homepage subset) */}
        <section className="py-20 bg-gray-50 mt-20 rounded-3xl">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h3 className="text-4xl font-bold text-gray-900 mb-3">Key Features</h3>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">Powerful tools that make AI matching simple and effective</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-shadow border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Zap className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">Smart Matching Algorithm</h4>
                    <p className="text-gray-600 mb-3">AI analyzes compatibility, capacity, and quality signals to suggest high‑probability matches.</p>
                    <div className="text-sm font-medium text-green-600">High match precision</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-shadow border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">Deal Room & Documents</h4>
                    <p className="text-gray-600 mb-3">Centralized chat, offer/counter‑offer flow, and document sharing to finalize terms.</p>
                    <div className="text-sm font-medium text-blue-600">Organized negotiations</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-shadow border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <ShieldCheck className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">Quality & Compliance</h4>
                    <p className="text-gray-600 mb-3">Profiles, certifications, and community signals to help you assess counterparties.</p>
                    <div className="text-sm font-medium text-purple-600">Verified credentials</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-shadow border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Star className="w-6 h-6 text-amber-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">Green Credits</h4>
                    <p className="text-gray-600 mb-3">Earn traceable credits for sustainable transactions to support ESG reporting.</p>
                    <div className="text-sm font-medium text-amber-600">Traceable impact</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits by Role (concise) */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h3 className="text-4xl font-bold text-gray-900 mb-3">Benefits by Role</h3>
              <p className="text-lg text-gray-600">How each participant wins on the platform</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-50 rounded-xl p-8">
                <h4 className="text-xl font-semibold text-green-700 mb-6">For Producers</h4>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-green-600" /><span className="text-gray-700">Monetize waste streams</span></li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-green-600" /><span className="text-gray-700">Reduce disposal costs</span></li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-green-600" /><span className="text-gray-700">Match with verified recyclers</span></li>
                </ul>
              </div>
              <div className="bg-gray-50 rounded-xl p-8">
                <h4 className="text-xl font-semibold text-blue-700 mb-6">For Recyclers</h4>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-blue-600" /><span className="text-gray-700">Access quality material supply</span></li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-blue-600" /><span className="text-gray-700">Lower sourcing effort</span></li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-blue-600" /><span className="text-gray-700">AI‑driven opportunities</span></li>
                </ul>
              </div>
              <div className="bg-gray-50 rounded-xl p-8">
                <h4 className="text-xl font-semibold text-purple-700 mb-6">For Corporates</h4>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-purple-600" /><span className="text-gray-700">ESG reporting support</span></li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-purple-600" /><span className="text-gray-700">Green credit integration</span></li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-purple-600" /><span className="text-gray-700">Supply chain sustainability</span></li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>

      <style jsx>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes progressBar {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}