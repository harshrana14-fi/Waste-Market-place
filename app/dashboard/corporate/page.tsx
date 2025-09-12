import CorporateNavbar from "@/components/layout/CorporateNavbar";
import StatsCard from "@/components/dashboard/StatsCard";
import ImpactChart from "@/components/dashboard/ImpactChart";
import GreenCreditsDisplay from "@/components/dashboard/GreenCreditsDisplay";
import { TrendingUp, Users, Package, DollarSign, Leaf, Award, Activity, Building, Target, Globe } from "lucide-react";

export default function CorporateDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <CorporateNavbar />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 p-6 pt-24">
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors">
                <Target className="w-5 h-5 text-blue-600" />
                <span className="text-blue-800 font-medium">Set ESG Goals</span>
              </button>
              <button className="w-full flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">
                <Building className="w-5 h-5 text-gray-600" />
                <span className="text-gray-700 font-medium">Manage Suppliers</span>
              </button>
              <button className="w-full flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">
                <TrendingUp className="w-5 h-5 text-gray-600" />
                <span className="text-gray-700 font-medium">View Reports</span>
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="font-semibold mb-4">Recent Activity</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">ESG goal achieved</p>
                  <p className="text-xs text-gray-600">50% waste reduction</p>
                </div>
                <span className="text-xs text-gray-500">2h ago</span>
              </div>
              <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">New supplier added</p>
                  <p className="text-xs text-gray-600">GreenTech Recycling</p>
                </div>
                <span className="text-xs text-gray-500">1d ago</span>
              </div>
              <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Sustainability report</p>
                  <p className="text-xs text-gray-600">Q4 2024 generated</p>
                </div>
                <span className="text-xs text-gray-500">3d ago</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-8">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Corporate Dashboard</h1>
                <p className="text-gray-600">Track sustainability goals and manage your supply chain</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Activity className="w-4 h-4" />
                <span>Last updated: 5 minutes ago</span>
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">ESG Score</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">87</p>
                  <p className="text-sm text-blue-600 mt-1 flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    +5 this quarter
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Target className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Waste Diverted</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">2.3K tons</p>
                  <p className="text-sm text-green-600 mt-1 flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    +12% this quarter
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Leaf className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Supplier Network</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">24</p>
                  <p className="text-sm text-purple-600 mt-1 flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    +3 this month
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Building className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>

            <GreenCreditsDisplay />
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ImpactChart />
            
            {/* ESG Progress Chart */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">ESG Progress</h3>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span>This Quarter</span>
                  <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                  <span>Last Quarter</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Environmental</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-2 bg-gray-200 rounded-full">
                      <div className="w-4/5 h-full bg-green-500 rounded-full"></div>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">80%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Social</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-2 bg-gray-200 rounded-full">
                      <div className="w-3/4 h-full bg-blue-500 rounded-full"></div>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">75%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Governance</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-2 bg-gray-200 rounded-full">
                      <div className="w-full h-full bg-purple-500 rounded-full"></div>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">95%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Supplier Network */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Top Suppliers</h3>
              <button className="text-blue-600 hover:text-blue-700 font-medium">
                Manage Network
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Building className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">GreenTech Recycling</h4>
                    <p className="text-sm text-gray-600">Metal & Plastic • 95% satisfaction</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-green-600">850 tons</div>
                  <div className="text-sm text-gray-500">This quarter</div>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Building className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">EcoWaste Solutions</h4>
                    <p className="text-sm text-gray-600">Electronic Waste • 92% satisfaction</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-green-600">420 tons</div>
                  <div className="text-sm text-gray-500">This quarter</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}