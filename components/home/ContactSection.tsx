"use client";
import { Phone, Mail, MapPin, Send, CheckCircle } from "lucide-react";
import { useState } from "react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    organisation: "",
    city: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        mobile: "",
        email: "",
        organisation: "",
        city: "",
        message: ""
      });
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-green-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Let's Connect
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ready to transform your waste management? Reach out to our team and we'll help you get started
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left side - Contact info with 3D laptop illustration */}
          <div className="space-y-8">
            <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Get in Touch</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-green-50 to-blue-50 hover:shadow-md transition-all duration-300">
                  <div className="bg-green-600 p-3 rounded-xl">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Phone</p>
                    <p className="text-lg font-semibold text-gray-800">+91 8383942111</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-green-50 hover:shadow-md transition-all duration-300">
                  <div className="bg-blue-600 p-3 rounded-xl">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Email</p>
                    <p className="text-lg font-semibold text-gray-800">support@wasteflow.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-green-50 to-blue-50 hover:shadow-md transition-all duration-300">
                  <div className="bg-green-600 p-3 rounded-xl">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Location</p>
                    <p className="text-lg font-semibold text-gray-800">Delhi, India</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 3D Laptop Illustration with Contact Details */}
            <div className="bg-gradient-to-br from-green-600 to-blue-600 rounded-3xl shadow-2xl p-12 relative overflow-hidden">
              <div className="absolute inset-0 bg-black opacity-10"></div>
              <div className="relative">
                {/* Laptop */}
                <div className="perspective-1000">
                  <div className="bg-gray-800 rounded-t-2xl p-2 shadow-2xl" style={{transform: 'perspective(1000px) rotateX(5deg)'}}>
                    <div className="bg-gradient-to-br from-slate-900 to-gray-800 rounded-lg p-4 aspect-video overflow-hidden">
                      {/* Get In Touch Details Inside Laptop */}
                      <div className="h-full overflow-auto text-left space-y-3">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-xs font-bold text-white">Get In Touch</h4>
                          <div className="flex gap-1">
                            <div className="w-2 h-2 rounded-full bg-red-400"></div>
                            <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                            <div className="w-2 h-2 rounded-full bg-green-400"></div>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          {/* Phone */}
                          <div className="flex items-start gap-2 p-2 rounded-lg bg-gradient-to-r from-green-500/20 to-blue-500/20">
                            <div className="bg-green-500 p-1.5 rounded-lg mt-0.5">
                              <Phone className="w-3 h-3 text-white" />
                            </div>
                            <div>
                              <div className="text-[8px] text-gray-400">Phone</div>
                              <div className="text-[9px] font-semibold text-white">+91 8383942111</div>
                            </div>
                          </div>

                          {/* Email */}
                          <div className="flex items-start gap-2 p-2 rounded-lg bg-gradient-to-r from-blue-500/20 to-green-500/20">
                            <div className="bg-blue-500 p-1.5 rounded-lg mt-0.5">
                              <Mail className="w-3 h-3 text-white" />
                            </div>
                            <div>
                              <div className="text-[8px] text-gray-400">Email</div>
                              <div className="text-[9px] font-semibold text-white">support@wasteflow.com</div>
                            </div>
                          </div>

                          {/* Location */}
                          <div className="flex items-start gap-2 p-2 rounded-lg bg-gradient-to-r from-green-500/20 to-blue-500/20">
                            <div className="bg-green-500 p-1.5 rounded-lg mt-0.5">
                              <MapPin className="w-3 h-3 text-white" />
                            </div>
                            <div>
                              <div className="text-[8px] text-gray-400">Location</div>
                              <div className="text-[9px] font-semibold text-white">Mumbai, India</div>
                            </div>
                          </div>

                          {/* Additional Info */}
                          <div className="mt-3 p-2 rounded-lg bg-white/5 border border-white/10">
                            <div className="text-[8px] text-gray-300 leading-relaxed">
                              We're available 24/7 to help you with all your waste management needs. Reach out anytime!
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-700 h-4 rounded-b-3xl shadow-lg"></div>
                  <div className="bg-gray-600 h-2 w-32 mx-auto rounded-b-xl"></div>
                </div>
                
                <div className="mt-6 text-center text-white">
                  <p className="text-lg font-semibold">Available 24/7</p>
                  <p className="text-green-100 text-sm">We're here to help you anytime</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Contact form */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Send us a Message</h3>
            
            {submitted ? (
              <div className="text-center py-12">
                <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-12 h-12 text-green-600" />
                </div>
                <h4 className="text-2xl font-bold text-gray-800 mb-2">Thank You!</h4>
                <p className="text-gray-600">We've received your message and will get back to you soon.</p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your Name"
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:outline-none transition-colors bg-gray-50 text-gray-800"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number *</label>
                    <input
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      required
                      placeholder="+91 1234567890"
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:outline-none transition-colors bg-gray-50 text-gray-800"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="yourmail@example.com"
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:outline-none transition-colors bg-gray-50 text-gray-800"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Organisation</label>
                    <input
                      type="text"
                      name="organisation"
                      value={formData.organisation}
                      onChange={handleChange}
                      placeholder="Your Company Ltd."
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:outline-none transition-colors bg-gray-50 text-gray-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                  <select 
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:outline-none transition-colors bg-gray-50 text-gray-800"
                  >
                    <option value="">Select your city</option>
                    <option value="mumbai">Mumbai (Maharashtra)</option>
                    <option value="delhi">Delhi (Delhi)</option>
                    <option value="bangalore">Bangalore (Karnataka)</option>
                    <option value="hyderabad">Hyderabad (Telangana)</option>
                    <option value="chennai">Chennai (Tamil Nadu)</option>
                    <option value="kolkata">Kolkata (West Bengal)</option>
                    <option value="pune">Pune (Maharashtra)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Tell us about your waste management needs..."
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:outline-none transition-colors bg-gray-50 text-gray-800 resize-none"
                  ></textarea>
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full px-8 py-4 bg-gradient-to-r from-green-600 to-blue-600 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <span>Send Message</span>
                  <Send className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>

      
      </div>
    </section>
  );
}