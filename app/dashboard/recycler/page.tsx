import RecyclerNavbar from "@/components/layout/RecyclerNavbar";
import StatsCard from "@/components/dashboard/StatsCard";
import ImpactChart from "@/components/dashboard/ImpactChart";
import GreenCreditsDisplay from "@/components/dashboard/GreenCreditsDisplay";
import { TrendingUp, Users, Package, DollarSign, Leaf, Award, Activity, Zap, Recycle } from "lucide-react";

export default function RecyclerDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <RecyclerNavbar />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 p-6 pt-24">
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors">
                <Zap className="w-5 h-5 text-green-600" />
                <span className="text-green-800 font-medium">View AI Matches</span>
              </button>
              <button className="w-full flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">
                <Recycle className="w-5 h-5 text-gray-600" />
                <span className="text-gray-700 font-medium">Process Materials</span>
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
                  <p className="text-sm font-medium text-gray-900">New match found</p>
                  <p className="text-xs text-gray-600">Metal scraps - 95% match</p>
                </div>
                <span className="text-xs text-gray-500">1h ago</span>
              </div>
              <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Processing completed</p>
                  <p className="text-xs text-gray-600">25 tons plastic waste</p>
                </div>
                <span className="text-xs text-gray-500">3h ago</span>
              </div>
              <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Quality verified</p>
                  <p className="text-xs text-gray-600">Grade A materials</p>
                </div>
                <span className="text-xs text-gray-500">5h ago</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-8">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Recycler Dashboard</h1>
                <p className="text-gray-600">Find and process waste materials efficiently</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Activity className="w-4 h-4" />
                <span>Last updated: 1 minute ago</span>
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">AI Matches</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">8</p>
                  <p className="text-sm text-green-600 mt-1 flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    +2 today
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Materials Processed</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">342 tons</p>
                  <p className="text-sm text-blue-600 mt-1 flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    +15% this month
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Recycle className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Processing Revenue</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">$28.5K</p>
                  <p className="text-sm text-purple-600 mt-1 flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    +22% this month
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>

            <GreenCreditsDisplay />
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ImpactChart />
            
            {/* Processing Efficiency Chart */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Processing Efficiency</h3>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>This Month</span>
                  <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                  <span>Last Month</span>
                </div>
              </div>
              <div className="h-64 flex items-end justify-between gap-2">
                {[75, 82, 88, 85, 92, 89, 95, 91, 97, 94, 98, 96].map((height, i) => (
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
                Processing efficiency percentage per day
              </div>
            </div>
          </div>

          {/* AI Matches */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Top AI Matches</h3>
              <button className="text-green-600 hover:text-green-700 font-medium">
                View All Matches
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Zap className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Metal Scraps</h4>
                    <p className="text-sm text-gray-600">50 tons • Detroit, MI • 95% match</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-green-600">$2,500</div>
                  <div className="text-sm text-gray-500">High quality</div>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Zap className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Plastic Waste</h4>
                    <p className="text-sm text-gray-600">25 tons • Detroit, MI • 88% match</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-green-600">$1,200</div>
                  <div className="text-sm text-gray-500">Good quality</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}