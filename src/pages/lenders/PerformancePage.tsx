import { useState } from 'react';
import { AreaChart } from '../../components/common/AreaChart';
import { BarChart } from '../../components/common/BarChart';

type BreakdownView = 'product' | 'firm' | 'region';

export const PerformancePage = () => {
  const [breakdownView, setBreakdownView] = useState<BreakdownView>('product');

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

  // Performance metrics
  const performanceMetrics = {
    currentNetIRR: 0.0847, // 8.47%
    cashYield: 0.0625, // 6.25%
    defaultAdjustedReturn: 0.0782, // 7.82%
  };

  // Net IRR over time
  const irrOverTime = [
    { date: 'Jan', value: 0.0715 },
    { date: 'Feb', value: 0.0738 },
    { date: 'Mar', value: 0.0765 },
    { date: 'Apr', value: 0.0791 },
    { date: 'May', value: 0.0818 },
    { date: 'Jun', value: 0.0847 },
  ];

  // Format IRR data for AreaChart (needs value in currency format)
  const irrChartData = irrOverTime.map((d) => ({
    date: d.date,
    value: d.value * 1000000, // Scale for chart
  }));

  // Actual vs Expected Performance
  const performanceComparison = [
    { metric: 'Q1 2024', expected: 0.074, actual: 0.0739, delta: -0.0001 },
    { metric: 'Q2 2024', expected: 0.082, actual: 0.0847, delta: 0.0027 },
    { metric: 'YTD 2024', expected: 0.078, actual: 0.0847, delta: 0.0067 },
  ];

  // Performance by Product
  const performanceByProduct = [
    { name: 'Bridge Loan', value: 0.092 },
    { name: 'Term Loan', value: 0.078 },
    { name: 'Construction', value: 0.083 },
    { name: 'HELOC', value: 0.071 },
  ];

  // Performance by Firm
  const performanceByFirm = [
    { name: 'Anchor Capital', value: 0.089 },
    { name: 'Summit Lending', value: 0.081 },
    { name: 'Pinnacle Finance', value: 0.084 },
    { name: 'Gateway Fund', value: 0.078 },
  ];

  // Performance by Region
  const performanceByRegion = [
    { name: 'Southeast', value: 0.091 },
    { name: 'Northeast', value: 0.082 },
    { name: 'West', value: 0.079 },
    { name: 'Midwest', value: 0.085 },
  ];

  // Get current breakdown data
  const getCurrentBreakdownData = () => {
    let data;
    switch (breakdownView) {
      case 'product':
        data = performanceByProduct;
        break;
      case 'firm':
        data = performanceByFirm;
        break;
      case 'region':
        data = performanceByRegion;
        break;
      default:
        data = performanceByProduct;
    }
    // Convert percentages to currency-like values for BarChart
    return data.map((d) => ({ name: d.name, value: d.value * 1000000 }));
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <p className="text-sm text-gray-500">Lender Portal</p>
        <h1 className="mt-1 text-4xl font-normal text-gray-900">Performance</h1>
        <p className="mt-2 text-base text-gray-600">
          Historical and current performance metrics with no projections or alpha claims
        </p>
      </div>

      {/* Key Performance Metrics */}
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="mb-6 text-lg font-normal text-gray-900">Current Performance</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="border-r border-gray-100 pr-6">
            <p className="text-sm text-gray-600">Net IRR</p>
            <p className="mt-3 text-3xl font-normal text-gray-900">
              {formatPercent(performanceMetrics.currentNetIRR)}
            </p>
            <p className="mt-1 text-sm text-gray-500">Current internal rate of return</p>
          </div>
          <div className="border-r border-gray-100 pr-6">
            <p className="text-sm text-gray-600">Cash Yield</p>
            <p className="mt-3 text-3xl font-normal text-gray-900">
              {formatPercent(performanceMetrics.cashYield)}
            </p>
            <p className="mt-1 text-sm text-gray-500">Cash-on-cash return</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Default-Adjusted Return</p>
            <p className="mt-3 text-3xl font-normal text-gray-900">
              {formatPercent(performanceMetrics.defaultAdjustedReturn)}
            </p>
            <p className="mt-1 text-sm text-gray-500">Net of expected losses</p>
          </div>
        </div>
      </div>

      {/* Net IRR Over Time */}
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <div className="mb-6">
          <h2 className="text-xl font-normal text-gray-900">Net IRR Over Time</h2>
          <p className="mt-1 text-sm text-gray-500">Historical performance progression</p>
        </div>
        <div className="h-64">
          <div className="space-y-2">
            {irrOverTime.map((point, index) => (
              <div key={index} className="flex items-center justify-between border-b border-gray-100 pb-2">
                <span className="text-sm text-gray-600">{point.date}</span>
                <span className="text-lg font-normal text-gray-900">{formatPercent(point.value)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Actual vs Expected Performance */}
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <div className="mb-6">
          <h2 className="text-xl font-normal text-gray-900">Actual vs Expected Performance</h2>
          <p className="mt-1 text-sm text-gray-500">Simple delta between projected and actual returns</p>
        </div>
        <div className="space-y-4">
          {performanceComparison.map((comp, index) => (
            <div key={index} className="grid grid-cols-4 gap-4 border-b border-gray-100 pb-4">
              <div>
                <p className="text-sm text-gray-500">Period</p>
                <p className="mt-1 font-medium text-gray-900">{comp.metric}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Expected</p>
                <p className="mt-1 text-gray-900">{formatPercent(comp.expected)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Actual</p>
                <p className="mt-1 font-medium text-gray-900">{formatPercent(comp.actual)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Delta</p>
                <p className={`mt-1 font-medium ${comp.delta >= 0 ? 'text-success' : 'text-error'}`}>
                  {comp.delta >= 0 ? '+' : ''}
                  {formatPercent(comp.delta)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Breakdowns */}
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-normal text-gray-900">Performance Breakdown</h2>
            <p className="mt-1 text-sm text-gray-500">
              Net IRR by {breakdownView === 'product' ? 'product' : breakdownView === 'firm' ? 'firm' : 'region'}
            </p>
          </div>

          {/* Toggle Controls */}
          <div className="flex gap-2 rounded-lg border border-gray-200 bg-gray-50 p-1">
            <button
              onClick={() => setBreakdownView('product')}
              className={`rounded px-4 py-2 text-sm font-medium transition-colors ${
                breakdownView === 'product'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              By Product
            </button>
            <button
              onClick={() => setBreakdownView('firm')}
              className={`rounded px-4 py-2 text-sm font-medium transition-colors ${
                breakdownView === 'firm'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              By Firm
            </button>
            <button
              onClick={() => setBreakdownView('region')}
              className={`rounded px-4 py-2 text-sm font-medium transition-colors ${
                breakdownView === 'region'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              By Region
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {(breakdownView === 'product' ? performanceByProduct :
            breakdownView === 'firm' ? performanceByFirm :
            performanceByRegion).map((item, index) => (
            <div key={index} className="flex items-center justify-between border-b border-gray-100 pb-3">
              <span className="text-sm text-gray-700">{item.name}</span>
              <span className="text-lg font-normal text-gray-900">{formatPercent(item.value)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Notes */}
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 h-5 w-5 flex-shrink-0 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-xs font-medium text-gray-600">i</span>
          </div>
          <div className="space-y-2 text-sm text-gray-600">
            <p className="font-medium text-gray-900">Performance Methodology</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>All returns are historical or current — no projections included</li>
              <li>Net IRR reflects all fees, expenses, and realized losses</li>
              <li>Cash yield measures actual cash distributions relative to capital deployed</li>
              <li>Default-adjusted return incorporates expected loss provisions</li>
              <li>Performance data is updated monthly after close of business</li>
              <li>Past performance does not guarantee future results</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
