'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import ProducerNavbar from "@/components/layout/ProducerNavbar";
import StatsCard from "@/components/dashboard/StatsCard";
import ImpactChart from "@/components/dashboard/ImpactChart";
import GreenCreditsDisplay from "@/components/dashboard/GreenCreditsDisplay";
import { TrendingUp, Users, Package, DollarSign, Leaf, Award, Activity, Plus } from "lucide-react";

interface UserStats {
  activeListings: number;
  totalRevenue: number;
  totalWasteDiverted: number;
  totalGreenCredits: number;
  recentTransactions: any[];
  recentListings: any[];
}

export default function ProducerDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user) {
      fetchUserStats();
      // Set up auto-refresh every 2 minutes
      const interval = setInterval(() => {
        fetchUserStats();
      }, 120000);
      return () => clearInterval(interval);
    }
  }, [session]);

  const fetchUserStats = async () => {
    try {
      if (!session?.user) return;
      const response = await fetch(`/api/user-stats?userId=${(session as any).user.id}`);
      if (response.ok) {
        const data = await response.json();
        setStats(data);
        setLastUpdated(new Date());
      } else {
        const error = await response.json();
        console.error('Error fetching user stats:', error);
      }
    } catch (error) {
      console.error('Error fetching user stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <ProducerNavbar />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 p-6 pt-20">
        <div className="space-y-4">
          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button 
                onClick={() => router.push('/dashboard/producer/create-listing')}
                className="w-full flex items-center gap-3 p-3 bg-orange-50 border border-orange-200 rounded-lg hover:bg-orange-100 transition-colors"
              >
                <Plus className="w-5 h-5 text-orange-600" />
                <span className="text-orange-800 font-medium">Create New Listing</span>
              </button>
              <button 
                onClick={() => router.push('/dashboard/producer/listings')}
                className="w-full flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
              >
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
              {loading ? (
                <div className="text-center text-gray-500 py-4">Loading...</div>
              ) : stats && stats.recentTransactions && stats.recentTransactions.length > 0 ? (
                stats.recentTransactions.slice(0, 3).map((transaction, index) => (
                  <div key={index} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Transaction completed</p>
                      <p className="text-xs text-gray-600">{transaction.volumeTons} tons {transaction.listing?.type}</p>
                    </div>
                    <span className="text-xs text-gray-500">{formatTimeAgo(new Date(transaction.createdAt))}</span>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500 py-4">No recent activity</div>
              )}
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
                <span>Last updated: {formatTimeAgo(lastUpdated)}</span>
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Listings</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {loading ? '...' : stats?.activeListings || 0}
                  </p>
                  <p className="text-sm text-orange-600 mt-1 flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    Live data
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
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {loading ? '...' : formatCurrency(stats?.totalRevenue || 0)}
                  </p>
                  <p className="text-sm text-green-600 mt-1 flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    Real-time
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
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {loading ? '...' : `${stats?.totalWasteDiverted || 0} tons`}
                  </p>
                  <p className="text-sm text-blue-600 mt-1 flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    Live data
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Leaf className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Green Credits</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {loading ? '...' : stats?.totalGreenCredits || 0}
                  </p>
                  <p className="text-sm text-purple-600 mt-1 flex items-center gap-1">
                    <Award className="w-4 h-4" />
                    Earned
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Award className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>
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
              <button 
                onClick={() => router.push('/dashboard/producer/listings')}
                className="text-orange-600 hover:text-orange-700 font-medium"
              >
                View All
              </button>
            </div>
            <div className="space-y-4">
              {loading ? (
                <div className="text-center text-gray-500 py-4">Loading...</div>
              ) : stats && stats.recentListings && stats.recentListings.length > 0 ? (
                stats.recentListings.slice(0, 3).map((listing, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                        <Package className="w-6 h-6 text-orange-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{listing.type}</h4>
                        <p className="text-sm text-gray-600">{listing.volume} • {listing.location}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-green-600">
                        {formatTimeAgo(new Date(listing.createdAt))}
                      </div>
                      <div className="text-sm text-gray-500">
                        {listing.frequency || 'One-time'}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500 py-4">No listings yet</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}