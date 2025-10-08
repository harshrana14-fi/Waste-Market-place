"use client";
import { Star } from "lucide-react";
import { FadeUpWhenVisible, StaggerContainer, itemVariants } from "@/components/ui/Motion";
import { motion } from "framer-motion";

type Testimonial = { quote: string; author: string; title: string; initials: string; gradient: string };

export default function Testimonials({ testimonials, currentIndex, setCurrentIndex }: { testimonials: Testimonial[]; currentIndex: number; setCurrentIndex: (n: number) => void; }) {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <FadeUpWhenVisible className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our customers say..</h2>
        </FadeUpWhenVisible>

        <div className="relative">
          <FadeUpWhenVisible className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 relative">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
              <motion.blockquote initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} key={currentIndex} className="text-lg text-gray-700 mb-6 leading-relaxed">
                {testimonials[currentIndex].quote}
              </motion.blockquote>
              <div className="flex items-center justify-center gap-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${testimonials[currentIndex].gradient} rounded-xl flex items-center justify-center`}>
                  <span className="text-white font-semibold text-sm">{testimonials[currentIndex].initials}</span>
                </div>
                <div className="text-left">
                  <div className="font-semibold text-gray-900">{testimonials[currentIndex].author}</div>
                  <div className="text-gray-600 text-sm">{testimonials[currentIndex].title}</div>
                </div>
              </div>
            </div>
          </FadeUpWhenVisible>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => setCurrentIndex((currentIndex - 1 + testimonials.length) % testimonials.length)}
              className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:border-green-500 hover:bg-green-50 transition-all group"
            >
              <svg className="w-4 h-4 text-gray-400 group-hover:text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-green-500 w-6' : 'bg-gray-300 hover:bg-gray-400'}`}
                />
              ))}
            </div>
            <button
              onClick={() => setCurrentIndex((currentIndex + 1) % testimonials.length)}
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
  );
}


