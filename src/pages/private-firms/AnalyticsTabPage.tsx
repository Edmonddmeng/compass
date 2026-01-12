import { ArrowRight, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { AreaChart } from '../../components/common/AreaChart';
import { DateRangeSelector } from '../../components/common/DateRangeSelector';
import { KPICard } from '../../components/common/KPICard';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export const AnalyticsTabPage = () => {
  // Portfolio returns over time
  const portfolioReturnsData = [
    { date: 'Jan', value: 945000, target: 920000 },
    { date: 'Feb', value: 1020000, target: 980000 },
    { date: 'Mar', value: 1150000, target: 1050000 },
    { date: 'Apr', value: 1280000, target: 1120000 },
    { date: 'May', value: 1420000, target: 1200000 },
    { date: 'Jun', value: 1590000, target: 1280000 },
  ];

  // Net yield by month
  const netYieldData = [
    { date: 'Jan', yield: 11.2 },
    { date: 'Feb', yield: 11.8 },
    { date: 'Mar', yield: 12.1 },
    { date: 'Apr', yield: 12.5 },
    { date: 'May', yield: 12.9 },
    { date: 'Jun', yield: 13.2 },
  ];

  // Default rate tracking
  const defaultRateData = [
    { date: 'Jan', rate: 2.8 },
    { date: 'Feb', rate: 2.5 },
    { date: 'Mar', rate: 2.3 },
    { date: 'Apr', rate: 2.1 },
    { date: 'May', rate: 1.9 },
    { date: 'Jun', rate: 1.8 },
  ];

  // Capital efficiency
  const capitalEfficiencyData = [
    { date: 'Jan', deployed: 3200000, idle: 450000 },
    { date: 'Feb', deployed: 3450000, idle: 380000 },
    { date: 'Mar', deployed: 3720000, idle: 320000 },
    { date: 'Apr', deployed: 3950000, idle: 280000 },
    { date: 'May', deployed: 4180000, idle: 240000 },
    { date: 'Jun', deployed: 4420000, idle: 210000 },
  ];

  // IRR by loan type
  const irrByTypeData = [
    { type: 'Bridge Loans', irr: 14.5, volume: 1850000 },
    { type: 'Fix & Flip', irr: 13.2, volume: 1420000 },
    { type: 'Rental Property', irr: 11.8, volume: 980000 },
    { type: 'Ground-Up Construction', irr: 15.3, volume: 650000 },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercent = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="space-y-6">
        <div>
          <p className="text-sm text-gray-500">Home</p>
          <h1 className="mt-1 text-4xl font-normal text-gray-900">Dashboard</h1>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-6 border-b border-gray-200">
          <button className="border-b-2 border-transparent pb-3 text-sm font-medium text-gray-500 hover:text-gray-700">
            Overview
          </button>
          <button className="border-b-2 border-transparent pb-3 text-sm font-medium text-gray-500 hover:text-gray-700">
            Activity
          </button>
          <button className="border-b-2 border-gray-900 pb-3 text-sm font-medium text-gray-900">
            Analytics
          </button>
        </div>
      </div>

      {/* Date Range Selector */}
      <div>
        <DateRangeSelector />
      </div>

      {/* Key Performance Metrics */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <KPICard
          title="Net Yield (YTD)"
          value="13.2%"
          subtitle="Portfolio average"
          trend={{ value: '8.5%', isPositive: true }}
        />
        <KPICard
          title="Total Returns (YTD)"
          value={formatCurrency(1590000)}
          subtitle="Interest + fees"
          trend={{ value: '68.2%', isPositive: true }}
        />
        <KPICard
          title="Default Rate"
          value="1.8%"
          subtitle="Last 12 months"
          trend={{ value: '35.7%', isPositive: true }}
        />
        <KPICard
          title="Capital Deployed"
          value="95.5%"
          subtitle="Utilization rate"
          trend={{ value: '4.2%', isPositive: true }}
        />
      </div>

      {/* Portfolio Returns Over Time */}
      <div className="group cursor-pointer rounded-lg border border-gray-200 bg-white p-6 transition-all hover:border-gray-300">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-normal text-gray-900">Portfolio returns vs. target</h2>
            <ArrowRight size={20} className="text-gray-400 group-hover:text-gray-600" />
          </div>
        </div>

        <div className="mb-2 flex items-baseline gap-2">
          <p className="text-sm font-normal text-gray-500">Cumulative returns</p>
        </div>

        <div className="mb-4 flex items-baseline gap-3">
          <p className="text-3xl font-normal text-gray-900">{formatCurrency(1590000)}</p>
          <div className="flex items-center gap-1 text-sm text-green-600">
            <TrendingUp size={16} />
            <span>24.5% above target</span>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={portfolioReturnsData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="0" stroke="#f3f4f6" vertical={false} />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9ca3af', fontSize: 12 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9ca3af', fontSize: 12 }}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              dx={-10}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                padding: '8px 12px',
              }}
              formatter={(value: number) => [formatCurrency(value), '']}
            />
            <Legend
              wrapperStyle={{ paddingTop: '20px' }}
              iconType="line"
              formatter={(value) => <span style={{ color: '#6b7280', fontSize: '12px' }}>{value}</span>}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#355E3B"
              strokeWidth={2.5}
              dot={false}
              name="Actual Returns"
            />
            <Line
              type="monotone"
              dataKey="target"
              stroke="#9ca3af"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
              name="Target Returns"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Two column charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Total Loan Volume */}
        <div className="group cursor-pointer rounded-lg border border-gray-200 bg-white p-6 transition-all hover:border-gray-300">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-normal text-gray-900">Total loan volume</h2>
              <ArrowRight size={20} className="text-gray-400 group-hover:text-gray-600" />
            </div>
          </div>

          <div className="mb-2 flex items-baseline gap-2">
            <p className="text-sm font-normal text-gray-500">Cumulative loans originated</p>
          </div>

          <div className="mb-4 flex items-baseline gap-3">
            <p className="text-3xl font-normal text-gray-900">{formatCurrency(4285000)}</p>
            <div className="flex items-center gap-1 text-sm text-green-600">
              <TrendingUp size={16} />
              <span>+11.3% MoM</span>
            </div>
          </div>

          <AreaChart
            data={[
              { date: 'Jan', value: 3200000 },
              { date: 'Feb', value: 3450000 },
              { date: 'Mar', value: 3720000 },
              { date: 'Apr', value: 3950000 },
              { date: 'May', value: 4180000 },
              { date: 'Jun', value: 4285000 },
            ]}
            color="#355E3B"
            height={200}
          />
        </div>

        {/* Company Returns Growth */}
        <div className="group cursor-pointer rounded-lg border border-gray-200 bg-white p-6 transition-all hover:border-gray-300">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-normal text-gray-900">Company returns (ROI)</h2>
              <ArrowRight size={20} className="text-gray-400 group-hover:text-gray-600" />
            </div>
          </div>

          <div className="mb-2 flex items-baseline gap-2">
            <p className="text-sm font-normal text-gray-500">Cumulative return on investment</p>
          </div>

          <div className="mb-4 flex items-baseline gap-3">
            <p className="text-3xl font-normal text-gray-900">{formatCurrency(1590000)}</p>
            <div className="flex items-center gap-1 text-sm text-green-600">
              <TrendingUp size={16} />
              <span>+68.2% YTD</span>
            </div>
          </div>

          <AreaChart
            data={portfolioReturnsData.map(d => ({ date: d.date, value: d.value }))}
            color="#355E3B"
            height={200}
          />
        </div>
      </div>

      {/* Capital Efficiency */}
      <div className="group cursor-pointer rounded-lg border border-gray-200 bg-white p-6 transition-all hover:border-gray-300">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-normal text-gray-900">Capital efficiency</h2>
            <ArrowRight size={20} className="text-gray-400 group-hover:text-gray-600" />
          </div>
        </div>

        <div className="mb-2 flex items-baseline gap-2">
          <p className="text-sm font-normal text-gray-500">Deployed vs. idle capital</p>
        </div>

        <div className="mb-6 flex items-baseline gap-3">
          <p className="text-3xl font-normal text-gray-900">{formatCurrency(4420000)}</p>
          <span className="text-sm text-gray-500">deployed</span>
        </div>

        <ResponsiveContainer width="100%" height={280}>
          <AreaChart
            data={capitalEfficiencyData}
            margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorDeployed" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#355E3B" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#355E3B" stopOpacity={0.05} />
              </linearGradient>
              <linearGradient id="colorIdle" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="0" stroke="#f3f4f6" vertical={false} />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9ca3af', fontSize: 12 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#9ca3af', fontSize: 12 }}
              tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
              dx={-10}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                padding: '8px 12px',
              }}
              formatter={(value: number) => [formatCurrency(value), '']}
            />
            <Legend
              wrapperStyle={{ paddingTop: '20px' }}
              iconType="square"
              formatter={(value) => <span style={{ color: '#6b7280', fontSize: '12px' }}>{value}</span>}
            />
            <Area
              type="monotone"
              dataKey="deployed"
              stroke="#355E3B"
              strokeWidth={2}
              fill="url(#colorDeployed)"
              name="Capital Deployed"
            />
            <Area
              type="monotone"
              dataKey="idle"
              stroke="#f59e0b"
              strokeWidth={2}
              fill="url(#colorIdle)"
              name="Idle Capital"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* IRR by Loan Type */}
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <div className="mb-6">
          <h2 className="text-xl font-normal text-gray-900">IRR by loan type</h2>
          <p className="mt-1 text-sm text-gray-500">Performance breakdown by product</p>
        </div>

        <div className="space-y-4">
          {irrByTypeData.map((item) => (
            <div key={item.type} className="group">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900">{item.type}</span>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-500">{formatCurrency(item.volume)}</span>
                  <span className="text-sm font-medium text-gray-900">{formatPercent(item.irr)}</span>
                </div>
              </div>
              <div className="relative h-2 overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full bg-[#355E3B] transition-all group-hover:bg-[#2d4f32]"
                  style={{ width: `${(item.irr / 16) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
