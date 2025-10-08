"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, Lock, Building, ArrowRight, AlertCircle, CheckCircle, Factory, Recycle, Briefcase, X } from "lucide-react";

interface FormErrors {
  general?: string;
  company?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  terms?: string;
}

type FocusedField = 'company' | 'email' | 'password' | 'confirmPassword' | null;

export default function EnhancedRegisterPage() {
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("producer");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [success, setSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState<FocusedField>(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const router = useRouter();

  const validateForm = () => {
    const newErrors: FormErrors = {};
    
    if (!company.trim()) {
      newErrors.company = 'Company name is required';
    } else if (company.length < 2) {
      newErrors.company = 'Company name must be at least 2 characters';
    }
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!termsAccepted) {
      newErrors.terms = 'Please accept the terms';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    setErrors({});
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ company, email, password, role })
      });
      const data = await res.json();
      if (!res.ok) {
        setErrors({ general: data.error || 'Registration failed. Please try again.' });
        setLoading(false);
        return;
      }
      // Auto sign-in after successful registration with immediate redirect
      await signIn('credentials', { email, password, callbackUrl: '/dashboard' });
      return;
    } catch (err) {
      setErrors({ general: 'Network error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const roleOptions = [
    {
      value: "producer",
      label: "Producer",
      icon: Factory,
      color: "from-orange-500 to-red-500"
    },
    {
      value: "recycler",
      label: "Recycler",
      icon: Recycle,
      color: "from-green-500 to-emerald-500"
    },
    {
      value: "corporate",
      label: "Corporate",
      icon: Briefcase,
      color: "from-blue-500 to-indigo-500"
    }
  ];

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 p-4">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-3">Welcome Aboard!</h2>
          <p className="text-gray-600 mb-6">Your account has been created successfully.</p>
          <button
            onClick={() => window.location.href = '/auth/login'}
            className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white font-bold py-3 rounded-xl"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center pt-4 pb-2 px-2">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
          {/* Left panel - yellow illustration (inside card) */}
          <div className="hidden lg:block bg-gradient-to-br from-green-400 to-amber-500 relative">
            <div className="absolute inset-0 opacity-20" style={{backgroundImage: 'radial-gradient(circle at 10px 10px, rgba(0,0,0,0.15) 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>
            <div className="relative z-10 h-full flex items-center justify-center p-6">
              <img src="/images/register.webp" alt="Create account" className="w-full h-full max-w-xl object-cover rounded-2xl shadow-xl" />
            </div>
          </div>

          {/* Right panel - Registration form */}
          <div className="w-full flex items-center justify-center p-4">
            <div className="w-full max-w-md">
              <div className="text-center mb-4">
                <div className="lg:hidden w-12 h-12 bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold">W</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">Create Account</h2>
                <p className="text-gray-600 text-sm">Join our waste management network</p>
              </div>

              {errors.general && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                  <p className="text-red-700 text-xs">{errors.general}</p>
                </div>
              )}

              <div className="space-y-4">
                {/* Company Name */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Company Name</label>
                  <div className="relative">
                    <Building className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                      focusedField === 'company' ? 'text-green-500' : 'text-gray-400'
                    }`} />
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      onFocus={() => setFocusedField('company')}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full pl-10 pr-4 py-2.5 text-sm border-2 rounded-xl transition-all focus:outline-none ${
                        errors.company ? 'border-red-300' : focusedField === 'company' ? 'border-green-500' : 'border-gray-200'
                      }`}
                      placeholder="Your company name"
                    />
                  </div>
                  {errors.company && <p className="mt-1 text-red-500 text-xs">{errors.company}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Email Address</label>
                  <div className="relative">
                    <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                      focusedField === 'email' ? 'text-green-500' : 'text-gray-400'
                    }`} />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full pl-10 pr-4 py-2.5 text-sm border-2 rounded-xl transition-all focus:outline-none ${
                        errors.email ? 'border-red-300' : focusedField === 'email' ? 'border-green-500' : 'border-gray-200'
                      }`}
                      placeholder="you@company.com"
                    />
                  </div>
                  {errors.email && <p className="mt-1 text-red-500 text-xs">{errors.email}</p>}
                </div>

                {/* Role Selection - Compact */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Account Type</label>
                  <div className="grid grid-cols-3 gap-2">
                    {roleOptions.map((option) => {
                      const IconComponent = option.icon;
                      return (
                        <div
                          key={option.value}
                          onClick={() => setRole(option.value)}
                          className={`p-3 border-2 rounded-xl cursor-pointer transition-all text-center ${
                            role === option.value ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className={`w-8 h-8 bg-gradient-to-r ${option.color} rounded-lg flex items-center justify-center mx-auto mb-1`}>
                            <IconComponent className="w-4 h-4 text-white" />
                          </div>
                          <p className="text-xs font-semibold text-gray-800">{option.label}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Password</label>
                  <div className="relative">
                    <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                      focusedField === 'password' ? 'text-green-500' : 'text-gray-400'
                    }`} />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onFocus={() => setFocusedField('password')}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full pl-10 pr-10 py-2.5 text-sm border-2 rounded-xl transition-all focus:outline-none ${
                        errors.password ? 'border-red-300' : focusedField === 'password' ? 'border-green-500' : 'border-gray-200'
                      }`}
                      placeholder="Min. 8 characters"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.password && <p className="mt-1 text-red-500 text-xs">{errors.password}</p>}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Confirm Password</label>
                  <div className="relative">
                    <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                      focusedField === 'confirmPassword' ? 'text-green-500' : 'text-gray-400'
                    }`} />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      onFocus={() => setFocusedField('confirmPassword')}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full pl-10 pr-10 py-2.5 text-sm border-2 rounded-xl transition-all focus:outline-none ${
                        errors.confirmPassword ? 'border-red-300' : focusedField === 'confirmPassword' ? 'border-green-500' : 'border-gray-200'
                      }`}
                      placeholder="Confirm password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="mt-1 text-red-500 text-xs">{errors.confirmPassword}</p>}
                </div>

                {/* Terms */}
                <div>
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                      className="w-4 h-4 text-green-600 rounded focus:ring-green-500 mt-0.5"
                    />
                    <span className="text-xs text-gray-600">
                      I agree to the <a href="/terms" className="text-green-600 font-semibold">Terms</a> and <a href="/privacy" className="text-green-600 font-semibold">Privacy Policy</a>
                    </span>
                  </label>
                  {errors.terms && <p className="mt-1 text-red-500 text-xs">{errors.terms}</p>}
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold py-3 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:transform-none flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span className="text-sm">Creating...</span>
                    </>
                  ) : (
                    <>
                      <span className="text-sm">Create Account</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              {/* Sign In Link */}
              <div className="mt-4 pt-3 border-t border-gray-200 text-center">
                <p className="text-xs text-gray-600">
                  Already have an account?{" "}
                  <a href="/auth/login" className="text-green-600 hover:text-green-700 font-semibold">
                    Sign in
                  </a>
                </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}