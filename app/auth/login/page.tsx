"use client";
import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, Lock, ArrowRight, AlertCircle, CheckCircle, Shield, Zap, Users } from "lucide-react";

export default function ProfessionalLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const router = useRouter();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
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
      console.log('Attempting login with:', { email, password: '***' });
      
      const res = await signIn("credentials", { 
        email, 
        password, 
        redirect: false 
      });
      
      console.log('SignIn response:', res);
      
      if (res?.ok) {
        console.log('Login successful, redirecting to dashboard');
        setSuccess(true);
        setTimeout(() => {
          router.push("/dashboard");
        }, 1500);
      } else {
        let errorMessage = 'Invalid email or password. Please check your credentials and try again.';
        
        console.log('Login failed:', res?.error);
        
        if (res?.error === 'CredentialsSignin') {
          errorMessage = 'Invalid email or password. Please check your credentials and try again.';
        } else if (res?.error === 'CallbackRouteError') {
          errorMessage = 'Authentication failed. Please try again.';
        } else if (res?.error) {
          errorMessage = res.error;
        }
        
        setErrors({ general: errorMessage });
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrors({ general: 'Something went wrong. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 p-6">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-gray-100 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-3">Welcome Back!</h2>
          <p className="text-gray-600 mb-6">You've been successfully logged in to your account.</p>
          <div className="w-full bg-gradient-to-r from-green-500 to-blue-600 h-2 rounded-full animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-green-600 to-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          <div className="mb-8">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6">
              <span className="text-white font-bold text-2xl">W</span>
            </div>
            <h1 className="text-4xl font-bold mb-4">Waste→Resource</h1>
            <p className="text-xl text-green-100">Professional Waste Marketplace</p>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold">Secure & Verified</h3>
                <p className="text-green-100 text-sm">Enterprise-grade security</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold">AI-Powered Matching</h3>
                <p className="text-green-100 text-sm">Smart waste-to-resource connections</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold">Trusted Network</h3>
                <p className="text-green-100 text-sm">500+ verified partners</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-white rounded-full"></div>
          <div className="absolute bottom-20 left-40 w-20 h-20 bg-white rounded-full"></div>
          <div className="absolute bottom-40 right-40 w-28 h-28 bg-white rounded-full"></div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">W</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Waste→Resource</h1>
            <p className="text-gray-600">Professional Waste Marketplace</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
              <p className="text-gray-600">Sign in to your professional account</p>
            </div>

            {/* Demo Credentials */}
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <h3 className="text-sm font-semibold text-blue-800 mb-3">Demo Credentials:</h3>
              <div className="space-y-2 text-xs text-blue-700">
                <div className="flex justify-between">
                  <span>Producer:</span>
                  <span className="font-mono">demo@example.com / demo123</span>
                </div>
                <div className="flex justify-between">
                  <span>Recycler:</span>
                  <span className="font-mono">recycler@example.com / demo123</span>
                </div>
                <div className="flex justify-between">
                  <span>Corporate:</span>
                  <span className="font-mono">corporate@example.com / demo123</span>
                </div>
              </div>
            </div>

            {/* Error Message */}
            {errors.general && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center space-x-3">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                <p className="text-red-700 text-sm font-medium">{errors.general}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors ${
                    focusedField === 'email' ? 'text-green-500' : 'text-gray-400'
                  }`} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl transition-all font-medium placeholder-gray-400 focus:outline-none ${
                      errors.email 
                        ? 'border-red-300 focus:border-red-500' 
                        : focusedField === 'email'
                        ? 'border-green-500 focus:border-green-500'
                        : 'border-gray-200 focus:border-gray-400'
                    }`}
                    placeholder="Enter your email address"
                  />
                </div>
                {errors.email && (
                  <p className="mt-2 text-red-500 text-sm flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors ${
                    focusedField === 'password' ? 'text-green-500' : 'text-gray-400'
                  }`} />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full pl-10 pr-12 py-3 border-2 rounded-xl transition-all font-medium placeholder-gray-400 focus:outline-none ${
                      errors.password 
                        ? 'border-red-300 focus:border-red-500' 
                        : focusedField === 'password'
                        ? 'border-green-500 focus:border-green-500'
                        : 'border-gray-200 focus:border-gray-400'
                    }`}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-2 text-red-500 text-sm flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2" />
                  <span className="text-sm text-gray-600">Remember me</span>
                </label>
                <button type="button" className="text-sm text-green-600 hover:text-green-700 font-semibold transition-colors">
                  Forgot password?
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            {/* Sign Up Link */}
            <div className="mt-8 pt-6 border-t border-gray-200 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <a href="/auth/register" className="text-green-600 hover:text-green-700 font-semibold transition-colors">
                  Create one now
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}