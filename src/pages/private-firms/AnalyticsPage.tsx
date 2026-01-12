import { ArrowRight, TrendingUp, TrendingDown } from 'lucide-react';
import { AreaChart } from '../../components/common/AreaChart';
import { DateRangeSelector } from '../../components/common/DateRangeSelector';

export const AnalyticsPage = () => {
  // Mock data for loan volume over time
  const loanVolumeData = [
    { date: 'Apr 29', value: 810000 },
    { date: 'May 6', value: 830000 },
    { date: 'May 13', value: 850000 },
    { date: 'May 20', value: 920000 },
    { date: 'May 27', value: 1020000 },
  ];

  // Mock data for payment collection
  const paymentCollectionData = [
    { date: 'Apr 29', value: 145000 },
    { date: 'May 6', value: 152000 },
    { date: 'May 13', value: 148000 },
    { date: 'May 20', value: 165000 },
    { date: 'May 27', value: 182000 },
  ];

  // Mock data for delinquency rate
  const delinquencyRateData = [
    { date: 'Apr 29', value: 95000 },
    { date: 'May 6', value: 88000 },
    { date: 'May 13', value: 92000 },
    { date: 'May 20', value: 89000 },
    { date: 'May 27', value: 85000 },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(amount);
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="space-y-6">
        <div>
          <p className="text-sm text-gray-500">Dashboard</p>
          <h1 className="mt-1 text-4xl font-normal text-gray-900">Analytics</h1>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-6 border-b border-gray-200">
          <button className="border-b-2 border-transparent pb-3 text-sm font-medium text-gray-500 hover:text-gray-700">
            Overview
          </button>
          <button className="border-b-2 border-gray-900 pb-3 text-sm font-medium text-gray-900">
            Analytics
          </button>
          <button className="border-b-2 border-transparent pb-3 text-sm font-medium text-gray-500 hover:text-gray-700">
            Activity
          </button>
        </div>
      </div>

      {/* Date Range Selector */}
      <div>
        <DateRangeSelector />
      </div>

      {/* Total Loan Volume */}
      <div className="group cursor-pointer rounded-lg border border-gray-200 bg-white p-6 transition-all hover:border-gray-300">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-normal text-gray-900">Total loan volume</h2>
            <ArrowRight size={20} className="text-gray-400 group-hover:text-gray-600" />
          </div>
        </div>

        <div className="mb-6 flex items-baseline gap-2">
          <p className="text-sm font-normal text-gray-500">Total disbursed</p>
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <span className="inline-block h-3 w-3 rounded-full bg-gray-200"></span>
          </div>
        </div>

        <p className="mb-6 text-3xl font-normal text-gray-900">
          {formatCurrency(loanVolumeData[loanVolumeData.length - 1].value)}M
        </p>

        <AreaChart data={loanVolumeData} color="#6366f1" height={280} />
      </div>

      {/* Two column charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Payment Collection Rate */}
        <div className="group cursor-pointer rounded-lg border border-gray-200 bg-white p-6 transition-all hover:border-gray-300">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-normal text-gray-900">Payment collection</h2>
              <ArrowRight size={20} className="text-gray-400 group-hover:text-gray-600" />
            </div>
          </div>

          <div className="mb-2 flex items-baseline gap-2">
            <p className="text-sm font-normal text-gray-500">Total collected</p>
          </div>

          <div className="mb-4 flex items-baseline gap-3">
            <p className="text-3xl font-normal text-gray-900">
              {formatCurrency(paymentCollectionData[paymentCollectionData.length - 1].value)}k
            </p>
            <div className="flex items-center gap-1 text-sm text-green-600">
              <TrendingUp size={16} />
              <span>12.4%</span>
            </div>
          </div>

          <AreaChart data={paymentCollectionData} color="#10b981" height={200} />
        </div>

        {/* Delinquency Balance */}
        <div className="group cursor-pointer rounded-lg border border-gray-200 bg-white p-6 transition-all hover:border-gray-300">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-normal text-gray-900">Delinquent balance</h2>
              <ArrowRight size={20} className="text-gray-400 group-hover:text-gray-600" />
            </div>
          </div>

          <div className="mb-2 flex items-baseline gap-2">
            <p className="text-sm font-normal text-gray-500">Outstanding late payments</p>
          </div>

          <div className="mb-4 flex items-baseline gap-3">
            <p className="text-3xl font-normal text-gray-900">
              {formatCurrency(delinquencyRateData[delinquencyRateData.length - 1].value)}k
            </p>
            <div className="flex items-center gap-1 text-sm text-green-600">
              <TrendingDown size={16} />
              <span>8.2%</span>
            </div>
          </div>

          <AreaChart data={delinquencyRateData} color="#ef4444" height={200} />
        </div>
      </div>

      {/* Distribution Efficiency */}
      <div className="group cursor-pointer rounded-lg border border-gray-200 bg-white p-6 transition-all hover:border-gray-300">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-normal text-gray-900">Distribution efficiency</h2>
            <ArrowRight size={20} className="text-gray-400 group-hover:text-gray-600" />
          </div>
        </div>

        <div className="mb-2 flex items-baseline gap-2">
          <p className="text-sm font-normal text-gray-500">Avg. time to distribute</p>
        </div>

        <p className="mb-6 text-3xl font-normal text-gray-900">2.3 days</p>

        <AreaChart
          data={[
            { date: 'Apr 29', value: 3.1 },
            { date: 'May 6', value: 2.8 },
            { date: 'May 13', value: 2.5 },
            { date: 'May 20', value: 2.4 },
            { date: 'May 27', value: 2.3 },
          ]}
          color="#f59e0b"
          height={280}
        />
      </div>
    </div>
  );
};
