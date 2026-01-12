import { useState } from 'react';
import { Search, Filter, Download, ArrowUpFromLine, TrendingUp, DollarSign, Users } from 'lucide-react';
import { DataTable } from '../../components/common/DataTable';
import { StatusBadge } from '../../components/common/StatusBadge';
import { distributionsData, DistributionData } from '../../data/loansData';
import { format } from 'date-fns';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

export const DistributionsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Calculate summary statistics
  const totalDistributions = distributionsData.length;
  const completedDistributions = distributionsData.filter((d) => d.status === 'Completed');
  const processingDistributions = distributionsData.filter((d) => d.status === 'Processing');
  const scheduledDistributions = distributionsData.filter((d) => d.status === 'Scheduled');

  const totalGross = distributionsData.reduce((sum, d) => sum + d.grossAmount, 0);
  const totalNet = distributionsData.reduce((sum, d) => sum + d.netPayout, 0);
  const totalPlatformFees = distributionsData.reduce((sum, d) => sum + d.platformFees, 0);
  const totalAgentFees = distributionsData.reduce((sum, d) => sum + d.agentFees, 0);

  // Fee breakdown for pie chart
  const feeBreakdown = [
    { name: 'Net Payout to Partners', value: totalNet },
    { name: 'Platform Fees', value: totalPlatformFees },
    { name: 'Agent Fees', value: totalAgentFees },
  ];

  const COLORS = ['#355E3B', '#f59e0b', '#6b7280'];

  // Recipient distribution
  const recipientData = distributionsData
    .flatMap((d) => d.recipients)
    .reduce((acc, recipient) => {
      acc[recipient] = (acc[recipient] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

  const recipientChartData = Object.entries(recipientData).map(([name, count]) => ({
    name,
    count,
  }));

  const distributionColumns = [
    {
      header: 'Distribution ID',
      accessor: (row: DistributionData) => (
        <div>
          <div className="font-medium text-gray-900">{row.id}</div>
          <div className="text-sm text-gray-500">{row.batchId}</div>
        </div>
      ),
    },
    {
      header: 'Created / Execution',
      accessor: (row: DistributionData) => (
        <div>
          <div className="text-sm text-gray-900">
            {format(new Date(row.createdDate), 'MMM dd, hh:mm a')}
          </div>
          <div className="text-sm text-gray-500">
            {format(new Date(row.executionDate), 'MMM dd, hh:mm a')}
          </div>
        </div>
      ),
    },
    {
      header: 'Gross / Net Amount',
      accessor: (row: DistributionData) => (
        <div>
          <div className="font-medium text-gray-900">{formatCurrency(row.grossAmount)}</div>
          <div className="text-sm text-gray-500">{formatCurrency(row.netPayout)} net</div>
        </div>
      ),
    },
    {
      header: 'Platform Fees',
      accessor: (row: DistributionData) => (
        <span className="text-sm text-gray-900">{formatCurrency(row.platformFees)}</span>
      ),
    },
    {
      header: 'Agent Fees',
      accessor: (row: DistributionData) => (
        <span className="text-sm text-gray-900">{formatCurrency(row.agentFees)}</span>
      ),
    },
    {
      header: 'Recipients',
      accessor: (row: DistributionData) => (
        <div>
          {row.recipients.slice(0, 2).map((recipient, idx) => (
            <div key={idx} className="text-sm text-gray-700">
              {recipient}
            </div>
          ))}
          {row.recipients.length > 2 && (
            <div className="text-sm text-gray-500">+{row.recipients.length - 2} more</div>
          )}
        </div>
      ),
    },
    {
      header: 'Loans Included',
      accessor: (row: DistributionData) => (
        <span className="text-sm text-gray-600">{row.loansIncluded.length} loans</span>
      ),
    },
    {
      header: 'Status',
      accessor: (row: DistributionData) => {
        const variant =
          row.status === 'Completed'
            ? 'success'
            : row.status === 'Processing'
              ? 'warning'
              : row.status === 'Scheduled'
                ? 'info'
                : 'error';
        return <StatusBadge label={row.status} variant={variant} />;
      },
    },
    {
      header: 'Action',
      accessor: (row: DistributionData) => (
        <button className="text-sm font-medium text-compass-600 hover:text-compass-700">View</button>
      ),
    },
  ];

  // Filter distributions
  const filteredDistributions = distributionsData.filter((distribution) => {
    const matchesSearch =
      distribution.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      distribution.batchId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      distribution.recipients.some((r) => r.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = filterStatus === 'all' || distribution.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <p className="text-sm text-gray-500">Operations</p>
        <h1 className="mt-1 text-4xl font-normal text-gray-900">Distributions</h1>
        <p className="mt-2 text-base text-gray-600">
          Outgoing money to capital partners and fee recipients
        </p>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border border-gray-200 bg-white p-5">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-gray-50 p-2">
              <ArrowUpFromLine size={20} className="text-gray-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Distributed</p>
              <p className="text-2xl font-normal text-gray-900">{formatCurrency(totalGross)}</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-5">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-gray-50 p-2">
              <DollarSign size={20} className="text-gray-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Net to Partners</p>
              <p className="text-2xl font-normal text-gray-900">{formatCurrency(totalNet)}</p>
              <p className="text-xs text-gray-500">
                {((totalNet / totalGross) * 100).toFixed(1)}% of gross
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-5">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-gray-50 p-2">
              <TrendingUp size={20} className="text-gray-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Fees</p>
              <p className="text-2xl font-normal text-gray-900">
                {formatCurrency(totalPlatformFees + totalAgentFees)}
              </p>
              <p className="text-xs text-gray-500">Platform + Agent fees</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-5">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-gray-50 p-2">
              <Users size={20} className="text-gray-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Batches</p>
              <p className="text-2xl font-normal text-gray-900">{totalDistributions}</p>
              <p className="text-xs text-gray-500">{completedDistributions.length} completed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Fee Breakdown */}
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-xl font-normal text-gray-900">Fee Breakdown</h2>
          <p className="mb-6 text-sm text-gray-500">Distribution of gross amounts</p>

          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={feeBreakdown}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {feeBreakdown.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  padding: '8px 12px',
                }}
                formatter={(value: number) => [formatCurrency(value), '']}
              />
            </PieChart>
          </ResponsiveContainer>

          <div className="mt-4 space-y-2">
            {feeBreakdown.map((item, index) => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div
                    className="h-3 w-3 rounded-sm"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  ></div>
                  <span className="text-gray-700">{item.name}</span>
                </div>
                <span className="font-medium text-gray-900">{formatCurrency(item.value)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recipient Distribution */}
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-xl font-normal text-gray-900">Recipient Distribution</h2>
          <p className="mb-6 text-sm text-gray-500">Number of distributions by partner</p>

          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={recipientChartData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="0" stroke="#f3f4f6" vertical={false} />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#9ca3af', fontSize: 12 }}
                dy={10}
                interval={0}
                angle={-15}
                textAnchor="end"
                height={80}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#9ca3af', fontSize: 12 }}
                dx={-10}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  padding: '8px 12px',
                }}
                formatter={(value: number) => [`${value} distributions`, '']}
              />
              <Bar dataKey="count" fill="#355E3B" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Pro-rata Logic Explanation */}
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="mb-3 text-lg font-normal text-gray-900">Distribution Logic</h2>
        <div className="space-y-3 text-sm text-gray-700">
          <div className="flex items-start gap-3">
            <div className="mt-1 h-1.5 w-1.5 rounded-full bg-gray-400"></div>
            <p>
              <span className="font-medium">Pro-rata calculation:</span> Each capital partner receives
              distributions proportional to their capital contribution to each loan
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="mt-1 h-1.5 w-1.5 rounded-full bg-gray-400"></div>
            <p>
              <span className="font-medium">Platform fees:</span> {((totalPlatformFees / totalGross) * 100).toFixed(1)}%
              of gross amount covers platform operations and compliance
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="mt-1 h-1.5 w-1.5 rounded-full bg-gray-400"></div>
            <p>
              <span className="font-medium">Agent fees:</span> {((totalAgentFees / totalGross) * 100).toFixed(1)}%
              compensates originators and servicing agents
            </p>
          </div>
        </div>
      </div>

      {/* Filters and Actions */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-1 gap-3">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search by batch ID, recipient, or distribution ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-500 focus:border-gray-300 focus:outline-none"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="appearance-none rounded-lg border border-gray-200 bg-white py-2 pl-10 pr-10 text-sm text-gray-900 focus:border-gray-300 focus:outline-none"
            >
              <option value="all">All Status</option>
              <option value="Completed">Completed</option>
              <option value="Processing">Processing</option>
              <option value="Scheduled">Scheduled</option>
              <option value="Failed">Failed</option>
            </select>
            <Filter className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            <Download size={16} />
            Export
          </button>
          <button className="rounded-lg bg-[#355E3B] px-4 py-2 text-sm font-medium text-white hover:bg-[#2d4f32]">
            New Distribution
          </button>
        </div>
      </div>

      {/* Distributions Table */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-normal text-gray-900">All Distributions</h2>
            <p className="mt-1 text-sm text-gray-500">
              Showing {filteredDistributions.length} of {totalDistributions} distributions
            </p>
          </div>
        </div>

        <DataTable data={filteredDistributions} columns={distributionColumns} />
      </div>
    </div>
  );
};
