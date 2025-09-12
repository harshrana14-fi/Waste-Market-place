import { Users, Target, Award, Globe, Leaf, TrendingUp, Shield, Zap } from "lucide-react";

export default function AboutPage() {
  const stats = [
    { label: "Companies Connected", value: "500+", icon: Users },
    { label: "Tons Recycled", value: "50K+", icon: Leaf },
    { label: "Countries Active", value: "25+", icon: Globe },
    { label: "Green Credits Issued", value: "1M+", icon: Award }
  ];

  const values = [
    {
      title: "Sustainability First",
      description: "We believe in creating a circular economy where waste becomes a valuable resource, reducing environmental impact while driving economic growth.",
      icon: Leaf,
      color: "green"
    },
    {
      title: "Innovation Driven",
      description: "Our AI-powered matching system connects the right partners at the right time, optimizing waste streams and maximizing value creation.",
      icon: Zap,
      color: "blue"
    },
    {
      title: "Transparency & Trust",
      description: "Every transaction is tracked and verified, providing complete transparency and building trust across our global network of partners.",
      icon: Shield,
      color: "purple"
    },
    {
      title: "Impact Focused",
      description: "We measure success not just in revenue, but in environmental impact, carbon reduction, and contribution to sustainable development goals.",
      icon: TrendingUp,
      color: "orange"
    }
  ];

  const team = [
    {
      name: "Pushkar Jain",
      role: "CEO & Co-Founder",
      bio: "Former McKinsey consultant with 15 years in sustainability and circular economy.",
      image: "/images/team/sarah.jpg"
    },
    {
      name: "Harsh Rana ",
      role: "CTO & Co-Founder", 
      bio: "AI/ML expert who previously led data science teams at Google and Tesla.",
      image: "/images/team/marcus.jpg"
    },
    {
      name: "Rahul ",
      role: "Head of Sustainability",
      bio: "Environmental scientist with PhD from MIT and 20 years in waste management.",
      image: "/images/team/priya.jpg"
    },
    {
      name: "Vidhi",
      role: "VP of Operations",
      bio: "Supply chain expert with extensive experience in industrial waste management.",
      image: "/images/team/james.jpg"
    },
    {
      name: "Riya  ",
      role: "VP of Marketing",
      bio: "Marketing expert with 15 years in sustainable branding and communications.",
      image: "/images/team/aman.jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-blue-50 py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Transforming Waste Into
            <span className="text-green-600 block">Opportunity</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            We're building the world's largest marketplace for industrial waste, connecting producers, 
            recyclers, and corporates to create a more sustainable future.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors">
              Join Our Mission
            </button>
            <button className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-gray-400 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-green-600" />
                  </div>
                  <div className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6">
                To accelerate the transition to a circular economy by making waste trading as easy as 
                buying and selling any other commodity. We believe that every ton of waste diverted from 
                landfills represents an opportunity for economic growth and environmental protection.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Our platform leverages cutting-edge AI technology to match waste producers with the most 
                suitable recyclers, optimizing logistics, reducing costs, and maximizing environmental impact.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <span className="text-gray-700">Reduce global waste by 30% by 2030</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <span className="text-gray-700">Create 1 million green jobs worldwide</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <span className="text-gray-700">Prevent 10 million tons of CO₂ emissions</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Target className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">2025 Goals</h3>
                    <p className="text-sm text-gray-600">Ambitious targets for the next 2 years</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Platform Users</span>
                    <span className="font-semibold text-gray-900">10,000+</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{width: '75%'}}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Waste Volume</span>
                    <span className="font-semibold text-gray-900">100K tons</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{width: '60%'}}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Revenue Impact</span>
                    <span className="font-semibold text-gray-900">$50M+</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{width: '45%'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div key={index} className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow">
                  <div className={`w-16 h-16 rounded-lg flex items-center justify-center mb-6 ${
                    value.color === 'green' ? 'bg-green-100' :
                    value.color === 'blue' ? 'bg-blue-100' :
                    value.color === 'purple' ? 'bg-purple-100' :
                    'bg-orange-100'
                  }`}>
                    <IconComponent className={`w-8 h-8 ${
                      value.color === 'green' ? 'text-green-600' :
                      value.color === 'blue' ? 'text-blue-600' :
                      value.color === 'purple' ? 'text-purple-600' :
                      'text-orange-600'
                    }`} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The passionate individuals driving our mission forward
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow text-center">
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-sm text-green-600 mb-3">{member.role}</p>
                <p className="text-sm text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-6 text-gray-600">
                <p>
                  Founded in 2022 by a team of sustainability experts and technology leaders, 
                  Waste→Resource was born from a simple observation: industrial waste was being 
                  treated as a liability when it could be a valuable asset.
                </p>
                <p>
                  After witnessing firsthand the inefficiencies in waste management across 
                  manufacturing facilities, we set out to create a solution that would make 
                  waste trading as seamless as any other business transaction.
                </p>
                <p>
                  Today, we're proud to be at the forefront of the circular economy revolution, 
                  helping companies turn their waste streams into revenue streams while 
                  contributing to a more sustainable future.
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">2022</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Company Founded</h3>
                    <p className="text-sm text-gray-600">Started with a vision to transform waste management</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">2023</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Platform Launch</h3>
                    <p className="text-sm text-gray-600">Launched our AI-powered marketplace</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">2024</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Global Expansion</h3>
                    <p className="text-sm text-gray-600">Expanded to 25+ countries worldwide</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-green-600">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Join Our Mission?</h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Be part of the solution. Join thousands of companies already transforming their waste into value.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-green-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Get Started Today
            </button>
            <button className="px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors">
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
