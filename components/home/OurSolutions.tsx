"use client";

import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import Card from "@/components/ui/Card";
import { Dispatch, SetStateAction } from "react";
import { FadeUpWhenVisible, StaggerContainer, itemVariants } from "@/components/ui/Motion";
import { motion } from "framer-motion";
import Image from "next/image";

type Feature = {
  title: string;
  description: string;
  image?: string; // path or emoji used as visual
  icon?: string; // emoji
};

export default function OurSolutions({
  features,
  currentFeature,
  setCurrentFeature,
}: {
  features: Feature[];
  currentFeature: number;
  setCurrentFeature: Dispatch<SetStateAction<number>>;
}) {
  const handlePrev = () => {
    setCurrentFeature((prev) => (prev - 1 + features.length) % features.length);
  };

  const handleNext = () => {
    setCurrentFeature((prev) => (prev + 1) % features.length);
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <FadeUpWhenVisible className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-100 text-green-700 text-sm font-semibold">
            <CheckCircle2 className="w-4 h-4" /> Our Solutions
          </div>
          <h2 className="mt-4 text-4xl font-bold text-gray-900">AI matching for waste producers and recyclers</h2>
          <p className="mt-3 text-lg text-gray-600 max-w-3xl mx-auto">
            We connect waste producers directly with recyclers using AI-powered matching. Negotiate and close deals directly — we do not provide door-to-door delivery.
          </p>
        </FadeUpWhenVisible>

        {/* Carousel / Highlighted card */}
        {features.length > 0 && (
          <FadeUpWhenVisible className="relative mb-12">
            <Card variant="elevated" className="rounded-2xl overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                <StaggerContainer className="p-8 flex flex-col justify-center">
                  <motion.div variants={itemVariants} className="text-5xl mb-4">
                    {features[currentFeature].icon || features[currentFeature].image || "♻️"}
                  </motion.div>
                  <motion.h3 variants={itemVariants} className="text-2xl font-bold text-gray-900 mb-3">
                    {features[currentFeature].title}
                  </motion.h3>
                  <motion.p variants={itemVariants} className="text-gray-600 leading-relaxed">
                    {features[currentFeature].description}
                  </motion.p>
                </StaggerContainer>
                <div className="p-6 bg-gradient-to-br from-emerald-50 to-green-50 flex items-center justify-center">
                  <div className="w-full max-w-md aspect-video rounded-xl bg-white border border-emerald-100 shadow-lg overflow-hidden flex items-center justify-center">
                    {features[currentFeature].image && features[currentFeature].image.startsWith("/") ? (
                      <Image
                        src={features[currentFeature].image}
                        alt={features[currentFeature].title}
                        width={800}
                        height={450}
                        className="w-full h-full object-cover"
                        priority={true}
                      />
                    ) : (
                      <motion.div initial={{ scale: 0.9, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }} viewport={{ once: true }} className="text-6xl">
                        {features[currentFeature].icon || "🌍"}
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            </Card>

            <div className="absolute inset-y-0 left-0 flex items-center">
              <button
                aria-label="Previous"
                onClick={handlePrev}
                className="ml-2 md:ml-4 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center hover:border-green-500 hover:bg-green-50 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 text-gray-700" />
              </button>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center">
              <button
                aria-label="Next"
                onClick={handleNext}
                className="mr-2 md:mr-4 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center hover:border-green-500 hover:bg-green-50 transition-colors"
              >
                <ArrowRight className="w-4 h-4 text-gray-700" />
              </button>
            </div>
          </FadeUpWhenVisible>
        )}

        {/* Feature list */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const isActive = index === currentFeature;
            return (
              <motion.div variants={itemVariants} key={index}>
              <Card
                key={index}
                variant={isActive ? "elevated" : "default"}
                className={`rounded-2xl transition-all ${
                  isActive ? "border-emerald-300 shadow-emerald-100" : ""
                }`}
                hover
                onClick={() => setCurrentFeature(index)}
              >
                <div className="flex items-start gap-4">
                  <div className={`text-3xl ${isActive ? "scale-110" : ""}`}>{feature.icon || "♻️"}</div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-1">{feature.title}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </Card>
              </motion.div>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}


