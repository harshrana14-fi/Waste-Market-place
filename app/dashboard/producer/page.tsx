import ProducerNavbar from "@/components/layout/ProducerNavbar";
import StatsCard from "@/components/dashboard/StatsCard";
import ImpactChart from "@/components/dashboard/ImpactChart";
import GreenCreditsDisplay from "@/components/dashboard/GreenCreditsDisplay";
import { TrendingUp, Users, Package, DollarSign, Leaf, Award, Activity, Plus } from "lucide-react";

export default function ProducerDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <ProducerNavbar />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 p-6 pt-24">
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center gap-3 p-3 bg-orange-50 border border-orange-200 rounded-lg hover:bg-orange-100 transition-colors">
                <Plus className="w-5 h-5 text-orange-600" />
                <span className="text-orange-800 font-medium">Create New Listing</span>
              </button>
              <button className="w-full flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">
                <Package className="w-5 h-5 text-gray-600" />
                <span className="text-gray-700 font-medium">Manage Listings</span>
              </button>
              <button className="w-full flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">
                <TrendingUp className="w-5 h-5 text-gray-600" />
                <span className="text-gray-700 font-medium">View Analytics</span>
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="font-semibold mb-4">Recent Activity</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">New inquiry received</p>
                  <p className="text-xs text-gray-600">Metal scraps listing</p>
                </div>
                <span className="text-xs text-gray-500">2h ago</span>
              </div>
              <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Transaction completed</p>
                  <p className="text-xs text-gray-600">25 tons plastic waste</p>
                </div>
                <span className="text-xs text-gray-500">1d ago</span>
              </div>
              <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Green credits earned</p>
                  <p className="text-xs text-gray-600">150 credits</p>
                </div>
                <span className="text-xs text-gray-500">2d ago</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-8">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Producer Dashboard</h1>
                <p className="text-gray-600">Manage your waste listings and track your impact</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Activity className="w-4 h-4" />
                <span>Last updated: 2 minutes ago</span>
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Listings</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">12</p>
                  <p className="text-sm text-orange-600 mt-1 flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    +3 this month
                  </p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Package className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">$45.2K</p>
                  <p className="text-sm text-green-600 mt-1 flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    +18% this month
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Waste Diverted</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">156 tons</p>
                  <p className="text-sm text-blue-600 mt-1 flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    +25% this month
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Leaf className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <GreenCreditsDisplay />
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ImpactChart />
            
            {/* Revenue Chart */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Revenue Trend</h3>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>This Month</span>
                  <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                  <span>Last Month</span>
                </div>
              </div>
              <div className="h-64 flex items-end justify-between gap-2">
                {[65, 78, 85, 92, 88, 95, 102, 98, 105, 112, 108, 115].map((height, i) => (
                  <div key={i} className="flex flex-col items-center gap-2">
                    <div 
                      className="bg-green-500 rounded-t w-8 transition-all duration-500"
                      style={{height: `${height}%`}}
                    ></div>
                    <span className="text-xs text-gray-500">{i + 1}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center text-sm text-gray-600">
                Revenue in thousands per day
              </div>
            </div>
          </div>

          {/* Recent Listings */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Recent Listings</h3>
              <button className="text-orange-600 hover:text-orange-700 font-medium">
                View All
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Package className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Metal Scraps</h4>
                    <p className="text-sm text-gray-600">50 tons • Detroit, MI</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-green-600">$2,500</div>
                  <div className="text-sm text-gray-500">3 inquiries</div>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Package className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Plastic Waste</h4>
                    <p className="text-sm text-gray-600">25 tons • Detroit, MI</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-green-600">$1,200</div>
                  <div className="text-sm text-gray-500">1 inquiry</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}