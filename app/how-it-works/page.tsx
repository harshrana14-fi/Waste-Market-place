import { ArrowRight, Users, Zap, Shield, CheckCircle, Star, Globe, TrendingUp } from "lucide-react";

export default function HowItWorksPage() {
  const steps = [
    {
      number: "01",
      title: "Sign Up & Profile Setup",
      description: "Create your account and set up your company profile. Choose your role as a producer, recycler, or corporate partner.",
      details: [
        "Complete company verification",
        "Set up payment methods",
        "Define your waste streams or processing capabilities",
        "Upload necessary certifications"
      ],
      icon: Users,
      color: "green"
    },
    {
      number: "02", 
      title: "List or Browse Materials",
      description: "Producers list their waste materials with detailed specifications. Recyclers browse available materials that match their capabilities.",
      details: [
        "Detailed material specifications",
        "Volume and availability information",
        "Location and pickup requirements",
        "Quality certifications and testing"
      ],
      icon: Zap,
      color: "blue"
    },
    {
      number: "03",
      title: "AI-Powered Matching",
      description: "Our advanced AI algorithm analyzes compatibility, location, capacity, and requirements to suggest the best matches.",
      details: [
        "Smart compatibility scoring",
        "Logistics optimization",
        "Capacity matching",
        "Quality assessment"
      ],
      icon: Shield,
      color: "purple"
    },
    {
      number: "04",
      title: "Transaction & Verification",
      description: "Complete transactions with built-in verification, tracking, and quality assurance. Earn green credits for sustainable practices.",
      details: [
        "Secure payment processing",
        "Real-time tracking",
        "Quality verification",
        "Green credit generation"
      ],
      icon: CheckCircle,
      color: "orange"
    }
  ];

  const features = [
    {
      title: "Smart Matching Algorithm",
      description: "Our AI analyzes hundreds of factors to find the perfect match between waste producers and recyclers.",
      icon: Zap,
      stats: "95% match accuracy"
    },
    {
      title: "Real-time Tracking",
      description: "Monitor your transactions from pickup to delivery with our comprehensive tracking system.",
      icon: Globe,
      stats: "24/7 visibility"
    },
    {
      title: "Quality Assurance",
      description: "Built-in verification processes ensure material quality and compliance with industry standards.",
      icon: Shield,
      stats: "100% verified"
    },
    {
      title: "Green Credits",
      description: "Earn traceable green credits for every sustainable transaction, contributing to your ESG goals.",
      icon: Star,
      stats: "Blockchain verified"
    }
  ];

  const benefits = [
    {
      category: "For Producers",
      items: [
        "Turn waste into revenue streams",
        "Reduce disposal costs by up to 60%",
        "Meet sustainability goals",
        "Access to verified recyclers",
        "Streamlined logistics"
      ],
      color: "green"
    },
    {
      category: "For Recyclers", 
      items: [
        "Access to quality materials",
        "Optimized supply chains",
        "Reduced sourcing costs",
        "New revenue opportunities",
        "Market intelligence"
      ],
      color: "blue"
    },
    {
      category: "For Corporates",
      items: [
        "ESG reporting support",
        "Carbon footprint reduction",
        "Supply chain sustainability",
        "Green credit trading",
        "Compliance tracking"
      ],
      color: "purple"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-purple-50 py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            How Our Platform
            <span className="text-blue-600 block">Works</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            A simple, powerful process that connects waste producers with recyclers, 
            creating value for everyone while protecting the environment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Start Your Journey
            </button>
            <button className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-gray-400 transition-colors">
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Simple 4-Step Process</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From registration to transaction completion, our platform makes waste trading effortless
            </p>
          </div>

          <div className="space-y-16">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div key={index} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}>
                  <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                        step.color === 'green' ? 'bg-green-100' :
                        step.color === 'blue' ? 'bg-blue-100' :
                        step.color === 'purple' ? 'bg-purple-100' :
                        'bg-orange-100'
                      }`}>
                        <IconComponent className={`w-8 h-8 ${
                          step.color === 'green' ? 'text-green-600' :
                          step.color === 'blue' ? 'text-blue-600' :
                          step.color === 'purple' ? 'text-purple-600' :
                          'text-orange-600'
                        }`} />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-500">Step {step.number}</div>
                        <h3 className="text-2xl font-bold text-gray-900">{step.title}</h3>
                      </div>
                    </div>
                    <p className="text-lg text-gray-600 mb-6">{step.description}</p>
                    <ul className="space-y-3">
                      {step.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                          <span className="text-gray-700">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className={`${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 h-80 flex items-center justify-center">
                      <div className="text-center">
                        <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 ${
                          step.color === 'green' ? 'bg-green-200' :
                          step.color === 'blue' ? 'bg-blue-200' :
                          step.color === 'purple' ? 'bg-purple-200' :
                          'bg-orange-200'
                        }`}>
                          <span className={`text-3xl font-bold ${
                            step.color === 'green' ? 'text-green-700' :
                            step.color === 'blue' ? 'text-blue-700' :
                            step.color === 'purple' ? 'text-purple-700' :
                            'text-orange-700'
                          }`}>
                            {step.number}
                          </span>
                        </div>
                        <p className="text-gray-600">Visual representation of step {step.number}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Key Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Powerful tools and technologies that make our platform the best choice for waste trading
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                      <p className="text-gray-600 mb-4">{feature.description}</p>
                      <div className="text-sm font-medium text-blue-600">{feature.stats}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits by Role */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Benefits by Role</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover how our platform creates value for different types of users
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-8">
                <h3 className={`text-xl font-semibold mb-6 ${
                  benefit.color === 'green' ? 'text-green-700' :
                  benefit.color === 'blue' ? 'text-blue-700' :
                  'text-purple-700'
                }`}>
                  {benefit.category}
                </h3>
                <ul className="space-y-3">
                  {benefit.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center gap-3">
                      <CheckCircle className={`w-5 h-5 flex-shrink-0 ${
                        benefit.color === 'green' ? 'text-green-600' :
                        benefit.color === 'blue' ? 'text-blue-600' :
                        'text-purple-600'
                      }`} />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Success Stories</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real results from companies using our platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
              </div>
              <p className="text-gray-600 mb-4">
                "We've reduced our waste disposal costs by 65% while generating new revenue streams. 
                The platform is incredibly easy to use."
              </p>
              <div className="font-semibold text-gray-900">Sarah Johnson</div>
              <div className="text-sm text-gray-600">CEO, GreenTech Manufacturing</div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
              </div>
              <p className="text-gray-600 mb-4">
                "The AI matching has helped us find the perfect suppliers for our recycling operations. 
                Our efficiency has improved dramatically."
              </p>
              <div className="font-semibold text-gray-900">Michael Chen</div>
              <div className="text-sm text-gray-600">Operations Director, EcoRecycle Ltd</div>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
              </div>
              <p className="text-gray-600 mb-4">
                "Our ESG reporting has never been easier. The green credits system helps us track 
                and communicate our sustainability impact."
              </p>
              <div className="font-semibold text-gray-900">Lisa Rodriguez</div>
              <div className="text-sm text-gray-600">Sustainability Manager, GlobalCorp</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of companies already using our platform to transform their waste into value.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Create Account
            </button>
            <button className="px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              Schedule Demo
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
