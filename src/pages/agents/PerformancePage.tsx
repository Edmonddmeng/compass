import { Target, TrendingUp, Award } from 'lucide-react';
import { BarChart } from '../../components/common/BarChart';
import { DonutChart } from '../../components/common/DonutChart';
import { ProgressBar } from '../../components/common/ProgressBar';
import { StatusBadge } from '../../components/common/StatusBadge';

export const PerformancePage = () => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Mock data
  const monthlyGoal = {
    target: 30000,
    current: 24500,
    projected: 29800,
  };

  const goalProgress = (monthlyGoal.current / monthlyGoal.target) * 100;
  const remaining = monthlyGoal.target - monthlyGoal.current;

  const loansClosedData = [
    { month: 'Jan', count: 5 },
    { month: 'Feb', count: 6 },
    { month: 'Mar', count: 8 },
    { month: 'Apr', count: 7 },
    { month: 'May', count: 9 },
    { month: 'Jun', count: 8 },
    { month: 'Jul', count: 6 },
    { month: 'Aug', count: 7 },
    { month: 'Sep', count: 6 },
    { month: 'Oct', count: 8 },
    { month: 'Nov', count: 7 },
    { month: 'Dec', count: 7 },
  ];

  const productMix = [
    { name: 'Bridge', value: 45, color: '#355E3B' },
    { name: 'Term', value: 30, color: '#60966e' },
    { name: 'HELOC', value: 15, color: '#a4c2ac' },
    { name: 'Construction', value: 10, color: '#c6d8cb' },
  ];

  const comparisonMetrics = [
    { metric: 'Conversion Rate', you: 68, teamAvg: 58, ranking: 'Top 15%' },
    { metric: 'Avg Loan Size', you: 485000, teamAvg: 420000, ranking: 'Above Avg' },
    { metric: 'Time to Close', you: 24, teamAvg: 28, ranking: 'Better' },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <p className="text-sm text-gray-500">Agent Portal</p>
        <h1 className="mt-1 text-4xl font-normal text-gray-900">Performance Analytics</h1>
        <p className="mt-2 text-base text-gray-600">Track your goals and analyze trends</p>
      </div>

      {/* Goal Progress */}
      <div className="rounded-lg border-2 border-compass-200 bg-gradient-to-br from-compass-50 to-white p-6">
        <div className="mb-4 flex items-center gap-2">
          <Target size={20} className="text-compass-600" />
          <h2 className="text-xl font-normal text-gray-900">Monthly Commission Goal</h2>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div>
            <p className="text-sm text-gray-600">Target</p>
            <p className="mt-1 text-2xl font-normal text-gray-900">{formatCurrency(monthlyGoal.target)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Current</p>
            <p className="mt-1 text-2xl font-normal text-compass-700">{formatCurrency(monthlyGoal.current)}</p>
            <p className="mt-1 text-xs text-gray-600">{goalProgress.toFixed(0)}% of goal</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Projected</p>
            <p className="mt-1 text-2xl font-normal text-gray-900">{formatCurrency(monthlyGoal.projected)}</p>
            <div className="mt-1 flex items-center gap-1">
              <StatusBadge variant="success">On track</StatusBadge>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <ProgressBar progress={goalProgress} showPercentage label={`${formatCurrency(remaining)} to go`} height="lg" />
        </div>
      </div>

      {/* Loans Closed Chart */}
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="mb-6 text-xl font-normal text-gray-900">Loans Closed by Month</h2>
        <BarChart
          data={loansClosedData}
          xKey="month"
          yKey="count"
          height={300}
          color="#355E3B"
        />
      </div>

      {/* Comparison Stats */}
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="mb-6 text-xl font-normal text-gray-900">Performance Comparison</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="pb-3 text-left text-sm font-medium text-gray-900">Metric</th>
                <th className="pb-3 text-left text-sm font-medium text-gray-900">You</th>
                <th className="pb-3 text-left text-sm font-medium text-gray-900">Team Avg</th>
                <th className="pb-3 text-left text-sm font-medium text-gray-900">Ranking</th>
              </tr>
            </thead>
            <tbody>
              {comparisonMetrics.map((row, idx) => (
                <tr key={idx} className="border-b border-gray-100 last:border-0">
                  <td className="py-4 text-sm text-gray-900">{row.metric}</td>
                  <td className="py-4 text-sm font-medium text-compass-700">
                    {row.metric === 'Avg Loan Size' ? formatCurrency(row.you) : row.you}
                    {row.metric === 'Conversion Rate' && '%'}
                    {row.metric === 'Time to Close' && 'd'}
                  </td>
                  <td className="py-4 text-sm text-gray-600">
                    {row.metric === 'Avg Loan Size' ? formatCurrency(row.teamAvg) : row.teamAvg}
                    {row.metric === 'Conversion Rate' && '%'}
                    {row.metric === 'Time to Close' && 'd'}
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <TrendingUp size={14} className="text-success" />
                      <span className="text-sm font-medium text-success">{row.ranking}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Product Mix */}
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="mb-6 text-xl font-normal text-gray-900">Product Mix (% of Loans)</h2>
        <DonutChart data={productMix} />
      </div>

      {/* Achievement Badge */}
      <div className="rounded-lg border border-compass-200 bg-compass-50 p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-compass-600">
            <Award size={32} className="text-white" />
          </div>
          <div>
            <p className="text-lg font-medium text-gray-900">Top Performer</p>
            <p className="mt-0.5 text-sm text-gray-600">You're in the top 15% of agents this quarter</p>
          </div>
        </div>
      </div>
    </div>
  );
};
