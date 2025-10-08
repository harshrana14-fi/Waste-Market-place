"use client";
import { Play } from "lucide-react";
import { useState } from "react";
import { FadeUpWhenVisible } from "@/components/ui/Motion";

export default function VideoTeaser() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <FadeUpWhenVisible className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">See WasteFlow in Action</h2>
          <p className="text-lg text-gray-600">Watch how our platform transforms waste management</p>
        </FadeUpWhenVisible>

        <FadeUpWhenVisible className="relative bg-gray-900 rounded-2xl overflow-hidden shadow-2xl">
          <div className="aspect-video bg-gradient-to-br from-green-600 to-blue-600 flex items-center justify-center">
            <button 
              onClick={() => setIsVideoPlaying(!isVideoPlaying)}
              className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all group"
            >
              <Play className="w-8 h-8 text-white ml-1 group-hover:scale-110 transition-transform" />
            </button>
          </div>
          {isVideoPlaying && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="text-white text-center">
                <div className="text-6xl mb-4">🎬</div>
                <p className="text-lg">Video Player Would Open Here</p>
              </div>
            </div>
          )}
        </FadeUpWhenVisible>
      </div>
    </section>
  );
}


