import { useState } from 'react';
import { Wallet, TrendingUp, DollarSign, Percent, ArrowDownToLine } from 'lucide-react';
import { KPICard } from '../../components/common/KPICard';
import { DonutChart } from '../../components/common/DonutChart';
import { BarChart } from '../../components/common/BarChart';
import { GeoMap } from '../../components/common/GeoMap';
import { AreaChart } from '../../components/common/AreaChart';

type ToggleView = 'product' | 'region' | 'risk';

export const CapitalSummaryPage = () => {
  const [allocationView, setAllocationView] = useState<ToggleView>('product');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercent = (value: number) => {
    return `${(value * 100).toFixed(2)}%`;
  };

  // Mock data for KPIs
  const capitalMetrics = {
    totalCommitted: 50000000,
    deployed: 37500000,
    available: 12500000,
    netIRR: 0.0847, // 8.47%
    cashReceivedYTD: 3250000,
  };

  // Capital growth over time
  const capitalGrowthData = [
    { date: 'Jan', value: 30000000 },
    { date: 'Feb', value: 32000000 },
    { date: 'Mar', value: 33500000 },
    { date: 'Apr', value: 35000000 },
    { date: 'May', value: 36200000 },
    { date: 'Jun', value: 37500000 },
  ];

  // Allocation by Product
  const allocationByProduct = [
    { name: 'Bridge Loans', value: 18750000, color: '#355E3B' },
    { name: 'Term Loans', value: 12500000, color: '#60966e' },
    { name: 'Construction', value: 4375000, color: '#a4c2ac' },
    { name: 'HELOC', value: 1875000, color: '#c6d8cb' },
  ];

  // Allocation by Region
  const allocationByRegion = [
    { name: 'Southeast', value: 15000000, color: '#355E3B' },
    { name: 'Northeast', value: 11250000, color: '#60966e' },
    { name: 'West', value: 7500000, color: '#a4c2ac' },
    { name: 'Midwest', value: 3750000, color: '#c6d8cb' },
  ];

  // Allocation by Risk Tier
  const allocationByRisk = [
    { name: 'Low Risk', value: 16875000, color: '#10b981' },
    { name: 'Medium Risk', value: 15000000, color: '#f59e0b' },
    { name: 'High Risk', value: 5625000, color: '#ef4444' },
  ];

  // Geographic distribution data - using state codes for choropleth
  const geoData = [
    { name: 'Florida', state: '12', value: 11500000 },
    { name: 'New York', state: '36', value: 8200000 },
    { name: 'California', state: '06', value: 7500000 },
    { name: 'Texas', state: '48', value: 5800000 },
    { name: 'Georgia', state: '13', value: 4500000 },
  ];

  // Deployed vs Available breakdown
  const deploymentBreakdown = [
    { name: 'Deployed', value: capitalMetrics.deployed },
    { name: 'Available', value: capitalMetrics.available },
  ];

  // Get current allocation data based on toggle
  const getCurrentAllocationData = () => {
    switch (allocationView) {
      case 'product':
        return allocationByProduct;
      case 'region':
        return allocationByRegion;
      case 'risk':
        return allocationByRisk;
      default:
        return allocationByProduct;
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <p className="text-sm text-gray-500">Lender Portal</p>
        <h1 className="mt-1 text-4xl font-normal text-gray-900">Capital Summary</h1>
        <p className="mt-2 text-base text-gray-600">
          Overview of your committed capital, deployment status, and portfolio performance
        </p>
      </div>

      {/* Key Metrics & Capital Growth - Side by Side */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Capital Summary Card */}
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="mb-6">
            <h2 className="text-xl font-normal text-gray-900">Capital Summary</h2>
            <p className="mt-1 text-sm text-gray-500">Overview of committed and deployed capital</p>
          </div>

          <div className="space-y-4">
            <div className="border-b border-gray-100 pb-4">
              <div className="flex items-center gap-2">
                <Wallet size={14} className="text-gray-400" />
                <p className="text-xs font-normal text-gray-600">Total Capital Committed</p>
              </div>
              <p className="mt-2 text-2xl font-normal text-gray-900">
                {formatCurrency(capitalMetrics.totalCommitted)}
              </p>
              <p className="mt-1 text-xs text-gray-500">Lifetime commitment</p>
            </div>

            <div className="border-b border-gray-100 pb-4">
              <div className="flex items-center gap-2">
                <TrendingUp size={14} className="text-gray-400" />
                <p className="text-xs font-normal text-gray-600">Capital Deployed</p>
              </div>
              <p className="mt-2 text-2xl font-normal text-gray-900">
                {formatCurrency(capitalMetrics.deployed)}
              </p>
              <p className="mt-1 text-xs text-gray-500">
                {((capitalMetrics.deployed / capitalMetrics.totalCommitted) * 100).toFixed(1)}% deployed
              </p>
            </div>

            <div className="border-b border-gray-100 pb-4">
              <div className="flex items-center gap-2">
                <DollarSign size={14} className="text-gray-400" />
                <p className="text-xs font-normal text-gray-600">Capital Available</p>
              </div>
              <p className="mt-2 text-2xl font-normal text-gray-900">
                {formatCurrency(capitalMetrics.available)}
              </p>
              <p className="mt-1 text-xs text-gray-500">Ready to deploy</p>
            </div>

            <div className="border-b border-gray-100 pb-4">
              <div className="flex items-center gap-2">
                <Percent size={14} className="text-gray-400" />
                <p className="text-xs font-normal text-gray-600">Net IRR (YTD)</p>
              </div>
              <p className="mt-2 text-2xl font-normal text-gray-900">
                {formatPercent(capitalMetrics.netIRR)}
              </p>
              <p className="mt-1 text-xs text-gray-500">Year to date</p>
              <div className="mt-1 flex items-center gap-1">
                <span className="text-xs font-normal text-success">↑ 1.2%</span>
                <span className="text-xs text-gray-500">vs last period</span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <ArrowDownToLine size={14} className="text-gray-400" />
                <p className="text-xs font-normal text-gray-600">Cash Received (YTD)</p>
              </div>
              <p className="mt-2 text-2xl font-normal text-gray-900">
                {formatCurrency(capitalMetrics.cashReceivedYTD)}
              </p>
              <p className="mt-1 text-xs text-gray-500">Distributions + Interest</p>
            </div>
          </div>
        </div>

        {/* Capital Growth Chart Card */}
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="mb-6">
            <h2 className="text-xl font-normal text-gray-900">Capital Deployed Over Time</h2>
            <p className="mt-1 text-sm text-gray-500">Historical deployment progression</p>
          </div>
          <AreaChart data={capitalGrowthData} color="#355E3B" height={320} />
        </div>
      </div>

      {/* Deployed vs Available */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="mb-6">
            <h2 className="text-xl font-normal text-gray-900">Deployed vs Available</h2>
            <p className="mt-1 text-sm text-gray-500">Current capital allocation breakdown</p>
          </div>
          <BarChart data={deploymentBreakdown} color="#355E3B" height={240} />
        </div>

        {/* Quick Stats */}
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="mb-6">
            <h2 className="text-xl font-normal text-gray-900">Capital Efficiency</h2>
            <p className="mt-1 text-sm text-gray-500">Deployment metrics</p>
          </div>
          <div className="space-y-6">
            <div className="flex items-baseline justify-between border-b border-gray-100 pb-4">
              <span className="text-sm text-gray-600">Deployment Rate</span>
              <div className="text-right">
                <div className="text-2xl font-normal text-gray-900">75.0%</div>
                <div className="text-sm text-gray-500">of total committed</div>
              </div>
            </div>
            <div className="flex items-baseline justify-between border-b border-gray-100 pb-4">
              <span className="text-sm text-gray-600">Average Deployment Time</span>
              <div className="text-right">
                <div className="text-2xl font-normal text-gray-900">14 days</div>
                <div className="text-sm text-gray-500">from commitment</div>
              </div>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-sm text-gray-600">Active Investments</span>
              <div className="text-right">
                <div className="text-2xl font-normal text-gray-900">127</div>
                <div className="text-sm text-gray-500">across all products</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Capital Allocation Snapshot */}
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-normal text-gray-900">Capital Allocation Snapshot</h2>
            <p className="mt-1 text-sm text-gray-500">
              Breakdown of deployed capital by {allocationView}
            </p>
          </div>

          {/* Toggle Controls */}
          <div className="flex gap-2 rounded-lg border border-gray-200 bg-gray-50 p-1">
            <button
              onClick={() => setAllocationView('product')}
              className={`rounded px-4 py-2 text-sm font-medium transition-colors ${
                allocationView === 'product'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              By Product
            </button>
            <button
              onClick={() => setAllocationView('region')}
              className={`rounded px-4 py-2 text-sm font-medium transition-colors ${
                allocationView === 'region'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              By Region
            </button>
            <button
              onClick={() => setAllocationView('risk')}
              className={`rounded px-4 py-2 text-sm font-medium transition-colors ${
                allocationView === 'risk'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              By Risk Tier
            </button>
          </div>
        </div>

        <DonutChart data={getCurrentAllocationData()} height={260} />
      </div>

      {/* Geographic Distribution */}
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <div className="mb-6">
          <h2 className="text-xl font-normal text-gray-900">Geographic Distribution</h2>
          <p className="mt-1 text-sm text-gray-500">Capital deployed across key markets</p>
        </div>
        <GeoMap data={geoData} height={420} />

        {/* Market Summary */}
        <div className="mt-6 grid grid-cols-2 gap-4 border-t border-gray-100 pt-6 md:grid-cols-3 lg:grid-cols-5">
          {geoData.map((market) => (
            <div key={market.name} className="text-center">
              <div className="text-xs text-gray-500">{market.name}</div>
              <div className="mt-1 text-sm font-medium text-gray-900">
                {formatCurrency(market.value)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
